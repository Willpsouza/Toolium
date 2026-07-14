# Content Audit — Toolium (32 ferramentas)

> FASE 2 da Etapa 05 — Avaliação individual do conteúdo de cada ferramenta.
> Notas de 0 a 10 em 7 critérios + Nota Final. Indicação "Necessita melhoria?" SIM/NÃO.
> Critérios: SEO · Conteúdo · Legibilidade · Experiência do usuário · Organização · Originalidade · Precisão.

## Metodologia

Cada ferramenta foi auditada em `src/data/tools.ts` considerando: `title`, `description`, `keywords`, `intro`, `content` (blocos), `howTo`, `example`, `benefits`, `faq`. A renderização segue `src/components/tools/tool-page.tsx` (H1 com `title`, H2/H3 com `content[].heading`, listas para howTo/benefits, accordion para faq).

Critério de "Necessita melhoria? SIM" = Nota Final < 8,5 OU erro factual OU exemplo ambíguo/inútil.

---

## Calculadoras (10)

| # | Slug | SEO | Cont. | Legib. | UX | Org. | Orig. | Precis. | **Final** | Melhoria? |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | calculadora-porcentagem | 9 | 9 | 9 | 9 | 9 | 9 | 10 | **9,1** | NÃO |
| 2 | calculadora-juros-compostos | 9 | 9 | 9 | 9 | 9 | 9 | 10 | **9,1** | NÃO |
| 3 | calculadora-juros-simples | 9 | 8 | 9 | 9 | 9 | 9 | 10 | **9,0** | NÃO |
| 4 | calculadora-financiamento | 9 | 9 | 9 | 9 | 9 | 9 | 10 | **9,1** | NÃO |
| 5 | calculadora-desconto | 9 | 8 | 9 | 9 | 9 | 9 | 10 | **9,0** | NÃO |
| 6 | calculadora-regra-tres | 9 | 8 | 9 | 9 | 9 | 9 | 10 | **9,0** | NÃO |
| 7 | calculadora-salario-liquido | 9 | 7 | 9 | 8 | 9 | 9 | 9 | **8,6** | **SIM** — exemplo vago, sem número concreto |
| 8 | calculadora-idade | 8 | 7 | 9 | 8 | 9 | 9 | 10 | **8,6** | **SIM** — exemplo sem número ilustrativo |
| 9 | diferenca-entre-datas | 9 | 8 | 9 | 9 | 9 | 9 | 10 | **9,0** | NÃO |
| 10 | calculadora-imc | 9 | 9 | 9 | 9 | 9 | 9 | 10 | **9,1** | NÃO |

## Conversores (8)

| # | Slug | SEO | Cont. | Legib. | UX | Org. | Orig. | Precis. | **Final** | Melhoria? |
|---|---|---|---|---|---|---|---|---|---|---|
| 11 | conversor-temperatura | 9 | 7 | 8 | 8 | 8 | 9 | 6 | **7,9** | **SIM** — FAQ com erro matemático ("20°C → 36 × ... → 68°F"); indentação inconsistente em benefits |
| 12 | conversor-comprimento | 9 | 8 | 9 | 9 | 9 | 9 | 10 | **9,0** | NÃO |
| 13 | conversor-peso | 9 | 8 | 9 | 9 | 9 | 9 | 10 | **9,0** | NÃO |
| 14 | conversor-volume | 9 | 8 | 9 | 9 | 9 | 9 | 10 | **9,0** | NÃO |
| 15 | conversor-area | 9 | 8 | 9 | 9 | 9 | 9 | 10 | **9,0** | NÃO |
| 16 | conversor-velocidade | 9 | 8 | 9 | 9 | 9 | 9 | 10 | **9,0** | NÃO |
| 17 | conversor-moedas | 9 | 7 | 9 | 8 | 9 | 9 | 9 | **8,6** | **SIM** — exemplo sem número concreto |
| 18 | conversor-tempo | 9 | 8 | 9 | 9 | 9 | 9 | 10 | **9,0** | NÃO |

## Geradores (6)

| # | Slug | SEO | Cont. | Legib. | UX | Org. | Orig. | Precis. | **Final** | Melhoria? |
|---|---|---|---|---|---|---|---|---|---|---|
| 19 | gerador-senhas | 9 | 9 | 9 | 9 | 9 | 9 | 10 | **9,1** | NÃO |
| 20 | gerador-qrcode | 9 | 8 | 9 | 9 | 9 | 9 | 10 | **9,0** | NÃO |
| 21 | gerador-lorem-ipsum | 9 | 8 | 9 | 9 | 9 | 9 | 10 | **9,0** | NÃO |
| 22 | gerador-nomes | 9 | 8 | 9 | 9 | 9 | 9 | 10 | **9,0** | NÃO |
| 23 | gerador-hash | 9 | 9 | 9 | 9 | 9 | 9 | 10 | **9,1** | NÃO |
| 24 | gerador-cores | 9 | 8 | 9 | 9 | 9 | 9 | 10 | **9,0** | NÃO |

## Imagem (4)

| # | Slug | SEO | Cont. | Legib. | UX | Org. | Orig. | Precis. | **Final** | Melhoria? |
|---|---|---|---|---|---|---|---|---|---|---|
| 25 | compressor-imagem | 9 | 8 | 9 | 9 | 9 | 9 | 10 | **9,0** | NÃO |
| 26 | conversor-jpg-png | 9 | 8 | 9 | 9 | 9 | 9 | 10 | **9,0** | NÃO |
| 27 | conversor-png-webp | 9 | 8 | 9 | 9 | 9 | 9 | 10 | **9,0** | NÃO |
| 28 | redimensionador-imagem | 9 | 8 | 9 | 9 | 9 | 9 | 10 | **9,0** | NÃO |

