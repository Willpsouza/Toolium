import { cn } from "@/lib/utils"

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("size-8", className)}
      role="img"
      aria-label="Toolium"
    >
      <rect width="64" height="64" rx="14" fill="currentColor" className="text-foreground" />
      <path
        d="M16 22C16 20.8954 16.8954 20 18 20H46C47.1046 20 48 20.8954 48 22V26C48 27.1046 47.1046 28 46 28H18C16.8954 28 16 27.1046 16 26V22Z"
        fill="oklch(0.985 0 0)"
      />
      <path
        d="M16 38C16 36.8954 16.8954 36 18 36H34C35.1046 36 36 36.8954 36 38V42C36 43.1046 35.1046 44 34 44H18C16.8954 44 16 43.1046 16 42V38Z"
        fill="oklch(0.985 0 0)"
        fillOpacity="0.8"
      />
      <circle cx="46" cy="40" r="6" fill="oklch(0.696 0.17 162.48)" />
      <path
        d="M43.5 40L45.5 42L48.5 38.5"
        stroke="#04140D"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Logo({ className, withText = true }: { className?: string; withText?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark className="size-7" />
      {withText && (
        <span className="text-lg font-semibold tracking-tight">
          Tool<span className="text-brand">ium</span>
        </span>
      )}
    </span>
  )
}
