---
title: Install the extension
---

# Install the extension

The extension is not in the Chrome Web Store, Edge Add-ons, Firefox AMO or the App Store. Load a build you made.

```bash
git clone https://github.com/Zunia-Lab/zunia-extension.git
cd zunia-extension
pnpm install
pnpm build
```

| Browser | Load |
|---------|------|
| Chrome, Brave, Opera | `chrome://extensions` → Developer mode → Load unpacked → `.output/chrome-mv3` |
| Edge | `edge://extensions` → the same, or `.output/edge-mv3` |
| Firefox | `about:debugging#/runtime/this-firefox` → Load Temporary Add-on → `.output/firefox-mv3/manifest.json` |
| Safari (macOS) | `pnpm safari:build`, run the macOS scheme in Xcode, then in Safari: Develop → Developer Settings → **Allow unsigned extensions**, enable Zunia, allow it on all websites |
| Safari (iOS Simulator) | `pnpm safari:build`, run the iOS scheme, then Settings → Apps → Safari → Extensions → Zunia, allow on all websites |

`pnpm dev` rebuilds Chrome while you edit. Requirements: Node 20+ and pnpm 9.15.

On first open you get **Welcome**, then **Create wallet** or **Import wallet**. Write the recovery phrase down offline. Zunia cannot restore it.

## Daily use

The toolbar icon opens the popup (a sheet on iPhone). The home screen has **Send**, **Receive**, **Swap** and **Stake**. The header opens the account switcher. The menu (☰) holds:

- **Manage networks**
- **NFTs**
- **Governance**
- **Notifications**
- **Address book**
- **Connected dApps** (revoke a site or a chain)
- **Settings & security** (accounts, networks, phrase, password, preferences)
- **Lock wallet**

**Settings & security** is also where you turn the Keplr-compatible alias on or off.

## Browser notes

- **Firefox and Safari:** a dApp connect request waits in this popup. Click the toolbar icon.
- **Safari on iPhone:** if the popup cannot open, the request opens in a tab. Inputs are 16px so Safari does not zoom. Approve / Reject sit under the content so they stay in the half-height sheet.
- **Safari website access:** Settings → Apps → Safari → Extensions → Zunia → Other Websites → Allow. Without that, sites do not see `window.zunia`, and live balances stay off.
- Auto-lock counts time without input. Opening the popup resets it. Closing the browser clears the unlocked session.

More detail: [browsers.md](https://github.com/Zunia-Lab/zunia-extension/blob/main/docs/browsers.md) in the extension repo.
