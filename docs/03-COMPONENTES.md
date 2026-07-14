# 03 — Componentes

> Documento de auditoria. Inventário de componentes e seu estado de uso.

## Componentes de produto (não-UI)

Total: **45 componentes** em `src/components/` (excluindo `ui/`).

### Layout (6)

| Arquivo | Função | Estado |
|---|---|---|
| `layout/site-header.tsx` | Cabeçalho fixo com nav desktop, dropdown de categorias, sheet mobile, toggle de tema | ✅ Em uso |
| `layout/site-footer.tsx` | Rodapé com colunas (categorias, populares, institucional) | ✅ Em uso |
| `layout/theme-provider.tsx` | Wrapper do `next-themes` | ✅ Em uso (layout.tsx) |
| `layout/theme-toggle.tsx` | Botão alternar claro/escuro | ✅ Em uso |
| `layout/prose.tsx` | Estilização tipográfica para páginas institucionais | ✅ Em uso |
| `logo.tsx` | Logo SVG inline + versão com texto | ✅ Em uso |

### Tools — framework (5)

| Arquivo | Função | Estado |
|---|---|---|
| `tools/registry.tsx` | Mapa slug → componente client (32 entradas) | ✅ Em uso ([slug]/page via tool-page) |
| `tools/tool-page.tsx` | Layout padrão de página de ferramenta (breadcrumb, ads, conteúdo, FAQ, JSON-LD) | ✅ Em uso |
| `tools/tool-card.tsx` | Card de ferramenta (grid de listagem) | ✅ Em uso |
| `tools/tools-explorer.tsx` | Listagem com busca e filtro por categoria (client) | ✅ Em uso (/ferramentas) |
| `tools/faq-section.tsx` | Accordion de perguntas frequentes | ✅ Em uso (tool-page) |

### Tools — ferramentas (32)

Cada ferramenta é um componente `"use client"` com default export, mapeado no `registry.tsx`. Todas em uso.

- **Calculadoras (10)**: calculadora-porcentagem, calculadora-juros-compostos, calculadora-juros-simples, calculadora-financiamento, calculadora-desconto, calculadora-regra-tres, calculadora-salario-liquido, calculadora-idade, diferenca-entre-datas, calculadora-imc
- **Conversores (8)**: conversor-temperatura, conversor-comprimento, conversor-peso, conversor-volume, conversor-area, conversor-velocidade, conversor-moedas, conversor-tempo
- **Geradores (6)**: gerador-senhas, gerador-qrcode, gerador-lorem-ipsum, gerador-nomes, gerador-hash, gerador-cores
- **Imagem (4)**: compressor-imagem, conversor-jpg-png, conversor-png-webp, redimensionador-imagem
- **Produtividade (4)**: cronometro-online, contador-palavras, conversor-fuso-horario, checklist-online

### Outros (2)

| Arquivo | Função | Estado |
|---|---|---|
| `ads/ad-banner.tsx` | Container de anúncio AdSense com fallback placeholder | ✅ Em uso |
| `cookie-consent.tsx` | Banner de consentimento de cookies (localStorage) | ✅ Em uso |

---

## Componentes UI (shadcn/ui)

Total na pasta `src/components/ui/`: **49 componentes**.

### Em uso pelo produto (18)

`accordion`, `badge`, `breadcrumb`, `button`, `card`, `checkbox`, `dropdown-menu`, `input`, `label`, `select`, `separator`, `sheet`, `slider`, `switch`, `table`, `tabs`, `textarea`, `toast` + `toaster`.

> Nota: `toast` é importado por `toaster.tsx`, que está no `layout.tsx`. Portanto é usado transitivamente.

### Órfãos (não importados pelo código do produto) — ~29

Estes componentes existem no scaffold shadcn mas **não são importados** por nenhuma rota, layout, ferramenta, ads ou cookie-consent. Alguns são importados apenas por **outros** componentes órfãos (dependência transitiva entre órfãos):

`alert`, `alert-dialog`, `aspect-ratio`, `avatar`, `calendar`, `carousel`, `chart`, `collapsible`, `command`, `context-menu`, `dialog`, `drawer`, `form`, `hover-card`, `input-otp`, `menubar`, `navigation-menu`, `pagination`, `popover`, `progress`, `radio-group`, `resizable`, `scroll-area`, `sidebar`, `skeleton`, `sonner`, `toggle`, `toggle-group`, `tooltip`.

**Observação**: Esta auditoria **não removeu** nenhum desses componentes. Eles estão listados apenas para decisão futura (ver `09-PONTOS_DE_MELHORIA.md` e `RELATORIO_DA_AUDITORIA.md`).

---

## Hooks (2)

| Arquivo | Estado |
|---|---|
| `hooks/use-toast.ts` | ✅ Usado por `ui/toaster.tsx` |
| `hooks/use-mobile.ts` | ⚠️ Órfão — só importado por `ui/sidebar.tsx`, que é órfão |

## Lib (6)

| Arquivo | Função | Estado |
|---|---|---|
| `lib/utils.ts` | `cn()` (clsx + tailwind-merge) | ✅ Em uso |
| `lib/seo.ts` | `siteConfig` + `buildMetadata()` | ✅ Em uso |
| `lib/schema.ts` | Schemas JSON-LD | ✅ Em uso |
| `lib/icons.ts` | Mapa de ícones lucide + `iconMap` export | ✅ Em uso |
| `lib/format.ts` | `formatBRL`, `formatNumber`, `parseNumber`, `formatPercent` | ✅ Em uso |
| `lib/db.ts` | Prisma client | ⚠️ Órfão — produto não usa DB |

## Componentes duplicados?

**Não foram encontrados componentes duplicados.** Cada ferramenta é única. Padrões compartilhados (ex.: conversores de unidade) foram implementados com helpers inline em cada arquivo — há **repetição de padrão** entre os 6 conversores de unidade (factors map + `convertAll`), mas não duplicação exata de arquivos. Ver `09-PONTOS_DE_MELHORIA.md`.
