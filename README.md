# mdbook-katex Action

[mdbook-katex](https://github.com/lzanini/mdbook-katex) Setup Action, modified from [actions-mdbook](https://github.com/peaceiris/actions-mdbook).

## Getting Started

```yaml
name: mdbook deploy

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-20.04
    steps:
      - uses: actions/checkout@v2

      - uses: actions/checkout@v2

      - name: Setup mdBook
        uses: peaceiris/actions-mdbook@v1
        with:
          mdbook-version: '0.4.7'

      - name: Setup mdbook-katex
        uses: magicgh/mdbook-katex-action@v1.0.0
        with:
          version: 'latest'
      
      - run: mdbook build
```

## Tips

* Use the custom version of mdBook

```yaml
- name: Setup mdbook-katex
  uses: magicgh/mdbook-katex-action@v1
  with:
    version: '0.2.8'
```

Notice that there is only one version in [mdbook-katex/releases](https://github.com/lzanini/mdbook-katex/releases), i.e. v0.2.8, so this feature is useless.

* Maybe this script can be run on Docker, but I haven't test yet. Check out [actions-mdbook](https://github.com/peaceiris/actions-mdbook#readme) for more detail.

* Welcome to pull request.
