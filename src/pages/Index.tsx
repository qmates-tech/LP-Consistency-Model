import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import TestSection from "@/components/TestSection";
import ConsistencyModelSection from "@/components/ConsistencyModelSection";
import WhyNowSection from "@/components/WhyNowSection";
import TallyForm from "@/components/TallyFormEmbed";
import FAQSection from "@/components/FAQSection";
import FinalCTASection from "@/components/FinalCTASection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProblemSection />
      <TestSection />
      <ConsistencyModelSection />
      <WhyNowSection />
      <TallyForm />
      <FAQSection />
      <FinalCTASection />
    </div>
  );
};

export default Index;
