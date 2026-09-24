---
title: Keys and accounts
---

# Keys and accounts

Zunia is an HD wallet (BIP-39 / BIP-44). One recovery phrase derives many accounts. Each account has a bech32 address per network.

- Default coin type **118** (Cosmos).
- Coin type **60** for Ethermint-style addresses. That is address derivation only. Zunia is not an Ethereum wallet.

## Create

Onboarding → **Create wallet** → write the phrase on paper → set a password. The phrase is shown once. Screenshots are a bad idea.

## Import

Onboarding → **Import wallet**, or later **Settings & security** → **Accounts**. 12 or 24 words. The password only unlocks this device; it is not part of the phrase.

## More accounts

Home → account name (top left) → **Add account**. New addresses from the same phrase. Switch from that list; a connected site hears `accountsChanged`.

## Reveal or change

**Settings & security** → **Security** → reveal phrase (password again) or change the password. **Forgot password** only works if you still have the phrase.

## Backup

Zunia cannot recover a lost phrase. Store it offline. Anyone with the phrase has the accounts.

Ledger and Keystone are planned, not available.
