---
title: Sign-in message
---

# Sign-in message

CAIP-122-style text, signed as ADR-036. Built by `buildSignInMessage` / `session.signIn()`, parsed by `parseSignInMessage`, checked by `verifySignIn`.

```text
<domain> wants you to sign in with your Cosmos account:
<address>

<optional statement>

URI: <uri>
Version: 1
Chain ID: <chain-id>
Nonce: <hex>
Issued At: <ISO-8601>
Expiration Time: <ISO-8601>
Not Before: <ISO-8601>   # optional
```

| Field | Rule |
|-------|------|
| Domain | Exact host of the site that asked. The wallet compares it to the caller origin (extension) or to `verifiedOrigin` (QR). |
| Address | Bech32 of the account that signs. Must derive from the signature's public key. |
| URI | Must be on that domain (`https://app.example.com/…` is fine; `https://evil.example` is not). |
| Version | `1` |
| Chain ID | The chain the account belongs to. |
| Nonce | At least 8 bytes of entropy, typically `createNonce()`. Consume once on the server. |
| Issued At | Not in the future. Default max age: 10 minutes. |
| Expiration Time | Required in the SDK default (now + 10 minutes). Must be in the future at verify time. |

`looksLikeSignIn` is what the wallet uses to decide between the sign-in screen and a generic arbitrary-data screen. `checkSignInBinding` is the domain/URI rule wallets must run before signing.

Vectors: `@zunialab/sdk-core/test-vectors/sign-in-vectors.json`.
