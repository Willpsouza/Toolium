import Link from "next/link"
import { ArrowRight, Wrench } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Tool } from "@/data/tools"
import { categories } from "@/data/categories"
import { iconMap } from "@/lib/icons"

const accentMap: Record<string, string> = {
  emerald: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
  amber: "text-amber-600 dark:text-amber-400 bg-amber-500/10",
  violet: "text-violet-600 dark:text-violet-400 bg-violet-500/10",
  rose: "text-rose-600 dark:text-rose-400 bg-rose-500/10",
  sky: "text-sky-600 dark:text-sky-400 bg-sky-500/10",
}

export function ToolCard({ tool, className }: { tool: Tool; className?: string }) {
  const category = categories.find((c) => c.slug === tool.category)
  const accent = category?.accent ?? "emerald"
  const Icon = iconMap[tool.icon] ?? Wrench

  return (
    <Link
      href={`/${tool.slug}`}
      className={cn(
        "group relative flex flex-col gap-3 rounded-xl border border-border/70 bg-card p-5",
        "transition-all hover:border-border hover:shadow-md hover:-translate-y-0.5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className={cn("flex size-10 items-center justify-center rounded-lg", accentMap[accent])}>
          <Icon className="size-5" />
        </div>
        <ArrowRight className="size-4 text-muted-foreground/40 transition-all group-hover:text-foreground group-hover:translate-x-0.5" />
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-semibold leading-tight">{tool.name}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2 text-pretty">{tool.tagline}</p>
      </div>
    </Link>
  )
}
