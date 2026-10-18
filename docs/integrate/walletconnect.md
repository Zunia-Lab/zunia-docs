---
title: WalletConnect
description: "Connect wallets other than Zunia with WalletConnect v2 through @zunialab/sdk-web: setup, the shared project id, deep links, and when Zunia mobile answers WalletConnect (builds that include a project id)."
---

# WalletConnect

Use WalletConnect v2 when you want wallets other than Zunia. Zunia mobile 0.1.0 accepts WalletConnect sessions and signs their requests (`cosmos_getAccounts`, `cosmos_signAmino`, `cosmos_signDirect`, `cosmos_signArbitrary`) only in builds that include a WalletConnect project id; elsewhere WalletConnect is off. To reach Zunia mobile, prefer [QR pairing](./qr.md): it needs no project id, and the phone shows the origin the relay verified.

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

## Deep links (mobile)

| Kind | Example |
|------|---------|
| WalletConnect URI | `wc:…` |
| Custom scheme | `zunia://wc?…` |
| Universal / App Link | `https://zunialab.com/wc?…` |

A Zunia mobile build without a WalletConnect project id ignores those links, and a session you thought you opened ends in `TIMEOUT`. Prefer QR pairing for Zunia. The HTTPS link does not open the app yet either; see [Deep links](./qr.md#deep-links).
