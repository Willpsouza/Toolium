# 06 — SEO

> Documento de auditoria. Estado da configuração SEO do projeto.

## Metadata global (`src/app/layout.tsx`)

| Campo | Valor |
|---|---|
| `title.default` | "Toolium — Ferramentas online gratuitas" |
| `title.template` | "%s \| Toolium" |
| `description` | siteConfig.description |
| `keywords` | siteConfig.keywords (9 termos) |
| `metadataBase` | `https://toolium.com.br` |
| `applicationName` | "Toolium" |
| `lang` (html) | `pt-BR` |
| `robots` | index/follow true; googleBot com `max-image-preview: large` |
| `openGraph` | type website, locale pt_BR, siteName Toolium, og.svg 1200×630 |
| `twitter` | card summary_large_image, creator @tooliumbr |
| `icons` | `/icon.svg` (icon, shortcut, apple) |
| `manifest` | `/manifest.webmanifest` |
| `category` | "tools" |

## Helper de metadata (`src/lib/seo.ts`)

`buildMetadata({ title, description, path, keywords, noIndex, publishedTime })` gera metadata consistente por página com:
- title formatado (`{title} | Toolium`);
- canonical (`siteConfig.url + path`);
- OpenGraph + Twitter completos;
- robots configurado.

## Metadata por página

| Página | Title | Description |
|---|---|---|
| Home | "Toolium — Ferramentas online gratuitas" | descrição completa |
| `/ferramentas` | "Todas as ferramentas online gratuitas \| Toolium" | lista completa |
| `/ferramentas/<cat>` | "{Categoria} online gratuitas \| Toolium" | description da categoria |
| Cada ferramenta | `{tool.title} \| Toolium` | `tool.description` (otimizada) |
| `/sobre` | "Sobre o Toolium \| Toolium" | sobre |
| `/privacidade` | "Política de Privacidade \| Toolium" | política |
| `/termos` | "Termos de Uso \| Toolium" | termos |
| `/cookies` | "Política de Cookies \| Toolium" | cookies |

Cada ferramenta tem `keywords` próprias (5+ termos) no `tools.ts`.

## Dados estruturados (JSON-LD) — `src/lib/schema.ts`

| Schema | Onde é injetado |
|---|---|
| `Organization` | `layout.tsx` (global, `<head>`) |
| `WebSite` (com `SearchAction`) | `layout.tsx` (global, `<head>`) |
| `BreadcrumbList` | cada página de ferramenta + páginas com breadcrumb |
| `FAQPage` | cada página de ferramenta (a partir de `tool.faq`) |
| `HowTo` | ferramentas que possuem `howToSteps` (porcentagem, juros compostos, senhas) |
| `ItemList` | `/ferramentas` (lista de todas) |
| `CollectionPage` | `/ferramentas/<categoria>` |

Injeção via `<script type="application/ld+json" dangerouslySetInnerHTML>`.

## sitemap.xml (`src/app/sitemap.ts`)

Gera entradas para:
- 6 páginas estáticas (home, ferramentas, sobre, privacidade, termos, cookies);
- 5 categorias;
- 32 ferramentas.

Total: **43 URLs**, com `lastmod = agora`, `changeFrequency` e `priority` definidos por tipo.

## robots.txt (`src/app/robots.ts`)

```
User-agent: *
Allow: /
Sitemap: https://toolium.com.br/sitemap.xml
Host: https://toolium.com.br
```

## Open Graph / Twitter

- Imagem OG: `public/og.svg` (1200×630, SVG com logo + headline + CTA);
- Referenciada em `layout.tsx` e em `lib/seo.ts` (`defaultOgImage`);
- Twitter card `summary_large_image`.

## PWA Manifest (`src/app/manifest.ts`)

- `name`: "Toolium — Ferramentas online gratuitas";
- `short_name`: "Toolium";
- `start_url`: "/";
- `display`: standalone;
- `background_color` / `theme_color`: #0a0a0a;
- `lang`: pt-BR;
- `icons`: `/icon.svg`.

## Content SEO

Cada página de ferramenta (`tool-page.tsx`) renderiza conteúdo editorial rico:
- H1 com o título da ferramenta;
- Intro (parágrafo);
- Seção "Como funciona" com H2 + blocos de conteúdo (H3 + parágrafos);
- Seção "Como usar" (lista numerada);
- Seção "Exemplo prático";
- Seção "Benefícios";
- Seção "Perguntas frequentes" (FAQ em accordion);
- Breadcrumb visível.

Conteúdo original em pt-BR, definido no `src/data/tools.ts`.

## Pontos de atenção SEO (não corrigidos nesta auditoria)

| Item | Detalhe |
|---|---|
| OG image em SVG | Alguns plataformas sociais não renderizam SVG para OG. Ver `09-PONTOS_DE_MELHORIA.md`. |
| `og.svg` referenciado como `defaultOgImage.url` em `seo.ts` mas não existe campo `alt` em todos os usos | Menor |
| Sem `alternates.languages` | Produto é monolíngue (pt-BR); aceitável |
| Sem `google-site-verification` | Não configurado (necessário pós-deploy no Search Console) |

## Acessibilidade (relacionada a SEO/UX)

- `lang="pt-BR"` no `<html>` ✅;
- Cabeçalho semântico (`<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`, `<article>`) ✅;
- Breadcrumb com `aria-label="breadcrumb"` ✅;
- Botões de ícone com `aria-label` ✅;
- `alt` em imagens (logo) ✅;
- `sr-only` não usado extensivamente, mas interações principais são acessíveis por teclado (links, inputs, botões nativos).

> Detalhes completos em `08-RESPONSIVIDADE.md` (acessibilidade + responsividade).
