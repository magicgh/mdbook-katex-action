import {getURL} from '../src/get-url';

describe('getURL()', () => {
  test('return extected URL', () => {
    const testVersion: string = '0.2.8';
    const baseURL: string = `https://github.com/lzanini/mdbook-katex/releases/download/v${testVersion}/mdbook-katex-v${testVersion}-x86_64`;
    const urlLinux: string = `${baseURL}-unknown-linux-gnu.tar.gz`;
    const urlMacOS: string = `${baseURL}-apple-darwin.tar.gz`;
    const urlWindows: string = `${baseURL}-pc-windows-gnu.zip`;
    expect(getURL('unknown-linux-gnu', '0.2.8')).toBe(urlLinux);
    expect(getURL('unknown-linux-gnu', '0.3.0')).not.toBe(urlLinux);
    expect(getURL('my-os', '0.2.8')).not.toBe(urlLinux);
    expect(getURL('apple-darwin', '0.2.8')).toBe(urlMacOS);
    expect(getURL('pc-windows-gnu', '0.2.8')).toBe(urlWindows);
  });
});
