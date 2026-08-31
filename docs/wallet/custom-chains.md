# Custom chains

Chains in the [Zunia chain registry](https://github.com/zunialab/zunia-chain-registry) ship automatically. For chains not in the registry, add them manually.

## Add by RPC

1. Open Settings → Chains → Add custom chain
2. Enter chain ID, RPC URL, and REST URL
3. Confirm bech32 prefix and denom metadata

:::caution
Only add endpoints you trust. Malicious RPC nodes can show fake balances or censor transactions.
:::

## Contribute to the registry

If your chain is public, open a PR to [zunia-chain-registry](https://github.com/zunialab/zunia-chain-registry) so all users get the chain without manual setup.
