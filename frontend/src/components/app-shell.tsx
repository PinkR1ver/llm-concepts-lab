"use client";

import { MoonStar, Sparkles, SunMedium } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const modules = [
  { name: "Embedding", status: "live", active: true },
  { name: "Positional Encoding", status: "planned" },
  { name: "RoPE", status: "planned" },
  { name: "Self-Attention", status: "planned" },
  { name: "Causal Attention", status: "planned" },
  { name: "Multi-Head Attention", status: "planned" },
  { name: "Transformer Block", status: "planned" },
  { name: "Tokenization", status: "planned" },
];

function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "dark";
    return (window.localStorage.getItem("llm-lab-theme") as "light" | "dark" | null) ?? "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("llm-lab-theme", theme);
  }, [theme]);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    root.classList.toggle("dark", next === "dark");
    window.localStorage.setItem("llm-lab-theme", next);
    setTheme(next);
  };

  return (
    <Button variant="outline" size="sm" onClick={toggle} className="rounded-full">
      {theme === "dark" ? <SunMedium className="size-4" /> : <MoonStar className="size-4" />}
      <span>{theme === "dark" ? "Light" : "Dark"}</span>
    </Button>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="relative overflow-hidden border-r border-border/70 bg-sidebar/85 px-5 py-6 backdrop-blur-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,oklch(0.72_0.11_260_/_0.16),transparent_34%),radial-gradient(circle_at_bottom_left,oklch(0.83_0.08_180_/_0.1),transparent_28%)] dark:bg-[radial-gradient(circle_at_top_left,oklch(0.62_0.14_262_/_0.18),transparent_34%),radial-gradient(circle_at_bottom_left,oklch(0.74_0.09_200_/_0.08),transparent_28%)]" />
          <div className="relative flex h-full flex-col">
            <div className="space-y-4 border-b border-border/70 pb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                <Sparkles className="size-3.5" />
                Concept Lab
              </div>
              <div className="space-y-3">
                <h1 className="max-w-[12ch] text-3xl font-semibold leading-none tracking-[-0.04em] text-foreground">
                  LLM Concepts Lab
                </h1>
                <p className="max-w-[26ch] text-sm leading-6 text-muted-foreground">
                  A digital exhibition for model mechanics — part study tool, part polished developer instrument.
                </p>
              </div>
              <ThemeToggle />
            </div>

            <div className="pt-6">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                  Concepts
                </p>
                <span className="rounded-full bg-accent px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-accent-foreground">
                  Roadmap
                </span>
              </div>

              <nav className="space-y-2">
                {modules.map((module) => (
                  <div
                    key={module.name}
                    className={cn(
                      "group rounded-2xl border px-4 py-3 transition-all",
                      module.active
                        ? "border-border/70 bg-background/90 shadow-[0_8px_30px_-18px_rgba(0,0,0,0.5)]"
                        : "border-transparent bg-transparent hover:border-border/60 hover:bg-background/60"
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className={cn("text-sm font-medium", module.active ? "text-foreground" : "text-foreground/82")}>
                          {module.name}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {module.active ? "Current interactive module" : "Queued for build"}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "rounded-full px-2 py-1 text-[10px] font-medium uppercase tracking-[0.18em]",
                          module.active
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {module.status}
                      </span>
                    </div>
                  </div>
                ))}
              </nav>
            </div>

            <div className="mt-auto pt-6">
              <div className="rounded-3xl border border-border/70 bg-background/75 p-4">
                <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                  Design note
                </p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Build each concept like an inspectable artifact: precise enough for study, polished enough for public sharing.
                </p>
              </div>
            </div>
          </div>
        </aside>

        <div className="relative min-w-0">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,oklch(0.76_0.09_255_/_0.07),transparent_30%),radial-gradient(circle_at_80%_20%,oklch(0.83_0.08_180_/_0.08),transparent_24%)] dark:bg-[radial-gradient(circle_at_top,oklch(0.74_0.12_250_/_0.08),transparent_28%),radial-gradient(circle_at_80%_20%,oklch(0.76_0.06_180_/_0.08),transparent_24%)]" />
          <div className="relative">{children}</div>
        </div>
      </div>
    </div>
  );
}
