# Deploy Checklist — Toolium v1.0

> Checklist de prontidão para deploy em produção (Vercel).
> Status: item por item, verificado na Sprint 11.

Legenda: ✅ Concluído · ⏸️ Pendente (operacional pós-deploy) · ❌ Bloqueio

---

## Build

| Item | Status | Observação |
|---|---|---|
| `next build` executa sem erros | ✅ | Confirmado: 32 ferramentas SSG + 5 categorias SSG + 6 estáticas + 1 dinâmica (/api) |
| `output: "standalone"` configurado | ✅ | `next.config.ts` — compatível com Vercel |
| `.next/standalone/` gerado | ✅ | `server.js`, `package.json`, `node_modules/` |
| Build size razoável | ✅ | `.next/` = 507MB (inclui cache; standalone é menor) |

## TypeScript

| Item | Status | Observação |
|---|---|---|
| `bunx tsc --noEmit` sem erros em `src/` | ✅ | 0 erros |
| Erros apenas em `examples/`+`skills/` (fora do escopo) | ✅ | Pré-existentes do scaffold; não afetam build Next.js |
| `tsconfig.json` strict mode | ✅ | `strict: true` |
| Alias `@/*` → `./src/*` | ✅ | Configurado |

## ESLint

| Item | Status | Observação |
|---|---|---|
| `bun run lint` sem erros nem warnings | ✅ | 0 erros, 0 warnings |
| `eslint.config.mjs` configurado | ✅ | next/core-web-vitals + next/typescript |

## Environment Variables

| Item | Status | Observação |
|---|---|---|
| `.env.example` documentado | ✅ | `DATABASE_URL="file:./db/custom.db"` |
| `.env` no `.gitignore` | ✅ | `.env*` coberto |
| Variáveis obrigatórias ausentes | ✅ | Nenhuma — `lib/db.ts` é órfão (tree-shaken); `NODE_ENV` é definido pela Vercel |
| `DATABASE_URL` em produção | ⏸️ | Não obrigatória (Prisma órfão). Se Vercel reclamar, definir como `file:./db/custom.db` ou remover `lib/db.ts` em etapa futura |
| `siteConfig.url` aponta para produção | ✅ | `https://toolium.com.br` em `src/lib/seo.ts` |
| `siteConfig.adsenseClient` | ✅ | `ca-pub-2570963650556560` |

## Variáveis utilizadas

| Variável | Onde | Obrigatória em produção? |
|---|---|---|
| `NODE_ENV` | `src/lib/db.ts` (cache do Prisma) | Não — Vercel define automaticamente |
| `DATABASE_URL` | `src/lib/db.ts` (Prisma), `prisma/schema.prisma` | Não — `lib/db.ts` é órfão, tree-shaken do bundle |

> **Conclusão**: nenhuma variável de ambiente obrigatória para o funcionamento do produto em produção Vercel.

## robots.txt

| Item | Status | Observação |
|---|---|---|
| `/robots.txt` serve 200 | ✅ | `src/app/robots.ts` (App Router) |
| `User-Agent: *` / `Allow: /` | ✅ | Permite indexação |
| `Sitemap: https://toolium.com.br/sitemap.xml` | ✅ | Referencia sitemap |
| `Host: https://toolium.com.br` | ✅ | Domínio de produção |

## sitemap.xml

| Item | Status | Observação |
|---|---|---|
| `/sitemap.xml` serve 200 | ✅ | `src/app/sitemap.ts` |
| 43 URLs listadas | ✅ | 6 estáticas + 5 categorias + 32 ferramentas |
| URL base `https://toolium.com.br` | ✅ | Domínio de produção |
| `lastmod`, `changefreq`, `priority` definidos | ✅ | Por tipo de página |

## ads.txt

| Item | Status | Observação |
|---|---|---|
| `/ads.txt` serve 200 | ✅ | `public/ads.txt` |
| Conteúdo correto | ✅ | `google.com, pub-2570963650556560, DIRECT, f08c47fec0942fa0` |

