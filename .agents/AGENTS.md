# AGENTS.md - llm-concepts-lab

This project is a concept-first, visualization-heavy learning lab for large language models.

## Project goal

Turn LLM concepts into:
1. runnable code
2. interactive visualizations
3. inspectable explanations
4. reusable teaching artifacts

This is not a generic dashboard project and not a SaaS admin panel.
It is a concept playground for learning how modern LLM components work.

## Product principles

1. Show mechanisms, not just outcomes.
2. Prefer interaction over static screenshots.
3. Prefer inspectable toy examples over black-box demos.
4. Every module should connect concept ↔ code ↔ visualization.
5. The UI should feel modern and exploratory, but never sacrifice clarity.

## Core module pattern

Each concept module should ideally include:
1. a short intuition section
2. a concrete toy example
3. the exact data flow
4. an interactive visualization
5. a code view or algorithm view
6. a note about limitations / where the toy abstraction breaks

## Current stack

- Frontend: Next.js + Tailwind + shadcn/ui
- Backend: Python
- Python env: project-local conda env at `./.conda`

## Design direction

Aim for:
- clean, concept-focused layouts
- interactive teaching surfaces
- modern but restrained visuals
- strong information hierarchy
- minimal dashboard boilerplate feel

Avoid:
- generic data-panel aesthetics
- noisy gradients without meaning
- over-animation that obscures the concept
- decorative complexity without teaching value

## Near-term roadmap

1. Embedding
2. Positional encoding / RoPE
3. Self-attention
4. Causal self-attention
5. Multi-head attention
6. Transformer block
7. Tokenization

## Current milestone

Embedding Playground:
- text -> tokens -> token ids
- embedding table lookup
- one-hot equivalence
- better visual design and interaction polish pending

## Memory convention

Project memory lives in `.agents/memory/`.
Record important design decisions, user preferences, and module-specific lessons there.

After each meaningful implementation step, update project memory before stopping.
This includes:
1. what changed
2. why it changed
3. current architecture implications
4. next recommended step

Use both:
- dated session notes for change logs
- stable memory files for architecture, design decisions, modules, and durable preferences

## Skills convention

Project-local skills live in `.agents/skills/` when installed manually or via project-specific tooling.
Use them to improve craftsmanship, design quality, and workflow consistency for this project.
