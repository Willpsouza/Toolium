import Link from "next/link"
import { Logo } from "@/components/logo"
import { categories } from "@/data/categories"
import { tools } from "@/data/tools"

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-auto border-t border-border/60 bg-muted/30">
      <div className="container-page py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground max-w-sm text-pretty">
              Ferramentas online gratuitas para facilitar sua rotina. Calculadoras, conversores e
              utilidades rápidas, precisas e 100% grátis — sem cadastro.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">Categorias</h3>
            <ul className="space-y-2">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/ferramentas/${c.slug}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">Populares</h3>
            <ul className="space-y-2">
              {tools
                .filter((t) => t.popular)
                .slice(0, 6)
                .map((t) => (
                  <li key={t.slug}>
                    <Link
                      href={`/${t.slug}`}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">Institucional</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sobre" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Termos de uso
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Política de cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-border/60 pt-6">
          <p className="text-xs text-muted-foreground">
            © {year} Toolium. Todas as ferramentas são gratuitas.
          </p>
          <p className="text-xs text-muted-foreground">
            Feito com cuidado para facilitar o seu dia a dia.
          </p>
        </div>
      </div>
    </footer>
  )
}
