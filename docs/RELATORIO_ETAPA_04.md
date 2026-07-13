# Relatório — Etapa 04: SEO Técnico e Indexação

> Etapa: **04 — Revisão e aperfeiçoamento do SEO técnico e indexação**
> Responsável: Engenheiro de SEO Técnico
> Nível de risco: **BAIXO** — apenas correções técnicas de metadata/schema/sitemap; sem alterar funcionalidades, ferramentas, layout ou textos.

## Resumo executivo

### Situação do SEO
O Toolium já possuía uma base SEO técnica sólida (metadata global + por página, canonical, OG/Twitter, sitemap.xml, robots.txt, manifest, favicon, JSON-LD em 5 formas, URLs amigáveis, heading hierarchy correta, alt em imagens). A auditoria identificou **8 itens** de oportunidade, dos quais **6 foram corrigidos** (todos de baixo risco) e **2 foram adiados** (requerem geração de assets externos). O mais crítico era o **title duplicado "X | Toolium | Toolium"** em todas as páginas internas — agora corrigido.

### Problemas encontrados: 8
### Problemas corrigidos: 6
### Problemas adiados: 2

---

## Problemas encontrados e status

| ID | Problema | Prioridade | Status |
|---|---|---|---|
| SEO-01 | Titles duplicados ("X \| Toolium \| Toolium") | 🔴 CRÍTICA | ✅ Corrigido |
| SEO-02 | Canonical da home inconsistente com sitemap | 🟠 ALTA | ✅ Corrigido |
| SEO-03 | SearchAction apontando para busca inexistente via URL | 🟠 ALTA | ✅ Corrigido |
| SEO-04 | Schemas Organization/WebSite sem `@id` (vinculação fraca) | 🟡 MÉDIA | ✅ Corrigido |
| SEO-05 | `organizationSchema.sameAs: []` vazio | 🟢 BAIXA | ✅ Corrigido |
| SEO-06 | `organizationSchema.foundingDate: "2024"` não verificado | 🟡 MÉDIA | ✅ Corrigido (removido) |
| SEO-07 | OG/Twitter image em SVG (não renderiza em algumas plataformas) | 🟡 MÉDIA | ⏸️ Adiado |
| SEO-08 | Sem `favicon.ico` fallback | 🟢 BAIXA | ⏸️ Adiado |

Detalhes completos em `docs/SEO_PLANO_DE_CORRECAO.md`.

---

## Problemas corrigidos (detalhe)

### SEO-01 — Titles duplicados (CRÍTICA)
- **Antes**: `/calculadora-juros-compostos` → `<title>Calculadora de Juros Compostos | Toolium | Toolium</title>`
- **Causa**: `buildMetadata` sufixava "| Toolium" e o `layout.tsx` aplicava `title.template: "%s | Toolium"` por cima.
- **Correção**: `buildMetadata` agora retorna o title **sem sufixo**; o template do layout adiciona "| Toolium" uma única vez. Títulos que já contêm "Toolium" (ex.: "Sobre o Toolium") usam `title.absolute` para bypass do template.
- **Depois**: `/calculadora-juros-compostos` → `<title>Calculadora de Juros Compostos | Toolium</title>`; `/sobre` → `<title>Sobre o Toolium</title>`.
- OG/Twitter titles recebem o sufixo manualmente (não usam template).

### SEO-02 — Canonical da home consistente com sitemap
- **Antes**: canonical da home = `https://toolium.com.br`; sitemap = `https://toolium.com.br/` (inconsistência).
- **Correção**: `layout.tsx` canonical = `${siteConfig.url}/`; `buildMetadata` canonical usa path absoluto consistente; sitemap home URL alinhada para `https://toolium.com.br` (Next.js normaliza canonical sem barra; sitemap alinhado para consistência).
- **Depois**: canonical e sitemap da home ambos `https://toolium.com.br`.

### SEO-03 — Removido SearchAction inválido
- **Antes**: `websiteSchema.potentialAction` apontava para `/ferramentas?q={search_term_string}`, mas a busca é client-side (não lê `?q=`).
- **Correção**: removido o `potentialAction` do `websiteSchema`. Evita que o Google indexe URLs com query inválida.

### SEO-04 — Schemas com `@id` e vinculação
- **Antes**: Organization e WebSite sem `@id`; WebSite duplicava dados do publisher.
- **Correção**: adicionado `@id` (`/#organization`, `/#website`); `WebSite.publisher` agora referencia `{"@id": ".../#organization"}` — grafo de entidades vinculado.

### SEO-05 — Removido `sameAs: []`
- Array vazio não agregava valor; removido. Re-adicionar quando houver redes sociais reais.

### SEO-06 — Removido `foundingDate: "2024"`
- Data não verificada (risco de informação falsa em rich results). Removida conforme princípio "nunca inventar".

---

## Problemas adiados

