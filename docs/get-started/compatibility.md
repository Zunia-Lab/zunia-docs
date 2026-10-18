---
title: Compatibility
description: "Status of each surface: the extension per browser and its store listings, Zunia mobile 0.1.0 (QR pairing, same-device return and wake links, WalletConnect), the SDK packages, the relay, signing modes and chains."
---

# Compatibility and status

Honest status for each surface. The extension is on the Chrome Web Store, and Safari on Mac is on the Mac App Store; Safari on iPhone and iPad is in review. Zunia mobile 0.1.0 is not on the App Store or Google Play yet. The JavaScript packages are on npm.

## Browsers

The extension is one Manifest V3 codebase. Each browser gets its own build. Details and the test matrix live in [zunia-extension/docs/browsers.md](https://github.com/Zunia-Lab/zunia-extension/blob/main/docs/browsers.md).

| | Chrome, Brave, Opera | Edge | Firefox | Safari |
| --- | --- | --- | --- | --- |
| Build | `.output/chrome-mv3` | `.output/edge-mv3` | `.output/firefox-mv3` | `.output/safari-mv3` plus the Xcode app |
| Connect, sign-in, signature, live account switch and revoke | Automated ([zunia-e2e](https://github.com/Zunia-Lab/zunia-e2e)) | Same Chromium build | Automated | By hand on the iOS Simulator |
| In-page connect prompt | Yes, when the page is visible | Yes | No. Requests wait in the toolbar popup. | No. Toolbar popup, or a tab on iOS when the popup cannot open. |
| Published | [Chrome Web Store](https://chromewebstore.google.com/detail/zunia/ngokakoekdogobjmokipglbcclelgajk) | No | No, planned | In App Store review |

The Firefox build needs Firefox 140 or later. The Safari app needs iOS 17 or macOS 13 and later. Firefox unloads an idle background page after about 30 seconds. The unlocked session lives in `storage.session` and survives that. Safari on iOS stops an idle worker after about 8 seconds; a page that uses the wallet, and the approval screen, ping the worker so requests still complete. Safari also drops `tabs.sendMessage`, so dApp events travel over a port the content script opens. See [the provider events](../reference/events.md#safari).

macOS Safari has not been run end to end. It needs **Allow unsigned extensions** in Safari Developer Settings, which Safari turns off when it quits.

## Mobile

| | iOS | Android |
| --- | --- | --- |
| App | Flutter, iOS 13+ in the current project | Flutter, Android 7.0+ (API 24) in the current project |
| QR pairing (`zunia.connect.v2`) | Implemented | Implemented |
| Same-device pairing with a return target (`ret`), wake links | Implemented in 0.1.0 | Implemented in 0.1.0 |
| WalletConnect v2 (sessions and signing) | In builds with a WalletConnect project id | Same |
| Store | Not listed yet | Not listed yet |

Pair Zunia mobile with a site by QR: it needs no WalletConnect project id, and the phone shows the origin the relay verified. On the phone itself, see [Use Zunia mobile from another app](../integrate/app-to-app.md).

## SDKs

| Package | Install | Status |
|---------|---------|--------|
| `@zunialab/sdk-web` | Browser dApps | On npm |
| `@zunialab/sdk-react` | React 18 or 19 | On npm |
| `@zunialab/sdk-core` | Servers and wallets | On npm |
| `@zunialab/interchain` | IBC routes and memos | On npm |
| `zunia_sdk` (Dart) | Flutter apps (Flutter 3.27+) | On pub.dev |

## Relay

[zunia-backend](https://github.com/Zunia-Lab/zunia-backend) implements `zunia.connect.v2`. Zunia runs it at `https://api.zunialab.com` (WebSocket `wss://api.zunialab.com/v1/connect/ws`). Any site may open sessions there, within per-address rate limits. Zunia mobile only pairs through relays on its trusted list, which holds `wss://api.zunialab.com` by default, so pass `apiBase: "https://api.zunialab.com"`.

To test against a relay of your own, `pnpm dev` in zunia-backend listens on `http://localhost:8788`. Only a debug build of Zunia mobile, or one built with that relay on its trusted list, pairs through it.

## Signing

- Cosmos Amino and Direct: supported in the extension and over QR pairing.
- Zunia extension 0.1.4 and older refuse, in Direct mode, a contract call to a 32-byte contract or a send to a 32-byte address. They also sign Amino documents holding `&`, `<` or `>` over bytes the chain rejects. 0.1.5 fixes both and reports `extensionVersion` and `features` on `window.zunia`. `session.getOfflineSignerFor()` picks the mode each build can sign.
- Sign in with Zunia: ADR-036 message bound to the site. Supported.
- `sendTx` on `window.zunia`: not supported. The dApp broadcasts.
- Ethermint / coin type 60: the wallet derives those addresses. It does not expose an Ethereum provider (`eth_*`, EIP-712). Do not treat it as MetaMask.
- Hardware wallets: not supported.

## Chains

The bundled catalog comes from [zunia-chain-registry](https://github.com/Zunia-Lab/zunia-chain-registry). A site can [suggest a chain](../integrate/suggest-chain.md). A user can add one under **Manage networks**. Endpoints must be `https://`.
