---
title: Sign in with Zunia
---

# Sign in with Zunia

Use this when you only need to know which Cosmos account is at the keyboard. There is no transaction and no fee.

The wallet shows a dedicated **Sign in to &lt;site&gt;** screen: your domain, the account and the expiry. A generic `signArbitrary` of the same bytes is refused if the domain does not match the caller.

## Browser

```ts
const { nonce } = await (await fetch("/api/nonce", { method: "POST" })).json();
const { message, signature, address } = await session.signIn({
  nonce,
  statement: "Sign in to My dApp.", // optional
});
await fetch("/api/verify", { method: "POST", body: JSON.stringify({ nonce, message, signature }) });
```

`session.signIn()` fills `location.host` as the domain and `location.origin` as the URI. The message expires after 10 minutes unless you pass `expirationTime`.

## Server

```ts
import { createNonce, verifySignIn, ZuniaSignInError } from "@zunialab/sdk-core";

// POST /api/nonce
const nonce = createNonce();
await nonces.save(nonce, { ttlSeconds: 600 });

// POST /api/verify  { nonce, message, signature }
if (!(await nonces.consume(nonce))) throw new Error("Unknown or used nonce");
try {
  const { address, chainId } = verifySignIn({
    message,
    signature,
    nonce,
    domain: "app.example.com",
    chainId: ["cosmoshub-4"], // optional
  });
} catch (error) {
  if (error instanceof ZuniaSignInError) console.warn(error.code);
  throw error;
}
```

`domain` must come from your config, not from the request `Host` header.

`verifySignIn` checks, in order: the message format, the domain, that the URI is on that domain, the nonce, the chain, the address if you pass one, the dates (issued less than 10 minutes ago by default, not expired, not before `notBefore`), that the key is a compressed secp256k1 key, that it derives the signed address, and the ADR-036 signature.

Storing each nonce and consuming it once is your job. That is what stops a captured signature from being replayed.

## What the user signs

```text
app.example.com wants you to sign in with your Cosmos account:
cosmos1fr389pmrhma7sqmmshzpvg6hyn9jzegzvx6y6x

Sign in to Example.

URI: https://app.example.com
Version: 1
Chain ID: cosmoshub-4
Nonce: 8f1c2a9d4b7e6f30a5c1d2e3f4a5b6c7
Issued At: 2026-09-24T10:00:00.000Z
Expiration Time: 2026-09-24T10:10:00.000Z
```

The wallet signs it as ADR-036 arbitrary data, so it can never be a transaction. Field rules are in [the sign-in reference](../reference/sign-in.md).

## Over QR pairing

The phone binds the message to the **verified origin** the relay recorded from the page's `Origin` header, not to whatever URL the dApp put in its metadata. If those differ, the wallet warns and refuses sign-in. See [QR connection](./qr.md#verified-origin).
