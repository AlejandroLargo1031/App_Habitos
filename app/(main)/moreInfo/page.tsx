'use client';

import { useRouter } from 'next/navigation';
import { FeaturesSection, CTASection, SecondaryHero } from "../home/components";
import { MoreInfoSection } from "./components/MoreInfoSection";

export default function MoreInfo() {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-blue-50 to-green-50">
      <SecondaryHero 
        title="Conoce más sobre App Hábitos" 
        description="Descubre cómo nuestra aplicación puede transformar tu rutina diaria" 
      />
      
      <MoreInfoSection />
      <FeaturesSection onNavigate={handleNavigate} />
      <CTASection onNavigate={handleNavigate} />
    </div>
  );
}