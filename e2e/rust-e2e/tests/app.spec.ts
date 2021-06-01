import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';
describe('app e2e', () => {
  it('should create rust binary', async (done) => {
    const plugin = uniq('rust-app');
    ensureNxProject('@xenfo/nx-rust', 'dist/packages/rust');
    await runNxCommandAsync(`generate @xenfo/nx-rust:app --dry ${plugin}`);

    const result = await runNxCommandAsync(`build ${plugin}`);
    expect(result.stdout).toContain('Executor ran');

    done();
  });

  // describe('--directory', () => {
  //   it('should create src in the specified directory', async (done) => {
  //     const plugin = uniq('rust');
  //     ensureNxProject('@xenfo/nx-rust', 'dist/packages/rust');
  //     await runNxCommandAsync(
  //       `generate @xenfo/nx-rust:app ${plugin} --directory --dry subdir`
  //     );
  //     expect(() =>
  //       checkFilesExist(`libs/subdir/${plugin}/src/index.ts`)
  //     ).not.toThrow();
  //     done();
  //   });
  // });

  // describe('--tags', () => {
  //   it('should add tags to nx.json', async (done) => {
  //     const plugin = uniq('rust');
  //     ensureNxProject('@xenfo/nx-rust', 'dist/packages/rust');
  //     await runNxCommandAsync(
  //       `generate @xenfo/nx-rust:app ${plugin} --dry --tags e2etag,e2ePackage`
  //     );
  //     const nxJson = readJson('nx.json');
  //     expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage']);
  //     done();
  //   });
  // });
});
