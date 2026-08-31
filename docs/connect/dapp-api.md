# dApp provider API

Zunia implements the standard Cosmos wallet interface so existing dApp integrations work with minimal changes.

## Extension

```typescript
await window.zunia.enable();
const offlineSigner = await window.zunia.getOfflineSigner(chainId);
```

## Mobile

The same calls arrive over WalletConnect when a dApp connects to the mobile wallet.

## Permissions

Zunia asks per site before exposing accounts. You can revoke access anytime in Settings → Connected sites.

See [zunia-extension](https://github.com/Zunia-Lab/zunia-extension) for the full API surface.
