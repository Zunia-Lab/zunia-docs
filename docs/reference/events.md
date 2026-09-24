---
title: Events
---

# Events

## Provider (`window.zunia`)

| Event | Audience | Data |
|-------|----------|------|
| `accountsChanged` | Origins that are connected | Read `getKey` again |
| `chainChanged` | Origins that are connected | `{ chainIds }` still granted |
| `disconnect` | Origins that lost access | `null` (all) or `{ chainIds }` |
| `locked` | Connected origins | none |
| `keplr_keystorechange` | Same as `accountsChanged` | none (Keplr alias) |

Window events `zunia_*` and `keplr_*` are also dispatched for older listeners.

The worker only delivers these to tabs whose origin is granted. An origin that never connected hears nothing.

### Safari

Safari accepts `tabs.sendMessage` from the worker and never hands the message to the content script. The Safari build therefore:

1. Lets the content script open a port named `zunia:provider-events` once the page has used the provider.
2. Numbers every event and keeps the last 100 in `storage.session`.
3. On reconnect (worker restarted, or the tab came back to the front), sends everything newer than the page's last number.

A visible Safari tab that uses the wallet also pings the worker every 3 seconds so iOS does not stop it after ~8 seconds idle.

## SDK session

| Event | Payload |
|-------|---------|
| `status` | `ZuniaSessionStatus` |
| `accountsChanged` | `ZuniaAccountInfo[]` |
| `chainChanged` | `string[]` |
| `pairing` | `{ transport, uri, expiresAt }` |
| `verification` | 6-digit string (QR only) |
| `disconnect` | reason string |
| `error` | `ZuniaConnectError` |
