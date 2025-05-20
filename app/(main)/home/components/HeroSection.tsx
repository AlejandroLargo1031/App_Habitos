import { Button } from "@/Components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  onNavigate: (path: string) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center space-y-8">
        <h1 className="text-5xl font-bold text-gray-900">
          Bienvenido a{" "}
          <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">
            Conqueror
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Tu compañero perfecto para desarrollar hábitos saludables y alcanzar
          tus metas personales.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg transform transition duration-300 hover:scale-105"
            onClick={() => onNavigate("/sign-in")}
          >
            Comenzar ahora
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg transform transition duration-300 hover:scale-105"
            onClick={() => onNavigate("/sign-up")}
          >
            Crear cuenta
          </Button>
        </div>
      </div>
    </div>
  );
}
