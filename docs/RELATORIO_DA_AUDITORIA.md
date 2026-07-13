# Relatório da Auditoria — Toolium

> Auditoria realizada sem alterar o código. Apenas documentação. Build validado via `bun run lint` + `bunx tsc --noEmit` (ver seção "Validação").

## Sumário executivo

| Métrica | Valor |
|---|---|
| Páginas (rotas face ao usuário) | 43 |
| Rotas de metadata + API | 5 |
| Componentes de produto (não-UI) | 45 |
| Componentes UI shadcn | 49 (18 em uso, ~29 órfãos) |
| Ferramentas | 32 |
| Dependências declaradas | 77 (~48 não usadas pelo produto) |
| Erros de lint | 0 |
| Erros de TypeScript em `src/` | 0 |
| Erros de TypeScript no repo | 4 (todos em `examples/` e `skills/`, fora do escopo) |
| Rotas quebradas | 0 |
| Componentes duplicados | 0 (há repetição de padrão, não duplicação) |

**Conclusão**: o projeto está **saudável e funcional**, com lint limpo e sem erros de tipo no código do produto. Os problemas encontrados são de **higiene** (dependências e componentes órfãos herdados do scaffold), de **configuração** (lint permissivo, `ignoreBuildErrors`, package.json divergente) e **operacionais** (AdSense sem slots, OG em SVG, sem ads.txt). Nenhum impede o funcionamento.

---

## CRÍTICO

Nenhum problema crítico encontrado. O produto compila, faz lint sem erros, todas as rotas respondem 200 e nenhuma funcionalidade está quebrada.

---

## ALTO

### ALTO-1 — `next.config.ts` ignora erros de TypeScript no build
- **Arquivos**: `next.config.ts`
- **Problema**: `typescript.ignoreBuildErrors: true` faz `next build` ignorar erros de tipo. Hoje `src/` está limpo, mas a flag mascara regressões futuras.
- **Impacto**: Um erro de tipo que quebraria o build passa despercebido; risco de deploy com bugs.
- **Solução recomendada**: remover `typescript.ignoreBuildErrors` (e considerar reativar `reactStrictMode`). Re-rodar `tsc --noEmit` e `next build` para confirmar limpo.
- **Prioridade**: Alta — antes de qualquer evolução.

### ALTO-2 — ESLint desativa ~25 regras de qualidade
- **Arquivos**: `eslint.config.mjs`
- **Problema**: regras como `@typescript-eslint/no-unused-vars`, `no-explicit-any`, `react-hooks/exhaustive-deps`, `prefer-const`, `no-console`, `@next/next/no-img-element` estão todas `off`.
- **Impacto**: lint não protege contra regressões (código morto, `any`, efeitos com deps faltando, `<img>` sem `next/image`).
- **Solução recomendada**: reativar gradualmente as regras mais valiosas; corrigir avisos.
- **Prioridade**: Alta.

### ALTO-3 — `tsc --noEmit` reporta erros em `examples/` e `skills/`
- **Arquivos**: `examples/websocket/server.ts`, `examples/websocket/frontend.tsx`, `skills/image-edit/scripts/image-edit.ts`, `skills/stock-analysis-skill/src/analyzer.ts`
- **Problema**: módulos `socket.io`/`socket.io-client` não instalados; erros de tipo nas skills. Embora `next build` use `ignoreBuildErrors` e o ESLint ignore essas pastas, o `tsc` as escaneia.
- **Impacto**: sinaliza "erros" no repositório; pode confundir CI; as pastas não fazem parte do produto.
- **Solução recomendada**: adicionar `"examples"`, `"skills"` ao `exclude` do `tsconfig.json` (ou remover as pastas do repositório).
- **Prioridade**: Alta (baixo esforço, alta clareza).

---

## MÉDIO

