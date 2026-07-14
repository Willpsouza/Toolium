# AI_RULES.md

> **Regras obrigatórias para qualquer IA, agente ou desenvolvedor que escreva código no Toolium.**
> Leia este arquivo **antes** de qualquer alteração. Em caso de dúvida, consulte `TOOLIUM_PROTOCOL.md`.

---

## Regras fundamentais

### R1 — Ler antes de alterar
Antes de modificar qualquer arquivo, leia:
1. `TOOLIUM_PROTOCOL.md`
2. `AI_RULES.md` (este arquivo)
3. Os `docs/` relevantes à área afetada
4. O próprio arquivo que será alterado

### R2 — Nunca remover código funcional sem análise
Não apague código que funciona sem:
- entender o que ele faz;
- confirmar que nada o referencia;
- justificar a remoção por escrito.

### R3 — Nunca substituir componentes existentes sem justificativa
Componentes em `src/components/` não são trocados por alternativas "melhores" sem:
- justificativa técnica documentada;
- verificação de que nenhum importador quebra;
- aprovação do Arquiteto (para componentes de produto).

### R4 — Nunca instalar dependências sem necessidade
Antes de `bun add <pkg>`:
- confirmar que nenhuma dependência existente resolve o problema;
- confirmar que não há componente shadcn/ui ou helper em `src/lib/` que resolva;
- justificar a adição por escrito.
Prefira sempre: `next` nativo > `lucide-react` > `date-fns` > shadcn/ui > nova dependência.

### R5 — Sempre reutilizar componentes existentes
Antes de criar um componente novo, verifique:
- `src/components/ui/*` (shadcn — 49 componentes);
- `src/components/layout/*`, `src/components/tools/*`, `src/components/ads/*`;
- helpers em `src/lib/` (`cn`, `formatBRL`, `parseNumber`, `getToolIcon`, `buildMetadata`, schemas JSON-LD).

### R6 — Sempre verificar se já existe solução antes de criar uma nova
Busque por padrões existentes (grep no `src/`). Ferramentas similares provavelmente já implementam o que você precisa.

### R7 — Nunca criar código duplicado
Se um padrão se repete em 3+ arquivos, **documente** a oportunidade de extração em `docs/09-PONTOS_DE_MELHORIA.md` — **não extraia automaticamente** sem aprovação.

### R8 — Manter a arquitetura consistente
Siga as camadas definidas em `docs/01-ARQUITETURA.md`:
- `app/` → rotas (Server Components);
- `components/tools/` → ferramentas (client components, registradas em `registry.tsx`);
- `components/layout/`, `components/ads/`, `components/ui/` → compartilhados;
- `data/` → fonte única (`tools.ts`, `categories.ts`);
- `lib/` → utilitários, SEO, schema, icons, format;
- `hooks/` → hooks React.

### R9 — Manter o SEO existente
Não remover:
- `metadata` exportada em qualquer rota;
- chamadas a `buildMetadata()` ou schemas JSON-LD;
- `sitemap.ts`, `robots.ts`, `manifest.ts`;
- conteúdo editorial de `tools.ts` (intro, content, howTo, example, benefits, faq);
- slugs de ferramentas (impactam URLs indexadas).

### R10 — Manter a acessibilidade
- `<html lang="pt-BR">`;
- `aria-label` em botões de ícone;
- `<Label htmlFor>` pareando inputs;
- semântica HTML (`<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`, `<article>`);
- foco visível e navegação por teclado.

### R11 — Preservar a responsividade
- Mobile-first com Tailwind (`sm:`/`md:`/`lg:`/`xl:`);
- Usar `.container-page` para largura padrão;
- Grids com `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3/4`;
- Listas longas com `max-h-* overflow-y-auto scrollbar-thin`.

### R12 — Executar validação antes de finalizar
Antes de declarar a tarefa concluída, executar:
```bash
bun run lint           # deve estar limpo
bunx tsc --noEmit      # src/ deve estar sem erros
tail -20 dev.log       # dev server deve responder 200
```
> O ambiente restringe `bun run build` / `npm run build` durante a iteração. A prontidão para build é validada por lint + tsc + dev server. Quando possível (CI/Vercel), executar o build real.

### R13 — Corrigir erros encontrados
Se a validação revelar erros **introduzidos pela sua alteração**, corrija-os antes de finalizar. Não deixe regressões.

### R14 — Atualizar documentação ao alterar arquitetura
Toda alteração que toque arquitetura, rotas, componentes de produto, dependências ou SEO deve:
- atualizar os `docs/` afetados;
- adicionar uma entrada em `docs/16-HISTORICO_DE_ALTERACOES.md`.

