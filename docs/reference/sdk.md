---
title: SDK API
---

# SDK API

Three packages, one session. ESM only.

## `@zunialab/sdk-web`

| Export | |
|--------|--|
| `createZuniaSession()` | Session that picks a transport. |
| `connectWithZunia(options)` | Create, connect, return the session. |
| `restoreSession(options)` | Create and restore, or `null`. |
| `createExtensionSession` / `createZuniaWsSession` / `createWalletConnectSession` | Force one transport. |
| `getZunia` / `getZuniaSync` / `isZuniaInstalled` / `enableZunia` | Provider helpers. |
| `renderQrSvg` / `qrMatrix` | Local QR rendering. |
| `createConnectWithZuniaButton` | DOM button. CSS at `@zunialab/sdk-web/connect-button.css`. |

`ConnectOptions`: `chains`, `metadata`, `prefer` (`auto` \| `extension` \| `native-ws` \| `walletconnect`), `apiBase`, `wsBase`, `walletConnectProjectId`, `timeoutMs`, `requestTimeoutMs`, `storage` (`null` disables persistence), `openInstallIfMissing`.

A session exposes `connect`, `restore`, `disconnect`, `signIn`, `signAmino`, `signDirect`, `signArbitrary`, `getOfflineSigner`, `getOfflineSignerOnlyAmino`, `accounts`, `chains`, `status`, `on` / `off`, `subscribe`, `getSnapshot`.

## `@zunialab/sdk-react`

| Export | |
|--------|--|
| `useZuniaSession(options?)` | Hook. `{ restore, session }`. |
| `useZunia()` | Detect `window.zunia`. |
| `ConnectWithZuniaButton` | Official button. |
| `ConnectPairingModal` | QR, then 6-digit code. |
| `ZuniaQrCode` / `ZuniaMark` | Presentational. |
| Re-exports | `createZuniaSession`, `ZuniaConnectError`, `createNonce`, … |

## `@zunialab/sdk-core`

| Export | |
|--------|--|
| `verifySignIn` / `createNonce` / `buildSignInMessage` / `parseSignInMessage` / `checkSignInBinding` | Sign-in. |
| `ZuniaConnectError` / `ZuniaSignInError` | Errors. |
| `ConnectCipher` / `deriveConnectKeys` / `verificationCodeFrom` / `parsePairingUri` / `buildPairingUri` | `zunia.connect.v2` crypto and URIs. |
| `normalizeAminoResponse` / `normalizeDirectResponse` / `normalizeStdSignature` | Wire to CosmJS shapes. |
| Types | `ZuniaProvider`, `ZuniaSession`, `ZuniaAccountInfo`, … |
| Constants | `ZUNIA_CONNECT_PROTOCOL`, `ZUNIA_CONNECT_PATHS`, `ZUNIA_WALLETCONNECT`, deep links. |

Test vectors: `test-vectors/sign-in-vectors.json` and `test-vectors/connect-v2-vectors.json` inside the package.

## `@zunialab/interchain`

IBC channel discovery, denom unwinding, packet-forward / ibc-hooks memos, cross-chain swaps and NFTs. Used by the wallet. A dApp can use it without talking to Zunia.
