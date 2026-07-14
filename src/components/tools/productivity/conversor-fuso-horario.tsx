"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Clock, Globe2 } from "lucide-react"

type City = { name: string; tz: string }

const CITIES: City[] = [
  { name: "São Paulo", tz: "America/Sao_Paulo" },
  { name: "Nova York", tz: "America/New_York" },
  { name: "Londres", tz: "Europe/London" },
  { name: "Paris", tz: "Europe/Paris" },
  { name: "Berlim", tz: "Europe/Berlin" },
  { name: "Tóquio", tz: "Asia/Tokyo" },
  { name: "Sydney", tz: "Australia/Sydney" },
  { name: "Los Angeles", tz: "America/Los_Angeles" },
  { name: "Dubai", tz: "Asia/Dubai" },
  { name: "Cidade do México", tz: "America/Mexico_City" },
]

const TIMEZONES = Array.from(new Set(CITIES.map((c) => c.tz))).sort()

function pad(n: number): string {
  return n.toString().padStart(2, "0")
}

/** Returns the current local datetime in `YYYY-MM-DDTHH:mm` format for datetime-local input default. */
function nowLocalInputValue(): string {
  const d = new Date()
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

/**
 * Convert a datetime-local string (interpreted as wall-clock in `sourceTz`)
 * into a UTC Date instant.
 *
 * Approach:
 * 1. Build a "reference" Date as if the entered wall-clock were UTC.
 * 2. Format that reference instant in `sourceTz` using Intl to read the wall-clock
 *    the source tz actually shows for that instant.
 * 3. The difference between (2) and (1) is the source tz offset (in ms) at that moment.
 * 4. The real instant = reference - offset.
 *
 * This handles DST correctly because Intl resolves the offset for the exact instant.
 */
function instantFromWallClock(value: string, sourceTz: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/.exec(value)
  if (!m) return null
  const year = +m[1]
  const month = +m[2]
  const day = +m[3]
  const hour = +m[4]
  const minute = +m[5]
  const second = m[6] ? +m[6] : 0

  // Reference instant: the wall-clock as if it were UTC.
  const reference = new Date(Date.UTC(year, month - 1, day, hour, minute, second))

  // What does the source tz actually show at this reference instant?
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: sourceTz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(reference)

  const get = (type: string): string =>
    parts.find((p) => p.type === type)?.value ?? "0"
  const tYear = +get("year")
  const tMonth = +get("month")
  const tDay = +get("day")
  // hour "24" can appear with hour12:false in some engines for midnight; normalize.
  const tHourRaw = +get("hour")
  const tHour = tHourRaw === 24 ? 0 : tHourRaw
  const tMinute = +get("minute")
  const tSecond = +get("second")

  const referenceAsSeenByTz = Date.UTC(
    tYear,
    tMonth - 1,
    tDay,
    tHour,
    tMinute,
    tSecond
  )

  const offsetMs = referenceAsSeenByTz - reference.getTime()
  return new Date(reference.getTime() - offsetMs)
}

function formatInTz(instant: Date, tz: string) {
  const date = new Intl.DateTimeFormat("pt-BR", {
    timeZone: tz,
    weekday: "short",
    day: "2-digit",
    month: "long",
  }).format(instant)
  const time = new Intl.DateTimeFormat("pt-BR", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(instant)
  return { date, time }
}

function tzOffsetLabel(instant: Date, tz: string): string {
  // Compute UTC offset (e.g. "UTC-3" or "UTC+5:30") at the given instant for the tz.
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    timeZoneName: "shortOffset",
  }).formatToParts(instant)
  const tzName = parts.find((p) => p.type === "timeZoneName")?.value
  if (tzName && /GMT|UTC/i.test(tzName)) {
    return tzName.replace("GMT", "UTC")
  }
  return tzName ?? ""
}

export default function ConversorFusoHorario() {
  const [value, setValue] = useState<string>("")
  const [sourceTz, setSourceTz] = useState<string>("America/Sao_Paulo")

  // Set default to "now" on mount (client-only to avoid hydration mismatch).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration-safe default for client-only current time
    setValue(nowLocalInputValue())
  }, [])

  const instant = useMemo(() => {
    if (!value) return null
    return instantFromWallClock(value, sourceTz)
  }, [value, sourceTz])

  const sourceOffset = useMemo(() => {
    if (!instant) return ""
    return tzOffsetLabel(instant, sourceTz)
  }, [instant, sourceTz])

  return (
    <div className="flex flex-col gap-6">
      <Card className="border-border/60 bg-muted/10">
        <CardContent className="grid gap-4 p-4 sm:p-6 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="fuso-datetime" className="text-sm font-medium">
              Data e hora de origem
            </Label>
            <Input
              id="fuso-datetime"
              type="datetime-local"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="text-base"
            />
            <span className="text-xs text-muted-foreground">
              Informe o horário na cidade de origem abaixo.
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="fuso-source" className="text-sm font-medium">
              Fuso horário de origem
            </Label>
            <Select value={sourceTz} onValueChange={setSourceTz}>
              <SelectTrigger id="fuso-source" className="text-base">
                <SelectValue placeholder="Selecione o fuso" />
              </SelectTrigger>
              <SelectContent>
                {TIMEZONES.map((tz) => (
                  <SelectItem key={tz} value={tz}>
                    {tz.replace(/_/g, " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {sourceOffset && (
              <span className="text-xs text-muted-foreground">
                {sourceOffset}
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Globe2 className="h-4 w-4 shrink-0" />
        <span>
          Horários equivalentes nas principais cidades do mundo (respeita o
          horário de verão de cada região).
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CITIES.map((city) => {
          const isSource = city.tz === sourceTz
          const formatted = instant ? formatInTz(instant, city.tz) : null
          const offset = instant ? tzOffsetLabel(instant, city.tz) : ""
          return (
            <Card
              key={city.tz}
              className={
                isSource
                  ? "border-brand bg-brand-muted/30"
                  : "border-border/60 bg-background"
              }
            >
              <CardContent className="flex flex-col gap-1 p-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      {city.name}
                    </span>
                  </div>
                  {isSource && (
                    <span className="rounded-full bg-brand px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-brand-foreground">
                      Origem
                    </span>
                  )}
                </div>
                <span className="text-2xl font-semibold tabular-nums text-foreground">
                  {formatted ? formatted.time : "--:--"}
                </span>
                <span className="text-xs capitalize text-muted-foreground">
                  {formatted ? formatted.date : "—"}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {offset}
                </span>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={() => setValue(nowLocalInputValue())}
        className="self-start"
      >
        <Clock className="mr-2 h-4 w-4" />
        Usar horário atual
      </Button>
    </div>
  )
}
