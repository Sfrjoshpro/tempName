# Upstream components

This directory records external open-source projects whose code or architecture tempName may depend on, adapt, or derive from.

## llama.vscode

Upstream: `ggml-org/llama.vscode`
License: MIT
Role under evaluation: VS Code/model infrastructure including local inference integration, FIM completion, partial completion acceptance, model lifecycle, and optional chat/agent surfaces.

### Boundary

tempName's Developer Intelligence engine is not derived from llama.vscode and must remain independently usable without an LLM.

Any source copied or substantially adapted from llama.vscode must be recorded here with its upstream path/version or commit and retain the notices required by the MIT license.

At ADR 0001 we are adopting the architecture decision only; no llama.vscode source has been vendored by this change.
