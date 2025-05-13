export function AppShowcaseSection() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">
          Diseñado para <span className="text-blue-600">tu éxito</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Interfaz intuitiva</h3>
            <p className="text-gray-600 mb-6">
              Nuestra aplicación te guía de forma clara para que puedas
              concentrarte en lo importante: construir hábitos duraderos.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Vista rápida de tu progreso diario</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Recordatorios personalizables</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Estadísticas detalladas</span>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <img
              src="/habit-tracker.png"
              alt="Seguimiento de hábitos"
              className="w-full h-auto rounded-lg shadow-lg border border-gray-300"
            />
            <img
              src="/stats-screen.png"
              alt="Estadísticas"
              className="w-full h-auto rounded-lg shadow-lg border border-gray-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
