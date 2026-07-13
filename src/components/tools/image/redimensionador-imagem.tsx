"use client"

import * as React from "react"
import {
  Upload,
  Download,
  RefreshCw,
  Image as ImageIcon,
  AlertCircle,
  Lock,
  Unlock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

const MAX_DIMENSION = 8000

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B"
  const kb = bytes / 1024
  if (kb < 1024) return `${kb.toFixed(1)} KB`
  return `${(kb / 1024).toFixed(2)} MB`
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error("Não foi possível carregar a imagem."))
    }
    img.src = url
  })
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality?: number
): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), type, quality)
  })
}

type Mode = "px" | "percent"

interface OriginalState {
  file: File
  url: string
  size: number
  width: number
  height: number
  mime: string
}

interface ResultState {
  blob: Blob
  url: string
  size: number
  width: number
  height: number
}

function getOutputMime(originalMime: string): string {
  // Keep original mime; default to png for transparency, fall back to jpeg.
  if (originalMime === "image/png") return "image/png"
  if (originalMime === "image/webp") return "image/webp"
  if (originalMime === "image/jpeg" || originalMime === "image/jpg") return "image/jpeg"
  return "image/png"
}

export default function RedimensionadorImagem() {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [original, setOriginal] = React.useState<OriginalState | null>(null)
  const [result, setResult] = React.useState<ResultState | null>(null)
  const [mode, setMode] = React.useState<Mode>("px")
  const [keepAspect, setKeepAspect] = React.useState(true)
  const [width, setWidth] = React.useState<number>(0)
  const [height, setHeight] = React.useState<number>(0)
  const [percent, setPercent] = React.useState<number>(100)
  const [processing, setProcessing] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [dragOver, setDragOver] = React.useState(false)

  // Track which field is being edited to keep aspect ratio correct.
  const aspectLock = React.useRef<number | null>(null)

  const reset = React.useCallback(() => {
    setOriginal((prev) => {
      if (prev) URL.revokeObjectURL(prev.url)
      return null
    })
    setResult((prev) => {
      if (prev) URL.revokeObjectURL(prev.url)
      return null
    })
    setError(null)
    setWidth(0)
    setHeight(0)
    setPercent(100)
    aspectLock.current = null
    if (inputRef.current) inputRef.current.value = ""
  }, [])

  const handleFile = React.useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Por favor, selecione um arquivo de imagem válido.")
      return
    }
    setError(null)
    setResult((prev) => {
      if (prev) URL.revokeObjectURL(prev.url)
      return null
    })
    setOriginal((prev) => {
      if (prev) URL.revokeObjectURL(prev.url)
      return null
    })

    try {
      const img = await loadImage(file)
      const w = img.naturalWidth
      const h = img.naturalHeight
      URL.revokeObjectURL(img.src)

      const url = URL.createObjectURL(file)
      setOriginal({
        file,
        url,
        size: file.size,
        width: w,
        height: h,
        mime: file.type || "image/png",
      })
      setWidth(w)
      setHeight(h)
      setPercent(100)
      aspectLock.current = w / h
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar a imagem.")
    }
  }, [])

  React.useEffect(() => {
    return () => {
      if (original) URL.revokeObjectURL(original.url)
      if (result) URL.revokeObjectURL(result.url)
    }
     
  }, [])

  const onWidthChange = (raw: number) => {
    const clamped = Math.max(1, Math.min(MAX_DIMENSION, Math.round(raw) || 0))
    setWidth(clamped)
    if (keepAspect && aspectLock.current && clamped > 0) {
      setHeight(Math.max(1, Math.round(clamped / aspectLock.current)))
    }
  }

  const onHeightChange = (raw: number) => {
    const clamped = Math.max(1, Math.min(MAX_DIMENSION, Math.round(raw) || 0))
    setHeight(clamped)
    if (keepAspect && aspectLock.current && clamped > 0) {
      setWidth(Math.max(1, Math.round(clamped * aspectLock.current)))
    }
  }

  const onPercentChange = (raw: number) => {
    const clamped = Math.max(1, Math.min(500, Math.round(raw) || 0))
    setPercent(clamped)
    if (original && aspectLock.current) {
      const newW = Math.max(1, Math.round((original.width * clamped) / 100))
      const newH = Math.max(1, Math.round((original.height * clamped) / 100))
      setWidth(newW)
      setHeight(newH)
    }
  }

  const toggleKeepAspect = (checked: boolean) => {
    setKeepAspect(checked)
    if (checked && original) {
      aspectLock.current = original.width / original.height
    }
  }

  const switchMode = (next: Mode) => {
    setMode(next)
    if (next === "percent" && original) {
      // Recompute width/height from percent of original.
      setWidth(Math.max(1, Math.round((original.width * percent) / 100)))
      setHeight(Math.max(1, Math.round((original.height * percent) / 100)))
    }
  }

  const targetWidth = mode === "percent" && original
    ? Math.max(1, Math.round((original.width * percent) / 100))
    : width
  const targetHeight = mode === "percent" && original
    ? Math.max(1, Math.round((original.height * percent) / 100))
    : height

  const tooLarge = targetWidth > MAX_DIMENSION || targetHeight > MAX_DIMENSION

  const process = async () => {
    if (!original) return
    if (tooLarge) {
      setError(`As dimensões não podem ultrapassar ${MAX_DIMENSION}px em cada lado.`)
      return
    }
    if (targetWidth < 1 || targetHeight < 1) {
      setError("Defina dimensões válidas (mínimo de 1px).")
      return
    }

    setProcessing(true)
    setError(null)
    setResult((prev) => {
      if (prev) URL.revokeObjectURL(prev.url)
      return null
    })

    try {
      const img = await loadImage(original.file)
      const canvas = document.createElement("canvas")
      canvas.width = targetWidth
      canvas.height = targetHeight
      const ctx = canvas.getContext("2d")
      URL.revokeObjectURL(img.src)
      if (!ctx) {
        setError("Não foi possível processar a imagem neste navegador.")
        setProcessing(false)
        return
      }
      // Use high-quality smoothing for downscale.
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = "high"
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight)

      const outMime = getOutputMime(original.mime)
      // PNG/WebP ignore quality; jpeg uses 0.92.
      const blob = await canvasToBlob(
        canvas,
        outMime,
        outMime === "image/jpeg" ? 0.92 : undefined
      )
      setProcessing(false)
      if (!blob) {
        setError("Falha ao redimensionar a imagem. Tente outro arquivo.")
        return
      }
      setResult({
        blob,
        url: URL.createObjectURL(blob),
        size: blob.size,
        width: targetWidth,
        height: targetHeight,
      })
    } catch (err) {
      setProcessing(false)
      setError(err instanceof Error ? err.message : "Erro ao redimensionar a imagem.")
    }
  }

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  const ext =
    original && original.mime === "image/webp"
      ? "webp"
      : original && (original.mime === "image/jpeg" || original.mime === "image/jpg")
        ? "jpg"
        : "png"
  const downloadName = original
    ? original.file.name.replace(/\.[^.]+$/, "") + `-${targetWidth}x${targetHeight}.${ext}`
    : `imagem-${targetWidth}x${targetHeight}.${ext}`

  return (
    <div className="space-y-6">
      {/* Upload zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={cn(
          "rounded-xl border-2 border-dashed p-6 text-center transition-colors",
          dragOver
            ? "border-brand bg-brand-muted/40"
            : "border-border bg-muted/20 hover:border-brand/60"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          id="redimensionador-file-input"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFile(file)
          }}
        />
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-muted text-brand">
            <Upload className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium">
              Arraste uma imagem aqui ou clique para selecionar
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              JPG, PNG ou WEBP. Processamento 100% no seu navegador.
            </p>
          </div>
          <Button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="bg-brand text-brand-foreground hover:bg-brand/90"
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            Selecionar imagem
          </Button>
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {original && (
        <div className="space-y-4">
          {/* Original info */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-semibold">Imagem original</h3>
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span>
                  Dimensões:{" "}
                  <span className="font-medium text-foreground">
                    {original.width} × {original.height}px
                  </span>
                </span>
                <span>
                  Tamanho:{" "}
                  <span className="font-medium text-foreground">
                    {formatBytes(original.size)}
                  </span>
                </span>
              </div>
            </div>
            <div className="mt-3 flex h-40 items-center justify-center overflow-hidden rounded-lg bg-muted/40">
              { }
              <img
                src={original.url}
                alt="Imagem original"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>

          {/* Resize controls */}
          <div className="rounded-xl border border-border bg-card p-4">
            {/* Mode switch */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <div className="inline-flex rounded-lg border border-border bg-muted/30 p-1">
                <button
                  type="button"
                  onClick={() => switchMode("px")}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                    mode === "px"
                      ? "bg-brand text-brand-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Pixels
                </button>
                <button
                  type="button"
                  onClick={() => switchMode("percent")}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                    mode === "percent"
                      ? "bg-brand text-brand-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Porcentagem
                </button>
              </div>

              <label
                htmlFor="keep-aspect-switch"
                className="ml-auto flex cursor-pointer items-center gap-2 text-xs font-medium"
              >
                {keepAspect ? (
                  <Lock className="h-3.5 w-3.5 text-brand" />
                ) : (
                  <Unlock className="h-3.5 w-3.5 text-muted-foreground" />
                )}
                Manter proporção
                <Switch
                  id="keep-aspect-switch"
                  checked={keepAspect}
                  onCheckedChange={toggleKeepAspect}
                  aria-label="Manter proporção"
                />
              </label>
            </div>

            {mode === "px" ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="resize-width" className="text-xs">
                    Largura (px)
                  </Label>
                  <Input
                    id="resize-width"
                    type="number"
                    min={1}
                    max={MAX_DIMENSION}
                    value={width === 0 ? "" : width}
                    onChange={(e) => onWidthChange(Number(e.target.value))}
                    placeholder="Ex.: 800"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resize-height" className="text-xs">
                    Altura (px)
                  </Label>
                  <Input
                    id="resize-height"
                    type="number"
                    min={1}
                    max={MAX_DIMENSION}
                    value={height === 0 ? "" : height}
                    onChange={(e) => onHeightChange(Number(e.target.value))}
                    placeholder="Ex.: 600"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="resize-percent" className="text-xs">
                  Escala ({percent}%)
                </Label>
                <Input
                  id="resize-percent"
                  type="number"
                  min={1}
                  max={500}
                  value={percent === 0 ? "" : percent}
                  onChange={(e) => onPercentChange(Number(e.target.value))}
                  placeholder="Ex.: 50"
                />
                <div className="flex flex-wrap gap-2 pt-1">
                  {[25, 50, 75, 100, 150, 200].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => onPercentChange(p)}
                      className={cn(
                        "rounded-md border px-2.5 py-1 text-xs font-medium transition-colors",
                        percent === p
                          ? "border-brand bg-brand-muted text-brand"
                          : "border-border bg-background text-muted-foreground hover:bg-muted/40"
                      )}
                    >
                      {p}%
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Target preview */}
            <div className="mt-4 rounded-lg bg-muted/30 p-3 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-muted-foreground">Dimensões finais:</span>
                <span className="font-semibold text-foreground">
                  {targetWidth} × {targetHeight}px
                </span>
              </div>
              {tooLarge && (
                <p className="mt-1 text-amber-600 dark:text-amber-400">
                  Limite máximo de {MAX_DIMENSION}px por lado.
                </p>
              )}
            </div>

            <Button
              type="button"
              onClick={process}
              disabled={processing || tooLarge || targetWidth < 1 || targetHeight < 1}
              className="mt-4 w-full bg-brand text-brand-foreground hover:bg-brand/90"
            >
              {processing ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Redimensionando...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Redimensionar imagem
                </>
              )}
            </Button>
          </div>

          {/* Result */}
          {result && (
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-semibold">Imagem redimensionada</h3>
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span>
                    Dimensões:{" "}
                    <span className="font-medium text-foreground">
                      {result.width} × {result.height}px
                    </span>
                  </span>
                  <span>
                    Tamanho:{" "}
                    <span className="font-medium text-foreground">
                      {formatBytes(result.size)}
                    </span>
                  </span>
                </div>
              </div>
              <div className="flex h-48 items-center justify-center overflow-hidden rounded-lg bg-muted/40">
                { }
                <img
                  src={result.url}
                  alt="Imagem redimensionada"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Button
                  type="button"
                  onClick={() => {
                    const a = document.createElement("a")
                    a.href = result.url
                    a.download = downloadName
                    document.body.appendChild(a)
                    a.click()
                    document.body.removeChild(a)
                  }}
                  className="bg-brand text-brand-foreground hover:bg-brand/90"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Baixar imagem
                </Button>
                <Button type="button" variant="outline" onClick={reset}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Nova imagem
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
