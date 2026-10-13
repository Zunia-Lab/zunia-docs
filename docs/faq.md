---
title: FAQ
---

# FAQ

## Is Zunia in the stores?

The extension is on the [Chrome Web Store](https://chromewebstore.google.com/detail/zunia/ngokakoekdogobjmokipglbcclelgajk). Safari, the App Store and Google Play are in review. Firefox is planned. For the others, load a build from GitHub. See [Install the extension](./use-wallet/extension.md) and [Install the mobile wallet](./use-wallet/mobile.md).

## Can I use the same wallet on desktop and phone?

Yes. Import the same recovery phrase on the second device. Each device holds its own encrypted copy. Zunia does not sync keys through a server. The two apps add further accounts differently; see [More accounts](./use-wallet/keys.md#more-accounts).

## How does a website connect?

The JavaScript SDK talks to the extension (`window.zunia`), or to the phone through a QR code and a relay, or to other wallets through WalletConnect. Start at the [quickstart](./get-started/quickstart.md).

## Can I sign in without sending a transaction?

Yes. [Sign in with Zunia](./integrate/sign-in.md) is an ADR-036 message bound to your domain. Your server checks it with `verifySignIn`.

## I scanned a WalletConnect code with Zunia mobile and nothing signs.

Expected. The app can open a WalletConnect session. It does not sign those requests yet. Use the Zunia QR (Connect with Zunia) instead.

## Where is the relay?

Zunia runs it at `https://api.zunialab.com`. Its source is [zunia-backend](https://github.com/Zunia-Lab/zunia-backend), which implements `zunia.connect.v2`. See [Connect a phone by QR](./integrate/qr.md).

## Are the SDKs on npm?

Yes. `@zunialab/sdk-web`, `@zunialab/sdk-react`, `@zunialab/sdk-core` and `@zunialab/interchain` are on npm.

## Which chains work?

The bundled catalog is [zunia-chain-registry](https://github.com/Zunia-Lab/zunia-chain-registry). You can add a network by hand or a dApp can suggest one. Endpoints must be HTTPS.

## Does Zunia charge fees?

Only on swaps made with Zunia's own **Swap** screen, in the browser extension or on the [web dashboard](https://app.zunialab.com). Such a swap carries a 0.5% commission, sent to Zunia. It is taken in the same transaction from the token you sell, and the review screen shows it before you sign. If the funds start on another chain and the swap runs on Osmosis, the commission is taken on that chain when the transfer is sent. If the swap then fails on Osmosis, the amount swapped comes back but the commission does not.

A swap you make on another site or dApp and only sign with Zunia carries no Zunia commission. Sends, IBC transfers and staking carry no commission either. You pay the network fee shown before you sign, and Zunia takes no cut of staking rewards. See [Fees](./use-wallet/fees.md).

## Is there a web dashboard I can paste my phrase into?

No, and there must never be. The web dashboard at [app.zunialab.com](https://app.zunialab.com) holds no keys and never asks for a phrase. It connects the Zunia extension, Keplr, or Zunia mobile by QR code, and every transaction is signed in that wallet. Signing keys stay in the extension or the phone.

## Has Zunia been audited?

No. Do not claim otherwise.

## Is it open source?

Yes. [github.com/Zunia-Lab](https://github.com/Zunia-Lab).

## How do I report a vulnerability?

[dev@zunialab.com](mailto:dev@zunialab.com), not a public issue.

## How do I get help?

[dev@zunialab.com](mailto:dev@zunialab.com), [zunialab@gmail.com](mailto:zunialab@gmail.com), or a GitHub issue on the relevant repo.
