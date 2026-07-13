# 08 — Responsividade e Acessibilidade

> Documento de auditoria. Estado de responsividade, layout mobile/desktop e acessibilidade.

## Responsividade

### Abordagem

- **Mobile-first** com Tailwind CSS 4;
- Breakpoints usados: `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px);
- Container padrão `.container-page` = `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`;
- Layout raiz: `min-h-screen flex flex-col` com `main` `flex-1` e `footer` `mt-auto` → **footer fixo ao fundo em telas curtas, empurrado naturalmente em telas longas**.

### Cabeçalho (`site-header.tsx`)

- Altura `h-16`, sticky (`sticky top-0 z-50`), backdrop blur;
- Desktop (`md+`): nav horizontal com dropdown "Ferramentas", links "Todas" e "Sobre", botão buscar, toggle tema, botão "Explorar";
- Mobile (`<md`): logo + toggle tema + botão hambúrguer → `Sheet` (painel lateral) com nav completo (categorias, institucional).

### Home (`page.tsx`)

- Hero: texto centralizado, `max-w-3xl`, botões em coluna no mobile / linha no desktop;
- Grade de categorias: 1 coluna mobile → 2 `sm` → 3 `lg`;
- Grade de populares: 1 → 2 → 3 → 4 colunas;
- Benefícios: 1 → 2 → 4;
- Como funciona: 1 → 3;
- FAQ: `max-w-3xl` centralizado;
- CTA: card com `p-10 sm:p-16`.

### Páginas de ferramenta (`tool-page.tsx`)

- Breadcrumb com `flex-wrap`;
- Header da ferramenta `max-w-3xl`;
- Card da ferramenta com `p-5 sm:p-8`;
- Conteúdo editorial `max-w-3xl`;
- Listas/benefícios em grid `sm:grid-cols-2`.

### Ferramentas (componentes client)

Cada ferramenta implementa seu próprio layout responsivo. Padrões observados:
- Inputs em `grid gap-4 md:grid-cols-2` (cálculos com múltiplos campos);
- Resultados em cards com grid responsivo (`sm:grid-cols-2 lg:grid-cols-3`);
- Tabelas (ex.: financiamento, cronometro voltas) com `overflow-y-auto scrollbar-thin` e `max-h-*`;
- Botões com `flex-wrap` para não estourar mobile.

### Verificação (já realizada na construção)

- Viewport 390×844 (iPhone): header colapsa para hambúrguer, grids reorganizam, sem scroll horizontal;
- Viewport 1280×800: layout desktop completo;
- Dev server responde em todas as larguras.

## Acessibilidade

### Semântica

- `<html lang="pt-BR">` ✅;
- Estrutura semântica: `<header>`, `<main>`, `<footer>`, `<nav aria-label="Navegação principal">`, `<section>`, `<article>`, `<aside aria-label="Anúncio">` ✅;
- Breadcrumb com `<nav aria-label="breadcrumb">` ✅;
- Headings hierárquicos (H1 único por página, H2/H3 aninhados) ✅.

### Interatividade

- Botões de ícone com `aria-label` (ex.: theme toggle "Ativar tema escuro", menu "Abrir menu", copiar, excluir) ✅;
- `<Label htmlFor>` pareando inputs na maioria das ferramentas ✅;
- `aria-live="polite"` em resultados dinâmicos (ex.: cronômetro) ✅;
- Foco visível: shadcn/ui inclui `focus-visible:ring` nos componentes ✅;
- Targets de toque: botões padrão `h-9` (~36px), botões `lg` `h-10` (40px); alguns ícones `size-9` (36px) — próximo do mínimo recomendado de 44px mas não exatamente.

### Imagens

- Logo SVG com `role="img"` e `aria-label="Toolium"` ✅;
- OG image com `alt` ✅;
- Ferramentas de imagem mostram previews gerados (não `<img>` estáticos com alt fixo) — acessibilidade depende do contexto.

### Cores / contraste

- Tema claro: foreground `oklch(0.145 0 0)` sobre background `oklch(1 0 0)` → alto contraste ✅;
- Tema escuro: foreground `oklch(0.985 0 0)` sobre background `oklch(0.145 0 0)` → alto contraste ✅;
- `text-muted-foreground` usado para texto secundário (contraste menor, mas dentro do aceitável para não-essencial);
- Acento esmeralda (brand) sobre fundo escuro: verificável.

### Foco por teclado

- Links e botões nativos → navegáveis por Tab ✅;
- Accordion (FAQ) e Tabs operáveis por teclado (Radix) ✅;
- Select, Dialog, Sheet (Radix) → suporte completo a teclado ✅.

### Pontos de atenção (não corrigidos)

| Item | Detalhe |
|---|---|
| Alvos de toque | Alguns botões de ícone têm ~36px; o recomendado é 44px. Não bloqueante. |
| `sr-only` pouco usado | Texto complementar para leitores de tela poderia ser ampliado em alguns pontos. |
| Resultados numéricos | Nem todos os resultados têm `aria-live`; alguns anúncios de mudança não são lidos por screen readers. |
| Ferramentas de imagem | Preview de imagem comprimida/convertida não tem `alt` dinâmico descritivo. |
| Pular para conteúdo | Sem link "pular para o conteúdo" (skip link) no topo. |

## Modo escuro

- Implementado via `next-themes` (`attribute="class"`);
- Tokens em `globals.css`: `:root` (claro) e `.dark` (escuro), ambos oklch;
- `ThemeToggle` alterna e persiste;
- `suppressHydrationWarning` no `<html>` para evitar mismatch (next-themes injeta classe após mount);
- `viewport.themeColor` responde a `prefers-color-scheme`;
- Verificado: toggle funciona, persiste entre recargas, respeita `system` por padrão.
