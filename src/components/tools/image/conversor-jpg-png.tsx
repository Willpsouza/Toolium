"use client"

import * as React from "react"
import { Upload, Download, RefreshCw, Image as ImageIcon, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
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

interface OriginalState {
  file: File
  url: string
  size: number
}

interface ConvertedState {
  blob: Blob
  url: string
  size: number
}

export default function ConversorJpgPng() {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [original, setOriginal] = React.useState<OriginalState | null>(null)
  const [converted, setConverted] = React.useState<ConvertedState | null>(null)
  const [processing, setProcessing] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [dragOver, setDragOver] = React.useState(false)

  const reset = React.useCallback(() => {
    setOriginal((prev) => {
      if (prev) URL.revokeObjectURL(prev.url)
      return null
    })
    setConverted((prev) => {
      if (prev) URL.revokeObjectURL(prev.url)
      return null
    })
    setError(null)
    if (inputRef.current) inputRef.current.value = ""
  }, [])

  const convert = React.useCallback(async (file: File) => {
    setProcessing(true)
    setError(null)
    setConverted((prev) => {
      if (prev) URL.revokeObjectURL(prev.url)
      return null
    })
    try {
      const img = await loadImage(file)
      const canvas = document.createElement("canvas")
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext("2d")
      URL.revokeObjectURL(img.src)
      if (!ctx) {
        setError("Não foi possível processar a imagem neste navegador.")
        setProcessing(false)
        return
      }
      ctx.drawImage(img, 0, 0)

      const blob = await canvasToBlob(canvas, "image/png")
      setProcessing(false)
      if (!blob) {
        setError("Falha ao converter a imagem. Tente outro arquivo.")
        return
      }
      setConverted({ blob, url: URL.createObjectURL(blob), size: blob.size })
    } catch (err) {
      setProcessing(false)
      setError(err instanceof Error ? err.message : "Erro ao converter a imagem.")
    }
  }, [])

  const handleFile = React.useCallback(
    (file: File) => {
      const isJpg =
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        /\.(jpe?g)$/i.test(file.name)
      if (!isJpg) {
        setError("Selecione um arquivo JPG ou JPEG.")
        setOriginal((prev) => {
          if (prev) URL.revokeObjectURL(prev.url)
          return null
        })
        setConverted((prev) => {
          if (prev) URL.revokeObjectURL(prev.url)
          return null
        })
        return
      }
      setError(null)
      setConverted((prev) => {
        if (prev) URL.revokeObjectURL(prev.url)
        return null
      })
      setOriginal((prev) => {
        if (prev) URL.revokeObjectURL(prev.url)
        return null
      })
      const url = URL.createObjectURL(file)
      setOriginal({ file, url, size: file.size })
      void convert(file)
    },
    [convert]
  )

  React.useEffect(() => {
    return () => {
      if (original) URL.revokeObjectURL(original.url)
      if (converted) URL.revokeObjectURL(converted.url)
    }
     
  }, [])

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  const downloadName = original
    ? original.file.name.replace(/\.[^.]+$/, "") + ".png"
    : "imagem.png"

  const sizeDiff =
    original && converted && original.size > 0
      ? Math.round(((converted.size - original.size) / original.size) * 100)
      : null

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
          accept="image/jpeg,image/jpg"
          className="sr-only"
          id="jpg-png-file-input"
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
              Arraste um arquivo JPG aqui ou clique para selecionar
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Apenas JPEG. A conversão ocorre automaticamente no seu navegador.
            </p>
          </div>
          <Button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="bg-brand text-brand-foreground hover:bg-brand/90"
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            Selecionar JPG
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
          {/* Comparison */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Original */}
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold">Original (JPG)</h3>
                <span className="text-xs text-muted-foreground">
                  {formatBytes(original.size)}
                </span>
              </div>
              <div className="flex h-40 items-center justify-center overflow-hidden rounded-lg bg-muted/40">
                { }
                <img
                  src={original.url}
                  alt="Imagem JPG original"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>

            {/* Converted */}
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold">Convertida (PNG)</h3>
                <div className="flex items-center gap-2">
                  {sizeDiff !== null && (
                    <span
                      className={cn(
                        "rounded-md px-2 py-0.5 text-xs font-semibold",
                        sizeDiff <= 0
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                      )}
                    >
                      {sizeDiff <= 0 ? `-${Math.abs(sizeDiff)}%` : `+${sizeDiff}%`}
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {converted ? formatBytes(converted.size) : "..."}
                  </span>
                </div>
              </div>
              <div className="flex h-40 items-center justify-center overflow-hidden rounded-lg bg-muted/40">
                {converted ? (
                   
                  <img
                    src={converted.url}
                    alt="Imagem PNG convertida"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    Convertendo...
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
                if (!converted) return
                const a = document.createElement("a")
                a.href = converted.url
                a.download = downloadName
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
              }}
              disabled={!converted || processing}
              className="bg-brand text-brand-foreground hover:bg-brand/90"
            >
              <Download className="mr-2 h-4 w-4" />
              Baixar PNG
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Nova imagem
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            PNG é um formato sem perdas (lossless) e suporta transparência. Por
            isso, o arquivo convertido pode ficar maior que o JPG original.
          </p>
        </div>
      )}
    </div>
  )
}
