# 00 — Visão do Projeto

> Documento de auditoria. Descreve **exatamente como o projeto está hoje**. Não propõe mudanças.

## Identificação

| Campo | Valor |
|---|---|
| Nome do produto | **Toolium** |
| Domínio oficial | https://toolium.com.br |
| Nome interno (package.json) | `nextjs_tailwind_shadcn_ts` *(herdado do scaffold — diverge do produto)* |
| Versão (package.json) | `0.2.0` |
| Idioma do produto | Português (pt-BR) |
| Tipo de produto | Plataforma de ferramentas online gratuitas |

## Propósito

O Toolium é uma plataforma de ferramentas online **100% gratuitas, sem cadastro**, organizadas em 5 categorias:

1. **Calculadoras** (10 ferramentas)
2. **Conversores** (8 ferramentas)
3. **Geradores** (6 ferramentas)
4. **Imagem** (4 ferramentas)
5. **Produtividade** (4 ferramentas)

**Total: 32 ferramentas.**

## Proposta de valor

> "Ferramentas digitais simples, rápidas e gratuitas para facilitar tarefas do dia a dia."

Princípios declarados no conteúdo do site:

- 100% gratuito, sem cadastro, sem limites;
- Resultados instantâneos;
- Privacidade primeiro (maioria das ferramentas roda no navegador);
- Funciona em celular, tablet e desktop;
- Monetização via Google AdSense (anúncios discretos).

## Stack tecnológica (estado atual)

- **Framework**: Next.js 16 (App Router)
- **Linguagem**: TypeScript 5
- **Estilo**: Tailwind CSS 4 + shadcn/ui (estilo New York, base neutral)
- **Ícones**: lucide-react
- **Temas**: next-themes (claro/escuro)
- **Datas**: date-fns
- **QR Code**: qrcode (npm)
- **Hash MD5**: spark-md5
- **Build/runtime**: Bun (dev server na porta 3000)
- **Deploy alvo**: Vercel (config `output: "standalone"`)

## Monetização

- Google AdSense, cliente `ca-pub-2570963650556560`;
- Script global injetado no `src/app/layout.tsx` via `next/script` (estratégia `afterInteractive`);
- Componente `AdBanner` (`src/components/ads/ad-banner.tsx`) com placeholder elegante em desenvolvimento;
- 3 posições de anúncio por página de ferramenta.

## Estado de prontidão

| Aspecto | Estado |
|---|---|
| `bun run lint` | ✅ Limpo (0 erros, 0 warnings) |
| `bunx tsc --noEmit` (src/) | ✅ Sem erros no código do Toolium |
| `bunx tsc --noEmit` (repo) | ⚠️ Erros apenas em `examples/` e `skills/` (artefatos de scaffold, fora do escopo) |
| Dev server (porta 3000) | ✅ Rodando, todas as rotas retornam 200 |
| Build de produção | ⚠️ Não executado nesta auditoria (ver seção 09 / relatório) |

## Escopo desta auditoria

Esta auditoria **apenas documenta** o estado atual. Nenhuma funcionalidade nova foi criada, nenhum componente removido, nenhuma dependência instalada ou desinstalada. Os documentos seguintes detalham arquitetura, estrutura, componentes, dependências, rotas, SEO, AdSense, responsividade e pontos de melhoria.
