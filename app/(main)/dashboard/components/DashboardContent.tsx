/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";
import {
  Flame,
  Trophy,
  Droplets,
  CalendarCheck,
  Bell,
  Plus,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/Components/ui/button";
import { Habit } from "@/app/types/habit";
import MotivationalPhrase from "../habits/components/MotivationalPhrase";
import { HydrationData } from "@/app/types/hydration";

// Lógica de hidratación separada
const useHydration = (getToken: any) => {
  const [hydrationData, setHydrationData] = useState<HydrationData>({});

  const fetchHydrationData = useCallback(async () => {
    try {
      const token = await getToken({ template: "django_backend" });
      if (!token) {
        console.error("No se pudo obtener el token de autenticación");
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/hydration/dashboard/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Error al cargar datos de hidratación");
      }

      const data: HydrationData = await res.json();
      setHydrationData(data);
    } catch (err) {
      console.error("Error al obtener datos de hidratación:", err);
    }
  }, [getToken]);

  const recordWaterIntake = useCallback(async () => {
    try {
      const token = await getToken({ template: "django_backend" });
      if (!token) {
        console.error("No se pudo obtener el token de autenticación");
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/hydration/add_glass/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ amount: 1 }),
        }
      );

      if (!res.ok) {
        throw new Error(`Error al registrar vaso: ${res.statusText}`);
      }

      const updatedData = await res.json();
      setHydrationData(prev => ({
        ...prev,
        today_record: {
          ...prev.today_record,
          amount: updatedData.amount || (prev.today_record?.amount || 0) + 1,
          goal: prev.today_record?.goal || 8
        }
      }));
    } catch (err) {
      console.error("Error al registrar vaso:", err);
    }
  }, [getToken]);

  useEffect(() => {
    fetchHydrationData();
  }, [fetchHydrationData]);

  return { hydrationData, recordWaterIntake };
};

