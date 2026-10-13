---
title: Build with AI
description: Connect Claude, Cursor, VS Code or any MCP client to the Zunia docs and SDK, and the llms.txt files for everything else.
---

# Build with AI

Coding assistants can work from these docs in two ways: the Zunia MCP server, or plain-text files made for language models. Both are built from the docs each time the docs are published, so they say what this site says.

## MCP server

- **Hosted endpoint:** `https://docs.zunialab.com/mcp` (Streamable HTTP, no key).
- **npm package:** `@zunialab/mcp`, run over stdio with `npx -y @zunialab/mcp`.

The hosted endpoint needs no install. Use the npm package when your client only starts local servers.

### Claude Code

```bash
claude mcp add --transport http zunia https://docs.zunialab.com/mcp
```

### Claude Desktop and claude.ai

Add a custom connector with the URL `https://docs.zunialab.com/mcp`.

### Cursor

In `.cursor/mcp.json` (this project) or `~/.cursor/mcp.json` (every project):

```json
{
  "mcpServers": {
    "zunia": { "url": "https://docs.zunialab.com/mcp" }
  }
}
```

### VS Code

In `.vscode/mcp.json`:

```json
{
  "servers": {
    "zunia": { "type": "http", "url": "https://docs.zunialab.com/mcp" }
  }
}
```

### Clients that start a local server

```json
{
  "mcpServers": {
    "zunia": { "command": "npx", "args": ["-y", "@zunialab/mcp"] }
  }
}
```

### What it does

| Tool | What it does |
|------|--------------|
| `search_docs` | Searches these docs and returns the best sections with their links |
| `get_doc`, `list_docs` | Reads a page, or one section of it, and lists every page |
| `list_integrations`, `get_integration_guide` | The integration paths, each with its packages at their latest npm version and the install command |
| `get_sdk_packages` | The `@zunialab` packages, read from npm when you ask |
| `get_chain`, `check_address` | A chain's entry in the [Zunia chain registry](../chain-registry/overview.md), and whether an address belongs to a chain |
| `explain_error` | What an error code means and what to do next, from the SDK's `explainZuniaError` |
| `verify_sign_in` | Runs `verifySignIn` on a sign-in you captured and says which check fails |
| `ibc_denom`, `build_forward_memo` | Computes an IBC denom and builds a packet-forward memo with `@zunialab/interchain` |

Each docs page is also offered as a resource, and the `integrate_zunia` prompt plans an integration for the project you have open.

The server is read-only. It never signs, holds no keys and needs no account.

## llms.txt

| File | What it holds |
|------|---------------|
| [llms.txt](https://docs.zunialab.com/llms.txt) | Every page, with a one-line description |
| [llms-full.txt](https://docs.zunialab.com/llms-full.txt) | Every page in one file |
| `/docs/…/page.md` | Any page as Markdown: add `.md` to its address, for example [quickstart.md](https://docs.zunialab.com/docs/get-started/quickstart.md) |
| [docs-index.json](https://docs.zunialab.com/docs-index.json) | The same pages as JSON. The MCP server reads this file |

Store availability and other product facts are in the website's own [llms.txt](https://zunialab.com/llms.txt).

## Keep keys out of prompts

Never paste a recovery phrase or a private key into an assistant, a prompt or an MCP client. Integrating Zunia never needs one, and the wallet never shows its keys to a site.
