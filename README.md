# llm-concepts-lab

Hands-on scripts and visual dashboards for learning LLM concepts.

## Goals

1. Turn LLM concepts into runnable code.
2. Keep each concept small, inspectable, and visual when possible.
3. Build a dashboard to demonstrate how the pieces work.

## Planned modules

- embedding
- positional encoding
- self-attention
- causal self-attention
- multi-head attention
- transformer block
- tokenization

## Structure

```text
scripts/       # small runnable demos
notebooks/     # optional exploratory notes
src/           # reusable logic for demos/dashboard
dashboard/     # visualization app
assets/        # figures, gifs, exported plots
```

## First milestone

Build an embedding demo that shows:
- vocab
- token ids
- embedding table
- embedding lookup result
- one-hot vs embedding-matrix equivalence
