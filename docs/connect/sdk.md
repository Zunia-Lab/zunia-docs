# Integration SDK

Official packages for connecting dApps to Zunia live in **[zunia-sdk](https://github.com/Zunia-Lab/zunia-sdk)**.

| Package | Use when |
|---------|----------|
| `@zunialab/sdk-web` | Browser dApp + Zunia extension (`window.zunia`) |
| `@zunialab/sdk-react` | React hooks around the web SDK |
| `@zunialab/sdk-core` | Shared types / WalletConnect constants |
| `zunia_sdk` (Flutter) | Mobile deep links / WC URI helpers |

## Web

```bash
pnpm add @zunialab/sdk-web
```

```ts
import { getZunia, enableZunia } from "@zunialab/sdk-web";

const zunia = await getZunia();
if (!zunia) {
  // Prompt install: https://zunialab.com
} else {
  await enableZunia("cosmoshub-4");
}
```

## Flutter

```yaml
dependencies:
  zunia_sdk:
    git:
      url: https://github.com/Zunia-Lab/zunia-sdk.git
      path: flutter/zunia_sdk
```

See also [dApp provider API](./dapp-api) and [WalletConnect](./walletconnect).
