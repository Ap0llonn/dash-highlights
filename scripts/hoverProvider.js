function hoverProvider(vscode) {
    const hoverProvider = vscode.languages.registerHoverProvider('dash', {
        provideHover(document, position) {

            const range = document.getWordRangeAtPosition(position);
            const word = document.getText(range);

            const docs = {
                "var": "Declare a variable.\n\n**Example:** `var x = 10;`",
                "print": "Print a value to the console.",
                "if": "Conditional execution block.",
                "else": "Alternative execution for an `if` block.",
                "while": "Loop while a condition is true.",
                "for": "Loop with initializer, condition, incrementer.",
                "do": "Execute block once before checking condition.",
                "true": "Boolean literal.",
                "false": "Boolean literal.",
                "nil": "Represents the absence of a value."
            };

            if (docs[word]) {
                return new vscode.Hover(docs[word]);
            }

            return null;
        }
    });

    return hoverProvider;
}
module.exports = hoverProvider;