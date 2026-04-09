"use client";

import { ArrowRight, Binary, BookOpen, Braces, Hash, Sigma, Waypoints } from "lucide-react";
import { useMemo, useState } from "react";

import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const DEFAULT_VOCAB = ["I", "love", "LLMs", "<unk>"];
const DEFAULT_TEXT = "I love LLMs";
const EMBEDDING_TABLE = [
  [0.2, 0.1, 0.7],
  [0.9, 0.3, 0.1],
  [0.4, 0.8, 0.5],
  [0.0, 0.0, 0.0],
];

function tokenize(text: string) {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function SectionCard({ title, eyebrow, children, className }: { title: string; eyebrow?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-[2rem] border border-border/70 bg-card/86 p-6 shadow-[0_20px_60px_-34px_rgba(0,0,0,0.42)] backdrop-blur-xl", className)}>
      <div className="mb-5 space-y-2">
        {eyebrow ? <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">{eyebrow}</p> : null}
        <h2 className="text-lg font-semibold tracking-[-0.03em] text-card-foreground">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function MatrixTable({ rows, rowLabels, highlightRow }: { rows: number[][]; rowLabels?: string[]; highlightRow?: number | null }) {
  return (
    <div className="overflow-x-auto rounded-[1.5rem] border border-border/70 bg-background/72">
      <table className="min-w-full text-sm">
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={cn(
                "border-b border-border/60 last:border-b-0",
                highlightRow === i && "bg-accent/65"
              )}
            >
              {rowLabels ? (
                <td className="border-r border-border/60 px-4 py-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {rowLabels[i]}
                </td>
              ) : null}
              {row.map((value, j) => (
                <td key={j} className="px-4 py-3 font-mono text-card-foreground">
                  {value.toFixed(2)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FlowChip({ icon: Icon, label, active = false }: { icon: React.ComponentType<{ className?: string }>; label: string; active?: boolean }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] transition-all",
        active ? "border-border bg-accent text-accent-foreground" : "border-border/60 bg-background/60 text-muted-foreground"
      )}
    >
      <Icon className="size-3.5" />
      {label}
    </div>
  );
}

export default function Home() {
  const [text, setText] = useState(DEFAULT_TEXT);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);

  const tokens = useMemo(() => tokenize(text), [text]);
  const tokenIds = useMemo(
    () => tokens.map((token) => DEFAULT_VOCAB.indexOf(token)).map((id) => (id === -1 ? 3 : id)),
    [tokens]
  );
  const lookupResult = useMemo(() => tokenIds.map((id) => EMBEDDING_TABLE[id]), [tokenIds]);
  const oneHot = useMemo(
    () =>
      tokenIds.map((id) =>
        DEFAULT_VOCAB.map((_, vocabIndex) => (vocabIndex === id ? 1 : 0) as number)
      ),
    [tokenIds]
  );
  const oneHotMatmul = useMemo(
    () =>
      oneHot.map((row) => {
        const cols = EMBEDDING_TABLE[0].length;
        return Array.from({ length: cols }, (_, col) =>
          row.reduce((sum, value, vocabIndex) => sum + value * EMBEDDING_TABLE[vocabIndex][col], 0)
        );
      }),
    [oneHot]
  );

  const focusedToken = selectedIndex !== null ? tokens[selectedIndex] : null;
  const focusedId = selectedIndex !== null ? tokenIds[selectedIndex] : null;
  const focusedVector = selectedIndex !== null ? lookupResult[selectedIndex] : null;

  return (
    <AppShell>
      <main className="mx-auto flex min-h-screen max-w-[1500px] flex-col gap-8 px-6 py-6 lg:px-8">
        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <SectionCard title="Embedding Playground" eyebrow="Module 01 · Active" className="overflow-hidden">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-5">
                <div className="space-y-3">
                  <h1 className="max-w-[12ch] text-4xl font-semibold tracking-[-0.06em] text-card-foreground md:text-5xl">
                    Turn text into vectors you can inspect.
                  </h1>
                  <p className="max-w-[62ch] text-sm leading-7 text-muted-foreground md:text-[15px]">
                    This module focuses on the first real transformation inside a language model. Text becomes tokens, tokens become ids, and ids index a learnable table that produces dense vectors for the rest of the stack.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <FlowChip icon={BookOpen} label="text" active />
                  <ArrowRight className="mt-2 size-4 text-muted-foreground" />
                  <FlowChip icon={Hash} label="token ids" active />
                  <ArrowRight className="mt-2 size-4 text-muted-foreground" />
                  <FlowChip icon={Waypoints} label="lookup" active />
                  <ArrowRight className="mt-2 size-4 text-muted-foreground" />
                  <FlowChip icon={Sigma} label="vectors" active />
                </div>

                <div className="rounded-[1.75rem] border border-border/70 bg-background/70 p-4">
                  <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                    Try the module
                  </p>
                  <textarea
                    value={text}
                    onChange={(e) => {
                      setText(e.target.value);
                      setSelectedIndex(0);
                    }}
                    className="min-h-32 w-full rounded-[1.25rem] border border-border/70 bg-card px-4 py-4 text-base leading-7 text-card-foreground outline-none transition focus:border-ring"
                    placeholder="Type a toy sentence like: I love LLMs"
                  />
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Button variant="outline" onClick={() => { setText("I love LLMs"); setSelectedIndex(0); }}>
                      Reset example
                    </Button>
                    <Button variant="outline" onClick={() => { setText("LLMs love I"); setSelectedIndex(0); }}>
                      Reorder tokens
                    </Button>
                    <Button variant="outline" onClick={() => { setText("I study transformers"); setSelectedIndex(1); }}>
                      Add unknown token
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 self-start">
                <div className="rounded-[1.75rem] border border-border/70 bg-background/72 p-5">
                  <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">Current focus</p>
                  <div className="mt-4 space-y-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Token</p>
                      <p className="mt-1 text-2xl font-semibold tracking-[-0.04em]">{focusedToken ?? "—"}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-card px-4 py-3">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Token ID</p>
                        <p className="mt-2 font-mono text-lg">{focusedId ?? "—"}</p>
                      </div>
                      <div className="rounded-2xl bg-card px-4 py-3">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Vector dim</p>
                        <p className="mt-2 font-mono text-lg">3</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Vector</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {focusedVector ? (
                          focusedVector.map((value, idx) => (
                            <div key={idx} className="rounded-full border border-border/70 bg-card px-3 py-1.5 font-mono text-sm">
                              {value.toFixed(2)}
                            </div>
                          ))
                        ) : (
                          <span className="text-sm text-muted-foreground">Select a token below.</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-border/70 bg-background/72 p-5">
                  <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">Why it matters</p>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
                    <li>• Token ids are labels, not geometry.</li>
                    <li>• Embedding gives each discrete token a learnable dense vector.</li>
                    <li>• These vectors are what later flow into position handling and attention.</li>
                  </ul>
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Reading the mechanism" eyebrow="Exhibition notes">
            <div className="space-y-5 text-sm leading-7 text-muted-foreground">
              <p>
                Think of the embedding matrix as a small library of learned coordinates. The token id is not the meaning; it is only the shelf index that tells the model which row to retrieve.
              </p>
              <div className="grid gap-3">
                <div className="rounded-[1.5rem] bg-background/70 p-4">
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">Mental model</p>
                  <p className="mt-2 text-card-foreground">
                    <span className="font-medium">text → tokens → ids → row lookup → vectors</span>
                  </p>
                </div>
                <div className="rounded-[1.5rem] bg-background/70 p-4">
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">Next concepts unlocked</p>
                  <p className="mt-2 text-card-foreground">
                    positional encoding, RoPE, Q/K/V projections, attention weights
                  </p>
                </div>
              </div>
            </div>
          </SectionCard>
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
          <SectionCard title="Interactive token strip" eyebrow="Inspect one token at a time">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                {tokens.length ? (
                  tokens.map((token, index) => {
                    const active = selectedIndex === index;
                    return (
                      <button
                        key={`${token}-${index}`}
                        onClick={() => setSelectedIndex(index)}
                        className={cn(
                          "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                          active
                            ? "border-border bg-primary text-primary-foreground shadow-[0_12px_30px_-18px_rgba(0,0,0,0.5)]"
                            : "border-border/70 bg-background/70 text-card-foreground hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        {token}
                      </button>
                    );
                  })
                ) : (
                  <span className="text-sm text-muted-foreground">Type some text to generate tokens.</span>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.5rem] border border-border/70 bg-background/70 p-4">
                  <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                    <Hash className="size-3.5" /> token ids
                  </p>
                  <div className="mt-3 space-y-2">
                    {tokens.map((token, index) => (
                      <div
                        key={`${token}-id-${index}`}
                        className={cn(
                          "flex items-center justify-between rounded-2xl px-4 py-3",
                          selectedIndex === index ? "bg-accent text-accent-foreground" : "bg-card"
                        )}
                      >
                        <span className="font-mono text-sm">{token}</span>
                        <span className="font-mono text-sm">{tokenIds[index]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-border/70 bg-background/70 p-4">
                  <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                    <Binary className="size-3.5" /> one-hot
                  </p>
                  <div className="mt-3 space-y-2">
                    {tokens.map((token, index) => (
                      <div
                        key={`${token}-onehot-${index}`}
                        className={cn(
                          "rounded-2xl px-4 py-3 font-mono text-sm",
                          selectedIndex === index ? "bg-accent text-accent-foreground" : "bg-card"
                        )}
                      >
                        [{oneHot[index]?.join(", ")}]
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Embedding matrix and equivalence" eyebrow="Exact data path">
            <div className="grid gap-5">
              <div className="grid gap-5 xl:grid-cols-2">
                <div>
                  <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">Embedding table (V × d)</p>
                  <MatrixTable rows={EMBEDDING_TABLE} rowLabels={DEFAULT_VOCAB} highlightRow={focusedId} />
                </div>
                <div>
                  <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">Lookup result</p>
                  {lookupResult.length ? (
                    <MatrixTable rows={lookupResult} rowLabels={tokens} highlightRow={selectedIndex} />
                  ) : (
                    <div className="rounded-[1.5rem] border border-border/70 bg-background/70 p-5 text-sm text-muted-foreground">
                      Vectors appear after tokenization.
                    </div>
                  )}
                </div>
              </div>

              <div className="grid gap-5 xl:grid-cols-2">
                <div>
                  <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">One-hot representation</p>
                  {oneHot.length ? (
                    <MatrixTable rows={oneHot} rowLabels={tokens} highlightRow={selectedIndex} />
                  ) : null}
                </div>
                <div>
                  <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">One-hot × embedding matrix</p>
                  {oneHotMatmul.length ? (
                    <MatrixTable rows={oneHotMatmul} rowLabels={tokens} highlightRow={selectedIndex} />
                  ) : null}
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-border/70 bg-background/72 p-5">
                <p className="mb-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                  <Braces className="size-3.5" /> Key engineering point
                </p>
                <p className="max-w-[72ch] text-sm leading-7 text-muted-foreground">
                  In practice, frameworks use a direct lookup layer like <span className="font-mono text-card-foreground">nn.Embedding</span> instead of materializing one-hot vectors. The result is mathematically equivalent, but much more efficient.
                </p>
              </div>
            </div>
          </SectionCard>
        </section>
      </main>
    </AppShell>
  );
}
