import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="bg-creative-green py-20 lg:py-32">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl lg:text-6xl font-bold text-neutral-white mb-6 leading-tight">
          Delivery lenta, team stressato o architettura bloccata?
        </h1>
        <p className="text-xl lg:text-2xl text-neutral-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
          Scopri dove si inceppa davvero la tua scale-up con un test gratuito in 3 minuti.
        </p>
        <p className="text-lg text-neutral-white/80 mb-10 max-w-3xl mx-auto">
          Ricevi subito un punteggio personalizzato sulla coerenza tra strategia, team e software. 
          E se vuoi, accedi al nostro framework esclusivo per sbloccare velocità e innovazione.
        </p>
        <Button 
          size="lg" 
          className="bg-neutral-white text-creative-green hover:bg-neutral-white/90 text-lg px-8 py-4 shadow-elegant"
        >
          Scopri il tuo Score
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;