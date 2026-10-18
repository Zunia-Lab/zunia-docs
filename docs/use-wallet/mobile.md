---
title: Zunia mobile
description: "Zunia mobile 0.1.0 for iPhone and Android (not on the App Store or Google Play yet): setup, tabs, send, swap (0.5%), staking, security, Zunia Connect, the in-app browser, WalletConnect, zunia:// links and payment requests, building it."
---

# Zunia mobile

Zunia mobile is the Zunia wallet for iPhone and Android. Version 0.1.0 matches the [browser extension](./extension.md) 0.1.5: it signs with the same Rust kernel, zunia-core 0.1.1, and a recovery phrase gives the same addresses in both. **Settings** → **About** shows the app version, the signing core and "Matches Zunia extension 0.1.5".

Zunia mobile 0.1.0 is not on the App Store or Google Play yet. Until it is, [build it yourself](#build-it-yourself). It runs on iOS 13 and later, and on Android 7.0 (API 24) and later.

## First run

1. Three welcome pages (your keys stay on this phone, every Cosmos chain in one place, connect to any dApp), then **Create a new wallet** or **I already have a wallet**.
2. **Create:** tick the two statements about the recovery phrase, reveal the words (12 or 24) and write them down, then pick the words Zunia asks for from your written copy. **Restore:** tick the same statements, then type or paste the 12 or 24 words. A numbered list pastes fine.
3. Name the account and set a password of at least 8 characters. There is no password reset: if you forget it, you remove the wallet and restore it from the phrase.
4. Choose the networks the wallet shows.
5. A restored phrase starts as **not verified**. Zunia offers to check your written copy now; **Security** → **Backup** does it later.
6. If the phone has Face ID, Touch ID or a fingerprint set up, Zunia offers to unlock with it.

## Find your way

The tab bar has **Wallet**, **Swap**, **Earn**, **Discover** and **Activity**. **Wallet** has **Send**, **Receive**, **Swap** and **Stake**. Its header switches accounts, scans a code, hides amounts, and opens the menu.

The menu slides in from the right:

- **Ecosystem** (the Discover tab), **Manage networks**, **Bridge**, **Collectibles**, **Governance**, **Activity**, **Rewards**, **Missions**.
- **Pair a device**, **Connected apps**, **Address book**, **Notifications**, **Settings & security**, **Help**.
- The theme: **Dark**, **Light** or **Auto**. Auto follows the phone, and is the default.

## What it does

- **Accounts.** Each account you add has its own recovery phrase, created or restored; one password unlocks them all. See [Keys and accounts](./keys.md).
- **Balances.** Every token on every network you turned on, each named by Zunia's verified token table (`USDC.n` for Noble's USDC, `USDC.axl` for Axelar's). Prices come from CoinGecko; SAF's from Coinstore's SAF/USDT market, marked "via Coinstore". Values show in USD, EUR, GBP, JPY or CHF.
- **Receive.** Your address and its QR code per network, with Copy and Share. **Request an amount** puts a token, an amount and a memo into the code as a [payment request](#payment-requests).
- **Send and IBC.** Any token, on the same chain or to another one. Zunia checks the route first: the channel is open, its far end points back, and the light clients at both ends are active. With no direct channel it forwards through up to 3 hops. See [Send and IBC](./send-and-ibc.md).
- **Swap.** Swaps through Osmosis, also from tokens on another chain. A swap made there carries Zunia's 0.5% commission, shown before you sign. See [Fees](./fees.md).
- **Earn.** Stake, unstake and claim rewards. See [Staking and governance](./staking.md).
- **Governance.** Proposals on your networks; vote **Yes**, **No**, **Veto** or **Abstain**.
- **Collectibles.** Your NFTs, and sending one.
- **Activity.** Your transactions. A transfer to another chain is followed until it lands, also after a restart, but only while the app is open.
- **Notifications.** A feed of approvals, tokens arriving, rewards to claim, unbonding and open proposals. See [Notifications](#notifications).
- **Address book.** Saved recipients: a name, an address, an optional network and a note, with favourites.
- **Networks.** Turn networks on or off, or add one from the registry or by hand. See [Networks](./networks.md).
- **Bridge.** A preview in 0.1.0: its **Review bridge** button stays off. Move tokens to another chain with **Send**.

Leave the memo empty and Zunia writes one, such as `Send USDC.n · by Zunia-wallet`. A memo is public and permanent on the chain.

## Settings

**Settings & security** in the menu opens **Settings**:

| Group | Rows |
|-------|------|
| Wallet | **Accounts**, **Networks**, **Address book** |
| Security | **Security** (lock, biometrics, password on every signature, change password, recovery phrase, backup, device, remove wallet), **Connected apps** (Zunia Connect and WalletConnect sessions), **Connected sites** (in-app browser permissions, blind signing, Keplr compatibility) |
| App | **Preferences** (theme, currency, hide amounts, live reads, NFT artwork), **Notifications** |
| About | Version, signing core, documentation, support, terms, privacy, open-source licences |

**Live reads** (on by default) ask each network's public endpoint for balances, staking, proposals and history, which tells that host your IP address and the addresses asked about. Turned off, Zunia asks no network anything; it still derives addresses and signs. **NFT artwork and details** is off by default: artwork comes from whatever host each NFT names.

## Security

- Each recovery phrase is sealed with your password by the kernel and kept in the iOS Keychain or Android's encrypted storage, on this phone only. Neither iCloud nor Android backup copies it.
- Zunia locks after the time you choose (10 minutes by default). Face ID, Touch ID or a fingerprint can unlock it, through a key in the phone's secure hardware.
- **Password on every signature** asks again before each transaction and each request from a site or app.
- Screenshots are blocked on the recovery phrase, unlock and password screens. A copied phrase is cleared after 30 seconds.
- Deleting the app on iPhone removes the wallet at the next install. Only the recovery phrases bring the accounts back.

[Keys and accounts](./keys.md) has the details, and the [security model](../security/model.md) the design.

## Connect a website: Zunia Connect

Zunia's own connection is **Zunia Connect**: a session through Zunia's relay at `api.zunialab.com`, encrypted between the site and the phone.

1. On the site, choose **Connect with Zunia**. It shows a QR code.
2. On the phone, open **Pair a device** in the menu (or the scan button) and scan it.
3. Check that the 6-digit code on the phone matches the site's.
4. Read the origin. **Verified origin** is the site the relay saw. If Zunia says "This site is not where it says", reject.
5. Approve the chains. Each signature then opens a review on the phone.

When the site is open on the phone itself, tap **Open the Zunia app** instead of scanning. Zunia opens, and once you answer it takes you back to the site. Each later signature brings Zunia up with the request on screen. When Zunia was already open and no link brought it up, it says "Done. You can go back to …" with a **Return** button instead of switching by itself.

A session lasts 24 hours. A request you leave unanswered expires after 5 minutes, and the site is told. **Connected apps** lists your sessions: when each was paired, from this phone or from a scanned code, where it returns to, and its chains. Turn a chain off there and the site loses it at once. **Disconnect** ends the session.

Zunia only pairs through relays it trusts, `wss://api.zunialab.com` by default. A code that names another relay is refused.

### Other apps on this phone

Another app can use Zunia as its wallet the same way: it opens Zunia with a link, you approve there, and Zunia takes you back to the app. An app is not a web page, so Zunia cannot confirm which site it speaks for: the review says "Origin not confirmed", and sign-in requests from it are refused. Developers: see [Use Zunia mobile from another app](../integrate/app-to-app.md).

## The in-app browser

**Discover** opens sites inside Zunia: a list of dApps, your bookmarks and recent sites, or any address you type. There a site sees Zunia as `window.zunia`, as it would see the extension on a computer. It asks to connect for the chains it names, and every signature opens a review.

- Only `https://` pages get the wallet (and `http://localhost` for developers).
- Each site is approved per network, and each approval lasts 7 days.
- A request waits at most 5 minutes for your answer, and at most 3 requests wait at once; more are refused.
- When the wallet is locked, Zunia asks you to unlock to answer the site.

**Settings** → **Connected sites** lists each site with its networks and the address it saw. Disconnect a site, one of its networks, or every site there. It also holds two switches, both off by default:

- **Blind signing**: approve messages Zunia cannot decode. Off, such a request is refused before any review opens.
- **Keplr compatibility**: also answer as `window.keplr`, for sites that only look for Keplr.

A `zunia://dapp?url=https://…` link opens a site in Discover after you confirm its address. Developers: see [`window.zunia`](../reference/provider.md#zunia-mobile).

## What the review shows

Every request, from the browser, Zunia Connect or WalletConnect, opens the same review. It names the kind of request and what approving does, counts down to its expiry, and shows the transaction as the kernel decoded it: a send as a headline, "Approve 2 messages" for several, every fee coin by name. It warns about a site whose address imitates another, a first-time recipient, and messages Zunia cannot decode. Details and the raw transaction fold out. A sign-in request reads **Sign in to** and the site's domain.

## WalletConnect

Zunia mobile 0.1.0 answers WalletConnect v2 (`cosmos_getAccounts`, `cosmos_signDirect`, `cosmos_signAmino`, `cosmos_signArbitrary`) only in builds that include a WalletConnect project id. A build without one says "This build of Zunia does not have WalletConnect turned on" when you scan or open a WalletConnect code. Zunia Connect needs no project id, and also shows the site's verified origin. See [WalletConnect](../integrate/walletconnect.md).

## Payment requests

**Receive** → **Request an amount** writes a code like:

```text
zunia://pay?chain=osmosis-1&to=osmo1…&denom=uosmo&amount=1500000&memo=Invoice%2042
```

Only `to` is required. `amount` is in base units of `denom`, the memo is at most 256 characters, and every value is percent-encoded. With nothing but an address, the code is the plain address, which any wallet reads.

Scanned or pasted in Zunia, a payment request opens **Send** with every field filled in for you to check. Nothing is signed from a scan alone. Opening a `zunia://pay` link from another app does nothing in 0.1.0.

## Codes and links

The scanner (**Pair a device**, or the scan button on **Wallet**) reads Zunia Connect and WalletConnect codes, wake links, `zunia://dapp` links, addresses (plain, `cosmos:…` or `{"address": …}` JSON) and payment requests. It has a light, and **Paste a link** for a link you copied.

These links open Zunia:

| Link | Does |
|------|------|
| `zunia://connect?v=2&…` | Pair with a site or app (Zunia Connect) |
| `zunia://connect/wake?sid=…` | Bring a paired session up and show what it sent |
| `wc:…`, `zunia://wc?uri=…`, `zuniamobile://wc?uri=…` | Pair over WalletConnect |
| `zunia://dapp?url=https://…` | Open a site in Discover, after you confirm the address |
| `https://zunialab.com/connect`, `/connect/wake`, `/wc` (also on `link.zunialab.com`) | The same, as Universal Links and App Links |

The `https://` forms do not open the app yet. They need an `apple-app-site-association` file with Zunia's Apple Team ID and an `assetlinks.json` file with its Play signing fingerprint on each host, and the ones in the zunialab.com site still hold placeholders. Use the `zunia://` links.

A link that arrives while Zunia is locked runs after you unlock. A wake link only reconnects the session, so its request is waiting when you unlock.

## Notifications

Zunia notifies you of approvals waiting, tokens arriving, staking rewards to claim, unbonding and open proposals. The defaults are the extension's: approvals always, transfers on, rewards once, unbonding and governance off. Rewards can remind you once, daily, weekly or never.

They are local notifications, raised by the app itself while it runs and the wallet is unlocked. Nothing is sent to a server for them, there is no push, and nothing arrives once the system has suspended Zunia. The feed catches up when you come back.

Zunia never asks for permission at launch. It asks when you turn **Device notifications** on (**Settings** → **Notifications**), or offers to after a stake or a claim. On iPhone they start as quiet deliveries to Notification Center, with no prompt, until you allow banners.

## Same phrase, two devices

Import the phrase on the second device. Each device holds its own encrypted copy. Losing every copy without the phrase means the accounts are gone.

## Not ready yet

- App Store and Google Play listings.
- WalletConnect in builds without a project id.
- Push notifications.
- Universal Links and App Links (the website files above).
- Bridge, and hardware wallets.

## Build it yourself

Build with a Flutter release that ships Dart 3.11.5 or later (the repo builds with Flutter 3.41).

The app links zunia-core and zunia-ui from checkouts next to it, and needs the signing kernel's native libraries from a [zunia-core release](https://github.com/Zunia-Lab/zunia-core/releases). `scripts/fetch-native.sh` downloads and checks them; it needs the GitHub CLI (`gh`).

```bash
git clone https://github.com/Zunia-Lab/zunia-core.git
git clone https://github.com/Zunia-Lab/zunia-ui.git
git clone https://github.com/Zunia-Lab/zunia-mobile.git
cd zunia-mobile
ZUNIA_CORE_TAG=<zunia-core release tag> ./scripts/fetch-native.sh
flutter pub get
flutter run
```

Release builds:

```bash
flutter build apk --release
flutter build appbundle --release
flutter build ipa --release   # needs an Apple team in Xcode
```

To turn WalletConnect on, pass your project id: `--dart-define=WALLETCONNECT_PROJECT_ID=<id>`. A build without the kernel's native libraries shows an error instead of the wallet; it never signs with other code.
