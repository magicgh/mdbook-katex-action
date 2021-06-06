export function getURL(os: string, version: string): string {
  const ext = (os: string) => {
    if (os === 'pc-windows-gnu') {
      return 'zip';
    } else {
      return 'tar.gz';
    }
  };

  const crateName: string = `mdbook-katex-v${version}-x86_64-${os}`;
  const baseURL: string =
    'https://github.com/lzanini/mdbook-katex/releases/download';
  const url: string = `${baseURL}/v${version}/${crateName}.${ext(os)}`;

  return url;
}
