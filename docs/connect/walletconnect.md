# WalletConnect

On mobile, dApps connect via **WalletConnect v2**. Config is in place; session handling is not implemented yet.

## Config (do this first)

1. Create a project at [cloud.walletconnect.com](https://cloud.walletconnect.com).
2. Use the **same** project ID in:
   - `zunia-mobile` → `.env` / `--dart-define=WALLETCONNECT_PROJECT_ID=...` (see `.env.example`)
   - `zunia-extension` → `WXT_WALLETCONNECT_PROJECT_ID` (see `.env.example`)
   - `zunia-dashboard` / `zunia-website` → `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
3. Canonical settings live in:
   - Mobile: [`config/connect.yaml`](https://github.com/Zunia-Lab/zunia-mobile/blob/main/config/connect.yaml) and `lib/config/connect_config.dart`
   - Extension: [`config/connect.ts`](https://github.com/Zunia-Lab/zunia-extension/blob/main/config/connect.ts)

## Deep links (mobile)

| Kind | Example |
|------|---------|
| Custom scheme | `zunia://wc?...` |
| WalletConnect URI | `wc:...` |
| Universal / App Link | `https://zunialab.com/wc?...` |

Verified HTTPS links require:

- iOS: `Runner.entitlements` associated domains + `apple-app-site-association` on the website (replace `TEAMID`)
- Android: `android:autoVerify` intent filters + `assetlinks.json` (replace Play signing SHA-256)

Files on the marketing site:

- `https://zunialab.com/.well-known/apple-app-site-association`
- `https://zunialab.com/.well-known/assetlinks.json`

## User flow (when implemented)

1. Scan the QR code or open the deep link from the dApp
2. Approve the session and select accounts
3. Review each signing request in the Zunia app

Zunia shows human-readable transaction previews before you confirm (`require_tx_preview` in config).
