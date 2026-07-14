import Link from "next/link"
import type { Metadata } from "next"
import { ChevronRight } from "lucide-react"
import { Prose } from "@/components/layout/prose"
import { buildMetadata } from "@/lib/seo"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export const metadata = buildMetadata({
  title: "Política de Privacidade",
  description:
    "Política de privacidade do Toolium. Saiba como tratamos seus dados e protegemos sua privacidade ao usar nossas ferramentas online.",
  path: "/privacidade",
})

export default function PrivacyPage() {
  const updated = "janeiro de 2025"

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
            <BreadcrumbPage>Política de Privacidade</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Política de Privacidade
        </h1>
        <p className="mt-3 text-muted-foreground">Última atualização: {updated}</p>
      </header>

      <Prose className="mt-10">
        <p>
          O Toolium (&ldquo;nós&rdquo;, &ldquo;nosso&rdquo; ou &ldquo;plataforma&rdquo;) respeita a
          sua privacidade e está comprometido em protegê-la. Esta Política de Privacidade explica
          como coletamos, usamos e protegemos as informações quando você utiliza nosso site
          toolium.com.br.
        </p>

        <h2>1. Informações que coletamos</h2>
        <p>
          O Toolium foi projetado para coletar o mínimo de informações possível. A maioria das
          nossas ferramentas funciona inteiramente no seu navegador, sem enviar dados para
          servidores. Em particular:
        </p>
        <ul>
          <li>
            <strong>Ferramentas de imagem</strong> (compressão, conversão e redimensionamento)
            processam seus arquivos localmente. Suas imagens não são enviadas para nenhum servidor.
          </li>
          <li>
            <strong>Geradores</strong> (senhas, QR Codes, hashes, cores) funcionam no seu
            navegador.
          </li>
          <li>
            <strong>Calculadoras e conversores</strong> processam apenas os valores que você
            informa, localmente.
          </li>
        </ul>
        <p>
          Coletamos dados agregados e anônimos sobre o uso do site (como páginas visitadas e
          dispositivo) por meio de ferramentas de análise, com o objetivo de melhorar a experiência.
        </p>

        <h2>2. Cookies e tecnologias similares</h2>
        <p>
          Usamos cookies para lembrar suas preferências (como o tema claro ou escuro) e para exibir
          anúncios relevantes. Você pode gerenciar suas preferências de cookies por meio do banner
          de consentimento exibido em sua primeira visita ou a qualquer momento nas configurações do
          seu navegador. Para mais detalhes, consulte nossa{" "}
          <Link href="/cookies">Política de Cookies</Link>.
        </p>

        <h2>3. Anúncios do Google AdSense</h2>
        <p>
          Exibimos anúncios por meio do Google AdSense. O Google e seus parceiros podem usar
          cookies para exibir anúncios com base em suas visitas anteriores ao nosso site ou a outros
          sites. O uso de cookies de publicidade pelo Google permite que ele e seus parceiros
          exibam anúncios com base em suas visitas aos sites.
        </p>
        <ul>
          <li>
            Os cookies de publicidade do Google podem ser gerenciados em{" "}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
              Configurações de anúncios do Google
            </a>
            .
          </li>
          <li>
            Você pode aprender mais sobre a publicidade do Google acessando{" "}
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
            >
              Políticas de Tecnologias de Publicidade do Google
            </a>
            .
          </li>
        </ul>

        <h2>4. Como usamos as informações</h2>
        <ul>
          <li>Para fornecer, manter e melhorar nossas ferramentas;</li>
          <li>Para entender como o site é usado e aprimorar a experiência;</li>
          <li>Para detectar e prevenir fraudes e abusos;</li>
          <li>Para exibir anúncios relevantes.</li>
        </ul>

        <h2>5. Compartilhamento de informações</h2>
        <p>
          Não vendemos suas informações. Compartilhamos dados apenas com provedores de serviços que
          nos auxiliam na operação (como o Google AdSense), nas condições descritas nesta política
          e conforme exigido por lei.
        </p>

        <h2>6. Seus direitos</h2>
        <p>
          Conforme a Lei Geral de Proteção de Dados (LGPD), você tem direito a acessar, corrigir,
          excluir ou portar seus dados pessoais. Para exercer esses direitos, entre em contato
          conosco pelo nosso formulário de contato.
        </p>

        <h2>7. Segurança</h2>
        <p>
          Adotamos medidas técnicas e organizacionais para proteger suas informações. No entanto,
          nenhum sistema é totalmente seguro, e não podemos garantir segurança absoluta.
        </p>

        <h2>8. Links para sites de terceiros</h2>
        <p>
          Nosso site pode conter links para sites de terceiros. Não somos responsáveis pelas
          práticas de privacidade desses sites. Recomendamos que você leia as políticas de
          privacidade de cada site que visitar.
        </p>

        <h2>9. Alterações nesta política</h2>
        <p>
          Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos alterações
          significativas publicando a nova política com a data de atualização revisada nesta página.
        </p>

        <h2>10. Contato</h2>
        <p>
          Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco.
        </p>
      </Prose>
    </div>
  )
}
