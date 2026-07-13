# SEO — Plano de Correção

> Etapa 04 — FASE 2 (Plano). Auditoria concluída na FASE 1.
> Engenheiro de SEO Técnico.
> **Nada foi implementado ainda neste documento.** A implementação ocorre na FASE 3, após aprovação implícita deste plano pelo fluxo da etapa.

## Auditoria — resumo do estado atual

O Toolium já possui uma base SEO sólida:
- ✅ `metadataBase` definido;
- ✅ `metadata` global + `buildMetadata()` por página;
- ✅ Canonical URLs em todas as rotas;
- ✅ Open Graph + Twitter Cards configurados;
- ✅ `robots.txt` (App Router) servindo 200;
- ✅ `sitemap.xml` (App Router) com 43 URLs servindo 200;
- ✅ `manifest.webmanifest` servindo 200;
- ✅ Favicon SVG servindo 200;
- ✅ `<html lang="pt-BR">`;
- ✅ JSON-LD: Organization + WebSite (globais), Breadcrumb + FAQ + HowTo (por ferramenta), ItemList (/ferramentas), CollectionPage (categoria);
- ✅ Heading hierarchy: 1× H1 por página, H2/H3 aninhados;
- ✅ Todas as `<img>` das ferramentas têm `alt`;
- ✅ Logo SVG com `role="img"` + `aria-label`;
- ✅ URLs amigáveis (kebab-case, sem parâmetros);
- ✅ AdSense script integrado (cliente `ca-pub-2570963650556560`).

Foram encontrados **8 itens** passíveis de correção técnica, listados abaixo em ordem de prioridade.

---

## Itens encontrados

### SEO-01 — Titles duplicados ("X | Toolium | Toolium")
- **Arquivo**: `src/lib/seo.ts` (função `buildMetadata`) em conjunto com `src/app/layout.tsx` (`title.template: "%s | Toolium"`)
- **Problema**: `buildMetadata` retorna `title: "X | Toolium"` (já sufixado). O `layout.tsx` aplica `title.template = "%s | Toolium"` sobre esse valor, gerando `"X | Toolium | Toolium"` em todas as páginas exceto a home (que usa `title.default`, não passa pelo template). Confirmado servido: `/calculadora-juros-compostos` → `<title>Calculadora de Juros Compostos | Toolium | Toolium</title>`.
- **Impacto**: ALTO. Titles duplicados prejudicam SEO (Google pode truncar/ignorar), ficam feios na aba e no compartilhamento, e podem ser sinalizado no Search Console como problema de title.
- **Prioridade**: 🔴 CRÍTICA
- **Como corrigir**: Em `buildMetadata`, retornar o `title` **sem** o sufixo "| Toolium" (apenas o título base, ex.: "Calculadora de Juros Compostos"). O `layout.tsx` já tem o template `"%s | Toolium"` que adiciona o sufixo corretamente. Para títulos que já contêm "Toolium" (ex.: home default, "Sobre o Toolium"), usar `title.absolute` para bypass do template. Ajustar também o `openGraph.title` e `twitter.title` para incluir "| Toolium" manualmente (OG/Twitter não usam o template).
- **Risco**: BAIXO. Apenas strings de metadata; sem toque em layout/rotas/componentes. Validação: checar titles servidos em 6+ rotas.

### SEO-02 — Canonical da home sem barra final (inconsistente com sitemap)
- **Arquivo**: `src/lib/seo.ts` (`buildMetadata` com `path = "/"`) e `src/app/layout.tsx` (`alternates.canonical: "/"`)
- **Problema**: Home canonical servido = `https://toolium.com.br` (sem barra). Sitemap lista `https://toolium.com.br/` (com barra). Google pode tratar como duplicação canônica.
- **Impacto**: MÉDIO. Inconsistência canônica; Search Console pode sinalizar.
- **Prioridade**: 🟠 ALTA
- **Como corrigir**: Garantir que canonical da home termine com `/`. Em `buildMetadata`, quando `path === "/"`, canonical = `${siteConfig.url}/`. Ajustar também o `alternates.canonical` do `layout.tsx` para `https://toolium.com.br/` ou delegar para `buildMetadata`.
- **Risco**: BAIXO. Apenas string de canonical.

