---
title: Fees
---

# Fees

The wallet is free to install. There is no premium tier and no token.

| Action | Network fee | Zunia commission |
|--------|-------------|------------------|
| Send, IBC transfer | Yes | None |
| Stake, claim, redelegate, undelegate | Yes | None |
| Swap with the extension's **Swap** screen | Yes | 0.5% |

## Network fee

Every transaction pays a network fee to the chain. It goes to validators, not to Zunia. Before you sign, the screen shows the fee denom, the amount and the gas. Gas settings are under [Networks](./networks.md#fees).

## Swap commission

A swap made with the **Swap** screen of the Zunia browser extension carries a 0.5% commission, sent to Zunia.

- It is taken in the same transaction as the swap.
- It is paid in the token you sell.
- The review screen shows it before you sign.

## Swaps that start on another chain

When the funds sit on another chain, they are transferred to Osmosis and swapped there. The commission is taken on the starting chain, when that transfer is sent.

If the swap then fails on Osmosis, the amount swapped comes back. The commission does not.

## No commission

Sends, IBC transfers and staking carry no Zunia commission. You pay only the network fee. Zunia takes no cut of staking rewards.

A swap you make on a dApp and only sign with Zunia carries no Zunia commission.

The commission shown next to a validator in Earn is set by that validator. It is not Zunia's.
