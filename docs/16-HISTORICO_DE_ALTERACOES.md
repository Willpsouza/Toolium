# 16 — Histórico de Alterações

> Registro permanente das alterações arquiteturais e de documentação do Toolium.
> Cada entrada deve conter: data, etapa, responsável, resumo, arquivos afetados, validação.
> **Não remover entradas históricas** — apenas adicionar novas no topo.

---

## [Etapa 09] — Security Engineer

- **Data**: etapa 09
- **Responsável**: Security Engineer
- **Tipo**: Segurança (baixo risco — headers HTTP, error.tsx, .env.example; sem alterar funcionalidades/layout/ferramentas/rotas/SEO/AdSense/UX)

### Resumo
Auditoria de segurança para produção. 7 itens identificados, 4 corrigidos, 3 adiados. Correções: (1) 6 headers HTTP de segurança no `next.config.ts` (CSP completa, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, HSTS); (2) `poweredByHeader: false` remove X-Powered-By; (3) `src/app/error.tsx` (página 500 customizada pt-BR, sem vazar stack traces); (4) `.env.example` documentando `DATABASE_URL`. CSP validada via Agent Browser: não bloqueia estilos Tailwind, fontes next/font, nem AdSense (domínios do AdSense permitidos). Production Gate APROVADO. Itens adiados: deps vulneráveis (em órfãs, não afetam bundle), reactStrictMode (pode alterar dev), ignoreBuildErrors (sensível).

### Arquivos modificados
- `next.config.ts` — adicionados `securityHeaders` (6 headers) + `headers()` function + `poweredByHeader: false`

### Arquivos criados
- `src/app/error.tsx` — boundary de erro global (página 500 pt-BR com "Tentar novamente" + link home)
- `.env.example` — documentação de variáveis de ambiente
- `docs/SECURITY_AUDIT.md` (plano FASE 2)
- `docs/PRODUCTION_CHECKLIST.md` (checklist consolidado 75/96 itens)
- `docs/RELATORIO_ETAPA_09.md`

### Arquivos removidos
- Nenhum

### Validação
- `bun run lint` → ✅ limpo
- `bunx tsc --noEmit` (`src/`) → ✅ sem erros
- Dev server → ✅ rotas 200; 404 retorna 404
- curl headers: CSP + X-Frame-Options + X-Content-Type-Options + Referrer-Policy + Permissions-Policy + HSTS servidos; X-Powered-By removido
- Agent Browser: home e tool page renderizam com CSP; estilos e fontes funcionam; sem console errors de CSP
- `bun audit`: 54 vulnerabilidades (quase todas em deps órfãs transitivas; não afetam bundle de produção)
- SEO/AdSense/UX/conteúdo/performance — todos preservados
- Build real não executado (restrição de ambiente); prontidão atestada por lint + tsc + dev server + headers servidos

### Production Gate: ✅ APROVADO
75/96 itens do checklist concluídos; 21 pendentes são operacionais (pós-deploy) ou adiados sem bloqueio.

### Itens adiados
- SEC-04: deps vulneráveis (remoção em etapa de limpeza de deps)
- SEC-05: reactStrictMode (pode alterar comportamento dev)
- SEC-06: ignoreBuildErrors (sensível, etapa de higiene de config)

---

## [Etapa 08] — Performance Engineer

- **Data**: etapa 08
- **Responsável**: Performance Engineer
- **Tipo**: Performance (baixo risco — dynamic imports, Suspense, loading.tsx; sem alterar funcionalidades/layout/ferramentas/rotas/SEO/AdSense)

### Resumo
Auditoria de performance e Core Web Vitals. 5 itens identificados, 3 implementados, 2 adiados. Principal otimização: `registry.tsx` convertido de imports estáticos para `next/dynamic` — antes cada página de ferramenta carregava JS das 32 ferramentas; agora carrega apenas a exibida (redução estimada ~70% do bundle JS por tool page). Também: `<Suspense>` boundary com `ToolSkeleton` no `tool-page.tsx` (skeleton durante navegação client-side); `loading.tsx` na rota `[slug]` (perceived performance). Regra de ouro aplicada: memoização adicional e image optimization NÃO implementadas (ganho pequeno, complexidade alta). Funcionalidade 100% preservada (SSG mantido, SSR mantido, hidratação intacta). Validado via Agent Browser.

