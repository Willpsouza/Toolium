# Task 9 — full-stack-developer — Converter tool components (8 tools)

## Scope
Built 8 interactive converter tool components for the Toolium project, overwriting the placeholder files in `src/components/tools/converters/`. Each file starts with `"use client"` and has a default export (registry already imports them).

## Files written
1. `src/components/tools/converters/conversor-temperatura.tsx` — C/F/K converter with formula cards (Celsius as base intermediary; uses the exact formulas from the task).
2. `src/components/tools/converters/conversor-comprimento.tsx` — length, base=m, 8 units (mm, cm, m, km, in, ft, yd, mi).
3. `src/components/tools/converters/conversor-peso.tsx` — weight, base=g, 6 units (mg, g, kg, t, oz, lb).
4. `src/components/tools/converters/conversor-volume.tsx` — volume, base=L, 9 units with pt-BR labels (Mililitros, Litros, Metros cúbicos, Galão EUA/UK, Xícara, Colher de sopa, Colher de chá, Pés cúbicos).
5. `src/components/tools/converters/conversor-area.tsx` — area, base=m², 9 units with pt-BR labels (Milímetros quadrados ... Milhas quadradas).
6. `src/components/tools/converters/conversor-velocidade.tsx` — speed, base=m/s, 4 units (Metros por segundo, Quilômetros por hora, Milhas por hora, Nós).
7. `src/components/tools/converters/conversor-moedas.tsx` — currency, 11 currencies, USD-based reference rates; amount + de + para selects, swap button, primary result, reference rate display, disclaimer note, and a sticky-header scrollable table of all currency equivalents.
8. `src/components/tools/converters/conversor-tempo.tsx` — time, base=s, 8 units (Milissegundos ... Anos).

## Design decisions
- **Reusable pattern for the 6 unit converters**: each file defines its own `factors` map (value in base unit), a `convertAll(value, fromUnit)` helper, and an adaptive `fmt()` formatter that switches fraction digits by magnitude and uses exponential notation for very small/large values.
- **Primary "from → to" pair + all equivalents**: input value + origin-unit select at top, a primary conversion panel (target select + swap button + highlighted brand result), then a responsive grid of ALL unit equivalents. Satisfies both the general rule and the per-file specs.
- **Temperature** is special: uses formulas (not a factors map) with Celsius as the intermediate base; shows 3 cards (C/F/K), highlights the origin card, and lists the conversion formulas.
- **Currency** uses `result = amount * (rates[to] / rates[from])`, formats with 2–4 decimals (0 decimals for JPY/ARS), shows the per-pair reference rate, includes the mandatory disclaimer, and renders a scrollable table (`max-h-96 overflow-y-auto`, sticky header) of the amount in all 11 currencies.
- All components: pt-BR text, no emojis, real-time on input change, validate inputs (empty/NaN → `—`), accessible labels + `htmlFor`/`aria-label`, responsive (sm/lg breakpoints), brand accent classes (`text-brand`, `bg-brand-muted/30`, `border-brand/40`), `cn`/`parseNumber`/`formatNumber` from `@/lib/*`, lucide-react icons (ArrowRight, ArrowLeftRight, Thermometer, Info).

## Verification
- `bunx tsc --noEmit --skipLibCheck` reports NO errors in any of the 8 converter files.
- Dev server log shows clean compilation (no compile errors after edits).

## Notes for downstream agents
- The registry (`src/components/tools/registry.tsx`) and `src/data/tools.ts` were NOT touched.
- All 8 default exports are PascalCase-named components (e.g. `TemperatureConverter`, `LengthConverter`, ...) matching the registry's import names — no rename needed.
