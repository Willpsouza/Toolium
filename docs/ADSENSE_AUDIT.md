# AdSense Audit — Toolium

> FASE 2 da Etapa 07 — Plano de correção para conformidade com boas práticas do Google AdSense.
> Auditoria concluída na FASE 1 (somente leitura). **Nada implementado ainda neste documento.**

## Auditoria — resumo do estado atual

O Toolium já está **tecnicamente bem preparado** para AdSense:
- ✅ Script AdSense carregado **uma vez** via `next/script` (`strategy="afterInteractive"`) no `layout.tsx`;
- ✅ Cliente `ca-pub-2570963650556560` configurado em `siteConfig.adsenseClient`;
- ✅ `crossOrigin="anonymous"` no script;
- ✅ `<link rel="preconnect">` para `pagead2.googlesyndication.com`;
- ✅ Componente `AdBanner` com placeholder elegante em dev + `<ins>` em produção;
- ✅ `min-h-[96px]` no `AdBanner` **evita CLS** (Cumulative Layout Shift);
- ✅ 3 posições de anúncio por página de ferramenta (após intro, após ferramenta, antes do FAQ);
- ✅ 1 anúncio na home (após categorias) e 1 nas páginas de categoria;
- ✅ Espaçamento adequado entre anúncios (`my-8`, `my-10`, `my-12`);
- ✅ Tokens semânticos no placeholder (`bg-muted/30`, `text-muted-foreground`, `border-border`) — **adapta ao dark mode**;
- ✅ Cookie consent banner funcional (LGPD/GDPR-friendly);
- ✅ Páginas institucionais acessíveis e com conteúdo suficiente (2169–3448 chars);
- ✅ Sem páginas vazias, "em construção" ou conteúdo duplicado (description ≠ intro);
- ✅ Links externos com `rel="noopener noreferrer"`;
- ✅ Sem pop-ups excessivos (apenas cookie consent);
- ✅ 404 customizada em pt-BR com CTAs (Etapa 06).

Foram encontrados **6 itens** passíveis de ação, listados abaixo.

---

## Itens encontrados

### AD-01 — `ads.txt` ausente em `public/`
- **Arquivo**: `public/ads.txt` (não existe)
- **Problema**: O Google AdSense recomenda um arquivo `ads.txt` na raiz do domínio para verificar a autoridade do editor. Sem ele, o AdSense pode exibir avisos no painel e, em alguns casos, não veicular anúncios premium.
- **Impacto**: ALTO. Sem `ads.txt`, o AdSense sinaliza "earnings at risk" no painel e pode reduzir o fill rate.
- **Prioridade**: 🔴 ALTA
- **Como corrigir**: Criar `public/ads.txt` com a linha: `google.com, pub-2570963650556560, DIRECT, f08c47fec0942fa0`.
- **Risco**: BAIXO. Apenas um arquivo de texto estático; não afeta código/rotas/layout.

### AD-02 — AdBanner sem `slot` em todas as instâncias
- **Arquivo**: `src/components/tools/tool-page.tsx`, `src/app/page.tsx`, `src/app/ferramentas/[categoria]/page.tsx`
- **Problema**: Todos os `<AdBanner />` são chamados **sem `slot`**. O componente `AdBanner` só injeta o `<ins>` real quando `hasAdSense && slot` são truthy. Sem `slot`, mesmo após aprovação AdSense, **nenhum anúncio real será exibido** — apenas placeholders.
- **Impacto**: ALTO. Prepara a infraestrutura mas não veiculará anúncios sem criar blocos no painel AdSense e passar os IDs de slot.
- **Prioridade**: 🟠 MÉDIA (operacional — exige criar blocos no painel AdSense pós-aprovação)
- **Como corrigir**: Após aprovação AdSense, criar blocos de anúncio no painel e passar `slot="XXXXXXXXX"` em cada `<AdBanner />`. **Não é implementável agora** (depende de IDs reais do painel). Documentar como pendência operacional.
- **Risco**: N/A (adiado — depende de dados externos).

