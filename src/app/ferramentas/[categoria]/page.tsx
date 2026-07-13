import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ChevronRight, ArrowRight } from "lucide-react"
import { ToolCard } from "@/components/tools/tool-card"
import { AdBanner } from "@/components/ads/ad-banner"
import { categories, getCategory } from "@/data/categories"
import { getToolsByCategory } from "@/data/tools"
import { buildMetadata } from "@/lib/seo"
import { collectionPageSchema } from "@/lib/schema"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export const dynamicParams = false

export function generateStaticParams() {
  return categories.map((c) => ({ categoria: c.slug }))
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ categoria: string }>
}): Promise<Metadata> {
  return params.then((p) => {
    const category = getCategory(p.categoria)
    if (!category) return {}
    return buildMetadata({
      title: `${category.name} online gratuitas`,
      description: category.description,
      path: `/ferramentas/${category.slug}`,
      keywords: [
        category.name.toLowerCase(),
        `${category.name.toLowerCase()} online`,
        `${category.name.toLowerCase()} grátis`,
        "ferramentas online",
      ],
    })
  })
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categoria: string }>
}) {
  const { categoria } = await params
  const category = getCategory(categoria)
  if (!category) {
    notFound()
  }
  const categoryTools = getToolsByCategory(categoria)
  const schema = collectionPageSchema(categoria)

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
            <BreadcrumbLink asChild>
              <Link href="/ferramentas">Ferramentas</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="size-3" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>{category.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
          {category.name}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground text-pretty">{category.description}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          {categoryTools.length}{" "}
          {categoryTools.length === 1 ? "ferramenta disponível" : "ferramentas disponíveis"}
        </p>
      </header>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categoryTools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>

      <AdBanner className="my-12" />

      {/* Other categories */}
      <section className="mt-12">
        <h2 className="text-xl font-bold tracking-tight mb-5">Outras categorias</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories
            .filter((c) => c.slug !== categoria)
            .map((c) => (
              <Link
                key={c.slug}
                href={`/ferramentas/${c.slug}`}
                className="group flex items-center justify-between rounded-xl border border-border/70 bg-card p-4 transition-colors hover:border-border hover:bg-accent/40"
              >
                <div>
                  <p className="text-sm font-semibold">{c.shortName}</p>
                  <p className="text-xs text-muted-foreground">
                    {getToolsByCategory(c.slug).length} ferramentas
                  </p>
                </div>
                <ArrowRight className="size-4 text-muted-foreground group-hover:translate-x-0.5 group-hover:text-foreground transition-all" />
              </Link>
            ))}
        </div>
      </section>

      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
    </div>
  )
}
