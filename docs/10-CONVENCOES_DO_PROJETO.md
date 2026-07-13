# 10 — Convenções do Projeto

> Padrões de fato observados no código do Toolium. Documento normativo a partir da Etapa 02.

## Linguagem e localização

- **Idioma do produto**: Português (Brasil) — `pt-BR`.
- **Idioma do código**: identificadores em inglês; textos visíveis ao usuário em pt-BR.
- `<html lang="pt-BR">` no layout raiz.
- Formatação numérica: `Intl.NumberFormat("pt-BR")` via `src/lib/format.ts`.
- Moeda: BRL via `formatBRL()`.
- Datas: `date-fns` + `Intl.DateTimeFormat("pt-BR", ...)`.

## Estrutura de arquivos

- `src/app/` — rotas (App Router), uma pasta por segmento de URL;
- `src/components/{layout,tools,ads,ui}/` — componentes por domínio;
- `src/data/` — dados estáticos (single source of truth);
- `src/lib/` — utilitários, helpers, SEO, schema;
- `src/hooks/` — hooks React reutilizáveis;
- `public/` — assets estáticos servidos na raiz.

## Componentes

- **Server Components por padrão**; `"use client"` apenas quando há estado/efeito/eventos.
- Um componente por arquivo (default export para componentes de ferramenta; named export para UI compartilhada).
- Componentes de ferramenta em `src/components/tools/<categoria>/<slug>.tsx`.
- Componentes de layout em `src/components/layout/`.
- shadcn/ui **intocável em estilo** — usar como vem; customizar apenas via props/classes utilitárias.

## Estilo (Tailwind CSS 4)

- **Mobile-first**: escreva o estilo base para mobile, adicione `sm:`/`md:`/`lg:`/`xl:` para telas maiores.
- Usar **tokens semânticos** (`bg-background`, `text-foreground`, `bg-card`, `text-muted-foreground`, `bg-brand`, `text-brand-foreground`, `bg-brand-muted`, `border-border`), **nunca** cores hex/raw exceto em casos excepcionais comentados.
- Container padrão: `className="container-page"` (`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`).
- Espaçamento: `gap-4`/`gap-6` entre seções; `p-4`/`p-5`/`p-6`/`p-8` em cards.
- Cantos: `rounded-xl` (cards de ferramenta), `rounded-2xl` (seções/heroes), `rounded-full` (badges/chips).
- Listas longas: `max-h-96 overflow-y-auto scrollbar-thin` ou `max-h-64`.
- **Cor de marca = esmeralda** (`--brand`). **Proibido azul/índigo** como cor primária.

## TypeScript

- `strict: true` no `tsconfig.json`;
- `noImplicitAny: false` (permite `any` implícito, mas evitar);
- Alias `@/*` → `./src/*`;
- Tipos explícitos em assinaturas de função pública; inferência permitida em locais;
- Sem `any` explícito sem justificativa (R-array de regras futuras em `docs/09`).

## Estado e efeitos

- Estado local com `useState`;
- Efeitos com `useEffect` — sempre limpar (return cleanup) quando houver listener/interval/timeout;
- Estado derivado → `useMemo` (ex.: conversores recalculam ao mudar input);
- Refs para valores mutáveis que não disparam render (`useRef`);
- **Não** chamar `setState` síncrono dentro de `useEffect` sem guarda de hidratação (causa warning/erro de lint). Padrão aceito: inicializar state vazio + popular no effect com `eslint-disable` justificado (ver `conversor-fuso-horario.tsx`, `checklist-online.tsx`).

## Acessibilidade (mínimos)

- `<Label htmlFor={id}>` pareando `<Input id={id}>`;
- `aria-label` em todo botão de ícone;
- `aria-live="polite"` em resultados dinâmicos relevantes;
- `role="img"` + `aria-label` em SVG decorativo com significado (logo);
- Foco visível (shadcn já provê `focus-visible:ring`);
- Semântica HTML5 (`<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`, `<article>`, `<aside>`, `<ol>`, `<ul>`).

## Responsividade (mínimos)

- Toda página funciona em 360px de largura sem scroll horizontal;
- Grids responsivos (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3/4`);
- Header colapsa para `Sheet` (drawer) abaixo de `md` (768px);
- Botões touch-friendly (mínimo ~36px, ideal 44px).

## SEO (mínimos)

- Toda rota exporta `metadata` (direta ou via `generateMetadata`);
- Usar `buildMetadata({ title, description, path, keywords })` de `src/lib/seo.ts`;
- `title.template` = `"%s | Toolium"`;
- Páginas de ferramenta injetam JSON-LD: Breadcrumb + FAQ (+ HowTo se `howToSteps`);
- Slugs em kebab-case, estáveis (nunca renomear sem redirect).

## AdSense

- Script global no `layout.tsx` (`next/script`, `afterInteractive`);
- Componente `AdBanner` para inserções;
- 3 posições por ferramenta (após intro, após ferramenta, antes do FAQ) — não remover;
- Placeholder elegante em desenvolvimento (sem AdSense ativo).

## Commits (sugerido, não obrigatório)

- Mensagens em pt-BR ou en, imperativas;
- Um commit = uma intenção;
- Não commitar `dev.log`, `.next/`, `db/*.db`, `agent-ctx/`.

## Proibições explícitas

- ❌ `<img>` com caminho absoluto para `localhost` ou porta;
- ❌ `fetch("http://localhost:NNNN/...")` — use relativo + `XTransformPort`;
- ❌ Importar `z-ai-web-dev-sdk` em client component;
- ❌ Hex direto no className quando existir token;
- ❌ Azul/índigo como cor primária;
- ❌ `console.log` em produção (permitido em dev, mas o lint atual não bloqueia — ver `docs/09`);
- ❌ Remover `metadata`, JSON-LD, sitemap, robots, manifest;
- ❌ Trocar slugs de ferramentas existentes.
