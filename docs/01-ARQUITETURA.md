# 01 — Arquitetura

> Documento de auditoria. Descreve **como o projeto está estruturado conceitualmente**.

## Padrão arquitetural

O Toolium usa o **App Router do Next.js 16** com renderização predominantemente **estática (SSG)**.

### Estratégia de renderização

- **Páginas institucionais e home**: Server Components estáticos, gerados no build.
- **Páginas de ferramenta** (`src/app/[slug]/page.tsx`): rota dinâmica com `generateStaticParams()` + `dynamicParams = false` → **todas as 32 ferramentas são pré-renderizadas estaticamente** no build.
- **Páginas de categoria** (`src/app/ferramentas/[categoria]/page.tsx`): mesmo padrão, 5 categorias pré-renderizadas.
- **Componentes das ferramentas** (`src/components/tools/...`): todos `"use client"` — a interatividade roda no navegador; o conteúdo editorial (explicação, FAQ, etc.) é Server Component.

### Fluxo de uma página de ferramenta

```
src/app/[slug]/page.tsx          (Server Component, rota dinâmica)
  ├─ generateStaticParams()      → lista os 32 slugs
  ├─ generateMetadata()          → metadata SEO via buildMetadata()
  └─ <ToolPage tool={tool} />    (src/components/tools/tool-page.tsx)
       ├─ Breadcrumb
       ├─ <ToolComponent />       → registry.tsx mapeia slug → componente client
       ├─ AdBanner (3 posições)
       ├─ Conteúdo editorial (Server Component)
       ├─ FaqSection
       └─ JSON-LD scripts (Breadcrumb, FAQ, HowTo)
```

## Camadas

```
┌─────────────────────────────────────────────────┐
│  app/  (rotas — Server Components)              │
│   • layout.tsx, page.tsx                        │
│   • [slug]/, ferramentas/, sobre/, etc.         │
├─────────────────────────────────────────────────┤
│  components/                                     │
│   • layout/   (header, footer, tema)            │
│   • tools/    (registry, tool-page, 32 tools)   │
│   • ads/      (AdBanner)                        │
│   • ui/       (shadcn/ui — 49 componentes)      │
│   • cookie-consent.tsx                          │
├─────────────────────────────────────────────────┤
│  data/   (categorias.ts, tools.ts — fonte única)│
│  lib/    (seo, schema, icons, format, utils, db)│
│  hooks/  (use-toast, use-mobile)                │
└─────────────────────────────────────────────────┘
```

## Fonte única de dados

Toda a metadata das ferramentas (slug, título, descrição, keywords, conteúdo editorial, FAQ, how-to, exemplo, benefícios) vive em **`src/data/tools.ts`** — um único arquivo com o array `tools` (32 entradas). As categorias vivem em **`src/data/categories.ts`**.

Isso significa:
- As rotas consomem `tools.ts` via `getTool()`, `getToolsByCategory()`, `getPopularTools()`, `getAllSlugs()`.
- O registry (`src/components/tools/registry.tsx`) mapeia cada slug ao seu componente client correspondente.
- Não há banco de dados em uso pelo produto (apesar de Prisma estar configurado — ver `04-DEPENDENCIAS.md`).

## Sistema de temas

- `next-themes` com `attribute="class"`, `defaultTheme="system"`, `enableSystem`;
- `ThemeProvider` envolve a app no `layout.tsx`;
- Tokens CSS (oklch) definidos em `src/app/globals.css` para `:root` (claro) e `.dark` (escuro);
- `ThemeToggle` alterna e persiste a preferência via `next-themes` (localStorage).

## Sistema de anúncios

- Script AdSense carregado uma vez no `layout.tsx`;
- `AdBanner` detecta `window.adsbygoogle` e injeta `<ins>` quando disponível; em desenvolvimento mostra placeholder;
- 3 instâncias de `AdBanner` por página de ferramenta.

## SEO

- Metadata global no `layout.tsx` + helper `buildMetadata()` em `src/lib/seo.ts` para metadata por página;
- `src/app/sitemap.ts` e `src/app/robots.ts` (App Router metadata routes);
- JSON-LD em `src/lib/schema.ts`: WebSite, Organization, Breadcrumb, FAQ, HowTo, ItemList, CollectionPage;
- `src/app/manifest.ts` para PWA manifest.

## Gateway / proxy

- `Caddyfile` na raiz configura o reverse proxy na porta 81:
  - Queries com `XTransformPort=` → proxy para a porta especificada;
  - Demais requisições → `localhost:3000` (app Next.js).
- O Toolium em si não usa websockets nem mini-serviços; toda a lógica é client-side.

## Decisões arquiteturais relevantes

| Decisão | Justificativa observada |
|---|---|
| SSG com `dynamicParams = false` | Performance e SEO — páginas estáticas, sem runtime server |
| Ferramentas 100% client-side | Privacidade (especialmente imagem/hash/senhas) + zero custo de servidor |
| Conteúdo editorial no `tools.ts` | Single source of truth; SEO e UI consomem os mesmos dados |
| `ignoreBuildErrors: true` no next.config | Mascara erros de tipo no build (ver relatório — risco) |
| Sem banco de dados em uso | Apesar do Prisma configurado, o produto não persiste nada |
