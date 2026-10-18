---
title: Zunia mobile
description: What Zunia mobile 0.1.0 does on iPhone and Android (accounts, send and IBC, swap with the 0.5% commission, staking, governance, NFTs, activity, notifications, address book, networks), how to connect a website by QR, how other apps use it, the in-app browser, security, WalletConnect, and how to build it.
---

# Zunia mobile

Zunia mobile is the Zunia wallet for iPhone and Android. Version 0.1.0 does what the [browser extension](./extension.md) 0.1.5 does, laid out for a phone. It signs with the same Rust kernel (zunia-core) and derives the same addresses from the same recovery phrase.

Zunia mobile 0.1.0 is not on the App Store or Google Play yet. Until it is listed, [build it yourself](#build-it-yourself).

## What it does

The tab bar has **Wallet**, **Swap**, **Earn**, **Discover** and **Activity**. The menu holds the rest: networks, collectibles, governance, rewards, pairing, connected apps, address book, notifications and **Settings & security**.

- **Accounts.** Create a wallet or import a 12- or 24-word phrase. Add more accounts, each with its own recovery phrase, created new or restored; one password unlocks them all. Back up each phrase. See [Keys and accounts](./keys.md).
- **Wallet.** Balances on the networks you turned on, with prices, and each token's details. **Receive** shows your address and its QR code.
- **Send and IBC.** Send on the same chain, or to another chain over IBC, to an address or a contact. The review shows the amount, the network fee and, across chains, the route. You can follow a transfer until it lands. See [Send and IBC](./send-and-ibc.md).
- **Swap.** The **Swap** tab swaps through Osmosis, also from tokens on another chain. A swap made there carries Zunia's 0.5% commission, shown on the review screen before you sign. See [Fees](./fees.md).
- **Earn.** Stake, unstake, move stake to another validator, and claim rewards. See [Staking](./staking.md).
- **Governance.** Read proposals on your networks and vote.
- **Collectibles.** Your NFTs, and sending one.
- **Activity.** Your transactions and their status.
- **Notifications.** Alerts on the phone about your wallet, with settings for which ones you get.
- **Address book.** Saved recipients, to pick when you send.
- **Networks.** Turn networks on or off, add one by hand (`https://` endpoints only), and set gas. See [Networks](./networks.md).

## Connect to a website by QR

1. On the site, choose **Connect with Zunia**. It shows a QR code.
2. Scan it with Zunia (**Pair a device** in the menu).
3. Check that the 6-digit code on the phone matches the site.
4. Read the origin the relay confirmed. If it is not the site you opened, stop.
5. Approve the chains. Each later signature opens a review sheet on the phone.

Pairing goes through Zunia's relay at `api.zunialab.com`, the only relay the app trusts by default; a code that names another relay is refused. Messages are encrypted between the site and the phone, so the relay cannot read them. A session lasts 24 hours. **Connected apps** lists your sessions; end one there.

When the site is open on the phone itself, choose **Open the Zunia app** instead of scanning. Zunia opens, and once you answer it takes you back to the site. After that, each signature the site asks for brings Zunia up with the request on screen.

## Other apps on this phone

Another app can use Zunia as its wallet without a QR code: it opens Zunia with a link, you approve there, and Zunia takes you back to the app. Later requests bring Zunia up the same way. An app is not a web page, so Zunia cannot confirm which site it speaks for: it says so on the connect sheet, and refuses sign-in requests from it. Developers: see [Use Zunia mobile from another app](../integrate/app-to-app.md).

## The in-app browser

**Discover** opens sites inside Zunia. There a site sees Zunia as its wallet directly, as it would see the extension on a computer: it asks to connect for the chains it names, and every signature opens a review sheet. A `zunia://dapp?url=…` link opens a site there after you confirm the address.

## Security

- Your phrases never leave the phone. They are stored encrypted with your password, and Zunia does not sync them through a server.
- Every signature is made by the zunia-core kernel, the same code the extension runs. A build without the kernel shows an error instead of the wallet; it never signs with other code.
- Face ID, Touch ID or a fingerprint can unlock Zunia. That unlock is tied to a key in the phone's keystore (Keychain on iOS, Android Keystore).
- Zunia locks itself after the time you set (auto-lock), and asks for your password or biometrics again.
- On Android, screens that show a recovery phrase block screenshots, and the wallet is left out of cloud backups.
- A site or app sees only the accounts and chains you approve, and nothing is signed without your review.

See the [security model](../security/model.md).

## WalletConnect

Zunia mobile 0.1.0 signs WalletConnect v2 requests (`cosmos_getAccounts`, `cosmos_signAmino`, `cosmos_signDirect`, `cosmos_signArbitrary`) in builds that include a WalletConnect project id. In a build without one, WalletConnect is off, and **Settings & security** says so. Zunia's own QR pairing does not need it, and also shows you the site's verified origin, so sites using the Zunia SDK pair that way.

## Same phrase, two devices

Import the phrase on the second device. Each device holds its own encrypted copy. Losing every copy without the phrase means the accounts are gone.

## Build it yourself

Build with a Flutter release that ships Dart 3.11.5 or later (the repo builds with Flutter 3.41). The app runs on iOS 13 and Android 7.0 (API 24) or later.

The app links zunia-core and zunia-ui from checkouts next to it, and needs the signing kernel's native libraries from a [zunia-core release](https://github.com/Zunia-Lab/zunia-core/releases). `scripts/fetch-native.sh` downloads and checks them; it needs the GitHub CLI (`gh`).

```bash
git clone https://github.com/Zunia-Lab/zunia-core.git
git clone https://github.com/Zunia-Lab/zunia-ui.git
git clone https://github.com/Zunia-Lab/zunia-mobile.git
cd zunia-mobile
ZUNIA_CORE_TAG=<zunia-core release tag> ./scripts/fetch-native.sh
flutter pub get
flutter run
```

Release builds:

```bash
flutter build apk --release
flutter build appbundle --release
flutter build ipa --release   # needs an Apple team in Xcode
```

To turn WalletConnect on, pass your project id: `--dart-define=WALLETCONNECT_PROJECT_ID=<id>`.
