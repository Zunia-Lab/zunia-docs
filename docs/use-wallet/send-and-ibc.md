---
title: Send and IBC
---

# Send and IBC

Home → **Send**. Pick the token, the recipient and the amount. Same-chain sends stay on that network. If the recipient is on another catalog chain, the wallet builds an IBC transfer (including packet-forward when the route needs a hop).

The review screen shows:

- Source token and amount
- Destination chain and address
- Route (channels)
- Fee on the source chain
- Memo, if you set one

Sign on the device. The wallet broadcasts from the LCD you configured for that chain. Arrival time is whatever the relays take; Zunia does not run those.

**Receive** shows the current account's address and QR for the selected network. Check the prefix (`cosmos`, `osmo`, …) before you give it out.

**Address book** (menu) stores labels so you do not paste a raw bech32 every time.

**Swap** is a separate home action. It uses the same review + sign path. It needs the WASM kernel; if the kernel failed to load, Confirm stays disabled and the screen says why.

Do not paste a seed phrase into any website, including a future `wallet.zunialab.com` dashboard. That surface is watch-only by design and is not deployed.
