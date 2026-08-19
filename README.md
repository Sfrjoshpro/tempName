# tempName

> Temporary project name while we choose the final brand.

A developer-first coding environment that keeps the speed of AI-assisted development without removing the thinking, exploration, and learning that make someone a better programmer.

## Goal

Help developers move faster while still understanding and owning the code they build.

The experience should span the full continuum:

- classic/manual coding
- enhanced IntelliSense and project discovery
- syntax and contextual help
- partial/mechanical completion
- local-model explanation and review
- optional cloud reasoning
- explicit vibe/agent workflows

The system should prefer deterministic project knowledge first, local intelligence when it is sufficient, and cloud intelligence only when it meaningfully improves the answer.

## First milestone

Python + VS Code, with no LLM required.

Open a Python project, place the cursor on a symbol, and quickly surface factual project intelligence such as what the symbol is, where it comes from, and eventually where/how it is used.

Current scaffold includes:

- `extension/` — minimal VS Code extension and inspect-symbol command
- `engine/` — Python-first local intelligence engine
- `engine/src/project_intel/` — initial AST-based symbol indexing
- `engine/tests/` — initial engine tests
- `docs/philosophy.md` — product principles
- `docs/architecture.md` — initial system architecture

## Design rule

**The system may automatically use less intelligence than requested when deterministic tooling can answer reliably. It must not silently escalate into more generative behavior.**

AI should reduce friction around coding, not require the developer to surrender control of the thought process.

## Status

Early architecture/proof-of-concept. The project name and public API are intentionally not stable yet.