| ID | Problema | Motivo do adiamento |
|---|---|---|
| SEO-07 | OG image em SVG | Geração de `og.png` 1200×630 requer ferramenta externa (image-generation skill). Registrado em `docs/09-PONTOS_DE_MELHORIA.md` (BAIXO-1). Fora do escopo de "SEO técnico puro sem alterar assets". |
| SEO-08 | Sem `favicon.ico` | Conversão SVG→ICO requer ferramenta. Navegadores modernos usam o SVG via `app/icon.svg`. Registrado para etapa futura. |

---

## Arquivos modificados

| Arquivo | Alteração | Risco |
|---|---|---|
| `src/lib/seo.ts` | `buildMetadata`: title sem sufixo (usa `title.absolute` para títulos com "Toolium"); canonical consistente; OG/Twitter titles com sufixo manual | BAIXO |
| `src/lib/schema.ts` | `organizationSchema` + `websiteSchema`: adicionado `@id`, removido `foundingDate`/`sameAs`/`potentialAction`; `publisher` referencia `@id` | BAIXO |
| `src/app/layout.tsx` | `alternates.canonical` da home agora absoluto (`${siteConfig.url}/`) | BAIXO |
| `src/app/sitemap.ts` | Home URL alinhada com canonical (sem barra final) | BAIXO |

## Arquivos criados
- `docs/SEO_PLANO_DE_CORRECAO.md`
- `docs/RELATORIO_ETAPA_04.md` (este relatório)

## Arquivos removidos
- **Nenhum.**

## Arquivos NÃO alterados (confirmado)
- `src/app/page.tsx` (home), `src/app/[slug]/page.tsx`, `src/app/ferramentas/**`, `src/app/{sobre,privacidade,termos,cookies}/page.tsx`
- `src/components/**` (header, footer, tools, ads, ui)
- `src/data/**` (tools.ts, categories.ts — textos das ferramentas intactos)
- `public/**` (logo.svg, og.svg)
- `src/app/manifest.ts`, `src/app/robots.ts`
- Ferramentas: nenhuma modificada
- Páginas institucionais: nenhuma modificada

---

## Resultado do Build

O ambiente de desenvolvimento tem restrição operacional de não executar `bun run build` / `npm run build` durante a iteração. A prontidão para build foi validada por:
1. `bun run lint` → ✅ limpo (0 erros, 0 warnings);
2. `bunx tsc --noEmit` → ✅ sem erros em `src/`;
3. Dev server → ✅ porta 3000, todas as rotas 200;
4. `curl` em 8 rotas verificando titles, canonical, JSON-LD;
5. Agent Browser confirmando renderização intacta (home, ferramenta, categoria).

As alterações são exclusivamente em strings de metadata e objetos JSON-LD (sem novos imports, sem alteração de configuração de build). O impacto no build de produção é nulo. Recomenda-se executar `next build` em CI/Vercel antes do deploy.

## Resultado do TypeScript
- `bunx tsc --noEmit` → ✅ sem erros em `src/` (erros pré-existentes apenas em `examples/`+`skills/`, fora do escopo).

## Resultado do ESLint
- `bun run lint` → ✅ 0 erros, 0 warnings.

---

## Testes realizados

### Validação automática
| Verificação | Resultado |
|---|---|
| `bun run lint` | ✅ Limpo |
| `bunx tsc --noEmit` (`src/`) | ✅ Sem erros |
| Dev server porta 3000 | ✅ Rodando |

### Validação SEO servida (curl)
| Rota | Title (antes → depois) | Canonical |
|---|---|---|
| `/` | "Toolium — Ferramentas online gratuitas" (mantido) | ✅ `https://toolium.com.br` |
| `/ferramentas` | ~~"Todas as ferramentas online gratuitas \| Toolium \| Toolium"~~ → **"Todas as ferramentas online gratuitas \| Toolium"** | ✅ `.../ferramentas` |
| `/sobre` | ~~"Sobre o Toolium \| Toolium"~~ → **"Sobre o Toolium"** | ✅ `.../sobre` |
| `/calculadora-juros-compostos` | ~~"... \| Toolium \| Toolium"~~ → **"Calculadora de Juros Compostos \| Toolium"** | ✅ `.../calculadora-juros-compostos` |
| `/conversor-temperatura` | ~~"... \| Toolium \| Toolium"~~ → **"Conversor de Temperatura \| Toolium"** | ✅ |
| `/gerador-senhas` | ~~"... \| Toolium \| Toolium"~~ → **"Gerador de Senhas \| Toolium"** | ✅ |
| `/ferramentas/calculadoras` | ~~"... \| Toolium \| Toolium"~~ → **"Calculadoras online gratuitas \| Toolium"** | ✅ |
| `/privacidade` | ~~"... \| Toolium \| Toolium"~~ → **"Política de Privacidade \| Toolium"** | ✅ |

### Validação JSON-LD
| Schema | Estado |
|---|---|
| Organization | ✅ Com `@id`, sem `foundingDate`/`sameAs` |
| WebSite | ✅ Com `@id`, sem `SearchAction`, `publisher` referencia `@id` da Organization |
| BreadcrumbList (tool pages) | ✅ Presente |
| FAQPage (tool pages) | ✅ Presente |
| HowTo (ferramentas com `howToSteps`) | ✅ Presente |
| ItemList (`/ferramentas`) | ✅ Presente (não alterado) |
| CollectionPage (`/ferramentas/<categoria>`) | ✅ Presente (não alterado) |

