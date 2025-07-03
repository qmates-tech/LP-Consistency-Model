import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, BarChart3, Rocket, Shield } from "lucide-react";

const WhyNowSection = () => {
  const benefits = [
    {
      icon: AlertTriangle,
      title: "Capisci se stai scalando su fondamenta fragili",
      description: "Identifica i punti critici prima che diventino blocchi insuperabili"
    },
    {
      icon: BarChart3,
      title: "Ricevi uno score visivo, utile anche per il board",
      description: "Dati concreti da presentare agli investitori e stakeholder"
    },
    {
      icon: Rocket,
      title: "Accedi a un modello già usato con startup finanziate",
      description: "Framework testato su scale-up che hanno raccolto milioni di euro"
    },
    {
      icon: Shield,
      title: "Nessun impegno, solo feedback reale e utile",
      description: "Test gratuito, senza vendite aggressive o impegni nascosti"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
            Perché farlo ora
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Ogni giorno di disallineamento costa velocità, qualità e opportunità. 
            Misura la coerenza della tua scale-up prima che sia troppo tardi.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="shadow-card hover:shadow-elegant transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <benefit.icon className="w-12 h-12 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyNowSection;