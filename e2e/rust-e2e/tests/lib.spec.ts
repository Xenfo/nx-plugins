import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq
} from '@nrwl/nx-plugin/testing';
describe('lib e2e', () => {
  it('should create rust binary', async (done) => {
    const plugin = uniq('rust-lib');
    ensureNxProject('@nx-plugins/rust', 'dist/packages/rust');
    await runNxCommandAsync(`generate @nx-plugins/rust:lib --dry ${plugin}`);

    const result = await runNxCommandAsync(`build ${plugin}`);
    expect(result.stdout).toContain('Executor ran');

    done();
  });

  // describe('--directory', () => {
  //   it('should create src in the specified directory', async (done) => {
  //     const plugin = uniq('rust');
  //     ensureNxProject('@xenfo/nx-rust', 'dist/packages/rust');
  //     await runNxCommandAsync(
  //       `generate @xenfo/nx-rust:lib ${plugin} --directory subdir`
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
  //       `generate @xenfo/nx-rust:lib ${plugin} --tags e2etag,e2ePackage`
  //     );
  //     const nxJson = readJson('nx.json');
  //     expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage']);
  //     done();
  //   });
  // });
});
