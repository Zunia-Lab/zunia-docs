---
title: WalletConnect
description: "WalletConnect v2 through @zunialab/sdk-web for wallets other than Zunia: setup, the shared project id, deep links, and Zunia mobile as a WalletConnect wallet (project-id builds only): methods, error codes, redirect."
---

# WalletConnect

Use WalletConnect v2 when you want wallets other than Zunia. Zunia mobile 0.1.0 accepts WalletConnect sessions only in builds that include a WalletConnect project id; elsewhere WalletConnect is off. To reach Zunia mobile, prefer [QR pairing](./qr.md) (Zunia Connect): it needs no project id, and the phone shows the origin the relay verified.

```ts
await session.connect({
  chains: ["cosmoshub-4"],
  prefer: "walletconnect",
  walletConnectProjectId: "your WalletConnect Cloud project id",
  loadWalletConnect: () => import("@walletconnect/sign-client"),
});
```

`@walletconnect/sign-client` is an optional peer. Loading it through the function you pass keeps it out of apps that never use it. Show `session.pairing.uri` as a QR code the same way as native pairing.

The transport asks the wallet for accounts through `cosmos_getAccounts` (so CosmJS gets real public keys) and follows `session_event`, `session_update`, `session_delete` and `session_expire`.

## Same project id everywhere

Create a project in the [Reown dashboard](https://dashboard.reown.com) (formerly WalletConnect Cloud) and use **one** id in:

- your dApp (`walletConnectProjectId`)
- `zunia-mobile` (`WALLETCONNECT_PROJECT_ID`)
- `zunia-dashboard` (`NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`). The dashboard keeps WalletConnect turned off for now and pairs Zunia mobile by QR.

Do not commit a production project id in a public fork and then keep using it.

## Zunia mobile as a WalletConnect wallet

In a build with a project id, Zunia mobile answers the `cosmos` namespace:

| Method | Answer |
|--------|--------|
| `cosmos_getAccounts` | `[{ algo, address, pubkey }]` for the accounts the session shares on that chain, at once and without a prompt, even while the wallet is locked. |
| `cosmos_signDirect` | `{ signerAddress, signDoc: { chainId, accountNumber, authInfoBytes, bodyBytes } }` → `{ signature, signed }`, after the review. |
| `cosmos_signAmino` | `{ signerAddress, signDoc }` → `{ signature, signed }`, after the review. |
| `cosmos_signArbitrary` | `{ signerAddress, data, encoding? }` → an ADR-036 `StdSignature`. Not in the WalletConnect spec; the Zunia SDK and Keplr use it. |

Events: `accountsChanged` and `chainChanged`. Requests go through the same review as Zunia Connect and the in-app browser, and through **Password on every signature** when the user turned it on.

Errors come back as JSON-RPC errors:

| Code | When |
|------|------|
| `4001` | The user rejected. |
| `8000` | Nobody answered within 5 minutes ("Request expired before it was answered"). |
| `5100` | The chain is not part of the session, or Zunia does not know it. |
| `-32602` | Bad parameters, a signer the session does not share, or a sign-in for another site. |
| `-32601` | A method Zunia does not offer. |
| `-32000` | Anything else. |

Zunia refuses a session proposal at once with `5100` when it needs chains Zunia does not support, `5101` for methods it does not offer, `5102` for events it does not send, `5104` when it requires a namespace other than `cosmos`, and `4001` when WalletConnect's Verify API lists the dApp as a scam.

Zunia's own metadata names `zunia://` and `https://zunialab.com/wc` as its redirect. When the user paired from the same phone, Zunia goes back to the dApp's own redirect after each answer.

A build without a project id refuses WalletConnect codes and links with "This build of Zunia does not have WalletConnect turned on". The dApp hears nothing, and its request ends in `TIMEOUT`.

## Deep links (mobile)

| Kind | Example |
|------|---------|
| WalletConnect URI | `wc:…` |
| Custom scheme | `zunia://wc?uri=…`, `zuniamobile://wc?uri=…` |
| Bring Zunia up for a request | `zunia://wc?requestId=…&sessionTopic=…`, or `zunia://` |
| Universal / App Link | `https://zunialab.com/wc?uri=…`, `https://link.zunialab.com/wc?uri=…` |

The HTTPS links do not open the app yet; see [Deep links](./qr.md#deep-links). Prefer QR pairing for Zunia.
