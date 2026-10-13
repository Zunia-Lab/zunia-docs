---
title: Keys and accounts
---

# Keys and accounts

Zunia is an HD wallet (BIP-39 / BIP-44). Each account has a bech32 address per network.

- Default coin type **118** (Cosmos). A chain in the catalog can set another.
- Coin type **60** for Ethermint-style addresses. That is address derivation only. Zunia is not an Ethereum wallet.

## Create

Onboarding → **Create wallet** → write the phrase on paper → confirm some of its words → set a name and a password → choose networks. The phrase is shown once during setup. Screenshots are a bad idea.

## Import

Onboarding → **Restore with phrase** in the extension, **I have a recovery phrase** in the mobile app. 12 or 24 words. The password only unlocks this device; it is not part of the phrase.

## More accounts

The two apps add accounts differently:

- **Extension:** account name (top left) → **Add account** → **Create new account** or **Restore with phrase**. Each account added this way has its own recovery phrase. The same password unlocks them all. Back up each phrase.
- **Mobile app:** **Settings & security** → **Wallets** → **Add account**. It derives the next account from the same phrase, so backing up that phrase backs up all of them.

So only the first account of a phrase appears in both apps when you import that phrase. Switch accounts from the account list; a connected site hears `accountsChanged`.

## Reveal the phrase

**Settings & security** → **Security** → **Reveal recovery phrase** (password again). There is no way to change the password. **Forgot password?** on the extension's unlock screen removes the wallet so you can restore it from the phrase. It only helps if you still have that phrase, and the phrase of each account you added with its own.

## Backup

Zunia cannot recover a lost phrase. Store it offline. Anyone with the phrase has the accounts.

Ledger and Keystone are planned, not available.
