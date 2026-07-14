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
  title: "Política de Cookies",
  description:
    "Política de cookies do Toolium. Entenda como usamos cookies e tecnologias similares para melhorar sua experiência.",
  path: "/cookies",
})

export default function CookiesPage() {
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
            <BreadcrumbPage>Política de Cookies</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Política de Cookies</h1>
        <p className="mt-3 text-muted-foreground">Última atualização: {updated}</p>
      </header>

      <Prose className="mt-10">
        <p>
          Esta Política de Cookies explica o que são cookies, como o Toolium os utiliza e como você
          pode gerenciá-los. Para informações gerais sobre o tratamento de dados, consulte nossa{" "}
          <Link href="/privacidade">Política de Privacidade</Link>.
        </p>

        <h2>1. O que são cookies</h2>
        <p>
          Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você visita
          um site. Eles permitem que o site lembre informações sobre sua visita, como suas
          preferências e o padrão de uso.
        </p>

        <h2>2. Tipos de cookies que usamos</h2>
        <ul>
          <li>
            <strong>Cookies essenciais:</strong> necessários para o funcionamento básico do site,
            como lembrar o seu consentimento de cookies.
          </li>
          <li>
            <strong>Cookies de preferência:</strong> lembram suas escolhas, como o tema (claro ou
            escuro), para oferecer uma experiência personalizada.
          </li>
          <li>
            <strong>Cookies de análise:</strong> nos ajudam a entender como o site é usado, de forma
            agregada e anônima, para melhorá-lo continuamente.
          </li>
          <li>
            <strong>Cookies de publicidade:</strong> usados pelo Google AdSense e parceiros para
            exibir anúncios relevantes.
          </li>
        </ul>

        <h2>3. Cookies de terceiros</h2>
        <p>
          Utilizamos o Google AdSense, que pode definir cookies no seu dispositivo. O Google usa
          esses cookies para exibir anúncios com base em suas visitas anteriores ao nosso site e a
          outros sites. Você pode gerenciar as configurações de publicidade do Google em{" "}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
            Configurações de anúncios do Google
          </a>
          .
        </p>

        <h2>4. Gerenciamento de cookies</h2>
        <p>
          Você pode aceitar ou recusar cookies por meio do banner de consentimento exibido em sua
          primeira visita. Cookies essenciais não podem ser desativados, pois são necessários para
          o funcionamento do site.
        </p>
        <p>
          Além disso, você pode gerenciar ou excluir cookies diretamente nas configurações do seu
          navegador. Cada navegador tem um procedimento diferente; consulte a ajuda do seu navegador
          para instruções. Desativar cookies pode afetar a funcionalidade do site.
        </p>

        <h2>5. Armazenamento local</h2>
        <p>
          Algumas ferramentas, como o checklist online, utilizam o armazenamento local do navegador
          (localStorage) para salvar suas informações. Esses dados permanecem apenas no seu
          dispositivo e não são enviados para servidores. Você pode limpá-los nas configurações do
          navegador.
        </p>

        <h2>6. Atualizações desta política</h2>
        <p>
          Podemos atualizar esta Política de Cookies periodicamente. Alterações significativas
          serão refletidas na data de atualização no topo desta página.
        </p>
      </Prose>
    </div>
  )
}
