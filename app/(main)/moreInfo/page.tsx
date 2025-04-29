import { FeaturesSection, CTASection, SecondaryHero } from "../home/components";
import { MoreInfoSection } from "./components/MoreInfoSection";

export default function MoreInfo() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      <SecondaryHero 
        title="Conoce más sobre App Hábitos" 
        description="Descubre cómo nuestra aplicación puede transformar tu rutina diaria" 
      />
      
      <MoreInfoSection />
      <FeaturesSection />
      <CTASection />
    </div>
  );
}