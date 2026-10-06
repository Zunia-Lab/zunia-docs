---
title: FAQ
---

# FAQ

## Is Zunia in the stores?

No. Chrome, Edge, Firefox, App Store and Play Store listings are not submitted. Load a build from GitHub. See [Install the extension](./use-wallet/extension.md) and [Install the mobile wallet](./use-wallet/mobile.md).

## Can I use the same wallet on desktop and phone?

Yes. Import the same recovery phrase on the second device. Each device holds its own encrypted copy. Zunia does not sync keys through a server.

## How does a website connect?

The JavaScript SDK talks to the extension (`window.zunia`), or to the phone through a QR code and a relay, or to other wallets through WalletConnect. Start at the [quickstart](./get-started/quickstart.md).

## Can I sign in without sending a transaction?

Yes. [Sign in with Zunia](./integrate/sign-in.md) is an ADR-036 message bound to your domain. Your server checks it with `verifySignIn`.

## I scanned a WalletConnect code with Zunia mobile and nothing signs.

Expected. The app can open a WalletConnect session. It does not sign those requests yet. Use the Zunia QR (Connect with Zunia) instead.

## Where is the relay?

You run it. [zunia-backend](https://github.com/Zunia-Lab/zunia-backend) implements `zunia.connect.v2`. Nothing is deployed at `api.zunialab.com`.

## Are the SDKs on npm?

Yes. `@zunialab/sdk-web`, `@zunialab/sdk-react`, `@zunialab/sdk-core` and `@zunialab/interchain` are on npm at 0.1.0.

## Which chains work?

The bundled catalog is [zunia-chain-registry](https://github.com/Zunia-Lab/zunia-chain-registry). You can add a network by hand or a dApp can suggest one. Endpoints must be HTTPS.

## Does Zunia charge fees?

Only on swaps made in the Zunia browser extension. A swap made with its **Swap** screen carries a 0.5% commission, sent to Zunia. It is taken in the same transaction from the token you sell, and the review screen shows it before you sign. If the funds start on another chain and the swap runs on Osmosis, the commission is taken on that chain when the transfer is sent. If the swap then fails on Osmosis, the amount swapped comes back but the commission does not.

A swap you make on a dApp and only sign with Zunia carries no Zunia commission. Sends, IBC transfers and staking carry no commission either. You pay the network fee shown before you sign, and Zunia takes no cut of staking rewards. See [Fees](./use-wallet/fees.md).

## Is there a web dashboard I can paste my phrase into?

No, and there must never be. The dashboard repo is a watch-only scaffold and is not deployed. Signing keys stay in the extension or the phone.

## Has Zunia been audited?

No. Do not claim otherwise.

## Is it open source?

Yes. [github.com/Zunia-Lab](https://github.com/Zunia-Lab).

## How do I report a vulnerability?

[security@zunialab.com](mailto:security@zunialab.com), not a public issue.

## How do I get help?

[dev@zunialab.com](mailto:dev@zunialab.com) or a GitHub issue on the relevant repo.
