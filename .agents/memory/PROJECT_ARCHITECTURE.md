# PROJECT_ARCHITECTURE.md - llm-concepts-lab

This file is durable project memory for the architecture and mental model of `llm-concepts-lab`.
It should help coding agents and future sessions understand how the project is organized and why.

## Project purpose

`llm-concepts-lab` is an interactive learning lab for large language model concepts.

The project should teach concepts by connecting:
1. intuition
2. minimal code
3. interactive visualization
4. exact data flow
5. practical caveats

It is not a generic AI product, and not just a note-taking repo.
It is a concept-to-code-to-visualization teaching system.

## Architectural layers

The project currently has four layers.

### 1. Project guidance layer

Path: `.agents/`

Purpose:
- store project-local agent instructions
- preserve project memory across sessions
- optionally hold project-local skills

Important files:
- `.agents/AGENTS.md`: project rules, direction, product principles
- `.agents/memory/`: session notes + durable architecture memory
- `.agents/skills/`: project-scoped skills and related notes

This layer exists to make the project more legible to coding agents and future sessions.

### 2. Frontend visualization layer

Path: `frontend/`

Stack:
- Next.js
- Tailwind CSS
- shadcn/ui

Purpose:
- present concept modules as interactive learning surfaces
- make data flow inspectable
- host the main user-facing experience

Current responsibility:
- app shell with persistent sidebar
- theme handling for dark/light presentation
- Embedding Playground current module

Planned responsibility:
- a separate module/page for each LLM concept
- shared visual primitives for tokens, vectors, matrices, attention heatmaps, etc.
- a navigation structure that scales as concepts accumulate

### 3. Python concept/runtime layer

Current paths:
- `scripts/`
- `src/`
- `dashboard/` (legacy placeholder from early scaffold stage)

Purpose:
- hold minimal runnable concept demos
- provide reference implementations of the mechanisms being taught
- later serve backend endpoints when frontend needs generated examples or heavier computation

Current state:
- lightweight embedding demo code exists
- Python is not yet wired to frontend via API

Future likely direction:
- add a small API service for concept calculations when interaction logic becomes too large for frontend-only implementation

### 4. Documentation and top-level project layer

Files:
- `README.md`
- `requirements.txt`
- `.gitignore`

Purpose:
- explain the project
- define setup requirements
- keep repo hygiene clean

## Concept module pattern

Each concept module should follow a repeatable structure.

### Required teaching components

1. What this concept is
2. Why it exists in the model stack
3. A minimal toy example
4. Exact input/output transformation
5. Code representation
6. Visualization
7. Limitations of the toy abstraction

### Example module sequence

1. Embedding
2. Positional encoding / RoPE
3. Self-attention
4. Causal self-attention
5. Multi-head attention
6. Transformer block
7. Tokenization

## Embedding module architecture

Current main page lives at:
- `frontend/src/app/page.tsx`

Current concepts shown:
1. input text
2. tokenization by whitespace toy example
3. vocabulary
4. token ids
5. embedding table
6. embedding lookup result
7. one-hot representation
8. one-hot × embedding matrix equivalence

Current state after redesign:
- the module lives inside an application shell with sidebar-based navigation
- visual hierarchy is substantially improved
- token selection now drives row highlighting and focused inspection

Current weakness:
- still only one real module route exists
- lacks richer visual plots for vector geometry
- sidebar modules are roadmap items rather than linked pages

## Design philosophy

The UI should feel:
- modern
- clear
- exploratory
- pedagogically intentional

The UI should not feel like:
- a generic admin dashboard
- a static blog article with a few widgets
- a flashy but conceptually shallow animation toy

## Memory policy

Use project memory for two different purposes:

### A. session memory

Examples:
- what changed today
- what was tried
- what failed
- what the next step is

Store in dated files like:
- `.agents/memory/YYYY-MM-DD.md`

### B. durable architecture memory

Examples:
- what each folder is for
- how layers interact
- what the module pattern is
- what design philosophy the project follows
- what user preferences are stable

Store in stable files like:
- `.agents/memory/PROJECT_ARCHITECTURE.md`
- future files such as `DESIGN_DECISIONS.md`, `MODULES.md`, or `USER_PREFERENCES.md`

## Stable user preferences currently known

- Jude wants concepts grounded in code
- Jude prefers advanced frontend presentation over Streamlit-style dashboards
- Jude likes project-local agent context via `.agents/`
- Jude wants memory to include architecture, not only session logs
- Jude values design quality and interaction craft for concept pages
- Jude is comfortable with project-local skills installed under `.agents/skills/`

## Candidate project-local skills

### Impeccable

Purpose:
- improve design taste, visual hierarchy, and frontend execution quality
- provide a command vocabulary for design refinement

Observed fit for this project:
- strong, because `llm-concepts-lab` is not only educational but also presentation-sensitive
- likely useful for polishing concept pages so they feel more intentional and less prototype-like

Installation note:
- upstream docs indicate `npx skills add pbakaus/impeccable`
- upstream docs also indicate project-level installs can create or use `.agents/skills/`
- in this project, a manual fallback install was used by cloning the upstream repository and syncing its `.agents/skills/` contents into the local project
