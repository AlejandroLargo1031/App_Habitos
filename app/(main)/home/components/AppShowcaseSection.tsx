import { Button } from "@/Components/ui/button";
import { ArrowRight } from "lucide-react";

interface AppShowcaseSectionProps {
  onNavigate: (path: string) => void;
}

export default function AppShowcaseSection({ onNavigate }: AppShowcaseSectionProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Una experiencia diseñada para ti
            </h2>
            <p className="text-gray-600 mb-8">
              Nuestra aplicación está diseñada pensando en tu éxito. Con una interfaz intuitiva
              y características personalizadas, te ayudamos a mantener tus hábitos de manera
              efectiva y motivadora.
            </p>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => onNavigate("/sign-up")}
            >
              Comenzar ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          <div className="bg-white p-2 rounded-xl shadow-xl">
            <img 
              src="/app-dashboard.png" 
              alt="Dashboard de la aplicación"
              className="rounded-lg border border-gray-200"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
