# 13 — Padrão de Nomenclatura

> Convenções de nomeação observadas no Toolium. Normativas a partir da Etapa 02.

## Arquivos

| Tipo | Convenção | Exemplos |
|---|---|---|
| Rotas | `page.tsx`, `layout.tsx`, `route.ts` (App Router) | — |
| Componentes de ferramenta | kebab-case igual ao slug | `calculadora-juros-compostos.tsx` |
| Componentes de layout/ads | kebab-case | `site-header.tsx`, `ad-banner.tsx`, `cookie-consent.tsx` |
| Componentes UI (shadcn) | kebab-case (padrão shadcn) | `input.tsx`, `dropdown-menu.tsx` |
| Componentes framework | kebab-case | `tool-card.tsx`, `tools-explorer.tsx`, `faq-section.tsx` |
| Lib/helpers | kebab-case | `seo.ts`, `schema.ts`, `image-utils.ts` |
| Dados | kebab-case | `tools.ts`, `categories.ts` |
| Hooks | `use-<coisa>.ts` | `use-toast.ts`, `use-mobile.ts` |

**Regra**: o nome do arquivo de ferramenta **deve ser igual ao slug** definido em `tools.ts`. O `registry.tsx` depende dessa correspondência implícita.

## Identificadores (TS/TSX)

| Tipo | Convenção | Exemplo |
|---|---|---|
| Componentes (PascalCase) | `ToolPage`, `SiteHeader`, `AdBanner` | — |
| Funções | camelCase | `getTool`, `buildMetadata`, `parseNumber` |
| Variáveis/estado | camelCase | `valorInicial`, `setValor` |
| Constantes | camelCase ou UPPER_SNAKE para constantes globais | `siteConfig`, `CITIES`, `STORAGE_KEY` |
| Tipos/Interfaces | PascalCase | `Tool`, `Category`, `ToolFaq`, `AdBannerProps` |
| Enums | PascalCase + membros PascalCase | — (não usados hoje) |
| Props type | `<Nome>Props` | `ToolPageProps`, `AdBannerProps` |

## Slugs

- **kebab-case**, sem acentos, sem espaços;
- Descritivo e estável (nunca renomear sem redirect);
- Exemplos: `calculadora-juros-compostos`, `conversor-temperatura`, `gerador-qrcode`, `compressor-imagem`, `cronometro-online`.

## Categorias

- Slug kebab-case: `calculadoras`, `conversores`, `geradores`, `imagens`, `produtividade`;
- Nome exibido em pt-BR: "Calculadoras", "Conversores", "Geradores", "Imagem", "Produtividade".

## Classes CSS (Tailwind)

- Tokens semânticos: `bg-background`, `text-foreground`, `bg-card`, `text-muted-foreground`, `bg-muted`, `border-border`, `bg-brand`, `text-brand`, `text-brand-foreground`, `bg-brand-muted`, `bg-destructive`;
- Utilitários compostos via `cn()` (não concatenar strings manualmente);
- Classes customizadas em `globals.css` com `@layer utilities`: `container-page`, `bg-grid`, `bg-radial-fade`, `mask-fade-b`, `scrollbar-thin`, `text-balance`, `text-pretty`, `animate-marquee`.

## Variáveis CSS

- Tokens de tema em `:root` e `.dark` em `globals.css`: `--background`, `--foreground`, `--card`, `--brand`, `--brand-foreground`, `--brand-muted`, etc.;
- Cores em **oklch**;
- Raio: `--radius` (base), derivados `--radius-sm/md/lg/xl`.

## Chaves de localStorage

- Prefixo `toolium:`: `toolium:cookie-consent`, `toolium:checklist`.

## Branches / commits (sugerido)

- Branches: `etapa-NN-<topico>` (ex.: `etapa-03-higiene-config`);
- Commits: imperativos, pt-BR ou en; um commit = uma intenção.

## Pastas

- kebab-case para subpastas de `components/tools/`: `calculators`, `converters`, `generators`, `image`, `productivity`;
- As pastas de categoria em `components/tools/` **não** coincidem com os slugs de categoria em `categories.ts` (ex.: slug `imagens` ↔ pasta `image`; slug `produtividade` ↔ pasta `productivity`). **Registrar como exceção intencional** (nome da pasta em inglês para consistência com código; slug em pt-BR para URL).

## Nomenclatura proibida

- ❌ CamelCase em nomes de arquivo de componente (use kebab-case);
- ❌ Slugs com acento, espaço ou maiúscula;
- ❌ Variáveis com nome obscuro (`x`, `a` fora de contextos matemáticos explícitos);
- ❌ Classes hex no className (use token);
- ❌ Prefixos `my`/`temp`/`new` em código de produção.

## Tabela rápida — slug ↔ pasta ↔ arquivo

| Slug (URL) | Categoria (slug) | Pasta do componente | Arquivo |
|---|---|---|---|
| `calculadora-imc` | `calculadoras` | `calculators/` | `calculadora-imc.tsx` |
| `conversor-moedas` | `conversores` | `converters/` | `conversor-moedas.tsx` |
| `gerador-senhas` | `geradores` | `generators/` | `gerador-senhas.tsx` |
| `compressor-imagem` | `imagens` | `image/` | `compressor-imagem.tsx` |
| `cronometro-online` | `produtividade` | `productivity/` | `cronometro-online.tsx` |
