# Architecture

The first implementation is Python-first with a thin VS Code client and a local intelligence engine.

## Layers

1. **VS Code extension** — observes editor context and renders commands, hovers, and lightweight contextual UI.
2. **Python intelligence adapter** — parses Python, indexes symbols/imports/references, and later integrates type/LSP/runtime information.
3. **Core context engine** — normalizes facts into a language-neutral project model.
4. **Model router** — optional. Chooses no model, local model, or cloud model based on task complexity, privacy policy, cost, and machine capability.
5. **Agent layer** — optional and explicit. Reuses the same project intelligence when the user asks the system to take over a task.

## Assistance continuum

Classic coding -> enhanced intelligence -> mechanical completion -> contextual explanation -> pair assistance -> bounded generation -> vibe/agent mode.

The system may automatically choose a cheaper/lower layer when it can answer reliably. It must not silently move upward into more generative behavior.

## Initial milestone

Open a Python project, select a symbol, and request project intelligence. Return factual information about the symbol and where it is defined. No LLM is required for this milestone.
