"use client"

import * as React from "react"
import { Upload, Download, RefreshCw, Image as ImageIcon, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

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
    img.onload = () => {
      resolve(img)
    }
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
    canvas.toBlob(
      (blob) => resolve(blob),
      type,
      quality
    )
  })
}

interface OriginalState {
  file: File
  url: string
  size: number
}

interface CompressedState {
  blob: Blob
  url: string
  size: number
}

export default function CompressorImagem() {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [original, setOriginal] = React.useState<OriginalState | null>(null)
  const [compressed, setCompressed] = React.useState<CompressedState | null>(null)
  const [quality, setQuality] = React.useState(75)
  const [processing, setProcessing] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [dragOver, setDragOver] = React.useState(false)

  const reset = React.useCallback(() => {
    setOriginal((prev) => {
      if (prev) URL.revokeObjectURL(prev.url)
      return null
    })
    setCompressed((prev) => {
      if (prev) URL.revokeObjectURL(prev.url)
      return null
    })
    setError(null)
    setQuality(75)
    if (inputRef.current) inputRef.current.value = ""
  }, [])

  const handleFile = React.useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Por favor, selecione um arquivo de imagem válido.")
      return
    }
    setError(null)
    setCompressed((prev) => {
      if (prev) URL.revokeObjectURL(prev.url)
      return null
    })
    setOriginal((prev) => {
      if (prev) URL.revokeObjectURL(prev.url)
      return null
    })

    const url = URL.createObjectURL(file)
    setOriginal({ file, url, size: file.size })
  }, [])

  // Compress whenever the original file or quality changes.
  React.useEffect(() => {
    if (!original) return
    let cancelled = false

    const run = async () => {
      try {
        const img = await loadImage(original.file)
        if (cancelled) {
          URL.revokeObjectURL(img.src)
          return
        }
        const canvas = document.createElement("canvas")
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        const ctx = canvas.getContext("2d")
        URL.revokeObjectURL(img.src)
        if (!ctx) {
          if (!cancelled) {
            setError("Não foi possível processar a imagem neste navegador.")
          }
          return
        }
        // White background so transparent PNGs don't turn black when converted to JPEG.
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0)

        if (!cancelled) setProcessing(true)
        const blob = await canvasToBlob(canvas, "image/jpeg", quality / 100)
        if (cancelled) return
        setProcessing(false)

        if (!blob) {
          setError("Falha ao gerar a imagem comprimida. Tente outro arquivo.")
          return
        }

        setCompressed((prev) => {
          if (prev) URL.revokeObjectURL(prev.url)
          return { blob, url: URL.createObjectURL(blob), size: blob.size }
        })
      } catch (err) {
        if (!cancelled) {
          setProcessing(false)
          setError(err instanceof Error ? err.message : "Erro ao processar a imagem.")
        }
      }
    }
    run()

    return () => {
      cancelled = true
    }
  }, [original, quality])

  React.useEffect(() => {
    return () => {
      if (original) URL.revokeObjectURL(original.url)
      if (compressed) URL.revokeObjectURL(compressed.url)
    }
     
  }, [])

  const reduction =
    original && compressed && original.size > 0
      ? Math.round(((original.size - compressed.size) / original.size) * 100)
      : null

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  const downloadName = original
    ? original.file.name.replace(/\.[^.]+$/, "") + "-comprimido.jpg"
    : "imagem-comprimida.jpg"

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
          id="compressor-file-input"
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
          {/* Quality control */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-3 flex items-center justify-between">
              <Label htmlFor="quality-slider" className="text-sm font-medium">
                Qualidade da compressão
              </Label>
              <span className="rounded-md bg-brand-muted px-2 py-0.5 text-xs font-semibold text-brand">
                {quality}%
              </span>
            </div>
            <Slider
              id="quality-slider"
              min={10}
              max={100}
              step={1}
              value={[quality]}
              onValueChange={(v) => setQuality(v[0])}
              aria-label="Qualidade da compressão"
            />
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>Menor tamanho</span>
              <span>Melhor qualidade</span>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              A imagem é regravada em JPG para obter a maior compressão. PNGs com
              transparência terão fundo branco.
            </p>
          </div>

          {/* Comparison */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Original */}
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold">Original</h3>
                <span className="text-xs text-muted-foreground">
                  {formatBytes(original.size)}
                </span>
              </div>
              <div className="flex h-40 items-center justify-center overflow-hidden rounded-lg bg-muted/40">
                { }
                <img
                  src={original.url}
                  alt="Imagem original"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>

            {/* Compressed */}
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold">Comprimida (JPG)</h3>
                <div className="flex items-center gap-2">
                  {reduction !== null && (
                    <span
                      className={cn(
                        "rounded-md px-2 py-0.5 text-xs font-semibold",
                        reduction > 0
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                      )}
                    >
                      {reduction > 0 ? `-${reduction}%` : `+${Math.abs(reduction)}%`}
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {compressed ? formatBytes(compressed.size) : "..."}
                  </span>
                </div>
              </div>
              <div className="flex h-40 items-center justify-center overflow-hidden rounded-lg bg-muted/40">
                {compressed ? (
                   
                  <img
                    src={compressed.url}
                    alt="Imagem comprimida"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    Processando...
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="button"
              onClick={() => {
                if (!compressed) return
                const a = document.createElement("a")
                a.href = compressed.url
                a.download = downloadName
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
              }}
              disabled={!compressed || processing}
              className="bg-brand text-brand-foreground hover:bg-brand/90"
            >
              <Download className="mr-2 h-4 w-4" />
              Baixar imagem comprimida
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Nova imagem
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
