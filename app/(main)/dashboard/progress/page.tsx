"use client";
import { Progress } from "@/Components/ui/progress";
import { Button } from "@/Components/ui/button";
import { 
  Flame, 
  Trophy, 
  Droplets, 
  BarChart2, 
  Award,
  Zap,
  ChevronRight,
  Star,
  Book,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Habit } from "@/app/types/habit";

export default function ProgressPage() {
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

  // Calcular datos derivados
  const bestHabit = habits.length > 0 
    ? habits.reduce((prev, current) => 
        (prev.racha_actual > current.racha_actual) ? prev : current
      ).nombre 
    : "Ninguno aún";

  const longestStreak = habits.length > 0
    ? Math.max(...habits.map(h => h.racha_record || 0))
    : 0;

  // Calcular progreso para cada hábito
  const getHabitProgress = (habit: Habit) => {
    return habit.objetivo > 0 
      ? Math.min(100, Math.round(((habit.actual || 0) / habit.objetivo) * 100))
      : 0;
  };

  if (loading) return <div className="p-6">Cargando progreso...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <BarChart2 className="text-blue-600" /> Mi Progreso
        </h1>
        <div className="flex gap-3">
          <Button asChild className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-600 hover:to-blue-600 text-white transform transition duration-300 hover:scale-105">
            <Link href="/dashboard/habits/" className="flex items-center gap-2">
              <Zap className="h-4 w-4" /> Nuevo reto
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-between">
        <div className="border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="h-8 w-8 text-yellow-400" />
            <h3 className="text-xl font-semibold text-black">Mejor hábito</h3>
          </div>
          <p className="text-2xl font-bold text-black">{bestHabit}</p>
          <div className="mt-4 flex items-center gap-2 text-black">
            <Flame className="h-4 w-4 text-yellow-400" />
            <span>
              Racha actual: {
                habits.find(h => h.nombre === bestHabit)?.racha_actual || 0
              } días
            </span>
          </div>
        </div>

        <div className="border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Award className="h-8 w-8 text-yellow-400" />
            <h3 className="text-xl font-semibold text-black">Récord personal</h3>
          </div>
          <p className="text-2xl font-bold text-black">{longestStreak} días</p>
          <div className="mt-4 flex items-center gap-2 text-black">
            <Star className="h-4 w-4 text-yellow-400" />
            <span>¡Sigue así!</span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Progreso de hábitos</h3>
        </div>
        
        <div className="space-y-6">
          {habits.map((habit) => {
            const progress = getHabitProgress(habit);
            return (
              <div key={habit.id} className="space-y-2">
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-full">
                      {habit.icono === "exercise" ? (
                        <Flame className="h-5 w-5 text-yellow-400" />
                      ) : habit.icono === "water" ? (
                        <Droplets className="h-5 w-5 text-blue-600" />
                      ) : (
                        <Book className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">{habit.nombre}</h4>
                      <p className="text-sm text-gray-500">
                        {habit.actual || 0}/{habit.objetivo} {habit.meta_unidad || "veces"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {progress}%
                    </span>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <Progress 
                  value={progress} 
                  className={`h-2 ${
                    progress >= 80 ? "bg-yellow-400" :
                    progress >= 50 ? "bg-green-600" : "bg-blue-600"
                  }`}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Inicio</span>
                  <span>Meta</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-8 text-center text-white">
        <h3 className="text-2xl font-bold mb-3">¡Sigue construyendo tu mejor versión!</h3>
        <p className="text-lg mb-6">Cada día cuenta. ¿Qué hábito mejorarás hoy?</p>
        <div className="flex gap-4 justify-center">
          <Button 
            asChild
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 transform transition duration-300 hover:scale-105"
          >
            <Link href="/dashboard/habits/">Añadir nuevo hábito</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}