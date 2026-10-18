---
title: Networks
description: "Turn networks on or off and add a custom chain (registry or manual, https endpoints) in the extension and in Zunia mobile, live balances and live reads, and the network fee: Low, Mid or High speed and the gas adjustment."
---

# Networks

Home lists the networks you turned on. You choose them when you create or restore a wallet (**Choose networks**). The bundled catalog comes from [zunia-chain-registry](https://github.com/Zunia-Lab/zunia-chain-registry). Updates to that repo ship in the next wallet build.

## Manage networks

Menu → **Manage networks**. Turn each network on or off for the current account, or add one the catalog does not have with **Add chain manually**.

**Add network** has two tabs. **Registry** searches the catalog. **Manual** asks for chain name, chain ID, RPC, REST, prefix, coin type, base denom and gas price; the token gets 6 decimals. RPC and REST must be `https://`. Only add endpoints you trust: they will see your addresses and can show fake balances or refuse to broadcast.

A dApp can propose a chain too ([suggest a chain](../integrate/suggest-chain.md)). You still have to approve it.

## In Zunia mobile

Menu → **Manage networks**, or **Settings** → **Networks**. Search by name, chain ID or token, filter **All**, **Main**, **Test** or **On**, and use **Select all** or **Clear**. One network has to stay on.

The **+** button opens **Add network**: **Registry** searches the catalog, **Manual** asks for name, chain ID, RPC, REST, address prefix, coin type, base denom, symbol, decimals and gas price, and whether it is a testnet. **Test** asks the node which chain it runs before you save. The same checks apply as in the extension: `https://` endpoints with no credentials in them. Networks you add are kept across restarts and listed under **Custom**; long-press one to remove it. Funds on a removed network stay on the chain.

Each account keeps its own list of networks.

## Live balances

While live balances are off, Home shows **Turn on live balances** with an **Enable** button. The switch itself is **Settings & security** → **Preferences** → **Live balances**. When it is on, the wallet reads spendable and staked amounts from each chain's public LCD.

- Chrome and Firefox prompt once for host access.
- Safari never prompts. On iPhone and iPad, allow **Other Websites** under Settings → Apps → Safari → Extensions → Zunia. On a Mac, Safari → Settings → Extensions → Zunia → **Always Allow on Every Website**, with Other Websites set to Allow. Then try the switch again.

Turn it off and the wallet stops those requests.

In Zunia mobile the switch is **Settings** → **Preferences** → **Live reads**, on by default. It covers balances, staking, proposals and history. With it off, the wallet asks no network anything; addresses still derive on the phone and you can still sign.

## Fees

Network fees go to validators, not to Zunia. Before you sign, the screen shows the fee denom, the amount and the gas. The network fee row on the Send and Swap screens opens the speed (**Low**, **Mid**, **High**) and the gas adjustment, and Zunia keeps your choice. Defaults come from the registry.

Zunia mobile uses the same speeds (**Low**, **Mid**, **High**) and a gas adjustment from 1.0 to 2.0, 1.4 by default, applied to the simulated gas.

A swap made with the **Swap** screen of the extension, of the mobile app or of the [web dashboard](https://app.zunialab.com) also carries a 0.5% Zunia commission. See [Fees](./fees.md).
