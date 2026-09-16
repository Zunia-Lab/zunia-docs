---
title: Privacy Policy
---

# Privacy Policy

**Status: DRAFT — not legal advice. Not in force until counsel review and publication.**

Last updated: 2026-08-31 (draft)

## Summary

Zunia is designed so **seed phrases and private keys never leave your device** and are never uploaded to Zunia servers. The web dashboard does not accept signing keys in the browser.

## Data we may process (when features ship)

| Category | Examples | Purpose |
|----------|----------|---------|
| Device / push | Web Push subscription endpoints, FCM tokens | Deliver tx / security alerts |
| Platform session | Address + ADR-36 device binding proof | Authorize push and light history |
| Usage (optional) | Crash reports with scrubbing | Reliability |
| Support | Email you send us | Respond to requests |

## What we do not collect by design

- Seed phrases, private keys, mnemonics
- Full wallet unlock passwords
- Unnecessary chain RPC traffic from the browser (dashboard proxies server-side)

## Retention / deletion

TBD — push tokens deleted on unsubscribe / device revoke; support mail per ordinary retention.

## GDPR / rights

See [GDPR data map](./gdpr-data-map.md). Contact: hello@zunialab.com