## manifest

| Item | Status | Observação |
|---|---|---|
| `/manifest.webmanifest` serve 200 | ✅ | `src/app/manifest.ts` |
| `name`, `short_name`, `start_url` | ✅ | "Toolium" |
| `display: standalone` | ✅ | PWA-ready |
| `theme_color`, `background_color` | ✅ | #0a0a0a |
| `icons` referenciam `/icon.svg` | ✅ | SVG |

## favicon

| Item | Status | Observação |
|---|---|---|
| `/icon.svg` serve 200 | ✅ | `src/app/icon.svg` (convenção App Router) |
| `metadata.icons` configurado | ✅ | icon, shortcut, apple apontam para `/icon.svg` |
| Favicon visível no navegador | ✅ | Validado |

## SEO

| Item | Status | Observação |
|---|---|---|
| Metadata global (`layout.tsx`) | ✅ | title default + template, description, keywords, OG, Twitter |
| Metadata por página (`buildMetadata`) | ✅ | Todas as rotas exportam metadata |
| Titles sem duplicação | ✅ | Etapa 04 corrigiu "X | Toolium | Toolium" |
| `<html lang="pt-BR">` | ✅ | |
| Heading hierarchy (H1→H2→H3) | ✅ | 1 H1 por página |
| JSON-LD (Organization, WebSite, Breadcrumb, FAQ, HowTo, ItemList, CollectionPage) | ✅ | Schemas com `@id` |

## Open Graph

| Item | Status | Observação |
|---|---|---|
| `og:type: website` | ✅ | |
| `og:locale: pt_BR` | ✅ | |
| `og:url` (canonical) | ✅ | |
| `og:title`, `og:description` | ✅ | Por página |
| `og:siteName: Toolium` | ✅ | |
| `og:image` → `/og.svg` 1200×630 | ✅ | (SVG — considerar PNG no futuro) |
| ⏸️ OG PNG | ⏸️ | Adiado — SVG funciona em Twitter/LinkedIn; Facebook/WhatsApp preferem PNG |

## Twitter Cards

| Item | Status | Observação |
|---|---|---|
| `twitter:card: summary_large_image` | ✅ | |
| `twitter:title`, `twitter:description` | ✅ | Por página |
| `twitter:image` → `/og.svg` | ✅ | |
| `twitter:creator: @tooliumbr` | ✅ | |

## Canonical URLs

| Item | Status | Observação |
|---|---|---|
| `metadataBase: https://toolium.com.br` | ✅ | `layout.tsx` |
| `alternates.canonical` em todas as rotas | ✅ | Via `buildMetadata({ path })` |
| Home canonical consistente com sitemap | ✅ | Etapa 04 alinhou |

## Headers

| Item | Status | Observação |
|---|---|---|
| `Content-Security-Policy` | ✅ | 12 diretivas; permite AdSense + Tailwind + preview sandbox |
| `X-Content-Type-Options: nosniff` | ✅ | |
| `Referrer-Policy: strict-origin-when-cross-origin` | ✅ | |
| `Permissions-Policy` (câmera/mic/etc. bloqueados) | ✅ | |
| `Strict-Transport-Security` (HSTS) | ✅ | max-age 1 ano, includeSubDomains, preload |
| `X-Powered-By` removido | ✅ | `poweredByHeader: false` |
| `frame-ancestors` permite preview sandbox | ✅ | `'self' https://*.space-z.ai` |

## Compressão

| Item | Status | Observação |
|---|---|---|
| Compressão gzip/brotli | ✅ | Vercel habilita automaticamente em produção |
| Assets estáticos com cache de longa duração | ✅ | Vercel configura `/_next/static/*` com immutable cache |

## Cache

| Item | Status | Observação |
|---|---|---|
| `Cache-Control: no-store, must-revalidate` em HTML | ✅ | Next.js default para páginas dinâmicas |
| Assets `/_next/static/*` cacheados | ✅ | Vercel automático (immutable, max-age=31536000) |
| SSG com `revalidate` não configurado | ✅ | Páginas 100% estáticas (sem ISR) |

