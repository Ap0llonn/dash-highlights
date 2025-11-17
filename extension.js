import vscode from 'vscode';
import { diagnosticProvider } from './scripts/diagnosticProvider.js';
import { hoverProvider } from './scripts/hoverProvider.js';
import { formatteur } from './scripts/formatter.js';
import { keyWordCompletions } from './scripts/keywordCompletions';

function activate(context) {
    diagnosticProvider(vscode);
    context.subscriptions.push(keyWordCompletions(vscode));
    context.subscriptions.push(formatteur(vscode));
    context.subscriptions.push(hoverProvider(vscode));
}

export function deactivate() {}
