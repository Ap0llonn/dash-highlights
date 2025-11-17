function diagnosticProvider(vscode) {

    const diagnosticCollection = vscode.languages.createDiagnosticCollection('dash');

    vscode.workspace.onDidChangeTextDocument(event => {
        if (event.document.languageId !== 'dash') return;

        const diagnostics = [];
        const text = event.document.getText();
        const lines = text.split(/\r?\n/);

        for (let i = 0; i < lines.length; i++) {
            const rawLine = lines[i];
            const line = rawLine.trim();
            const nextLine = lines[i + 1] ? lines[i + 1].trim() : "";

            // --------------------------------------------
            // ERROR 1: Incomplete var:  var x =
            // --------------------------------------------
            const incompleteVar = /^var\s+[a-zA-Z_][a-zA-Z0-9_]*\s*=\s*$/;
            if (incompleteVar.test(line)) {
                const range = new vscode.Range(
                    new vscode.Position(i, 0),
                    new vscode.Position(i, rawLine.length)
                );
                diagnostics.push(new vscode.Diagnostic(
                    range,
                    "Expected expression after '='",
                    vscode.DiagnosticSeverity.Error
                ));
            }

            // --------------------------------------------
            // ERROR 2: Missing semicolon on simple statements
            // --------------------------------------------
            const simpleStmt = /^(print|var|[a-zA-Z_][a-zA-Z0-9_]*)/;
            if (
                simpleStmt.test(line) &&
                !line.endsWith(";") &&
                !line.endsWith("{") &&
                !line.endsWith("}") &&
                line !== ""
            ) {
                const range = new vscode.Range(
                    new vscode.Position(i, 0),
                    new vscode.Position(i, rawLine.length)
                );
                diagnostics.push(new vscode.Diagnostic(
                    range,
                    "Missing semicolon ';'",
                    vscode.DiagnosticSeverity.Warning
                ));
            }

            // --------------------------------------------
            // ERROR 3: Standalone keywords like "while"
            // --------------------------------------------
            const standaloneKeywords = ["if", "else", "while", "for", "do"];
            if (standaloneKeywords.includes(line)) {
                const range = new vscode.Range(
                    new vscode.Position(i, 0),
                    new vscode.Position(i, rawLine.length)
                );
                diagnostics.push(new vscode.Diagnostic(
                    range,
                    `Incomplete '${line}' statement.`,
                    vscode.DiagnosticSeverity.Error
                ));
            }

            // --------------------------------------------
            // ERROR 4: Missing parentheses for if/while
            // --------------------------------------------
            if (
                (line.startsWith("if ") || line.startsWith("while ")) &&
                !line.includes("(") &&
                !line.includes(")")
            ) {
                const range = new vscode.Range(
                    new vscode.Position(i, 0),
                    new vscode.Position(i, rawLine.length)
                );
                diagnostics.push(new vscode.Diagnostic(
                    range,
                    "Missing parentheses around condition. Expected: if (condition)",
                    vscode.DiagnosticSeverity.Error
                ));
            }

            // --------------------------------------------
            // ERROR 5: Incomplete 'for' header
            // --------------------------------------------
            if (line.startsWith("for (") && !line.includes(")")) {
                const range = new vscode.Range(
                    new vscode.Position(i, 0),
                    new vscode.Position(i, rawLine.length)
                );
                diagnostics.push(new vscode.Diagnostic(
                    range,
                    "Incomplete 'for' loop header. Expected: for (init; condition; increment)",
                    vscode.DiagnosticSeverity.Error
                ));
            }

            // --------------------------------------------
            // ERROR 6: Expected '{' after control statement
            // --------------------------------------------
            if (
                (line.startsWith("if") || line.startsWith("while") || line.startsWith("for")) &&
                line.endsWith(")") &&
                nextLine !== "" &&
                !nextLine.startsWith("{")
            ) {
                const range = new vscode.Range(
                    new vscode.Position(i + 1, 0),
                    new vscode.Position(i + 1, nextLine.length)
                );
                diagnostics.push(new vscode.Diagnostic(
                    range,
                    "Expected '{' after control statement.",
                    vscode.DiagnosticSeverity.Warning
                ));
            }
        }

        diagnosticCollection.set(event.document.uri, diagnostics);
    });
}

module.exports = diagnosticProvider;
