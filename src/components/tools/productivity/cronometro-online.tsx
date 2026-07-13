"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Flag, Pause, Play, RotateCcw } from "lucide-react"

type Lap = {
  index: number
  lapTime: number // ms duration of this lap
  totalTime: number // ms cumulative
}

function formatTime(ms: number): string {
  if (ms < 0) ms = 0
  const totalCs = Math.floor(ms / 10)
  const cs = totalCs % 100
  const totalSec = Math.floor(totalCs / 100)
  const sec = totalSec % 60
  const totalMin = Math.floor(totalSec / 60)
  const min = totalMin % 60
  const hours = Math.floor(totalMin / 60)
  const pad = (n: number, len = 2) => n.toString().padStart(len, "0")
  if (hours > 0) {
    return `${pad(hours)}:${pad(min)}:${pad(sec)}.${pad(cs)}`
  }
  return `${pad(min)}:${pad(sec)}.${pad(cs)}`
}

export default function CronometroOnline() {
  const [elapsed, setElapsed] = useState(0) // ms
  const [running, setRunning] = useState(false)
  const [laps, setLaps] = useState<Lap[]>([])

  const startTimeRef = useRef<number | null>(null) // timestamp where current run started
  const baseRef = useRef(0) // elapsed ms accumulated before current run
  const intervalRef = useRef<number | null>(null)

  const clearTimer = useCallback(() => {
    if (intervalRef.current != null) {
      window.clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const start = useCallback(() => {
    if (running) return
    startTimeRef.current = performance.now()
    setRunning(true)
    intervalRef.current = window.setInterval(() => {
      if (startTimeRef.current == null) return
      setElapsed(baseRef.current + (performance.now() - startTimeRef.current))
    }, 31)
  }, [running])

  const pause = useCallback(() => {
    if (!running) return
    clearTimer()
    baseRef.current = elapsed
    startTimeRef.current = null
    setRunning(false)
  }, [running, elapsed, clearTimer])

  const reset = useCallback(() => {
    clearTimer()
    baseRef.current = 0
    startTimeRef.current = null
    setElapsed(0)
    setLaps([])
    setRunning(false)
  }, [clearTimer])

  const recordLap = useCallback(() => {
    setLaps((prev) => {
      const prevTotal = prev.length > 0 ? prev[0].totalTime : 0
      const lapTime = elapsed - prevTotal
      const next: Lap = {
        index: prev.length + 1,
        lapTime: lapTime < 0 ? 0 : lapTime,
        totalTime: elapsed,
      }
      return [next, ...prev]
    })
  }, [elapsed])

  useEffect(() => {
    return clearTimer
  }, [clearTimer])

  const display = formatTime(elapsed)
  const showHours = elapsed >= 60 * 60 * 1000

  return (
    <div className="flex flex-col items-center gap-6">
      <Card className="w-full border-border/60 bg-gradient-to-b from-background to-muted/20">
        <CardContent className="flex flex-col items-center gap-6 p-6 sm:p-10">
          <div
            className={cn(
              "font-mono font-semibold tabular-nums tracking-tight text-foreground",
              "text-5xl sm:text-6xl md:text-7xl",
              showHours && "text-4xl sm:text-5xl md:text-6xl"
            )}
            aria-live="polite"
            aria-atomic="true"
            aria-label={`Tempo decorrido: ${display}`}
          >
            {display}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              type="button"
              size="lg"
              onClick={running ? pause : start}
              className="min-w-[140px] bg-brand text-brand-foreground hover:bg-brand/90"
            >
              {running ? (
                <>
                  <Pause className="mr-2 h-4 w-4" />
                  Pausar
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  {elapsed > 0 ? "Continuar" : "Iniciar"}
                </>
              )}
            </Button>

            <Button
              type="button"
              size="lg"
              variant="outline"
              onClick={recordLap}
              disabled={elapsed === 0}
              aria-label="Registrar volta"
            >
              <Flag className="mr-2 h-4 w-4" />
              Volta
            </Button>

            <Button
              type="button"
              size="lg"
              variant="outline"
              onClick={reset}
              aria-label="Zerar cronômetro"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Zerar
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="w-full">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">
            Voltas registradas
          </h3>
          <span className="text-xs text-muted-foreground">
            {laps.length} {laps.length === 1 ? "volta" : "voltas"}
          </span>
        </div>

        {laps.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-muted/20 p-6 text-center text-sm text-muted-foreground">
            Nenhuma volta registrada ainda. Inicie o cronômetro e pressione
            "Volta" para registrar tempos parciais.
          </div>
        ) : (
          <div className="max-h-64 overflow-y-auto scrollbar-thin rounded-lg border border-border bg-background">
            <table className="w-full text-sm">
              <thead className="sticky top-0 z-10 bg-muted/40 backdrop-blur">
                <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-4 py-2 font-medium">#</th>
                  <th className="px-4 py-2 font-medium">Volta</th>
                  <th className="px-4 py-2 font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {laps.map((lap, i) => (
                  <tr
                    key={lap.index}
                    className={cn(
                      "font-mono tabular-nums",
                      i % 2 === 0 ? "bg-background" : "bg-muted/10"
                    )}
                  >
                    <td className="px-4 py-2 text-muted-foreground">
                      {lap.index}
                    </td>
                    <td className="px-4 py-2">{formatTime(lap.lapTime)}</td>
                    <td className="px-4 py-2 text-muted-foreground">
                      {formatTime(lap.totalTime)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Separator className="my-2" />
      <p className="text-center text-xs text-muted-foreground">
        O cronômetro continua preciso mesmo se a aba ficar em segundo plano,
        usando timestamps de referência.
      </p>
    </div>
  )
}
