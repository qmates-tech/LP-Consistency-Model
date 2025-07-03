import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, Code } from "lucide-react";

const ConsistencyModelSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-accent text-accent-foreground">Framework esclusivo</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
            Cos'è il Consistency Model
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Il framework proprietario di QMates, usato dalle scale-up tech più innovative 
            per allineare strategia, team e architettura software.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="border-2 border-secondary shadow-card">
            <CardHeader className="text-center">
              <Building2 className="w-16 h-16 text-secondary mx-auto mb-4" />
              <CardTitle className="text-secondary">Business Strategy</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription>
                Definizione chiara del vantaggio competitivo e delle linee di business indipendenti
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-2 border-accent shadow-card">
            <CardHeader className="text-center">
              <Users className="w-16 h-16 text-accent mx-auto mb-4" />
              <CardTitle className="text-accent">Struttura Organizzativa</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription>
                Allineamento di competenze, responsabilità e flussi di lavoro per massimizzare l'efficacia
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary shadow-card">
            <CardHeader className="text-center">
              <Code className="w-16 h-16 text-primary mx-auto mb-4" />
              <CardTitle className="text-primary">Architettura</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription>
                Progettazione di componenti software modulari che supportano crescita e innovazione
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="bg-sage-light p-8 rounded-lg text-center">
          <h3 className="text-xl font-semibold text-primary mb-4">
            Framework già utilizzato per aiutare scale-up tech a:
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-muted-foreground">
            <div>✓ Migliorare time-to-market del 40%</div>
            <div>✓ Ridurre debito tecnico</div>
            <div>✓ Riallineare team e strategia</div>
          </div>
          <p className="mt-6 text-sm text-muted-foreground font-medium">
            * Ricevibile solo dopo il test e su richiesta
          </p>
        </div>
      </div>
    </section>
  );
};

export default ConsistencyModelSection;