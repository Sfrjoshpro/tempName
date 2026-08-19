import { spawn } from 'node:child_process';
import * as path from 'node:path';
import * as vscode from 'vscode';

export interface InspectSymbolResponse {
  ok: boolean;
  symbol?: string;
  matches?: Array<{ name: string; kind: string; line: number; column: number }>;
  error?: string;
}

export async function inspectPythonSymbol(
  context: vscode.ExtensionContext,
  source: string,
  symbol: string,
): Promise<InspectSymbolResponse> {
  const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
  const repoRoot = workspaceRoot ?? path.resolve(context.extensionPath, '..');
  const engineSrc = path.join(repoRoot, 'engine', 'src');

  return await new Promise((resolve, reject) => {
    const child = spawn('python', ['-m', 'project_intel.server'], {
      env: { ...process.env, PYTHONPATH: engineSrc },
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (chunk) => { stdout += chunk.toString(); });
    child.stderr.on('data', (chunk) => { stderr += chunk.toString(); });
    child.on('error', reject);
    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(stderr || `Python engine exited with code ${code}`));
        return;
      }

      const line = stdout.trim().split(/\r?\n/).at(-1);
      if (!line) {
        reject(new Error('Python engine returned no response.'));
        return;
      }

      resolve(JSON.parse(line) as InspectSymbolResponse);
    });

    child.stdin.write(JSON.stringify({ method: 'inspect_symbol', source, symbol }) + '\n');
    child.stdin.end();
  });
}
