import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { ToolFaq } from "@/data/tools"

export function FaqSection({
  faqs,
  title = "Perguntas frequentes",
}: {
  faqs: ToolFaq[]
  title?: string
}) {
  return (
    <section className="mt-12" aria-label="Perguntas frequentes">
      <h2 className="text-2xl font-bold tracking-tight mb-6">{title}</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-left text-base font-medium">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-pretty leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
