---
title: Fees
description: The network fee every transaction pays, and the 0.5% commission on swaps made with Zunia's own Swap screen in the extension, the mobile app or on the web dashboard.
---

# Fees

The wallet is free to install. There is no premium tier and no token.

| Action | Network fee | Zunia commission |
|--------|-------------|------------------|
| Send, IBC transfer | Yes | None |
| Stake, unstake, claim rewards, vote | Yes | None |
| Swap with the **Swap** screen of the extension, of the mobile app, or of the [web dashboard](https://app.zunialab.com) | Yes | 0.5% |
| Swap on another site or dApp, signed with Zunia | Yes | None |

## Network fee

Every transaction pays a network fee to the chain. It goes to validators, not to Zunia. Before you sign, the screen shows the fee denom, the amount and the gas. Gas settings are under [Networks](./networks.md#fees).

## Swap commission

A swap made with the **Swap** screen of the Zunia browser extension, of the Zunia mobile app (from version 0.1.0), or of the web dashboard at app.zunialab.com, carries a 0.5% commission, sent to Zunia. All three charge the same rate to the same Zunia addresses.

- It is taken in the same transaction as the swap.
- It is paid in the token you sell.
- The review screen shows it before you sign.

On a chain where Zunia has no fee address, the swap carries no commission.

## Swaps that start on another chain

When the funds sit on another chain, they are transferred to Osmosis and swapped there. The commission is taken on the starting chain, when that transfer is sent.

If the swap then fails on Osmosis, the amount swapped comes back. The commission does not.

Some pairs cannot be swapped in one step from another chain. The **Swap** screen then asks you to move the tokens to Osmosis first: with Send in the extension, with **Move to Osmosis** (which opens Send) in the mobile app, with Bridge on the web dashboard. That transfer carries no commission. The swap that follows starts on Osmosis, and its commission is taken there, in the same transaction.

## No commission

Sends, IBC transfers and staking carry no Zunia commission. You pay only the network fee. Zunia takes no cut of staking rewards.

A swap you make on another site or dApp and only sign with Zunia carries no Zunia commission.

The commission shown next to a validator in Earn is set by that validator. It is not Zunia's.
