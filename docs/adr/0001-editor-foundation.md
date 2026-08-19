# ADR 0001: Editor foundation and AI infrastructure

Status: Accepted

## Context

tempName is not intended to be another autocomplete-first AI coder. Its core purpose is to help a developer understand and progress their own code while making stronger assistance available on demand.

The initial prototype proved that a VS Code extension can call the local Python intelligence engine and return structured symbol information. It also demonstrated that rebuilding editor plumbing is not where this project should spend most of its effort.

The open-source `ggml-org/llama.vscode` project already provides mature infrastructure around local inference, FIM completion, partial suggestion acceptance, model/runtime management, chat and agent workflows. It is MIT licensed.

## Decision

Keep tempName as an independent product and repository. Do not turn it into a GitHub fork of llama.vscode at this stage.

Use llama.vscode as an upstream/reference implementation and selectively integrate or adapt MIT-licensed infrastructure where doing so saves substantial editor or model-runtime work. Preserve upstream attribution and license notices for copied or substantially derived code.

Our product architecture has four layers:

1. **Developer Intelligence** — deterministic code/project/runtime understanding. This is the core product and should work without an LLM.
2. **Assistance Controller** — decides how much help the developer requested: discover, hint, complete, explain, or agent.
3. **Model Router** — chooses no model, a suitable local model, or an explicitly configured cloud model based on the task, privacy settings, capability and hardware.
4. **Editor Foundation** — VS Code integration plus selectively reused proven infrastructure for completions, model lifecycle and agent/chat surfaces.

## Product rule

The default interaction must help the developer think rather than silently replacing their thought process.

Deterministic editor/project intelligence should answer first when it can. Model inference is an escalation, not the default source of truth.

Assistance is progressive:

- **Discover**: show what exists and how it connects.
- **Hint**: provide the smallest useful next-step guidance.
- **Complete**: finish obvious/repetitive code, with partial acceptance supported.
- **Explain**: use deterministic context plus a model when useful.
- **Agent**: perform larger delegated work only when explicitly requested.

## Local-first model policy

Local inference is preferred when it is capable enough for the requested task. This provides privacy and avoids unnecessary cloud cost. Cloud models remain available for stronger reasoning or explicit full-agent/planning workflows when the user enables them.

The model router should eventually consider available RAM/VRAM and measured model capability rather than equating larger/cloud models with automatically better answers.

## Integration boundary

Do not copy the entirety of llama.vscode into this repository. Before adopting an upstream component:

1. identify the specific capability we need;
2. determine whether dependency, adaptation, or a small derived module is the cleanest boundary;
3. preserve required MIT attribution;
4. wrap upstream-specific behavior behind our own interfaces where practical;
5. keep Developer Intelligence independent of any particular model runtime.

This lets upstream infrastructure change without redefining the product.

## Immediate milestone

Stop investing in command-palette-only prototypes. The next user-facing milestone is assistance during normal editing: Python code intelligence surfaced through native completion/hover interactions, with no LLM required for the first response.

The existing `Inspect Symbol` command remains a diagnostic/proof-of-concept path while this interaction is built.

## Consequences

- We avoid rebuilding mature local-model and completion infrastructure unnecessarily.
- tempName retains an independent identity and architecture.
- The deterministic intelligence engine remains usable with no model configured.
- Local/cloud/agent capabilities can grow without forcing users into vibe coding.
- Upstream-derived code requires deliberate license/attribution tracking.
