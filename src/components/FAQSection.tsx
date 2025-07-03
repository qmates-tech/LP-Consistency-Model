import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Riceverò subito il Consistency Model?",
      answer: "Sì! Riceverai il tuo risultato e il modello via mail per poterlo ritestare aumentando variabili e dettagli."
    },
    {
      question: "A chi è destinato questo test?",
      answer: "A CEO, CTO e Product Leader di scale-up tech tra 10 e 50 dev, che vogliono migliorare velocità, qualità e scalabilità."
    },
    {
      question: "Quanto dura il test?",
      answer: "Meno di 3 minuti. Sono solo 6 domande multiple, pensate per identificare rapidamente il tuo livello di coerenza organizzativa."
    },
    {
      question: "I miei dati sono al sicuro?",
      answer: "Usiamo le risposte solo in forma aggregata per identificare pattern. Non verranno mai condivisi con terzi e non riceverai spam."
    },
    {
      question: "Cosa riceverò esattamente dopo il test?",
      answer: "Il tuo punteggio (Consistency Score), un mini-report con i tuoi punti di forza e fragilità e l'accesso al nostro modello esclusivo via mail"
    },
    {
      question: "Perché dovrei fidarmi del vostro modello?",
      answer: "Il Consistency Model nasce da oltre 10 anni di lavoro con startup e scale-up tech. È stato validato sul campo con team da 5 a 50 dev, aiutandoli a migliorare time-to-market, qualità del codice e motivazione del team."
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
            Domande frequenti
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Tutto quello che devi sapere sul Consistency Score e il nostro approccio.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-semibold text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;