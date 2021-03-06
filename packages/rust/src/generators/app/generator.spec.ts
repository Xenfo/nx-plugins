import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree, readProjectConfiguration } from '@nrwl/devkit';

import generator from './generator';
import { RustGeneratorSchema } from './schema';

describe('rust generator', () => {
  let appTree: Tree;
  const options: RustGeneratorSchema = { name: 'jest', dry: true };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'jest');
    expect(config).toBeDefined();
  });
});
