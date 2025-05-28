// Crea un nuevo archivo MotivationalPhrase.tsx
import { useEffect, useState } from "react";

const motivationalPhrases = [
  "¡Tú puedes lograr todo lo que te propongas!",
  "Cada pequeño paso cuenta, sigue adelante",
  "La constancia es la clave del éxito",
  "Hoy es un gran día para superarte",
  "Tus esfuerzos de hoy son las victorias de mañana",
  "El progreso, no la perfección",
  "Cada día es una nueva oportunidad",
  "Lo importante es seguir avanzando, sin importar la velocidad",
  "Tus hábitos te están acercando a tu mejor versión",
  "El único límite es el que tú te pones"
];

export default function MotivationalPhrase() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [lastUpdateDate, setLastUpdateDate] = useState<string>("");

  useEffect(() => {
    const updatePhrase = () => {
      const today = new Date();
      const todayStr = today.toISOString().split('T')[0]; // Formato YYYY-MM-DD

      // Si ya actualizamos hoy, no hacemos nada
      if (lastUpdateDate === todayStr) {
        return;
      }

      // Calcular el índice basado en el día del año
      const start = new Date(today.getFullYear(), 0, 0);
      const diff = today.getTime() - start.getTime();
      const oneDay = 1000 * 60 * 60 * 24;
      const dayOfYear = Math.floor(diff / oneDay);
      const index = dayOfYear % motivationalPhrases.length;

      setPhraseIndex(index);
      setLastUpdateDate(todayStr);

      // Guardar en localStorage para persistencia
      localStorage.setItem('lastPhraseUpdate', todayStr);
      localStorage.setItem('currentPhraseIndex', index.toString());
    };

    // Intentar recuperar el estado del localStorage
    const savedDate = localStorage.getItem('lastPhraseUpdate');
    const savedIndex = localStorage.getItem('currentPhraseIndex');

    if (savedDate && savedIndex) {
      const today = new Date().toISOString().split('T')[0];
      
      if (savedDate === today) {
        // Si ya actualizamos hoy, usar el índice guardado
        setPhraseIndex(parseInt(savedIndex));
        setLastUpdateDate(savedDate);
      } else {
        // Si es un nuevo día, actualizar
        updatePhrase();
      }
    } else {
      // Si no hay datos guardados, actualizar
      updatePhrase();
    }

    // Configurar un intervalo para verificar cambios de día
    const interval = setInterval(updatePhrase, 1000 * 60 * 60); // Verificar cada hora

    return () => clearInterval(interval);
  }, [lastUpdateDate]);

  return (
    <div className="text-center mb-6 animate-fade-in">
      <p className="text-lg text-blue-600 italic">
        <span>{motivationalPhrases[phraseIndex]}</span>
      </p>
    </div>
  );
}