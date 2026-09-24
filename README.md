<p align="center">
  <img src="https://raw.githubusercontent.com/Zunia-Lab/zunia-brand/main/png/icons/app/zunia-icon-256.png" alt="Zunia" width="96" />
</p>

# zunia-docs

> Product documentation for Zunia at [docs.zunialab.com](https://docs.zunialab.com).

[![License](https://img.shields.io/github/license/Zunia-Lab/zunia-docs)](LICENSE)
[![Website](https://img.shields.io/badge/website-zunialab.com-FF1B0C)](https://zunialab.com)

## What this site covers

How a dApp connects (JS SDK, sign-in, events, QR, WalletConnect), the `window.zunia` and protocol references, the security model, and how to use the extension and the phone. Legal drafts, brand and the chain registry sit at the bottom of the sidebar.

## Related repositories

| Repository | Description |
|------------|-------------|
| [zunia-website](https://github.com/Zunia-Lab/zunia-website) | Marketing site |
| [zunia-extension](https://github.com/Zunia-Lab/zunia-extension) | Browser extension |
| [zunia-mobile](https://github.com/Zunia-Lab/zunia-mobile) | Mobile wallet |
| [zunia-sdk](https://github.com/Zunia-Lab/zunia-sdk) | JavaScript SDKs |
| [zunia-backend](https://github.com/Zunia-Lab/zunia-backend) | Connect relay |
| [zunia-chain-registry](https://github.com/Zunia-Lab/zunia-chain-registry) | Chain metadata |
| [zunia-brand](https://github.com/Zunia-Lab/zunia-brand) | Brand assets |

## Quick start

```bash
pnpm install
pnpm start
```

Edit Markdown under `docs/`. The sidebar is `sidebars.ts`. Theme colors live in `src/css/custom.css`. A broken link fails `pnpm build`.

| Command | Description |
|---------|-------------|
| `pnpm start` | Local docs server |
| `pnpm build` | Static production build |
| `pnpm serve` | Serve the build locally |
| `pnpm typecheck` | TypeScript check |

## Deployment

```bash
pnpm build
vercel --prod
```

Attach `docs.zunialab.com` in the Vercel project. Workspace notes: [DEPLOY.md](../DEPLOY.md).

## Contributing

See [CONTRIBUTING.md](https://github.com/Zunia-Lab/.github/blob/main/CONTRIBUTING.md).

## Security

See [SECURITY.md](https://github.com/Zunia-Lab/.github/blob/main/SECURITY.md).

## License

Apache-2.0. See [LICENSE](LICENSE).
