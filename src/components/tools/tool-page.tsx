import Link from "next/link"
import * as React from "react"
import { Suspense } from "react"
import { ChevronRight, CheckCircle2, Lightbulb, ListChecks, BookOpen, ArrowRight, Sparkles } from "lucide-react"
import { AdBanner } from "@/components/ads/ad-banner"
import { FaqSection } from "@/components/tools/faq-section"
import { ToolCard } from "@/components/tools/tool-card"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { categories } from "@/data/categories"
import type { Tool } from "@/data/tools"
import { getToolsByCategory } from "@/data/tools"
import { buildMetadata } from "@/lib/seo"
import { breadcrumbSchema, faqSchema, howToSchema } from "@/lib/schema"
import { toolComponents } from "@/components/tools/registry"

const NullTool = () => null

export interface ToolPageProps {
  tool: Tool
}

export function buildToolMetadata(tool: Tool) {
  return buildMetadata({
    title: tool.title,
    description: tool.description,
    path: `/${tool.slug}`,
    keywords: tool.keywords,
  })
}

export function ToolPage({ tool }: ToolPageProps) {
  const category = categories.find((c) => c.slug === tool.category)
  const ToolComponent = toolComponents[tool.slug] ?? NullTool

  const scripts: Record<string, unknown>[] = [
    breadcrumbSchema([
      { name: "Início", url: "/" },
      { name: "Ferramentas", url: "/ferramentas" },
      { name: category?.name ?? "", url: `/ferramentas/${tool.category}` },
      { name: tool.name, url: `/${tool.slug}` },
    ]),
  ]
  scripts.push(faqSchema(tool.faq))
  if (tool.howToSteps && tool.howToSteps.length > 0) {
    scripts.push(howToSchema(tool.title, tool.description, tool.howToSteps))
  }

  return (
    <article className="container-page py-8 sm:py-12">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList className="text-xs">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Início</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="size-3" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/ferramentas">Ferramentas</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="size-3" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/ferramentas/${tool.category}`}>{category?.name}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="size-3" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>{tool.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
          {tool.title}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground text-pretty">{tool.intro}</p>
      </header>

      {/* Ad slot 1 — após introdução */}
      <AdBanner className="my-8" />

      {/* Tool */}
      <section className="mt-2" aria-label={tool.title}>
        <div className="rounded-2xl border border-border/70 bg-card p-5 sm:p-8 shadow-sm">
          <Suspense fallback={<ToolSkeleton />}>
            <ToolComponent />
          </Suspense>
        </div>
      </section>

      {/* Ad slot 2 — entre explicação e área da ferramenta (aqui fica abaixo da ferramenta) */}
      <div className="mt-2">
        <AdBanner className="my-10" />
      </div>

      {/* Explanation content */}
      <section className="mt-4 max-w-3xl">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="size-5 text-brand" />
          <h2 className="text-2xl font-bold tracking-tight">Como funciona</h2>
        </div>
        <div className="space-y-8">
          {tool.content.map((block, i) => (
            <div key={i} className="space-y-3">
              {block.heading && (
                <h3 className="text-lg font-semibold tracking-tight">{block.heading}</h3>
              )}
              {block.paragraphs.map((p, j) => (
                <p key={j} className="text-muted-foreground leading-relaxed text-pretty">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* How to use */}
      <section className="mt-10 max-w-3xl">
        <div className="flex items-center gap-2 mb-6">
          <ListChecks className="size-5 text-brand" />
          <h2 className="text-2xl font-bold tracking-tight">Como usar</h2>
        </div>
        <ol className="space-y-3">
          {tool.howTo.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs font-semibold text-brand">
                {i + 1}
              </span>
              <span className="text-muted-foreground leading-relaxed pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Example */}
      <section className="mt-10 max-w-3xl">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="size-5 text-brand" />
          <h2 className="text-2xl font-bold tracking-tight">Exemplo prático</h2>
        </div>
        <div className="rounded-xl border border-brand/30 bg-brand-muted/30 p-5">
          <p className="text-foreground/90 leading-relaxed text-pretty">{tool.example}</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="mt-10 max-w-3xl">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Benefícios</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {tool.benefits.map((b, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <CheckCircle2 className="size-5 shrink-0 text-brand mt-0.5" />
              <span className="text-muted-foreground leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Ad slot 3 — antes do FAQ */}
      <AdBanner className="my-10" />

      {/* FAQ */}
      <div className="max-w-3xl">
        <FaqSection faqs={tool.faq} />
      </div>

      {/* Ferramentas relacionadas — descoberta dentro da mesma categoria */}
      <RelatedTools current={tool} />

      {/* CTA final — próximo passo após a leitura */}
      <section className="mt-12">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-muted/30 p-8 text-center sm:p-10">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl text-balance">
            Explore mais ferramentas gratuitas
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground text-pretty">
            Mais de 30 ferramentas online sem cadastro. Encontre a próxima que você precisa.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild className="bg-brand text-brand-foreground hover:bg-brand/90">
              <Link href="/ferramentas">
                Ver todas as ferramentas
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/ferramentas/${tool.category}`}>
                Mais {category?.name.toLowerCase() ?? "ferramentas"}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      {scripts.map((script, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(script) }}
        />
      ))}
    </article>
  )
}

/**
 * Seção de ferramentas relacionadas — lista até 4 ferramentas da mesma categoria,
 * excluindo a ferramenta atual. Reutiliza o ToolCard existente. Se a categoria
 * tiver menos de 2 ferramentas, a seção não é renderizada.
 */
function RelatedTools({ current }: { current: Tool }) {
  const related = getToolsByCategory(current.category)
    .filter((t) => t.slug !== current.slug)
    .slice(0, 4)

  if (related.length === 0) return null

  const category = categories.find((c) => c.slug === current.category)

  return (
    <section className="mt-12">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="size-5 text-brand" />
          <h2 className="text-2xl font-bold tracking-tight">Ferramentas relacionadas</h2>
        </div>
        <Button asChild variant="ghost" size="sm" className="text-muted-foreground">
          <Link href={`/ferramentas/${current.category}`}>
            Ver {category?.name.toLowerCase() ?? "categoria"}
            <ArrowRight className="size-3.5" />
          </Link>
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {related.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </section>
  )
}

/**
 * Skeleton exibido enquanto o chunk da ferramenta carrega (navegação client-side).
 * Usa apenas classes Tailwind existentes — sem novo componente ou dependência.
 */
function ToolSkeleton() {
  return (
    <div className="flex flex-col gap-4" aria-hidden="true">
      <div className="h-4 w-1/3 rounded bg-muted animate-pulse" />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="h-10 rounded-md bg-muted animate-pulse" />
        <div className="h-10 rounded-md bg-muted animate-pulse" />
      </div>
      <div className="h-24 rounded-xl bg-muted animate-pulse" />
    </div>
  )
}
