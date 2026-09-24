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

Not yet. Version 0.1.0 is tagged in the repo and waiting on the `zunialab` npm org. Build from [zunia-sdk](https://github.com/Zunia-Lab/zunia-sdk) until then.

## Which chains work?

The bundled catalog is [zunia-chain-registry](https://github.com/Zunia-Lab/zunia-chain-registry). You can add a network by hand or a dApp can suggest one. Endpoints must be HTTPS.

## Does Zunia charge fees?

No. You pay the network fee shown before you sign. Zunia takes no cut of transfers or staking rewards.

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
