---
title: zunia.connect.v2
description: The protocol between a dApp, the Zunia relay and Zunia mobile. HTTP and WebSocket endpoints, relay frames, the end-to-end crypto, the pairing link with its ret return target, wake links, limits, close codes and what the relay can see.
---

# `zunia.connect.v2`

Protocol between a dApp, a relay, and Zunia mobile. The TypeScript types and crypto live in `@zunialab/sdk-core`. The Dart wallet implements the same test vectors.

## HTTP

Zunia runs a relay at `https://api.zunialab.com`. Any page origin may create sessions there; the relay records that origin, it does not filter on it.

`POST /v1/connect/sessions` with the page's `Origin`. Response (`201`):

```ts
{
  v: "zunia.connect.v2",
  sessionId: string,        // 22 characters, base64url
  dappToken: string,        // 43 characters; stays with the dApp, never in the QR
  walletJoinToken: string,  // 43 characters; single use, goes in the QR
  verifiedOrigin: string | null,
  expiresAt: number,        // ms since the epoch
  wsUrl: string,            // wss://api.zunialab.com/v1/connect/ws
}
```

It answers `429` with `Retry-After` when an address creates too many sessions, and `503` when the relay holds its maximum number of live sessions.

`GET /v1/connect/sessions/{sessionId}` and `DELETE /v1/connect/sessions/{sessionId}`, with `Authorization: Bearer <token>` (the dApp token, or the wallet's resume token), read the session's state or end it. `GET` returns `{ v, sessionId, role, verifiedOrigin, paired, peerOnline, expiresAt }`; `DELETE` answers `204`.

## WebSocket

`/v1/connect/ws?sid=…&role=dapp` (or `role=wallet`). The client offers two subprotocols in `Sec-WebSocket-Protocol`: `zunia.connect.v2` and `zunia.token.<token>`. The relay selects `zunia.connect.v2`, so tokens never appear in URLs or access logs. A client that does not offer both is refused. The wallet's join token is consumed on first use and replaced by a `resumeToken`, sent once in its `welcome`.

### Relay frames

Frames are JSON text with a `t` field. They are the only thing the relay reads.

| `t` | From | Meaning |
|-----|------|---------|
| `welcome` | relay | `{ v, role, sessionId, verifiedOrigin, paired, peer, expiresAt, resumeToken? }` after the upgrade. Queued frames follow. |
| `hello` | wallet, then relay to dApp | `{ pk }`: the wallet's X25519 public key, in the clear. Refused once the session is paired. |
| `msg` | either side | `{ n, c }`: a sealed application message (below). |
| `paired` | wallet, then relay to both | The wallet approved. The relay locks the session and extends it to 24 hours; `{ expiresAt }` goes to both sides. |
| `peer` | relay | `{ online }`: the other side connected or dropped. |
| `ping` / `pong` | client / relay | Answered in order, so a `pong` confirms every frame sent before its `ping`. |
| `error` | relay | `{ code, message }` about the frame just handled (below). The socket stays open. |
| `close` | either side | Ends the session for both. |
| `closed` | relay | `{ reason }`: `closed`, `deleted` or `expired`, just before the relay closes the socket with `4001`. |

Only the wallet may send `hello` and `paired`. A socket is only replaced by a holder of that role's token.

Relay `error` codes: `BAD_FRAME` (not JSON text, or not a frame above), `FORBIDDEN` (a frame this role may not send, or `hello` after pairing) and `QUEUE_FULL` (see [Lifetimes and limits](#lifetimes-and-limits)). The relay only speaks up about a frame it refuses, and answers in order. The JS SDK follows each request with its own `ping`, so it knows which request an `error` is about.

### Close codes

| Code | Meaning | What the SDK does |
|------|---------|-------------------|
| `4000` | Another socket authenticated for the same role (another tab resumed the session). | Ends here, leaves the saved session to the other tab. |
| `4001` | The session ended: closed by a peer, deleted or expired. | `disconnect` event. |
| `4008` | Too many frames from this socket. | Reconnects after at least 10 seconds. |
| `4401` | Unknown session, wrong token, or a join token already used. | `SESSION_EXPIRED`. |
| `1009` | A frame over 512 KiB. | Never happens: the SDK refuses such a request before it leaves. |

## Sealed messages

Application messages travel inside `msg` frames, encrypted end to end:

- Key agreement: X25519 between the dApp key (in the pairing link) and the wallet key (in `hello`).
- Keys: HKDF-SHA256 over the shared secret. Salt: SHA-256(`"zunia.connect.v2"` 0x00 sessionId 0x00 dAppPublicKey walletPublicKey). Info `zunia.connect.v2 dapp->wallet` and `zunia.connect.v2 wallet->dapp` give one 32-byte key per direction.
- Each frame: ChaCha20-Poly1305 with a fresh random 12-byte nonce. `n` is that nonce (16 base64url characters). `c` is the ciphertext with its 16-byte tag, unpadded base64url.
- Associated data: `zunia.connect.v2|<sessionId>|<direction>`, where the direction is `dapp->wallet` or `wallet->dapp`. A frame cannot be moved to another session or sent back the other way.
- Plaintext: the JSON envelope `{ seq, type, id?, payload? }`. The sequence number is **inside** the encrypted envelope. It starts at 1 and grows by one per frame in each direction. A receiver drops a frame whose `seq` is not above the last one it accepted, so a frame the other side sent again after a reconnect is ignored and a replay does nothing. Gaps are allowed: a request the relay refused never arrives.
- Verification code: info `zunia.connect.v2 verification code`, 4 bytes, big-endian, modulo 1,000,000, zero-padded to 6 digits. Both screens show it. A relay that swapped keys produces two different codes.

| `type` | Direction | `payload` |
|--------|-----------|-----------|
| `connect_request` | dApp → wallet | `{ metadata, chains, methods, events }` |
| `get_accounts` | dApp → wallet | `{ chainIds }` |
| `sign_amino` | dApp → wallet | `{ chainId, signer, signDoc }` |
| `sign_direct` | dApp → wallet | `{ chainId, signer, signDoc: { bodyBytes, authInfoBytes, chainId, accountNumber } }` (bytes base64, `accountNumber` a decimal string) |
| `sign_arbitrary` | dApp → wallet | `{ chainId, signer, data, encoding: "utf8" \| "base64" }` |
| `connect_approve` / `connect_reject` | wallet → dApp | `{ accounts, chains, wallet? }` / `{ code, message }` |
| `result` / `error` | wallet → dApp | The answer to the request with the same `id`. Errors carry `{ code, message }` with a code from [Errors](./errors.md). |
| `accounts_changed` / `chains_changed` | wallet → dApp | `{ accounts }` / `{ chains }`. An empty chain list ends the session. |

Test vectors: `test-vectors/connect-v2-vectors.json` in the `@zunialab/sdk-core` package. They pin the key agreement, sealed frames, verification codes, pairing links (with and without `ret`), the return targets a wallet follows, and wake links.

## Pairing link

```text
zunia://connect?v=2&sid=<22>&t=<43>&pk=<43>&r=<relay ws base>[&ret=<url-encoded return target>]
```

Also accepted as `https://zunialab.com/connect?…`. The query holds the protocol version, the session id (`sid`), the join token (`t`), the dApp's X25519 public key (`pk`, unpadded base64url) and the relay's WebSocket base (`r`, `wss://api.zunialab.com`). It never holds the dApp token. The wallet only pairs through a relay on its trusted list; see [Verified origin](../integrate/qr.md#verified-origin).

### `ret`: the return target

`ret` is optional. It is where the wallet goes once the user approves or rejects the connect request, and each later request on that session, **when the pairing link opened Zunia on the same device** (a tap on a link, or another app opening it). On a scanned QR code the wallet ignores it, so the SDK leaves it out of the QR code and puts it only in the app link (`pairing.appUri`).

The wallet follows a `ret` that is:

- an `https:` URL with a host, or
- a URL in an app's own scheme (`myapp://zunia/done`, `com.example.app:/callback`), whose scheme is none of `zunia`, `zuniamobile`, `wc`, `javascript`, `data`, `file`, `blob`, `about`, `content`, `intent`; plain `http:` is not accepted either;
- made of RFC 3986 characters only (percent-encode the rest), at most 512 characters.

It ignores anything else and pairs anyway, with no way back. `isValidReturnUrl` in `@zunialab/sdk-core` applies these rules; `buildPairingUri` refuses a target that breaks them.

### Wake link

```text
zunia://connect/wake?sid=<22-character session id>
```

Also `https://zunialab.com/connect/wake?sid=…`. It carries the session id only, no secret. Zunia brings that paired session up (reconnects it to the relay) and shows the requests waiting there. A session id the phone does not know is ignored. A wake link never pairs anything.

The SDK opens it after sending a signing request on a session that was paired from the same phone; see [Use Zunia mobile from another app](../integrate/app-to-app.md). `buildWakeUri` and `parseWakeUri` are in `@zunialab/sdk-core`.

## Lifetimes and limits

| | |
|--|--|
| Unpaired session | 10 minutes to scan and approve. |
| Paired session | 24 hours from `paired`. |
| Frame size | 512 KiB per WebSocket frame. A bigger one closes the socket (`1009`). The SDK measures the sealed frame and refuses the request first: `INVALID_PARAMS` with `reason: "too-large"`. |
| Offline queue | While one side is offline, the relay holds up to 32 frames for it per direction, 1 MiB per session, for 10 minutes. A frame that does not fit is dropped and answered with `QUEUE_FULL`; the SDK fails that request at once with `NETWORK`, `reason: "queue-full"`, and does not send it again. |
| Frame rate | 120 frames per 10 seconds per socket, then `4008`. |
| Creation | 20 new sessions and 60 WebSocket upgrades per client address per minute; 10,000 live sessions in all (`503` beyond). |

## What the relay sees

The session id, hashed tokens, `verifiedOrigin`, each side's role and presence, timestamps, frame sizes and timing, and the wallet's X25519 public key, which `hello` carries in the clear. It never sees the dApp's public key (it is only in the pairing link), the shared secret, the session keys, accounts, sign-in messages or transactions. Knowing one public key does not let the relay read anything; swapping keys would change the 6-digit code on both screens.

Tokens are stored as SHA-256 hashes and compared with `timingSafeEqual`. Sessions persist in Postgres when `DATABASE_URL` is set; otherwise they live in memory and die on restart. `TRUST_PROXY` must match how you terminate TLS, or rate limits attach to the wrong address.

This is not a multi-instance relay: live sockets are not shared. The deployment at `api.zunialab.com` is one instance.
