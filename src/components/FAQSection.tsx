import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Quanto tempo richiede il test?",
      answer: "Solo 3 minuti. Il test è composto da 6 domande strategiche mirate, pensate per CEO e CTO di scale-up tech con team di 10-50 sviluppatori."
    },
    {
      question: "Che tipo di punteggio ricevo?",
      answer: "Ricevi un Consistency Score che misura l'allineamento tra strategia business, struttura organizzativa e architettura software. Include un mini-report con raccomandazioni personalizzate."
    },
    {
      question: "Il test è davvero gratuito?",
      answer: "Sì, completamente gratuito. Nessun costo nascosto, nessun impegno. L'unico requisito è essere CEO o CTO di una scale-up tech."
    },
    {
      question: "Cos'è il Consistency Model e come posso ottenerlo?",
      answer: "È il framework proprietario di QMates per allineare strategia, team e software nelle scale-up. È disponibile solo su richiesta dopo aver completato il test e prenotato una call di approfondimento."
    },
    {
      question: "I miei dati sono al sicuro?",
      answer: "Assolutamente sì. Utilizziamo i tuoi dati solo per generare il tuo score personalizzato. Non condividiamo informazioni con terze parti e puoi richiedere la cancellazione in qualsiasi momento."
    },
    {
      question: "Per che tipo di aziende è pensato?",
      answer: "Scale-up tech con team di sviluppo di 10-50 persone, che stanno affrontando sfide di crescita, delivery o allineamento strategico. Ideale per chi ha superato la fase di MVP e sta scalando."
    },
    {
      question: "Cosa succede dopo il test?",
      answer: "Ricevi immediatamente il tuo Consistency Score via email. Se interessato, puoi prenotare una call gratuita di 30 minuti per approfondire i risultati e richiedere accesso al framework completo."
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