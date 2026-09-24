---
title: Networks
---

# Networks

The home list is every network in the bundled catalog, from [zunia-chain-registry](https://github.com/Zunia-Lab/zunia-chain-registry). Updates to that repo ship in the next wallet build.

## Manage networks

Menu → **Manage networks**. Hide a chain, or add one the catalog does not have.

**Add** asks for chain id, name, RPC, REST, bech32 prefix, denom and decimals. RPC and REST must be `https://`. Only add endpoints you trust: they will see your addresses and can show fake balances or refuse to broadcast.

A dApp can propose a chain too ([suggest a chain](../integrate/suggest-chain.md)). You still have to approve it.

## Live balances

Home shows a switch for live balances. When it is on, the wallet reads spendable and staked amounts from each chain's public LCD.

- Chrome and Firefox prompt once for host access.
- Safari never prompts. Allow **Other Websites** under Settings → Apps → Safari → Extensions → Zunia, then try the switch again.

Turn it off and the wallet stops those requests.

## Fees

Network fees go to validators, not to Zunia. Before you sign, the screen shows the fee denom, the amount and the gas. Advanced gas price lives under **Settings & security** → **Preferences**. Defaults come from the registry.
