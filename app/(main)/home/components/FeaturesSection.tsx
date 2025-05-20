import { Button } from "@/Components/ui/button";
import { CheckCircle2, BarChart2, Bell } from "lucide-react";

interface FeaturesSectionProps {
  onNavigate: (path: string) => void;
}

export default function FeaturesSection({ onNavigate }: FeaturesSectionProps) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Características principales
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-xl">
            <CheckCircle2 className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Seguimiento de Hábitos</h3>
            <p className="text-gray-600 mb-4">
              Registra y monitorea tus hábitos diarios de manera sencilla y efectiva.
            </p>
            <Button
              variant="ghost"
              className="text-blue-600 hover:text-blue-700"
              onClick={() => onNavigate("/sign-up")}
            >
              Comenzar ahora →
            </Button>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl">
            <BarChart2 className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Estadísticas Detalladas</h3>
            <p className="text-gray-600 mb-4">
              Visualiza tu progreso con gráficos y estadísticas personalizadas.
            </p>
            <Button
              variant="ghost"
              className="text-blue-600 hover:text-blue-700"
              onClick={() => onNavigate("/sign-up")}
            >
              Ver más →
            </Button>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl">
            <Bell className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Recordatorios</h3>
            <p className="text-gray-600 mb-4">
              Recibe notificaciones para mantener tus hábitos al día.
            </p>
            <Button
              variant="ghost"
              className="text-blue-600 hover:text-blue-700"
              onClick={() => onNavigate("/sign-up")}
            >
              Probar →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}