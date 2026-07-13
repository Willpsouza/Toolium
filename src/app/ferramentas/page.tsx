import Link from "next/link"
import type { Metadata } from "next"
import { ChevronRight } from "lucide-react"
import { ToolsExplorer } from "@/components/tools/tools-explorer"
import { tools } from "@/data/tools"
import { categories } from "@/data/categories"
import { buildMetadata } from "@/lib/seo"
import { itemListSchema } from "@/lib/schema"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export const metadata = buildMetadata({
  title: "Todas as ferramentas online gratuitas",
  description:
    "Lista completa de ferramentas online gratuitas do Toolium: calculadoras, conversores, geradores, imagem e produtividade. Encontre a ferramenta ideal.",
  path: "/ferramentas",
  keywords: [
    "ferramentas online",
    "lista de ferramentas",
    "ferramentas gratuitas",
    "calculadoras",
    "conversores",
    "geradores",
  ],
})

export default function ToolsPage() {
  const schema = itemListSchema(
    tools.map((t) => ({ name: t.title, url: `/${t.slug}`, description: t.tagline }))
  )

  return (
    <div className="container-page py-8 sm:py-12">
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
            <BreadcrumbPage>Ferramentas</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
          Todas as ferramentas
        </h1>
        <p className="mt-3 text-lg text-muted-foreground text-pretty">
          {tools.length} ferramentas online gratuitas, organizadas por categoria. Busque pelo nome
          ou filtre por categoria para encontrar o que precisa.
        </p>
      </header>

      {/* Category quick links */}
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/ferramentas/${c.slug}`}
            className="rounded-xl border border-border/70 bg-card p-4 transition-colors hover:border-border hover:bg-accent/40"
          >
            <p className="text-sm font-semibold">{c.shortName}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {tools.filter((t) => t.category === c.slug).length} ferramentas
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <ToolsExplorer tools={tools} />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </div>
  )
}