### R15 — Produzir relatório final
Cada etapa produz `docs/RELATORIO_ETAPA_NN.md` informando: arquivos criados, modificados, removidos, problemas, melhorias, adiados, resultados de build/tsc/lint.

### R16 — Nunca avançar para outra etapa sem concluir a atual
Uma etapa só está concluída quando: checklist validado + documentação atualizada + relatório produzido. Não iniciar a próxima etapa no mesmo fluxo sem confirmação.

### R17 — Caso exista dúvida, documentar em vez de assumir
Se não há clareza sobre o comportamento esperado, **não adivinhe**. Registre a dúvida no relatório da etapa e aguarde orientação.

---

## Regras específicas do Toolium

### R18 — Ferramentas são client components
Todo componente de ferramenta em `src/components/tools/{calculators,converters,generators,image,productivity}/` deve:
- iniciar com `"use client"`;
- exportar **default**;
- ser registrado em `src/components/tools/registry.tsx` (slug → componente);
- ter entrada correspondente em `src/data/tools.ts` (slug, title, description, keywords, intro, content, howTo, example, benefits, faq).

### R19 — Novas ferramentas exigem dados + componente + registro
Para adicionar uma ferramenta:
1. Adicionar entrada em `src/data/tools.ts` (todos os campos SEO/editoriais);
2. Criar o componente em `src/components/tools/<categoria>/<slug>.tsx`;
3. Registrar o import e o mapeamento em `registry.tsx`;
4. Adicionar o ícone em `src/lib/icons.ts` (se for um ícone novo);
5. Validar que `generateStaticParams` (em `[slug]/page.tsx`) a detecta — ele já lê `tools.ts`, então é automático;
6. A ferramenta aparece automaticamente em `/ferramentas`, na home (se `popular: true`) e na sua categoria.

### R20 — AdBanner: 3 posições por ferramenta
Não remover nem reposicionar os 3 `<AdBanner />` do `tool-page.tsx` (após intro, após ferramenta, antes do FAQ). São parte da especificação do produto.

### R21 — Temas: tokens oklch
Cores do produto usam tokens CSS (`bg-brand`, `text-foreground`, etc.), **nunca** hex direto. Os tokens vivem em `src/app/globals.css` (`:root` e `.dark`). Acento de marca = esmeralda (`--brand`). **Não usar azul ou índigo** como cor primária.

### R22 — Rotas dinâmicas com SSG
Rotas dinâmicas (`[slug]`, `[categoria]`) usam `generateStaticParams` + `dynamicParams = false`. Não converter para SSR sem justificativa de performance/SEO.

### R23 — Não usar portas em URLs
Todo `fetch`/link deve ser relativo. Para serviços em outras portas, usar `?XTransformPort=<porta>` (ver `Caddyfile`). O Toolium atualmente **não usa** serviços em outras portas.

### R24 — z-ai-web-dev-sdk só no backend
Se alguma feature de IA for adicionada, o `z-ai-web-dev-sdk` é **somente server-side** (API route ou Server Component). Nunca importá-lo em client components.

### R25 — Não commitar artefatos de runtime
`dev.log`, `db/custom.db`, `.next/`, `agent-ctx/` não devem ser commitados. Confirmar `.gitignore`.

---

## Quick reference — onde mora cada coisa

| Preciso... | Vá em... |
|---|---|
| Metadata de uma ferramenta | `src/data/tools.ts` |
| Lista de categorias | `src/data/categories.ts` |
| Mapear slug → componente | `src/components/tools/registry.tsx` |
| Layout padrão de ferramenta | `src/components/tools/tool-page.tsx` |
| Card de ferramenta | `src/components/tools/tool-card.tsx` |
| Busca/listagem | `src/components/tools/tools-explorer.tsx` |
| Header/Footer | `src/components/layout/` |
| SEO metadata | `src/lib/seo.ts` (`buildMetadata`) |
| JSON-LD | `src/lib/schema.ts` |
| Ícones | `src/lib/icons.ts` (`iconMap`) |
| Formatação BRL/número | `src/lib/format.ts` |
| `cn()` (clsx+twMerge) | `src/lib/utils.ts` |
| shadcn/ui | `src/components/ui/*` |
| AdSense | `src/components/ads/ad-banner.tsx` + `src/app/layout.tsx` |
| Consentimento cookies | `src/components/cookie-consent.tsx` |
| Sitemap/robots/manifest | `src/app/{sitemap,robots,manifest}.ts` |

---

**Cumprir estas regras é obrigatório.** Descumprir R1-R17 invalida o trabalho da IA e exige reversão.