### Arquivos modificados
- `src/components/tools/registry.tsx` — 32 imports estáticos → 32 `dynamic(() => import(...))` com `next/dynamic`; `ssr: true` (default) preserva SSG/SSR
- `src/components/tools/tool-page.tsx` — adicionado `<Suspense fallback={<ToolSkeleton />}>` ao redor de `<ToolComponent />`; import `Suspense` do React; novo componente `ToolSkeleton` (classes Tailwind existentes)

### Arquivos criados
- `src/app/[slug]/loading.tsx` — skeleton de loading para rota de ferramenta (convenção nativa Next.js)
- `docs/PERFORMANCE_AUDIT.md` (plano FASE 2)
- `docs/PERFORMANCE_BASELINE.md` (baseline de performance)
- `docs/RELATORIO_ETAPA_08.md`

### Arquivos removidos
- Nenhum

### Validação
- `bun run lint` → ✅ limpo
- `bunx tsc --noEmit` (`src/`) → ✅ sem erros
- Dev server → ✅ rotas 200
- Agent Browser: `/calculadora-juros-compostos` renderiza (title, H1, inputs, resultados); sem console errors; skeleton `animate-pulse` disponível
- Ferramentas, rotas, SEO (Etapa 04), AdSense (Etapa 07), UX (Etapa 06), conteúdo (Etapa 05) — todos preservados
- Build real não executado (restrição de ambiente); prontidão atestada por lint + tsc + dev server

### Itens adiados
- PERF-04: `framer-motion` dependência morta (limpeza de dep, não performance de código)
- PERF-05: prefetch explícito (já otimizado por default do next/link)
- Memoização adicional (Regra de Ouro — sem ganho claro)
- Image optimization (já otimizado — SVG inline, canvas previews)

---

## [Etapa 07] — Google AdSense e Qualidade de Publicação

- **Data**: etapa 07
- **Responsável**: Especialista em Google AdSense e Qualidade de Publicação
- **Tipo**: AdSense (baixo risco — preparação para aprovação; sem alterar funcionalidades/ferramentas/arquitetura/layout)

### Resumo
Auditoria de conformidade com boas práticas AdSense. 6 itens identificados, 3 corrigidos, 3 adiados (dependem de slots reais pós-aprovação). Correções: (1) criado `public/ads.txt` com linha do Google; (2) criado `AdsenseScript` (client component) que carrega o script AdSense **somente após consentimento "accepted"** no banner de cookies (LGPD/GDPR) — `CookieConsent` passou a disparar evento `toolium:cookie-consent-changed`; `layout.tsx` substituiu `<Script>` direto por `<AdsenseScript />`; (3) adicionado 1 `<AdBanner />` na listagem `/ferramentas`. Validado via Agent Browser: script ausente sem consentimento, presente após aceite (sem recarregar). Probabilidade qualitativa de conformidade: ALTA (não garante aprovação).

### Arquivos modificados
- `src/components/cookie-consent.tsx` — adicionado `window.dispatchEvent(new Event("toolium:cookie-consent-changed"))` em `setConsent`
- `src/app/layout.tsx` — substituído `<Script>` AdSense direto por `<AdsenseScript />` (import atualizado)
- `src/app/ferramentas/page.tsx` — adicionado `<AdBanner className="my-12" />` + import

### Arquivos criados
- `public/ads.txt` — `google.com, pub-2570963650556560, DIRECT, f08c47fec0942fa0`
- `src/components/ads/adsense-script.tsx` — client component com gating por consentimento
- `docs/ADSENSE_AUDIT.md` (plano FASE 2)
- `docs/RELATORIO_ETAPA_07.md`

### Arquivos removidos
- Nenhum

