---
title: window.zunia
---

# `window.zunia`

The extension injects this object on `https://` pages and localhost. Types live in `@zunialab/sdk-core` as `ZuniaProvider`. An optional `window.keplr` alias exists when the user enables it.

The provider dispatches `zunia#initialized` (and `keplr_keystorechange` on account changes) on `window`.

## Methods

| Method | |
|--------|--|
| `enable(chainIds)` | Ask for those chains. Prompts on first grant. |
| `disable(chainIds?)` | Drop the grant for those chains, or the whole origin. |
| `getConnectedChains()` | Chains this origin may use, no prompt. `[]` if none. |
| `isLocked()` | Whether the wallet is locked. Connected sites only. |
| `getKey(chainId)` | Keplr-shaped key for the active account. |
| `getOfflineSigner(chainId)` | Amino + Direct signer. |
| `getOfflineSignerOnlyAmino(chainId)` | Amino only. |
| `getOfflineSignerAuto(chainId)` | Same as `getOfflineSigner` today. |
| `signAmino(chainId, signer, signDoc)` | Amino signature. Always prompts. |
| `signDirect(chainId, signer, signDoc)` | Direct signature. Always prompts. |
| `signArbitrary(chainId, signer, data)` | ADR-036. Returns a bare `StdSignature`. Sign-in messages get a dedicated screen. |
| `verifyArbitrary(chainId, signer, data, signature)` | Local check of an ADR-036 signature. |
| `experimentalSuggestChain(chainInfo)` | Propose a chain. Prompts if unknown. |
| `on` / `off` | See [events](./events.md). |

`sendTx` is not implemented. Sign, then broadcast from the dApp.

`getKey` returns `{ name, algo, pubKey, address, bech32Address, isNanoLedger, isKeystone }`. Hardware flags are currently false.

## Errors

Rejected calls use `ZuniaProviderError` with a stable `code`: `USER_REJECTED`, `NOT_CONNECTED`, `LOCKED`, `UNKNOWN_CHAIN`, `ORIGIN_MISMATCH`, `UNSUPPORTED`, `INVALID_PARAMS`. Human messages keep Keplr's wording where they overlap, so existing integrations keep working.

## What the page never sees

The seed phrase, the password, and private keys. Content scripts may only forward provider calls and (on Safari) ping the worker. They cannot read `storage.session`.
