export function formatteur(vscode) {
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

    return formatter;
}