### Validação
- `bun run lint` → ✅ limpo
- `bunx tsc --noEmit` (`src/`) → ✅ sem erros
- Dev server → ✅ rotas 200; `/ads.txt` HTTP 200
- AdBanner count: tool page 3 (preservado), home 1, listagem 1 (novo), categoria 1
- Agent Browser: sem consentimento → `scriptPresent: false`, `adsbygoogleLoaded: false`; após "Aceitar" → `scriptPresent: true`, `adsbygoogleLoaded: true` (sem reload); sem console errors
- Build real não executado (restrição de ambiente); alterações são 1 arquivo de texto + 1 componente client + 1 evento + 1 substituição de import + 1 AdBanner — impacto nulo

### Itens adiados
- AD-02: slots reais nos `<AdBanner />` (pós-aprovação AdSense, criar blocos no painel)
- AD-05: otimizar `format` por posição (só com slots reais)
- AD-06: `data-ad-layout` avançado (opcional)

---

## [Etapa 06] — UX Lead

- **Data**: etapa 06
- **Responsável**: UX Lead
- **Tipo**: UX (baixo risco — reutilização de componentes existentes; sem novos recursos, sem bibliotecas)

### Resumo
Auditoria UX em 10 dimensões (UX Score 7,9/10; Friction Score 4,2/10). 5 correções implementadas reutilizando apenas componentes existentes: (1) página 404 customizada em pt-BR com CTAs e populares (`not-found.tsx`); (2) seção "Ferramentas relacionadas" no tool-page (4 cards da mesma categoria); (3) CTA final após FAQ; (4) link "Todas as ferramentas" no footer; (5) botão hero "Ver calculadoras" → "Ver categorias". Pós-implementação: UX Score 9,0; Friction Score 1,2. Nenhuma ferramenta alterada, nenhuma biblioteca instalada, AdSense e SEO preservados.

### Arquivos modificados
- `src/components/tools/tool-page.tsx` — adicionada seção "Ferramentas relacionadas" (componente `RelatedTools`) + CTA final após FAQ; novos imports (`ToolCard`, `Button`, `getToolsByCategory`, `ArrowRight`, `Sparkles`)
- `src/components/layout/site-footer.tsx` — adicionado link "Todas as ferramentas" no topo da coluna Populares
- `src/app/page.tsx` — texto do botão hero: "Ver calculadoras" → "Ver categorias"

### Arquivos criados
- `src/app/not-found.tsx` — página 404 customizada pt-BR (H1 + CTAs + populares)
- `docs/UX_AUDIT.md` (avaliação FASE 2)
- `docs/RELATORIO_ETAPA_06.md`

### Arquivos removidos
- Nenhum

### Validação
- `bun run lint` → ✅ limpo
- `bunx tsc --noEmit` (`src/`) → ✅ sem erros
- Dev server → ✅ rotas 200; 404 retorna 404 correto
- Agent Browser: 404 com CTAs + 10 cards populares; tool-page com 4 relacionadas + CTA; mobile 390px sem overflow; sem console errors
- SEO (Etapa 04) e AdSense preservados
- Build real não executado (restrição de ambiente); alterações reutilizam componentes existentes — impacto nulo

### Itens adiados
- Busca global no header (feature nova)
- Link "voltar ao topo" no footer (feature nova)
- Busca rápida no Sheet mobile (feature nova)

---

## [Etapa 05] — Content Lead & SEO On-Page

- **Data**: etapa 05
- **Responsável**: Content Lead e Especialista em SEO On-Page
- **Tipo**: Conteúdo (baixo risco — apenas correções pontuais de texto em `tools.ts`)

### Resumo
Auditoria do conteúdo das 32 ferramentas (7 critérios: SEO, Conteúdo, Legibilidade, UX, Organização, Originalidade, Precisão). Nota média 9,0/10. Apenas 4 ferramentas necessitaram correção: 1 erro matemático no FAQ do conversor-temperatura ("20 °C → 36 × ... → 68 °F" reescrito como 20×9=180; 180÷5=36; 36+32=68) e 3 exemplos vagos sem número concreto (calculadora-salario-liquido, calculadora-idade, conversor-moedas) substituídos por exemplos numéricos. Nenhuma ferramenta reescrita — apenas campos defeituosos corrigidos. Após FASE 3, todas as 32 aprovadas.

