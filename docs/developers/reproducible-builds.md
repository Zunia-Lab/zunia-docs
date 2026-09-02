---
sidebar_position: 1
title: Reproducible builds
---

# Reproducible builds

Zunia aims for **bit-for-bit verifiable** wallet artifacts so users and auditors can rebuild what they install.

## Kernel (`zunia-core`)

The signing kernel ships npm WASM, native mobile libraries, and Dart FFI bindings. Release process, tags, checksums, and consumer update PRs are documented in:

**[zunia-core/RELEASING.md](https://github.com/Zunia-Lab/zunia-core/blob/main/RELEASING.md)**

Verify release artifacts against `SHA256SUMS` (and GPG signatures when the release key is published).

## Browser extension

Extension packaging must be rebuildable from a signed git tag. See the extension supply-chain notes in the workspace (`.github` / `zunia-extension/docs/reproducible-builds.md`) once published. Until then, treat store builds as **not yet claimable as reproducible**.

## What is not claimed yet

- App Store / Play Store binaries are **not** asserted reproducible until the release pipeline and public instructions are complete.
- Do not treat draft docs or local `pnpm build` output as an audited release.