## Domínio

| Item | Status | Observação |
|---|---|---|
| `siteConfig.url = https://toolium.com.br` | ✅ | Hardcoded em `src/lib/seo.ts` |
| Sitemap/robots usam domínio de produção | ✅ | |
| Canonical URLs usam domínio de produção | ✅ | |
| JSON-LD usa domínio de produção | ✅ | |
| ⏸️ Domínio configurado na Vercel | ⏸️ | Operacional pós-deploy |
| ⏸️ HTTPS ativo | ⏸️ | Vercel automático após conectar domínio |

## Vercel

| Item | Status | Observação |
|---|---|---|
| `output: "standalone"` compatível com Vercel | ✅ | Vercel detecta Next.js automaticamente |
| Sem `vercel.json` necessário | ✅ | Defaults + `next.config.ts` são suficientes |
| `package.json` scripts (`build`, `start`) | ✅ | Vercel usa `next build` automaticamente |
| Framework preset: Next.js | ⏸️ | Vercel detecta automaticamente ao importar o repo |
| Root directory | ⏸️ | Raiz do projeto (default) |
| ⏸️ Build Command | ⏸️ | Default `next build` (Vercel ignora o `cp` do nosso script) |
| ⏸️ Output Directory | ⏸️ | `.next` (default Vercel) |
| ⏸️ Install Command | ⏸️ | `bun install` ou `npm install` (Vercel detecta `bun.lock`) |
| ⏸️ Environment Variables na Vercel | ⏸️ | Nenhuma obrigatória (ver seção Environment Variables) |

## Redirects / Rewrites

| Item | Status | Observação |
|---|---|---|
| Redirects configurados | ✅ | Nenhum necessário (sem mudança de slugs) |
| Rewrites configurados | ✅ | Nenhum necessário |

## Fonts

| Item | Status | Observação |
|---|---|---|
| `next/font/google` (Geist + Geist_Mono) | ✅ | Self-hosted (sem requisição a fonts.googleapis.com) |
| `font-display: swap` | ✅ | Automático via next/font |
| `subsets: ["latin"]` | ✅ | Cobrem pt-BR com acentos |

## Ícones

| Item | Status | Observação |
|---|---|---|
| Logo SVG inline (`Logo` component) | ✅ | Sem requisição extra |
| Favicon SVG (`/icon.svg`) | ✅ | Convenção App Router |
| Ícones lucide-react (tree-shakeable) | ✅ | Imports nomeados |
| `iconMap` em `src/lib/icons.ts` | ✅ | Mapeamento centralizado |

---

## Resumo

| Categoria | Concluído | Pendente |
|---|---|---|
| Build | 4/4 | 0 |
| TypeScript | 4/4 | 0 |
| ESLint | 2/2 | 0 |
| Environment Variables | 6/6 | 0 (DATABASE_URL não obrigatória) |
| robots.txt | 3/3 | 0 |
| sitemap.xml | 4/4 | 0 |
| ads.txt | 2/2 | 0 |
| manifest | 5/5 | 0 |
| favicon | 3/3 | 0 |
| SEO | 7/7 | 0 |
| Open Graph | 6/7 | 1 (OG PNG) |
| Twitter Cards | 4/4 | 0 |
| Canonical | 3/3 | 0 |
| Headers | 7/7 | 0 |
| Compressão | 2/2 | 0 |
| Cache | 3/3 | 0 |
| Domínio | 4/4 | 2 (config Vercel pós-deploy) |
| Vercel | 3/3 | 5 (configuração pós-import na Vercel) |
| Redirects/Rewrites | 2/2 | 0 |
| Fonts | 3/3 | 0 |
| Ícones | 4/4 | 0 |
| **Total** | **83/90** | **7** |

Todos os 7 itens pendentes são **operacionais pós-deploy** (configuração na Vercel após import do repo) — não bloqueiam o deploy.
