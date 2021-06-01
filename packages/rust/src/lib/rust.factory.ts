import { execSync } from 'child_process';

export const factory = (): LoadedCLI => {
  try {
    const version = execSync('cargo --version').toString('utf-8').trim();
    return {
      command: 'cargo',
      info: {
        global: true,
        version
      }
    };
  } catch (e) {
    throw new Error('Cargo not installed, please install it');
  }
}

export const mockFactory = (): LoadedCLI => {
  return { command: 'echo', info: { global: true, version: 0 } };
}

export type Factory = () => LoadedCLI;

export type LoadedCLI = {
  command: string;
  info: { global: boolean; version: string | number };
};

