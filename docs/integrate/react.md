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
  // apiBase: "https://relay.example.com", // only when you run a relay
};

export function Wallet() {
  const zunia = useZuniaSession({ restore: options });

  if (zunia.restoring) return null;
  if (zunia.connected) {
    return (
      <>
        <p>{zunia.accounts[0]?.address}</p>
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
| `error` | Last `ZuniaConnectError`. |
| `connected`, `connecting`, `restoring` | Shortcuts. |
| `connect`, `disconnect`, `restore`, `signIn` | Actions. |
| `session` | The underlying session (`getOfflineSigner`, `on`, …). |

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
- `ConnectPairingModal`: QR code, then the 6-digit check. On a phone it also offers a link that opens the Zunia app. Cancel should call `disconnect()`.
- `ZuniaQrCode`: SVG, rendered locally.
- `ZuniaMark`: the logo.
- `useZunia()`: detects `window.zunia` only.
