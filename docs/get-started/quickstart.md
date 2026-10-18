---
title: Quickstart
---

# Connect a site in five minutes

This page gets a React app talking to the Zunia extension: connect, restore after a reload, and sign in. The same session object signs transactions with CosmJS.

Install from npm:

```bash
pnpm add @zunialab/sdk-react @zunialab/sdk-web
```

A server that checks sign-in uses `@zunialab/sdk-core`. IBC routes and packet memos are `@zunialab/interchain`.

You also need the Zunia extension. Install it from the [Chrome Web Store](https://chromewebstore.google.com/detail/zunia/ngokakoekdogobjmokipglbcclelgajk), or [build it](../use-wallet/extension.md) for another browser. Create a wallet there before you click Connect.

## 1. Connect

```tsx
import { ConnectWithZuniaButton, useZuniaSession } from "@zunialab/sdk-react";

const options = { chains: ["cosmoshub-4"] };

export function Connect() {
  const zunia = useZuniaSession({ restore: options });

  if (zunia.restoring) return null;
  if (zunia.locked) {
    return <button onClick={() => zunia.unlock().catch(() => {})}>Unlock Zunia</button>;
  }
  if (zunia.connected) {
    return <p>Connected as {zunia.accounts[0]?.address}</p>;
  }
  return (
    <ConnectWithZuniaButton
      loading={zunia.connecting}
      onClick={() => zunia.connect(options).catch(() => {})}
    />
  );
}
```

`useZuniaSession({ restore: options })` reattaches after a reload without opening a window. `connect` asks the extension for those chains. The user approves in the toolbar popup (Chrome also draws an in-page prompt when it can tell the page is visible).

If the wallet was locked when the page loaded, `zunia.locked` is true and `accounts` stays empty. `unlock()` opens the unlock window and keeps your site's grant. Call it from a click.

## 2. Sign in (no transaction)

Your server issues a nonce. The wallet signs a message that names your domain. You check the result on the server.

```ts
// Browser
const { nonce } = await (await fetch("/api/nonce", { method: "POST" })).json();
const proof = await zunia.signIn({ nonce });
await fetch("/api/verify", { method: "POST", body: JSON.stringify({ nonce, ...proof }) });
```

```ts
// Server
import { createNonce, verifySignIn } from "@zunialab/sdk-core";

const nonce = createNonce();
// store nonce for 10 minutes, then consume it once

const { address } = verifySignIn({
  message,
  signature,
  nonce,
  domain: "app.example.com", // from your config, not from the request Host
});
```

The wallet refuses a message whose domain is not the site asking. See [Sign in with Zunia](../integrate/sign-in.md).

## 3. Send with CosmJS

```ts
import { SigningStargateClient } from "@cosmjs/stargate";

const [account] = zunia.accounts;
const messages = [
  {
    typeUrl: "/cosmos.bank.v1beta1.MsgSend",
    value: { fromAddress: account.address, toAddress: recipient, amount: [{ denom: "uatom", amount: "1000" }] },
  },
];
const signer = zunia.session.getOfflineSignerFor("cosmoshub-4", { messages, memo });
const client = await SigningStargateClient.connectWithSigner(rpcUrl, signer);
await client.signAndBroadcast(account.address, messages, "auto", memo);
```

`getOfflineSignerFor` hands CosmJS the signer the connected Zunia build can sign these messages with, so contract calls also work on older extension builds. Results are `Uint8Array` and `bigint` on every transport.

## Example

[`examples/dapp`](https://github.com/Zunia-Lab/zunia-sdk/tree/main/examples/dapp) in zunia-sdk is a Vite app with connect, verified sign-in, a CosmJS send and a live event log. It is what the end-to-end tests drive.

## Next

- [React guide](../integrate/react.md)
- [Extension without React](../integrate/extension.md)
- [Pair a phone by QR](../integrate/qr.md)
- [Use Zunia mobile from another app](../integrate/app-to-app.md), on the same phone
- [Events and session lifecycle](../integrate/events.md)
