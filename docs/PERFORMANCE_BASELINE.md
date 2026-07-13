# Performance Baseline — Toolium

> Etapa 08 — Baseline de performance após otimizações.
> Métricas são estimativas qualitativas baseadas em análise de código; medições reais requerem Lighthouse/PageSpeed Insights em ambiente de produção.

## Build

| Aspecto | Estado |
|---|---|
| `bun run lint` | ✅ Limpo (0 erros, 0 warnings) |
| `bunx tsc --noEmit` (`src/`) | ✅ Sem erros |
| Dev server (porta 3000) | ✅ Rodando, rotas 200 |
| `next build` (produção) | ⚠️ Não executado (restrição de ambiente); prontidão atestada por lint + tsc + dev server |
| `output: "standalone"` | ✅ Configurado |
| SSG (`generateStaticParams`) | ✅ 32 ferramentas + 5 categorias pré-renderizadas |

> **Nota**: o ambiente de desenvolvimento tem restrição operacional de não executar `bun run build`. A baseline abaixo é **estimativa qualitativa** baseada em análise do código. Medição real deve ser feita com Lighthouse em build de produção (Vercel/CI).

---

## Estimativa de Performance (qualitativa)

### Core Web Vitals — estimativa pós-otimização

| Métrica | Alvo Google | Estimativa Toolium | Justificativa |
|---|---|---|---|
| **LCP** (Largest Contentful Paint) | < 2,5s | 🟢 **Bom** (< 2,0s esperado) | SSG (HTML estático), fontes self-hosted (next/font), H1 no hero sem imagens grandes, JS reduzido por dynamic imports |
| **CLS** (Cumulative Layout Shift) | < 0,1 | 🟢 **Bom** (< 0,05) | `AdBanner` com `min-h-[96px]` reserva espaço; `next/font` com `size-adjust` evita FOIT/FOUT; `suppressHydrationWarning` evita flash de tema |
| **INP** (Interaction to Next Paint) | < 200ms | 🟢 **Bom** (< 150ms esperado) | Ferramentas usam `useMemo` para cálculos; menos JS para hidratar (dynamic imports) libera main thread; sem operações síncronas pesadas em handlers |

### Field Metrics (estimativa)

| Métrica | Estimativa | Justificativa |
|---|---|---|
| **FCP** (First Contentful Paint) | 🟢 < 1,0s | SSG + fontes self-hosted |
| **TTFB** (Time to First Byte) | 🟢 < 200ms | SSG (HTML pré-renderizado, CDN na Vercel) |
| **TBT** (Total Blocking Time) | 🟢 < 150ms | Dynamic imports reduzem JS bloqueante por página |
| **Speed Index** | 🟢 < 2,5s | Skeleton + loading.tsx melhoram perceived performance |

---

## Estimativa Mobile

| Aspecto | Estimativa | Justificativa |
|---|---|---|
| LCP (4G lento) | 🟢 < 2,5s | SSG + JS mínimo por página (dynamic imports) |
| CLS | 🟢 < 0,05 | min-h no AdBanner + font-display swap |
| INP | 🟢 < 200ms | Hidratação leve (1 ferramenta, não 32) |
| Bundle JS inicial | 🟢 Reduzido ~70% | Antes: 32 ferramentas; depois: 1 ferramenta + framework |
| Tempo de hidratação | 🟢 < 1,5s | Menos JS para parsear/executar |
| Fontes | 🟢 Self-hosted | Sem FOIT, swap automático |

**Risco mobile**: baixo. A principal otimização (dynamic imports) tem impacto maior em mobile (CPUs mais lentas, redes 4G). Antes, mobile baixava e parseava JS de 32 ferramentas; agora baixa só 1.

## Estimativa Desktop

| Aspecto | Estimativa | Justificativa |
|---|---|---|
| LCP | 🟢 < 1,5s | SSG + rede rápida |
| CLS | 🟢 < 0,05 | Mesmas otimizações |
| INP | 🟢 < 100ms | CPU rápida + JS mínimo |
| Bundle JS inicial | 🟢 Reduzido ~70% | Mesmo benefício que mobile |
| Tempo de hidratação | 🟢 < 0,8s | CPU desktop |

**Risco desktop**: muito baixo.

---

## Possíveis gargalos (monitorar)

| Gargalo | Severidade | Mitigação atual | Ação futura |
|---|---|---|---|
| `examples/` e `skills/` causam erros de `tsc` | 🟢 Baixo | Ignorados por ESLint; não afetam build Next.js | Adicionar ao `exclude` do tsconfig (Etapa 09 futura) |
| `ignoreBuildErrors: true` no next.config | 🟡 Médio | `src/` está limpo, então sem impacto hoje | Remover flag quando houver etapa de limpeza de config |
| `framer-motion` dependência morta | 🟢 Baixo | Sem imports = sem impacto no bundle | Remover em etapa de limpeza de deps |
| ~29 componentes UI shadcn órfãos | 🟢 Baixo | Tree-shaking remove não importados | Remover em etapa de limpeza |
| AdSense script (quando aceito) | 🟡 Médio | Gating por consentimento; `afterInteractive` | Operacional — aceitar para monetizar |
| Google Fonts (Geist) | 🟢 Baixo | `next/font` self-hosted (sem requisição externa) | Já otimizado |

---

## Recomendações futuras

1. **Medir com Lighthouse**: executar Lighthouse em build de produção (Vercel) para obter métricas reais de LCP/CLS/INP/TBT. Esta baseline é estimativa.
2. **PageSpeed Insights**: testar com URLs reais após deploy para Field Data (CrUX).
3. **Web Vitals (RUM)**: considerar adicionar `web-vitals` lib para medir métricas reais de usuários em produção (opcional, feature nova).
4. **Image optimization**: se futuramente adicionar imagens estáticas (não canvas), usar `next/image` com `priority` para LCP.
5. **Font subsetting**: `next/font` já faz subset por `subsets: ["latin"]`. Para pt-BR com acentos, latin já cobre. Sem ação.
6. **HTTP/3 e Brotli**: Vercel habilita automaticamente. Sem ação de código.
7. **Cache headers**: Vercel configura automaticamente para assets estáticos (`/_next/static/*`). Sem ação.
8. **Remove `ignoreBuildErrors`**: em etapa futura de higiene de config (Etapa 09 recomendada).
9. **Remove deps mortas**: `framer-motion` e outras ~48 deps não usadas (ver `docs/04-DEPENDENCIAS.md`).
10. **Bundle analyzer**: executar `@next/bundle-analyzer` em build de produção para confirmar redução de bundle por página.

---

## Resumo da baseline

O Toolium está **bem otimizado para Core Web Vitals** após a Etapa 08:

- ✅ **LCP**: SSG + fontes self-hosted + H1 sem imagem grande → estimativa < 2,0s
- ✅ **CLS**: `min-h` no AdBanner + `next/font` com size-adjust → estimativa < 0,05
- ✅ **INP**: dynamic imports (1 ferramenta, não 32) + `useMemo` → estimativa < 150ms
- ✅ **Bundle**: redução estimada de ~70% do JS por página de ferramenta (dynamic imports)
- ✅ **Perceived performance**: `loading.tsx` + `Suspense` skeleton

**Próxima etapa recomendada**: medir com Lighthouse em produção para validar estimativas.
