import Link from "next/link"
import type { Metadata } from "next"
import { ChevronRight, Target, Eye, Heart, ShieldCheck, Gift, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Prose } from "@/components/layout/prose"
import { buildMetadata } from "@/lib/seo"
import { tools } from "@/data/tools"
import { categories } from "@/data/categories"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export const metadata = buildMetadata({
  title: "Sobre o Toolium",
  description:
    "Conheça o Toolium: uma plataforma de ferramentas online gratuitas, rápidas e sem cadastro, criada para facilitar o dia a dia de milhões de pessoas.",
  path: "/sobre",
})

const values = [
  {
    icon: Gift,
    title: "Gratuito para sempre",
    description: "Acreditamos que boas ferramentas devem ser acessíveis a todos, sem custo.",
  },
  {
    icon: Zap,
    title: "Simplicidade",
    description: "Cada ferramenta é direta e resolve uma tarefa sem etapas desnecessárias.",
  },
  {
    icon: ShieldCheck,
    title: "Privacidade",
    description: "Processamos o máximo possível no seu navegador. Seus dados são seus.",
  },
  {
    icon: Heart,
    title: "Feito com cuidado",
    description: "Cuidamos de cada detalhe para entregar uma experiência agradável.",
  },
]

export default function AboutPage() {
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
            <BreadcrumbPage>Sobre</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
          Sobre o Toolium
        </h1>
        <p className="mt-3 text-lg text-muted-foreground text-pretty">
          Ferramentas digitais simples, rápidas e gratuitas para facilitar tarefas do dia a dia.
        </p>
      </header>

      <Prose className="mt-10">
        <p>
          O <strong>Toolium</strong> nasceu de uma ideia simples: reunir, em um só lugar, as
          ferramentas online que as pessoas precisam usar no dia a dia — sem cobrança, sem
          cadastro e sem complicação. São mais de {tools.length} ferramentas distribuídas em{" "}
          {categories.length} categorias: calculadoras, conversores, geradores, ferramentas de
          imagem e de produtividade.
        </p>
        <p>
          Acreditamos que a tecnologia deve servir para simplificar a vida. Por isso, cada
          ferramenta é pensada para ser direta: você abre, usa e segue. Sem instalação, sem
          criar conta, sem perder tempo.
        </p>

        <h2>
          <Target className="inline size-5 mr-2 -mt-1 text-brand" />
          Nosso objetivo
        </h2>
        <p>
          Oferecer um conjunto de ferramentas online gratuitas, rápidas e confiáveis que qualquer
          pessoa possa usar, em qualquer dispositivo, a qualquer momento. Queremos ser a primeira
          opção quando alguém precisa resolver uma tarefa rápida na internet.
        </p>

        <h2>
          <Eye className="inline size-5 mr-2 -mt-1 text-brand" />
          Nossa visão
        </h2>
        <p>
          Ser a plataforma de referência em ferramentas online gratuitas no Brasil, reconhecida
          pela qualidade, velocidade e respeito ao usuário. Planejamos evoluir continuamente,
          adicionando novas ferramentas e melhorando as existentes com base no feedback da
          comunidade.
        </p>
      </Prose>

      <section className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Nossos valores</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-border/70 bg-card p-6">
              <div className="flex size-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <v.icon className="size-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold">{v.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground text-pretty">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      <Prose className="mt-12">
        <h2>Compromisso com os usuários</h2>
        <ul>
          <li>
            <strong>Transparência:</strong> nossas políticas de privacidade e cookies são claras e
            acessíveis.
          </li>
          <li>
            <strong>Privacidade:</strong> sempre que possível, processamos os dados no seu
            navegador. Ferramentas de imagem, por exemplo, nunca enviam seus arquivos para
            servidores.
          </li>
          <li>
            <strong>Qualidade:</strong> cada ferramenta é testada e revisada para garantir
            resultados corretos.
          </li>
          <li>
            <strong>Acessibilidade:</strong> buscamos seguir as boas práticas de acessibilidade para
            que todos possam usar.
          </li>
        </ul>
      </Prose>

      <div className="mt-12 rounded-2xl border border-border bg-muted/30 p-8 text-center">
        <h2 className="text-xl font-semibold tracking-tight">Pronto para começar?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Explore todas as ferramentas gratuitas do Toolium.
        </p>
        <Button asChild className="mt-4 bg-brand text-brand-foreground hover:bg-brand/90">
          <Link href="/ferramentas">Explorar ferramentas</Link>
        </Button>
      </div>
    </div>
  )
}
