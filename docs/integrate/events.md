---
title: Events and sessions
---

# Events and session lifecycle

A connected site should treat the wallet as the source of truth. The user can switch accounts, lock, add a chain or revoke you without touching your UI.

## Status

| Status | Meaning |
|--------|---------|
| `idle` | Nothing started. |
| `connecting` | Looking for a wallet. |
| `awaiting_wallet` | QR or WalletConnect link is waiting, or the extension window is open. |
| `connected` | You have accounts. |
| `locked` | Still granted, the wallet is locked. Requests wait for unlock. |
| `reconnecting` | The relay socket dropped and is coming back. |
| `disconnected` | You called `disconnect()`, the user revoked you, or the session expired. |
| `error` | The last connect failed. See `error`. |

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
| `accountsChanged` | Active account changed or was renamed. Connected sites only. | New accounts |
| `chainChanged` | Chains granted to your origin changed. | Remaining chain ids |
| `disconnect` | Access revoked or expired. | `null` for every chain, or `{ chainIds }` for those lost |
| `locked` | The wallet locked. | none |

After a reload, call `restore` (or `getConnectedChains()`). That does not unlock the wallet and does not open a window.

## What is stored

By default the SDK writes to `localStorage`:

- `zunia.session.transport`
- `zunia.connect.v2.session` (relay URL, session id, dApp token, session keys and counters; never the QR join token)
- `zunia.walletconnect.session`

Any script on your origin can read these. Keep a strict Content Security Policy. Pass `storage: null` to keep the session in memory only (users pair again after a reload), or pass your own `{ getItem, setItem, removeItem }`.

## Timeouts and drops

Each connect and each signature waits 5 minutes by default (`timeoutMs`, `requestTimeoutMs`). Over QR pairing the SDK pings every 20 seconds, reconnects with backoff, and resends requests the relay had not confirmed. If the relay forgot the session, you get `SESSION_EXPIRED` and the user pairs again.

`disconnect()` from your page drops the transport and clears storage. It does not revoke the grant in the wallet. The user does that under **Connected dApps**.
