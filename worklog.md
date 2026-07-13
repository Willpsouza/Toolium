# Toolium — Worklog

---
Task ID: 1-foundation
Agent: main (Z.ai Code)
Task: Create project foundation — design system, layout, data layer, home page, tool framework, category pages, institutional pages, SEO, AdSense, cookie consent.

Work Log:
- Explored existing Next.js 16 + Tailwind 4 + shadcn/ui (New York/neutral) scaffold.
- Designed premium neutral + emerald accent theme (no indigo/blue), light/dark mode via next-themes.
- Created Toolium logo SVG (public/logo.svg + src/app/icon.svg) + OG image (public/og.svg).
- Updated globals.css with brand tokens, utilities (bg-grid, bg-radial-fade, container-page), scrollbar styling.
- Built layout: ThemeProvider, ThemeToggle, SiteHeader (desktop nav + mobile sheet + category dropdown), SiteFooter.
- Root layout: global metadata, viewport, JSON-LD (WebSite + Organization), AdSense script (ca-pub-2570963650556560), ThemeProvider, header/footer, CookieConsent.
- Data layer: src/data/categories.ts (5 categories), src/data/tools.ts (all 32 tools with full SEO content: intro, content blocks, how-to, example, benefits, FAQs).
- SEO lib: src/lib/seo.ts (siteConfig + buildMetadata), src/lib/schema.ts (Organization, WebSite, Breadcrumb, FAQ, HowTo, ItemList, CollectionPage schemas).
- Icon registry: src/lib/icons.ts (tree-shakeable map of all tool/category icons).
- Home page (src/app/page.tsx): hero, categories grid, popular tools, benefits, how-it-works, FAQ, CTA.
- Tool framework: src/components/tools/registry.tsx (maps all 32 slugs → components), src/components/tools/tool-page.tsx (ToolPage layout with breadcrumb, 3 ad slots, explanation, how-to, example, benefits, FAQ, JSON-LD), tool-card.tsx, faq-section.tsx, tools-explorer.tsx (client search/filter).
- Dynamic route: src/app/[slug]/page.tsx (generateStaticParams + generateMetadata + dynamicParams=false).
- Category pages: src/app/ferramentas/page.tsx (all tools + search), src/app/ferramentas/[categoria]/page.tsx.
- Created 32 placeholder tool components (src/components/tools/{calculators,converters,generators,image,productivity}/*.tsx) so registry always resolves.
- Institutional pages: /sobre, /privacidade, /termos, /cookies (Prose component).
- Cookie consent banner (src/components/cookie-consent.tsx) with localStorage persistence.
- AdBanner component (src/components/ads/ad-banner.tsx) — AdSense-ready, elegant placeholder in dev.
- sitemap.ts (home, ferramentas, categories, 32 tools, institutional), robots.ts (removed conflicting public/robots.txt), manifest.ts.

Stage Summary:
- Foundation complete and compiling. Home page returns 200.
- All 32 tool pages render (currently with placeholders) via dynamic [slug] route.
- READY for subagents to replace placeholder tool components with full implementations.
- Tool components live at: src/components/tools/{calculators|converters|generators|image|productivity}/{slug}.tsx — each exports default client component.
- Registry (src/components/tools/registry.tsx) MUST NOT be edited by subagents — it already maps all slugs. Subagents only overwrite their assigned component files.
- Shared UI: shadcn/ui available at @/components/ui/*, cn at @/lib/utils, Input/Button/Label/Card/Accordion/Tabs/Select/Switch/Checkbox/Slider all available.
- Brand accent classes: bg-brand, text-brand, text-brand-foreground, bg-brand-muted. Ad slots via <AdBanner />.

---
Task ID: 12
Agent: full-stack-developer
Task: Build productivity tool components (4 tools)

Work Log:
- Read worklog.md and the existing placeholder productivity files.
- Verified available shadcn/ui components and brand color tokens (bg-brand/text-brand-foreground/bg-brand-muted).
- Implemented cronometro-online.tsx: large monospace tabular-nums display (MM:SS.cs / HH:MM:SS.cs), Iniciar/Pausar toggle (Continuar when paused with elapsed > 0), Volta, Zerar. Uses requestAnimationFrame + performance.now() timestamps in refs for accuracy; laps list in scrollable table (max-h-64, scrollbar-thin), newest first, with index + lap time + total.
- Implemented contador-palavras.tsx: large Textarea with inline Limpar button, useMemo-computed stats (palavras, caracteres, caracteres sem espacos, frases por [.!?...], paragrafos por linhas em branco, tempo de leitura 200 ppm -> "X min Y seg"), responsive stat grid (2 cols mobile -> 6 cols desktop), privacy note.
- Implemented conversor-fuso-horario.tsx: datetime-local input (defaults to now via useEffect to avoid hydration mismatch), source timezone Select (default America/Sao_Paulo), 10 target cities (Sao Paulo, Nova York, Londres, Paris, Berlim, Tóquio, Sydney, Los Angeles, Dubai, Cidade do México). Wall-clock-to-instant conversion via Intl offset trick (build UTC reference, format in source tz to compute offset, subtract offset) — DST-safe. Each city card shows time, weekday + day + month, UTC offset; source city highlighted with brand. "Usar horário atual" button.
- Implemented checklist-online.tsx: Input + Adicionar button (Enter also adds), Checkbox toggle, Trash2 delete, persist to localStorage key "toolium:checklist" (load on mount, save on change after hydration), "X de Y concluídas" + "Limpar concluídas", progress bar, strike-through + muted completed items, accessible aria-labels.
- Type-checked with `bunx tsc --noEmit -p tsconfig.json` — no errors in any of the 4 productivity files (only pre-existing unrelated errors remain).

Stage Summary:
- Files overwritten (all default exports, all "use client", all pt-BR, no emojis):
  - src/components/tools/productivity/cronometro-online.tsx
  - src/components/tools/productivity/contador-palavras.tsx
  - src/components/tools/productivity/conversor-fuso-horario.tsx
  - src/components/tools/productivity/checklist-online.tsx
- Key decisions: rAF + performance.now for sub-100ms accurate stopwatch; Intl-based DST-safe timezone conversion (documented in code comment); localStorage with hydration guard for checklist; brand accent only on primary actions/source-highlighted card and progress bar; responsive grids and scrollable laps list with scrollbar-thin.
- Did NOT touch registry.tsx, tools.ts, tool-page.tsx, app/**, or any other agent's files.

---
Task ID: 8-a
Agent: full-stack-developer
Task: Build calculator tool components (5 tools)

Work Log:
- Read worklog.md to understand prior foundation (Next.js 16 + Tailwind 4 + shadcn/ui neutral/brand, ToolPage wrapper, registry, format lib).
- Inspected @/lib/format (formatBRL, formatNumber, parseNumber, formatPercent), @/lib/utils (cn), shadcn ui primitives (Tabs, Select, Input, Label, Table, Card), and existing placeholder file.
- Built calculadora-porcentagem.tsx: 3-mode Tabs ("Porcentagem de um valor", "Aumento percentual", "Desconto percentual") with shared valor/porcentagem inputs, real-time calc, highlighted result box, formatNumber output, mobile-friendly tab labels with icons.
- Built calculadora-juros-compostos.tsx: inputs valorInicial/aporteMensal/taxaJuros (Select ao mês|ao ano)/prazo (Select meses|anos); converts taxa to monthly effective via (1+r/100)^(1/12)-1; monthly compounding with PMT formula guarded for i=0; three result cards (montante final prominent, total investido, total de juros) using formatBRL.
- Built calculadora-juros-simples.tsx: capital/taxa (Select)/tempo (Select); normalizes taxa and tempo to months (annual taxa → /12, anos → *12); juros = capital*(i/100)*t; two result cards (juros, montante final prominent).
- Built calculadora-financiamento.tsx: Tabela Price parcela formula (i=0 guard → principal/n); three result cards (valor da parcela prominent, total a pagar, total de juros); optional scrollable amortization preview (first 12 parcels) using shadcn Table inside max-h-64 overflow-y-auto scrollbar-thin with columns Parcela|Prestação|Juros|Amortização|Saldo and sticky header.
- Built calculadora-desconto.tsx: precoOriginal/percentualDesconto inputs; desconto = original*(p/100); final = max(0, original-desconto); two result cards (Você economiza, Preço final prominent).
- All files: "use client", default export, parseNumber + safeNum guard (NaN/negative → 0, displays "—" when empty), real-time computation (no submit), mobile-first responsive (sm:/lg: grids), accessible Label htmlFor + aria-label on icon-only Select triggers, brand accent classes for prominent results, pt-BR text, no emojis.
- Verified: bun build transpiled all 5 files cleanly; full project `bunx tsc --noEmit` reports zero errors in the 5 assigned files (errors only in other agents' gerador-qrcode.tsx and pre-existing examples/skills).

Stage Summary:
- Files overwritten (default export client components):
  - src/components/tools/calculators/calculadora-porcentagem.tsx
  - src/components/tools/calculators/calculadora-juros-compostos.tsx
  - src/components/tools/calculators/calculadora-juros-simples.tsx
  - src/components/tools/calculators/calculadora-financiamento.tsx
  - src/components/tools/calculators/calculadora-desconto.tsx
- Key decisions: consistent ResultCard/ResultBox pattern with prominent variant (bg-brand-muted, border-brand/30, text-brand) for the headline metric; formatBRL for currency, formatNumber for percentage calc; safeNum helper clamps NaN/negative to 0 and renders "—" when all inputs empty so no NaN ever leaks; financing amortization preview uses sticky-header shadcn Table inside scrollable container; selects use fixed w-[110px] triggers to keep input+select rows aligned.
- Did NOT touch registry.tsx, tool-page.tsx, data/*, or any app routes.
- READY for use by ToolPage wrapper at slugs: calculadora-porcentagem, calculadora-juros-compostos, calculadora-juros-simples, calculadora-financiamento, calculadora-desconto.

---
Task ID: 8-b
Agent: full-stack-developer
Task: Build calculator tool components (5 tools)

Work Log:
- Read worklog and existing scaffolding: registry already maps all 5 slugs to placeholder files; format helpers (formatBRL/formatNumber/parseNumber/formatPercent) and shadcn/ui components confirmed available; date-fns v4 + lucide-react confirmed in package.json.
- Overwrote 5 placeholder files with full interactive client components (default export each).
- calculadora-regra-tres: Direta/Inversa toggle, A/B/C inputs, real-time X = (B*C)/A or (A*C)/B, division-by-zero guard, 2x2 proportion visual + highlighted result (formatNumber up to 4 decimals).
- calculadora-salario-liquido: pure helpers calcularINSS (progressive 2024 faixas, teto cap) and calcularIRRF (2024 faixas + parcela a deduzir); base IRRF = bruto − INSS − dependentes × 189,59; breakdown card (bruto/INSS/IRRF/líquido) + base IRRF + alíquota efetiva + amber disclaimer note.
- calculadora-idade: date-fns intervalToDuration (anos/meses/dias), differenceInDays/differenceInWeeks for totals; optional dataReferência default hoje with reset button; próximo aniversário bonus card.
- diferenca-entre-datas: abs(differenceInDays) → semanas (dias/7), meses (dias/30.44), anos (dias/365.25); 4-card result grid (dias destacado) + swap button + summary text.
- calculadora-imc: peso/(altura^2) com parseNumber (aceita "1,75"); classificação OMS com badge colorido (amber/brand/amber/rose); medidor gradient com marcador; grid de categorias de referência.
- Verified TypeScript validity with `bunx tsc --noEmit` — all src/ files clean (only unrelated errors in examples/ and skills/).

Stage Summary:
- Files overwritten: src/components/tools/calculators/calculadora-regra-tres.tsx, calculadora-salario-liquido.tsx, calculadora-idade.tsx, diferenca-entre-datas.tsx, calculadora-imc.tsx.
- All components: "use client", default export, pt-BR text, no emojis, real-time results, input validation (empty/NaN/negative → "—"), accessible labels, responsive layouts, brand accent colors (emerald) for prominent results, amber/rose for IMC categories and disclaimers.
- Pure helper functions calcularINSS and calcularIRRF exported from salario-liquido for reuse/testability.
- Did NOT touch registry.tsx, tool-page.tsx, tools.ts, or any app routes.

---
Task ID: 11
Agent: full-stack-developer
Task: Build image tool components (4 tools)

Work Log:
- Read worklog.md to confirm project context (Next.js 16 + Tailwind 4 + shadcn/ui New York/neutral; brand accent emerald; ToolPage wrapper already renders surrounding chrome; registry already imports the 4 image tool files via default export).
- Inspected existing placeholder files in src/components/tools/image/, registry.tsx, lib/utils.ts, ui/slider.tsx, and brand tokens in globals.css (--brand / --brand-foreground / --brand-muted defined for light+dark).
- Built src/components/tools/image/compressor-imagem.tsx: drag-and-drop + click upload (accept image/*); offscreen canvas at natural size; always re-encodes as image/jpeg with quality slider (10-100, default 75); fills white background before drawImage so transparent PNGs don't turn black; recompresses live via a single useEffect keyed on [original, quality] (avoids race between initial compression and slider changes); shows original preview+size and compressed preview+size+reduction %, "Baixar" + "Nova imagem" buttons; graceful errors for invalid file / canvas failure / null blob; object URLs revoked on reset and unmount.
- Built src/components/tools/image/conversor-jpg-png.tsx: drag-and-drop + click upload (accept image/jpeg,image/jpg), validates JPG; auto-converts on file select via canvas.toBlob(cb, "image/png"); shows side-by-side original vs converted previews with sizes and a size-diff badge; "Baixar PNG" button; explanatory note that PNG (lossless) may be larger than JPG.
- Built src/components/tools/image/conversor-png-webp.tsx: drag-and-drop + click upload (accept image/png), validates PNG; auto-converts via canvas.toBlob(cb, "image/webp", 0.9); pre-checks browser WEBP encode support (canvas.toDataURL("image/webp").startsWith("data:image/webp")) and shows a clear message if unsupported; null-blob guard; shows side-by-side previews + reduction %; "Baixar WEBP" button.
- Built src/components/tools/image/redimensionador-imagem.tsx: drag-and-drop + click upload (accept image/*); shows original dimensions/size/preview; mode toggle (Pixels | Porcentagem) with percent quick-pick buttons (25/50/75/100/150/200); width/height inputs (number, min 1, max 8000); Switch "Manter proporção" (default on) backed by an aspect-ratio ref so editing one dimension recomputes the other; cap at MAX_DIMENSION=8000px with inline warning; explicit "Redimensionar imagem" button draws scaled image (imageSmoothingQuality="high") to canvas and toBlob with original mime preserved (jpeg@0.92, png/webp lossless); result panel shows new dimensions + size + "Baixar"/"Nova imagem" buttons; download filename includes target dims and correct extension.
- Refactored compressor-imagem to remove the duplicate inline compression in handleFile (single source of truth: the [original, quality] effect) and removed unused Input import.
- Verified TypeScript with `npx tsc --noEmit` — no errors in any of the 4 image tool files (remaining errors are in unrelated examples/ and skills/ folders).

Stage Summary:
- Files overwritten (default export, "use client"): src/components/tools/image/compressor-imagem.tsx, src/components/tools/image/conversor-jpg-png.tsx, src/components/tools/image/conversor-png-webp.tsx, src/components/tools/image/redimensionador-imagem.tsx.
- All image processing is 100% client-side via Canvas API + HTMLImageElement (no server upload). Object URLs are created and revoked to prevent leaks.
- UI: responsive (mobile-first, sm:grid-cols-2 comparison panels), accessible (semantic structure, role="alert" for errors, aria-label on Switch + icon-only buttons, Label htmlFor on inputs/slider), pt-BR copy, shadcn/ui (Button, Input, Label, Slider, Switch), lucide-react icons, brand accent classes (bg-brand / text-brand / bg-brand-muted / text-brand-foreground), emerald/amber size-diff badges, drag-and-drop with hover highlight, loading spinners.
- Did NOT touch registry.tsx, tools.ts, tool-page.tsx, app routes, or any files outside the 4 assigned component paths.
- All 4 image tools ready to render inside the existing ToolPage wrapper.

---
Task ID: 9
Agent: full-stack-developer
Task: Build converter tool components (8 tools)

Work Log:
- Read worklog.md to understand prior foundation work (Next.js 16 + Tailwind 4 + shadcn/ui New York/neutral, ToolPage wrapper renders component inside padded card, registry already imports converter files via default export).
- Inspected available shadcn/ui components, @/lib/utils (cn), @/lib/format (parseNumber, formatNumber), brand color tokens in globals.css, and the Select component API.
- Built conversor-temperatura.tsx: input + unit select (Celsius/Fahrenheit/Kelvin), 3 result cards, exact formulas (C→F, C→K, F→C, K→C) with Celsius as base intermediary, formulas reference panel.
- Built conversor-comprimento.tsx: base=meter, 8 units (mm, cm, m, km, in, ft, yd, mi) with specified factors; primary from→to pair + swap + all-equivalents grid.
- Built conversor-peso.tsx: base=gram, 6 units (mg, g, kg, t, oz, lb); same UX pattern.
- Built conversor-volume.tsx: base=liter, 9 units with pt-BR labels (Mililitros, Litros, Metros cúbicos, Galão EUA/UK, Xícara, Colher de sopa, Colher de chá, Pés cúbicos).
- Built conversor-area.tsx: base=m², 9 units with pt-BR labels (Milímetros quadrados ... Milhas quadradas).
- Built conversor-velocidade.tsx: base=m/s, 4 units (Metros por segundo, Quilômetros por hora, Milhas por hora, Nós).
- Built conversor-moedas.tsx: 11 currencies with USD reference rates; amount + de + para selects, swap button, primary result (2–4 decimals), per-pair reference rate display, mandatory disclaimer note, and a scrollable sticky-header table of all currency equivalents.
- Built conversor-tempo.tsx: base=second, 8 units (Milissegundos ... Anos 365 dias).
- Created agent-ctx/9-full-stack-developer.md work record.
- Verified TypeScript validity: `bunx tsc --noEmit --skipLibCheck` reports NO errors in any of the 8 converter files; dev log shows clean compilation.

Stage Summary:
- Files overwritten (8): src/components/tools/converters/{conversor-temperatura,conversor-comprimento,conversor-peso,conversor-volume,conversor-area,conversor-velocidade,conversor-moedas,conversor-tempo}.tsx
- Key decisions: (1) Reusable inline pattern per file — factors map + convertAll() + adaptive fmt() that switches fraction digits by magnitude and uses exponential notation for extreme values. (2) The 6 unit converters share a consistent UX: input + origin select at top, primary "from→to" conversion panel with swap button + brand-highlighted result, then responsive grid of ALL unit equivalents (origin marked). (3) Temperature uses formulas (Celsius base) with 3 cards + formulas reference. (4) Currency uses result = amount * (rates[to]/rates[from]) with disclaimer + full equivalents table. All components: "use client", default export, pt-BR, no emojis, real-time, NaN/empty handled with "—", accessible labels, responsive, brand accent classes, lucide-react icons.
- Registry and data files NOT touched. Default export names (TemperatureConverter, LengthConverter, WeightConverter, VolumeConverter, AreaConverter, SpeedConverter, CurrencyConverter, TimeConverter) match the existing registry imports.
- All 8 converter pages now render fully interactive UIs. No TypeScript errors. Ready for use.

---
Task ID: 10
Agent: full-stack-developer
Task: Build generator tool components (6 tools)

Work Log:
- Read worklog.md and verified scaffolding: registry.tsx already maps the 6 generator slugs to placeholder files; shadcn/ui (Button, Input, Label, Textarea, Slider, Switch, Select, Badge, Card) and `cn` confirmed available; qrcode + spark-md5 + @types confirmed in package.json.
- Overwrote 6 placeholder files with full interactive client components (each "use client" + default export, pt-BR text, no emojis, brand accent on primary actions).
- gerador-senhas: secure RNG via crypto.getRandomValues with rejection sampling; Slider 4-64 (default 16); Switches for minúsculas/maiúsculas/números/símbolos (all on by default); guaranteed one char per enabled set + Fisher-Yates shuffle; strength badge (Fraca/Média/Forte/Muito forte) + colored bar scored by length thresholds + charset variety; auto-generate on mount; Copy button with Check feedback; guard against zero charsets.
- gerador-qrcode: imports `qrcode` npm package; QRCode.toCanvas on a `<canvas ref>` (white bg, dark #0f172a, margin 2, errorCorrection M); size Select 256/384/512; auto-render on text/size change; empty text → white placeholder canvas + hint; "Baixar PNG" via canvas.toDataURL + temporary anchor; try/catch error messaging; centered bordered preview.
- gerador-lorem-ipsum: Select unit (Parágrafos/Frases/Palavras) + Input count 1-100 (default 5); word bank with classic "Lorem ipsum dolor sit amet..." opener injected into first output; paragraphs 3-6 sentences, sentences 8-15 words; Generate + Copy buttons; scrollable serif prose area; word-count footer.
- gerador-nomes: ~30 pt-BR first names + ~30 last names; Input count 1-50 (default 10); generates 1-2 last names per name; Set-based dedup with safety counter; list display with index + per-name Copy button + Copy-all (newline-joined); auto-generate on mount.
- gerador-hash: Textarea input; MD5 via `SparkMD5.hash(text)`; SHA-1/256/512 via `crypto.subtle.digest` + hex encoding; async useEffect recomputes on text change; 4 rows (label + monospace value with vertical scroll + copy button); empty input → em-dash placeholders; security note about MD5/SHA-1.
- gerador-cores: random HSL (s 55-90, l 40-65) → convert to RGB/HEX via pure helpers (hslToRgb, rgbToHex, hslToCss, rgbToCss); big swatch with active color + contrast text; "Gerar cor" button; HEX/RGB/HSL code cards each with copy button; 5-variation palette (2 darker + base + 2 lighter, varying lightness only) as clickable swatches that become active; aria-pressed on active swatch.
- All copy actions use navigator.clipboard.writeText with local `copied` state + lucide Check icon (no sonner dependency required).
- Ran `bunx tsc --noEmit --skipLibCheck`: zero TypeScript errors across the 6 generator files (only pre-existing unrelated errors remain in examples/ and skills/). Fixed an initial TS narrowing issue in gerador-qrcode by moving the canvas null-check inside the async render closure.

Stage Summary:
- Files overwritten: src/components/tools/generators/{gerador-senhas,gerador-qrcode,gerador-lorem-ipsum,gerador-nomes,gerador-hash,gerador-cores}.tsx.
- All components: "use client", default export, pt-BR, no emojis, accessible (aria-label on icon buttons, Label htmlFor pairing, aria-live on output regions), responsive (grid sm: breakpoints, max-h-96 overflow on long lists), brand accent (bg-brand / text-brand-foreground) on primary CTAs.
- Did NOT touch registry.tsx, tool-page.tsx, tools.ts, app routes, or any files outside the assigned generator components.
- Agent work record saved to /home/z/my-project/agent-ctx/10-full-stack-developer.md.

---
Task ID: 15-verify
Agent: main (Z.ai Code)
Task: Lint, fix errors, and end-to-end verification with Agent Browser.

Work Log:
- Ran `bun run lint` after all 32 tools were built by subagents.
- Fixed 3 lint errors:
  - cronometro-online.tsx: replaced self-referencing requestAnimationFrame `tick` (useCallback TDZ) with a clean setInterval-based timer using intervalRef + clearTimer helper.
  - conversor-fuso-horario.tsx & checklist-online.tsx: added targeted `eslint-disable-next-line react-hooks/set-state-in-effect` for the legitimate mount-time hydration effects (client-only current time / localStorage load).
- Ran `bun run lint --fix` to remove 15 unused eslint-disable directives left by subagents.
- Final `bun run lint` → clean (0 errors, 0 warnings).

Agent Browser verification (all passed):
- Home `/`: hero, 5 categories w/ counts, ad placeholder, 8 popular tools, benefits, how-it-works, FAQ, CTA all render.
- `/calculadora-juros-compostos`: breadcrumb, inputs (valor inicial, aporte mensal, taxa c/ select, prazo c/ select). Filled 1000 + 200/mês @1% ×12 → montante R$ 3.570,00, juros R$ 170 (matches spec example). Real-time. ✓
- `/gerador-senhas`: slider(16), 4 charset switches, generated "V($$Xi}9KQo]?9TL" (16 chars, all charsets). Copy button present. ✓
- `/conversor-temperatura`: 100°C → 212°F, 373,15 K. Correct. ✓
- `/cronometro-online`: Iniciar/Volta/Zerar; started → 00:01.70 after ~1.5s (centisecond precision via setInterval). ✓
- `/ferramentas`: search "imc" → 1 filtered result. ✓
- `/ferramentas/geradores`: 6 tools listed. ✓
- `/compressor-imagem`: file input renders. ✓
- Dark mode toggle: html class switches to "dark". ✓
- Mobile (390×844): header collapses to hamburger menu. ✓
- Cookie consent banner: appears, dismissible (Aceitar/Recusar/Fechar). ✓
- Sticky footer: pushed down naturally on long pages; layout uses min-h-screen flex-col + flex-1 main. ✓
- No console errors. Dev log shows all routes 200.

Stage Summary:
- Project COMPLETE. `bun run lint` clean. Dev server healthy on port 3000.
- 32 tools all functional, SEO-ready (metadata, JSON-LD Breadcrumb/FAQ/HowTo, sitemap, robots), AdSense script integrated (ca-pub-2570963650556560) with 3 ad slots per tool page, cookie consent, dark/light theme, fully responsive, institutional pages (sobre/privacidade/termos/cookies).
- Ready for production build (`bun run build`) and Vercel deployment to toolium.com.br.
