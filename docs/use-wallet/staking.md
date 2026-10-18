---
title: Staking and governance
description: "Stake, unstake and claim rewards in the extension and in Zunia mobile's Earn tab (no redelegation), Claim all in batches of 20 validators, the estimated APR and when it shows, and reading and voting on governance proposals."
---

# Staking and governance

Home → **Stake** opens Earn: validators, commission, your delegations and rewards. In Zunia mobile, **Earn** is a tab, and **Rewards** in the menu lists what you can claim on every network.

- **Stake** with a validator from its row.
- **Unstake** from a delegation. Unbonding time is the chain's (often 14 or 21 days); Zunia mobile reads it from the chain and states it before you sign.
- **Claim rewards** from Earn.

Neither app redelegates. To move stake, unstake, wait out the unbonding time, then stake again.

Each action has its own review screen (amount, fee, validator). Sign on the device. In Zunia mobile the result screen says **Confirming** until the transaction is in a block, with a link to the explorer.

## Claim all (mobile)

**Claim all** claims from at most 20 validators in one transaction, those with the most rewards first: one transaction holding them all could run past the network's gas limit. Claim again for the rest.

## Estimated APR (mobile)

Earn shows an estimated APR worked out from the chain's own parameters: inflation × (1 − community tax) ÷ the staked share of the supply. It is before your validator's commission and leaves out fees. Zunia shows it only when the chain uses the standard mint module and the numbers it reads back make sense; otherwise there is no figure rather than a guess.

## Governance

Home → menu → **Governance** lists proposals. You can vote **Yes**, **No**, **Veto** (no with veto) or **Abstain**. The wallet does not deposit for you.

In Zunia mobile, pick the networks to show, filter **All**, **Voting**, **Passed**, **Rejected** or **Deposit**, and search by title, number or network. Proposals load 10 at a time. Each shows its tally, and the vote you cast, read from the chain.

Staking parameters (minimum, unbonding, APR figures) come from the chain. Zunia takes no cut of rewards.
