---
title: Security model
description: "How Zunia keeps keys on the device and what sites, apps and servers see: key storage (extension, Keychain, Android Keystore), grants, approvals, blind signing, sign-in binding, relay crypto, what leaves the device. No audit yet."
---

# Security model

Zunia is non-custodial. The seed phrase and private keys never leave the device that holds them. There is no Zunia server that can sign, recover a phrase, or freeze a balance.

No independent audit has been completed. Do not read this page as one.

## Keys

- Generated or imported on the device (BIP-39, BIP-44, coin type 118 by default, coin type 60 for Ethermint-style addresses).
- Encrypted at rest with the user's password. In the extension the unlocked phrase lives in `storage.session` (cleared when the browser closes), which the extension keeps out of content-script reach (`TRUSTED_CONTEXTS`).
- In Zunia mobile the kernel seals each phrase with the password (Argon2id, XChaCha20-Poly1305) and the sealed phrases sit in the iOS Keychain (this device only) or Android's EncryptedSharedPreferences, out of iCloud and Android backups. Unlocked, the phrases are only in the app's memory, and locking wipes them. Biometric unlock keeps a copy of the password behind a key in the phone's secure hardware that a new face or fingerprint invalidates. See [Keys and accounts](../use-wallet/keys.md#the-password-and-the-mobile-vault).
- Every signature in both apps is made by the zunia-core kernel (WebAssembly in the extension, native code on the phone).
- Hardware wallets are not supported.

## Permissions, per origin

A site sees nothing until the user approves `enable` / `connect` for named chains. Grants are stored per origin, for the chains approved, and last 7 days; in Zunia mobile's browser each chain's 7 days count from its own approval. The user revokes them under **Connected dApps** (menu in the extension) or **Settings** → **Connected sites** (Zunia mobile's in-app browser). An expired or revoked grant emits `disconnect` to that origin only.

Zunia Connect and WalletConnect sessions on the phone are listed under **Connected apps**. The user can turn a chain off for one session there; the site is told at once.

`getConnectedChains()` returns the current grant without unlocking and without opening a window.

## Approvals

Every signature opens a screen: connect, sign-in, Amino, Direct, arbitrary data, or suggest-chain. Message types the wallet cannot decode are refused without a prompt (`UNSUPPORTED`), unless the user turns on **Blind signing**: under **Settings & security** → **Security** in the extension, under **Settings** → **Connected sites** in Zunia mobile. It is off by default. The user can reject or close the window (`USER_REJECTED`).

A request nobody answers expires after 5 minutes. At most 3 wait at once; more are refused. Zunia mobile's **Password on every signature** (off by default) asks for biometrics or the password before every signature, from the wallet or from any site or app.

Firefox and Safari answer connect from the toolbar popup. Safari on iOS may open the same screen in a tab.

## Sign-in binding

A Sign in with Zunia message must name the site that asked. The extension and Zunia mobile's browser compare domain and URI to the caller origin and refuse otherwise (`ORIGIN_MISMATCH`), without opening a window for a spoofed domain. Over QR pairing the phone compares them to the relay's verified origin, and refuses sign-in from a session that has none (another app). `verifySignIn` repeats those checks on your server, plus the key, the address, the nonce and the dates. Consume each nonce once.

## QR pairing

Messages between the page and the phone are X25519 + HKDF-SHA256 + ChaCha20-Poly1305, with sequence numbers inside the encrypted envelope. The relay sees ciphertext, routing metadata and the wallet's public key (sent in the clear in `hello`), never the session keys. The QR join token is single use. The dApp token never goes in the QR.

On one phone, a pairing link may carry `ret`, a return address that Zunia opens only after the user answers, and only when that link opened Zunia on the same device. Zunia ignores script, local-content and its own schemes there. A wake link (`zunia://connect/wake?sid=…`) holds no secret: it brings up a session the phone already has, and nothing else. See [`zunia.connect.v2`](../reference/connect-v2.md#ret-the-return-target).

`verifiedOrigin` is the `Origin` header the relay recorded when the page created the session. The phone shows it and binds sign-in to it. That value is only as good as the relay: Zunia mobile therefore refuses pairing URIs whose relay is not on its trusted list. By default that list holds only Zunia's relay, `wss://api.zunialab.com`. See [QR connection](../integrate/qr.md#verified-origin).

## What leaves the device

When live balances are on (**Live reads** in Zunia mobile, on by default there), addresses go to the chain endpoints in the catalog (or the ones a user / dApp added), and the NFT screen sends a Stargaze address to Stargaze's API to list its collections. Prices come from CoinGecko (SAF's from Coinstore) and swap quotes from Osmosis's SQS service, without an address. Signed transactions go to the node that broadcasts them. The extension sends nothing to a Zunia server.

Zunia mobile's NFT artwork, off by default, comes from whatever host each NFT names. Its notifications are raised on the phone; no push server is involved.

Firefox's data-collection prompt is answered as `financialAndPaymentInfo` for that reason.

QR pairing goes through Zunia's relay at `api.zunialab.com`, which sees ciphertext and routing metadata, as above. WalletConnect, in Zunia mobile builds that include a project id, goes through WalletConnect's own relay. The web dashboard at `app.zunialab.com` reads chain data and broadcasts through its own server, so the addresses you use there and the transactions you sign there reach that server. It never receives a key or a phrase.

## On the phone

- Screenshots and recordings are blocked on Android's recovery phrase, unlock and password screens; iOS cannot block them, so Zunia warns after a screenshot on a phrase screen and hides the phrase while the screen is recorded or mirrored. The app switcher shows a blank card (Android 13 and later) or a cover (iOS).
- A copied phrase is cleared after 30 seconds, local to the device on iOS and marked sensitive on Android 13 and later.
- Basic jailbreak and root checks run on the device. A clean result means no obvious sign, not a safe device.
- The in-app browser gives `window.zunia` only to top-level `https://` pages (and localhost), with a token a framed page cannot read, so a cross-origin frame cannot call the wallet in its parent's name.

Details: [Keys and accounts](../use-wallet/keys.md).

## Limits (relay)

Session creation per client address, frame size (512 KiB) and rate, a bounded offline queue (32 frames, 1 MiB, 10 minutes), a global room cap, hashed tokens, `timingSafeEqual`. `TRUST_PROXY` must match your edge, or the limiter attaches to the wrong address. One instance only.

## Content Security Policy

The extension pages use `script-src 'self'` plus `'wasm-unsafe-eval'` for the kernel, `object-src 'self'`, and `frame-ancestors 'self' https: http://localhost:* http://127.0.0.1:*` so the connect prompt can be drawn in the page. Only that prompt (`connect.html`) is web accessible, so it is the only extension page a site can frame; the popup and every signing screen are not. The provider is injected through a web-accessible script. dApps should keep their own CSP strict: the SDK's `localStorage` keys are readable by any script on the origin.

## Supply chain

Repositories are public under [github.com/Zunia-Lab](https://github.com/Zunia-Lab). Extension builds are checked in CI (MV3, WASM present, no bare specifiers). Bit-for-bit reproducible store builds are **not** claimed yet. See [Reproducible builds](../developers/reproducible-builds.md).

## Disclosure

Email [dev@zunialab.com](mailto:dev@zunialab.com). Do not open a public issue for a vulnerability. See [SECURITY.md](https://github.com/Zunia-Lab/.github/blob/main/SECURITY.md).
