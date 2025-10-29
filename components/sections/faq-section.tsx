"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollReveal } from "@/components/scroll-reveal"

export function FaqSection() {
  const faqs = [
    {
      question: "What is PboxTv?",
      answer:
        "PboxTv is a streaming service with blockbuster movies, hit series, and live channels. Watch in 4K HDR with Dolby Atmos, download for offline, and stream on any device.",
    },
    {
      question: "How do I start watching?",
      answer:
        "Create a free account, choose a plan, and start streaming instantly on web, mobile, TV, or console.",
    },
    {
      question: "Can I download to watch offline?",
      answer:
        "Yes. On supported devices you can download movies and episodes to watch without internet.",
    },
    {
      question: "Does PboxTv support multiple profiles?",
      answer:
        "Yes. Create individual profiles with personalized recommendations and parental controls for families.",
    },
    {
      question: "Which devices are supported?",
      answer:
        "Smart TVs, streaming sticks, mobile (iOS/Android), tablets, web browsers, and major consoles.",
    },
  ]

  return (
    <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl [font-family:var(--font-heading)] font-bold tracking-tighter sm:text-5xl">
                Frequently Asked Questions
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 opacity-70">
                Everything you need to know about watching on PboxTv.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="mx-auto max-w-3xl py-12">
          <ScrollReveal>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="glassmorphic-accordion-item">
                  <AccordionTrigger className="text-left font-medium tracking-tight">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground opacity-70">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
