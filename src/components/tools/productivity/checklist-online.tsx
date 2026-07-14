"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { ListChecks, Plus, Trash2 } from "lucide-react"

type Item = { id: string; text: string; done: boolean }

const STORAGE_KEY = "toolium:checklist"

function loadItems(): Item[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter(
        (x) =>
          x &&
          typeof x.id === "string" &&
          typeof x.text === "string" &&
          typeof x.done === "boolean"
      )
      .map((x) => ({ id: x.id, text: x.text, done: x.done }))
  } catch {
    return []
  }
}

function uid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

export default function ChecklistOnline() {
  const [items, setItems] = useState<Item[]>([])
  const [draft, setDraft] = useState("")
  const [hydrated, setHydrated] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  // Load on mount (client-only: localStorage is not available during SSR)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration-safe load of client-only persisted data
    setItems(loadItems())
    setHydrated(true)
  }, [])

  // Persist on change
  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // ignore storage errors
    }
  }, [items, hydrated])

  const addItem = () => {
    const text = draft.trim()
    if (!text) return
    const next: Item = { id: uid(), text, done: false }
    setItems((prev) => [next, ...prev])
    setDraft("")
    inputRef.current?.focus()
  }

  const toggle = (id: string) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, done: !it.done } : it))
    )
  }

  const remove = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id))
  }

  const clearCompleted = () => {
    setItems((prev) => prev.filter((it) => !it.done))
  }

  const total = items.length
  const done = items.filter((i) => i.done).length
  const pending = total - done
  const progress = total === 0 ? 0 : Math.round((done / total) * 100)

  return (
    <div className="flex flex-col gap-5">
      <Card className="border-border/60 bg-muted/10">
        <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-3 sm:p-5">
          <Input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addItem()
              }
            }}
            placeholder="Adicionar um item à lista..."
            className="flex-1 text-base"
            aria-label="Novo item"
            maxLength={240}
          />
          <Button
            type="button"
            onClick={addItem}
            disabled={draft.trim().length === 0}
            className="bg-brand text-brand-foreground hover:bg-brand/90 sm:w-auto"
          >
            <Plus className="mr-1.5 h-4 w-4" />
            Adicionar
          </Button>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ListChecks className="h-4 w-4" />
          <span className="tabular-nums">
            {done} de {total} concluídas
            {pending > 0 && <span className="ml-1">· {pending} restantes</span>}
          </span>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={clearCompleted}
          disabled={done === 0}
          className="self-start text-muted-foreground hover:text-foreground sm:self-auto"
        >
          <Trash2 className="mr-1.5 h-4 w-4" />
          Limpar concluídas
        </Button>
      </div>

      {total > 0 && (
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-brand transition-all"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      )}

      {total === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-muted/20 p-8 text-center text-sm text-muted-foreground">
          Sua lista está vazia. Adicione itens acima para começar a organizar
          suas tarefas — tudo é salvo automaticamente neste navegador.
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {items.map((item) => (
            <li
              key={item.id}
              className={cn(
                "group flex items-center gap-3 rounded-lg border border-border/60 bg-background p-3 transition-colors hover:bg-muted/20",
                item.done && "bg-muted/10"
              )}
            >
              <Checkbox
                id={`item-${item.id}`}
                checked={item.done}
                onCheckedChange={() => toggle(item.id)}
                aria-label={`Marcar "${item.text}" como ${item.done ? "pendente" : "concluída"}`}
              />
              <label
                htmlFor={`item-${item.id}`}
                className={cn(
                  "flex-1 cursor-pointer select-none text-sm leading-snug",
                  item.done
                    ? "text-muted-foreground line-through"
                    : "text-foreground"
                )}
              >
                {item.text}
              </label>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground opacity-60 hover:text-destructive hover:opacity-100"
                onClick={() => remove(item.id)}
                aria-label={`Remover "${item.text}"`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
