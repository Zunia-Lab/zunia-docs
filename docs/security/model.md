---
title: Security model
---

# Security model

Zunia is non-custodial. The seed phrase and private keys never leave the device that holds them. There is no Zunia server that can sign, recover a phrase, or freeze a balance.

No independent audit has been completed. Do not read this page as one.

## Keys

- Generated or imported on the device (BIP-39, BIP-44, coin type 118 by default, coin type 60 for Ethermint-style addresses).
- Encrypted at rest with the user's password. The unlocked phrase lives in `storage.session` in the extension (cleared when the browser closes) and in the platform secure store on mobile.
- The extension asks `storage.session` to stay out of content-script reach (`TRUSTED_CONTEXTS`).
- Hardware wallets are not supported.

## Permissions, per origin

A site sees nothing until the user approves `enable` / `connect` for named chains. Grants are stored per origin. The user revokes them under **Connected dApps** (menu in the extension). An expired or revoked grant emits `disconnect` to that origin only.

`getConnectedChains()` returns the current grant without unlocking and without opening a window.

## Approvals

Every signature opens a screen: connect, sign-in, Amino, Direct, arbitrary data, or suggest-chain. Unknown message types are refused (no blind signing). The user can reject or close the window (`USER_REJECTED`).

Firefox and Safari answer connect from the toolbar popup. Safari on iOS may open the same screen in a tab.

## Sign-in binding

A Sign in with Zunia message must name the site that asked. The extension compares domain and URI to the caller origin and refuses otherwise (`ORIGIN_MISMATCH`), without opening a window for a spoofed domain. `verifySignIn` repeats those checks on your server, plus the key, the address, the nonce and the dates. Consume each nonce once.

## QR pairing

Messages between the page and the phone are X25519 + HKDF-SHA256 + ChaCha20-Poly1305, with sequence numbers. The relay sees ciphertext and routing metadata. The QR join token is single use. The dApp token never goes in the QR.

`verifiedOrigin` is the `Origin` header the relay recorded when the page created the session. The phone shows it and binds sign-in to it. That value is only as good as the relay: Zunia mobile therefore refuses pairing URIs whose relay is not on its trusted list. Run your own relay and put it on that list. See [QR connection](../integrate/qr.md#verified-origin).

## What leaves the device

When live balances are on, addresses go to the chain endpoints in the catalog (or the ones a user / dApp added). Signed transactions go to the node that broadcasts them. Nothing is sent to a Zunia server today: the relay is not deployed, and the other backend surfaces are scaffolds.

Firefox's data-collection prompt is answered as `financialAndPaymentInfo` for that reason.

## Limits (relay, when you run one)

Session creation per client address, frame size and rate, a global room cap, hashed tokens, `timingSafeEqual`. `TRUST_PROXY` must match your edge, or the limiter attaches to the wrong address. One instance only.

## Content Security Policy

The extension pages use `script-src 'self'` plus `'wasm-unsafe-eval'` for the kernel, `object-src 'self'`, `frame-ancestors 'none'`. The provider is injected through a web-accessible script. dApps should keep their own CSP strict: the SDK's `localStorage` keys are readable by any script on the origin.

## Supply chain

Repositories are public under [github.com/Zunia-Lab](https://github.com/Zunia-Lab). Extension builds are checked in CI (MV3, WASM present, no bare specifiers). Bit-for-bit reproducible store builds are **not** claimed yet. See [Reproducible builds](../developers/reproducible-builds.md).

## Disclosure

Email [security@zunialab.com](mailto:security@zunialab.com). Do not open a public issue for a vulnerability. See [SECURITY.md](https://github.com/Zunia-Lab/.github/blob/main/SECURITY.md).
