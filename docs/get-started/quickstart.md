---
title: Quickstart
---

# Connect a site in five minutes

This page gets a React app talking to the Zunia extension: connect, restore after a reload, and sign in. The same session object signs transactions with CosmJS.

Install 0.1.0 from npm:

```bash
pnpm add @zunialab/sdk-react @zunialab/sdk-web
```

A server that checks sign-in uses `@zunialab/sdk-core`. IBC routes and packet memos are `@zunialab/interchain`.

You also need a Zunia extension build. Clone [zunia-extension](https://github.com/Zunia-Lab/zunia-extension), run `pnpm install && pnpm build:chrome`, and load `.output/chrome-mv3` as an unpacked extension. Create a wallet there before you click Connect.

## 1. Connect

```tsx
import { ConnectWithZuniaButton, useZuniaSession } from "@zunialab/sdk-react";

const options = { chains: ["cosmoshub-4"] };

export function Connect() {
  const zunia = useZuniaSession({ restore: options });

  if (zunia.restoring) return null;
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

const signer = zunia.session.getOfflineSigner("cosmoshub-4");
const client = await SigningStargateClient.connectWithSigner(rpcUrl, signer);
```

Results are `Uint8Array` and `bigint` on every transport.

## Example

[`examples/dapp`](https://github.com/Zunia-Lab/zunia-sdk/tree/main/examples/dapp) in zunia-sdk is a Vite app with connect, verified sign-in, a CosmJS send and a live event log. It is what the end-to-end tests drive.

## Next

- [React guide](../integrate/react.md)
- [Extension without React](../integrate/extension.md)
- [Pair a phone by QR](../integrate/qr.md)
- [Events and session lifecycle](../integrate/events.md)
