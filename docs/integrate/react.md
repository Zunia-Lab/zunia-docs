---
title: React
---

# React

`@zunialab/sdk-react` is a thin layer on `@zunialab/sdk-web`. Components are client components (`"use client"`), so they work in the Next.js App Router.

```bash
pnpm add @zunialab/sdk-react @zunialab/sdk-web
```

## One hook

```tsx
import { ConnectPairingModal, ConnectWithZuniaButton, useZuniaSession } from "@zunialab/sdk-react";

const options = {
  chains: ["cosmoshub-4"],
  apiBase: "https://api.zunialab.com", // QR pairing with Zunia mobile; leave out to offer the extension only
};

export function Wallet() {
  const zunia = useZuniaSession({ restore: options });

  if (zunia.restoring) return null;
  if (zunia.connected) {
    return (
      <>
        <p>{zunia.accounts[0]?.address}</p>
        {zunia.locked && <button onClick={() => zunia.unlock().catch(() => {})}>Unlock Zunia</button>}
        <button onClick={() => zunia.disconnect()}>Disconnect</button>
      </>
    );
  }

  return (
    <>
      <ConnectWithZuniaButton
        loading={zunia.connecting}
        onClick={() => zunia.connect(options).catch(() => {})}
      />
      <ConnectPairingModal
        open={zunia.status === "awaiting_wallet"}
        onOpenChange={(open) => !open && zunia.disconnect()}
        status={zunia.status}
        pairing={zunia.pairing}
        verificationCode={zunia.verificationCode}
        error={zunia.error}
      />
    </>
  );
}
```

The hook re-renders when the wallet switches accounts, locks, unlocks or revokes your site.

| Field | |
|-------|--|
| `status`, `transport` | See [events](./events.md). |
| `accounts`, `chains` | What your site may use right now. |
| `pairing`, `verificationCode` | For the QR dialog. |
| `error` | Last `ZuniaConnectError`. `explainZuniaError(error)` puts it in words for your UI. |
| `connected`, `locked`, `connecting`, `restoring` | Shortcuts. `connected` stays true while `locked`. After a restore that found the wallet locked, `accounts` is empty until the user unlocks. |
| `connect`, `disconnect`, `restore`, `unlock`, `signIn` | Actions. `unlock` opens the wallet's unlock window and keeps your site's grant: call it from a click. |
| `session` | The underlying session (`getOfflineSignerFor`, `on`, …). |

Call the hook once near the root, or create `const session = createZuniaSession()` at module scope and pass `{ session }` to every caller.

## Sign in

```tsx
const onSignIn = async () => {
  const { nonce } = await (await fetch("/api/nonce", { method: "POST" })).json();
  const proof = await zunia.signIn({ nonce });
  await fetch("/api/verify", { method: "POST", body: JSON.stringify({ nonce, ...proof }) });
};
```

Verify on the server with `verifySignIn` from `@zunialab/sdk-core`.

## Components

- `ConnectWithZuniaButton`: official button. Opens the install page when `installed` is false and there is no `onClick`.
- `ConnectPairingModal`: QR code, then the 6-digit check. In a phone or tablet browser it leads with **Open the Zunia app**, which opens Zunia on the same phone and brings the user back; on a computer it shows only the QR code (`showAppLink` overrides). See [Use Zunia mobile from another app](./app-to-app.md). Cancel should call `disconnect()`.
- `ZuniaQrCode`: SVG, rendered locally.
- `ZuniaMark`: the logo.
- `useZunia()`: detects `window.zunia` only.