## Produtividade (4)

| # | Slug | SEO | Cont. | Legib. | UX | Org. | Orig. | Precis. | **Final** | Melhoria? |
|---|---|---|---|---|---|---|---|---|---|---|
| 29 | cronometro-online | 9 | 8 | 9 | 9 | 9 | 9 | 10 | **9,0** | NÃO |
| 30 | contador-palavras | 9 | 8 | 9 | 9 | 9 | 9 | 10 | **9,0** | NÃO |
| 31 | conversor-fuso-horario | 9 | 8 | 9 | 9 | 9 | 9 | 9 | **8,9** | NÃO |
| 32 | checklist-online | 9 | 8 | 9 | 9 | 9 | 9 | 10 | **9,0** | NÃO |

---

## Resumo quantitativo

| Métrica | Valor |
|---|---|
| Ferramentas auditadas | 32 |
| Nota média | **9,0** |
| Ferramentas necessitando melhoria | **4** |
| Ferramentas aprovadas sem alteração | **28** |

### Ferramentas que necessitam melhoria (4)
1. **conversor-temperatura** (7,9) — erro matemático no FAQ + indentação inconsistente
2. **calculadora-salario-liquido** (8,6) — exemplo vago sem número
3. **calculadora-idade** (8,6) — exemplo sem número ilustrativo
4. **conversor-moedas** (8,6) — exemplo sem número concreto

### Ferramentas aprovadas sem alteração (28)
Todas as demais — conteúdo original, claro, preciso e bem organizado. Nenhuma reescrita necessária (princípio: "nunca reescrever páginas boas apenas por reescrever").

---

## Detalhamento das 4 ferramentas a melhorar

### conversor-temperatura — FAQ com erro matemático
- **Problema**: FAQ "Como converter Celsius para Fahrenheit de cabeça?" responde: `"Multiplique por 9, divida por 5 e some 32. Por exemplo, 20 °C → 36 × ... → 68 °F."`
- **Bug**: a sequência "36 × ... → 68" é confusa e sugere erro (36 × algo = 68?). O correto: 20 × 9 = 180; 180 ÷ 5 = 36; 36 + 32 = 68. O "× ..." induz leitura errada.
- **Indentação**: no array `benefits`, a string `"Resultado em tempo real"` está com indentação extra (8 espaços) em vez de 6 — inconsistência cosmética.
- **Ação**: reescrever a resposta do FAQ com a sequência correta clara; corrigir indentação.

### calculadora-salario-liquido — exemplo vago
- **Problema**: `example` = `"Exemplo: um salário bruto de R$ 4.000 com a estimativa de descontos gera um líquido aproximado que varia conforme dependentes e faixas vigentes."`
- **Issue**: não fornece nenhum número de líquido — parece evasivo. Usuário quer ver um exemplo concreto.
- **Ação**: reescrever com exemplo numérico aproximado (ex.: ~R$ 3.200 líquido para 0 dependentes, mencionando que é estimativa). Manter disclaimer de "estimativa".

### calculadora-idade — exemplo sem número
- **Problema**: `example` = `"Exemplo: quem nasceu em 01/01/2000 tem, hoje, idade exata exibida em anos, meses e dias, além do total de dias vividos."`
- **Issue**: não ilustra com número (anos/dias). Referência "hoje" é variável.
- **Ação**: reescrever com exemplo concreto: "Quem nasceu em 01/01/2000 tem, em [data de referência], XX anos e aproximadamente Y dias vividos." Como a data muda, usar formulação que exemplifique sem ficar desatualizada: "Por exemplo, quem nasceu em 1º de janeiro de 2000 já viveu mais de 9.000 dias."

### conversor-moedas — exemplo sem número
- **Problema**: `example` = `"Exemplo: um valor em dólares convertido para reais usando a taxa de referência mostra o equivalente aproximado em BRL."`
- **Issue**: exemplo circular, não mostra conversão. Usuário não vê utilidade.
- **Ação**: reescrever com exemplo numérico aproximado usando taxa de referência (ex.: "US$ 100 a uma taxa de referência de R$ 5,00 equivalem a aproximadamente R$ 500."). Mencionar que é estimativa.

---

## Observações gerais (não bloqueantes)

- A maioria das ferramentas tem **1 bloco de conteúdo** (1 heading + 1-2 parágrafos). O `tool-page.tsx` complementa com seções "Como usar" (howTo), "Exemplo prático", "Benefícios" e "FAQ", cobrindo o padrão exigido (título, intro, o que é, para que serve, como utilizar, exemplo, dicas/FAQ). **Não há necessidade de adicionar blocos** — o conteúdo já é completo.
- **"Ferramentas relacionadas"** não é implementado pelo `tool-page.tsx` atual. Recomendado para etapa futura (feature nova, fora do escopo de "não modificar layout").
- **"Conclusão"** não existe como seção dedicada; o CTA final (em `tool-page.tsx`) cumpre esse papel indiretamente. Adicionar conclusão exigiria alterar o `tool-page.tsx` (layout) — fora do escopo.
- Todos os textos são **originais** (não copiados), em pt-BR correto, sem erros gramaticais relevantes.
- **Heading hierarchy**: H1 (title) → H2 (seções) → H3 (content headings) — correta em todas, via `tool-page.tsx`.
- **Sem conteúdo artificial ou exageros** ("o melhor do Brasil", etc.) — linguagem equilibrada.
- **Sem promessas de resultados** — ferramentas financeiras usam "estimativa" corretamente.
- **Sem dados inventados** — exceto o `foundingDate` já removido na Etapa 04.
