# Release Notes — Toolium v1.0

> Versão: **1.0.0** (Release Candidate aprovada)
> Data: Etapa 10 — Lead QA Engineer
> Domínio oficial: https://toolium.com.br

## Visão geral

O Toolium v1.0 é uma plataforma de **32 ferramentas online gratuitas** em 5 categorias (calculadoras, conversores, geradores, imagem e produtividade), construída com Next.js 16, TypeScript, Tailwind CSS 4 e shadcn/ui. 100% gratuita, sem cadastro, com processamento client-side para privacidade total.

---

## Novidades

### Plataforma
- **32 ferramentas** totalmente funcionais, organizadas em 5 categorias
- **Landing page** de alta conversão com hero, trust bar, stats, categorias, ferramentas populares, como funciona, personas, benefícios, FAQ e CTA
- **Página 404 customizada** em pt-BR com CTAs para home, busca e ferramentas populares
- **Página 500 customizada** (`error.tsx`) com botão "Tentar novamente" e link para home
- **Ferramentas relacionadas** ao final de cada ferramenta (4 cards da mesma categoria)
- **CTA final** em cada ferramenta ("Explore mais ferramentas gratuitas")
- **Loading skeleton** (`loading.tsx`) na rota de ferramenta para perceived performance

### Identidade visual
- Design premium minimalista inspirado em Vercel/Linear/Stripe
- Acento esmeralda (sem azul/índigo)
- Logo SVG próprio (marca + texto)
- Modo claro/escuro com toggle e persistência
- OG image SVG (1200×630)

---

## Melhorias

### UX (Etapa 06)
- Header sticky com dropdown de categorias (desktop) e Sheet (mobile)
- Footer com "Todas as ferramentas" + categorias + populares + institucional
- Breadcrumb em todas as páginas internas
- Botão hero refinado ("Ver categorias" em vez de "Ver calculadoras")

### Conteúdo (Etapa 05)
- 32 ferramentas auditadas (nota média 9,0/10)
- FAQ matematicamente correto (conversor-temperatura corrigido)
- Exemplos numéricos concretos em todas as ferramentas (salário-líquido, idade, moedas)
- Conteúdo original em pt-BR, sem dados inventados

---

## Correções

### v1.0 QA (Etapa 10)
- **Overflow horizontal em mobile (320-375px)** corrigido em 3 ferramentas com tabelas:
  `calculadora-financiamento`, `conversor-moedas`, `cronometro-online` — containers de tabela agora usam `overflow-auto` (horizontal + vertical) em vez de apenas `overflow-y-auto`
- **Overflow horizontal na seção "Ferramentas relacionadas"** corrigido — header agora empilha verticalmente em mobile (`flex-col sm:flex-row`), mesmo padrão já usado na home e no CTA

### SEO (Etapa 04)
- Titles duplicados "X | Toolium | Toolium" corrigidos em todas as páginas internas
- Canonical da home alinhado com sitemap
- `SearchAction` inválido removido do WebSite schema
- Schemas Organization + WebSite vinculados via `@id`
- `foundingDate` (não verificado) e `sameAs` (vazio) removidos

---

## Performance (Etapa 08)

- **Dynamic imports** no registry — cada ferramenta é um chunk separado (redução estimada de ~70% do JS por página de ferramenta)
- **Suspense boundary** com skeleton durante navegação client-side
- **Fontes self-hosted** via `next/font` (sem requisição a fonts.googleapis.com)
- **AdBanner anti-CLS** com `min-h-[96px]` (reserva espaço antes do anúncio carregar)
- SSG com `generateStaticParams` + `dynamicParams = false` (43 páginas pré-renderizadas)

### Estimativas Core Web Vitals
| Métrica | Alvo | Estimativa |
|---|---|---|
| LCP | < 2,5s | < 2,0s |
| CLS | < 0,1 | < 0,05 |
| INP | < 200ms | < 150ms |

---

## SEO (Etapa 04)

- Metadata global + por página via `buildMetadata()`
- Open Graph + Twitter Cards completos
- `robots.txt` (App Router) — 200
- `sitemap.xml` — 43 URLs, 200
- `manifest.webmanifest` — 200
- Favicon SVG — 200
- JSON-LD: Organization, WebSite, BreadcrumbList, FAQPage, HowTo, ItemList, CollectionPage
- `<html lang="pt-BR">`
- Heading hierarchy correta (H1 → H2 → H3)
- Canonical URLs consistentes

---

## Segurança (Etapa 09)

- **Content-Security-Policy** completa (12 diretivas) — protege contra XSS, clickjacking, MIME sniffing
- **X-Frame-Options: SAMEORIGIN** (anti-clickjacking)
- **X-Content-Type-Options: nosniff** (anti-MIME sniffing)
- **Referrer-Policy: strict-origin-when-cross-origin**
- **Permissions-Policy** (câmera, microfone, geolocalização, etc. bloqueados)
- **Strict-Transport-Security** (HSTS, max-age 1 ano, includeSubDomains, preload)
- **X-Powered-By removido** (`poweredByHeader: false`)
- `error.tsx` sem vazar stack traces em produção
- `.env.example` documentando variáveis
- `.gitignore` cobre `.env*`, `*.log`, `db/*.db`
- Sem `eval()` / `innerHTML` direto; `dangerouslySetInnerHTML` apenas com `JSON.stringify` de schemas fixos

---

## AdSense (Etapa 07)

- Script AdSense integrado (`ca-pub-2570963650556560`)
- **`ads.txt`** criado (`public/ads.txt`)
- **Gating por consentimento LGPD/GDPR** — script só carrega após "Aceitar" no banner de cookies
- 3 posições de anúncio por ferramenta + 1 home + 1 categoria + 1 listagem
- `preconnect` para AdSense
- Placeholder elegante em desenvolvimento

---

## Compatibilidade

- **Framework**: Next.js 16 (App Router)
- **Linguagem**: TypeScript 5 (strict)
- **Estilo**: Tailwind CSS 4 + shadcn/ui (New York, neutral)
- **Runtime**: Bun (dev), Node.js (produção standalone)
- **Deploy**: Vercel (`output: "standalone"`)
- **Navegadores**: Chrome, Firefox, Safari, Edge (navegadores modernos com suporte a ES2020+)
- **Responsividade**: 320px a 1920px (validado em 10 breakpoints)
- **Acessibilidade**: semântica HTML5, ARIA, navegação por teclado, contraste WCAG AA+

---

## Documentação

Documentação completa em `/docs` (18 arquivos):
- `00-09`: Visão, arquitetura, estrutura, componentes, dependências, rotas, SEO, AdSense, responsividade, melhorias
- `10-16`: Convenções, padrões, nomenclatura, checklists, histórico
- `RELATORIO_ETAPA_01` a `RELATORIO_ETAPA_10`: relatórios de cada etapa
- `SECURITY_AUDIT`, `PERFORMANCE_AUDIT`, `PERFORMANCE_BASELINE`, `CONTENT_AUDIT`, `QUALITY_REPORT`, `UX_AUDIT`, `ADSENSE_AUDIT`, `SEO_PLANO_DE_CORRECAO`
- `PRODUCTION_CHECKLIST`, `RELEASE_NOTES_v1.0`, `KNOWN_ISSUES`, `GO_NO_GO`

Arquivos raiz:
- `TOOLIUM_PROTOCOL.md` — Constituição do projeto
- `AI_RULES.md` — Regras obrigatórias para IAs
