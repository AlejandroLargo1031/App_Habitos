"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { 
  Trophy, 
  Zap, 
  Flame, 
  Award, 
  CheckCircle2,
  Sparkles,
  Medal,
} from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Progress } from "@/Components/ui/progress";
import { Habit } from "@/app/types/habit";
import { Achievement, AchievementsData } from "@/app/types/habit";


export default function AchievementsPage() {
  const { getToken } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const token = await getToken({ template: "django_backend" });
        if (!token) {
          setError("Error de autenticación");
          return;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/habito/list/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Error al cargar hábitos");
        
        const data: Habit[] = await res.json();
        setHabits(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, [getToken]);

  const generateAchievements = (habits: Habit[]): AchievementsData => {
    const currentStreak = habits.length > 0 
      ? Math.max(...habits.map(h => h.racha_actual || 0))
      : 0;

    const maxStreak = habits.length > 0
      ? Math.max(...habits.map(h => h.racha_record || 0))
      : 0;

    const completedHabits = habits.filter(h => 
      (h.completed_dates?.length || 0) > 0
    ).length;

    const totalDaysCompleted = habits.reduce((sum, h) => 
      sum + (h.completed_dates?.length || 0), 0);

    const unlocked: Achievement[] = [];
    const locked: Achievement[] = [];

    // Logro 1: Primer hábito completado
    if (completedHabits > 0) {
      unlocked.push({
        id: 1,
        name: "Principiante",
        icon: "🥉",
        description: "Completa tu primer hábito",
        progress: 100,
        unlocked: true
      });
    } else {
      locked.push({
        id: 1,
        name: "Principiante",
        icon: "🥉",
        description: "Completa tu primer hábito",
        unlocked: false
      });
    }

    // Logro 2: Racha de 7 días
    if (currentStreak >= 7) {
      unlocked.push({
        id: 2,
        name: "Constante",
        icon: "🔥",
        description: "Mantén una racha de 7 días",
        progress: 100,
        unlocked: true
      });
    } else {
      locked.push({
        id: 2,
        name: "Constante",
        icon: "🔥",
        description: "Mantén una racha de 7 días",
        unlocked: false
      });
    }

    // Logro 3: Varios hábitos completados
    if (completedHabits >= 3) {
      unlocked.push({
        id: 3,
        name: "Multitarea",
        icon: "🔄",
        description: "Completa 3 hábitos diferentes",
        progress: 100,
        unlocked: true
      });
    } else {
      locked.push({
        id: 3,
        name: "Multitarea",
        icon: "🔄",
        description: "Completa 3 hábitos diferentes",
        progress: Math.min(100, (completedHabits / 3) * 100),
        unlocked: false
      });
    }

    // Logro 4: 30 días completados
    if (totalDaysCompleted >= 30) {
      unlocked.push({
        id: 4,
        name: "Comprometido",
        icon: "🏆",
        description: "30 días de hábitos completados",
        progress: 100,
        unlocked: true
      });
    } else {
      locked.push({
        id: 4,
        name: "Comprometido",
        icon: "🏆",
        description: "30 días de hábitos completados",
        progress: Math.min(100, (totalDaysCompleted / 30) * 100),
        unlocked: false
      });
    }

    // Logro 5: Récord personal
    locked.push({
      id: 5,
      name: "Leyenda",
      icon: "🌟",
      description: `Alcanza una racha de ${Math.max(30, maxStreak + 5)} días`,
      progress: Math.min(100, (currentStreak / Math.max(30, maxStreak + 5)) * 100),
      unlocked: false
    });

    return {
      unlocked,
      locked,
      streak: currentStreak,
      nextReward: {
        name: currentStreak >= 7 ? "Experto" : "Intermedio",
        daysLeft: currentStreak >= 7 ? 30 - currentStreak : 7 - currentStreak
      }
    };
  };

  const achievementsData = habits.length > 0 ? generateAchievements(habits) : {
    unlocked: [],
    locked: [
      { id: 1, name: "Principiante", icon: "🥉", description: "Completa tu primer hábito", unlocked: false },
      { id: 2, name: "Constante", icon: "🔥", description: "Mantén una racha de 7 días", unlocked: false },
      { id: 3, name: "Multitarea", icon: "🔄", description: "Completa 3 hábitos diferentes", unlocked: false }
    ],
    streak: 0,
    nextReward: { name: "Principiante", daysLeft: 3 }
  };

  if (loading) return <div className="p-6 text-center">Cargando tus logros...</div>;
  if (error) return <div className="p-6 text-red-500 text-center">{error}</div>;

  return (
    <div className="p-6 space-y-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <Trophy className="text-yellow-400 h-10 w-10" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
            Mis Logros
          </span>
          <Sparkles className="text-yellow-400 h-10 w-10" />
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Cada insignia representa tu dedicación. ¡Sigue así para desbloquear recompensas exclusivas!
        </p>
      </div>

      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-2xl p-6 shadow-lg text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-3 rounded-full">
            <Flame className="h-8 w-8 text-white" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-orange-800 mb-2">
          ¡Racha de {achievementsData.streak} días!
        </h3>
        <p className="text-orange-600 mb-4">
          {achievementsData.nextReward.daysLeft} días para &quot;{achievementsData.nextReward.name}&quot;
        </p>
        <Progress 
          value={(achievementsData.streak / (achievementsData.streak + achievementsData.nextReward.daysLeft)) * 100} 
          className="h-3 bg-orange-200 mx-auto max-w-md bg-gradient-to-r from-yellow-400 to-orange-500"
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
          <CheckCircle2 className="text-green-600" /> Insignias Obtenidas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievementsData.unlocked.map((item) => (
            <div 
              key={item.id} 
              className="bg-white border-2 border-green-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] relative overflow-hidden"
            >
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-400 opacity-20 rounded-full blur-xl"></div>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <span className="text-4xl mb-3">{item.icon}</span>
                <h3 className="text-xl font-bold text-gray-800 mb-1">{item.name}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                {item.progress && (
                  <div className="w-full">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Progreso</span>
                      <span>{item.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" 
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
          <Award className="text-blue-600" /> Próximos Desafíos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievementsData.locked.map((item) => (
            <div 
              key={item.id} 
              className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm opacity-80 hover:opacity-100 transition relative"
            >
              <div className="absolute top-4 right-4 bg-gray-100 px-2 py-1 rounded-full text-xs font-medium">
                ¡Próximo!
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text-4xl mb-3 filter grayscale">{item.icon}</span>
                <h3 className="text-xl font-bold text-gray-700 mb-1">{item.name}</h3>
                <p className="text-gray-500 mb-4">{item.description}</p>
                <Button 
                  asChild
                  variant="outline" 
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-600 hover:to-blue-600 text-white hover:text-white transform transition duration-300 hover:scale-105"
                >
                  <Link href={`/habits?goal=${encodeURIComponent(item.description)}`}>
                    Ver cómo desbloquear
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-center text-white shadow-xl">
        <div className="max-w-2xl mx-auto">
          <Medal className="h-12 w-12 mx-auto text-yellow-400 mb-4" />
          <h3 className="text-3xl font-bold mb-3">¡Tú decides hasta dónde llegar!</h3>
          <p className="text-lg mb-6 opacity-90">
            Cada hábito cuenta. ¿Podrás alcanzar el nivel &quot;Leyenda&quot;?
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              asChild
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-bold transform transition duration-300 hover:scale-105"
            >
              <Link href="/progress">
                <Zap className="h-5 w-5 mr-2" /> Ver mis estadísticas
              </Link>
            </Button>
            
          </div>
        </div>
      </div>
    </div>
  );
}