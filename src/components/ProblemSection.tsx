const ProblemSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-8">
            Il problema non è sempre quello che sembra
          </h2>
          <div className="text-lg lg:text-xl text-muted-foreground leading-relaxed space-y-6">
            <p>
              <strong>Anche se il team è competente, la delivery rallenta.</strong>
            </p>
            <p>
              Anche se assumi, la qualità non cresce. 
              Se il prodotto perde smalto, spesso il problema non è il team, 
              ma la <span className="text-secondary font-semibold">mancanza di coerenza tra strategia, organizzazione e software</span>.
            </p>
            <p>
              Quando questi tre pilastri non sono allineati, ogni sprint diventa una battaglia. 
              Il debito tecnico cresce, i tempi si allungano e l'innovazione si blocca.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;