# Performance Audit — Toolium

> FASE 2 da Etapa 08 — Plano de otimização de performance.
> Auditoria concluída na FASE 1 (somente leitura). **Nada implementado ainda neste documento.**
> Regra de ouro: nunca sacrificar legibilidade por performance. Otimizar apenas quando o ganho é claro e seguro.

## Auditoria — resumo do estado atual

O Toolium já possui várias boas práticas de performance:
- ✅ **SSG** (Static Site Generation) com `generateStaticParams` + `dynamicParams = false` — páginas pré-renderizadas, sem runtime server;
- ✅ **Fontes otimizadas**: Geist via `next/font/google` (self-hosted, `font-display: swap` automático, sem requisição a fonts.googleapis.com);
- ✅ **Preconnect** para `pagead2.googlesyndication.com`;
- ✅ **AdSense com gating** por consentimento (Etapa 07) — não carrega sem aceite;
- ✅ **AdBanner com `min-h-[96px]`** — previne CLS (Cumulative Layout Shift);
- ✅ **`suppressHydrationWarning`** no `<html>` — evita flash de tema;
- ✅ **Tailwind CSS 4** com purge automático — CSS mínimo;
- ✅ **SVG inline** para logo (sem requisição extra);
- ✅ **`output: "standalone"`** no next.config — build otimizado para produção;
- ✅ **Imagens de ferramentas** usam Canvas API (client-side, sem upload);
- ✅ **Cookie consent** com atraso de 900ms (não compete com carregamento inicial).

Foram encontrados **5 itens** de oportunidade, listados abaixo.

---

## Itens encontrados

### PERF-01 — Registry importa estaticamente todos os 32 componentes de ferramenta
- **Arquivo**: `src/components/tools/registry.tsx`
- **Problema**: O `registry.tsx` faz `import` estático de todos os 32 componentes de ferramenta. Como ele é importado por `tool-page.tsx` (que renderiza toda página de ferramenta), **cada página de ferramenta carrega o JavaScript de todas as 32 ferramentas**, mesmo exibindo apenas uma. Isso aumenta significativamente o bundle JS inicial de cada página de ferramenta.
- **Impacto**: ALTO. É o maior gargalo de performance do projeto. Cada ferramenta tem ~200-580 linhas de código client-side (state, effects, handlers). Carregar 32 ferramentas quando só 1 é usada é desperdício puro. Afeta diretamente **TBT (Total Blocking Time)**, **TTFB** e tempo de hidratação — especialmente em mobile.
- **Prioridade**: 🔴 CRÍTICA
- **Como otimizar**: Converter os imports estáticos para `next/dynamic` — cada ferramenta vira um chunk separado carregado on-demand. Como as páginas são SSG, o HTML já vem completo do build; o dynamic import apenas separa o JS de hidratação em chunks por ferramenta. O usuário que visita `/calculadora-imc` baixa só o chunk do IMC, não dos 31 outros.
- **Risco**: BAIXO. `next/dynamic` com `ssr: true` (default) preserva SSR/SSG — o HTML continua completo. Apenas o JS é code-splitto. Funcionalidade 100% preservada. Único cuidado: adicionar `<Suspense>` boundary para mostrar skeleton durante o carregamento do chunk (navegação client-side).

### PERF-02 — Sem `Suspense` boundary no tool-page para o componente dinâmico
- **Arquivo**: `src/components/tools/tool-page.tsx`
- **Problema`: Após converter o registry para dynamic imports (PERF-01), o componente da ferramenta será carregado on-demand. Sem um `<Suspense>` boundary, a navegação client-side entre ferramentas pode mostrar um flash em branco enquanto o chunk carrega.
- **Impacto**: MÉDIO. Afeta apenas navegação client-side (não a carga inicial via SSG). Mas melhora a perceived performance.
- **Prioridade**: 🟠 ALTA (complementar a PERF-01)
- **Como otimizar**: Envolver `<ToolComponent />` em `<Suspense fallback={<ToolSkeleton />}>`. Criar um skeleton simples reutilizando classes existentes (sem novo componente complexo).
- **Risco**: BAIXO. Suspense é padrão React/Next.js. Skeleton é apenas JSX com classes Tailwind.

### PERF-03 — Sem `loading.tsx` na rota `[slug]`
- **Arquivo**: `src/app/[slug]/loading.tsx` (não existe)
- **Problema**: Next.js App Router suporta `loading.tsx` que mostra um skeleton imediatamente durante a navegação (antes do conteúdo carregar). Sem ele, a navegação para uma ferramenta pode parecer lenta.
- **Impacto**: MÉDIO. Melhora perceived performance, especialmente em conexões lentas. Como as páginas são SSG, o HTML é estático, mas a navegação client-side ainda beneficia do loading instantâneo.
- **Prioridade**: 🟡 MÉDIA
- **Como otimizar`: Criar `src/app/[slug]/loading.tsx` com um skeleton simples (mesmo padrão do Suspense de PERF-02).
- **Risco**: BAIXO. Convenção nativa do Next.js.

