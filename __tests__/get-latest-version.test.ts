import {getLatestVersion} from '../src/get-latest-version';
const nock = require('nock');
import {FetchError} from 'node-fetch';
import jsonTest from './data/crate.json';

beforeEach(() => {
  jest.resetModules();
});

afterEach(() => {
  nock.cleanAll();
});

const repo: string = 'mdbook-katex';

describe('getLatestVersion()', () => {
  let versionLatestExpected: string = '0.2.8';

  test('return latest version via crate', async () => {
    nock('https://crates.io')
      .get(`/api/v1/crates/${repo}`)
      .reply(200, jsonTest);

    const versionLatest: string = await getLatestVersion();
    expect(versionLatest).toMatch(versionLatestExpected);
  });

  test('return exception 404', async () => {
    nock('https://crates.io').get(`/api/v1/crates/${repo}`).reply(404);

    try {
      const versionLatest: string = await getLatestVersion();
      console.debug(versionLatest);
    } catch (e) {
      expect(e).toThrow(FetchError);
    }
  });
});
