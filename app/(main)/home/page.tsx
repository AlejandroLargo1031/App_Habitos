"use client";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { HeroSection, FeaturesSection, AppShowcaseSection, CTASection } from "./components/";

export default function HomePage() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/dashboard");
    }
  }, [isLoaded, isSignedIn, router]);

  const handleNavigation = (path: string) => {
    if (isSignedIn) {
      router.push("/dashboard");
    } else {
      router.push(path);
    }
  };

  // Si el usuario está autenticado, no renderizamos nada ya que será redirigido
  if (isLoaded && isSignedIn) {
    return null;
  }

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-blue-50 to-green-50">
      <HeroSection onNavigate={handleNavigation} />
      <FeaturesSection onNavigate={handleNavigation} />
      <AppShowcaseSection onNavigate={handleNavigation} />
      <CTASection onNavigate={handleNavigation} />
    </div>
  );
}