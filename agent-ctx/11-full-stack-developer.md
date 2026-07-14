# Task 11 — full-stack-developer — Image tool components

## Scope
Built the 4 image tool components assigned to Task ID 11, overwriting the placeholder files in `src/components/tools/image/`. Each file starts with `"use client"` and has a default export, uses shadcn/ui + lucide-react + the project's brand accent, and processes images entirely client-side via the Canvas API.

## Files
- `src/components/tools/image/compressor-imagem.tsx` — JPEG compressor with quality slider (10-100, default 75), live recompression, side-by-side original/compressed previews, size + reduction %, download button. White background fill so transparent PNGs don't turn black when re-encoded to JPG.
- `src/components/tools/image/conversor-jpg-png.tsx` — JPG → PNG converter, auto-converts on file select, validates JPG input, side-by-side previews with size-diff badge, "Baixar PNG" button.
- `src/components/tools/image/conversor-png-webp.tsx` — PNG → WEBP converter (quality 0.9), pre-checks browser WEBP encode support, null-blob guard, side-by-side previews with reduction %, "Baixar WEBP" button.
- `src/components/tools/image/redimensionador-imagem.tsx` — Image resizer with Pixels/Percent modes, "Manter proporção" switch (default on, aspect-ratio-locked inputs), 8000px max guard, percent quick-picks, explicit "Redimensionar" button, preserves original mime (jpeg@0.92, png/webp lossless), high-quality smoothing.

## Key decisions
- All image processing is client-side (privacy feature). No server upload anywhere.
- Object URLs (`URL.createObjectURL`) are revoked on reset, on unmount, and before overwriting previous state to prevent memory leaks.
- `loadImage(file)` helper: creates an object URL, resolves an HTMLImageElement on load, revokes the URL on error and rejects with a pt-BR error message.
- `canvasToBlob(canvas, type, quality?)` helper: promisifies `canvas.toBlob`.
- Compressor uses a single `useEffect` keyed on `[original, quality]` (with a `cancelled` flag) to avoid the race between the initial compression and slider-driven recompressions; `handleFile` only sets `original` state.
- WEBP converter pre-checks support via `canvas.toDataURL("image/webp").startsWith("data:image/webp")` and renders an error message instead of attempting conversion on unsupported browsers.
- Resizer caps at `MAX_DIMENSION = 8000` (per task spec) with an inline warning and disables the action button when the target exceeds the cap.

## Verification
- `npx tsc --noEmit` reports **no errors** in any of the 4 image tool files. (Remaining errors are in unrelated `examples/` and `skills/` folders that already existed.)
- Did not run lint or the dev server (per task instructions), but components are valid TypeScript.

## Out of scope / not touched
- `src/components/tools/registry.tsx`, `src/data/*`, `src/components/tools/tool-page.tsx`, `src/app/**` — all unchanged.
- No other tool components (calculators / converters / generators / productivity) were modified.
