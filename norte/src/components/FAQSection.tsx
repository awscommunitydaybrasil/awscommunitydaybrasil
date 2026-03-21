import ScrollReveal from "./ScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqItem } from "@/lib/cms";

type Props = { faqs: FaqItem[] };

const FAQSection = ({ faqs }: Props) => (
  <section id="faq" className="section-padding bg-muted">
    <div className="container-main max-w-3xl">
      <ScrollReveal className="text-center mb-12">
        <p className="section-subtitle">PERGUNTAS FREQUENTES</p>
        <h2 className="section-title">Tire suas dúvidas</h2>
      </ScrollReveal>

      <ScrollReveal>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-card rounded-xl border border-border px-5"
            >
              <AccordionTrigger className="text-aws-dark font-bold text-base md:text-lg text-left py-4 hover:no-underline">
                {f.question}
              </AccordionTrigger>
              <AccordionContent className="text-aws-gray leading-relaxed pb-4">
                {f.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollReveal>
    </div>
  </section>
);

export default FAQSection;
