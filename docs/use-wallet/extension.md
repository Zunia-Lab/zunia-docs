---
title: Install the extension
---

# Install the extension

On Chrome, install Zunia from the [Chrome Web Store](https://chromewebstore.google.com/detail/zunia/ngokakoekdogobjmokipglbcclelgajk).

Safari is in App Store review and Firefox is planned. Edge Add-ons has no listing. For those browsers, load a build you made. The extension links zunia-core (built to WebAssembly with Rust and `wasm-bindgen-cli`), zunia-ui and zunia-sdk from checkouts next to it, so build those first:

```bash
git clone https://github.com/Zunia-Lab/zunia-core
git clone https://github.com/Zunia-Lab/zunia-ui
git clone https://github.com/Zunia-Lab/zunia-sdk
git clone https://github.com/Zunia-Lab/zunia-extension

(cd zunia-core && ./scripts/build-wasm.sh)
(cd zunia-ui && pnpm install && pnpm --filter @zunialab/tokens build && pnpm --filter @zunialab/ui build)
(cd zunia-sdk && pnpm install && pnpm --filter @zunialab/interchain build)

cd zunia-extension
pnpm install
pnpm build
```

| Browser | Load |
|---------|------|
| Chrome, Brave, Opera | `chrome://extensions` → Developer mode → Load unpacked → `.output/chrome-mv3` |
| Edge | `edge://extensions` → the same, or `.output/edge-mv3` |
| Firefox 140+ | `about:debugging#/runtime/this-firefox` → Load Temporary Add-on → `.output/firefox-mv3/manifest.json` |
| Safari (macOS) | `pnpm safari:build`, run the macOS scheme in Xcode, then in Safari: Develop → Developer Settings → **Allow unsigned extensions**, enable Zunia, allow it on all websites |
| Safari (iOS Simulator) | `pnpm safari:build`, run the iOS scheme, then Settings → Apps → Safari → Extensions → Zunia, allow on all websites |

`pnpm dev` rebuilds Chrome while you edit. Requirements: Node 22 and pnpm 9 (`corepack enable`). See the [extension README](https://github.com/Zunia-Lab/zunia-extension) for the kernel toolchain.

On first open you get **Welcome**, then **Create wallet** or **Restore with phrase**. Write the recovery phrase down offline. Zunia cannot restore it.

## Daily use

The toolbar icon opens the popup (a sheet on iPhone). The bottom bar has **Home**, **Earn**, **Swap** and **Activity**. The home screen has **Send**, **Deposit**, **Swap** and **Stake**. The header opens the account switcher. The menu (☰) holds:

- **Manage networks**
- **NFTs**
- **Governance**
- **Notifications**
- **Address book**
- **Connected dApps** (revoke a site or a chain)
- **Settings & security** (accounts, networks, security, preferences, notifications)
- **Lock wallet**

**Settings & security** → **Security** is where you turn the Keplr-compatible alias (**Keplr alias**) on or off.

## Browser notes

- **Firefox and Safari:** a dApp connect request waits in this popup. Click the toolbar icon.
- **Safari on iPhone:** if the popup cannot open, the request opens in a tab. Inputs are 16px so Safari does not zoom. Approve / Reject sit under the content so they stay in the half-height sheet.
- **Safari website access:** on iPhone and iPad, Settings → Apps → Safari → Extensions → Zunia → Other Websites → Allow. On a Mac, Safari → Settings → Extensions → Zunia → Always Allow on Every Website, with Other Websites set to Allow. Without that, sites do not see `window.zunia`, and live balances stay off.
- Auto-lock counts time without input. Opening the popup resets it. Closing the browser clears the unlocked session.

More detail: [browsers.md](https://github.com/Zunia-Lab/zunia-extension/blob/main/docs/browsers.md) in the extension repo.
