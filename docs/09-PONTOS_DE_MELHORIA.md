# 09 — Pontos de Melhoria

> Documento de auditoria. Lista oportunidades observadas, **sem executá-las**. Apenas diagnósticas. Ver `RELATORIO_DA_AUDITORIA.md` para priorização.

## 1. Higiene de dependências

**~48 pacotes não usados** pelo produto (ver `04-DEPENDENCIAS.md`). Inclui:
- `framer-motion`, `next-auth`, `next-intl`, `zustand`, `zod`, `uuid`, `sharp`, `react-markdown`, `react-syntax-highlighter`, `@tanstack/react-query`, `@tanstack/react-table`, `@mdxeditor/editor`, `@dnd-kit/*`, `@reactuses/core`, `z-ai-web-dev-sdk`;
- Pacotes que sustentam apenas componentes UI órfãos (`cmdk`, `embla-carousel-react`, `input-otp`, `react-day-picker`, `react-resizable-panels`, `recharts`, `vaul`, `sonner`).

**Impacto**: bundle size, tempo de install, superfície de segurança, manutenção. **Recomendação**: remover em etapa separada, após confirmar que nada referencia os componentes UI órfãos; desinstalar em blocos e re-rodar lint + build após cada bloco.

## 2. Componentes UI órfãos (~29)

`alert`, `alert-dialog`, `aspect-ratio`, `avatar`, `calendar`, `carousel`, `chart`, `collapsible`, `command`, `context-menu`, `dialog`, `drawer`, `form`, `hover-card`, `input-otp`, `menubar`, `navigation-menu`, `pagination`, `popover`, `progress`, `radio-group`, `resizable`, `scroll-area`, `sidebar`, `skeleton`, `sonner`, `toggle`, `toggle-group`, `tooltip`.

**Recomendação**: confirmar não uso (esta auditoria já confirmou); remover junto com as dependências que os sustentam. **Não remover automaticamente** — fazer por blocos.

## 3. Hooks / lib órfãos

- `hooks/use-mobile.ts` — só usado por `ui/sidebar.tsx` (órfão);
- `lib/db.ts` + `prisma/schema.prisma` + `db/custom.db` — Prisma configurado mas produto não usa DB;
- `app/api/route.ts` — "Hello, world" órfão.

**Recomendação**: avaliar remoção em etapa futura. O Prisma em especial adiciona peso (gera client, exige `DATABASE_URL`).

## 4. Arquivo público órfão

- `public/logo.svg` — **não referenciado** em nenhum `src/`. O componente `Logo` usa SVG inline. Pode ser removido, **ou** mantido como asset canônico e o componente passar a referenciá-lo (decisão de design).

## 5. `next.config.ts` — `ignoreBuildErrors: true`

```ts
typescript: { ignoreBuildErrors: true }
```

Isto faz o `next build` **ignorar erros de TypeScript**, mascarando problemas. Hoje o `src/` compila limpo (`tsc --noEmit` sem erros em src), então a flag é desnecessária e perigosa (um erro futuro passaria despercebido no build).

**Recomendação**: remover `typescript.ignoreBuildErrors` e `reactStrictMode: false` (reativar strict mode) em etapa futura, após confirmar build limpo.

## 6. ESLint excessivamente permissivo

`eslint.config.mjs` desativa **~25 regras** incluindo:
- `@typescript-eslint/no-unused-vars`, `@typescript-eslint/no-explicit-any`, `react-hooks/exhaustive-deps`, `@next/next/no-img-element`, `prefer-const`, `no-console`, `no-unused-vars`, etc.

Isso faz o lint passar mesmo com código potencialmente problemático. Hoje está limpo, mas a configuração não protege contra regressões.

**Recomendação**: reativar gradualmente as regras mais valiosas (`no-unused-vars`, `no-explicit-any`, `exhaustive-deps`), corrigindo os avisos que surgirem.

## 7. `tailwind.config.ts` parcialmente redundante

