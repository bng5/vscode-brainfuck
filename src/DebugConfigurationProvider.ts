import * as vscode from 'vscode';
import { CancellationToken, DebugConfiguration, ProviderResult, WorkspaceFolder } from 'vscode';

export default class DebugConfigurationProvider implements vscode.DebugConfigurationProvider {
  resolveDebugConfiguration(folder: WorkspaceFolder | undefined, config: DebugConfiguration, token?: CancellationToken): ProviderResult<DebugConfiguration> {
    if (!config.type && !config.request && !config.name) {
      config.type = 'brainfuck';
      config.name = 'Debug file';
      config.request = 'launch';
      config.program = '${file}';
      config.stopOnEntry = true;
    }

    if (!config.program || !vscode.window.activeTextEditor) {
      return vscode.window.showErrorMessage("Cannot find a program to debug.")
      .then(_ => undefined);
    }

    return config;
  }
}
