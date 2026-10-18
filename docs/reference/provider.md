---
title: window.zunia
description: "window.zunia in the Zunia extension and in Zunia mobile's in-app browser (mode \"mobile\"): methods, identity fields, features, errors, fee changes in signed, the opt-in window.keplr, and changes from pre-release mobile builds."
---

# `window.zunia`

The extension injects this object on `https://` pages and localhost. Zunia mobile injects the same object in its in-app browser; see [Zunia mobile](#zunia-mobile). Types live in `@zunialab/sdk-core` as `ZuniaProvider`. An optional `window.keplr` alias exists when the user enables it.

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
| `getChainInfos()`, `getChainInfosWithoutEndpoints()` | The chains the wallet knows, Keplr-shaped, never with their endpoints. |
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

## Zunia mobile

Zunia mobile 0.1.0 injects `window.zunia` into pages opened in **Discover**, its in-app browser: top-level `https://` pages and `http://localhost` only, never frames. Every call carries a per-browser token that a framed page cannot read, and keys never enter the WebView. It dispatches `zunia#initialized` like the extension, so `getZunia()` and the SDK's extension transport work unchanged.

| Field | Value |
|-------|-------|
| `version` | `"0.1.0"`, the provider API |
| `isZunia` | `true` |
| `mode` | `"mobile"` |
| `appVersion` | `"0.1.0"`, the app release. There is no `extensionVersion`. |
| `features` | The same list as extension 0.1.5: both sign with zunia-core 0.1.1. |
| `defaultOptions` | `{}`. Set `defaultOptions.sign.preferNoSetFee = true` to keep your fee, as in Keplr. |

It has the methods above, plus `getAccounts(chainId)`, and behaves as the extension does, with these points to know:

- **Grants** are per site and per chain, and each chain's grant lapses 7 days after the user approved it. The user manages them under **Settings** → **Connected sites**.
- **Prompts** expire after 5 minutes, and at most 3 wait at once; more are refused. While the wallet is locked, calls that need a key wait up to 5 minutes for the user to unlock, then fail with `LOCKED`.
- **`signDirect` and `signAmino`**: unless the site set `preferNoSetFee`, the review lets the user pick another fee tier (Low, Medium, High). The response then carries a different fee: always broadcast the `signed` document from the response, not the one you sent.
- **Unknown messages**: a document holding a message the kernel cannot decode is refused before any prompt with `UNSUPPORTED` and the message `Blind signing disabled for unknown messages: <types>`, unless the user turned on **Blind signing**.
- **Size**: a transaction too big to show in full (over 4 MiB of preview) is refused with `UNSUPPORTED` and the message `This transaction is too large to show in full`.
- **`experimentalSuggestChain`** opens an **Add network** review; once approved, the chain is saved and usable.
- **`verifyArbitrary`** checks the ADR-036 signature in the app.
- **`sendTx`** rejects with `UNSUPPORTED`.
- **`window.keplr`** exists only while the user has **Keplr compatibility** on (**Settings** → **Connected sites**, off by default). It is the same object, with `isZunia: true`.
- **User agent**: the system WebView's own (Safari's on iPhone, Chrome's on Android) followed by ` Zunia/0.1.0 Mobile`.

Events are those of the [extension](./events.md), sent only to the open page while it is connected.

### Changes from pre-release mobile builds

Sites tested against Zunia mobile builds from before 0.1.0 should check:

- `window.keplr` is no longer there by default. It needs **Keplr compatibility** on.
- `keplr#initialized` and the global `window.getOfflineSigner` are gone. Wait for `zunia#initialized`, and call `window.zunia.getOfflineSigner(chainId)`.
- The user agent no longer pretends to be iOS Safari and no longer contains `ZuniaWallet/0.1`. Look for `Zunia/` and `Mobile`, or better, for `window.zunia.mode === "mobile"`.
- Messages the kernel cannot decode are refused unless blind signing is on.
- A fee tier the user picked rewrites the fee: broadcast what comes back in `signed`.
- Transactions over 4 MiB of preview are refused.

## What the page never sees

The seed phrase, the password, and private keys. In the extension, content scripts may only forward provider calls and ping the worker so it stays up while a request waits (on Safari, also while the page receives events). They cannot read `storage.session`.
