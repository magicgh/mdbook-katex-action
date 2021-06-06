import * as main from '../src/main';
const nock = require('nock');
import {FetchError} from 'node-fetch';
import jsonTest from './data/crate.json';
// import jsonTestGithub from './data/github.json';

jest.setTimeout(30000);
const repo: string = 'mdbook-katex';

beforeEach(() => {
  jest.resetModules();
});

afterEach(() => {
  delete process.env['INPUT_VERSION'];
  nock.cleanAll();
});

describe('Integration testing run()', () => {
  test('succeed in installing a custom version', async () => {
    const testVersion: string = '0.2.8';
    process.env['INPUT_VERSION'] = testVersion;
    const result: main.actionResult = await main.run();
    expect(result.output).toMatch(`mdbook-katex`);
  });

  test('succeed in installing the latest version', async () => {
    const testVersion: string = 'latest';
    process.env['INPUT_VERSION'] = testVersion;
    nock('https://crates.io')
      .get(`/api/v1/crates/${repo}`)
      .reply(200, jsonTest);
    const result: main.actionResult = await main.run();
    expect(result.output).toMatch('mdbook-katex');
  });

  if (process.platform === 'linux') {
    test('fail to install a custom version due to 404 of tarball', async () => {
      const testVersion: string = '0.2.8';
      process.env['INPUT_VERSION'] = testVersion;
      nock('https://github.com')
        .get(
          `/lzanini/mdbook-katex/releases/download/v${testVersion}/mdbook-katex-v${testVersion}-x86_64-unknown-linux-gnu.tar.gz`
        )
        .reply(404);
      try {
        const result: main.actionResult = await main.run();
        console.debug(result.output);
      } catch (e) {
        expect(e).toThrow(FetchError);
      }
    });
  }

  test('fail to install the latest version due to 404 of crate.io', async () => {
    const testVersion: string = 'latest';
    process.env['INPUT_VERSION'] = testVersion;
    nock('https://crates.io').get(`/api/v1/crates/${repo}`).reply(404);
    try {
      const result: main.actionResult = await main.run();
      console.debug(result.output);
    } catch (e) {
      expect(e).toThrow(FetchError);
    }
  });

  if (process.platform === 'linux') {
    test('fail to install the latest version due to 404 of tarball', async () => {
      const testVersion: string = 'latest';
      process.env['INPUT_VERSION'] = testVersion;
      nock('https://crates.io')
        .get(`/api/v1/crates/${repo}`)
        .reply(200, jsonTest);
      nock('https://github.com')
        .get(
          `/lzanini/mdbook-katex/releases/download/v0.2.8/mdbook-katex-v0.2.8-x86_64-unknown-linux-gnu.tar.gz`
        )
        .reply(404);
      try {
        const result: main.actionResult = await main.run();
        console.debug(result.output);
      } catch (e) {
        expect(e).toThrow(FetchError);
      }
    });
  }
});

describe('showVersion()', () => {
  let result: main.actionResult = {
    exitcode: 0,
    output: ''
  };

  test('return version', async () => {
    result = await main.showVersion('git', ['--version']);
    expect(result.exitcode).toBe(0);
    expect(result.output).toMatch(/git version/);
  });

  test('return exception', async () => {
    try {
      result = await main.showVersion('gitgit', ['--version']);
    } catch (e) {
      expect(e).toThrow(Error);
    }
  });
});
