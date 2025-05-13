/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/Components/ui/button";
import { Progress } from "@/Components/ui/progress";
import { DayPicker } from "react-day-picker";
import { toast } from "sonner";
import { Habit, UpdateData } from "@/app/types/habit";
import HabitForm from "@/app/(main)/dashboard/habits/components/HabitsForm";
import "react-day-picker/dist/style.css";
import {
  Flame,
  Plus,
  CalendarIcon,
  CheckCircle2,
  Dumbbell,
  Trash2,
  Menu,
  Book,
  HeartPulse,
  Laptop,
  Moon,
  Music,
  Utensils,
} from "lucide-react";
import MotivationalPhrase from "./MotivationalPhrase";

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "exercise":
      return <Dumbbell className="h-5 w-5" />;
    case "read":
      return <Book className="h-5 w-5" />;
    case "sleep":
      return <Moon className="h-5 w-5" />;
    case "food":
      return <Utensils className="h-5 w-5" />;
    case "music":
      return <Music className="h-5 w-5" />;
    case "health":
      return <HeartPulse className="h-5 w-5" />;
    case "work":
      return <Laptop className="h-5 w-5" />;
    default:
      return <CheckCircle2 className="h-5 w-5" />;
  }
};

export default function HabitsList() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const [selected, setSelected] = useState<Date | undefined>(undefined);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [completedDates, setCompletedDates] = useState<Date[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [personalRecord] = useState<number>(0);
  const [currentDate, setCurrentDate] = useState<string>("");

  // Funciones auxiliares
  const parseApiDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const formatDate = useCallback((date: Date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const isHabitCompletedToday = useCallback((habit: Habit) => {
    const today = new Date();
    return (habit.completed_dates || []).some((dateStr) =>
      isSameDay(parseApiDate(dateStr), today)
    );
  }, []);

  const calculateCompletedDates = useCallback((habits: Habit[]) => {
    const uniqueDates: Date[] = [];
    habits.forEach((habit) => {
      (habit.completed_dates || []).forEach((dateStr) => {
        try {
          const date = parseApiDate(dateStr);
          if (!uniqueDates.some((d) => isSameDay(d, date))) {
            uniqueDates.push(date);
          }
        } catch (error) {
          console.error("Fecha inválida:", dateStr);
        }
      });
    });
    setCompletedDates(uniqueDates);
  }, []);

  const modifiers = useMemo(
    () => ({
      completed: completedDates,
      today: new Date(),
    }),
    [completedDates]
  );

  const modifiersStyles = useMemo(
    () => ({
      completed: {
        backgroundColor: "#4ade80",
        color: "white",
        borderRadius: "50%",
      },
      today: {
        backgroundColor: "#3b82f6",
        borderRadius: "50%",
        color: "white",
      },
    }),
    []
  );

  // Obtener hábitos
  const fetchHabits = useCallback(async () => {
    if (!isLoaded || !isSignedIn) return;
    try {
      setIsLoading(true);
      const token = await getToken({ template: "django_backend" });
      if (!token) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/habito/list/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data: Habit[] = await res.json();

      setHabits(data);
      calculateCompletedDates(data);
      setLastUpdated(formatDate(new Date()));
    } catch (error) {
      console.error("Error al cargar hábitos:", error);
      toast.error("Error al cargar hábitos");
    } finally {
      setIsLoading(false);
    }
  }, [isLoaded, isSignedIn, getToken, calculateCompletedDates, formatDate]);

  // Sistema de reinicio diario mejorado
  const checkAndResetDailyProgress = useCallback(async () => {
    const today = new Date();
    const todayFormatted = formatDate(today);

    if (lastUpdated !== todayFormatted) {
      try {
        setIsLoading(true);
        const token = await getToken({ template: "django_backend" });

        // Llamar a endpoint backend para reiniciar progresos
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}api/habito/reset_daily_progress/`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          await fetchHabits();
          setLastUpdated(todayFormatted);
          toast.info("¡Nuevo día! Tus hábitos se han reiniciado");
        }
      } catch (error) {
        console.error("Error al reiniciar progresos:", error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [lastUpdated, formatDate, getToken, fetchHabits]);

  // Verificación de cambio de día
  useEffect(() => {
    const checkDayChange = () => {
      const today = new Date();
      const todayFormatted = formatDate(today);
      setCurrentDate(todayFormatted);

      if (lastUpdated !== todayFormatted) {
        checkAndResetDailyProgress();
      }
    };

    // Verificar inmediatamente y luego cada minuto
    checkDayChange();
    const interval = setInterval(checkDayChange, 60000);
    return () => clearInterval(interval);
  }, [lastUpdated, checkAndResetDailyProgress, formatDate]);

  // HabitList.tsx
  const incrementProgress = useCallback(
    async (habitId: string) => {
      if (isLoading) return;

      try {
        setIsLoading(true);
        const token = await getToken({ template: "django_backend" });
        const habitToUpdate = habits.find((h) => h.id === habitId);

        if (!habitToUpdate) {
          throw new Error("Hábito no encontrado");
        }

        const todayFormatted = formatDate(new Date());
        const isCompleted = isHabitCompletedToday(habitToUpdate);

        if (isCompleted) {
          toast.info("Este hábito ya fue completado hoy");
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}api/habito/${habitId}/actualizar/`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              actual: Math.min(
                habitToUpdate.actual + 1,
                habitToUpdate.objetivo
              ),
              completed_dates: [
                ...habitToUpdate.completed_dates,
                todayFormatted,
              ],
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || JSON.stringify(errorData));
        }

        // Actualizar lista completa desde el backend
        await fetchHabits();
        toast.success("¡Progreso actualizado!");
      } catch (error: any) {
        toast.error(error.message || "Error al actualizar");
      } finally {
        setIsLoading(false);
      }
    },
    [
      habits,
      isLoading,
      getToken,
      fetchHabits,
      formatDate,
      isHabitCompletedToday,
    ]
  );

  // Resto de tus funciones (deleteHabit, handleNewHabit) permanecen iguales
  const deleteHabit = useCallback(
    async (habitId: string) => {
      if (isLoading) {
        toast.error("Operación en curso");
        return;
      }

      try {
        setIsLoading(true);
        const token = await getToken({ template: "django_backend" });
        if (!token) {
          toast.error("No se pudo obtener el token de autenticación");
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}api/habito/${habitId}/eliminar/`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message ||
              `Error ${response.status}: ${response.statusText}`
          );
        }

        const updatedHabits = habits.filter((h) => h.id !== habitId);
        setHabits(updatedHabits);
        calculateCompletedDates(updatedHabits);
        toast.success("Hábito eliminado exitosamente");
      } catch (error: any) {
        console.error("Error al eliminar hábito:", error);
        toast.error(
          `Error al eliminar: ${error.message || "Error desconocido"}`
        );
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, getToken, habits, calculateCompletedDates]
  );

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  const handleNewHabit = useCallback(
    (newHabit: Habit) => {
      const updatedHabits = [...habits, newHabit];
      setHabits(updatedHabits);
      calculateCompletedDates(updatedHabits);
      setShowForm(false);
      toast.success("Hábito creado exitosamente");
    },
    [habits, calculateCompletedDates]
  );

  // Cálculos para la UI
  const completedPercentage = useMemo(() => {
    const validHabits = habits.filter((h) => h.objetivo > 0);
    const completedCount = validHabits.filter(
      (h) => (h.actual || 0) >= h.objetivo
    ).length;
    return validHabits.length
      ? Math.min(100, Math.round((completedCount / validHabits.length) * 100))
      : 0;
  }, [habits]);

  const bestStreak = useMemo(
    () => Math.max(0, ...habits.map((h) => h.racha_actual || 0)),
    [habits]
  );
  const recordStreak = useMemo(
    () => Math.max(...habits.map((h) => h.racha_record || 0), personalRecord),
    [habits, personalRecord]
  );

  // Calcular días en racha actual
  const getStreakDates = useCallback(() => {
    const streakDates: Date[] = [];
    habits.forEach((habit) => {
      const dates = habit.completed_dates
        .map(parseApiDate)
        .sort((a, b) => a.getTime() - b.getTime());

      let currentStreak: Date[] = [];
      dates.forEach((date, index) => {
        if (
          index === 0 ||
          dates[index - 1].getTime() === date.getTime() - 86400000
        ) {
          currentStreak.push(date);
        } else {
          currentStreak = [date];
        }
      });

      if (currentStreak.length >= 3) {
        // Destacar rachas de 3+ días
        streakDates.push(...currentStreak);
      }
    });
    return streakDates;
  }, [habits]);

  // Obtener longitud de racha para fecha específica
  const getStreakForDate = useCallback(
    (date: Date) => {
      const dateStr = formatDate(date);
      return Math.max(
        ...habits.map(
          (habit) =>
            habit.completed_dates
              .sort()
              .reverse()
              .findIndex((d) => d === dateStr) + 1
        )
      );
    },
    [habits, formatDate]
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Flame className="text-orange-500" /> Mis Hábitos
        </h1>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-blue-600 to-green-600 text-white transform transition duration-300 hover:scale-105"
          disabled={isLoading}
        >
          <Plus className="h-4 w-4 mr-2" /> Nuevo hábito
        </Button>
      </div>

      {showForm && (
        <HabitForm
          onClose={() => setShowForm(false)}
          onSuccess={handleNewHabit}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">
            Tu progreso hoy
          </h3>
          <div className="flex items-end gap-2 mb-3">
            <p className="text-4xl font-bold text-blue-900">
              {completedPercentage}%
            </p>
            <p className="text-blue-700 mb-1">de hábitos completados</p>
          </div>
          <Progress value={completedPercentage} className="h-3 bg-blue-200" />

          <div className="mt-4 pt-4 border-t border-blue-200 flex justify-between">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-900">
                {habits.length}
              </p>
              <p className="text-sm text-blue-600">Hábitos activos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-900">{bestStreak}</p>
              <p className="text-sm text-blue-600">Mejor racha actual</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-900">{recordStreak}</p>
              <p className="text-sm text-blue-600">Récord personal</p>
            </div>
          </div>
          <div className="mt-20 text-center">
            <MotivationalPhrase />
          </div>
        </div>

        <div className="flex-col justify-center items-center  bg-white border border-gray-200 rounded-xl p-2 shadow-sm">
          <div className="flex justify-center items-center mb-5">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <CalendarIcon className="text-blue-600" /> Calendario de hábitos
            </h3>
          </div>
          <div className="flex justify-center items-center mb-5">
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={setSelected}
              modifiers={{
                completed: completedDates,
                today: new Date(),
                streak: getStreakDates(), // Función adicional para destacar rachas
              }}
              modifiersStyles={modifiersStyles}
              styles={{
                day: {
                  margin: "0.2em",
                  transition: "all 0.2s ease-in-out",
                  fontSize: "0.9rem",
                },
                caption: {
                  fontSize: "1rem",
                  fontWeight: "600",
                },
              }}
              footer={
                <div className="mt-2 text-sm text-gray-600">
                  {selected
                    ? `Días consecutivos: ${getStreakForDate(selected)}`
                    : "Selecciona una fecha para ver detalles"}
                </div>
              }
            />
          </div>
          <div className="mt-5 flex justify-center items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="text-sm text-gray-600">Completado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span className="text-sm text-gray-600">No completado</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Menu className="text-blue-600" /> Hábitos para hoy
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {habits.map((habit) => (
            <div
              key={habit.id}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-100 rounded-lg">
                    {habit.icono ? (
                      getIconComponent(habit.icono)
                    ) : (
                      <CheckCircle2 className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg text-gray-800">
                      {habit.nombre}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {habit.objetivo} {habit.meta_unidad}{" "}
                      {habit.frecuencia === "diario"
                        ? "al día"
                        : habit.frecuencia === "semanal"
                        ? "por semana"
                        : "al mes"}
                    </p>

                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1 text-sm text-blue-600">
                        <Flame className="h-4 w-4" /> {habit.racha_actual || 0}{" "}
                        días
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <CheckCircle2 className="h-4 w-4" /> {habit.actual || 0}
                        /{habit.objetivo}
                      </div>
                    </div>

                    <div className="mt-3 w-full">
                      <Progress
                        value={Math.min(
                          100,
                          Math.max(
                            0,
                            ((habit.actual || 0) /
                              (habit.objetivo > 0 ? habit.objetivo : 1)) *
                              100
                          )
                        )}
                        className="h-2 bg-gray-200"
                      />
                    </div>

                    <div className="mt-3 flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => incrementProgress(habit.id)}
                        disabled={isHabitCompletedToday(habit) || isLoading}
                        className="bg-green-50 text-green-600 hover:bg-green-100"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        {isHabitCompletedToday(habit)
                          ? "Completado"
                          : "Registrar"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteHabit(habit.id)}
                        disabled={isLoading}
                        className="bg-red-50 text-red-600 hover:bg-red-100"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Eliminar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
