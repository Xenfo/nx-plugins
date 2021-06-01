import { execSync } from 'child_process';

import { NormalizedSchema as AppSchema } from '../generators/app/generator';
import { NormalizedSchema as LibSchema } from '../generators/lib/generator';
import { LoadedCLI } from './rust.factory';

export class RustClient {
  private cliCommand: LoadedCLI;

  constructor(cliCommand: LoadedCLI) {
    this.cliCommand = cliCommand;
  }

  private execute(cmd: string) {
    return execSync(cmd, { stdio: 'inherit' });
  }

  newApp(options: AppSchema) {
    const cmd = `${this.cliCommand.command} init ${options.projectRoot} --bin`;
    return this.execute(cmd);
  }

  newLib(options: LibSchema) {
    const cmd = `${this.cliCommand.command} init ${options.projectRoot} --lib`;
    return this.execute(cmd);
  }

  build(project: string) {
    const cmd = `${this.cliCommand.command} build ${project}`;
    return this.execute(cmd);
  }

  run(project: string) {
    const cmd = `${this.cliCommand.command} run ${project}`;
    return this.execute(cmd);
  }
}
