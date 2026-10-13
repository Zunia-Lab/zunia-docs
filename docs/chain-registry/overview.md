# Chain registry overview

The [zunia-chain-registry](https://github.com/Zunia-Lab/zunia-chain-registry) repository holds JSON metadata for Cosmos-SDK, EVM, and SVM chains.

The extension, the mobile app and the web dashboard bundle the Cosmos entries when they are built, so a registry change reaches users with their next release. Only Cosmos chains are signed for: EVM and SVM entries are metadata, and no Zunia app signs EVM or Solana transactions.

Each entry, and its logo, is also served from:

```
https://raw.githubusercontent.com/Zunia-Lab/zunia-chain-registry/main/cosmos/{identifier}.json
https://raw.githubusercontent.com/Zunia-Lab/zunia-chain-registry/main/images/{identifier}/chain.png
```

The schema is compatible with the wider Cosmos suggest-chain ecosystem. Upstream reference: [keplr-chain-registry](https://github.com/chainapsis/keplr-chain-registry). Curation and branding are maintained by Zunia Lab.
