"use client"

import * as React from "react"
import { Search, X, Wrench } from "lucide-react"
import { ToolCard } from "@/components/tools/tool-card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import type { Tool } from "@/data/tools"
import { categories } from "@/data/categories"
import { iconMap } from "@/lib/icons"

const accentMap: Record<string, string> = {
  emerald: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 ring-emerald-500/20",
  amber: "text-amber-600 dark:text-amber-400 bg-amber-500/10 ring-amber-500/20",
  violet: "text-violet-600 dark:text-violet-400 bg-violet-500/10 ring-violet-500/20",
  rose: "text-rose-600 dark:text-rose-400 bg-rose-500/10 ring-rose-500/20",
  sky: "text-sky-600 dark:text-sky-400 bg-sky-500/10 ring-sky-500/20",
}

export function ToolsExplorer({ tools }: { tools: Tool[] }) {
  const [query, setQuery] = React.useState("")
  const [active, setActive] = React.useState<string>("all")

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    return tools.filter((t) => {
      const matchesCat = active === "all" || t.category === active
      if (!matchesCat) return false
      if (!q) return true
      return (
        t.name.toLowerCase().includes(q) ||
        t.title.toLowerCase().includes(q) ||
        t.tagline.toLowerCase().includes(q) ||
        t.keywords.some((k) => k.toLowerCase().includes(q))
      )
    })
  }, [tools, query, active])

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar ferramenta..."
            className="pl-9 pr-9"
            aria-label="Buscar ferramenta"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Limpar busca"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <CategoryChip
            label="Todas"
            active={active === "all"}
            onClick={() => setActive("all")}
            icon="Wrench"
          />
          {categories.map((c) => (
            <CategoryChip
              key={c.slug}
              label={c.shortName}
              active={active === c.slug}
              onClick={() => setActive(c.slug)}
              icon={c.icon}
              accent={c.accent}
            />
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-12 rounded-xl border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">
            Nenhuma ferramenta encontrada para &ldquo;{query}&rdquo;.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      )}
    </div>
  )
}

function CategoryChip({
  label,
  active,
  onClick,
  icon,
  accent = "emerald",
}: {
  label: string
  active: boolean
  onClick: () => void
  icon: string
  accent?: string
}) {
  const Icon = iconMap[icon] ?? Wrench
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
        active
          ? "border-brand bg-brand text-brand-foreground"
          : "border-border bg-background hover:bg-accent"
      )}
    >
      <Icon className={cn("size-3.5", !active && accentMap[accent])} />
      {label}
    </button>
  )
}
