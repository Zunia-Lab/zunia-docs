---
title: Flutter
description: Connect a Flutter app to Zunia mobile with the zunia_sdk package from pub.dev. Pair by QR code or on the same phone, sign Direct, Amino and ADR-036, restore the session after a restart, and handle errors.
---

# Flutter

[`zunia_sdk`](https://pub.dev/packages/zunia_sdk) connects a Flutter app to Zunia mobile over `zunia.connect.v2`, the same protocol as `@zunialab/sdk-web`. You can pair in two ways:

- **QR code.** Show a code from a tablet, a desktop or Flutter web, and scan it with Zunia on a phone.
- **Same phone.** Open Zunia on the phone your app runs on.

Messages are end-to-end encrypted, and the relay only forwards ciphertext. Both screens show the same 6-digit code.

The package runs on Android, iOS, web, macOS, Windows and Linux. It needs Flutter 3.27 or later.

```sh
flutter pub add zunia_sdk
```

## Connect

```dart
import 'package:zunia_sdk/zunia_sdk.dart';

final zunia = ZuniaConnectClient(
  metadata: const ZuniaDappMetadata(name: 'My app', url: 'https://myapp.example'),
  storage: SecureSessionStorage(const FlutterSecureStorage()), // see "Restore"
  returnUrl: 'myapp://zunia', // see "Same phone"
);

if (!await zunia.restore(chains: ['cosmoshub-4'])) {
  showModalBottomSheet(
    context: context,
    builder: (_) => ZuniaPairingView(client: zunia),
  );
  await zunia.connect(chains: ['cosmoshub-4']);
}

final account = zunia.accounts.first; // chainId, address, algo, pubKey, name
```

`ZuniaPairingView` shows three things, in order:

1. The QR code, with its expiry countdown.
2. An **Open Zunia on this device** button.
3. Once Zunia has scanned, the 6-digit code to compare.

To build your own screen, `zunia.pairing!.uri` is the QR payload and `ZuniaQrCode(data: ...)` draws it.

The client relays through `https://api.zunialab.com` unless you pass another `apiBase`.

`connect` returns once the person approves. It throws a `ZuniaConnectException` with one of these codes:

- `USER_REJECTED`: the person declined.
- `TIMEOUT`: no approval after 5 minutes, or after the 10-minute life of the QR code.
- `UNKNOWN_CHAIN`: Zunia approved none of the chains you asked for.
- `PAIRING_FAILED` or `NETWORK`: the pairing or the relay connection failed.

`ZuniaConnectClient` is a `ChangeNotifier`. Rebuild with `ListenableBuilder`, or listen to its streams: `statusChanges`, `accountsChanges`, `chainsChanges`, `verificationCodes` and `disconnects`. `walletOnline` says whether Zunia is connected to the relay right now.

## Sign

```dart
final direct = await zunia.signDirect('cosmoshub-4', account.address, ZuniaSignDoc(
  bodyBytes: bodyBytes,
  authInfoBytes: authInfoBytes,
  chainId: 'cosmoshub-4',
  accountNumber: BigInt.from(accountNumber),
));
// direct.signature.signatureBytes: 64 bytes. Build TxRaw from direct.signed and broadcast it.

final amino = await zunia.signAmino('cosmoshub-4', account.address, stdSignDoc);
// Broadcast amino.signed: Zunia may have changed the fee.

final adr36 = await zunia.signArbitrary('cosmoshub-4', account.address, 'Hello');
```

Each request waits up to 5 minutes (`requestTimeout`).

If the link to the relay drops, the client reconnects with backoff and resends any request the relay never confirmed. It also reconnects as soon as your app returns to the foreground.

## Same phone

When Zunia is on the phone your app runs on:

1. Call `connect(chains: [...], openZunia: true)`, or have the person tap the button in `ZuniaPairingView`. Zunia opens the pairing link, `zunia://connect?...&ret=<returnUrl>`.
2. After the person approves or declines, Zunia opens `returnUrl` to bring them back.
3. Later, each signature request opens the wake link, `zunia://connect/wake?sid=<session id>`. Zunia brings the waiting request to the front, and returns to your app when the person answers.

The wake link carries no secret and never pairs. Zunia ignores a session id it does not know.

A session paired by QR code never opens Zunia by itself. Pass `openWallet: ZuniaOpenWallet.never` to stop wake links altogether.

`returnUrl` must be one of:

- an `https:` link your app handles;
- your own scheme, such as `myapp://zunia`.

It can be at most 512 characters. Zunia ignores the `zunia`, `zuniamobile`, `wc`, `javascript`, `data`, `file`, `blob`, `about`, `content`, `intent` and `http` schemes.

Register the return scheme, and declare the `zunia` scheme so `ZuniaLinks.isInstalled()` can see Zunia:

```xml
<!-- Android: AndroidManifest.xml -->
<queries>
  <intent>
    <action android:name="android.intent.action.VIEW" />
    <data android:scheme="zunia" />
  </intent>
</queries>
<!-- inside your <activity> -->
<intent-filter>
  <action android:name="android.intent.action.VIEW" />
  <category android:name="android.intent.category.DEFAULT" />
  <category android:name="android.intent.category.BROWSABLE" />
  <data android:scheme="myapp" android:host="zunia" />
</intent-filter>
```

```xml
<!-- iOS: Info.plist -->
<key>LSApplicationQueriesSchemes</key>
<array><string>zunia</string></array>
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLSchemes</key>
    <array><string>myapp</string></array>
  </dict>
</array>
```

Your app does not need to read the return link. The answer arrives over the relay, which holds frames for up to 10 minutes while your app is in the background.

If Zunia is not installed, `openZunia: true` throws `NOT_INSTALLED`. Offer `ZuniaLinks.openInstallPage()`.

## Restore after a restart

`restore()` reattaches to the saved session without asking anything. It answers `false` in three cases:

- there is no saved session;
- the session expired (a session lasts 24 hours once paired);
- it covers none of the chains you pass.

The saved record holds the session keys and the relay token, so keep it in the platform keystore:

```dart
class SecureSessionStorage implements ZuniaSessionStorage {
  const SecureSessionStorage(this.storage);
  final FlutterSecureStorage storage;

  @override
  Future<String?> read(String key) => storage.read(key: key);
  @override
  Future<void> write(String key, String value) => storage.write(key: key, value: value);
  @override
  Future<void> delete(String key) => storage.delete(key: key);
}
```

Without `storage`, the session lives in memory.

Two calls end the client:

- `disconnect()` ends the session for both sides.
- `dispose()` stops the client but keeps the saved session.

## Sign in

`signIn(nonce: ...)` builds a [Sign in with Zunia](./sign-in.md) message for the web origin the relay verified, and Zunia checks that origin before it signs. Verify the result on your server with `verifySignIn` from `@zunialab/sdk-core`.

Only browsers send an origin, so `signIn` works on **Flutter web**. In a native app there is no origin, and `signIn` throws `ORIGIN_MISMATCH` without asking the phone. Instead, have your server issue a challenge, sign it with `signArbitrary`, and verify the ADR-036 signature on your server.

## Errors

Every failure is a `ZuniaConnectException`. Its `code` is one of the codes in [Errors](../reference/errors.md), the same as the web SDK. `explainZuniaError(error)` gives a title and a sentence to show.

Two failures are refused before they reach the phone:

| Code | Reason | When |
|------|--------|------|
| `INVALID_PARAMS` | `too-large` | The sealed request is over the relay's 512 KiB frame limit. Nothing was sent. |
| `NETWORK` | `queue-full` | Zunia is offline and the relay already holds 32 frames (or 1 MiB) for it. The request fails at once instead of timing out. |

## The wallet side

The other end of every session is Zunia mobile ([zunia-mobile](https://github.com/Zunia-Lab/zunia-mobile)). It shows the 6-digit code and the verified origin, binds sign-in to that origin, and resumes the session after a reconnect. For its status and how to build it, see [Install the mobile wallet](../use-wallet/mobile.md).

Return links (`ret`) and wake links need a Zunia mobile build that handles them, 0.1.0 or later. An older build pairs and signs the same way but leaves the person in Zunia.
