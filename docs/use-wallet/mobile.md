---
title: Install the mobile wallet
---

# Install the mobile wallet

The iOS and Android apps are not in the App Store or Play Store. Build them with Flutter 3.24+ (the repo currently tracks 3.41.x).

```bash
git clone https://github.com/Zunia-Lab/zunia-mobile.git
cd zunia-mobile
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

There is no public relay. The site must point at one it runs, and the phone must trust that relay (debug builds trust localhost).

WalletConnect QR codes can open a session. The app does not sign those requests yet.

## Same phrase, two devices

Import the phrase on the second device. Each device holds its own encrypted copy. Losing both copies without the phrase means the accounts are gone.
