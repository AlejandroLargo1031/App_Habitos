import { HeroSection, FeaturesSection, AppShowcaseSection, CTASection } from "./components/";

export default function HomePage() {
  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-blue-50 to-green-50">
      <HeroSection />
      <FeaturesSection />
      <AppShowcaseSection />
      <CTASection />
    </div>
  );
}