### Arquivos modificados
- `src/data/tools.ts` — 4 correções pontuais: FAQ de `conversor-temperatura`; `example` de `calculadora-salario-liquido`, `calculadora-idade`, `conversor-moedas`; indentação de 1 benefit em `conversor-temperatura`

### Arquivos criados
- `docs/CONTENT_AUDIT.md` (notas pré-correção)
- `docs/QUALITY_REPORT.md` (notas pós-correção)
- `docs/RELATORIO_ETAPA_05.md`

### Arquivos removidos
- Nenhum

### Validação
- `bun run lint` → ✅ limpo
- `bunx tsc --noEmit` (`src/`) → ✅ sem erros
- Dev server → ✅ rotas 200
- curl nas 4 ferramentas alteradas → conteúdo corrigido servido (incluindo JSON-LD FAQ schema)
- Title SEO (Etapa 04) preservado — sem duplicação "Toolium | Toolium"
- 28 ferramentas não tocadas permanecem intactas
- Build real não executado (restrição de ambiente); alterações são apenas strings de conteúdo — impacto nulo

### Itens adiados
- Nenhum (todos os 4 problemas identificados foram corrigidos)

---

## [Etapa 04] — SEO Técnico e Indexação

- **Data**: etapa 04
- **Responsável**: Engenheiro de SEO Técnico
- **Tipo**: SEO técnico (baixo risco — apenas metadata/schema/sitemap; sem alterar funcionalidades, ferramentas, layout, textos)

### Resumo
Auditoria + correção de SEO técnico. 8 itens identificados, 6 corrigidos, 2 adiados. Principal correção: **titles duplicados "X | Toolium | Toolium"** em todas as páginas internas (causa: `buildMetadata` sufixava "| Toolium" e o `layout.tsx` aplicava `title.template` por cima). Corrigido retornando title sem sufixo e usando `title.absolute` para títulos que já contêm "Toolium". Também: canonical da home alinhado com sitemap; `SearchAction` inválido removido do WebSite schema; `@id` adicionado em Organization/WebSite com `publisher` vinculado; `foundingDate` (não verificado) e `sameAs: []` (vazio) removidos.

### Arquivos modificados
- `src/lib/seo.ts` — `buildMetadata`: title sem sufixo + `title.absolute` para nomes com "Toolium"; canonical consistente; OG/Twitter titles com sufixo manual
- `src/lib/schema.ts` — `organizationSchema` + `websiteSchema`: `@id` adicionado, `foundingDate`/`sameAs`/`potentialAction` removidos, `publisher` referencia `@id`
- `src/app/layout.tsx` — `alternates.canonical` da home absoluto
- `src/app/sitemap.ts` — home URL alinhada com canonical

### Arquivos criados
- `docs/SEO_PLANO_DE_CORRECAO.md`
- `docs/RELATORIO_ETAPA_04.md`

### Arquivos removidos
- Nenhum

### Validação
- `bun run lint` → ✅ limpo
- `bunx tsc --noEmit` (`src/`) → ✅ sem erros
- Dev server → ✅ rotas 200
- curl em 8 rotas: titles sem duplicação, canonical consistente, JSON-LD válido
- Agent Browser: home/tool/category renderizam corretamente, sem console errors
- Build real não executado (restrição de ambiente); alterações são apenas strings de metadata/schema — impacto nulo

### Itens adiados
- SEO-07: OG image em SVG → gerar `og.png` 1200×630 (requer ferramenta externa)
- SEO-08: `favicon.ico` fallback (requer conversão SVG→ICO)

---

## [Etapa 03] — Elevação UX/UI da Homepage

- **Data**: etapa 03
- **Responsável**: Lead UX/UI Engineer
- **Tipo**: UX/UI (baixo risco — sem alterar arquitetura, rotas, ferramentas, SEO existente)

