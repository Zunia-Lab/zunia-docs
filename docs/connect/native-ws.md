# Native WebSocket connect (`zunia.connect.v1`)

First-party “Connect with Zunia” uses an ephemeral session broker in `zunia-backend`. The broker relays messages only — it never holds keys or user identity.

## When to use

| Path | Use |
|------|-----|
| Extension inject (`window.zunia`) | Browser dApp with Zunia installed |
| **Native WS** | Mobile / dashboard first-party pairing (QR + deep link) |
| WalletConnect v2 | Third-party dApps that already speak WC |

Transport preference in `@zunialab/sdk-web` `connectWithZunia`: extension → native WS → WC.

## Endpoints

| Method | Path | Role |
|--------|------|------|
| `POST` | `/v1/connect/sessions` | Create room → `{ sessionId, pairingSecret, wsUrl, deepLink, qrPayload }` |
| `GET` | `/v1/connect/sessions/:id` | Public dApp metadata for the wallet |
| `DELETE` | `/v1/connect/sessions/:id` | Teardown |
| WS | `/v1/connect/ws?sid=&role=dapp\|wallet&token=` | Bidirectional relay |

### Dev vs prod

- Dev: `ws://localhost:8788/v1/connect/ws` (set `CONNECT_WS_PUBLIC_URL=ws://localhost:8788`)
- Prod: `wss://api…/v1/connect/ws`

## Message types

Frames are JSON: `{ v: "zunia.connect.v1", type, id?, ts, payload }`.

| type | Direction | Purpose |
|------|-----------|---------|
| `hello` / `hello_ok` | both ↔ broker | Role + TTL |
| `connect_request` / `connect_approve` / `connect_reject` | dApp ↔ wallet | Session handshake |
| `sign_amino` / `sign_direct` / `sign_arbitrary` | dApp → wallet | Signing |
| `sign_result` / `sign_reject` | wallet → dApp | Result |
| `event_accounts_changed` / `event_chain_changed` | wallet → dApp | Realtime updates |
| `ping` / `pong` / `disconnect` / `error` | — | Keepalive / teardown |

## Deep links

- `zunia://connect?sid=…&k=…`
- `https://zunialab.com/connect?sid=…&k=…`

## SDK

```ts
import { connectWithZunia } from "@zunialab/sdk-web";

const session = await connectWithZunia({
  chains: ["cosmoshub-4"],
  prefer: "native-ws",
  apiBase: "http://localhost:8788",
  metadata: { name: "My dApp", url: "https://example.com" },
});
```

See `@zunialab/sdk-core` for shared types (`CreateConnectSessionResponse`, envelopes).
