
function keyWordCompletions(vscode) {
    const provider = vscode.languages.registerCompletionItemProvider(
        'dash',
        {
            provideCompletionItems(document, position) {

                const text = document.getText();

                const letRegex = /\blet\s+([a-zA-Z_][a-zA-Z0-9_]*)/g;
                const variables = [];
                let match;

                while ((match = letRegex.exec(text)) !== null) {
                    variables.push(match[1]);
                }

                const keywords = [
                    'let', 'print', 'if', 'else',
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

    return provider;

}

module.exports = keyWordCompletions;
