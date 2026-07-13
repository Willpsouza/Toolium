# 04 — Dependências

> Documento de auditoria. Lista todas as dependências declaradas em `package.json` e seu real uso pelo produto.

## Resumo

| | Declaradas | Usadas pelo produto |
|---|---|---|
| `dependencies` | 68 | ~20 |
| `devDependencies` | 9 | 9 |

**Total declarado: 77 pacotes.** Aproximadamente **48 pacotes não são usados** diretamente pelo código do Toolium (são herdados do scaffold e/ou suportam componentes UI órfãos).

## Dependências em uso pelo produto

### Núcleo
- `next` ^16.1.1 — framework
- `react` / `react-dom` ^19.0.0

### UI / Estilo
- `tailwindcss` ^4, `@tailwindcss/postcss` ^4, `tw-animate-css` ^1.3.5
- `class-variance-authority`, `clsx`, `tailwind-merge` (via `cn()`)
- `lucide-react` ^0.525.0 — ícones
- `@radix-ui/react-*` — usados pelos componentes UI shadcn **em uso** (accordion, checkbox, dropdown-menu, label, select, separator, dialog(via sheet), slider, switch, tabs, toast, slot, tooltip)

### Temas / Funcionalidades
- `next-themes` ^0.4.6 — modo claro/escuro
- `date-fns` ^4.1.0 — calculadora-idade, diferenca-entre-datas
- `qrcode` ^1.5.4 (+ `@types/qrcode`) — gerador-qrcode
- `spark-md5` ^3.0.2 (+ `@types/spark-md5`) — gerador-hash (MD5)

### Dev
- `typescript` ^5, `@types/react` ^19, `@types/react-dom` ^19, `bun-types`
- `eslint` ^9, `eslint-config-next` ^16.1.1

## Dependências NÃO usadas pelo produto (scaffold / órfãs)

### Não referenciadas em nenhum `src/` (fora de `ui/` órfã)

| Pacote | Motivo |
|---|---|
| `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities` | Drag-and-drop não usado |
| `@hookform/resolvers` | Formulários não usados (zod também não) |
| `@mdxeditor/editor` | Editor MDX não usado |
| `@prisma/client` + `prisma` | DB não usado pelo produto (`lib/db.ts` e `prisma/schema.prisma` existem mas órfãos) |
| `@reactuses/core` | Hooks utilitários não usados |
| `@tanstack/react-query` | Server state não usado |
| `@tanstack/react-table` | Tabela de dados não usada (financiamento usa shadcn `table`) |
| `framer-motion` ^12.23.2 | **Não importado em nenhum arquivo src** |
| `next-auth` ^4.24.11 | Autenticação não usada |
| `next-intl` ^4.3.4 | i18n não usado |
| `react-hook-form` | Formulários não usados |
| `react-markdown` | Renderização markdown não usada |
| `react-syntax-highlighter` | Highlight de código não usado |
| `sharp` ^0.34.3 | Ferramentas de imagem usam Canvas, não sharp |
| `uuid` ^11.1.0 | Checklist usa `crypto.randomUUID()` nativo |
| `z-ai-web-dev-sdk` ^0.0.18 | Nenhum recurso de IA no produto |
| `zod` ^4.0.2 | Validação de schema não usada |
| `zustand` ^5.0.6 | State management não usado |

### Referenciadas apenas por componentes UI órfãos

| Pacote | Sustenta (UI órfão) |
|---|---|
| `cmdk` ^1.1.1 | `ui/command.tsx` |
| `embla-carousel-react` ^8.6.0 | `ui/carousel.tsx` |
| `input-otp` ^1.4.2 | `ui/input-otp.tsx` |
| `react-day-picker` ^9.8.0 | `ui/calendar.tsx` |
| `react-resizable-panels` ^3.0.3 | `ui/resizable.tsx` |
| `recharts` ^2.15.4 | `ui/chart.tsx` |
| `vaul` ^1.1.2 | `ui/drawer.tsx` |
| `sonner` ^2.0.6 | `ui/sonner.tsx` (o produto usa o `toaster` radix, não sonner) |

### Radix usados apenas por UI órfãos

`@radix-ui/react-alert-dialog`, `@radix-ui/react-aspect-ratio`, `@radix-ui/react-avatar`, `@radix-ui/react-collapsible`, `@radix-ui/react-context-menu`, `@radix-ui/react-hover-card`, `@radix-ui/react-menubar`, `@radix-ui/react-navigation-menu`, `@radix-ui/react-popover`, `@radix-ui/react-progress`, `@radix-ui/react-radio-group`, `@radix-ui/react-scroll-area`, `@radix-ui/react-toggle`, `@radix-ui/react-toggle-group`, `@radix-ui/react-tooltip` (este último só via `sidebar` órfão).

> **Esta auditoria não desinstalou nada.** A lista acima é apenas diagnóstica.

## Scripts disponíveis (package.json)

| Script | Comando | Observação |
|---|---|---|
| `dev` | `next dev -p 3000 2>&1 \| tee dev.log` | ✅ Em uso |
| `build` | `next build && cp -r .next/static .next/standalone/.next/ && cp -r public .next/standalone/` | Não executado nesta auditoria (ver relatório) |
| `start` | `NODE_ENV=production bun .next/standalone/server.js` | Produção |
| `lint` | `eslint .` | ✅ Limpo |
| `db:push`, `db:generate`, `db:migrate`, `db:reset` | Prisma | Não usados pelo produto |

## Configurações relevantes

- **`next.config.ts`**: `output: "standalone"`, `typescript.ignoreBuildErrors: true`, `reactStrictMode: false`;
- **`tsconfig.json`**: `strict: true`, `noImplicitAny: false`, alias `@/* → ./src/*`;
- **`eslint.config.mjs`**: **muitas regras desativadas** (ver `09-PONTOS_DE_MELHORIA.md`);
- **`postcss.config.mjs`**: apenas `@tailwindcss/postcss`;
- **`tailwind.config.ts`**: `darkMode: "class"`, `content` aponta para `pages/components/app` (Tailwind 4 usa CSS config via `globals.css` — config TS parcialmente redundante; ver relatório).
