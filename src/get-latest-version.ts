import fetch from 'node-fetch';

export async function getLatestVersion(): Promise<string> {
  try {
    const url = 'https://crates.io/api/v1/crates/mdbook-katex';
    const response = await fetch(url);
    const json = await response.json();
    return json.crate.max_stable_version;
  } catch (e) {
    return e;
  }
}