Tailwind 4 usa configuração via CSS (`@theme inline` em `globals.css`). O `tailwind.config.ts` define `theme.extend.colors` com `hsl(var(--background))` etc., mas `globals.css` define as mesmas variáveis em **oklch**. O `@theme inline` mapeia `--color-*` para `var(--background)` (oklch), então as cores do config TS são **efetivamente mortas** (o `@theme inline` sobrescreve).

**Recomendação**: simplificar — manter apenas `darkMode: "class"`, `content` e `plugins` no config TS, ou migrar 100% para CSS config e remover o TS.

## 8. `package.json` diverge do produto

- `"name": "nextjs_tailwind_shadcn_ts"` (scaffold);
- Sem campos `description`, `author`, `license`, `repository`.

**Recomendação**: renomear para `"toolium"`, adicionar metadata do produto.

## 9. OG image em SVG

`public/og.svg` — várias plataformas sociais (WhatsApp, Facebook, alguns crawlers) **não renderizam SVG** como imagem OG. Twitter/X e LinkedIn preferem PNG/JPG.

**Recomendação**: gerar uma versão `og.png` (1200×630) e referenciá-la na metadata. Pode ser feita com a skill de image-generation ou um script.

## 10. AdSense — slots e ads.txt

- `AdBanner` é chamado sem `slot` → mesmo com AdSense aprovado, nenhum anúncio real exibiria;
- Sem `public/ads.txt`.

**Recomendação**: pós-aprovação AdSense, criar blocos no painel e passar `slot` em cada `<AdBanner slot="..." />`; adicionar `public/ads.txt` com `google.com, pub-2570963650556560, DIRECT, f08c47fec0942fa0`.

## 11. AdSense carrega sem condicionar ao consentimento

O script AdSense é injetado em `afterInteractive` independentemente do banner de cookies. Para conformidade LGPD/UE, o ideal é carregar AdSense + cookies de publicidade **após** o aceite do usuário.

**Recomendação**: gate do script AdBanner/Script pelo estado de consentimento (já persistido em `localStorage` pelo `CookieConsent`).

## 12. Repetição de padrão entre conversores de unidade

Os 6 conversores de unidade (comprimento, peso, volume, área, velocidade, tempo) repetem o mesmo padrão: `factors` map + `convertAll()` + grid de equivalentes. Não é duplicação exata, mas ~80% do esqueleto é repetido.

**Recomendação**: extrair um componente `UnitConverter` genérico que recebe `{ factors, labels, defaultUnit }`. Reduz ~6 arquivos para 1 + 6 configs. **Não urgente** — funciona bem hoje.

## 13. Repetição de helper `loadImage` nas ferramentas de imagem

As 4 ferramentas de imagem reimplantam `loadImage(file)` e `canvasToBlob(...)`. 

**Recomendação**: extrair para `lib/image-utils.ts`. Baixa prioridade.

## 14. `examples/` e `skills/` causam erros de `tsc`

Pastas do scaffold causam os únicos erros de `tsc --noEmit` no repositório (módulos `socket.io`/`socket.io-client` não instalados; erros de tipo em skills).

**Recomendação**: adicionar `examples` e `skills` ao `exclude` do `tsconfig.json`, ou removê-las do repositório. Já estão no `ignores` do ESLint, mas o `tsc` ainda os escaneia.

## 15. Acessibilidade — alvos de toque e skip link

- Alguns botões de ícone ~36px (recomendado 44px);
- Sem link "pular para o conteúdo" no topo.

**Recomendação**: aumentar botões de ícone para `size-10`+; adicionar skip link visível ao foco.

## 16. Sem `google-site-verification`

Não há meta tag de verificação do Search Console. Necessária pós-deploy.

## 17. `dev.log` no repositório

`dev.log` (649 linhas) é gerado por `tee` no script `dev`. Não é código, mas cresce continuamente.

**Recomendação**: adicionar ao `.gitignore` (se ainda não estiver) e/ou rotacionar.

## 18. Sem `.gitignore` explícito visível na raiz

Não foi detectado `.gitignore` na listagem da raiz (apenas configs). Confirmar existência; sem ele, `node_modules`, `.next`, `dev.log`, `db/custom.db` poderiam ser commitados.

> Todas as recomendações acima são **diagnósticas**. Esta auditoria não aplicou nenhuma.