### PERF-04 — `framer-motion` é dependência morta
- **Arquivo**: `package.json` (declara `framer-motion` ^12.23.2)
- **Problema**: `framer-motion` está nas dependências mas **não é importado em nenhum arquivo `src/`** (confirmado via grep). É herdado do scaffold. Embora não afete o bundle (tree-shaking remove imports não usados, e não há imports), a dependência ocupa espaço em `node_modules` e pode confundir.
- **Impacto**: BAIXO. Não afeta o bundle de produção (sem imports = sem código no bundle). Apenas clutter de `node_modules`.
- **Prioridade**: 🟢 BAIXA
- **Como otimizar`: `bun remove framer-motion`. Mas isto é limpeza de dependências, não otimização de performance de código. **Adiar** — fora do escopo de "performance" estrita (não muda bundle/tempos). Documentado em `docs/09-PONTOS_DE_MELHORIA.md` (Etapa 01).
- **Risco**: N/A (adiado).

### PERF-05 — Sem `prefetch` explícito em links de ferramentas
- **Arquivo**: vários (home, categorias, tool-card, relacionadas)
- **Problema`: O `<Link>` do next/link faz prefetch automático por padrão, mas apenas no viewport. Para a home que lista 7 ferramentas populares + 5 categorias, isto já é otimizado. Não há problema real aqui.
- **Impacto`: BAIXO. Next.js já otimiza prefetch automaticamente.
- **Prioridade**: 🟢 BAIXA
- **Como otimizar**: Nenhuma ação necessária. O comportamento default do next/link é ideal. Documentar que está OK.
- **Risco**: N/A (não implementar).

---

## Core Web Vitals — análise

### LCP (Largest Contentful Paint)
- **Elemento LCP**: H1 do hero ("Ferramentas online gratuitas para facilitar sua rotina") na home; H1 do título da ferramenta nas tool pages.
- **Estado atual**: ✅ Bom. Fontes self-hosted (next/font), HTML estático (SSG), sem imagens grandes no LCP.
- **Otimização PERF-01 ajuda**: reduzindo o JS bloqueante, a hidratação acontece mais cedo, estabilizando o LCP.

### CLS (Cumulative Layout Shift)
- **Estado atual**: ✅ Bom. `AdBanner` tem `min-h-[96px]` (reserva espaço). Fontes usam `font-display: swap` com `size-adjust` via next/font (evita FOIT/FOUT shift). `suppressHydrationWarning` evita flash de tema.
- **Sem ação necessária**.

### INP (Interaction to Next Paint)
- **Estado atual**: ✅ Razoável. Ferramentas usam `useState` + `useMemo` para cálculos derivados. Não há operações síncronas pesadas em handlers.
- **Otimização PERF-01 ajuda indiretamente**: menos JS para hidratar = main thread mais livre para responder a interações.
- **Não implementar memoização adicional** (Regra de Ouro: sem benefício claro, aumentaria complexidade).

---

## Itens NÃO otimizados (confirmados OK)

| Item | Estado |
|---|---|
| SSG (páginas estáticas) | ✅ `generateStaticParams` + `dynamicParams = false` |
| Fontes (next/font self-hosted) | ✅ Geist + Geist_Mono |
| Preconnect AdSense | ✅ No layout `<head>` |
| AdSense gating (LGPD) | ✅ Etapa 07 |
| AdBanner anti-CLS (min-h) | ✅ `min-h-[96px]` |
| Tailwind purge | ✅ CSS mínimo |
| SVG inline (logo) | ✅ Sem requisição extra |
| Canvas API (image tools) | ✅ Client-side, sem upload |
| `output: "standalone"` | ✅ Build otimizado |
| `suppressHydrationWarning` | ✅ Evita flash de tema |
| Cookie consent com atraso | ✅ 900ms, não compete com init |
| next/link prefetch | ✅ Default otimizado |

## Tree Shaking — análise
- ✅ Tailwind CSS: purge automático (classes não usadas removidas);
- ✅ lucide-react: imports nomeados (tree-shakeable);
- ⚠️ **registry.tsx**: imports estáticos de 32 componentes **derrota tree shaking** para tool pages — este é o PERF-01;
- ✅ shadcn/ui: imports nomeados por componente (tree-shakeable);
- ✅ date-fns: imports nomeados.

## Re-renderizações — análise
- ✅ Ferramentas usam `useMemo` para cálculos derivados (ex.: conversores recalculam só quando input muda);
- ✅ Estado controlado com `useState` string para inputs (parse sob demanda);
- ✅ Sem contextos globais que causem re-renders em cascata;
- ✅ `ThemeToggle` usa `next-themes` (otimizado);
- ⚠️ `ToolsExplorer` recalcula filtro com `useMemo` — já otimizado;
- **Não há re-renderizações desnecessárias identificadas** — não implementar memoização adicional (Regra de Ouro).

---

## Plano de implementação (FASE 3)

Itens a implementar (seguros, baixo risco, ganho claro):

1. **PERF-01** (CRÍTICA) — Converter `registry.tsx` de imports estáticos para `next/dynamic`. Cada ferramenta vira um chunk separado.
2. **PERF-02** (ALTA) — Adicionar `<Suspense>` boundary com skeleton em `tool-page.tsx` ao redor de `<ToolComponent />`.
3. **PERF-03** (MÉDIA) — Criar `src/app/[slug]/loading.tsx` com skeleton para perceived performance.

Itens adiados (fora do escopo ou sem ganho claro):
- **PERF-04** (framer-motion) — limpeza de dep, não performance de código;
- **PERF-05** (prefetch) — já otimizado por default.

**Arquivos a modificar na FASE 3**: `src/components/tools/registry.tsx`, `src/components/tools/tool-page.tsx`, `src/app/[slug]/loading.tsx` (novo).

**Arquivos NÃO modificar**: ferramentas (`calculators/*`, `converters/*`, etc.), `tool-card.tsx`, `tools-explorer.tsx`, `faq-section.tsx`, layout, header, footer, dados, lib, AdSense, SEO.

**Validação pós-implementação**: lint + tsc + dev server + Agent Browser (verificar que ferramentas ainda funcionam, navegação intacta, chunks separados no network).
