import * as React from "react"

// Calculadoras
import PercentCalculator from "./calculators/calculadora-porcentagem"
import CompoundInterestCalculator from "./calculators/calculadora-juros-compostos"
import SimpleInterestCalculator from "./calculators/calculadora-juros-simples"
import FinancingCalculator from "./calculators/calculadora-financiamento"
import DiscountCalculator from "./calculators/calculadora-desconto"
import RuleOfThreeCalculator from "./calculators/calculadora-regra-tres"
import NetSalaryCalculator from "./calculators/calculadora-salario-liquido"
import AgeCalculator from "./calculators/calculadora-idade"
import DateDifferenceCalculator from "./calculators/diferenca-entre-datas"
import BmiCalculator from "./calculators/calculadora-imc"

// Conversores
import TemperatureConverter from "./converters/conversor-temperatura"
import LengthConverter from "./converters/conversor-comprimento"
import WeightConverter from "./converters/conversor-peso"
import VolumeConverter from "./converters/conversor-volume"
import AreaConverter from "./converters/conversor-area"
import SpeedConverter from "./converters/conversor-velocidade"
import CurrencyConverter from "./converters/conversor-moedas"
import TimeConverter from "./converters/conversor-tempo"

// Geradores
import PasswordGenerator from "./generators/gerador-senhas"
import QrCodeGenerator from "./generators/gerador-qrcode"
import LoremIpsumGenerator from "./generators/gerador-lorem-ipsum"
import NameGenerator from "./generators/gerador-nomes"
import HashGenerator from "./generators/gerador-hash"
import ColorGenerator from "./generators/gerador-cores"

// Imagem
import ImageCompressor from "./image/compressor-imagem"
import JpgToPngConverter from "./image/conversor-jpg-png"
import PngToWebpConverter from "./image/conversor-png-webp"
import ImageResizer from "./image/redimensionador-imagem"

// Produtividade
import Stopwatch from "./productivity/cronometro-online"
import WordCounter from "./productivity/contador-palavras"
import TimezoneConverter from "./productivity/conversor-fuso-horario"
import Checklist from "./productivity/checklist-online"

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