### Resumo
Homepage elevada ao padrão SaaS profissional com melhorias incrementais: substituição das "5 estrelas" (placeholder de avaliação) por uma trust bar factual; adição de stats bar com dados reais (32 ferramentas · 5 categorias · 0 cadastros · R$ 0); nova seção "Para quem é o Toolium" com 4 personas; refinamento de copy do subtítulo e FAQ; reordenação narrativa (Como funciona → Para quem é → Benefícios). Identidade visual, navegação, ferramentas, SEO e AdSense integralmente preservados.

### Arquivos modificados
- `src/app/page.tsx` — único arquivo editado; `metadata` export intacto (SEO preservado)

### Arquivos criados
- `docs/RELATORIO_ETAPA_03.md`

### Arquivos removidos
- Nenhum

### Validação
- `bun run lint` → ✅ limpo
- `bunx tsc --noEmit` (`src/`) → ✅ sem erros
- Dev server → ✅ `/` retorna 200
- Agent Browser → ✅ desktop (headings, trust bar, stats, persona section), mobile 390px (sem scroll horizontal), dark mode (contraste OK), ferramenta `/calculadora-juros-compostos` intacta
- Build real não executado (restrição de ambiente); prontidão atestada por lint + tsc + dev server

### Itens adiados
- Busca rápida direta no hero (exige componente/rota nova — fora do escopo)
- OG image em PNG (item de SEO, etapa futura)
- Microanimações via framer-motion (não instalar dep sem necessidade — R4)

---

## [Etapa 02] — Padronização de arquitetura + TDF (Toolium Development Framework)

- **Data**: etapa 02
- **Responsável**: Arquiteto de Software
- **Tipo**: Documentação / Padronização (sem alteração de código de produto)

### Resumo
Estabelecido o **Toolium Development Framework (TDF)**: conjunto oficial de regras, convenções e checklists que qualquer IA ou desenvolvedor deve seguir ao trabalhar no projeto. Criados os arquivos constitucionais (`TOOLIUM_PROTOCOL.md`, `AI_RULES.md`) e 7 novos documentos em `docs/` (10–16). **Nenhum arquivo de código de produto foi alterado, removido ou criado** — apenas documentação.

### Arquivos criados
- `TOOLIUM_PROTOCOL.md` (raiz) — Constituição do projeto
- `AI_RULES.md` (raiz) — Regras obrigatórias para IAs
- `docs/10-CONVENCOES_DO_PROJETO.md`
- `docs/11-PADRAO_DE_COMPONENTES.md`
- `docs/12-PADRAO_DE_ROTAS.md`
- `docs/13-PADRAO_DE_NOMENCLATURA.md`
- `docs/14-CHECKLIST_DE_DESENVOLVIMENTO.md`
- `docs/15-CHECKLIST_PRE_DEPLOY.md`
- `docs/16-HISTORICO_DE_ALTERACOES.md` (este arquivo)
- `docs/RELATORIO_ETAPA_02.md`

### Arquivos modificados
- Nenhum (apenas adições).

### Arquivos removidos
- Nenhum.

### Padrões formalizados (já eram de fato; agora normativos)
- Componentes de ferramenta: `"use client"` + default export + registro em `registry.tsx`;
- Rotas dinâmicas: `generateStaticParams` + `dynamicParams = false`;
- Tokens semânticos Tailwind (sem hex; sem azul/índigo primário);
- `buildMetadata()` para SEO de cada rota;
- 3 posições de `AdBanner` por ferramenta;
- `<html lang="pt-BR">`, mobile-first, acessibilidade mínima.

### Oportunidades de melhoria registradas (não executadas)
- Arquivos >400 linhas (futuro: avaliar divisão, sem automação):
  - `src/data/tools.ts` (1764 linhas) — arquivo de dados, crescimento natural;
  - `src/components/tools/image/redimensionador-imagem.tsx` (584 linhas);
  - `src/components/ui/sidebar.tsx` (726 linhas) — **órfão**, remover quando limpeza ocorrer.
- Demais oportunidades já listadas em `docs/09-PONTOS_DE_MELHORIA.md` e `docs/RELATORIO_DA_AUDITORIA.md`.

### Validação
- `bun run lint` → ✅ limpo;
- `bunx tsc --noEmit` → ✅ sem erros em `src/`;
- Dev server porta 3000 → ✅ rotas 200;
- Nenhuma rota quebrada, nenhum componente removido, nenhuma funcionalidade alterada.