### AD-03 — Script AdSense carrega sem gating por consentimento
- **Arquivo**: `src/app/layout.tsx` (Script AdSense)
- **Problema**: O script AdSense é injetado com `strategy="afterInteractive"` independentemente do consentimento de cookies. Para conformidade total com LGPD (Brasil) e GDPR (UE), cookies de publicidade deveriam carregar **após** o aceite do usuário.
- **Impacto**: MÉDIO. Risco regulatório (LGPD/GDPR); o AdSense em si funciona, mas a política de cookies do site diz que cookies de publicidade são usados, e eles carregam antes do consentimento.
- **Prioridade**: 🟠 MÉDIA
- **Como corrigir**: Carregar o script AdSense condicionalmente, lendo o consentimento do `localStorage` (chave `toolium:cookie-consent`). Se `accepted`, carrega; senão, não. Usar `next/script` com `strategy="lazyOnload"` condicional OU um wrapper client que monta o `<Script>` só após aceite.
- **Risco**: MÉDIO. Exige um componente client wrapper para o Script (ou mover a lógica para o `layout.tsx` que é server — não pode ler localStorage direto). Solução: criar `AdsenseScript` client component que lê consentimento e renderiza `<Script>` condicionalmente. **Cuidado**: pode adiar a exibição de anúncios — mas é o comportamento correto para conformidade.
- **Decisão**: Implementar nesta etapa (baixo risco de funcionalidade, alto benefício de conformidade).

### AD-04 — Sem anúncio na listagem `/ferramentas`
- **Arquivo**: `src/app/ferramentas/page.tsx`
- **Problema**: A página de listagem completa de ferramentas (que tem alto tráfego potencial) não tem nenhum `AdBanner`. Páginas de categoria têm 1, mas a listagem geral não.
- **Impacto**: BAIXO-MÉDIO. Oportunidade de receita perdida, mas não é violação de política.
- **Prioridade**: 🟢 BAIXA
- **Como corrigir**: Adicionar 1 `<AdBanner />` após a grade de ferramentas (antes do final da página), seguindo o padrão da página de categoria.
- **Risco**: BAIXO. Apenas adicionar 1 componente existente.

### AD-05 — `data-ad-format` sempre "auto" (sem otimização por posição)
- **Arquivo**: `src/components/ads/ad-banner.tsx`
- **Problema**: O `AdBanner` aceita `format` (`auto`/`horizontal`/`rectangle`/`vertical`) mas todas as chamadas usam o default `auto`. Para posições horizontais (entre conteúdo), `horizontal` pode renderizar melhor; para posições laterais, `vertical`.
- **Impacto**: BAIXO. `auto` funciona bem na maioria dos casos; é otimização micro.
- **Prioridade**: 🟢 BAIXA
- **Como corrigir**: Em usos horizontais (todos os atuais), passar `format="horizontal"`. Mas como os slots ainda não têm IDs (AD-02), isso só fará diferença após aprovação. **Adiar** até ter slots reais.
- **Risco**: N/A (adiado).

### AD-06 — Sem `data-ad-layout` para anúncios responsivos avançados
- **Arquivo**: `src/components/ads/ad-banner.tsx`
- **Problema**: O `<ins>` usa `data-full-width-responsive="true"` mas não `data-ad-layout`. Para anúncios responsivos avançados do AdSense, `data-ad-layout-key` pode melhorar a veiculação. É opcional.
- **Impacto**: BAIXO. Recurso avançado, não obrigatório.
- **Prioridade**: 🟢 BAIXA
- **Como corrigir**: Não actionar agora. Documentar como opcional para futuro.
- **Risco**: N/A (não implementar).

---

## Itens NÃO corrigidos (confirmados OK na auditoria)

