# TOOLIUM_PROTOCOL.md

> **Constituição do projeto Toolium.**
> Este documento é a autoridade máxima sobre como o Toolium é concebido, desenvolvido e mantido.
> Qualquer IA, desenvolvedor ou agente autônomo que trabalhe neste projeto **deve ler e seguir** este Protocolo antes de qualquer alteração.
> Em caso de conflito entre este Protocolo e qualquer outro documento, **este Protocolo prevalece**.

---

## 1. Missão do Toolium

Oferecer **ferramentas online gratuitas, rápidas e sem cadastro** que facilitam tarefas do dia a dia — calculadoras, conversores, geradores, utilidades de imagem e de produtividade — com qualidade profissional, privacidade respeitada e experiência impecável em qualquer dispositivo.

## 2. Objetivos do projeto

| # | Objetivo | Como é medido |
|---|---|---|
| O1 | ** Gratuito para sempre** | Nenhuma ferramenta exige pagamento ou cadastro |
| O2 | **Velocidade** | Páginas estáticas (SSG), ferramentas client-side, resultado instantâneo |
| O3 | **Privacidade** | Processamento no navegador sempre que possível; dados sensíveis nunca saem do dispositivo |
| O4 | **Qualidade técnica** | Lint limpo, `src/` sem erros de tipo, build de produção saudável |
| O5 | **SEO** | Metadata, JSON-LD, sitemap e conteúdo editorial por ferramenta |
| O6 | **Monetização sustentável** | Google AdSense integrado de forma não-invasiva (3 posições por ferramenta) |
| O7 | **Acessibilidade & responsividade** | Funciona em celular, tablet e desktop; semântica HTML, navegação por teclado |
| O8 | **Manutenibilidade** | Arquitetura consistente, documentação viva, single source of truth |

## 3. Filosofia de desenvolvimento

1. **Primeiro compreender, depois alterar.** Nenhuma alteração acontece sem leitura prévia da documentação e do código afetado.
2. **Preservar o comportamento existente.** O sistema funciona. Mudanças que possam quebrar funcionalidades **não são executadas** — são apenas documentadas e sugeridas.
3. **Single source of truth.** Os dados das ferramentas vivem em `src/data/tools.ts`; os das categorias em `src/data/categories.ts`. Não duplicar.
4. **Reutilizar antes de criar.** Verificar se já existe componente/solução antes de adicionar novo (ver `AI_RULES.md`).
5. **Mudanças mínimas e justificadas.** Cada alteração deve ser a menor possível para atingir o objetivo, com justificativa registrada.
6. **Documentação viva.** Toda alteração de arquitetura atualiza a documentação correspondente em `docs/`.
7. **Não automatizar remoções.** Remover código, dependências, componentes ou assets **somente após análise e justificativa explícita**.
8. **Caso exista dúvida, documentar em vez de assumir.**

## 4. Stack tecnológica oficial

| Camada | Tecnologia | Imutável? |
|---|---|---|
| Framework | Next.js 16 (App Router) | ✅ Sim |
| Linguagem | TypeScript 5 (strict) | ✅ Sim |
| Estilo | Tailwind CSS 4 + shadcn/ui (New York, neutral) | ✅ Sim |
| Ícones | lucide-react | ✅ Sim |
| Temas | next-themes (claro/escuro) | ✅ Sim |
| Datas | date-fns | ✅ Sim |
| QR Code | qrcode (npm) | ✅ Sim |
| Hash MD5 | spark-md5 | ✅ Sim |
| Runtime/dev | Bun (porta 3000) | ✅ Sim |
| Deploy alvo | Vercel (`output: "standalone"`) | ✅ Sim |

**Não instalar novas dependências sem necessidade demonstrada e aprovação** (ver `AI_RULES.md`).

## 5. Processo oficial de desenvolvimento

Toda evolução do Toolium segue um **fluxo em etapas**. Uma etapa só começa quando a anterior está concluída e validada.

```
ETAPA N
  1. Ler documentação relevante (docs/ + TOOLIUM_PROTOCOL.md + AI_RULES.md)
  2. Analisar código afetado
  3. Identificar padrões existentes
  4. Propor alterações (mínimas, justificadas)
  5. Implementar
  6. Validar (lint + tsc + dev server + checklist)
  7. Atualizar documentação
  8. Produzir relatório da etapa (docs/RELATORIO_ETAPA_NN.md)
  9. Encerrar — aguardar próxima etapa
```

### Etapas já concluídas

| Etapa | Resumo | Documento de saída |
|---|---|---|
| 01 | Auditoria completa (somente leitura) | `docs/RELATORIO_DA_AUDITORIA.md` |
| 02 | Padronização de arquitetura + documentação permanente (TDF) | `docs/RELATORIO_ETAPA_02.md` |

> Etapas futuras (ex.: limpeza de dependências, slots AdSense, OG PNG) devem ser propostas pelo responsável e registradas aqui ao concluir.

## 6. Ordem das etapas (recomendada)

A ordem abaixo é **sugestão do Arquiteto** — não obrigatória, mas reflete dependências lógicas:

