import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext): void {
  const inspectSymbol = vscode.commands.registerCommand('tempname.inspectSymbol', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      void vscode.window.showInformationMessage('Open a file to inspect a symbol.');
      return;
    }

    const position = editor.selection.active;
    const range = editor.document.getWordRangeAtPosition(position);
    if (!range) {
      void vscode.window.showInformationMessage('Place the cursor on a symbol first.');
      return;
    }

    const symbol = editor.document.getText(range);
    const language = editor.document.languageId;

    void vscode.window.showInformationMessage(
      `${symbol} · ${language} · project intelligence coming next`,
    );
  });

  context.subscriptions.push(inspectSymbol);
}

export function deactivate(): void {}
