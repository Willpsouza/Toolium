import Link from "next/link"
import {
  ArrowRight,
  Zap,
  ShieldCheck,
  Gift,
  Smartphone,
  Search,
  Sparkles,
  CheckCircle2,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ToolCard } from "@/components/tools/tool-card"
import { AdBanner } from "@/components/ads/ad-banner"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { categories } from "@/data/categories"
import { tools, getPopularTools } from "@/data/tools"
import { getToolIcon } from "@/lib/icons"
import { buildMetadata } from "@/lib/seo"
import { cn } from "@/lib/utils"

export const metadata = buildMetadata({
  title: "Toolium — Ferramentas online gratuitas",
  description:
    "Ferramentas online gratuitas para facilitar sua rotina. Calculadoras, conversores, geradores e utilidades rápidas, precisas e 100% grátis — sem cadastro.",
  path: "/",
})

const accentMap: Record<string, string> = {
  emerald: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 ring-emerald-500/20",
  amber: "text-amber-600 dark:text-amber-400 bg-amber-500/10 ring-amber-500/20",
  violet: "text-violet-600 dark:text-violet-400 bg-violet-500/10 ring-violet-500/20",
  rose: "text-rose-600 dark:text-rose-400 bg-rose-500/10 ring-rose-500/20",
  sky: "text-sky-600 dark:text-sky-400 bg-sky-500/10 ring-sky-500/20",
}

const benefits = [
  {
    icon: Gift,
    title: "100% gratuito",
    description: "Todas as ferramentas são gratuitas, sem cadastro e sem limites de uso.",
  },
  {
    icon: Zap,
    title: "Rápido e direto",
    description: "Resultados instantâneos enquanto você digita, sem esperas nem etapas extras.",
  },
  {
    icon: ShieldCheck,
    title: "Privacidade primeiro",
    description: "Ferramentas que rodam no seu navegador. Seus dados não saem do seu dispositivo.",
  },
  {
    icon: Smartphone,
    title: "Funciona em qualquer lugar",
    description: "Design responsivo que funciona perfeitamente no celular, tablet e desktop.",
  },
]

const steps = [
  {
    icon: Search,
    title: "Escolha a ferramenta",
    description: "Navegue pelas categorias ou use a busca para encontrar a ferramenta ideal.",
  },
  {
    icon: Sparkles,
    title: "Use instantaneamente",
    description: "Digite os valores e veja o resultado na hora, sem cadastro nem instalação.",
  },
  {
    icon: CheckCircle2,
    title: "Copie e use",
    description: "Copie o resultado com um clique e use onde precisar. Simples assim.",
  },
]

const homeFaqs = [
  {
    q: "O Toolium é realmente gratuito?",
    a: "Sim, todas as ferramentas do Toolium são 100% gratuitas, sem cadastro e sem limites de uso. Você pode usar quantas vezes quiser.",
  },
  {
    q: "Preciso instalar algo para usar?",
    a: "Não. Todas as ferramentas rodam direto no navegador, no celular ou no computador. Não há nada para instalar.",
  },
  {
    q: "Meus dados ficam salvos ou são enviados para servidores?",
    a: "A maioria das ferramentas processa tudo no seu próprio navegador, garantindo privacidade. Dados sensíveis nunca saem do seu dispositivo.",
  },
  {
    q: "As ferramentas funcionam no celular?",
    a: "Sim. O Toolium é totalmente responsivo e funciona perfeitamente em celulares, tablets e computadores.",
  },
  {
    q: "Quantas ferramentas o Toolium tem?",
    a: "São mais de 30 ferramentas organizadas em cinco categorias: calculadoras, conversores, geradores, imagem e produtividade.",
  },
  {
    q: "Como o Toolium se mantém gratuito?",
    a: "O Toolium é sustentado por anúncios discretos do Google AdSense, que nunca atrapalham a experiência de uso.",
  },
]

