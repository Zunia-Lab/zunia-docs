---
title: Errors
description: "Every ZuniaConnectError code and reason, including too-large and queue-full for QR pairing, what each means and what to do, and the ZuniaSignInError codes verifySignIn throws on the server."
---

# Errors

Every transport rejects with `ZuniaConnectError` and a stable `code`. `window.zunia` uses the wallet's codes from this list: `USER_REJECTED` to `INVALID_PARAMS`, and `INTERNAL`.

| Code | Meaning |
|------|---------|
| `USER_REJECTED` | The user said no, or closed the window. |
| `NOT_CONNECTED` | This origin has no grant for that chain or account. |
| `LOCKED` | The wallet is locked. |
| `UNKNOWN_CHAIN` | The wallet does not know the chain. Suggest it first. |
| `ORIGIN_MISMATCH` | A sign-in message names another site. |
| `UNSUPPORTED` | The wallet or transport cannot do this (`sendTx`, unknown methods, blind signing of unknown messages, a transaction too large for Zunia mobile to show in full). |
| `INVALID_PARAMS` | Bad arguments. |
| `NOT_INSTALLED` | No extension, relay or WalletConnect setup. |
| `TIMEOUT` | The wallet did not answer in time. |
| `DISCONNECTED` | The session ended while waiting. |
| `PAIRING_FAILED` | QR pairing could not complete. |
| `SESSION_EXPIRED` | The relay no longer knows the session. |
| `NETWORK` | The relay or WalletConnect could not be reached. |
| `INTERNAL` | Anything else. |

`error instanceof ZuniaConnectError` and `error.code` are the stable checks. Do not match on `error.message`.

`error.reason` narrows the cases where the next step differs:

| Reason | Code | Meaning |
|--------|------|---------|
| `blind-signing` | `UNSUPPORTED` | This Zunia build cannot show the transaction, so it signed nothing. |
| `amino-escaping` | `UNSUPPORTED` | Zunia 0.1.4 or older signed `&`, `<` or `>` in a way the chain refuses. Stopped before broadcast. |
| `prompt-expired` | `TIMEOUT` | The wallet's prompt (the extension's, or Zunia mobile's in-app browser's) expired after 5 minutes before anyone answered. |
| `stale-page` | `DISCONNECTED` | The extension was updated or reloaded under the page. Reload the page. |
| `too-large` | `INVALID_PARAMS` | QR pairing: the request is over the relay's 512 KiB frame limit once encrypted. Nothing was sent. Split the transaction. |
| `queue-full` | `NETWORK` | QR pairing: the phone is offline and the relay already holds as many frames for it as it can (32, or 1 MiB). This request was not delivered and is not sent again. Ask the user to open Zunia, then retry. |

Over QR pairing, Zunia mobile answers a request nobody approved within 5 minutes with `USER_REJECTED` and the message "Request expired before it was answered". `@zunialab/sdk-web` passes that on as `USER_REJECTED`, with no reason, so treat it as a refusal the user can try again. Through WalletConnect, Zunia mobile sends JSON-RPC error `8000` for the same case.

`too-large` and `queue-full` come with `@zunialab/sdk-web` 0.2.0 and later. Before it, the first made the relay drop the connection again and again, and the second ended in `TIMEOUT`.

`explainZuniaError(error)` turns any error into a short `title`, a `message` with the next step, `retryable`, and the wallet's own text as `detail`.

## Sign-in (`ZuniaSignInError`)

Thrown by `verifySignIn` on the server:

`INVALID_MESSAGE`, `DOMAIN_MISMATCH`, `URI_MISMATCH`, `NONCE_MISMATCH`, `CHAIN_MISMATCH`, `ADDRESS_MISMATCH`, `ISSUED_IN_FUTURE`, `TOO_OLD`, `EXPIRED`, `NOT_YET_VALID`, `UNSUPPORTED_KEY`, `KEY_MISMATCH`, `INVALID_SIGNATURE`.
