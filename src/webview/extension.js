const vscode = require('vscode');
const path = require('path');

function activate(context) {
  let disposable = vscode.commands.registerCommand('post-cat.open', () => {
    const panel = vscode.window.createWebviewPanel(
      'postCat',
      'Post Cat',
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'out'))]
      }
    );

    const scriptPath = vscode.Uri.file(
      path.join(context.extensionPath, 'out', 'webview.js')
    );
    const scriptUri = panel.webview.asWebviewUri(scriptPath);

    panel.webview.html = getWebviewContent(scriptUri);
  });

  context.subscriptions.push(disposable);
}

function getWebviewContent(scriptUri) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Post Cat</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100vh;
        }
        #root {
            width: 100%;
            height: 100%;
        }
    </style>
</head>
<body>
    <div id="root"></div>
    <script src="${scriptUri}"></script>
</body>
</html>`;
}

module.exports = {
  activate
};