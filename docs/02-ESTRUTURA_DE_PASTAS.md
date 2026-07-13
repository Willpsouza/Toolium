# 02 — Estrutura de Pastas

> Documento de auditoria. Árvore real do projeto (apenas arquivos `.ts/.tsx/.css` em `src/`, mais configs e públicos).

## Árvore (estado atual)

```
my-project/
├── Caddyfile
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── prisma/
│   └── schema.prisma              (modelos User/Post — não usados pelo produto)
├── db/
│   └── custom.db                  (SQLite — não usado pelo produto)
├── public/
│   ├── logo.svg                   (órfão — não referenciado; ver relatório)
│   └── og.svg                     (usado em metadata OG/Twitter)
├── docs/                          (criado nesta auditoria)
│   └── *.md
├── examples/                      (scaffold — fora do escopo Toolium)
│   └── websocket/
├── skills/                        (scaffold — fora do escopo Toolium; ~60 pastas)
├── agent-ctx/                     (registros de subagentes; não parte da app)
├── download/                      (scaffold — contém apenas README.md)
├── dev.log                        (log do dev server, ~649 linhas)
└── src/
    ├── app/
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── page.tsx                       → /
    │   ├── manifest.ts                    → /manifest.webmanifest
    │   ├── robots.ts                      → /robots.txt
    │   ├── sitemap.ts                     → /sitemap.xml
    │   ├── icon.svg                       → favicon (convenção App Router)
    │   ├── api/
    │   │   └── route.ts                   → /api (órfão — "Hello, world")
    │   ├── [slug]/
    │   │   └── page.tsx                   → /<slug-da-ferramenta> (32 rotas)
    │   ├── ferramentas/
    │   │   ├── page.tsx                   → /ferramentas
    │   │   └── [categoria]/
    │   │       └── page.tsx               → /ferramentas/<categoria> (5 rotas)
    │   ├── sobre/page.tsx                 → /sobre
    │   ├── privacidade/page.tsx           → /privacidade
    │   ├── termos/page.tsx                → /termos
    │   └── cookies/page.tsx               → /cookies
    ├── components/
    │   ├── cookie-consent.tsx
    │   ├── logo.tsx
    │   ├── ads/
    │   │   └── ad-banner.tsx
    │   ├── layout/
    │   │   ├── prose.tsx
    │   │   ├── site-footer.tsx
    │   │   ├── site-header.tsx
    │   │   ├── theme-provider.tsx
    │   │   └── theme-toggle.tsx
    │   ├── tools/
    │   │   ├── faq-section.tsx
    │   │   ├── registry.tsx
    │   │   ├── tool-card.tsx
    │   │   ├── tool-page.tsx
    │   │   ├── tools-explorer.tsx
    │   │   ├── calculators/   (10 arquivos .tsx)
    │   │   ├── converters/    (8 arquivos .tsx)
    │   │   ├── generators/    (6 arquivos .tsx)
    │   │   ├── image/         (4 arquivos .tsx)
    │   │   └── productivity/  (4 arquivos .tsx)
    │   └── ui/   (49 componentes shadcn — ver 03-COMPONENTES.md)
    ├── data/
    │   ├── categories.ts
    │   └── tools.ts
    ├── hooks/
    │   ├── use-mobile.ts          (órfão — só usado por sidebar.tsx, que é órfão)
    │   └── use-toast.ts           (usado por toaster.tsx)
    └── lib/
        ├── db.ts                  (Prisma client — não usado pelo produto)
        ├── format.ts
        ├── icons.ts
        ├── schema.ts
        ├── seo.ts
        └── utils.ts
```

## Contagem de arquivos por tipo

| Tipo | Quantidade |
|---|---|
| Rotas (`src/app/**/page.tsx` + `layout.tsx`) | 14 arquivos de rota + 1 layout |
| Componentes não-UI (`src/components/{ads,layout,tools,cookie-consent,logo}`) | 45 |
| Componentes UI shadcn (`src/components/ui/*`) | 49 |
| Dados (`src/data/*`) | 2 |
| Lib (`src/lib/*`) | 6 |
| Hooks (`src/hooks/*`) | 2 |
| Arquivos públicos (`public/*`) | 2 |

## Convenções observadas

- **Nome de arquivos**: kebab-case para componentes de ferramenta (`calculadora-juros-compostos.tsx`), kebab-case para rotas;
- **Co-localização**: cada ferramenta tem um único arquivo `.tsx` com default export, mapeado no `registry.tsx`;
- **Alias `@/`**: aponta para `src/` (configurado em `tsconfig.json` `paths`);
- **shadcn/ui**: config em `components.json` (estilo New York, base neutral, cssVariables true);
- **App Router metadata**: `sitemap.ts`, `robots.ts`, `manifest.ts` usam a convenção nativa do Next.js.

## Pastas fora do escopo do produto

| Pasta | Origem | Impacto |
|---|---|---|
| `examples/` | Scaffold (demo websocket) | Causa os únicos erros de `tsc` do repositório; ignorada pelo ESLint |
| `skills/` | Scaffold (~60 skills) | Causa erros de `tsc`; ignorada pelo ESLint |
| `agent-ctx/` | Registros de subagentes | Não faz parte da app |
| `download/` | Scaffold | Apenas um README.md |
| `db/` + `prisma/` | Scaffold | Configurado mas não usado pelo produto |
