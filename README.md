## Summary

This package allows you generate a valid [OverrideTypesBundle](https://github.com/polkadot-js/api/blob/master/packages/types/src/types/registry.ts#L73-L76) JSON file to inject into a polkadot-js `ApiPromise` under the `typesBundle` option key. This is a helper library that works specifically with polkadot-js. It is important to note that this library extracts chain types that are available via [`apps-config`](https://github.com/polkadot-js/apps/tree/master/packages/apps-config), if the chain types dont exist there it wont be able to support to bundle you need. Example packages that use this implicitly leverage this library are [Substrate-api-sidecar](https://github.com/paritytech/substrate-api-sidecar), and [Txwrapper-core](https://github.com/paritytech/txwrapper-core).

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
