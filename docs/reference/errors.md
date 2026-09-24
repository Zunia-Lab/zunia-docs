---
title: Errors
---

# Errors

Every transport rejects with `ZuniaConnectError` and a stable `code`. The provider uses the same codes on `window.zunia`.

| Code | Meaning |
|------|---------|
| `USER_REJECTED` | The user said no, or closed the window. |
| `NOT_CONNECTED` | This origin has no grant for that chain or account. |
| `LOCKED` | The wallet is locked. |
| `UNKNOWN_CHAIN` | The wallet does not know the chain. Suggest it first. |
| `ORIGIN_MISMATCH` | A sign-in message names another site. |
| `UNSUPPORTED` | The wallet or transport cannot do this (`sendTx`, unknown methods, blind signing of unknown messages). |
| `INVALID_PARAMS` | Bad arguments. |
| `NOT_INSTALLED` | No extension, relay or WalletConnect setup. |
| `TIMEOUT` | The wallet did not answer in time. |
| `DISCONNECTED` | The session ended while waiting. |
| `PAIRING_FAILED` | QR pairing could not complete. |
| `SESSION_EXPIRED` | The relay no longer knows the session. |
| `NETWORK` | The relay or WalletConnect could not be reached. |
| `INTERNAL` | Anything else. |

`error instanceof ZuniaConnectError` and `error.code` are the stable checks. Do not match on `error.message`.

## Sign-in (`ZuniaSignInError`)

Thrown by `verifySignIn` on the server:

`INVALID_MESSAGE`, `DOMAIN_MISMATCH`, `URI_MISMATCH`, `NONCE_MISMATCH`, `CHAIN_MISMATCH`, `ADDRESS_MISMATCH`, `ISSUED_IN_FUTURE`, `TOO_OLD`, `EXPIRED`, `NOT_YET_VALID`, `UNSUPPORTED_KEY`, `KEY_MISMATCH`, `INVALID_SIGNATURE`.
