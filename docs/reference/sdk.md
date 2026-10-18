---
title: SDK API
description: "The exports of @zunialab/sdk-web, sdk-react, sdk-core and interchain: sessions and transports, connect options, QR pairing options (returnUrl, openWallet), React hook and components, sign-in, errors and zunia.connect.v2 helpers."
---

# SDK API

Four packages. The first three share one session. ESM only.

## `@zunialab/sdk-web`

| Export | |
|--------|--|
| `createZuniaSession()` | Session that picks a transport. |
| `connectWithZunia(options)` | Create, connect, return the session. |
| `restoreSession(options)` | Create and restore, or `null`. |
| `createExtensionSession` / `createZuniaWsSession` / `createWalletConnectSession` | Force one transport. |
| `getZunia` / `getZuniaSync` / `isZuniaInstalled` / `enableZunia` | Provider helpers. |
| `isPhoneBrowser` | True in a phone or tablet browser, where "Open the Zunia app" replaces scanning. |
| `renderQrSvg` / `qrMatrix` | Local QR rendering. |
| `createConnectWithZuniaButton` | DOM button. CSS at `@zunialab/sdk-web/connect-button.css`. |
| `explainZuniaError` / `zuniaCapabilities` / `zuniaSignMode` | Re-exported from `@zunialab/sdk-core`. |

`ConnectOptions`: `chains`, `metadata`, `prefer` (`auto` \| `extension` \| `native-ws` \| `walletconnect`), `apiBase` (the Zunia relay is `https://api.zunialab.com`), `wsBase`, `walletConnectProjectId`, `loadWalletConnect`, `timeoutMs`, `requestTimeoutMs`, `storage` (`null` disables persistence), `openInstallIfMissing`.

`createZuniaSession({ nativeWs })` sets up QR pairing: `returnUrl` (the `ret` of `pairing.appUri`; default on a phone browser: this page), `openWallet` (`auto`, the default, opens Zunia with a wake link after each signing request once the user paired from this phone; `never` opens nothing by itself), plus `heartbeatMs`, `deadAfterMs`, `reconnectMinMs`, `reconnectMaxMs`, `restoreWaitMs`, `phoneBrowser` and `openUrl` for tests and WebViews. `returnUrl` and `openWallet` need 0.2.0 or later.

A session exposes `connect`, `restore`, `disconnect`, `unlock`, `signIn`, `signAmino`, `signDirect`, `signArbitrary`, `suggestChain`, `getKey`, `getOfflineSigner`, `getOfflineSignerOnlyAmino`, `getOfflineSignerFor`, `openWallet` (0.2.0), `capabilities`, `accounts`, `chains`, `status`, `transport`, `pairing` (`uri` for the QR code, `appUri` for the same-device link), `verificationCode`, `on` / `off`, `subscribe`, `getSnapshot`.

## `@zunialab/sdk-react`

| Export | |
|--------|--|
| `useZuniaSession(options?)` | Hook. Options `{ restore, session }` plus the session options (`nativeWs`, …). Returns the snapshot plus `connected`, `locked`, `connecting`, `restoring`, `connect`, `disconnect`, `restore`, `unlock`, `signIn`, `openWallet`, `session`. |
| `useZunia()` | Detect `window.zunia`. |
| `ConnectWithZuniaButton` | Official button. |
| `ConnectPairingModal` | QR, then 6-digit code. In a phone browser it leads with "Open the Zunia app" (`pairing.appUri`); `showAppLink` overrides. |
| `ZuniaQrCode` / `ZuniaMark` | Presentational. |
| Re-exports | `createZuniaSession`, `ZuniaConnectError`, `explainZuniaError`, `createNonce`, … |

## `@zunialab/sdk-core`

| Export | |
|--------|--|
| `verifySignIn` / `createNonce` / `buildSignInMessage` / `parseSignInMessage` / `checkSignInBinding` | Sign-in. |
| `ZuniaConnectError` / `ZuniaSignInError` / `explainZuniaError` | Errors, and words for them. |
| `zuniaCapabilities` / `zuniaSignMode` / `aminoNeedsEscaping` / `ZUNIA_SIGNING_FEATURES` | What a Zunia extension can sign, and which mode to ask it for. |
| `checkAminoSignature` / `serializeAminoSignDoc` | Whether an Amino signature is over the bytes the chain rebuilds. |
| `ConnectCipher` / `deriveConnectKeys` / `verificationCodeFrom` / `parsePairingUri` / `buildPairingUri` | `zunia.connect.v2` crypto and URIs. |
| `isValidReturnUrl` / `buildWakeUri` / `parseWakeUri` / `ZUNIA_CONNECT_LIMITS` / `sealedFrameBytes` | The `ret` rule, wake links, the relay's frame and queue limits, and a sealed frame's size (0.2.0). |
| `normalizeAminoResponse` / `normalizeDirectResponse` / `normalizeStdSignature` | Wire to CosmJS shapes. |
| Types | `ZuniaProvider`, `ZuniaSession`, `ZuniaAccountInfo`, … |
| Constants | `ZUNIA_CONNECT_PROTOCOL`, `ZUNIA_CONNECT_PATHS`, `ZUNIA_WALLETCONNECT`, deep links. |

Test vectors: `test-vectors/sign-in-vectors.json` and `test-vectors/connect-v2-vectors.json` inside the package.

## `@zunialab/interchain`

IBC channel discovery, denom unwinding, packet-forward / ibc-hooks memos, cross-chain swaps and NFTs. Used by the wallet. A dApp can use it without talking to Zunia.
