---
title: GDPR data map
---

# GDPR data map (draft)

**Status: DRAFT.** Map systems before appointing a DPO / completing RoPA.

| Processing | Personal data | Lawful basis (draft) | Systems | Retention (draft) |
|------------|---------------|----------------------|---------|-------------------|
| Device binding | Bech32 address, pubkey, challenge metadata | Legitimate interest / contract | `zunia-backend` | Until revoke + short audit window |
| Push delivery | Push endpoint, device id | Consent (notification permission) | Backend + FCM/APNs/Web Push | Until unsubscribe |
| Tx history cache | Address, tx hashes, summaries | Legitimate interest (service) | `zunia-indexer` | Cap per wallet; TTL TBD |
| Support email | Email, message content | Consent / legitimate interest | Inbox | Ordinary business retention |
| Crash / Sentry | Device model, stack (scrubbed) | Legitimate interest | Sentry | Per Sentry project policy |
| Analytics | **Prefer none / privacy-preserving** | Consent if used | TBD | TBD |

## Cross-border

Hosting regions TBD (Fly/Railway/Vercel). Document SCCs when vendors process EU data.

## Data subject requests

Email hello@zunialab.com — process access / erasure for server-side records. On-device keys are user-controlled; erasure = uninstall / wipe device.