export default function DashboardContent() {
  const { getToken } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { hydrationData, recordWaterIntake } = useHydration(getToken);

  const fetchHabits = useCallback(async () => {
    try {
      const token = await getToken({ template: "django_backend" });
      if (!token) {
        setError("Error de autenticación");
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/habito/list/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Error al cargar hábitos");

      const habitsData: Habit[] = await res.json();
      setHabits(habitsData);

      if (habitsData.length > 0) {
        const current = Math.max(
          ...habitsData.map((h) => h.racha_actual || 0)
        );
        const max = Math.max(...habitsData.map((h) => h.racha_record || 0));
        setCurrentStreak(current);
        setMaxStreak(max);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  // Calcular progreso diario
  const today = new Date().toISOString().split("T")[0];
  const completedToday = habits.filter((habit) =>
    habit.completed_dates?.includes(today)
  ).length;

  // Datos estáticos
  const notifications = [
    {
      id: 1,
      text: `¡Tu racha actual es de ${currentStreak} días!`,
      icon: <Flame className="text-orange-500" />,
    },
    {
      id: 2,
      text: `Lograste ${hydrationData.today_record?.amount || 0} vasos de agua hoy`,
      icon: <Droplets className="text-blue-500" />,
    },
  ];

  if (loading) return <div className="p-6">Cargando...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="flex min-h-screen">
      <main className="flex-1">
        <div className="p-6 space-y-8">
          <div className="flex justify-between items-start">
            <div className="flex gap-3">
              <Button
                asChild
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-600 hover:to-blue-600 text-white transform transition duration-300 hover:scale-105"
              >
                <Link href="/habits/" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" /> Nuevo hábito
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Flame className="h-8 w-8 text-orange-600" />
                <h3 className="text-xl font-semibold text-orange-800">
                  Racha Actual
                </h3>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-4xl font-bold text-orange-900">
                    {currentStreak} <span className="text-2xl">días</span>
                  </p>
                  <p className="text-orange-700">¡No rompas la cadena!</p>
                </div>
                {currentStreak >= 5 && (
                  <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                    🔥 En llamas
                  </div>
                )}
              </div>
              <div className="mt-4 pt-4 border-t border-orange-200">
                <p className="text-sm text-orange-700 flex items-center gap-1">
                  <Trophy className="h-4 w-4" /> Récord: {maxStreak} días
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <CalendarCheck className="h-8 w-8 text-blue-600" />
                <h3 className="text-xl font-semibold text-blue-800">
                  Hábitos Hoy
                </h3>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm text-blue-700 mb-1">
                    <span>Completados</span>
                    <span>
                      {completedToday}/{habits.length}
                    </span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{
                        width: `${
                          habits.length > 0
                            ? (completedToday / habits.length) * 100
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-blue-300 text-blue-600 hover:bg-blue-50 transform transition duration-300 hover:scale-105"
                >
                  <Link href="/dashboard/habits">Ver todos los hábitos</Link>
                </Button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 border border-cyan-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Droplets className="h-8 w-8 text-cyan-600" />
                <h3 className="text-xl font-semibold text-cyan-800">Hidratación</h3>
              </div>
              <div className="flex items-end gap-2 mb-4">
                <p className="text-4xl font-bold text-cyan-900">
                  {hydrationData.today_record?.amount || 0}
                </p>
                <p className="text-cyan-700 mb-1">
                  / {hydrationData.today_record?.goal || 8} vasos
                </p>
              </div>
              <div className="grid grid-cols-8 gap-1">
                {Array.from({
                  length: hydrationData.today_record?.goal || 8,
                }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 rounded-full ${
                      i < (hydrationData.today_record?.amount || 0)
                        ? "bg-cyan-600"
                        : "bg-cyan-200"
                    }`}
                  ></div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full mt-4 border-cyan-300 text-cyan-600 hover:bg-cyan-50 transform transition duration-300 hover:scale-105"
                onClick={recordWaterIntake}
              >
                Registrar vaso
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Bell className="h-5 w-5 text-blue-600" /> Notificaciones
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 transform transition duration-300 hover:scale-105"
                >
                  Ver todas
                </Button>
              </div>
              <div className="space-y-4">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition"
                  >
                    <div className="p-2 bg-gray-100 rounded-full">
                      {item.icon}
                    </div>
                    <p className="text-gray-700">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-blue-600 mb-4">
                  Acciones Rápidas
                </h3>
                <div className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-600 hover:to-blue-600 text-white transform transition duration-300 hover:scale-105">
                    <Link
                      href="/dashboard/habits/"
                      className="flex items-center gap-2"
                    >
                      <Zap className="h-4 w-4 mr-2" /> Completar hábitos
                      pendientes
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-blue-600 text-blue-600 hover:bg-blue-60 hover:text-black transform transition duration-300 hover:scale-105"
                  >
                    Ver estadísticas completas
                  </Button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">
                  Frase del día
                </h3>
                <MotivationalPhrase />
                <p className="text-right text-sm text-blue-600 mt-2">
                  - Alejandro Largo
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Hábitos sugeridos para ti
              </h3>
              <Button
                variant="ghost"
                className="text-blue-600 transform transition duration-300 hover:scale-105"
              >
                <Link href="/dashboard/habits">Ver todos</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ml-44">
              {[
                {
                  name: "Estiramiento matutino",
                  category: "Salud",
                  icon: "🧘‍♂️",
                },
                {
                  name: "Leer 10 páginas",
                  category: "Crecimiento",
                  icon: "📖",
                },
                {
                  name: "Caminata vespertina",
                  category: "Ejercicio",
                  icon: "🚶‍♂️",
                },
              ].map((habit, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                >
                  <div className="text-2xl mb-2">{habit.icon}</div>
                  <h4 className="font-medium text-gray-800">{habit.name}</h4>
                  <p className="text-sm text-gray-500">{habit.category}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3 w-full transform transition duration-300 hover:scale-105"
                  >
                    <Link href="/dashboard/habits">Añadir a mis hábitos</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
