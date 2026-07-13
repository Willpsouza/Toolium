# 16 — Histórico de Alterações

> Registro permanente das alterações arquiteturais e de documentação do Toolium.
> Cada entrada deve conter: data, etapa, responsável, resumo, arquivos afetados, validação.
> **Não remover entradas históricas** — apenas adicionar novas no topo.

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
