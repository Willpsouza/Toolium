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
  title: "Termos de Uso",
  description:
    "Termos de uso do Toolium. Conheça as regras e condições para utilizar nossas ferramentas online gratuitas.",
  path: "/termos",
})

export default function TermsPage() {
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
            <BreadcrumbPage>Termos de Uso</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Termos de Uso</h1>
        <p className="mt-3 text-muted-foreground">Última atualização: {updated}</p>
      </header>

      <Prose className="mt-10">
        <p>
          Estes Termos de Uso (&ldquo;Termos&rdquo;) regem o acesso e o uso do site toolium.com.br
          (&ldquo;Toolium&rdquo; ou &ldquo;plataforma&rdquo;). Ao acessar ou usar a plataforma,
          você concorda com estes Termos. Se você não concorda, não utilize a plataforma.
        </p>

        <h2>1. Uso das ferramentas</h2>
        <p>
          O Toolium oferece ferramentas online gratuitas para uso pessoal e profissional. Você se
          compromete a utilizá-las de maneira lícita e responsável. As ferramentas são fornecidas
          &ldquo;como estão&rdquo; e devem ser usadas por sua conta e risco.
        </p>

        <h2>2. Precisão dos resultados</h2>
        <p>
          Buscamos oferecer resultados corretos, mas não garantimos que sejam totalmente precisos,
          completos ou adequados para todos os fins. Para decisões importantes — como financeiras,
          jurídicas ou de saúde —, consulte sempre um profissional qualificado. As ferramentas não
          constituem aconselhamento profissional.
        </p>

        <h2>3. Privacidade</h2>
        <p>
          O tratamento dos seus dados está descrito em nossa{" "}
          <Link href="/privacidade">Política de Privacidade</Link> e em nossa{" "}
          <Link href="/cookies">Política de Cookies</Link>.
        </p>

        <h2>4. Propriedade intelectual</h2>
        <p>
          O conteúdo da plataforma — incluindo textos, layout, design e marca — é protegido por
          direitos autorais e outras leis de propriedade intelectual. Você não pode copiar,
          reproduzir ou distribuir o conteúdo sem autorização.
        </p>

        <h2>5. Conduta do usuário</h2>
        <p>Você concorda em não:</p>
        <ul>
          <li>Utilizar a plataforma para fins ilícitos ou prejudiciais;</li>
          <li>Tentar acessar sistemas ou dados não autorizados;</li>
          <li>Interferir no funcionamento normal da plataforma;</li>
          <li>Utilizar robôs, scripts ou ferramentas automatizadas de forma abusiva.</li>
        </ul>

        <h2>6. Anúncios</h2>
        <p>
          A plataforma exibe anúncios de terceiros, incluindo o Google AdSense. Não somos
          responsáveis pelo conteúdo dos anúncios exibidos.
        </p>

        <h2>7. Limitação de responsabilidade</h2>
        <p>
          Na máxima extensão permitida pela lei, o Toolium não será responsável por quaisquer
          danos diretos, indiretos, incidentais ou consequentes decorrentes do uso ou da
          impossibilidade de uso da plataforma.
        </p>

        <h2>8. Alterações nos serviços e nos Termos</h2>
        <p>
          Podemos modificar, suspender ou descontinuar ferramentas a qualquer momento. Também
          podemos atualizar estes Termos periodicamente. O uso continuado da plataforma após
          alterações constitui aceitação dos novos Termos.
        </p>

        <h2>9. Links para terceiros</h2>
        <p>
          A plataforma pode conter links para sites de terceiros. Não somos responsáveis pelo
          conteúdo ou pelas práticas desses sites.
        </p>

        <h2>10. Legislação aplicável</h2>
        <p>
          Estes Termos são regidos pelas leis da República Federativa do Brasil. Qualquer
          litígio será dirimido no foro competente.
        </p>

        <h2>11. Contato</h2>
        <p>
          Em caso de dúvidas sobre estes Termos, entre em contato conosco.
        </p>
      </Prose>
    </div>
  )
}
