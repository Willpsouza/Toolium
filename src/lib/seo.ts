import type { Metadata } from "next"

export const siteConfig = {
  name: "Toolium",
  domain: "toolium.com.br",
  url: "https://toolium.com.br",
  description:
    "Ferramentas online gratuitas para facilitar sua rotina. Calculadoras, conversores, geradores e utilidades rápidas, precisas e 100% grátis — sem cadastro.",
  shortDescription:
    "Ferramentas online gratuitas, rápidas e sem cadastro.",
  publisher: "Toolium",
  locale: "pt-BR",
  adsenseClient: "ca-pub-2570963650556560",
  keywords: [
    "ferramentas online",
    "ferramentas gratuitas",
    "calculadora online",
    "conversor online",
    "gerador online",
    "ferramentas grátis",
    "calculadoras",
    "conversores",
    "Toolium",
  ],
  author: {
    name: "Toolium",
    url: "https://toolium.com.br",
  },
  social: {
    twitter: "@tooliumbr",
  },
}

export const defaultOgImage = {
  url: "/og.svg",
  width: 1200,
  height: 630,
  alt: "Toolium — Ferramentas online gratuitas",
}

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords,
  noIndex = false,
  publishedTime,
}: {
  title: string
  description: string
  path?: string
  keywords?: string[]
  noIndex?: boolean
  publishedTime?: string
}): Metadata {
  const url = `${siteConfig.url}${path}`
  const fullTitle = title.includes("Toolium")
    ? title
    : `${title} | Toolium`

  return {
    title: fullTitle,
    description,
    keywords: keywords ?? siteConfig.keywords,
    authors: [{ name: siteConfig.author.name }],
    creator: siteConfig.author.name,
    publisher: siteConfig.publisher,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [defaultOgImage.url],
      creator: siteConfig.social.twitter,
    },
    ...(publishedTime
      ? { other: { "article:published_time": publishedTime } }
      : {}),
  }
}
