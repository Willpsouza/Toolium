"use client"

import * as React from "react"
import Link from "next/link"
import { useState } from "react"
import { Menu, ChevronDown, Wrench, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { categories } from "@/data/categories"
import { tools } from "@/data/tools"
import { iconMap } from "@/lib/icons"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center" aria-label="Toolium - página inicial">
            <Logo />
          </Link>
          <nav className="hidden md:flex items-center gap-1" aria-label="Navegação principal">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1 font-medium">
                  Ferramentas
                  <ChevronDown className="size-3.5 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                <DropdownMenuLabel>Categorias</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {categories.map((c) => {
                  const Icon = iconMap[c.icon] ?? Wrench
                  return (
                    <DropdownMenuItem key={c.slug} asChild>
                      <Link href={`/ferramentas/${c.slug}`} className="gap-2.5 py-2">
                        <Icon className="size-4 text-brand" />
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{c.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {tools.filter((t) => t.category === c.slug).length} ferramentas
                          </span>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  )
                })}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/ferramentas" className="gap-2 py-2 font-medium">
                    <Wrench className="size-4" />
                    Ver todas as ferramentas
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="sm" asChild className="font-medium">
              <Link href="/ferramentas">Todas</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="font-medium">
              <Link href="/sobre">Sobre</Link>
            </Button>
          </nav>
        </div>

        <div className="flex items-center gap-1.5">
          <Button variant="ghost" size="icon" asChild className="hidden sm:inline-flex" aria-label="Buscar ferramentas">
            <Link href="/ferramentas">
              <Search className="size-[1.15rem]" />
            </Link>
          </Button>
          <ThemeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex bg-brand text-brand-foreground hover:bg-brand/90">
            <Link href="/ferramentas">Explorar</Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[360px]">
              <SheetHeader className="mb-4">
                <SheetTitle className="text-left">
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1">
                <MobileNavLink href="/ferramentas" onClick={() => setOpen(false)}>
                  Todas as ferramentas
                </MobileNavLink>
                <div className="px-3 pt-4 pb-1 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Categorias
                </div>
                {categories.map((c) => (
                  <MobileNavLink key={c.slug} href={`/ferramentas/${c.slug}`} onClick={() => setOpen(false)}>
                    {c.name}
                  </MobileNavLink>
                ))}
                <div className="px-3 pt-4 pb-1 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Institucional
                </div>
                <MobileNavLink href="/sobre" onClick={() => setOpen(false)}>
                  Sobre
                </MobileNavLink>
                <MobileNavLink href="/privacidade" onClick={() => setOpen(false)}>
                  Privacidade
                </MobileNavLink>
                <MobileNavLink href="/termos" onClick={() => setOpen(false)}>
                  Termos
                </MobileNavLink>
                <MobileNavLink href="/cookies" onClick={() => setOpen(false)}>
                  Cookies
                </MobileNavLink>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string
  children: React.ReactNode
  onClick?: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium",
        "hover:bg-accent transition-colors"
      )}
    >
      {children}
      <ChevronDown className="size-4 -rotate-90 text-muted-foreground" />
    </Link>
  )
}

export { X }
