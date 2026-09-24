---
title: Suggest a chain
---

# Suggest a chain

If the wallet does not already know a chain, a site can propose it. The user sees **Add &lt;name&gt;** and the endpoints you chose. Nothing is saved until they approve.

```ts
const zunia = await getZunia();
await zunia.experimentalSuggestChain({
  chainId: "my-test-1",
  chainName: "My Testnet",
  rpc: "https://rpc.example.com",
  rest: "https://lcd.example.com",
  bip44: { coinType: 118 },
  bech32Config: { bech32PrefixAccAddr: "my" },
  currencies: [
    { coinDenom: "TEST", coinMinimalDenom: "utest", coinDecimals: 6 },
  ],
  feeCurrencies: [
    {
      coinDenom: "TEST",
      coinMinimalDenom: "utest",
      coinDecimals: 6,
      gasPriceStep: { low: 0.01, average: 0.025, high: 0.04 },
    },
  ],
  stakeCurrency: { coinDenom: "TEST", coinMinimalDenom: "utest", coinDecimals: 6 },
});
```

The shape is the usual Keplr `ChainInfo`. The wallet keeps a smaller draft: name, chain id, RPC, REST, bech32 prefix, coin type, denom metadata and a gas price. Endpoints must be `https://` and must not contain credentials.

If the chain is already in the bundled registry or was added earlier, the call returns without a prompt.

A user can also add a network by hand: menu, **Manage networks**, then add. See [Networks](../use-wallet/networks.md).

Only suggest endpoints you operate or trust. The wallet will send the user's addresses to them for balances and will broadcast through them when the user sends from the wallet itself.
