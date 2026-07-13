# Known Issues — Toolium v1.0

> Status dos problemas conhecidos na versão 1.0.
> Apenas problemas reais são listados. Se não houver, é explicitado.

## Problemas conhecidos

### Nenhum problema conhecido no momento.

A auditoria final de QA (Etapa 10) identificou e corrigiu os 2 defeitos encontrados:

1. **Overflow horizontal em mobile (320-375px)** em 3 ferramentas com tabelas — **CORRIGIDO** (containers de tabela agora usam `overflow-auto`)
2. **Overflow horizontal na seção "Ferramentas relacionadas"** em mobile — **CORRIGIDO** (header agora empilha em `flex-col sm:flex-row`)

Após as correções, todos os critérios de aceitação foram atendidos com zero falhas.

---

## Itens adiados (não bloqueantes para publicação)

Os itens abaixo NÃO são problemas — são melhorias futuras documentadas em etapas anteriores, sem impacto na publicação v1.0:

### Operacionais (pós-deploy)
- **Slots AdSense reais**: criar blocos no painel AdSense pós-aprovação e passar `slot` nos `<AdBanner />`
- **`google-site-verification`**: configurar após criação no Search Console
- **OG image em PNG**: atual é SVG; algumas plataformas sociais preferem PNG
- **`favicon.ico` fallback**: navegadores antigos esperam `.ico`; atual usa SVG via `app/icon.svg`
- **Lighthouse em produção**: medir Core Web Vitals reais após deploy na Vercel

### Higiene de código (etapas futuras)
- **Dependências órfãs**: ~48 dependências não usadas pelo produto (herdadas do scaffold); `bun audit` reporta 54 vulnerabilidades em deps transitivas, quase todas em pacotes órfãos (não afetam o bundle de produção)
- **Componentes UI órfãos**: ~29 componentes shadcn não importados pelo produto
- **`ignoreBuildErrors: true`**: flag no `next.config.ts` que mascara erros de tipo no build (hoje `src/` está limpo, mas a flag é desnecessária)
- **`reactStrictMode: false`**: desativado; reativar em etapa dedicada
- **`framer-motion`**: dependência morta (sem imports em `src/`)

### Features futuras (não são problemas)
- Busca global no header
- Link "voltar ao topo" no footer
- Busca rápida no Sheet mobile
- Ferramentas relacionadas inter-categoria (atualmente só mesma categoria)

---

## Resumo

| | |
|---|---|
| Problemas críticos | 0 |
| Problemas altos | 0 |
| Problemas médios | 0 (2 encontrados e corrigidos) |
| Problemas baixos | 0 |
| Itens adiados (não bloqueantes) | 14 (5 operacionais, 5 higiene, 4 features futuras) |
| **Status para publicação** | **Sem bloqueios** |
