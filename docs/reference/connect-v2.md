---
title: zunia.connect.v2
---

# `zunia.connect.v2`

Protocol between a dApp, a relay, and Zunia mobile. The TypeScript types and crypto live in `@zunialab/sdk-core`. The Dart wallet implements the same vectors.

## HTTP

`POST /v1/connect/sessions` with the page's `Origin`. Response:

```ts
{
  v: "zunia.connect.v2",
  sessionId: string,
  dappToken: string,        // stays with the dApp, never in the QR
  walletJoinToken: string,  // single use, goes in the QR
  verifiedOrigin: string | null,
  expiresAt: number,
  wsUrl: string,
}
```

## WebSocket

`/v1/connect/ws`. Tokens travel in `Sec-WebSocket-Protocol` (`zunia.token.…`), not in the query string. The wallet's join token is consumed on first use and replaced by a `resumeToken`.

Relay frames (`t`) are the only thing the relay reads: `welcome`, `hello`, `peer`, `msg`, `paired`, `ping` / `pong`, `error`, `closed`. Application payloads sit inside sealed `msg` frames (`n` sequence, `c` ciphertext).

Only the wallet may send `hello` (its public key) and `paired`. `paired` locks the room and extends the TTL to 24 hours. Unpaired rooms die after 10 minutes. A socket is only replaced by a holder of that role's token.

## Crypto

- Key agreement: X25519
- KDF: HKDF-SHA256 over a transcript of both public keys and the session id
- Sealed frames: ChaCha20-Poly1305, with the sequence number in the AAD
- Sequence numbers: monotonic, reject duplicates and replays
- Verification code: 6 digits derived from the shared secret, shown on both sides

Test vectors: `@zunialab/sdk-core/test-vectors/connect-v2-vectors.json`.

## Pairing URI

`zunia://connect?…` (also accepted as `https://zunialab.com/connect?…`). Query holds the session id, the join token and the dApp public key. It does not hold the dApp token.

## What the relay sees

Session id, hashed tokens, `verifiedOrigin`, role, timestamps, ciphertext length. Not keys, not accounts, not the sign-in message, not the transaction.

Tokens are stored as SHA-256 hashes and compared with `timingSafeEqual`. Sessions persist in Postgres when `DATABASE_URL` is set; otherwise they live in memory and die on restart. Run one instance: live sockets are not shared.

Limits: session creation per client address, frame size and rate per socket, a global room cap, a bounded offline queue. `TRUST_PROXY` must match how you terminate TLS, or rate limits attach to the wrong address.

This is not a multi-instance relay. There is no public deployment.
