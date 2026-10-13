---
title: SDK API
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
| `renderQrSvg` / `qrMatrix` | Local QR rendering. |
| `createConnectWithZuniaButton` | DOM button. CSS at `@zunialab/sdk-web/connect-button.css`. |
| `explainZuniaError` / `zuniaCapabilities` / `zuniaSignMode` | Re-exported from `@zunialab/sdk-core`. |

`ConnectOptions`: `chains`, `metadata`, `prefer` (`auto` \| `extension` \| `native-ws` \| `walletconnect`), `apiBase` (the Zunia relay is `https://api.zunialab.com`), `wsBase`, `walletConnectProjectId`, `loadWalletConnect`, `timeoutMs`, `requestTimeoutMs`, `storage` (`null` disables persistence), `openInstallIfMissing`.

A session exposes `connect`, `restore`, `disconnect`, `unlock`, `signIn`, `signAmino`, `signDirect`, `signArbitrary`, `suggestChain`, `getKey`, `getOfflineSigner`, `getOfflineSignerOnlyAmino`, `getOfflineSignerFor`, `capabilities`, `accounts`, `chains`, `status`, `transport`, `pairing`, `verificationCode`, `on` / `off`, `subscribe`, `getSnapshot`.

## `@zunialab/sdk-react`

| Export | |
|--------|--|
| `useZuniaSession(options?)` | Hook. Options `{ restore, session }`. Returns the snapshot plus `connected`, `locked`, `connecting`, `restoring`, `connect`, `disconnect`, `restore`, `unlock`, `signIn`, `session`. |
| `useZunia()` | Detect `window.zunia`. |
| `ConnectWithZuniaButton` | Official button. |
| `ConnectPairingModal` | QR, then 6-digit code. |
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
| `normalizeAminoResponse` / `normalizeDirectResponse` / `normalizeStdSignature` | Wire to CosmJS shapes. |
| Types | `ZuniaProvider`, `ZuniaSession`, `ZuniaAccountInfo`, … |
| Constants | `ZUNIA_CONNECT_PROTOCOL`, `ZUNIA_CONNECT_PATHS`, `ZUNIA_WALLETCONNECT`, deep links. |

Test vectors: `test-vectors/sign-in-vectors.json` and `test-vectors/connect-v2-vectors.json` inside the package.

## `@zunialab/interchain`

IBC channel discovery, denom unwinding, packet-forward / ibc-hooks memos, cross-chain swaps and NFTs. Used by the wallet. A dApp can use it without talking to Zunia.
