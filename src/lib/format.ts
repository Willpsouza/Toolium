/**
 * Formatação de números e moeda para pt-BR.
 */

export function formatBRL(value: number, fractionDigits = 2): string {
  if (!Number.isFinite(value)) return "R$ 0,00"
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value)
}

export function formatNumber(
  value: number,
  options?: { minimumFractionDigits?: number; maximumFractionDigits?: number }
): string {
  if (!Number.isFinite(value)) return "0"
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: options?.minimumFractionDigits ?? 2,
    maximumFractionDigits: options?.maximumFractionDigits ?? 2,
  }).format(value)
}

/** Parse a pt-BR number string ("1.234,56" or "1234.56" or "1234,56") into a number. */
export function parseNumber(input: string): number {
  if (!input) return NaN
  const cleaned = input
    .trim()
    .replace(/\s/g, "")
    .replace(/R\$/gi, "")
  // Se houver vírgula, assume formato pt-BR
  if (cleaned.includes(",")) {
    const normalized = cleaned.replace(/\./g, "").replace(",", ".")
    return parseFloat(normalized)
  }
  return parseFloat(cleaned)
}

export function formatPercent(value: number, fractionDigits = 2): string {
  if (!Number.isFinite(value)) return "0%"
  return `${formatNumber(value, {
    minimumFractionDigits: 0,
    maximumFractionDigits: fractionDigits,
  })}%`
}