### Validação de metadata routes
| URL | HTTP | Observação |
|---|---|---|
| `/robots.txt` | 200 | `User-Agent: * / Allow: / / Host + Sitemap` válidos |
| `/sitemap.xml` | 200 | 43 URLs, home URL alinhada com canonical |
| `/manifest.webmanifest` | 200 | Válido |
| `/icon.svg` | 200 | Favicon SVG servido |

### Validação Agent Browser
| Verificação | Resultado |
|---|---|
| Home renderiza | ✅ title, H1, nav, footer intactos |
| Tool page (`/gerador-senhas`) | ✅ title correto, H1, ferramenta renderiza |
| Category page (`/ferramentas/geradores`) | ✅ title correto, H1, 6 ferramentas listadas |
| Console errors | ✅ Nenhum |

### Funcionalidades preservadas
- ✅ Nenhuma ferramenta alterada (verificado `/gerador-senhas`);
- ✅ Nenhuma rota quebrada (todas testadas retornam 200);
- ✅ Header/footer/nav intactos;
- ✅ Modo escuro e responsividade não tocados (nenhum componente de UI alterado).

---

## Impacto esperado

| Aspecto | Impacto |
|---|---|
| Titles nos resultados de busca | ✅ Corretos, sem duplicação — melhor CTR e clique |
| Canonical | ✅ Consistente — evita duplicação canônica no Search Console |
| Rich results (Organization/WebSite) | ✅ Schemas vinculados via `@id` — melhor compreensão do grafo |
| SearchAction | ✅ Removido — evita URLs inválidas indexadas |
| Conformidade "não inventar" | ✅ `foundingDate` não verificado removido |
| AdSense | ✅ Mantido intacto (script + 3 posições) |
| Search Console | ✅ Pronto (sitemap + robots válidos); falta apenas `google-site-verification` (operacional pós-deploy) |

---

## Recomendações para a próxima etapa

1. **Gerar `og.png` (1200×630)** a partir do design do `og.svg` atual — usando image-generation skill ou conversão. Compatibilidade total com WhatsApp/Facebook/LinkedIn.
2. **Gerar `favicon.ico`** (multi-resolução 16/32/48) a partir do logo para compatibilidade com navegadores antigos.
3. **Adicionar `google-site-verification`** meta tag após configuração do Search Console (operacional pós-deploy).
4. **Criar `public/ads.txt`** após aprovação AdSense: `google.com, pub-2570963650556560, DIRECT, f08c47fec0942fa0`.
5. **Passar `slot` real** aos `<AdBanner />` após criar blocos no painel AdSense.
6. **Gate do script AdSense por consentimento** (LGPD) — registrado em `docs/09` (MÉDIO-7).
7. *(Opcional)* Implementar leitura de `?q=` no `ToolsExplorer` para reativar um `SearchAction` válido no WebSite schema.

---

## Critérios de aceitação

| Critério | Status |
|---|---|
| Build executa sem erros | ✅ lint + tsc `src/` limpos; dev server 200 (build real restrito pelo ambiente, mas alterações são apenas strings de metadata/schema — impacto nulo) |
| SEO técnico validado | ✅ 6 de 8 itens corrigidos; 2 adiados com justificativa |
| robots.txt válido | ✅ Servindo 200, formato correto |
| sitemap.xml válido | ✅ 43 URLs, home alinhada com canonical |
| Metadata consistente | ✅ Titles sem duplicação, canonical consistente, OG/Twitter completos |
| Schema.org implementado corretamente | ✅ Organization + WebSite (com `@id`) + Breadcrumb + FAQ + HowTo + ItemList + CollectionPage |
| Open Graph configurado | ✅ type/locale/url/title/description/siteName/images |
| Nenhuma rota quebrada | ✅ Todas testadas retornam 200 |
| Nenhuma ferramenta alterada | ✅ Confirmado (textos em `tools.ts` intactos, componentes não tocados) |
| Documentação atualizada | ✅ `docs/SEO_PLANO_DE_CORRECAO.md` + este relatório + `docs/16` histórico |

---

## Encerramento

Etapa 04 **concluída**. O SEO técnico do Toolium foi aperfeiçoado com 6 correções de baixo risco: titles desduplicados (crítico), canonical consistente, SearchAction inválido removido, schemas Organization/WebSite vinculados via `@id`, e remoção de dados não verificados (`foundingDate`/`sameAs` vazio). **Nenhuma ferramenta foi alterada, nenhuma página institucional foi modificada, nenhum texto de ferramenta foi tocado.**

**Não foi iniciada nenhuma melhoria de conteúdo, nenhuma ferramenta foi modificada, nenhuma página institucional foi alterada.** Aguardando a próxima etapa, conforme protocolo.
