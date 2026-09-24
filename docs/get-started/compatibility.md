---
title: Compatibility
---

# Compatibility and status

Honest status for each surface. Nothing here is listed in a public store.

## Browsers

The extension is one Manifest V3 codebase. Each browser gets its own build. Details and the test matrix live in [zunia-extension/docs/browsers.md](https://github.com/Zunia-Lab/zunia-extension/blob/main/docs/browsers.md).

| | Chrome, Brave, Opera | Edge | Firefox | Safari |
| --- | --- | --- | --- | --- |
| Build | `.output/chrome-mv3` | `.output/edge-mv3` | `.output/firefox-mv3` | `.output/safari-mv3` plus the Xcode app |
| Connect, sign-in, signature, live account switch and revoke | Automated ([zunia-e2e](https://github.com/Zunia-Lab/zunia-e2e)) | Same Chromium build | Automated | By hand on the iOS Simulator |
| In-page connect prompt | Yes, when the page is visible | Yes | No. Requests wait in the toolbar popup. | No. Toolbar popup, or a tab on iOS when the popup cannot open. |
| Published | No | No | No | No |

Firefox unloads an idle background page after about 30 seconds. The unlocked session lives in `storage.session` and survives that. Safari on iOS stops an idle worker after about 8 seconds; a page that uses the wallet, and the approval screen, ping the worker so requests still complete. Safari also drops `tabs.sendMessage`, so dApp events travel over a port the content script opens. See [the provider events](../reference/events.md#safari).

macOS Safari has not been run end to end. It needs **Allow unsigned extensions** in Safari Developer Settings, which Safari turns off when it quits.

## Mobile

| | iOS | Android |
| --- | --- | --- |
| App | Flutter, iOS 17+ in the current project | Flutter, Android 10+ |
| QR pairing (`zunia.connect.v2`) | Implemented | Implemented |
| WalletConnect session | Accepted when a Cloud project id is set | Same |
| WalletConnect signing | Not implemented | Not implemented |
| Store | Not submitted | Not submitted |

Pair Zunia mobile with a site by QR, not by WalletConnect, until signing exists.

## SDKs

| Package | Install | Status |
|---------|---------|--------|
| `@zunialab/sdk-web` | Browser dApps | 0.1.0, ready, not on npm yet |
| `@zunialab/sdk-react` | React 18 or 19 | 0.1.0, ready, not on npm yet |
| `@zunialab/sdk-core` | Servers and wallets | 0.1.0, ready, not on npm yet |
| `@zunialab/interchain` | IBC routes and memos | 0.1.0, ready, not on npm yet |
| `zunia_sdk` (Dart) | Flutter dApps | Deep links and a button. The v2 session client is planned. |

## Relay

[zunia-backend](https://github.com/Zunia-Lab/zunia-backend) implements `zunia.connect.v2`. It is tested. It is not deployed. Point `apiBase` at a relay you run (`pnpm dev` listens on `http://localhost:8788`).

## Signing

- Cosmos Amino and Direct: supported in the extension and over QR pairing.
- Sign in with Zunia: ADR-036 message bound to the site. Supported.
- `sendTx` on `window.zunia`: not supported. The dApp broadcasts.
- Ethermint / coin type 60: the wallet derives those addresses. It does not expose an Ethereum provider (`eth_*`, EIP-712). Do not treat it as MetaMask.
- Hardware wallets: not supported.

## Chains

The bundled catalog comes from [zunia-chain-registry](https://github.com/Zunia-Lab/zunia-chain-registry). A site can [suggest a chain](../integrate/suggest-chain.md). A user can add one under **Manage networks**. Endpoints must be `https://`.
