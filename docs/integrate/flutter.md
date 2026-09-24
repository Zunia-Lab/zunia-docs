---
title: Flutter
---

# Flutter

Two different things share the word "SDK" here. Keep them straight.

## A Flutter **dApp** talking to Zunia

The Dart package `zunia_sdk` in [zunia-sdk/flutter/zunia_sdk](https://github.com/Zunia-Lab/zunia-sdk/tree/main/flutter/zunia_sdk) is **not** a session client. It ships deep-link helpers and a Connect with Zunia button. A v2 client (QR pairing, events, CosmJS-equivalent signers) is planned.

```yaml
dependencies:
  zunia_sdk:
    git:
      url: https://github.com/Zunia-Lab/zunia-sdk.git
      path: flutter/zunia_sdk
```

```dart
import 'package:zunia_sdk/zunia_sdk.dart';

ConnectWithZuniaButton(
  size: ConnectWithZuniaButtonSize.medium,
  onPressed: () {
    // Open your own WalletConnect or deep-link flow.
  },
);
```

Until that client exists, a Flutter dApp should use WalletConnect with another wallet, or open a web view that uses `@zunialab/sdk-web`.

## The Zunia **wallet** (the mobile app)

[zunia-mobile](https://github.com/Zunia-Lab/zunia-mobile) is the wallet. It already speaks `zunia.connect.v2`: it reads the pairing URI, agrees on keys, shows the 6-digit code, shows the verified origin, binds sign-in to that origin, and resumes with `resumeToken`.

It accepts WalletConnect sessions when a Cloud project id is set. It does not sign WalletConnect requests yet.

Build it yourself:

```bash
git clone https://github.com/Zunia-Lab/zunia-mobile.git
cd zunia-mobile
flutter pub get
flutter run
```

Stores are not submitted. Same recovery phrase as the extension if you want both devices.
