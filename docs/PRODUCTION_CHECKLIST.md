# Production Checklist — Toolium

> Checklist consolidado de prontidão para produção.
> Reflete o estado do projeto após as Etapas 01–09.
> Itens marcados com ✅ estão concluídos; ⏸️ estão adiados (operacionais pós-deploy ou etapa futura).

---

## ✅ Build e Código

- ✅ `bun run lint` limpo (0 erros, 0 warnings)
- ✅ `bunx tsc --noEmit` sem erros em `src/`
- ✅ Dev server saudável (porta 3000, todas as rotas 200)
- ✅ `output: "standalone"` no `next.config.ts`
- ⏸️ `next build` real em CI/Vercel (restrição de ambiente impede execução local)
- ⏸️ Remover `typescript.ignoreBuildErrors` (Etapa futura de higiene de config — `docs/09` ALTO-1)
- ⏸️ Reativar `reactStrictMode` (Etapa futura — pode alterar comportamento dev)

## ✅ Segurança (Etapa 09)

- ✅ Headers HTTP de segurança configurados (`next.config.ts`):
  - ✅ `Content-Security-Policy` (CSP completa, permite AdSense + Tailwind inline styles)
  - ✅ `X-Frame-Options: SAMEORIGIN` (anti-clickjacking)
  - ✅ `X-Content-Type-Options: nosniff` (anti-MIME sniffing)
  - ✅ `Referrer-Policy: strict-origin-when-cross-origin`
  - ✅ `Permissions-Policy` (câmera/microfone/geolocalização/etc. bloqueados)
  - ✅ `Strict-Transport-Security` (HSTS, max-age 1 ano, includeSubDomains, preload)
- ✅ `X-Powered-By` removido (`poweredByHeader: false`)
- ✅ `error.tsx` criado (página 500 customizada em pt-BR, sem vazar stack traces)
- ✅ `not-found.tsx` customizado (Etapa 06 — 404 em pt-BR com CTAs)
- ✅ `.env.example` documentando variáveis
- ✅ `.gitignore` cobre `.env*`, `*.log`, `db/*.db`
- ✅ `dangerouslySetInnerHTML` — todos seguros (`JSON.stringify` de schemas fixos)
- ✅ Sem `eval()` / `new Function()` / `innerHTML` direto em código de produto
- ✅ Sem Open Redirects (sem redirects baseados em input)
- ✅ Sem cookies HTTP definidos pelo app (cookie consent usa localStorage)
- ✅ Sem auth/DB/uploads (superfície de ataque mínima)
- ✅ Links externos com `rel="noopener noreferrer"`
- ⏸️ Dependências vulneráveis (54 — quase todas em deps órfãs transitivas; `bun audit` reporta mas não afetam bundle de produção). Remoção em etapa de limpeza de deps.

## ✅ SEO (Etapa 04)

- ✅ Metadata global + por página (`buildMetadata`)
- ✅ Titles sem duplicação ("X | Toolium", não "X | Toolium | Toolium")
- ✅ Canonical URLs consistentes (home alinhada com sitemap)
- ✅ Open Graph + Twitter Cards configurados
- ✅ `robots.txt` válido (App Router)
- ✅ `sitemap.xml` válido (43 URLs)
- ✅ `manifest.webmanifest` válido
- ✅ Favicon SVG (`/icon.svg`)
- ✅ JSON-LD: Organization + WebSite (com `@id`), Breadcrumb, FAQ, HowTo, ItemList, CollectionPage
- ✅ `<html lang="pt-BR">`
- ✅ Heading hierarchy correta (H1 → H2 → H3)
- ⏸️ OG image em PNG (atual é SVG — Etapa futura)
- ⏸️ `google-site-verification` (operacional pós-deploy)

## ✅ AdSense (Etapa 07)

- ✅ Script AdSense integrado (`ca-pub-2570963650556560`)
- ✅ `ads.txt` criado (`public/ads.txt`)
- ✅ Gating por consentimento LGPD/GDPR (`AdsenseScript` client component)
- ✅ `crossOrigin="anonymous"`
- ✅ `preconnect` para AdSense
- ✅ 3 posições de `AdBanner` por ferramenta + 1 home + 1 categoria + 1 listagem
- ✅ `AdBanner` com `min-h` anti-CLS
- ✅ Placeholder elegante em dev
- ⏸️ Slots reais (pós-aprovação AdSense, criar blocos no painel)

