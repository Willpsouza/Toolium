import * as React from "react"
import dynamic from "next/dynamic"

/**
 * Registry de componentes de ferramenta.
 *
 * Otimização (Etapa 08 — PERF-01): cada ferramenta é carregada via `next/dynamic`
 * para que o JavaScript de uma ferramenta seja code-split em seu próprio chunk.
 * Assim, ao visitar `/calculadora-imc`, o navegador baixa apenas o chunk do IMC,
 * não o código das 32 ferramentas. Como as páginas são SSG (generateStaticParams),
 * o HTML já vem completo do build — o dynamic import apenas separa o JS de hidratação.
 *
 * `ssr: true` (default) preserva o server-side rendering: o conteúdo da ferramenta
 * continua no HTML estático. Apenas o JS é lazy-loaded para hidratação.
 */

// Calculadoras
const PercentCalculator = dynamic(() => import("./calculators/calculadora-porcentagem"))
const CompoundInterestCalculator = dynamic(() => import("./calculators/calculadora-juros-compostos"))
const SimpleInterestCalculator = dynamic(() => import("./calculators/calculadora-juros-simples"))
const FinancingCalculator = dynamic(() => import("./calculators/calculadora-financiamento"))
const DiscountCalculator = dynamic(() => import("./calculators/calculadora-desconto"))
const RuleOfThreeCalculator = dynamic(() => import("./calculators/calculadora-regra-tres"))
const NetSalaryCalculator = dynamic(() => import("./calculators/calculadora-salario-liquido"))
const AgeCalculator = dynamic(() => import("./calculators/calculadora-idade"))
const DateDifferenceCalculator = dynamic(() => import("./calculators/diferenca-entre-datas"))
const BmiCalculator = dynamic(() => import("./calculators/calculadora-imc"))

// Conversores
const TemperatureConverter = dynamic(() => import("./converters/conversor-temperatura"))
const LengthConverter = dynamic(() => import("./converters/conversor-comprimento"))
const WeightConverter = dynamic(() => import("./converters/conversor-peso"))
const VolumeConverter = dynamic(() => import("./converters/conversor-volume"))
const AreaConverter = dynamic(() => import("./converters/conversor-area"))
const SpeedConverter = dynamic(() => import("./converters/conversor-velocidade"))
const CurrencyConverter = dynamic(() => import("./converters/conversor-moedas"))
const TimeConverter = dynamic(() => import("./converters/conversor-tempo"))

// Geradores
const PasswordGenerator = dynamic(() => import("./generators/gerador-senhas"))
const QrCodeGenerator = dynamic(() => import("./generators/gerador-qrcode"))
const LoremIpsumGenerator = dynamic(() => import("./generators/gerador-lorem-ipsum"))
const NameGenerator = dynamic(() => import("./generators/gerador-nomes"))
const HashGenerator = dynamic(() => import("./generators/gerador-hash"))
const ColorGenerator = dynamic(() => import("./generators/gerador-cores"))

// Imagem
const ImageCompressor = dynamic(() => import("./image/compressor-imagem"))
const JpgToPngConverter = dynamic(() => import("./image/conversor-jpg-png"))
const PngToWebpConverter = dynamic(() => import("./image/conversor-png-webp"))
const ImageResizer = dynamic(() => import("./image/redimensionador-imagem"))

// Produtividade
const Stopwatch = dynamic(() => import("./productivity/cronometro-online"))
const WordCounter = dynamic(() => import("./productivity/contador-palavras"))
const TimezoneConverter = dynamic(() => import("./productivity/conversor-fuso-horario"))
const Checklist = dynamic(() => import("./productivity/checklist-online"))

export const toolComponents: Record<string, React.ComponentType> = {
  // Calculadoras
  "calculadora-porcentagem": PercentCalculator,
  "calculadora-juros-compostos": CompoundInterestCalculator,
  "calculadora-juros-simples": SimpleInterestCalculator,
  "calculadora-financiamento": FinancingCalculator,
  "calculadora-desconto": DiscountCalculator,
  "calculadora-regra-tres": RuleOfThreeCalculator,
  "calculadora-salario-liquido": NetSalaryCalculator,
  "calculadora-idade": AgeCalculator,
  "diferenca-entre-datas": DateDifferenceCalculator,
  "calculadora-imc": BmiCalculator,
  // Conversores
  "conversor-temperatura": TemperatureConverter,
  "conversor-comprimento": LengthConverter,
  "conversor-peso": WeightConverter,
  "conversor-volume": VolumeConverter,
  "conversor-area": AreaConverter,
  "conversor-velocidade": SpeedConverter,
  "conversor-moedas": CurrencyConverter,
  "conversor-tempo": TimeConverter,
  // Geradores
  "gerador-senhas": PasswordGenerator,
  "gerador-qrcode": QrCodeGenerator,
  "gerador-lorem-ipsum": LoremIpsumGenerator,
  "gerador-nomes": NameGenerator,
  "gerador-hash": HashGenerator,
  "gerador-cores": ColorGenerator,
  // Imagem
  "compressor-imagem": ImageCompressor,
  "conversor-jpg-png": JpgToPngConverter,
  "conversor-png-webp": PngToWebpConverter,
  "redimensionador-imagem": ImageResizer,
  // Produtividade
  "cronometro-online": Stopwatch,
  "contador-palavras": WordCounter,
  "conversor-fuso-horario": TimezoneConverter,
  "checklist-online": Checklist,
}

export function getToolComponent(slug: string): React.ComponentType {
  return toolComponents[slug] ?? (() => null)
}
