const vscode = require('vscode');
const diagnosticProvider = require('./scripts/diagnosticProvider');
const hoverProvider = require('./scripts/hoverProvider');
const formatteur = require('./scripts/formatter');
const keyWordCompletions = require('./scripts/keywordCompletions');

function activate(context) {

    diagnosticProvider(vscode);

    context.subscriptions.push(keyWordCompletions(vscode));
    context.subscriptions.push(formatteur(vscode));
    context.subscriptions.push(hoverProvider(vscode));
}

module.exports = { activate };
