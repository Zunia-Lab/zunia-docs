---
title: Troubleshooting
---

# Troubleshooting

## `NOT_INSTALLED`

The extension is not in this browser, or the content script is not allowed on your origin.

- Load a production build (`pnpm build:chrome` then the unpacked `.output/chrome-mv3`), not only a stale `dist/`.
- On Safari, enable Zunia under Settings, Apps, Safari, Extensions, and set **Other Websites** to Allow. The provider only appears on sites Safari allows.
- On Firefox, if the user withdrew host access in `about:addons`, the provider disappears.

## The connect window never appears (Firefox, Safari)

That is expected. Those browsers answer connect from the **toolbar icon**. On Safari iOS, if `action.openPopup()` fails, the same screen opens in a tab.

## `LOCKED`

The wallet is locked. Ask the user to unlock. Do not open a second connect prompt. `restore` after a reload reports `locked` without a window.

## `ORIGIN_MISMATCH` on sign-in

The message named a different host than the page that asked. `session.signIn()` fills `location.host` for you. Do not build the message yourself unless you also pass it through `checkSignInBinding`.

On QR pairing, the phone compares the message to the **verified origin**, not to your metadata URL.

## Sign-in says "The wallet returned no signature"

You are talking to an old extension build that wrapped `signArbitrary` in an extra object. Current builds return the bare `StdSignature`, which is what Keplr, cosmos-kit, graz and the SDK expect. Rebuild the extension.

## Events never arrive on Safari

Safari drops `tabs.sendMessage` from the worker. Current builds send events over a port the content script opens. Rebuild from a revision that includes `lib/event-port.ts`. A backgrounded Safari tab reconnects when it becomes visible and replays what it missed.

## QR pairing never completes

- `apiBase` must be a relay you actually run. There is no public Zunia relay.
- The phone refuses a QR whose relay is not on its trusted list. Debug builds accept localhost.
- Compare the 6-digit codes. If they differ, throw the session away.
- Unscanned rooms die after 10 minutes.

## `SESSION_EXPIRED`

The relay forgot the room (restart without Postgres, or the 24-hour TTL). Call `connect` again.

## CosmJS cannot sign

Public keys must be real `Uint8Array`s. The WalletConnect transport fetches them with `cosmos_getAccounts`. If you roll your own WC client and leave pubkeys empty, CosmJS will fail.

## `sendTx` is `UNSUPPORTED`

By design. Sign with `signAmino` / `signDirect` and broadcast from the dApp.

## Live balances stay off in Safari

Safari never prompts for `https://*/*`. The user allows it under Settings, Apps, Safari, Extensions, Zunia, Other Websites, Allow. The wallet says so when the switch is flipped.

## Packages 404 on npm

`@zunialab/sdk-web`, `@zunialab/sdk-react`, `@zunialab/sdk-core` and `@zunialab/interchain` are public at 0.1.0. A 404 means the name or version does not match, or the install is using a registry other than `registry.npmjs.org`. See the [quickstart](../get-started/quickstart.md).
