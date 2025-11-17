const vscode = require('vscode');

function activate(context) {

    const provider = vscode.languages.registerCompletionItemProvider(
        'dash',
        {
            provideCompletionItems(document, position) {

                const text = document.getText();

                const varRegex = /\bvar\s+([a-zA-Z_][a-zA-Z0-9_]*)/g;
                const variables = [];
                let match;

                while ((match = varRegex.exec(text)) !== null) {
                    variables.push(match[1]);
                }

                const keywords = [
                    'var', 'print', 'if', 'else',
                    'while', 'for', 'do', 'nil',
                    'true', 'false'
                ];

                const suggestions = [];

                for (const word of keywords) {
                    suggestions.push(
                        new vscode.CompletionItem(word, vscode.CompletionItemKind.Keyword)
                    );
                }

                for (const v of variables) {
                    suggestions.push(
                        new vscode.CompletionItem(v, vscode.CompletionItemKind.Variable)
                    );
                }

                return suggestions;
            }
        },
        ...[' ']
    );

    const formatter = vscode.languages.registerDocumentFormattingEditProvider(
        'dash',
        {
            provideDocumentFormattingEdits(document) {

                let text = document.getText();

                text = text.replace(/;\s*(?!\n)/g, ';\n');

                text = text.replace(/{\s*/g, '{\n');

                text = text.replace(/\s*}/g, '\n}');

                text = text.replace(/[ \t]+/g, ' ');

                let lines = text.split('\n');
                let indent = 0;
                const formatted = [];

                for (let line of lines) {
                    let trimmed = line.trim();
                    if (!trimmed) continue;

                    if (trimmed.startsWith('}')) indent--;

                    formatted.push('    '.repeat(indent) + trimmed);

                    if (trimmed.endsWith('{')) indent++;
                }

                return [
                    vscode.TextEdit.replace(
                        new vscode.Range(
                            document.positionAt(0),
                            document.positionAt(document.getText().length)
                        ),
                        formatted.join('\n')
                    )
                ];
            }
        }
    );

    context.subscriptions.push(formatter);

    context.subscriptions.push(provider);
}

module.exports = { activate };
