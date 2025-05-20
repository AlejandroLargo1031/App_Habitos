import { Button } from "@/Components/ui/button";
import { Flame } from "lucide-react";

interface CTASectionProps {
  onNavigate: (path: string) => void;
}

export default function CTASection({ onNavigate }: CTASectionProps) {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">
          ¿Listo para transformar tus hábitos?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Únete a miles de personas que ya están mejorando sus vidas con App Hábitos.
          Comienza tu viaje hacia una vida más saludable hoy mismo.
        </p>
        <Button
          size="lg"
          className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg transform transition duration-300 hover:scale-105"
          onClick={() => onNavigate("/sign-up")}
        >
          Empieza ahora - Es gratis!
        </Button>
      </div>

      <div className="flex justify-center items-center mt-12 pt-8 text-center text-blue-100">
        <Flame className="h-4 w-4 text-yellow-400" />
        <span className="pl-2">Creado por</span>
        <span className="text-white font-medium px-1">Alejandro Largo</span>
        <span>versión 1.0.0</span>
      </div>
    </section>
  );
}