export default function HomePage() {
  const popular = getPopularTools()

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 bg-grid mask-fade-b opacity-60" aria-hidden />
        <div className="absolute inset-0 bg-radial-fade" aria-hidden />
        <div className="container-page relative py-20 sm:py-28 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <span className="flex size-1.5 rounded-full bg-brand" />
              {tools.length} ferramentas gratuitas e sem cadastro
            </div>
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Ferramentas online gratuitas para facilitar sua rotina
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl">
              Calculadoras, conversores e utilidades rápidas, precisas e 100% grátis.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-brand text-brand-foreground hover:bg-brand/90">
                <Link href="/ferramentas">
                  Explorar ferramentas
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/ferramentas/calculadoras">Ver calculadoras</Link>
              </Button>
            </div>
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Star className="size-3.5 fill-brand text-brand" />
              <Star className="size-3.5 fill-brand text-brand" />
              <Star className="size-3.5 fill-brand text-brand" />
              <Star className="size-3.5 fill-brand text-brand" />
              <Star className="size-3.5 fill-brand text-brand" />
              <span className="ml-1">Gratuito para sempre · Sem cadastro</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-page py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Explore por categoria</h2>
          <p className="mt-3 text-muted-foreground text-pretty">
            Mais de {tools.length} ferramentas organizadas para você encontrar o que precisa rápido.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => {
            const Icon = getToolIcon(cat.icon)
            const count = tools.filter((t) => t.category === cat.slug).length
            return (
              <Link
                key={cat.slug}
                href={`/ferramentas/${cat.slug}`}
                className="group relative flex flex-col gap-4 rounded-2xl border border-border/70 bg-card p-6 transition-all hover:border-border hover:shadow-lg hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between">
                  <div className={cn("flex size-12 items-center justify-center rounded-xl ring-1", accentMap[cat.accent])}>
                    <Icon className="size-6" />
                  </div>
                  <ArrowRight className="size-5 text-muted-foreground/40 transition-all group-hover:text-foreground group-hover:translate-x-1" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{cat.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground text-pretty line-clamp-2">
                    {cat.description}
                  </p>
                </div>
                <p className="mt-auto text-xs font-medium text-muted-foreground">
                  {count} {count === 1 ? "ferramenta" : "ferramentas"}
                </p>
              </Link>
            )
          })}
          <Link
            href="/ferramentas"
            className="group relative flex flex-col gap-4 justify-center items-center rounded-2xl border border-dashed border-border bg-muted/30 p-6 text-center transition-all hover:border-brand hover:bg-brand-muted/30"
          >
            <div className="flex size-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <Sparkles className="size-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Ver todas as ferramentas</h3>
              <p className="mt-1 text-sm text-muted-foreground">Acesse a lista completa</p>
            </div>
          </Link>
        </div>
      </section>

      <div className="container-page">
        <AdBanner />
      </div>

      {/* Popular tools */}
      <section className="container-page py-16 sm:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ferramentas populares</h2>
            <p className="mt-3 text-muted-foreground text-pretty">
              As mais usadas pela comunidade Toolium.
            </p>
          </div>
          <Button asChild variant="outline" className="self-start sm:self-auto">
            <Link href="/ferramentas">
              Ver todas
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {popular.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="border-y border-border/60 bg-muted/30">
        <div className="container-page py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Por que usar o Toolium
            </h2>
            <p className="mt-3 text-muted-foreground text-pretty">
              Tudo o que você precisa, com a simplicidade que você merece.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border border-border/70 bg-card p-6 transition-colors hover:border-border"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <b.icon className="size-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold">{b.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground text-pretty">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container-page py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Como funciona</h2>
          <p className="mt-3 text-muted-foreground text-pretty">
            Três passos simples para resolver sua tarefa.
          </p>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="relative text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                <step.icon className="size-7" />
              </div>
              <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-brand">
                Passo {i + 1}
              </div>
              <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground text-pretty">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border/60 bg-muted/30">
        <div className="container-page py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Perguntas frequentes</h2>
            <p className="mt-3 text-muted-foreground text-pretty">
              Tudo o que você precisa saber sobre o Toolium.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {homeFaqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left text-base font-medium">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-pretty leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-16 sm:py-20">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-foreground text-background p-10 sm:p-16">
          <div className="absolute inset-0 bg-grid opacity-10" aria-hidden />
          <div className="absolute -right-20 -top-20 size-64 rounded-full bg-brand/30 blur-3xl" aria-hidden />
          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Comece a usar agora, é grátis
            </h2>
            <p className="mt-4 text-pretty text-background/70">
              Mais de {tools.length} ferramentas online esperando por você. Sem cadastro, sem
              complicação.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-brand text-brand-foreground hover:bg-brand/90">
                <Link href="/ferramentas">
                  Explorar ferramentas
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background">
                <Link href="/sobre">Conhecer o Toolium</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
