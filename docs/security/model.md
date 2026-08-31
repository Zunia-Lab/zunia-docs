# Security model

## Non-custodial

Zunia never receives your seed phrase, private keys, or signing material. Keys are encrypted at rest on your device.

## dApp and WalletConnect connections

Connection **policy** is configured before feature code lands:

- Extension: origin prompts, CSP, HTTPS-only content matches, first-party `externally_connectable`
- Mobile: HTTPS-only network security, ATS, Universal Links / App Links, strict WC namespaces, required tx preview

Do not ship with a shared WalletConnect project ID left empty or committed as a production secret in public forks without rotation.

## Transaction preview

Every signing request shows amount, fee, memo, and contract calls where applicable. Reject anything you do not understand.

## Supply chain

- Open source repositories under [zunialab](https://github.com/Zunia-Lab)
- Extension builds reproducible from tagged releases (when published)
- Chain metadata reviewed via PR on [zunia-chain-registry](https://github.com/Zunia-Lab/zunia-chain-registry)

## Report vulnerabilities

Email [hello@zuniawallet.com](mailto:hello@zuniawallet.com). Do not open public issues for security reports.

See [SECURITY.md](https://github.com/Zunia-Lab/.github/blob/main/SECURITY.md).