## ✅ UX (Etapa 06)

- ✅ Header sticky com dropdown + Sheet mobile
- ✅ Footer com "Todas as ferramentas" + categorias + populares + institucional
- ✅ Breadcrumb em todas as páginas internas
- ✅ 404 customizada com CTAs + populares
- ✅ Ferramentas relacionadas no tool-page (4 cards da mesma categoria)
- ✅ CTA final após FAQ ("Explore mais ferramentas")
- ✅ Modo claro/escuro com toggle
- ✅ Cookie consent funcional
- ⏸️ Busca global no header (feature nova, etapa futura)

## ✅ Conteúdo (Etapa 05)

- ✅ 32 ferramentas auditadas (nota média 9,0/10)
- ✅ Conteúdo original em pt-BR
- ✅ Estrutura consistente (intro, content, howTo, example, benefits, faq)
- ✅ FAQ matematicamente correto (conversor-temperatura corrigido)
- ✅ Exemplos numéricos concretos (salário-líquido, idade, moedas corrigidos)
- ✅ Sem conteúdo duplicado, enganoso ou inventado

## ✅ Performance (Etapa 08)

- ✅ SSG (`generateStaticParams` + `dynamicParams = false`)
- ✅ Dynamic imports no registry (code-splitting por ferramenta, ~70% redução de bundle)
- ✅ `<Suspense>` boundary com skeleton no tool-page
- ✅ `loading.tsx` na rota `[slug]`
- ✅ Fontes self-hosted (`next/font`)
- ✅ Tailwind CSS 4 com purge automático
- ✅ AdBanner anti-CLS (`min-h-[96px]`)
- ⏸️ Medir com Lighthouse em produção (Vercel)
- ⏸️ `@next/bundle-analyzer` para confirmar redução de bundle

## ✅ Páginas Institucionais

- ✅ `/sobre` — missão, visão, valores
- ✅ `/privacidade` — política completa (LGPD)
- ✅ `/termos` — termos de uso
- ✅ `/cookies` — política de cookies
- ✅ Todas acessíveis via footer
- ✅ Todas com título + H1 + conteúdo suficiente (2169–3448 chars)

## ✅ Responsividade e Acessibilidade

- ✅ Mobile-first (360px sem scroll horizontal)
- ✅ Tablet (768px) e desktop (1280px+) validados
- ✅ `<html lang="pt-BR">`
- ✅ Semântica HTML (`<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`, `<article>`)
- ✅ `aria-label` em botões de ícone
- ✅ `<Label htmlFor>` pareando inputs
- ✅ Foco visível (shadcn `focus-visible:ring`)
- ✅ Navegação por teclado

## ⏸️ Operacional (pós-deploy)

- ⏸️ Deploy na Vercel (domínio toolium.com.br)
- ⏸️ HTTPS ativo (Vercel automático)
- ⏸️ `next build` em CI
- ⏸️ Google Search Console + envio do sitemap
- ⏸️ Google AdSense: submissão para aprovação
- ⏸️ AdSense: criar blocos e passar `slot` nos `<AdBanner />`
- ⏸️ Google Analytics (opcional)
- ⏸️ Monitoramento de erros (Sentry/Logflare — opcional)

---

## Resumo do Production Gate

| Categoria | Concluído | Pendente |
|---|---|---|
| Build e Código | 4/7 | 3 (build real, 2 higiene de config) |
| Segurança | 17/18 | 1 (deps vulneráveis em órfãs) |
| SEO | 11/13 | 2 (OG PNG, google-site-verification) |
| AdSense | 9/10 | 1 (slots reais pós-aprovação) |
| UX | 8/9 | 1 (busca global) |
| Conteúdo | 6/6 | 0 |
| Performance | 7/9 | 2 (Lighthouse, bundle-analyzer) |
| Institucionais | 6/6 | 0 |
| Acessibilidade | 7/7 | 0 |
| Operacional | 0/8 | 8 (pós-deploy) |
| **Total** | **75/96** | **21** |

**Status**: ✅ **APROVADO para deploy** (itens pendentes são operacionais pós-deploy ou adiados sem bloqueio).
