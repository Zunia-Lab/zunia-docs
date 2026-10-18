---
title: Events
description: "Events from window.zunia (accountsChanged, chainChanged, disconnect, locked, and the zunia_* / keplr_* window events) in the extension and in Zunia mobile's in-app browser, how Safari delivers them, and the events of an SDK session."
---

# Events

## Provider (`window.zunia`)

| Event | Audience | Data |
|-------|----------|------|
| `accountsChanged` | Origins that are connected. Also sent when the wallet unlocks. | Read `getKey` again |
| `chainChanged` | Origins that are connected | `{ chainIds }` still granted |
| `disconnect` | Origins that lost access | `null` (all) or `{ chainIds }` |
| `locked` | Connected origins | none |
| `keplr_keystorechange` | Same as `accountsChanged` | none (Keplr alias) |

For older listeners, `window` also gets `zunia_keystorechange`, `zunia_disconnect`, `zunia_locked` and `zunia_chainchanged`, plus `keplr_keystorechange` and `keplr_disconnect` while the Keplr alias is on.

The worker only delivers these to tabs whose origin is granted. An origin that never connected hears nothing.

### Safari

Safari accepts `tabs.sendMessage` from the worker and never hands the message to the content script. The Safari build therefore:

1. Lets the content script open a port named `zunia:provider-events` once the page has used the provider.
2. Numbers every event and keeps the last 100 in `storage.session`.
3. On reconnect (worker restarted, or the tab came back to the front), sends everything newer than the page's last number.

A visible Safari tab that uses the wallet also pings the worker every 3 seconds so iOS does not stop it after ~8 seconds idle.

### Zunia mobile

Zunia mobile's in-app browser sends the same events, on the provider and on `window`, to the open page only while it is connected. The `keplr_*` window events need **Keplr compatibility** on. When a site loses some of its chains but not all, `window` gets `zunia_keystorechange` (a Keplr-style site then finds which `getKey` calls stopped working); losing every chain dispatches `zunia_disconnect`.

## SDK session

| Event | Payload |
|-------|---------|
| `status` | `ZuniaSessionStatus` |
| `accountsChanged` | `ZuniaAccountInfo[]` |
| `chainChanged` | `string[]` |
| `pairing` | `{ transport, uri, expiresAt }` |
| `verification` | 6-digit string (QR only) |
| `disconnect` | reason string, such as `"user"` (your own `disconnect()`), `"revoked"` (the extension dropped your site) or `"expired"` (the relay session ran out) |
| `error` | `ZuniaConnectError` |
