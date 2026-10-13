# Architecture decisions

Product and security ADRs for Zunia.

| ADR | Topic | Status |
|-----|-------|--------|
| [Core 0003](https://github.com/Zunia-Lab/zunia-core/blob/main/docs/adr/0003-custody-model.md) | Custody model | **Accepted: self-custody only** |
| [Indexer 0001](https://github.com/Zunia-Lab/zunia-indexer/blob/main/docs/adr/0001-user-scoped-tx-history.md) | Tx history | **Accepted: user-scoped LCD** (first 5, cap 50) |
| [Indexer 0002](https://github.com/Zunia-Lab/zunia-indexer/blob/main/docs/adr/0002-realtime-subscribed-txs.md) | Realtime detect/queue | **Accepted** |
| [Indexer 0003](https://github.com/Zunia-Lab/zunia-indexer/blob/main/docs/adr/0003-realtime-worker-host.md) | Worker host | **Accepted: container (Fly/Railway/Render), not Vercel serverless** |
| [Core 0002](https://github.com/Zunia-Lab/zunia-core/blob/main/docs/adr/0002-wallet-kernel-language.md) | Kernel language | **Accepted: one Rust kernel** (WASM in the extension, FFI on mobile) |
| [Core 0004](https://github.com/Zunia-Lab/zunia-core/blob/main/docs/adr/0004-cosmos-client-libs.md) | Cosmos client libs | **Accepted: signing and encoding in Rust**, CosmJS for network I/O only |
| [Core 0005](https://github.com/Zunia-Lab/zunia-core/blob/main/docs/adr/0005-polyrepo-package-flow.md) | Polyrepo package flow | **Accepted: published, versioned packages** |

## Indexer

Hono + Zod + Postgres (`DATABASE_URL`) for durable history; realtime WS on always-on worker via `zunia-infra`. See [zunia-indexer](https://github.com/Zunia-Lab/zunia-indexer).

## Infra

[`zunia-infra`](https://github.com/Zunia-Lab/zunia-infra) holds production hosting: nginx and systemd on a Hetzner host, behind Cloudflare, plus shared DNS for `api.`, `link.` and `status.`. Its Pulumi code is still a stub. The chain registry keeps its own Pulumi stack.