### SEO-03 — `SearchAction` do WebSite schema aponta para busca inexistente via URL
- **Arquivo**: `src/lib/schema.ts` (`websiteSchema.potentialAction.target`)
- **Problema**: O target é `/ferramentas?q={search_term_string}`, mas a busca do Toolium é 100% client-side (não lê query param `q`). O Google pode tentar indexar essa URL com query e mostrar resultados vazios.
- **Impacto**: MÉDIO. Pode gerar URLs inválidas nos resultados de busca; experiência ruim.
- **Prioridade**: 🟠 ALTA
- **Como corrigir**: Remover o `potentialAction` (SearchAction) do `websiteSchema`. A busca client-side não suporta deep-link via URL. Alternativa (adiada): implementar leitura de `?q=` no `ToolsExplorer` — mas isso é feature, fora do escopo de SEO técnico.
- **Risco**: BAIXO. Remover um campo do schema JSON-LD; sem impacto em UI.

### SEO-04 — Schemas Organization e WebSite sem `@id` (vinculação fraca)
- **Arquivo**: `src/lib/schema.ts`
- **Problema**: `organizationSchema` e `websiteSchema` não têm `@id`. O Google recomenda `@id` para vincular entidades entre schemas (ex.: `WebSite.publisher.@id` → `Organization.@id`).
- **Impacto**: BAIXO-MÉDIO. Schemas funcionam sem `@id`, mas a vinculação melhora a compreensão do grafo de entidades.
- **Prioridade**: 🟡 MÉDIA
- **Como corrigir**: Adicionar `@id: "${siteConfig.url}/#organization"` em Organization e `@id: "${siteConfig.url}/#website"` em WebSite; em `WebSite.publisher`, usar `{"@id": ".../#organization"}` em vez de duplicar dados.
- **Risco**: BAIXO. Apenas adição de campos ao JSON-LD.

### SEO-05 — `organizationSchema.sameAs` vazio
- **Arquivo**: `src/lib/schema.ts`
- **Problema**: `sameAs: []` (array vazio). Sem redes sociais configuradas. Um array vazio não causa erro, mas não agrega.
- **Impacto**: BAIXO.
- **Prioridade**: 🟢 BAIXA
- **Como corrigir**: Remover o campo `sameAs` (ou mantê-lo vazio — sem efeito). Preferível remover para não enviar campo sem valor. Adicionar redes reais quando existirem (futuro).
- **Risco**: BAIXO.

### SEO-06 — `organizationSchema.foundingDate: "2024"` não verificado
- **Arquivo**: `src/lib/schema.ts`
- **Problema**: A data "2024" foi preenchida sem fonte verificável na auditoria. Se incorreta, é dado falso (viola "nunca inventar").
- **Impacto**: BAIXO-MÉDIO (risco de informação falsa em rich results).
- **Prioridade**: 🟡 MÉDIA
- **Como corrigir**: Remover `foundingDate` (dado não verificado). Re-adicionar quando houver data real confirmada.
- **Risco**: BAIXO. Remoção de campo.

### SEO-07 — OG/Twitter images em SVG
- **Arquivo**: `public/og.svg`, `src/lib/seo.ts` (`defaultOgImage`), `src/app/layout.tsx`
- **Problema**: Várias plataformas sociais (WhatsApp, Facebook, alguns crawlers) não renderizam SVG como imagem OG. Twitter/X e LinkedIn preferem PNG/JPG.
- **Impacto**: MÉDIO. Compartilhamentos podem ficar sem preview.
- **Prioridade**: 🟡 MÉDIA
- **Como corrigir**: Gerar `public/og.png` (1200×630) e referenciá-lo. **Adiado**: a geração de PNG requer ferramenta externa (image-generation skill ou script); está registrado em `docs/09-PONTOS_DE_MELHORIA.md`. Nesta etapa, apenas documentar; não implementar (fora do escopo de "SEO técnico" sem alterar assets).
- **Risco**: N/A (adiado).

### SEO-08 — Sem `favicon.ico` fallback
- **Arquivo**: `public/` (falta `favicon.ico`)
- **Problema**: Apenas `app/icon.svg` serve favicon. Navegadores antigos e alguns crawlers esperam `/favicon.ico`.
- **Impacto**: BAIXO. Maioria dos navegadores modernos usa o SVG via `app/icon.svg`.
- **Prioridade**: 🟢 BAIXA
- **Como corrigir**: Gerar `favicon.ico` (32×32 ou multi-resolução) a partir do logo e colocar em `public/favicon.ico`. **Adiado**: requer conversão de formato; registrado para etapa futura.
- **Risco**: N/A (adiado).

---

## Itens NÃO corrigidos (confirmados OK na auditoria)

