import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';
describe('rust e2e', () => {
  it('should create rust', async (done) => {
    const plugin = uniq('rust');
    ensureNxProject('@nx-plugins/rust', 'dist/packages/rust');
    await runNxCommandAsync(`generate @nx-plugins/rust:rust ${plugin}`);

    const result = await runNxCommandAsync(`build ${plugin}`);
    expect(result.stdout).toContain('Executor ran');

    done();
  });

  describe('--directory', () => {
    it('should create src in the specified directory', async (done) => {
      const plugin = uniq('rust');
      ensureNxProject('@nx-plugins/rust', 'dist/packages/rust');
      await runNxCommandAsync(
        `generate @nx-plugins/rust:rust ${plugin} --directory subdir`
      );
      expect(() =>
        checkFilesExist(`libs/subdir/${plugin}/src/index.ts`)
      ).not.toThrow();
      done();
    });
  });

  describe('--tags', () => {
    it('should add tags to nx.json', async (done) => {
      const plugin = uniq('rust');
      ensureNxProject('@nx-plugins/rust', 'dist/packages/rust');
      await runNxCommandAsync(
        `generate @nx-plugins/rust:rust ${plugin} --tags e2etag,e2ePackage`
      );
      const nxJson = readJson('nx.json');
      expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage']);
      done();
    });
  });
});
