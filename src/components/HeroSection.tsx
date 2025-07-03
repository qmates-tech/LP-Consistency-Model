import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="bg-creative-green py-20 lg:py-32">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl lg:text-6xl font-bold text-neutral-white mb-6 leading-tight">
          Delivery lenta, team stressato o architettura bloccata?
        </h1>
        <p className="text-xl lg:text-2xl text-neutral-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
          Scopri dove si inceppa la tua scale-up.
        </p>
        <p className="text-lg text-neutral-white/80 mb-10 max-w-3xl mx-auto">
          Misura in 3 minuti la coerenza tra Business Strategy, Struttura Organizzativa e Architettura Software e ricevi subito un punteggio personalizzato sulla tua azienda.
        </p>
        <Button 
          size="lg" 
          className="bg-neutral-white text-creative-green hover:bg-neutral-white/90 text-lg px-8 py-4 shadow-elegant"
        >
          Scopri il tuo Score
        </Button>
        
        {/* Parallax Image */}
        <div className="relative mt-16 overflow-hidden">
          <div className="transform translate-y-8 opacity-90 hover:translate-y-4 transition-transform duration-1000 ease-out">
            <img 
              src="/lovable-uploads/2e7b84db-09f5-4481-9c32-8900fc70a841.png"
              alt="Consistency Model Framework"
              className="mx-auto max-w-4xl w-full h-auto rounded-lg shadow-elegant"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;