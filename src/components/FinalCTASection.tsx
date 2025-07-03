import { Button } from "@/components/ui/button";

const FinalCTASection = () => {
  return (
    <section className="py-20 lg:py-32 bg-gradient-primary">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-neutral-white mb-6 leading-tight">
          Quanto è coerente la tua scale-up?
        </h2>
        <p className="text-xl lg:text-2xl text-neutral-white/90 mb-10 max-w-2xl mx-auto">
          Scoprilo ora. Bastano 3 minuti.
        </p>
        <Button 
          size="lg" 
          className="bg-neutral-white text-primary hover:bg-neutral-white/90 text-lg px-12 py-4 shadow-elegant"
        >
          Scoprilo ora →
        </Button>
        <p className="text-sm text-neutral-white/70 mt-6">
          Test gratuito • Nessun impegno • Risultati immediati
        </p>
      </div>
    </section>
  );
};

export default FinalCTASection;