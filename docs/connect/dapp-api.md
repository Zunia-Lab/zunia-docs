# dApp provider API

Zunia implements the standard Cosmos wallet interface so existing dApp integrations work with minimal changes.

## Extension

Config (CSP, host permissions, `externally_connectable`, injection matches) lives in [`zunia-extension/config/connect.ts`](https://github.com/Zunia-Lab/zunia-extension/blob/main/config/connect.ts) and `wxt.config.ts`. The in-page provider is **not implemented yet**.

Planned surface:

```typescript
await window.zunia.enable(chainId);
const offlineSigner = window.zunia.getOfflineSigner(chainId);
const accounts = await offlineSigner.getAccounts();
```

Optional Keplr-compatible alias (`window.keplr`) can be enabled via `exposeKeplrAlias` in connect config for legacy dApps.

### Security defaults (configured)

- Per-origin prompt before `enable` / account exposure
- Extension page CSP: `script-src 'self'; object-src 'self'; frame-ancestors 'none'`
- Content scripts only on `https://*/*` plus localhost
- First-party origins for `externally_connectable`: `zuniawallet.com` and localhost
- Provider injection intended for MAIN world via a web-accessible script (isolated content script + bridge)

## Mobile

The same Cosmos methods arrive over WalletConnect when a dApp connects to the mobile wallet. See [WalletConnect](./walletconnect).

## Permissions

Zunia asks per site before exposing accounts. You can revoke access anytime in Settings → Connected sites.

See [zunia-extension](https://github.com/Zunia-Lab/zunia-extension) for the full API surface once implemented.

For packages and install snippets, see [Integration SDK](./sdk).
