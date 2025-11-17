export function diagnosticProvider(vscode) {

    const diagnosticCollection = vscode.languages.createDiagnosticCollection('dash');

    vscode.workspace.onDidChangeTextDocument(event => {
        if (event.document.languageId !== 'dash') return;

        const diagnostics = [];
        const text = event.document.getText();
        const lines = text.split(/\r?\n/);

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            // ERROR 1: `var x =` with nothing after =
            const incompleteVar = /^var\s+[a-zA-Z_][a-zA-Z0-9_]*\s*=\s*$/;
            if (incompleteVar.test(line)) {
                const range = new vscode.Range(
                    new vscode.Position(i, 0),
                    new vscode.Position(i, line.length)
                );
                diagnostics.push(
                    new vscode.Diagnostic(
                        range,
                        "Expected expression after '='",
                        vscode.DiagnosticSeverity.Error
                    )
                );
            }

            // ERROR 2: missing semicolon on simple statements
            const simpleStmt = /^(print|var|[a-zA-Z_][a-zA-Z0-9_]*)/;
            if (simpleStmt.test(line) && !line.endsWith(";") && !line.endsWith("{") && !line.endsWith("}")) {
                const range = new vscode.Range(
                    new vscode.Position(i, 0),
                    new vscode.Position(i, line.length)
                );
                diagnostics.push(
                    new vscode.Diagnostic(
                        range,
                        "Missing semicolon ';'",
                        vscode.DiagnosticSeverity.Warning
                    )
                );
            }
        }

        diagnosticCollection.set(event.document.uri, diagnostics);
    });
}