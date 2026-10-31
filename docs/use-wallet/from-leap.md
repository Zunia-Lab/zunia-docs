---
title: Move from Leap Wallet
---

# Move from Leap Wallet

Leap Wallet has shut down. The tokens are still on the chains, at the addresses of your recovery phrase. Import that phrase into Zunia and the same addresses appear. Nothing is sent, unstaked, or moved. Zunia never holds the funds.

Zunia is a self-custody Cosmos wallet: [zunialab.com](https://zunialab.com/).

## What you need

The 12 or 24 words you wrote down for Leap. Leap's password does not transfer. A private key on its own is not enough, and Zunia does not import one.

If an old Leap install still opens, reveal the phrase inside that app and write it on paper. Do not photograph it, and do not type it into a website, an email, or a chat. That includes this page. Zunia support never asks for the phrase.

If the Leap wallet was a hardware device, there is no phrase to type. Leave the funds on that device. Hardware signing in Zunia is not available yet.

## Install Zunia

Use only these listings.

- Chrome: [Chrome Web Store](https://chromewebstore.google.com/detail/zunia/ngokakoekdogobjmokipglbcclelgajk)
- Safari on Mac: [Mac App Store](https://apps.apple.com/app/zunia/id6816604128?mt=12)
- iPhone: [App Store](https://apps.apple.com/app/zunia-wallet/id6824444063), the app named Zunia Wallet
- Android: [Google Play](https://play.google.com/store/apps/details?id=com.zunialab.wallet)

Safari on iPhone and iPad is still in review. The iPhone wallet is the App Store app, not the Mac listing.

## Import

Type the words only inside the app you just installed.

- **Extension:** open Zunia, then **Restore with phrase**.
- **Phone:** **I have a recovery phrase**.

The password you choose only unlocks this device. It is not part of the phrase. 12 or 24 words, in order. Zunia does not ask for an extra passphrase word. If Leap had one, the address below will not match. Stop.

## Check the address before you sign anything

Compare an address you already know with the one Zunia shows, on a chain both wallets have open. Cosmos Hub (`cosmos1…`) is the usual check.

If it matches, the balances and the staking on that address are already there. Names, the address book, and settings do not come across. Turn on the other networks you used. See [Networks](./networks.md).

If it does not match, do not send and do not stake. The usual reasons are a missing or extra word, an extra passphrase word, or a later address that Leap derived from the same phrase. Importing the phrase shows the first address of those words. **Add account** creates or restores a different phrase. It does not recreate that later address. See [More accounts](./keys.md#more-accounts).

A second Leap phrase, one with different words, is a separate import. On the extension: account name → **Add account** → **Restore with phrase**. On the phone: **Settings & security** → **Wallets** → **Add account** → **Restore with a recovery phrase**.

The same words in the extension and on the phone produce the same first address. Each device keeps its own copy. See [Keys and accounts](./keys.md).
