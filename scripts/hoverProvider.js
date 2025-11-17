function hoverProvider(vscode) {
    const hoverProvider = vscode.languages.registerHoverProvider('dash', {
        provideHover(document, position) {

            const range = document.getWordRangeAtPosition(position);
            const word = document.getText(range);

            const docs = {
                "var": "Declares a new variable in the current scope.\n\nA variable may optionally be initialized with an expression. If no value is provided, the variable is created with the value `nil`.\n\nVariables in Dash are dynamically typed, meaning their type depends on the value assigned at runtime (number, string, boolean, or nil).\n\n**Syntax:**\n- `var name;`\n- `var name = expression;`\n\n**Examples:**\n- `var score = 42;` → number\n- `var name = \"Sam\";` → string\n- `var isHappy = true;` → boolean\n- `var empty;` → nil",

                "print": "Evaluates the expression and outputs its value to the console.\n\n**Syntax:** `print expression;`\n\n**Example:** `print x + 2;`",

                "if": "Executes a statement only if the condition evaluates to true.\n\nThe body may be followed by an optional `else` block.\n\n**Syntax:** `if (condition) statement`\n\n**Example:** `if (score > 10) print score;`",

                "else": "Defines an alternative execution branch for an `if` statement when the condition is false.\n\n**Syntax:** `if (condition) statement else statement`\n\n**Example:** `if (x == 0) print \"zero\"; else print \"other\";`",

                "while": "Repeats a statement as long as the condition remains true.\n\nThe condition is checked before each iteration.\n\n**Syntax:** `while (condition) statement`\n\n**Example:** `while (x < 5) x = x + 1;`",

                "for": "Creates a loop with an initializer, condition, and increment expression.\n\nInternally expands to a `var` declaration followed by a `while` loop.\n\n**Syntax:** `for (varDeclaration; condition; increment) statement`\n\n**Example:** `for (var i = 0; i < 5; i = i + 1) print i;`",

                "do": "Executes a block once, then repeats it while the condition is true.\n\nThis is a post-condition loop (the body always runs at least once).\n\n**Syntax:** `do { expression } while (condition);`\n\n**Example:** `do { print \"loop\" } while (false);`",

                "true": "Boolean literal representing logical truth.",

                "false": "Boolean literal representing logical falsehood.",

                "nil": "Represents the absence of a value.\n\nVariables declared without initialization default to `nil`."
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