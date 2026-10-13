---
title: WalletConnect
---

# WalletConnect

Use WalletConnect v2 when you want wallets other than Zunia. The Zunia mobile app can **accept** a WalletConnect session when a Cloud project id is set. It does **not** sign WalletConnect requests yet. To reach Zunia mobile, use [QR pairing](./qr.md).

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
- `zunia-dashboard` (`NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`). The dashboard keeps WalletConnect turned off until Zunia mobile signs WalletConnect requests.

Do not commit a production project id in a public fork and then keep using it.

## Deep links (mobile)

| Kind | Example |
|------|---------|
| WalletConnect URI | `wc:…` |
| Custom scheme | `zunia://wc?…` |
| Universal / App Link | `https://zunialab.com/wc?…` |

Until WalletConnect signing ships in Zunia mobile, those links can open a session whose signature requests are never answered: they end in `TIMEOUT`. Prefer QR pairing for Zunia. The HTTPS link does not open the app yet either; see [Deep links](./qr.md#deep-links).
