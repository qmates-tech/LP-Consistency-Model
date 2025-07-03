import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Il Consistency Model ci ha aiutato a individuare i colli di bottiglia che rallentavano la delivery del 30%.",
      author: "Marco Rossi",
      role: "CTO, TechStart Milano",
      rating: 5
    },
    {
      quote: "Finalmente un framework che parla il linguaggio del business senza perdere la profondità tecnica.",
      author: "Laura Bianchi",
      role: "CEO, InnovateLab",
      rating: 5
    },
    {
      quote: "Il test mi ha fatto capire dove investire per sbloccare il team. ROI immediato in termini di chiarezza.",
      author: "Andrea Verdi",
      role: "Founder, ScaleUp Roma",
      rating: 5
    },
    {
      quote: "Un approccio sistematico che mancava. Ora strategia, team e tech sono finalmente allineati.",
      author: "Giulia Neri",
      role: "CTO, DevFlow",
      rating: 5
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: rating }, (_, i) => (
      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
    ));
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
            Cosa dicono founder e CTO
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Testimonianze di chi ha già utilizzato il Consistency Model per trasformare la propria scale-up.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="shadow-card hover:shadow-elegant transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                <blockquote className="text-lg text-muted-foreground mb-4 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="border-t pt-4">
                  <p className="font-semibold text-primary">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;