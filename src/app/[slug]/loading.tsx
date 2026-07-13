/**
 * Loading UI para a rota dinâmica [slug] (páginas de ferramenta).
 * Mostra um skeleton imediatamente durante a navegação, melhorando a
 * perceived performance. Convenção nativa do Next.js App Router.
 */
export default function ToolLoading() {
  return (
    <div className="container-page py-8 sm:py-12">
      {/* Breadcrumb skeleton */}
      <div className="mb-6 flex items-center gap-2 text-xs">
        <div className="h-3 w-12 rounded bg-muted animate-pulse" />
        <div className="h-3 w-3 rounded bg-muted animate-pulse" />
        <div className="h-3 w-16 rounded bg-muted animate-pulse" />
        <div className="h-3 w-3 rounded bg-muted animate-pulse" />
        <div className="h-3 w-20 rounded bg-muted animate-pulse" />
      </div>

      {/* Header skeleton */}
      <div className="max-w-3xl">
        <div className="h-9 w-2/3 rounded bg-muted animate-pulse" />
        <div className="mt-3 h-5 w-full rounded bg-muted animate-pulse" />
        <div className="mt-1.5 h-5 w-4/5 rounded bg-muted animate-pulse" />
      </div>

      {/* Tool card skeleton */}
      <div className="mt-10 rounded-2xl border border-border/70 bg-card p-5 sm:p-8 shadow-sm">
        <div className="flex flex-col gap-4">
          <div className="h-4 w-1/3 rounded bg-muted animate-pulse" />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="h-10 rounded-md bg-muted animate-pulse" />
            <div className="h-10 rounded-md bg-muted animate-pulse" />
          </div>
          <div className="h-24 rounded-xl bg-muted animate-pulse" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="mt-10 max-w-3xl space-y-4">
        <div className="h-6 w-1/4 rounded bg-muted animate-pulse" />
        <div className="h-4 w-full rounded bg-muted animate-pulse" />
        <div className="h-4 w-5/6 rounded bg-muted animate-pulse" />
      </div>
    </div>
  )
}
