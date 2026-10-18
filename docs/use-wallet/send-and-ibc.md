---
title: Send and IBC
description: "Send on the same chain or over IBC from the extension or Zunia mobile: route checks, packet-forward hops, the review, default memos, following a transfer, Receive and zunia://pay payment requests, the address book."
---

# Send and IBC

Home → **Send**. Pick the token, the recipient and the amount. Same-chain sends stay on that network. If the recipient is on another catalog chain, the wallet builds an IBC transfer (including packet-forward when the route needs a hop).

The review screen shows:

- Source token and amount
- Destination chain and address
- Route (channels)
- Fee on the source chain
- Memo, if you set one

Sign on the device. The wallet broadcasts from the LCD you configured for that chain. Arrival time is whatever the IBC relayers take; Zunia does not run those.

Leave the memo empty and Zunia writes one that names the action and ends with `· by Zunia-wallet`, such as `Send USDC.n · by Zunia-wallet`. A memo is public and stays on the chain.

## In Zunia mobile

**Wallet** → **Send** sends any token you hold. Before it offers a route to another chain, Zunia checks each channel on both chains: open, pointing back at each other, and with both light clients active. A channel whose light client expired is refused. When there is no direct channel, it forwards through up to 3 hops.

The fee comes from a simulation of the transaction, at the speed you pick (**Low**, **Mid**, **High**). A transfer to another chain is followed until it lands, also after you restart the app, but only while the app is open.

**Receive** shows the address and QR code of each network, with **Copy** and **Share**; star a network to keep it on top. **Request an amount** adds a token, an amount and a memo to the code, as a `zunia://pay` payment request:

```text
zunia://pay?chain=<chain id>&to=<address>&denom=<denom>&amount=<base units>&memo=<text>
```

Only `to` is required, and `amount` is in base units of `denom`. Scanned or pasted in Zunia (**Pair a device**, or the scan button on **Wallet**), or opened as a link from another app, it opens Send with every field filled in for you to check. Nothing is signed until you approve the review. A plain address, a `cosmos:<address>` URI or `{"address": "…"}` JSON scans too.

**Deposit** (**Receive** in the mobile app) shows the current account's address and QR for the selected network. Check the prefix (`cosmos`, `osmo`, …) before you give it out.

**Address book** (menu) stores labels so you do not paste a raw bech32 every time. In Zunia mobile a contact has a name, an address, an optional network and a note; Send suggests favourites first, then the ones you used last.

**Swap** is a separate home action (a tab in Zunia mobile). It uses the same review + sign path. In the extension it needs the WASM kernel; if the kernel failed to load, Confirm stays disabled and the screen says why.

A swap made with **Swap** carries a 0.5% Zunia commission, taken in the same transaction from the token you sell. The review screen shows it before you sign. Sends and IBC transfers carry no commission. [Fees](./fees.md) covers swaps that start on another chain.

Do not paste a seed phrase into any website, including the Zunia web dashboard at `app.zunialab.com`. It never asks for one: it holds no keys and sends every transaction to your wallet to sign.