| Item | Estado |
|---|---|
| Script AdSense carregado uma vez | ✅ OK (`next/script` no layout) |
| Cliente AdSense configurado | ✅ `ca-pub-2570963650556560` |
| `crossOrigin="anonymous"` | ✅ |
| `preconnect` para AdSense | ✅ |
| 3 posições por ferramenta | ✅ (após intro, após ferramenta, antes do FAQ) |
| `min-h-[96px]` evita CLS | ✅ |
| Espaçamento entre anúncios | ✅ (`my-8`/`my-10`/`my-12`) |
| Placeholder adapta ao dark mode | ✅ (tokens semânticos) |
| Sem anúncio sobrepondo conteúdo | ✅ (`<aside>` em fluxo normal) |
| Sem anúncio interrompendo leitura | ✅ (posições entre seções) |
| Sem anúncio próximo a botões | ✅ (anúncios têm `my-*` de margem) |
| Cookie consent funcional | ✅ |
| Institucionais acessíveis | ✅ (/sobre, /privacidade, /termos, /cookies no footer) |
| Conteúdo suficiente | ✅ (institucionais 2169-3448 chars; ferramentas ~4600 chars) |
| Sem páginas vazias/em construção | ✅ |
| 404 customizada | ✅ (Etapa 06) |
| Links externos com `rel="noopener noreferrer"` | ✅ |
| Sem pop-ups excessivos | ✅ (apenas cookie consent) |
| Sem conteúdo enganoso/copiado | ✅ (conteúdo original pt-BR) |
| Navegação clara | ✅ (header + footer + breadcrumb + relacionadas) |
| Header/Footer consistentes | ✅ |
| Responsividade | ✅ (mobile/tablet/desktop) |
| Dark mode | ✅ |

## Políticas do AdSense — verificação

| Política | Status |
|---|---|
| Conteúdo enganoso | ✅ Não há |
| Conteúdo copiado | ✅ Conteúdo original |
| Páginas vazias | ✅ Nenhuma |
| Links quebrados relevantes | ✅ Nenhum (rotas dinâmicas com `dynamicParams=false` → 404 correto) |
| Pop-ups excessivos | ✅ Apenas cookie consent |
| Navegação confusa | ✅ Header/footer/breadcrumb/relacionadas claros |
| Excesso de anúncios | ✅ 3 por ferramenta (razoável); 1 na home/categoria |
| Anúncios próximos a botões | ✅ Margens adequadas (`my-8`/`my-10`/`my-12`) |
| Conteúdo suficiente por página | ✅ Ferramentas com conteúdo editorial rico + FAQ |
| Páginas institucionais | ✅ Sobre, Privacidade, Termos, Cookies — todas acessíveis e completas |

---

## Plano de implementação (FASE 3)

Itens a implementar nesta etapa (baixo risco):

1. **AD-01** (ALTA) — Criar `public/ads.txt` com a linha do Google.
2. **AD-03** (MÉDIA) — Criar `AdsenseScript` client component que carrega o script AdSense apenas após consentimento `accepted`; substituir o `<Script>` direto no `layout.tsx` por este wrapper.
3. **AD-04** (BAIXA) — Adicionar 1 `<AdBanner />` na listagem `/ferramentas`.

Itens adiados (dependem de dados externos ou são opcionais):
- **AD-02** (slots reais) — pós-aprovação AdSense, criar blocos no painel e passar `slot`.
- **AD-05** (format por posição) — adiar até ter slots reais.
- **AD-06** (data-ad-layout) — opcional, não implementar.

**Arquivos a modificar na FASE 3**: `public/ads.txt` (novo), `src/components/ads/adsense-script.tsx` (novo), `src/app/layout.tsx` (substituir Script), `src/app/ferramentas/page.tsx` (adicionar AdBanner).

**Arquivos NÃO modificar**: `ad-banner.tsx` (mantém intacto), `tool-page.tsx` (posições preservadas), ferramentas, dados, lib, header, footer, institucionais.

**Validação pós-implementação**: lint + tsc + dev server + Agent Browser (verificar ads.txt servido, script não carrega sem consentimento, anúncio na listagem).
