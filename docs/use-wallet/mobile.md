---
title: Install the mobile wallet
---

# Install the mobile wallet

The iOS and Android apps are in App Store and Google Play review. Until they are listed, build them yourself with a Flutter release that ships Dart 3.11.5 or later (the repo builds with Flutter 3.41).

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

Create a wallet or import the same 12/24-word phrase you use in the extension. Keys stay on the phone. Zunia does not sync them through a server.

## Pair with a website

1. On the site, choose Connect with Zunia (QR).
2. Scan the code, or tap the deep link if you are already on the phone.
3. Check that the 6-digit code matches the site.
4. Read the origin the relay confirmed. If it differs from the name the site used, stop.
5. Approve the chains. Later signatures open a sheet each time.

Pairing goes through Zunia's relay at `api.zunialab.com`, the only relay the app trusts by default. A code that names another relay is refused. Debug builds also accept a relay on the same machine or local network.

Paired sites are listed under **Settings & security** → **Connected apps**, where you can end a session.

WalletConnect QR codes can open a session. The app does not sign those requests yet.

## Same phrase, two devices

Import the phrase on the second device. Each device holds its own encrypted copy. Losing both copies without the phrase means the accounts are gone. Accounts added after the first one do not carry over between the extension and the app; see [More accounts](./keys.md#more-accounts).
