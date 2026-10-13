---
title: window.zunia
---

# `window.zunia`

The extension injects this object on `https://` pages and localhost. Types live in `@zunialab/sdk-core` as `ZuniaProvider`. An optional `window.keplr` alias exists when the user enables it.

The provider dispatches `zunia#initialized` on `window`, and `zunia_keystorechange` on account changes (`keplr_keystorechange` too while the Keplr alias is on).

## Methods

| Method | |
|--------|--|
| `enable(chainIds)` | Ask for those chains. Prompts on first grant. |
| `disable(chainIds?)` | Drop the grant for those chains, or the whole origin. |
| `getConnectedChains()` | Chains this origin may use, no prompt. `[]` if none. |
| `isLocked()` | Whether the wallet is locked. Connected sites only. |
| `getKey(chainId)` | Keplr-shaped key for the active account. `NOT_CONNECTED` without a grant. Opens the unlock window if the wallet is locked. |
| `getOfflineSigner(chainId)` | Amino + Direct signer. |
| `getOfflineSignerOnlyAmino(chainId)` | Amino only. |
| `getOfflineSignerAuto(chainId)` | Same as `getOfflineSigner` today. |
| `signAmino(chainId, signer, signDoc)` | Amino signature. Always prompts. |
| `signDirect(chainId, signer, signDoc)` | Direct signature. Always prompts. |
| `signArbitrary(chainId, signer, data)` | ADR-036. Returns a bare `StdSignature`. Sign-in messages get a dedicated screen. |
| `verifyArbitrary(chainId, signer, data, signature)` | Local check of an ADR-036 signature. |
| `experimentalSuggestChain(chainInfo)` | Propose a chain. Prompts if unknown. |
| `on` / `off` | See [events](./events.md). |

`sendTx` rejects with `UNSUPPORTED`. Sign, then broadcast from the dApp.

`getKey` returns `{ name, algo, pubKey, address, bech32Address, isNanoLedger }`, plus `ethereumHexAddress` on chains with Ethereum-style addresses. `isNanoLedger` is always false.

## Release and features

`version` is the provider API version. It stays `"0.1.0"` in every release, so Zunia 0.1.0 to 0.1.4 cannot be told apart. From extension 0.1.5 the provider also has:

- `extensionVersion`: the installed release.
- `isZunia: true`, which tells Zunia's `window.keplr` alias from Keplr itself.
- `features`: what this build signs that older builds refused or signed wrongly.

| `features` entry | Meaning |
|------------------|---------|
| `sign-direct:wasm-contract-32` | Direct contract calls to 32-byte contracts are decoded and prompted. |
| `sign-direct:send-32` | A Direct `MsgSend` to a 32-byte address is decoded and prompted. |
| `sign-direct:osmosis-poolmanager` | Direct Osmosis poolmanager swaps that sell an exact amount. |
| `sign-direct:osmosis-exact-out` | Direct Osmosis poolmanager swaps that buy an exact amount. |
| `sign-amino:escaped` | Amino sign bytes escape `&`, `<`, `>`, U+2028 and U+2029 the way chains rebuild them. |
| `sign-amino:osmosis-poolmanager` | Amino poolmanager swap requests are described and prompted. |

A provider without `extensionVersion` is 0.1.4 or older. `zuniaCapabilities(window.zunia)` from `@zunialab/sdk-core` reads these fields, and `session.getOfflineSignerFor()` in `@zunialab/sdk-web` uses them to pick Direct or Amino.

## Errors

Rejected calls use `ZuniaProviderError` with a stable `code`: `USER_REJECTED`, `NOT_CONNECTED`, `LOCKED`, `UNKNOWN_CHAIN`, `ORIGIN_MISMATCH`, `UNSUPPORTED`, `INVALID_PARAMS` or `INTERNAL`. Human messages keep Keplr's wording where they overlap, so existing integrations keep working. A request whose message types the wallet cannot decode is refused with `UNSUPPORTED` "Blind signing disabled for unknown messages", unless the user turned on blind signing.

## What the page never sees

The seed phrase, the password, and private keys. Content scripts may only forward provider calls and ping the worker so it stays up while a request waits (on Safari, also while the page receives events). They cannot read `storage.session`.