| Item | Estado |
|---|---|
| Metadata global | ✅ OK |
| Metadata por página (`buildMetadata`) | ✅ OK (após SEO-01) |
| Canonical URLs | ✅ OK (após SEO-02) |
| Open Graph | ✅ OK (após SEO-01 ajustar titles OG) |
| Twitter Cards | ✅ OK (após SEO-01) |
| robots.txt | ✅ OK (servindo 200, formato válido) |
| sitemap.xml | ✅ OK (43 URLs, servindo 200) |
| manifest | ✅ OK |
| favicon SVG | ✅ OK (SVG via `app/icon.svg`) |
| Breadcrumb Schema | ✅ OK (em tool-page + categorias + institucionais) |
| Organization Schema | ✅ OK (após SEO-04/06) |
| WebSite Schema | ✅ OK (após SEO-03/04) |
| FAQ Schema | ✅ OK (em todas as páginas de ferramenta com faq) |
| HowTo Schema | ✅ OK (em ferramentas com `howToSteps`: porcentagem, juros compostos, senhas) |
| URLs amigáveis | ✅ OK (kebab-case) |
| Heading hierarchy | ✅ OK (1× H1 por página) |
| ALT em imagens | ✅ OK (todos os `<img>` das ferramentas têm alt) |
| `<html lang>` | ✅ OK (pt-BR) |
| Links internos | ✅ OK (header/footer/breadcrumb/cross-links) |
| Links quebrados | ✅ Nenhum encontrado (rotas dinâmicas com `dynamicParams = false` → 404 correto) |
| Conteúdo duplicado | ✅ Baixo risco (cada ferramenta tem conteúdo editorial único em `tools.ts`) |
| Páginas órfãs | ✅ Nenhuma pública (a `/api` é órfã mas `noindex` implícito por não estar no sitemap; está em docs/09) |
| Status HTTP incorretos | ✅ Todas as rotas testadas retornam 200; slugs inválidos retornam 404 |
| AdSense | ✅ Script integrado, cliente correto, 3 posições por ferramenta |

## Preparação para Google

### Google Search Console
- ✅ `sitemap.xml` válido e acessível;
- ✅ `robots.txt` válido e referencia o sitemap;
- ✅ Canonical URLs consistentes (após SEO-02);
- ⚠️ Falta `google-site-verification` meta tag — **operacional, pós-deploy** (não código).

### Google Analytics
- ✅ Estrutura preparada (App Router, metadata) — basta adicionar o script GA via `next/script` quando tiver o ID. **Não configurado** (sem obrigatoriedade, conforme escopo).

### Google AdSense
- ✅ Script AdSense integrado (`ca-pub-2570963650556560`);
- ✅ `crossOrigin="anonymous"`;
- ✅ Consentimento de cookies (LGPD-friendly);
- ⚠️ Sem `ads.txt` em `public/` — **operacional, pós-aprovação**;
- ⚠️ Sem `slot` real nos `<AdBanner />` — **operacional, pós-aprovação**;
- ⚠️ Script carrega sem gating por consentimento — registrado em docs/09 (MÉDIO-7), fora do escopo desta etapa.

---

## Plano de implementação (FASE 3)

Ordem de execução, do maior impacto ao menor:

1. **SEO-01** (CRÍTICA) — corrigir `buildMetadata` para não sufixar "| Toolium"; ajustar `layout.tsx` para usar `title.absolute` em titles que já contêm "Toolium"; garantir OG/Twitter titles com sufixo manual.
2. **SEO-02** (ALTA) — canonical da home com barra final.
3. **SEO-03** (ALTA) — remover `potentialAction` (SearchAction) do `websiteSchema`.
4. **SEO-04** (MÉDIA) — adicionar `@id` em Organization e WebSite; vincular publisher.
5. **SEO-06** (MÉDIA) — remover `foundingDate` (dado não verificado).
6. **SEO-05** (BAIXA) — remover `sameAs: []`.
7. **SEO-07** (MÉDIA) — ADIADO (OG PNG, fora do escopo de SEO técnico puro).
8. **SEO-08** (BAIXA) — ADIADO (favicon.ico, requer conversão).

**Arquivos a modificar na FASE 3**: `src/lib/seo.ts`, `src/lib/schema.ts`, `src/app/layout.tsx`.

**Arquivos NÃO modificar**: `src/app/page.tsx`, `src/app/[slug]/page.tsx`, `src/app/ferramentas/**`, `src/app/sobre|privacidade|termos|cookies/page.tsx`, `src/data/*`, `src/components/**`, `public/*`.

**Validação pós-implementação**:
- `bun run lint` limpo;
- `bunx tsc --noEmit` sem erros em `src/`;
- Dev server 200;
- `curl` em 6+ rotas verificando `<title>` sem duplicação, canonical correto, JSON-LD válido;
- Agent Browser confirmando renderização intacta.
