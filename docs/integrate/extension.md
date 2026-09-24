---
title: Web dApp (extension)
---

# Connect from a web dApp

Use `@zunialab/sdk-web` when you are not on React, or when you want the session object yourself. The extension injects `window.zunia` on `https://` pages and on localhost.

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

`restore` does not prompt. It calls `getConnectedChains()` on the provider and, if your site is still granted, reattaches. If the wallet is locked, status becomes `locked` and later requests wait for unlock.

## Detect the extension

```ts
import { getZunia, isZuniaInstalled } from "@zunialab/sdk-web";

isZuniaInstalled(); // synchronous, current window only
const provider = await getZunia(); // waits for `zunia#initialized`, or undefined
```

`getZunia({ preferAlias: true })` will also accept `window.keplr` when the user turned on the Keplr-compatible alias. Prefer `window.zunia`.

If nothing is installed, `connect` opens the install page unless you pass `openInstallIfMissing: false`, and throws `NOT_INSTALLED`.

## Approve, then use

`enable` / `connect` is the only call that should open a window for a first visit. After that:

| Call | Window? |
|------|---------|
| `getConnectedChains()` | Never |
| `getKey`, `getAccounts` | Only if not yet granted |
| `signIn`, `signAmino`, `signDirect`, `signArbitrary` | Always, so the user can read the request |
| `experimentalSuggestChain` | Only when the chain is unknown |

On Chrome the first connect can appear as an in-page card. Firefox and Safari have no way to know the card is visible, so they answer from the toolbar icon. On Safari iOS, if the popup cannot open, the same screen opens in a tab and closes itself after the last answer.

## Sign and broadcast

```ts
import { SigningStargateClient } from "@cosmjs/stargate";

const signer = session.getOfflineSigner("cosmoshub-4");
const client = await SigningStargateClient.connectWithSigner(rpc, signer);
await client.sendTokens(account.address, recipient, [{ denom: "uatom", amount: "1000" }], "auto");
```

`getOfflineSignerOnlyAmino`, `signAmino`, `signDirect` and `signArbitrary` are also on the session. The extension never broadcasts a dApp transaction (`sendTx` is `UNSUPPORTED`).

## Raw `window.zunia`

You can call the provider without the SDK. See [the provider API](../reference/provider.md). The SDK is the path that restores sessions, normalizes results and listens for events the same way on every transport.
