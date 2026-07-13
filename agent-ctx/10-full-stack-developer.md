# Task 10 — Generator tool components

Agent: full-stack-developer
Task: Build 6 generator tool components for the Toolium platform.

## Files created/overwritten
- `src/components/tools/generators/gerador-senhas.tsx` — secure password generator (crypto.getRandomValues, slider 4-64, switches for charsets, strength badge + bar, auto-generate on mount, copy button).
- `src/components/tools/generators/gerador-qrcode.tsx` — QR Code generator using `qrcode` npm package, renders to `<canvas ref>`, size selector (256/384/512), auto-render on text/size change, PNG download via canvas.toDataURL, empty-text placeholder.
- `src/components/tools/generators/gerador-lorem-ipsum.tsx` — Lorem Ipsum generator with unit select (Parágrafos/Frases/Palavras), count input 1-100, classic "Lorem ipsum dolor sit amet..." opener, copy button, scrollable output area.
- `src/components/tools/generators/gerador-nomes.tsx` — pt-BR name generator from ~30 first + ~30 last name arrays, count 1-50, copy-all + per-name copy buttons, list display.
- `src/components/tools/generators/gerador-hash.tsx` — MD5 (via spark-md5) + SHA-1/256/512 (via Web Crypto) computed async in useEffect, rows with label + monospace value + copy button, empty-text handled.
- `src/components/tools/generators/gerador-cores.tsx` — random color (random HSL), big swatch, HEX/RGB/HSL codes each with copy button, 5-variation palette (2 darker + base + 2 lighter), click swatch to set active, pure hslToRgb/rgbToHex helpers.

## Key decisions
- Used `crypto.getRandomValues` with rejection sampling for uniform secure random in password generator.
- Password strength scoring combines length thresholds (8/12/16/24) + charset variety (penalizes single charset).
- QR Code uses `errorCorrectionLevel: "M"`, dark color `#0f172a` on white; canvas cleared to white when input empty.
- Lorem Ipsum guarantees the classic opener on the first paragraph/sentence/word block.
- Name generator dedupes via a Set with a safety counter; fills remainder if collisions keep it short.
- Hash generator handles empty input (skips MD5/SHA computation, shows em-dash).
- Color generator uses HSL as the canonical source of truth; palette varies only lightness so the hue/saturation stays consistent; contrast text color picked from lightness threshold.
- All copy actions use `navigator.clipboard.writeText` with local `copied` state + `Check` icon feedback (no sonner dependency needed).
- All text in pt-BR; brand accent (`bg-brand`, `text-brand-foreground`) used on primary action buttons.

## Verification
- Ran `bunx tsc --noEmit --skipLibCheck` — zero TypeScript errors in any of the 6 generator files (only pre-existing unrelated errors in `examples/` and `skills/` remain).
