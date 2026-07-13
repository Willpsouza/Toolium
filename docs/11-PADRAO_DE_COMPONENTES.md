# 11 — Padrão de Componentes

> Como componentes são estruturados no Toolium. Padrões de fato, normativos a partir da Etapa 02.

## Categorias de componentes

| Categoria | Local | Render | Exemplos |
|---|---|---|---|
| **Rotas** | `src/app/**/page.tsx`, `layout.tsx` | Server Component | `page.tsx`, `[slug]/page.tsx` |
| **Layout** | `src/components/layout/` | Misto | `site-header`, `site-footer`, `theme-provider`, `theme-toggle`, `prose` |
| **Ferramentas** | `src/components/tools/{calculators,converters,generators,image,productivity}/` | Client (`"use client"`) | `calculadora-imc.tsx` |
| **Framework de ferramentas** | `src/components/tools/` | Server (exceto explorer) | `registry.tsx`, `tool-page.tsx`, `tool-card.tsx`, `faq-section.tsx`, `tools-explorer.tsx` |
| **Ads** | `src/components/ads/` | Client | `ad-banner.tsx` |
| **UI (shadcn)** | `src/components/ui/` | Conforme shadcn | `button.tsx`, `input.tsx`, ... |
| **Outros** | `src/components/` raiz | Conforme caso | `cookie-consent.tsx`, `logo.tsx` |

## Padrão de um componente de ferramenta

Estrutura canônica observada (ex.: `calculadora-porcentagem.tsx`):

```tsx
"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { formatBRL, parseNumber, formatNumber } from "@/lib/format"
import { /* icons */ } from "lucide-react"

// (opcional) tipos locais
// (opcional) helpers puros fora do componente

export default function NomeDaFerramenta() {
  const [valor, setValor] = React.useState("")
  // ... estado
  // ... useMemo para resultado derivado

  return (
    <div className="flex flex-col gap-4">
      {/* inputs com Label htmlFor + Input id */}
      {/* resultado em destaque com bg-brand-muted / text-brand */}
      {/* ações (copiar/limpar) com aria-label */}
    </div>
  )
}
```

### Regras do componente de ferramenta

1. **`"use client"`** na primeira linha.
2. **Default export** (o `registry.tsx` importa o default).
3. **Estado controlado** com `useState` string para inputs numéricos; parse via `parseNumber` (aceita `"1.234,56"` e `"1234.56"`).
4. **Resultado derivado** com `useMemo` ou cálculo inline — sem botão "calcular" para casos simples.
5. **Validação defensiva**: nunca exibir `NaN`; mostrar `—` quando entrada é vazia/inválida.
6. **Acessibilidade**: `<Label htmlFor>` + `<Input id>`; `aria-label` em botões de ícone; `aria-live` em resultados.
7. **Responsividade**: inputs em `grid gap-4 sm:grid-cols-2`; resultados em cards.
8. **Tokens**: usar `bg-brand`, `text-brand-foreground`, `bg-brand-muted`, nunca hex.
9. **Sem emojis**.
10. **Sem dependências externas** além das já instaladas (lucide, date-fns, qrcode, spark-md5).

## Padrão do framework de ferramentas

### `registry.tsx`
Mapa estático `slug → Component`. Imports no topo, mapeamento em objeto exportado. **Não editar por ferramenta nova** — apenas adicionar import + entrada (ver `docs/12` R19).

### `tool-page.tsx`
Layout Server Component que envolve toda ferramenta:
- Breadcrumb (links: Início > Ferramentas > Categoria > Ferramenta);
- `<header>` com H1 + intro;
- `<AdBanner />` (local 1);
- `<section>` com a ferramenta (componente do registry);
- `<AdBanner />` (local 2);
- Conteúdo editorial (map de `tool.content`);
- "Como usar" (lista numerada);
- "Exemplo prático" (card destacado);
- "Benefícios" (lista com check icons);
- `<AdBanner />` (local 3);
- `<FaqSection>` (accordion);
- JSON-LD scripts (Breadcrumb + FAQ + HowTo).

### `tool-card.tsx`
Card de listagem (link). Usa `iconMap[tool.icon]` + `accentMap[accent da categoria]`.

### `tools-explorer.tsx`
Client component com busca (Input) + filtro por categoria (chips). `useMemo` para filtrar.

### `faq-section.tsx`
Accordion shadcn a partir de `ToolFaq[]`.

## Padrão de componentes de layout

- `site-header.tsx`: client (precisa de estado para Sheet + dropdown). Sticky, backdrop-blur.
- `site-footer.tsx`: Server Component (sem interatividade). `mt-auto` no layout raiz.
- `theme-provider.tsx`: client, wrapper de `next-themes`.
- `theme-toggle.tsx`: client, botão que alterna classe.
- `prose.tsx`: Server Component, estilização tipográfica para institucionais.

## Padrão de componentes UI (shadcn)

- Estilo **New York**, base **neutral**, `cssVariables: true` (config em `components.json`);
- **Não modificar** a implementação dos componentes UI exceto por `npx shadcn@latest add <name>` (re-gerar);
- Customização visual via props e classes utilitárias no ponto de uso, nunca editando o arquivo `ui/*.tsx`.

## Padrão de helpers (`src/lib/`)

- Funções puras, sem estado;
- Tipos explícitos em assinaturas;
- Um arquivo por domínio: `seo.ts`, `schema.ts`, `icons.ts`, `format.ts`, `utils.ts`, `db.ts` (órfão).

## Padrão de dados (`src/data/`)

- `tools.ts`: exporta interface `Tool`, `ToolFaq`, `ToolContentBlock`; array `tools` (32 entradas); helpers `getTool`, `getToolsByCategory`, `getPopularTools`, `getAllSlugs`.
- `categories.ts`: exporta `Category`, `CategorySlug`, array `categories`, helper `getCategory`.

## Anti-padrões a evitar

| Anti-padrão | Correto |
|---|---|
| Criar componente sem registrar no `registry` | Sempre registrar |
| Usar `useState<number>` para input numérico | `useState<string>` + `parseNumber` |
| Exibir `NaN` | Guardar com `Number.isFinite` e mostrar `—` |
| Hex no className | Token semântico |
| `<img src="/logo.svg">` | Componente `<Logo />` (SVG inline) |
| Botão sem `aria-label` | `aria-label="..."` |
| `useEffect` sem cleanup de interval/listener | Sempre retornar cleanup |
| Duplicar helper `loadImage` | (futuro) `lib/image-utils.ts` |
