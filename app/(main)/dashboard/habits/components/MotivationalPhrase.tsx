// Crea un nuevo archivo MotivationalPhrase.tsx
import { useEffect, useState } from "react";

const motivationalPhrases = [
  "¡Tú puedes lograr todo lo que te propongas!",
  "Cada pequeño paso cuenta, sigue adelante ",
  "La constancia es la clave del éxito ",
  "Hoy es un gran día para superarte ",
  "Tus esfuerzos de hoy son las victorias de mañana ",
  "El progreso, no la perfección ",
  "Cada día es una nueva oportunidad ",
  "Lo importante es seguir avanzando, sin importar la velocidad ",
  "Tus hábitos te están acercando a tu mejor versión ",
  "El único límite es el que tú te pones "
];

export default function MotivationalPhrase() {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const index = dayOfYear % motivationalPhrases.length;
    setPhraseIndex(index);
  }, []);

  return (
    <div className="text-center mb-6 animate-fade-in">
      <p className="text-lg text-blue-600 italic">
        <span>{motivationalPhrases[phraseIndex]}</span>
      </p>
    </div>
  );
}