1. ~~Auditoria~~ ✅
2. ~~Padronização + TDF~~ ✅
3. **Higiene de configuração**: remover `ignoreBuildErrors`, reativar regras de lint valiosas, excluir `examples/`+`skills/` do `tsconfig` *(pré-requisito para confiar no build)*
4. **Limpeza de órfãos**: componentes UI órfãos + dependências correspondentes + `lib/db.ts`/`prisma/`/`api/route.ts`/`public/logo.svg`
5. **Identidade do pacote**: renomear `package.json`, adicionar metadata
6. **AdSense operacional**: slots reais + `ads.txt` + gating por consentimento
7. **SEO de produção**: `og.png`, `google-site-verification`
8. **Refatorações menores** (opcional): `UnitConverter` genérico, `lib/image-utils.ts`
9. **Novas ferramentas** (apenas após 3-6 consolidados)

## 7. Fluxo de trabalho para qualquer alteração

```
[Recebida solicitação]
        │
        ▼
[Ler TOOLIUM_PROTOCOL.md + AI_RULES.md + docs relevantes]
        │
        ▼
[Analisar código afetado] ──► [Há risco de quebrar comportamento?]
        │                           │ Sim
        │                           ▼
        │                      [NÃO EXECUTAR — apenas documentar/sugerir]
        │ Não
        ▼
[Implementar alteração mínima]
        │
        ▼
[Validar: lint + tsc src/ + dev server]
        │
        ▼
[Executar Checklist de Desenvolvimento (docs/14)]
        │
        ▼
[Atualizar docs afetadas + docs/16 histórico]
        │
        ▼
[Produzir relatório da etapa]
        │
        ▼
[Encerrar — não avançar para próxima etapa]
```

## 8. Critérios mínimos de qualidade (portão de aprovação)

Uma alteração **só pode ser aprovada** se atender **todos** os critérios abaixo:

| # | Critério | Verificação |
|---|---|---|
| Q1 | `bun run lint` sem erros nem warnings | `bun run lint` |
| Q2 | `bunx tsc --noEmit` sem erros em `src/` | `bunx tsc --noEmit \| grep ^src/` vazio |
| Q3 | Dev server responde 200 nas rotas afetadas | `tail dev.log` |
| Q4 | Nenhuma rota quebrada | navegação manual / Agent Browser |
| Q5 | Nenhum componente funcional removido sem justificativa | diff revisado |
| Q6 | Responsividade mantida (mobile + desktop) | verificação visual |
| Q7 | Modo claro/escuro funcionando | toggle testado |
| Q8 | SEO preservado (metadata, JSON-LD, sitemap) | diff revisado |
| Q9 | AdSense preservado (script + 3 posições) | diff revisado |
| Q10 | Documentação atualizada | docs/16 + docs afetadas |
| Q11 | Sem imports mortos introduzidos | verificação manual |
| Q12 | Sem código duplicado introduzido | verificação manual |

> O Checklist completo está em `docs/14-CHECKLIST_DE_DESENVOLVIMENTO.md` e o pré-deploy em `docs/15-CHECKLIST_PRE_DEPLOY.md`.

## 9. Critérios para aprovação de alterações

Uma **alteração de arquitetura** (não correção pontual) requer:

1. **Justificativa documentada** — por que mudar, qual problema resolve;
2. **Análise de impacto** — quais arquivos/rotas/funcionalidades são afetados;
3. **Plano mínimo** — menor mudança possível para o objetivo;
4. **Validação completa** — todos os critérios de Q1 a Q12;
5. **Atualização documental** — `docs/16-HISTORICO_DE_ALTERACOES.md` + docs afetadas;
6. **Relatório da etapa** — `docs/RELATORIO_ETAPA_NN.md`.

**Mudanças proibidas sem aprovação explícita do Arquiteto:**
- Trocar o framework, linguagem ou stack oficial (seção 4);
- Alterar os slugs de ferramentas existentes (impacta SEO e links externos);
- Remover páginas institucionais (`/sobre`, `/privacidade`, `/termos`, `/cookies`);
- Remover o sistema de temas, AdSense ou consentimento de cookies;
- Migrar dados de `tools.ts`/`categories.ts` para outra fonte sem plano de compatibilidade.

## 10. Autoridade e precedência

Em ordem decrescente de autoridade:

1. **`TOOLIUM_PROTOCOL.md`** (este documento)
2. **`AI_RULES.md`**
3. **`docs/14-CHECKLIST_DE_DESENVOLVIMENTO.md`** e **`docs/15-CHECKLIST_PRE_DEPLOY.md`**
4. Demais `docs/NN-*.md`
5. `docs/RELATORIO_*.md` (registros históricos, não normativos)

Em caso de contradição, o documento de maior autoridade prevalece. Contradições detectadas devem ser registradas em `docs/16-HISTORICO_DE_ALTERACOES.md` e resolvidas na próxima etapa.

---

**Versão do Protocolo**: 1.0
**Estabelecido em**: Etapa 02 (Padronização + TDF)
**Mantenedor**: Arquiteto de Software do Toolium
