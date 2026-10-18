---
title: Keys and accounts
description: "Phrases, accounts and the password in the extension and Zunia mobile: create, restore, add accounts, the mobile vault, biometrics, auto-lock, password on every signature, change password, reveal, screenshots, removing the wallet."
---

# Keys and accounts

Zunia is an HD wallet (BIP-39 / BIP-44). Each account has a bech32 address per network.

- Default coin type **118** (Cosmos). A chain in the catalog can set another.
- Coin type **60** for Ethermint-style addresses. That is address derivation only. Zunia is not an Ethereum wallet.

The extension and Zunia mobile derive the same addresses from the same phrase.

## Create

- **Extension:** **Create wallet** → write the phrase on paper → confirm some of its words → set a name and a password → choose networks.
- **Mobile:** **Create a new wallet** → tick the two statements → reveal the 12 or 24 words and write them down → pick the words Zunia asks for → name and password (at least 8 characters) → choose networks.

The phrase is shown once during setup. Write it on paper, not in a photo.

## Restore

**Restore with phrase** in the extension, **I already have a wallet** in the mobile app. 12 or 24 words. The password only unlocks this device; it is not part of the phrase.

In the mobile app a restored phrase starts as **not verified**. Zunia offers to check your written copy against it; **Security** → **Backup** does it later.

## More accounts

Both apps add accounts the same way: each new account has its own recovery phrase, created new or restored from a phrase you already have. The same password unlocks them all. Back up each phrase: a phrase only restores its own account.

- **Extension:** account name (top left) → **Add account** → **Create new account** or **Restore with phrase**.
- **Mobile:** **Settings & security** → **Accounts** → **Add account** → **Create new account** or **Restore with a recovery phrase**. The account switcher in the header has **Add account** too.

To have an account in both apps, import its phrase in each. Switch accounts from the account list; a connected site hears `accountsChanged`.

### Accounts from the first phrase

Accounts that earlier builds added without a phrase of their own are children of the first phrase, at `m/44'/<coin type>'/0'/0/N`. Zunia mobile marks them **from the first phrase · #N**, and that first phrase backs them up.

Pre-release builds of Zunia mobile derived those extra accounts at `m/44'/<coin type>'/N'/0/0`. Version 0.1.0 derives them the way the extension does, so their addresses change. The phrase is the same: funds on the old addresses stay there, and any wallet that derives `m/44'/<coin type>'/N'/0/0` from that phrase can still move them.

## The password and the mobile vault

In Zunia mobile, the kernel seals each recovery phrase with your password (Argon2id, then XChaCha20-Poly1305). One password seals them all, and it is never stored. The sealed phrases live in one item of the phone's secret store:

- **iPhone:** the Keychain, for this device only, readable after the first unlock since the phone started. Not synced to iCloud, not restored onto another device.
- **Android:** EncryptedSharedPreferences, whose key is in the Android Keystore. The app opts out of Android backup and device transfer.

Deleting the app on iPhone removes the wallet: the Keychain keeps items after an app is deleted, so the next install erases what it finds. Android removes it with the app.

A vault from a pre-release build moves to this format the first time you unlock with your password. Biometric unlock then has to be turned on again.

## Unlock

A wrong password costs nothing for three tries. After that, each further failure doubles the wait, from 2 seconds up to 5 minutes. Closing the app does not reset the wait. The extension uses the same schedule.

**Face ID**, **Touch ID** or a **fingerprint** can unlock Zunia mobile. It is bound to the phone's secure hardware:

- iPhone: a Keychain item only the currently enrolled faces or fingers can read.
- Android: an AES-256-GCM key in the Android Keystore that needs a strong biometric for each use, through the system prompt.

Your password stays the key and always works. Adding a face or a fingerprint to the phone turns biometric unlock off for good: Zunia says so, you unlock with the password, and you turn it on again in **Security**.

## Lock

**Settings & security** → **Security** → **Auto-lock**: **Immediately**, **1 min**, **5 min**, **10 min** (the default) or **30 min**, counted from your last touch, including time spent in other apps. **Immediately** locks as soon as you leave the app. **Lock now** and **Lock wallet** lock at once.

Locking wipes the phrases from memory and covers the app. Whatever was open is still there after unlocking, except screens that show a secret: those close.

## Password on every signature

**Security** → **Password on every signature**, off by default. When on, Zunia asks for biometrics or the password before each signature, even while unlocked: every transaction in the wallet, and every request from the in-app browser, Zunia Connect and WalletConnect. Turning it off asks too.

## Change the password

- **Mobile:** **Security** → **Change password**. Enter the current password and the new one. Every account's phrase is sealed again under the new password in one step, and biometric unlock asks to be confirmed again.
- **Extension:** there is no way to change the password.

## Forgot the password

The password never leaves the device, so nobody can reset it. **Forgot password? Restore with your phrase** on the unlock screen (both apps) removes the wallet so you can restore it. It only helps if you still have that phrase, and the phrase of each account you added with its own.

## Reveal the phrase

- **Extension:** **Settings & security** → **Security** → **Reveal recovery phrase** (password again).
- **Mobile:** **Security** → **Show recovery phrase**, or an account's options under **Accounts**. Biometrics or the password, then hold the button to see the words; they hide when you let go. Zunia forgets the phrase after 60 seconds, when you leave the app, and when the wallet locks.

## Screenshots and the clipboard (mobile)

- **Android:** screenshots and screen recording are blocked on the recovery phrase, unlock and password screens, and allowed elsewhere, so a receive QR code can be shared. On Android 13 and later the app's card in Recents is blank.
- **iPhone:** iOS cannot block screenshots. After one on a phrase screen, Zunia warns you to delete it, including from Recently Deleted. While the screen is recorded, mirrored or sent over AirPlay, the phrase is hidden. The app switcher shows a cover instead of the app.
- A copied recovery phrase is cleared from the clipboard after 30 seconds, when you leave the screen, and when the wallet locks. On iPhone the copy stays on this device (no Universal Clipboard); on Android 13 and later it is marked sensitive, so the copy preview does not show it.

## Device checks (mobile)

**Security** → **Device integrity** runs basic jailbreak and root checks: known files and apps, writes outside the sandbox, hooking libraries, `su`, test-keys builds, Magisk. "No obvious sign of root or jailbreak" is all a clean result means. These are the first things an attacker hides; they are not Play Integrity or App Attest.

## Remove the wallet

- **Mobile:** **Security** → **Remove wallet from this device**: your password, then type `REMOVE`. It disconnects every Zunia Connect and WalletConnect session, then erases the sealed phrases, the biometric secret, every account, site permissions, the address book, added networks and caches. Display and lock preferences stay. From **Forgot password?** it takes the word `REMOVE` alone.
- To remove one account instead: **Accounts** → its options → **Remove from this device** (password required). The last account cannot be removed that way.

## Backup

Zunia cannot recover a lost phrase. Store it offline. Anyone with the phrase has the accounts.

Ledger and Keystone are planned, not available.
