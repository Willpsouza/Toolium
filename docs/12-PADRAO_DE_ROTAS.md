# 12 — Padrão de Rotas

> Como rotas são estruturadas no Toolium. Padrões de fato, normativos a partir da Etapa 02.

## Convenções do App Router

- Cada pasta em `src/app/` é um segmento de URL;
- `page.tsx` define a UI da rota;
- `layout.tsx` envolve rotas filhas (apenas `src/app/layout.tsx` existe hoje — raiz);
- `loading.tsx`/`error.tsx`/`not-found.tsx` não são usados (sem necessidade atual);
- `icon.svg`, `manifest.ts`, `robots.ts`, `sitemap.ts` usam convenções nativas de metadata do Next.js.

## Tipos de rota no Toolium

### Estáticas (Server Component)

| URL | Arquivo | Geração |
|---|---|---|
| `/` | `src/app/page.tsx` | SSG |
| `/ferramentas` | `src/app/ferramentas/page.tsx` | SSG |
| `/sobre` | `src/app/sobre/page.tsx` | SSG |
| `/privacidade` | `src/app/privacidade/page.tsx` | SSG |
| `/termos` | `src/app/termos/page.tsx` | SSG |
| `/cookies` | `src/app/cookies/page.tsx` | SSG |

### Dinâmicas (SSG com `generateStaticParams`)

| URL | Arquivo | Params | Quantidade |
|---|---|---|---|
| `/<slug>` | `src/app/[slug]/page.tsx` | `slug` (de `tools.ts`) | 32 rotas |
| `/ferramentas/<categoria>` | `src/app/ferramentas/[categoria]/page.tsx` | `categoria` (de `categories.ts`) | 5 rotas |

Ambas com `export const dynamicParams = false` → slugs/parâmetros fora da lista gerada retornam **404** (não SSR fallback).

### Metadata routes

| URL | Arquivo |
|---|---|
| `/sitemap.xml` | `src/app/sitemap.ts` |
| `/robots.txt` | `src/app/robots.ts` |
| `/manifest.webmanifest` | `src/app/manifest.ts` |
| `/icon.svg` | `src/app/icon.svg` (favicon, convenção App Router) |

### API

| URL | Arquivo | Estado |
|---|---|---|
| `/api` | `src/app/api/route.ts` | ⚠️ Órfão (retorna Hello world) — ver `docs/09` |

## Padrão de uma rota dinâmica de ferramenta

```tsx
// src/app/[slug]/page.tsx
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { tools, getTool } from "@/data/tools"
import { ToolPage, buildToolMetadata } from "@/components/tools/tool-page"

export const dynamicParams = false

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }))
}

export function generateMetadata({ params }): Promise<Metadata> {
  return params.then((p) => {
    const tool = getTool(p.slug)
    if (!tool) return {}
    return buildToolMetadata(tool)
  })
}

export default async function ToolRoute({ params }) {
  const { slug } = await params
  const tool = getTool(slug)
  if (!tool) notFound()
  return <ToolPage tool={tool} />
}
```

### Regras da rota de ferramenta

1. `dynamicParams = false` (404 para slugs desconhecidos);
2. `generateStaticParams` lê `tools.map(t => ({ slug: t.slug }))`;
3. `generateMetadata` retorna `buildToolMetadata(tool)` ou `{}` se não existir;
4. Página default: `await params` (Next.js 16 — params é Promise), `getTool(slug)`, `notFound()` se ausente, renderiza `<ToolPage tool={tool} />`.

## Padrão de metadata por rota

- **Estática**: `export const metadata = buildMetadata({ ... })`;
- **Dinâmica**: `export function generateMetadata({ params }): Promise<Metadata>`;
- Sempre passar `path` (canonical), `title`, `description`, `keywords`.

## Links internos

- Sempre `<Link href="/caminho">` do `next/link`;
- **Sempre caminho relativo** (nunca `http://localhost:3000/...`);
- Para serviços em outra porta via gateway: `href="/api/...?XTransformPort=NNNN"` (o Toolium não usa hoje).

## Adicionar uma nova rota

1. Criar pasta em `src/app/<segmento>/page.tsx`;
2. Exportar `metadata` (estática) ou `generateMetadata` (dinâmica);
3. Default export = componente da página;
4. Se dinâmica: `generateStaticParams` + `dynamicParams = false`;
5. Adicionar ao `sitemap.ts` se for pública;
6. Adicionar link no header/footer/home conforme relevância;
7. Atualizar `docs/05-ROTAS.md` e `docs/16-HISTORICO_DE_ALTERACOES.md`.

## Rotas e SEO

- Toda rota pública está no `sitemap.ts` com `priority` adequado;
- `robots.ts` permite tudo (`Allow: /`);
- `canonical` sempre setado via `buildMetadata({ path })`;
- Slugs em **kebab-case**, estáveis (renomear = quebrar SEO — só com redirect).

## Layout raiz (`src/app/layout.tsx`)

Envolve **todas** as rotas com:
- `<html lang="pt-BR" suppressHydrationWarning>` + `<head>` (preconnect AdSense, JSON-LD global);
- `<body>` com fontes Geist + classes base;
- `ThemeProvider` (next-themes);
- `<div className="relative flex min-h-screen flex-col">` → `SiteHeader` + `<main className="flex-1">` + `SiteFooter`;
- `CookieConsent`, `Toaster`;
- Script AdSense (`next/script`, `afterInteractive`).

**Não modificar** a estrutura do layout raiz sem aprovação do Arquiteto — afeta todas as páginas.

## 404 / not-found

- `notFound()` do `next/navigation` é chamado em rotas dinâmicas quando slug/categoria não existe;
- Não há `not-found.tsx` customizado hoje (usa default do Next.js). Se adicionado, colocar em `src/app/not-found.tsx`.
