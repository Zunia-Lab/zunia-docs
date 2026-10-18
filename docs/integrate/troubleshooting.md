---
title: Troubleshooting
description: "Fixes for integration problems: NOT_INSTALLED, missing connect window, LOCKED, ORIGIN_MISMATCH, QR pairing and phone issues, too-large and queue-full, SESSION_EXPIRED, WalletConnect and window.keplr in Zunia mobile, CosmJS, UNSUPPORTED."
---

# Troubleshooting

## `NOT_INSTALLED`

The extension is not in this browser, or the content script is not allowed on your origin.

- Install Zunia from the [Chrome Web Store](https://chromewebstore.google.com/detail/zunia/ngokakoekdogobjmokipglbcclelgajk), or load a production build (`pnpm build:chrome`, then the unpacked `.output/chrome-mv3`).
- On Safari, allow Zunia on the site. On iPhone and iPad: Settings, Apps, Safari, Extensions, Zunia, **Other Websites**: Allow. On a Mac: Safari Settings, Extensions, Zunia, **Always Allow on Every Website**, with Other Websites set to Allow. The provider only appears on sites Safari allows.
- On Firefox, if the user withdrew host access in `about:addons`, the provider disappears.

## The connect window never appears (Firefox, Safari)

That is expected. Those browsers answer connect from the **toolbar icon**. On Safari iOS, if `action.openPopup()` fails, the same screen opens in a tab.

## `LOCKED`

The wallet stayed locked: the user closed the unlock window, or nobody unlocked it in time. Do not open a second connect prompt. `restore` after a reload reports `locked` without a window. Offer a button that calls `session.unlock()` (`unlock` on `useZuniaSession`): it opens the unlock window and keeps your site's grant.

## `ORIGIN_MISMATCH` on sign-in

The message named a different host than the page that asked. `session.signIn()` fills `location.host` for you. Do not build the message yourself unless you also pass it through `checkSignInBinding`.

On QR pairing, the phone compares the message to the **verified origin**, not to your metadata URL.

## Sign-in says "The wallet returned no signature"

You are talking to an old extension build that wrapped `signArbitrary` in an extra object. Current builds return the bare `StdSignature`, which is what Keplr, cosmos-kit, graz and the SDK expect. Update or rebuild the extension.

## Events never arrive on Safari

Safari drops `tabs.sendMessage` from the worker. Current builds send events over a port the content script opens. Rebuild from a revision that includes `lib/event-port.ts`. A backgrounded Safari tab reconnects when it becomes visible and replays what it missed.

## QR pairing never completes

- `apiBase` must be a relay the phone trusts: `https://api.zunialab.com`.
- The phone refuses a QR whose relay is not on its trusted list. Debug builds also accept relays on the same machine or local network.
- Compare the 6-digit codes. If they differ, throw the session away.
- Unscanned rooms die after 10 minutes.
- On the phone itself, the user taps **Open the Zunia app** rather than scanning. If nothing opens, Zunia is not installed, or the browser wants a fresh tap: keep a button that calls `session.openWallet()`.

## The phone does not show the request

Over QR pairing, the relay keeps a request for up to 10 minutes while Zunia is offline, and hands it over when Zunia reconnects. When the user paired from the same phone, the SDK opens Zunia for each signing request (sdk-web 0.2.0 and later). On a computer, ask the user to open Zunia on their phone. See [Use Zunia mobile from another app](./app-to-app.md).

## `INVALID_PARAMS` with `reason: "too-large"`

The request is over the relay's 512 KiB frame limit once encrypted, so the SDK did not send it. Split the transaction, or move large data out of the memo or the message.

## `NETWORK` with `reason: "queue-full"`

The phone has been offline while requests piled up: the relay holds at most 32 frames (1 MiB) for it, for 10 minutes. Ask the user to open Zunia, then try again.

## `SESSION_EXPIRED`

The relay forgot the room (restart without Postgres, or the 24-hour TTL). Call `connect` again.

## WalletConnect never reaches Zunia mobile

Zunia mobile answers WalletConnect only in builds made with a WalletConnect project id. Other builds tell the user "This build of Zunia does not have WalletConnect turned on", and your request ends in `TIMEOUT`. Offer QR pairing, which every build supports. See [WalletConnect](./walletconnect.md#zunia-mobile-as-a-walletconnect-wallet).

## Your site does not find a wallet in Zunia mobile's browser

Zunia mobile's in-app browser injects `window.zunia` only. `window.keplr` appears only when the user turns on **Keplr compatibility** (**Settings** → **Connected sites**), and there is no `keplr#initialized` event or global `window.getOfflineSigner`. Look for `window.zunia` (or use `getZunia()`), and wait for `zunia#initialized`. See [`window.zunia` in Zunia mobile](../reference/provider.md#zunia-mobile).

## CosmJS cannot sign

Public keys must be real `Uint8Array`s. The WalletConnect transport fetches them with `cosmos_getAccounts`. If you roll your own WC client and leave pubkeys empty, CosmJS will fail.

## `sendTx` is `UNSUPPORTED`

By design. Sign with `signAmino` / `signDirect` and broadcast from the dApp.

## `UNSUPPORTED` on a contract call or a memo with `&`

Check `error.reason`:

- `blind-signing`: the extension could not decode the transaction, so it refused it without a prompt. Zunia 0.1.4 and older do this for a Direct contract call to a 32-byte contract. Hand CosmJS `session.getOfflineSignerFor(chainId, { messages, memo })` instead of `getOfflineSigner`, or ask the user to update Zunia.
- `amino-escaping`: Zunia 0.1.4 or older signed `&`, `<` or `>` in a way the chain refuses. The SDK stopped it before broadcast. Ask the user to update Zunia, or remove those characters from the memo.

`explainZuniaError(error)` gives a title and a next step for any error.

## Live balances stay off in Safari

Safari never prompts for `https://*/*`. On iPhone and iPad, the user allows it under Settings, Apps, Safari, Extensions, Zunia, Other Websites, Allow. On a Mac: Safari Settings, Extensions, Zunia, **Always Allow on Every Website**, with Other Websites set to Allow. The wallet says so when the switch is flipped.

## Packages 404 on npm

`@zunialab/sdk-web`, `@zunialab/sdk-react`, `@zunialab/sdk-core` and `@zunialab/interchain` are public. A 404 means the name or version does not match, or the install is using a registry other than `registry.npmjs.org`. See the [quickstart](../get-started/quickstart.md).