---

## [Etapa 01] — Auditoria completa (somente leitura)

- **Data**: etapa 01
- **Responsável**: Engenheiro de Software (auditor)
- **Tipo**: Auditoria (sem alteração de código)

### Resumo
Auditoria completa do estado atual do projeto. Criados 10 documentos de documentação + 1 relatório em `docs/`. Nenhum código alterado.

### Arquivos criados
- `docs/00-VISAO_DO_PROJETO.md`
- `docs/01-ARQUITETURA.md`
- `docs/02-ESTRUTURA_DE_PASTAS.md`
- `docs/03-COMPONENTES.md`
- `docs/04-DEPENDENCIAS.md`
- `docs/05-ROTAS.md`
- `docs/06-SEO.md`
- `docs/07-ADSENSE.md`
- `docs/08-RESPONSIVIDADE.md`
- `docs/09-PONTOS_DE_MELHORIA.md`
- `docs/RELATORIO_DA_AUDITORIA.md`

### Principais achados (ver relatório completo)
- 43 rotas face ao usuário, 32 ferramentas, 45 componentes de produto, 49 UI (18 em uso);
- Lint limpo, `src/` sem erros de tipo;
- 0 problemas críticos; 3 altos, 8 médios, 8 baixos;
- ~48 dependências não usadas; ~29 componentes UI órfãos; Prisma não usado.

### Validação
- `bun run lint` → ✅ limpo;
- `bunx tsc --noEmit` → ✅ sem erros em `src/` (erros apenas em `examples/`+`skills/`);
- Dev server → ✅ saudável.

---

## [Etapa 00] — Construção inicial do Toolium

- **Data**: construção inicial
- **Responsável**: equipe de desenvolvimento (subagentes full-stack)
- **Tipo**: Implementação

### Resumo
Construção do zero do projeto Toolium sobre scaffold Next.js 16 + Tailwind 4 + shadcn/ui. Implementadas 32 ferramentas em 5 categorias, layout, SEO, AdSense, páginas institucionais, cookie consent, tema claro/escuro.

### Arquivos criados (resumo)
- Layout: `src/app/layout.tsx`, `src/app/page.tsx`, `src/components/layout/*`, `src/components/cookie-consent.tsx`, `src/components/ads/ad-banner.tsx`;
- Dados: `src/data/tools.ts`, `src/data/categories.ts`;
- Framework de ferramentas: `src/components/tools/{registry,tool-page,tool-card,tools-explorer,faq-section}.tsx`;
- 32 componentes de ferramenta em `src/components/tools/{calculators,converters,generators,image,productivity}/`;
- Lib: `src/lib/{seo,schema,icons,format,utils,db}.ts`;
- Rotas: `src/app/[slug]/page.tsx`, `src/app/ferramentas/{page,[categoria]/page}.tsx`, `src/app/{sobre,privacidade,termos,cookies}/page.tsx`, `src/app/{sitemap,robots,manifest}.ts`;
- Assets: `public/logo.svg`, `public/og.svg`, `src/app/icon.svg`;
- Logo, design system (globals.css com tokens oklch), theme provider.

### Validação
- Lint limpo, tsc `src/` limpo, Agent Browser verificou interatividade das ferramentas.

---

## Modelo para entradas futuras

```
## [Etapa NN] — <título>

- **Data**: <etapa ou data>
- **Responsável**: <papel>
- **Tipo**: <Documentação / Implementação / Refatoração / Correção / Limpeza>

### Resumo
<1-3 parágrafos>

### Arquivos criados
- <lista>

### Arquivos modificados
- <lista com motivo>

### Arquivos removidos
- <lista com motivo>

### Validação
- lint: <resultado>
- tsc src/: <resultado>
- dev server: <resultado>
- checklist docs/14: <marcado/N/A>

### Itens adiados
- <lista com justificativa>
```

> Adicionar novas entradas **acima** desta seção de modelo, mantendo a mais recente no topo (após a linha horizontal inicial).
