import { CheckCircle, TrendingUp, Award } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: <CheckCircle className="text-blue-600 w-8 h-8" />,
      bgColor: "bg-blue-100",
      title: "Seguimiento simple",
      description: "Registra tus hábitos con un solo clic. Marca tu progreso diario en ejercicio, hidratación y más."
    },
    {
      icon: <TrendingUp className="text-orange-600 w-8 h-8" />,
      bgColor: "bg-orange-100",
      title: "Rachas motivadoras",
      description: "No rompas la cadena! Visualiza tus rachas actuales y récords personales para mantener la motivación."
    },
    {
      icon: <Award className="text-purple-600 w-8 h-8" />,
      bgColor: "bg-purple-100",
      title: "Logros y metas",
      description: "Desbloquea insignias y celebra tus hitos. Alcanza tus metas semanales y mensuales."
    }
  ];

  return (
    <section id="features" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">
          Potencia tu <span className="text-blue-600">transformación</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className={`${feature.bgColor} p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}