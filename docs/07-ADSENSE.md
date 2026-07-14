# 07 — AdSense

> Documento de auditoria. Estado da integração com Google AdSense.

## Configuração

| Campo | Valor |
|---|---|
| Cliente AdSense | `ca-pub-2570963650556560` |
| Onde está definido | `src/lib/seo.ts` → `siteConfig.adsenseClient` |
| Script | `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2570963650556560` |

## Carregamento do script

No `src/app/layout.tsx`, via `next/script`:

```tsx
<Script
  id="adsbygoogle-init"
  async
  strategy="afterInteractive"
  src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.adsenseClient}`}
  crossOrigin="anonymous"
/>
```

Também há `<link rel="preconnect" href="https://pagead2.googlesyndication.com">` no `<head>` para otimizar a conexão.

## Componente de anúncio (`src/components/ads/ad-banner.tsx`)

- Client component (`"use client"`);
- Recebe `slot`, `format` (auto/horizontal/rectangle/vertical), `className`, `label`;
- No `useEffect`, verifica `window.adsbygoogle`:
  - Se presente → seta `hasAdSense=true` e faz `push({})`;
  - Renderiza `<ins class="adsbygoogle">` com `data-ad-client`, `data-ad-slot`, `data-ad-format`, `data-full-width-responsive`;
- Se ausente (ambiente dev, AdSense não aprovado) → renderiza **placeholder elegante** com rótulo "Publicidade" / "Espaço reservado para anúncio";
- Estilo: borda tracejada, fundo `bg-muted/30`, `min-h-[96px]`, centralizado.

## Posições de anúncio

Definidas em `src/components/tools/tool-page.tsx`, **3 posições por página de ferramenta** conforme especificação do produto:

| Posição | Local no fluxo da página |
|---|---|
| **Local 1** | Após a introdução (header + intro), antes da ferramenta |
| **Local 2** | Logo após a área da ferramenta, antes da explicação |
| **Local 3** | Antes da seção FAQ |

Também há um `AdBanner` na home page (após a seção de categorias) e um na página de categoria (após a grade de ferramentas).

## Conformidade com políticas Google (estado observado)

| Prática | Estado |
|---|---|
| Anúncios não escondem conteúdo | ✅ AdBanner é um `<aside>` em fluxo normal |
| Não intercepta interação do usuário | ✅ |
| Placeholder em desenvolvimento | ✅ Não quebra layout |
| `crossOrigin="anonymous"` | ✅ |
| Consentimento de cookies | ✅ Banner `CookieConsent` presente (LGPD/GDPR friendly) |
| Política de cookies documentada | ✅ `/cookies` |

## Pontos de atenção (não corrigidos)

| Item | Detalhe |
|---|---|
| Sem `slot` real configurado | As instâncias de `AdBanner` chamam `<AdBanner />` sem `slot`. Quando o AdSense for aprovado, será necessário criar blocos de anúncio no painel e passar o `slot` (ex.: `<AdBanner slot="1234567890" />`). Hoje, mesmo com AdSense ativo, nenhum anúncio real seria exibido por falta de slot. |
| Sem `ads.txt` | Não há `public/ads.txt` (recomendado pelo AdSense para verificação de domínio). |
| Sem verificação de domínio no AdSense | Fora do escopo de código; necessário pós-deploy. |
| Script carrega mesmo sem consentimento | O script AdSense é injetado independentemente do banner de cookies. Para conformidade total com LGPD/UE, considerar carregar condicionalmente após aceitação. Ver `09-PONTOS_DE_MELHORIA.md`. |

## Resumo

A infraestrutura AdSense está **tecnicamente pronta**: script global, componente reutilizável, posições definidas, placeholder em dev. Faltam passos **operacionais** (aprovação AdSense, criação de slots, ads.txt) que não são de código.
