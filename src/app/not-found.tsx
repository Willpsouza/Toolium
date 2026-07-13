import Link from "next/link"
import { ArrowRight, Search, Home as HomeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ToolCard } from "@/components/tools/tool-card"
import { getPopularTools } from "@/data/tools"

export default function NotFound() {
  const popular = getPopularTools().slice(0, 4)

  return (
    <div className="container-page py-20 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-6xl font-bold tracking-tight text-brand sm:text-7xl">404</p>
        <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl text-balance">
          Página não encontrada
        </h1>
        <p className="mt-3 text-muted-foreground text-pretty">
          A página que você procura pode ter sido movida ou não existe mais. Use os atalhos abaixo
          para encontrar o que precisa.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild className="bg-brand text-brand-foreground hover:bg-brand/90">
            <Link href="/">
              <HomeIcon className="size-4" />
              Ir para o início
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/ferramentas">
              <Search className="size-4" />
              Buscar ferramenta
            </Link>
          </Button>
        </div>

        <div className="mt-4">
          <Button asChild variant="link" className="text-muted-foreground">
            <Link href="/ferramentas/calculadoras">
              Ver calculadoras
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </div>
      </div>

      {popular.length > 0 && (
        <section className="mt-16">
          <h2 className="text-center text-sm font-medium uppercase tracking-wide text-muted-foreground mb-6">
            Ferramentas populares
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {popular.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
