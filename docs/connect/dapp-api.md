# dApp provider API

Zunia implements the standard Cosmos wallet interface so existing dApp integrations work with minimal changes.

## Extension

Config (CSP, host permissions, `externally_connectable`, injection matches) lives in [`zunia-extension/config/connect.ts`](https://github.com/Zunia-Lab/zunia-extension/blob/main/config/connect.ts) and `wxt.config.ts`. The in-page provider is injected as `window.zunia` (optional `window.keplr` alias).

```typescript
import { enableZunia, getZunia } from "@zunialab/sdk-web";

const zunia = await enableZunia("cosmoshub-4");
const key = await zunia.getKey("cosmoshub-4");
const signer = zunia.getOfflineSigner("cosmoshub-4");
```

Supported methods: `enable`, `disable`, `getKey`, `getAccounts`, `signAmino`, `signDirect`, `signArbitrary`, `verifyArbitrary`, `experimentalSuggestChain`, chain info helpers. `sendTx` is intentionally unsupported — dApps broadcast signed txs themselves.

Optional Keplr-compatible alias (`window.keplr`) can be enabled via `exposeKeplrAlias` in connect config for legacy dApps.

### Security defaults

- Per-origin prompt before `enable` / account exposure
- Extension page CSP: `script-src 'self'; object-src 'self'; frame-ancestors 'none'`
- Content scripts only on `https://*/*` plus localhost
- First-party origins for `externally_connectable`: `zunialab.com` and localhost
- Provider injection in MAIN world via web-accessible script (isolated content script + MessageChannel bridge)

## Mobile

Cosmos methods arrive over:

1. **Zunia-native WebSocket** (`zunia.connect.v1`) — first-party “Connect with Zunia” (see [Native WebSocket](./native-ws))
2. **WalletConnect v2** — ecosystem interop (see [WalletConnect](./walletconnect))

## Permissions

Zunia asks per site before exposing accounts. Revoke access anytime in Settings → Connected sites.

For packages and install snippets, see [Integration SDK](./sdk).
