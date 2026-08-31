# Architecture decisions

Product and security ADRs for Zunia.

| ADR | Topic | Status |
|-----|-------|--------|
| [Core 0003](https://github.com/Zunia-Lab/zunia-core/blob/main/docs/adr/0003-custody-model.md) | Custody model | **Accepted: self-custody only** |
| [Indexer 0001](https://github.com/Zunia-Lab/zunia-indexer/blob/main/docs/adr/0001-user-scoped-tx-history.md) | Tx history | **Accepted: user-scoped LCD** (first 5, cap 50) |
| [Indexer 0002](https://github.com/Zunia-Lab/zunia-indexer/blob/main/docs/adr/0002-realtime-subscribed-txs.md) | Realtime detect/queue | **Accepted** |
| [Indexer 0003](https://github.com/Zunia-Lab/zunia-indexer/blob/main/docs/adr/0003-realtime-worker-host.md) | Worker host | **Accepted: container (Fly/Railway/Render), not Vercel serverless** |
| Core 0002 | Kernel language (Rust vs TS) | Proposed |
| Core 0004 | Cosmos client libs | Proposed |

## Indexer

Hono + Zod + Postgres (`DATABASE_URL`) for durable history; realtime WS on always-on worker via `zunia-infra`. See [zunia-indexer](https://github.com/Zunia-Lab/zunia-indexer).

## Infra

[`zunia-infra`](https://github.com/Zunia-Lab/zunia-infra) = Pulumi for workers/DNS — not a second Terraform stack; registry keeps its own Pulumi.
