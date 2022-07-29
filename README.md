## Summary

This package allows you generate a valid [OverrideTypesBundle]() JSON file to inject into a polkadot-js `ApiPromise` under the `typesBundle` option key. This is a helper library that works specifically with polkadot-js. 

## Installation

**NPM**
`npm install -g @substrate/generate-type-bundle`

**Yarn**
`yarn global add @substrate/generate-type-bundle`

## CLI

```
Options:
      --help             Show help                                     [boolean]
      --version          Show version number                           [boolean]
  -p, --path             Path to directory to generate Type files into. [string]
  -s, --specName         A chain to generate types for. If this is not inputted
                         it will create a types bundle for all chains.  [string]
  -a, --availableChains  List all available chains to generate types for.
```

Note: `-p` or `--path` is required.

### Example CLI usage

`-p` or `--path`:

`generate-type-bundle -p ~/Desktop/example/types`

`-s` or `--specName`:

`generate-type-bundle -p ~/Desktop/example/types -s moonbeam`

`-a` or `--availableChains`:

`generate-type-bundle -a`
