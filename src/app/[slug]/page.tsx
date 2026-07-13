import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { tools, getTool } from "@/data/tools"
import { ToolPage, buildToolMetadata } from "@/components/tools/tool-page"

export const dynamicParams = false

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }))
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then((p) => {
    const tool = getTool(p.slug)
    if (!tool) return {}
    return buildToolMetadata(tool)
  })
}

export default async function ToolRoute({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const tool = getTool(slug)
  if (!tool) {
    notFound()
  }
  return <ToolPage tool={tool} />
}