### MÉDIO-1 — ~48 dependências não usadas pelo produto
- **Arquivos**: `package.json`
- **Problema**: pacotes herdados do scaffold (framer-motion, next-auth, next-intl, zustand, zod, uuid, sharp, react-markdown, react-syntax-highlighter, @tanstack/*, @mdxeditor/*, @dnd-kit/*, @reactuses/core, z-ai-web-dev-sdk, cmdk, embla-carousel-react, input-otp, react-day-picker, react-resizable-panels, recharts, vaul, sonner, + @prisma/client/prisma).
- **Impacto**: bundle maior, install mais lento, superfície de segurança ampliada, manutenção mais difícil.
- **Solução recomendada**: desinstalar em blocos (UI-órfãos primeiro, depois libs não referenciadas), re-rodar lint + build após cada bloco.
- **Prioridade**: Média.

### MÉDIO-2 — ~29 componentes UI shadcn órfãos
- **Arquivos**: `src/components/ui/{alert,alert-dialog,aspect-ratio,avatar,calendar,carousel,chart,collapsible,command,context-menu,dialog,drawer,form,hover-card,input-otp,menubar,navigation-menu,pagination,popover,progress,radio-group,resizable,scroll-area,sidebar,skeleton,sonner,toggle,toggle-group,tooltip}.tsx`
- **Problema**: não importados por nenhuma rota/layout/ferramenta/ads/cookie-consent.
- **Impacto**: código morto; sustenta dependências mortas.
- **Solução recomendada**: remover após confirmar não uso (esta auditoria confirmou); pode re-add via `npx shadcn@latest add <name>` se futuramente necessário.
- **Prioridade**: Média.

### MÉDIO-3 — Prisma configurado mas não usado
- **Arquivos**: `src/lib/db.ts`, `prisma/schema.prisma`, `db/custom.db`
- **Problema**: schema define `User` e `Post` (scaffold); produto não usa DB. `lib/db.ts` instancia PrismaClient mas nada o importa.
- **Impacto**: gera client desnecessário; exige `DATABASE_URL`; peso.
- **Solução recomendada**: remover `lib/db.ts`, `prisma/`, `db/` e desinstalar `@prisma/client` + `prisma`. Confirmar que nenhuma rota API futura dependerá.
- **Prioridade**: Média.

### MÉDIO-4 — API route órfã
- **Arquivos**: `src/app/api/route.ts`
- **Problema**: retorna `{ message: "Hello, world!" }`; não usado pelo produto.
- **Impacto**: rota pública sem propósito; confusão.
- **Solução recomendada**: remover o arquivo.
- **Prioridade**: Média.

### MÉDIO-5 — `public/logo.svg` não referenciado
- **Arquivos**: `public/logo.svg`
- **Problema**: nenhum `src/` referencia `/logo.svg`. O componente `Logo` usa SVG inline.
- **Impacto**: asset morto.
- **Solução recomendada**: remover `public/logo.svg` **ou** fazer o componente `Logo` referenciá-lo via `<img src="/logo.svg">` (decisão de design). Hoje há duplicação conceitual (SVG inline + arquivo).
- **Prioridade**: Média-baixa.

### MÉDIO-6 — AdSense sem `slot` e sem `ads.txt`
- **Arquivos**: `src/components/ads/ad-banner.tsx`, usos em `tool-page.tsx`/`page.tsx`/`[categoria]/page.tsx`
- **Problema**: `<AdBanner />` é invocado sem `slot`. Mesmo com AdSense aprovado, nenhum anúncio real exibiria. Sem `public/ads.txt`.
- **Impacto**: monetização não funcional até configurar slots.
- **Solução recomendada**: pós-aprovação, criar blocos no painel AdSense e passar `slot` em cada `<AdBanner slot="..." />`; adicionar `public/ads.txt`.
- **Prioridade**: Média (operacional, pós-aprovação).

### MÉDIO-7 — Script AdSense carrega sem condicionar ao consentimento
- **Arquivos**: `src/app/layout.tsx`
- **Problema**: script AdSense injetado em `afterInteractive` independentemente do banner de cookies.
- **Impacto**: conformidade LGPD/UE questionável (cookies de publicidade antes do consentimento).
- **Solução recomendada**: carregar AdSense condicionalmente após aceite (estado já persistido pelo `CookieConsent` em `localStorage`).
- **Prioridade**: Média.

### MÉDIO-8 — `package.json` diverge do produto
- **Arquivos**: `package.json`
- **Problema**: `"name": "nextjs_tailwind_shadcn_ts"`; sem `description`/`author`/`license`.
- **Impacto**: identidade do pacote incorreta; metadados ausentes.
- **Solução recomendada**: renomear para `"toolium"`, adicionar metadata.
- **Prioridade**: Média-baixa.

---

## BAIXO

### BAIXO-1 — OG image em SVG
- **Arquivos**: `public/og.svg`, `src/app/layout.tsx`, `src/lib/seo.ts`
- **Problema**: várias plataformas sociais não renderizam SVG como OG.
- **Solução recomendada**: gerar `og.png` 1200×630 e referenciar.
- **Prioridade**: Baixa.

### BAIXO-2 — `tailwind.config.ts` parcialmente redundante
- **Arquivos**: `tailwind.config.ts`, `src/app/globals.css`
- **Problema**: config TS define cores `hsl(var(--...))` mas `globals.css` usa `oklch` com `@theme inline` que sobrescreve.
- **Solução recomendada**: simplificar config TS (manter `darkMode`, `content`, `plugins`) ou migrar 100% para CSS.
- **Prioridade**: Baixa.

### BAIXO-3 — Repetição de padrão entre conversores de unidade
- **Arquivos**: `src/components/tools/converters/conversor-*.tsx` (6 arquivos)
- **Problema**: ~80% do esqueleto (factors + convertAll + grid) repetido.
- **Solução recomendada**: extrair `UnitConverter` genérico. Não urgente.
- **Prioridade**: Baixa.

### BAIXO-4 — Helper `loadImage` duplicado nas ferramentas de imagem
- **Arquivos**: `src/components/tools/image/*.tsx` (4 arquivos)
- **Problema**: `loadImage(file)` reimplantado em cada um.
- **Solução recomendada**: extrair para `lib/image-utils.ts`.
- **Prioridade**: Baixa.

### BAIXO-5 — Hook `use-mobile` órfão
- **Arquivos**: `src/hooks/use-mobile.ts`
- **Problema**: só importado por `ui/sidebar.tsx` (órfão).
- **Solução recomendada**: remover junto com sidebar.
- **Prioridade**: Baixa.

### BAIXO-6 — Acessibilidade: alvos de toque e skip link
- **Arquivos**: vários componentes com botões de ícone
- **Problema**: alguns botões ~36px (recomendado 44px); sem skip link.
- **Solução recomendada**: aumentar botões de ícone; adicionar skip link.
- **Prioridade**: Baixa.

### BAIXO-7 — Sem `google-site-verification`
- **Arquivos**: `src/app/layout.tsx`
- **Problema**: meta tag de verificação Search Console ausente.
- **Solução recomendada**: adicionar pós-deploy.
- **Prioridade**: Baixa (operacional).

### BAIXO-8 — `dev.log` no repositório / `.gitignore` não confirmado
- **Arquivos**: `dev.log`, `db/custom.db`
- **Problema**: artefatos de runtime podem ser commitados se `.gitignore` não cobrir.
- **Solução recomendada**: confirmar/criar `.gitignore` com `node_modules`, `.next`, `dev.log`, `db/*.db`, `agent-ctx/`.
- **Prioridade**: Baixa.

---

## Validação

| Verificação | Resultado |
|---|---|
| `bun run lint` | ✅ 0 erros, 0 warnings |
| `bunx tsc --noEmit` (src/) | ✅ 0 erros no código do produto |
| `bunx tsc --noEmit` (repo) | ⚠️ 4 erros em `examples/`+`skills/` (fora do escopo; ver ALTO-3) |
| Dev server (porta 3000) | ✅ Rodando, rotas 200 |
| Rotas quebradas | ✅ Nenhuma |
| Funcionalidades quebradas | ✅ Nenhuma encontrada |
| Componentes removidos | ✅ Nenhum (auditoria não removeu) |
| Rotas removidas | ✅ Nenhuma |
| Documentação criada | ✅ 10 docs + este relatório |

### Observação sobre `npm run build`

O ambiente de desenvolvimento tem a restrição operacional de **não executar o build de produção** (`next build` / `bun run build`) durante a iteração. Em vez disso, a prontidão para build foi validada por:
1. `bun run lint` — limpo;
2. `bunx tsc --noEmit` — `src/` sem erros (único requisito de tipo que o build checaria, já que `ignoreBuildErrors: true` está ativo);
3. Dev server saudável com todas as rotas respondendo 200.

O `next.config.ts` atual (`output: "standalone"`, `ignoreBuildErrors: true`) garante que um `next build` real não falharia por erros de tipo. Recomenda-se, em etapa futura, executar o build de produção após remover a flag `ignoreBuildErrors` (ver ALTO-1) para validar 100% da pipeline.

---

## Checklist final

- ☑ Build validado (lint + tsc limpos em `src/`)
- ☑ Projeto executando (dev server porta 3000, rotas 200)
- ☑ Nenhuma funcionalidade quebrada
- ☑ Nenhuma rota removida
- ☑ Nenhum componente removido
- ☑ Documentação criada (`docs/00` a `docs/09`)
- ☑ Relatório criado (`docs/RELATORIO_DA_AUDITORIA.md`)

## Auditoria encerrada

Nenhuma evolução foi iniciada. O projeto permanece **intacto** em código, apenas com a pasta `docs/` adicionada.
