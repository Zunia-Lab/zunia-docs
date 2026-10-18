---
title: Web dApp (extension)
description: "Connect a web dApp to the Zunia extension, or to Zunia mobile's in-app browser, with @zunialab/sdk-web: restore without a prompt, detect the provider, which calls open a window, sign with CosmJS and broadcast."
---

# Connect from a web dApp

Use `@zunialab/sdk-web` when you are not on React, or when you want the session object yourself. The extension injects `window.zunia` on `https://` pages and on localhost. So does Zunia mobile's in-app browser (**Discover**), with `mode: "mobile"`: the code on this page works there unchanged. See [`window.zunia` in Zunia mobile](../reference/provider.md#zunia-mobile).

```ts
import { createZuniaSession } from "@zunialab/sdk-web";

const options = {
  chains: ["cosmoshub-4", "osmosis-1"],
  metadata: { name: "My dApp", url: location.origin },
};

const session = createZuniaSession();

if (!(await session.restore(options))) {
  await session.connect({ ...options, prefer: "extension" });
}

const [account] = session.accounts;
```

`restore` does not prompt. It calls `getConnectedChains()` on the provider and, if your site is still granted, reattaches. If the wallet is locked, status becomes `locked`, `accounts` stays empty, and later requests wait for unlock. `session.unlock()`, called from a click, opens the unlock window and keeps your grant. A CosmJS signer from the session asks for the unlock by itself when the user signs.

## Detect the extension

```ts
import { getZunia, isZuniaInstalled } from "@zunialab/sdk-web";

isZuniaInstalled(); // synchronous, current window only
const provider = await getZunia(); // waits for `zunia#initialized`, or undefined
```

`getZunia({ preferAlias: true })` also accepts `window.keplr`, but only when that object says it is Zunia (`isZunia`, from extension 0.1.5). Another wallet's `window.keplr` is never taken for Zunia. Prefer `window.zunia`.

With the default `prefer: "auto"`, when nothing can connect, `connect` opens the install page unless you pass `openInstallIfMissing: false`, and throws `NOT_INSTALLED`. With `prefer: "extension"` it throws `NOT_INSTALLED` without opening anything.

## Approve, then use

`enable` / `connect` is the only call that should open a window for a first visit. After that:

| Call | Window? |
|------|---------|
| `getConnectedChains()` | Never |
| `getKey`, `getAccounts` | Only to unlock a locked wallet. Without a grant they fail with `NOT_CONNECTED`. |
| `signIn`, `signAmino`, `signDirect`, `signArbitrary` | Always, so the user can read the request |
| `experimentalSuggestChain` | Only when the chain is unknown |

On Chrome the first connect can appear as an in-page card. Firefox and Safari have no way to know the card is visible, so they answer from the toolbar icon. On Safari iOS, if the popup cannot open, the same screen opens in a tab and closes itself after the last answer.

## Sign and broadcast

```ts
import { SigningStargateClient } from "@cosmjs/stargate";

const messages = [
  {
    typeUrl: "/cosmos.bank.v1beta1.MsgSend",
    value: { fromAddress: account.address, toAddress: recipient, amount: [{ denom: "uatom", amount: "1000" }] },
  },
];
const signer = session.getOfflineSignerFor("cosmoshub-4", { messages, memo });
const client = await SigningStargateClient.connectWithSigner(rpc, signer);
await client.signAndBroadcast(account.address, messages, "auto", memo);
```

CosmJS signs Direct whenever its signer can. `getOfflineSignerFor` hands it the signer the connected Zunia build can sign these messages with. Zunia 0.1.4 and older refuse a Direct contract call to a 32-byte contract, or a send to a 32-byte address, so for those it returns the Amino-only signer. From 0.1.5, and on other transports, it returns the full signer. `session.capabilities` says what the connected extension can sign (`null` on other transports).

On those older builds, an Amino signature over `&`, `<` or `>` that the chain would refuse is stopped before anything is broadcast: `UNSUPPORTED` with `reason: "amino-escaping"`.

`getOfflineSigner` (Direct and Amino), `getOfflineSignerOnlyAmino`, `signAmino`, `signDirect` and `signArbitrary` are also on the session. The extension never broadcasts a dApp transaction (`sendTx` is `UNSUPPORTED`).

## Raw `window.zunia`

You can call the provider without the SDK. See [the provider API](../reference/provider.md). The SDK is the path that restores sessions, normalizes results and listens for events the same way on every transport.
