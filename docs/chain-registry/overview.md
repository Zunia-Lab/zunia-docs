# Chain registry overview

The [zunia-chain-registry](https://github.com/zunialab/zunia-chain-registry) repository holds JSON metadata for Cosmos-SDK, EVM, and SVM chains.

Zunia clients fetch chain configs from:

```
https://raw.githubusercontent.com/zunialab/zunia-chain-registry/main/cosmos/{identifier}.json
```

This fork is maintained from [keplr-chain-registry](https://github.com/chainapsis/keplr-chain-registry) with Zunia-specific curation.
