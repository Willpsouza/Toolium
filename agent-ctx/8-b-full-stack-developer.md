# Task 8-b — Calculator tool components (5 tools)

Agent: full-stack-developer
Task: Build 5 interactive calculator tool components for the Toolium project.

## Files created/overwritten
- `src/components/tools/calculators/calculadora-regra-tres.tsx`
- `src/components/tools/calculators/calculadora-salario-liquido.tsx`
- `src/components/tools/calculators/calculadora-idade.tsx`
- `src/components/tools/calculators/diferenca-entre-datas.tsx`
- `src/components/tools/calculators/calculadora-imc.tsx`

## Key decisions
- All components start with `"use client"` and have a **default export**.
- Used shadcn/ui (Input, Label, Button, Card, Separator), `cn`, `formatBRL`/`formatNumber`/`parseNumber`, `lucide-react` icons, and `date-fns` for date math.
- Brand accent (`bg-brand`, `text-brand`, `bg-brand-muted`) used for prominent result cards; amber/rose for IMC categories and disclaimer notes (no indigo/blue).
- Real-time calculations via React state (no submit button needed). Inputs validated for empty/NaN/negative; invalid → `—`.
- All text in pt-BR; no emojis; accessible labels (`htmlFor`, `aria-label`, `aria-live`).

## Implementation notes
- **regra-tres**: Direta `X=(B*C)/A`, Inversa `X=(A*C)/B`; division by zero guarded → `—`. Visual 2×2 proportion grid + highlighted result card (formatNumber up to 4 decimals). Tipo selector via styled toggle buttons (Direta/Inversa).
- **salario-liquido**: Pure functions `calcularINSS` (progressive 2024 faixas, capped at teto ≈ R$ 908,86) and `calcularIRRF` (2024 faixas with parcela a deduzir). Base IRRF = bruto − INSS − dependentes × R$ 189,59. Breakdown card (bruto, INSS, IRRF, líquido) + extra stats (base IRRF, alíquota efetiva, dependentes) + amber disclaimer note.
- **idade**: date-fns `intervalToDuration` for anos/meses/dias; `differenceInDays`/`differenceInWeeks` for totals; optional dataReferência defaults to today with "Hoje" reset button. Bonus: próximo aniversário card.
- **diferenca-entre-datas**: `differenceInDays` (abs); semanas (dias/7), meses (dias/30.44), anos (dias/365.25). 4-card grid (dias highlighted) + swap button + summary text.
- **imc**: `peso/(altura^2)` with parseNumber (accepts "1,75"); OMS classification badge (amber/brand/amber/rose); gradient medidor bar with marker; category reference grid.

## Verification
- `bunx tsc --noEmit` passes for all `src/` files (only pre-existing errors in `examples/` and `skills/` folders, unrelated to this task).
