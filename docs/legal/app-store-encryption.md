---
title: App Store encryption declaration
---

# App Store encryption declaration checklist

Use when submitting iOS / macOS builds. **Confirm with counsel**; this is an engineering checklist, not legal advice.

## Typical Zunia facts (draft)

- [ ] App uses encryption for HTTPS / TLS to backends and RPCs
- [ ] App uses standard OS crypto (Keychain / Secure Enclave / Keystore) for key material at rest
- [ ] App implements wallet cryptography (signing) using approved algorithms (e.g. secp256k1) in `zunia-core`
- [ ] App does **not** implement custom proprietary encryption protocols beyond standard TLS + documented wallet crypto
- [ ] Export compliance / EAR questions answered consistently with Apple's "encryption" questionnaire
- [ ] If only exempt encryption (HTTPS + OS crypto), document whether annual self-classification / EAR exemption applies in your jurisdiction
- [ ] Privacy nutrition labels match [Privacy Policy draft](./privacy.md)
- [ ] No seed phrases transmitted off device

## References

- Apple: Export compliance / encryption documentation in App Store Connect
- Internal: [key management](https://github.com/Zunia-Lab/zunia-infra/blob/main/docs/security/key-management.md) (when published)
