import { Button } from "../../../../Components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="py-20 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Transforma tus hábitos, 
          <span className="text-blue-600"> transforma tu vida</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          La aplicación definitiva para construir y mantener hábitos saludables. 
          Logra tus metas de ejercicio, hidratación y bienestar con nuestro 
          sistema de seguimiento inteligente.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="/sign-up">
              Comienza gratis <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-blue-600 text-blue-600">
            <Link href="/moreInfo">
              Conoce más
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Hero Image */}
      <div className="mt-16 max-w-5xl mx-auto bg-white p-2 rounded-xl shadow-xl">
        <img 
          src="/screenshots/app-dashboard.png" 
          alt="Dashboard de la aplicación"
          className="rounded-lg border border-gray-200"
        />
      </div>
    </section>
  );
}