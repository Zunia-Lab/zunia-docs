# Chain registry overview

The [zunia-chain-registry](https://github.com/Zunia-Lab/zunia-chain-registry) repository holds JSON metadata for Cosmos-SDK, EVM, and SVM chains.

Zunia clients fetch chain configs from:

```
https://raw.githubusercontent.com/Zunia-Lab/zunia-chain-registry/main/cosmos/{identifier}.json
```

The schema is compatible with the wider Cosmos suggest-chain ecosystem. Upstream reference: [keplr-chain-registry](https://github.com/chainapsis/keplr-chain-registry). Curation and branding are maintained by Zunia Lab.
