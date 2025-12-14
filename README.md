# Dash Highlights

**Dash Highlights** provides full language support for the **Dash programming language** (`.dsh`) in Visual Studio Code — including syntax highlighting, IntelliSense, snippets, formatting, diagnostics, and more.

---

## ✨ Features

### 🖋️ Syntax Highlighting
Beautiful highlighting for:
- Keywords (`let`, `if`, `else`, `while`, `for`, `do`, `print`, etc.)
- Operators (`+`, `-`, `*`, `/`, `==`, `!=`, `<`, `>`, `=`)
- Strings (`"hello"`)
- Numbers (`123`, `12.56`)
- Booleans (`true`, `false`)
- `nil` literal
- Identifiers
- Single-line and block comments

### 🧠 IntelliSense
- Keyword completion  
- Dynamic variable completion  
- Hover tooltips for keywords  

### 🧩 Snippets
Quick snippets for:
- `let`
- `if`
- `else`
- `while`
- `for`
- `do/while`
- `print`

### 🧼 Code Formatter
Format Dash code using:
- **Shift + Alt + F** (Windows)
- **Shift + Option + F** (macOS)

### 🚨 Diagnostics
Live error detection:
- Missing semicolons  
- Incomplete variable declarations  

### 📁 Custom File Icon
Unique icon for `.dsh` files.

---

## 🧩 Example

![Dash Highlight Example](images/exemple1.png)

![Dash Error Example](images/image.png)

---

## 📦 Installation

### Local VSIX Install

```bash
vsce package
```

Then in VS Code:
1. Open Command Palette  
2. Select *Install from VSIX...*  
3. Choose the generated `.vsix` file  

### Marketplace
Search **Dash Highlights** in the Extensions panel.

---

## ⚙️ Language Details

| Property      | Value         |
|---------------|---------------|
| Language ID   | `dash`        |
| Extension     | `.dsh`        |
| Scope name    | `source.dash` |

---

## 🧩 Known Issues
- Multiline strings not implemented  
- Basic formatter (not AST–based)  
- No cross-file IntelliSense  

---

## 📝 Release Notes

### **1.2.x**
- Added snippets  
- Added hover tooltips  
- Added variable completion  
- Added diagnostics  
