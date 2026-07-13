export type CategorySlug =
  | "calculadoras"
  | "conversores"
  | "geradores"
  | "imagens"
  | "produtividade"

export interface Category {
  slug: CategorySlug
  name: string
  shortName: string
  description: string
  longDescription: string
  /** lucide icon name (resolved in client) */
  icon: string
  accent: string
}

export const categories: Category[] = [
  {
    slug: "calculadoras",
    name: "Calculadoras",
    shortName: "Calculadoras",
    description:
      "Calculadoras financeiras, matemáticas e de datas para resolver contas do dia a dia com precisão.",
    longDescription:
      "Calculadoras online para finanças, matemática e datas. Calcule juros, porcentagens, descontos, IMC, idade e muito mais — tudo de forma rápida, precisa e gratuita.",
    icon: "Calculator",
    accent: "emerald",
  },
  {
    slug: "conversores",
    name: "Conversores",
    shortName: "Conversores",
    description:
      "Converta temperatura, comprimento, peso, volume, área, velocidade, moedas e tempo sem complicação.",
    longDescription:
      "Conversores de unidades e moedas para transformar valores entre diferentes sistemas de medida com exatidão e sem instalar nada.",
    icon: "ArrowLeftRight",
    accent: "amber",
  },
  {
    slug: "geradores",
    name: "Geradores",
    shortName: "Geradores",
    description:
      "Geradores de senhas, QR Code, Lorem Ipsum, nomes, hashes e cores para acelerar seu trabalho.",
    longDescription:
      "Geradores úteis para desenvolvedores, designers e qualquer pessoa que precise criar dados rapidamente: senhas seguras, QR Codes, nomes, hashes e paletas de cores.",
    icon: "Sparkles",
    accent: "violet",
  },
  {
    slug: "imagens",
    name: "Imagem",
    shortName: "Imagem",
    description:
      "Comprima, converta e redimensione imagens direto no navegador, com privacidade total.",
    longDescription:
      "Ferramentas de imagem que rodam 100% no seu navegador: comprimir, converter entre JPG, PNG e WEBP e redimensionar — seus arquivos nunca saem do seu dispositivo.",
    icon: "Image",
    accent: "rose",
  },
  {
    slug: "produtividade",
    name: "Produtividade",
    shortName: "Produtividade",
    description:
      "Cronômetro, contador de palavras, conversor de fuso horário e checklist para organizar seu tempo.",
    longDescription:
      "Ferramentas de produtividade para organizar tarefas, medir tempo e trabalhar com textos e fusos horários de forma simples.",
    icon: "Timer",
    accent: "sky",
  },
]

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}
