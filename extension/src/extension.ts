import * as vscode from 'vscode';
import { inspectPythonSymbol } from './engineClient';

export function activate(context: vscode.ExtensionContext): void {
  const inspectSymbol = vscode.commands.registerCommand('tempname.inspectSymbol', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      void vscode.window.showInformationMessage('Open a file to inspect a symbol.');
      return;
    }

    if (editor.document.languageId !== 'python') {
      void vscode.window.showInformationMessage('Python is the first supported language.');
      return;
    }

    const position = editor.selection.active;
    const range = editor.document.getWordRangeAtPosition(position);
    if (!range) {
      void vscode.window.showInformationMessage('Place the cursor on a symbol first.');
      return;
    }

    const symbol = editor.document.getText(range);

    try {
      const result = await inspectPythonSymbol(context, editor.document.getText(), symbol);
      if (!result.ok) {
        void vscode.window.showErrorMessage(result.error ?? 'Project intelligence request failed.');
        return;
      }

      const match = result.matches?.[0];
      if (!match) {
        void vscode.window.showInformationMessage(`${symbol}: no top-level definition found in this file.`);
        return;
      }

      void vscode.window.showInformationMessage(
        `${match.name} · ${match.kind} · line ${match.line}`,
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      void vscode.window.showErrorMessage(`Project intelligence failed: ${message}`);
    }
  });

  context.subscriptions.push(inspectSymbol);
}

export function deactivate(): void {}
