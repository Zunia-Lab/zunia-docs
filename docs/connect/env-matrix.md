# Connect environment matrix

| Variable | Where | Dev example | Prod |
|----------|-------|-------------|------|
| `CONNECT_WS_PUBLIC_URL` | zunia-backend | `ws://localhost:8788` | `wss://api.zunialab.com` |
| `ZUNIA_CONNECT_API_BASE` / `NEXT_PUBLIC_ZUNIA_CONNECT_API_BASE` | mobile / dashboard / SDK | `http://localhost:8788` | `https://api.zunialab.com` |
| `WALLETCONNECT_PROJECT_ID` / `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` / `WXT_WALLETCONNECT_PROJECT_ID` | mobile / dashboard / extension | Cloud project id | same id across apps |
| `INDEXER_URL` | dashboard BFF | `http://127.0.0.1:8787` | internal URL |
| `BACKEND_URL` | dashboard BFF | `http://127.0.0.1:8788` | internal URL |

## Security notes

- Native WS broker relays only; never send mnemonics or private keys over the wire.
- Pairing rooms bind to a random `pairingSecret`; origin metadata is shown in the wallet approve UI.
- Extension provider refuses `sendTx`; dApps must broadcast signed txs themselves.
- Universal Links: replace `TEAMID` in AASA and Play SHA-256 in `assetlinks.json` before store release.
