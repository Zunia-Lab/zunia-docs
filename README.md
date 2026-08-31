# zunia-docs

> Product documentation for Zunia at [docs.zuniawallet.com](https://docs.zuniawallet.com).

[![License](https://img.shields.io/github/license/Zunia-Lab/zunia-docs)](LICENSE)
[![Website](https://img.shields.io/badge/website-zuniawallet.com-2050C4)](https://zuniawallet.com)

## Overview

Docusaurus site covering install guides, wallet basics, IBC, dApp API, chain registry, security, and brand assets.

## Status

In development.

## Related repositories

| Repository | Description |
|------------|-------------|
| [zunia-website](https://github.com/Zunia-Lab/zunia-website) | Marketing site |
| [zunia-extension](https://github.com/Zunia-Lab/zunia-extension) | Browser extension |
| [zunia-mobile](https://github.com/Zunia-Lab/zunia-mobile) | Mobile wallet |
| [zunia-chain-registry](https://github.com/Zunia-Lab/zunia-chain-registry) | Chain metadata |
| [zunia-brand](https://github.com/Zunia-Lab/zunia-brand) | Brand assets |

## Quick start

```bash
npm install
npm start
```

## Development

Edit Markdown under `docs/`. Sidebar is defined in `sidebars.ts`. Theme colors live in `src/css/custom.css`.

| Command | Description |
|---------|-------------|
| `npm start` | Local docs server |
| `npm run build` | Static production build |
| `npm run serve` | Serve the build locally |

## Deployment

Deploy the static `build/` output to Vercel (or similar) and attach `docs.zuniawallet.com`. See workspace [DEPLOY.md](../DEPLOY.md).

## Contributing

See [CONTRIBUTING.md](https://github.com/Zunia-Lab/.github/blob/main/CONTRIBUTING.md).

## Security

See [SECURITY.md](https://github.com/Zunia-Lab/.github/blob/main/SECURITY.md).

## License

Apache-2.0. See [LICENSE](LICENSE).
