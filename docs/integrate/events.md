---
title: Events and sessions
---

# Events and session lifecycle

A connected site should treat the wallet as the source of truth. The user can switch accounts, lock, add a chain or revoke you without touching your UI.

## Status

| Status | Meaning |
|--------|---------|
| `idle` | Nothing started. |
| `connecting` | Looking for a wallet, or waiting for the user to approve in the extension. |
| `awaiting_wallet` | A QR code or WalletConnect link is waiting for the wallet to scan and approve it. |
| `connected` | You have accounts. |
| `locked` | Still granted, the wallet is locked. Requests wait for unlock. `session.unlock()`, called from a click, opens the unlock window. |
| `reconnecting` | The relay socket dropped and is coming back. |
| `disconnected` | You called `disconnect()`, the user revoked you, the session expired, or a connect failed (see `error`). |
| `error` | Part of the type, but the SDK does not set it. A failed connect ends in `disconnected`, with the failure in `error`. |

```ts
session.on("status", (status) => setStatus(status));
session.on("accountsChanged", (accounts) => render(accounts));
session.on("chainChanged", (chains) => setChains(chains));
session.on("disconnect", (reason) => showSignedOut(reason));
```

On React, `useZuniaSession` already subscribes. `session.subscribe` / `session.getSnapshot()` work with `useSyncExternalStore`.

## Wallet events

These are what `window.zunia` emits, and what the SDK forwards.

| Event | When | Payload |
|-------|------|---------|
| `accountsChanged` | Active account changed or was renamed, or the wallet unlocked. Connected sites only. | None on `window.zunia`: read `getKey` again. The SDK does that and emits the new accounts. |
| `chainChanged` | Chains granted to your origin changed. | Remaining chain ids |
| `disconnect` | Access revoked or expired. | `null` for every chain, or `{ chainIds }` for those lost |
| `locked` | The wallet locked. | none |

A grant in the extension lasts 7 days. When it runs out, your site gets `disconnect` and has to connect again.

After a reload, call `restore` (or `getConnectedChains()`). That does not unlock the wallet and does not open a window.

## What is stored

By default the SDK writes to `localStorage`:

- `zunia.session.transport`
- `zunia.connect.v2.session` (relay URL, session id, dApp token, session keys and counters; never the QR join token)
- `zunia.walletconnect.session`

Any script on your origin can read these. Keep a strict Content Security Policy. Pass `storage: null` to keep the session in memory only (users pair again after a reload), or pass your own `{ getItem, setItem, removeItem }`.

## Timeouts and drops

Over QR pairing and WalletConnect, each connect and each signature waits 5 minutes by default (`timeoutMs`, `requestTimeoutMs`). In the extension, a prompt nobody answers expires after 5 minutes, and the SDK rejects with `TIMEOUT` (`reason: "prompt-expired"`). Over QR pairing the SDK pings every 20 seconds, reconnects with backoff, and resends requests the relay had not confirmed. If the relay forgot the session, you get `SESSION_EXPIRED` and the user pairs again.

`disconnect()` from your page ends the session. On the extension it also revokes your site's grant for the session's chains (`window.zunia.disable`), so the next `connect` asks the user again. Over QR pairing it closes the relay session and deletes the stored one. The user can also revoke your site under **Connected dApps**.
