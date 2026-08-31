# Install the mobile wallet

:::info Status
The Zunia mobile app is in active development. App Store and Play Store listings coming soon.
:::

## Development build (Flutter)

```bash
git clone https://github.com/Zunia-Lab/zunia-mobile.git
cd zunia-mobile
flutter pub get
flutter run
```

## Release builds

```bash
flutter build apk --release        # Android APK
flutter build appbundle --release  # Play Store
flutter build ipa --release        # iOS (Xcode signing required)
```

## Requirements

- iOS 16+ or Android 10+
- Flutter stable 3.24+
- Xcode (iOS) / Android SDK (Android)

## Same keys as desktop

Import your recovery phrase from the extension, or create a new wallet and import it on desktop later. Zunia never holds your keys.
