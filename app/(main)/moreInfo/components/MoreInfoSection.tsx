import { Leaf, HeartPulse, Droplets, Brain } from "lucide-react";
import { Button } from "../../../../Components/ui/button";
import Link from "next/link";

export function MoreInfoSection() {
  const habitCategories = [
    {
      icon: <HeartPulse className="w-6 h-6 text-red-500" />,
      title: "Ejercicio Físico",
      description: "Registra tus rutinas de entrenamiento, tiempo activo y progreso físico.",
      examples: ["30 min de cardio", "10,000 pasos", "Rutina de fuerza"]
    },
    {
      icon: <Droplets className="w-6 h-6 text-blue-500" />,
      title: "Hidratación",
      description: "Controla tu consumo diario de agua para mantener óptima salud.",
      examples: ["8 vasos de agua", "2L diarios", "Recordatorios"]
    },
    {
      icon: <Brain className="w-6 h-6 text-purple-500" />,
      title: "Bienestar Mental",
      description: "Desarrolla hábitos para una mente saludable y productiva.",
      examples: ["5 min de meditación", "Lectura diaria", "Gratitud"]
    },
    {
      icon: <Leaf className="w-6 h-6 text-green-500" />,
      title: "Estilo de Vida",
      description: "Mejora tu calidad de vida con pequeños cambios diarios.",
      examples: ["Dormir 8 horas", "Alimentación sana", "Menos pantallas"]
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Descubre el poder de los <span className="text-blue-600">hábitos consistentes</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nuestra aplicación te ayuda a construir rutinas saludables mediante ciencia del comportamiento y diseño intuitivo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">
              ¿Cómo funciona?
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-lg text-gray-800">Define tus hábitos</h4>
                  <p className="text-gray-600">
                    Crea hábitos personalizados con metas diarias/semanales.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-2 rounded-full">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-lg text-gray-800">Registra tu progreso</h4>
                  <p className="text-gray-600">
                    Marca tus hábitos completados o registra cantidades.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-2 rounded-full">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-lg text-gray-800">Mide tus resultados</h4>
                  <p className="text-gray-600">
                    Visualiza estadísticas y mantén tus rachas.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">
              Tipos de hábitos que puedes rastrear
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {habitCategories.map((category, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    {category.icon}
                    <h4 className="font-medium text-gray-800">{category.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    {category.examples.map((example, i) => (
                      <li key={i} className="flex items-center">
                        <span className="text-green-500 mr-1">•</span>
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-blue-600 rounded-xl p-8 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">
              ¿Sabías que solo el 8% de las personas cumplen sus propósitos?
            </h3>
            <p className="text-lg mb-6">
              Con nuestro sistema de seguimiento y recordatorios, <strong>aumentas tus probabilidades de éxito en un 300%</strong>.
            </p>
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link href="/sign-up">
                Empieza tu transformación hoy
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}