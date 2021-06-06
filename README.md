# mdBook Katex Action

[lzanini/mdbook-katex](https://github.com/lzanini/mdbook-katex) Setup Action, modified from [actions-mdbook](https://github.com/peaceiris/actions-mdbook).

We can run mdbook-katex on a virtual machine of GitHub Actions by this action. Linux, macOS, and Windows are supported.

## Getting Started

```yaml
name: mdbook-katex

on:
  push:
    branches:
      - main
  pull_request:

jobs:
  deploy:
    runs-on: ubuntu-20.04
    steps:
      - uses: actions/checkout@v2

      - name: Setup mdBook Katex
        uses: magicgh/mdbook-katex-action@v1
        with:
          version: 'latest'

      - run: mdbook build
```

## Tips

* Use the custom version of mdBook

```yaml
- name: Setup mdBook
  uses: peaceiris/actions-mdbook@v1
  with:
    mdbook-version: '0.2.8'
```

Notice that there is only one version in [mdbook-katex/releases](https://github.com/lzanini/mdbook-katex/releases), i.e. v0.2.8, so this feature is useless.

* Maybe this script can be run on Docker, but I haven't test yet. Check out [actions-mdbook](https://github.com/peaceiris/actions-mdbook#readme) for more detail.

* Welcome to pull request.
