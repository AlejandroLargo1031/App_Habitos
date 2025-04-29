import { HeroSection, FeaturesSection, AppShowcaseSection, CTASection } from "./components/index";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      <HeroSection />
      <FeaturesSection />
      <AppShowcaseSection />
      <CTASection />
    </div>
  );
}