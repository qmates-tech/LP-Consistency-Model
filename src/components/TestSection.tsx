import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Target, TrendingUp } from "lucide-react";

const TestSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
            Consistency Score: il test gratuito
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            6 domande strategiche per misurare l'allineamento della tua scale-up. 
            Ricevi un punteggio preciso e raccomandazioni personalizzate.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="text-center shadow-card">
            <CardHeader>
              <Clock className="w-12 h-12 text-secondary mx-auto mb-4" />
              <CardTitle>3 minuti</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Test veloce e mirato per CEO e CTO di scale-up tech
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center shadow-card">
            <CardHeader>
              <Target className="w-12 h-12 text-accent mx-auto mb-4" />
              <CardTitle>Score personalizzato</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Punteggio visivo sulla coerenza strategia-team-software
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center shadow-card">
            <CardHeader>
              <TrendingUp className="w-12 h-12 text-creative-green mx-auto mb-4" />
              <CardTitle>Framework esclusivo</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Accesso al Consistency Model su richiesta
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8 py-4"
          >
            Fai il test →
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestSection;