"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { Button } from "@/Components/ui/button";
import { Progress } from "@/Components/ui/progress";
import { 
  Droplets, 
  Plus, 
  Bell, 
  Trophy,
  Flame,
  Zap,
  GlassWater,
  Clock,
  CheckCircle2,
  X,
} from "lucide-react";
import Link from "next/link";

interface HydrationData {
  today_record: {
    amount: number;
    goal: number;
  };
  weekly_records: {
    date: string;
    amount: number;
    goal: number;
  }[];
  reminders: {
    id: number;
    time: string;
    is_active: boolean;
  }[];
  stats: {
    current_streak: number;
    longest_streak: number;
  };
}

export default function HydrationPage() {
  const { getToken } = useAuth();
  const [hydrationData, setHydrationData] = useState<HydrationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHydrationData = async () => {
      try {
        const token = await getToken({ template: "django_backend" });
        if (!token) {
          setError("Authentication error");
          return;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/hydration/dashboard/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to load hydration data");
        
        const data = await res.json();
        setHydrationData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchHydrationData();
  }, [getToken]);

  const addGlass = async () => {
    try {
      const token = await getToken({ template: "django_backend" });
      if (!token) return;

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/hydration/add_glass/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) throw new Error("Failed to add glass");

      // Refresh data
      const updatedRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/hydration/dashboard/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedData = await updatedRes.json();
      setHydrationData(updatedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add glass");
    }
  };

  // const setDailyGoal = async (goal: number) => {
  //   try {
  //     const token = await getToken({ template: "django_backend" });
  //     if (!token) return;

  //     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/hydration/set_goal/`, {
  //       method: 'POST',
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ goal }),
  //     });

  //     if (!res.ok) throw new Error("Failed to set goal");

  //     // Refresh data
  //     const updatedRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/hydration/dashboard/`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     const updatedData = await updatedRes.json();
  //     setHydrationData(updatedData);
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : "Failed to set goal");
  //   }
  // };

  if (loading) return <div className="p-6 text-center">Loading your hydration data...</div>;
  if (error) return <div className="p-6 text-red-500 text-center">{error}</div>;
  if (!hydrationData) return <div className="p-6 text-center">No hydration data found</div>;

  const today = hydrationData.today_record || { amount: 0, goal: 8 };
  const weekly = hydrationData.weekly_records || [];
  const completionPercentage = Math.round((today.amount / today.goal) * 100);

  // Fill missing days in weekly data
  const daysOfWeek = ['M', 'M', 'J', 'V', 'S', 'D', 'L'];
  const fullWeekData = Array(7).fill(0).map((_, i) => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() - (6 - i));
    const dateStr = targetDate.toISOString().split('T')[0];
    const record = weekly.find(r => r.date === dateStr);
    return record ? record.amount : 0;
  });

  const maxWeeklyAmount = Math.max(...fullWeekData, 1); // Ensure at least 1 to avoid division by zero

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Droplets className="text-blue-500" /> Mi Hidratación
        </h1>
        <div className="flex gap-3">
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-semibold text-blue-800">Hoy</h3>
            <p className="text-blue-600">Meta: {today.goal} vasos</p>
          </div>
          <div className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            <Flame className="h-4 w-4" />
            <span className="font-medium">{hydrationData.stats?.current_streak || 0} días</span>
          </div>
        </div>

        <div className="flex justify-center gap-3 mb-6">
          {Array.from({ length: today.goal }).map((_, index) => (
            <div 
              key={index} 
              className={`w-12 h-16 rounded-lg flex items-end justify-center pb-2 ${
                index < today.amount 
                  ? "bg-blue-500 border-2 border-blue-600" 
                  : "bg-blue-100 border-2 border-blue-200"
              }`}
            >
              <GlassWater className={`h-5 w-5 ${
                index < today.amount ? "text-white" : "text-blue-300"
              }`} />
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <Progress 
            value={completionPercentage} 
            className="h-3 bg-blue-200"
          />
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-blue-800">
              {today.amount} de {today.goal} vasos ({completionPercentage}%)
            </span>
            <Button 
              size="sm" 
              className="bg-blue-600 hover:bg-blue-700 transform transition duration-300 hover:scale-105"
              onClick={addGlass}
            >
              <Plus className="h-4 w-4 mr-2" /> Registrar vaso
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Esta semana</h3>
          <div className="flex items-end gap-1 h-40">
            {fullWeekData.map((amount, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-blue-100 rounded-t-sm hover:bg-blue-200 transition"
                  style={{ height: `${(amount / maxWeeklyAmount) * 100}%` }}
                >
                  <div className="bg-blue-500 h-full rounded-t-sm"></div>
                </div>
                <span className="text-xs text-gray-500 mt-1">
                  {daysOfWeek[index]}
                </span>
                <span className="text-xs font-medium mt-1">{amount}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Recordatorios</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-blue-600 transform transition duration-300 hover:scale-105"
              asChild
            >
              <Link href="#">
                <Plus className="h-4 w-4 mr-2" /> Añadir
              </Link>
            </Button>
          </div>
          <div className="space-y-3">
            {hydrationData.reminders?.map((reminder) => (
              <div key={reminder.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">{reminder.time}</span>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-500 transform transition duration-300 hover:scale-105">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-cyan-50 to-cyan-100 border border-cyan-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Trophy className="h-6 w-6 text-yellow-400" />
          <h3 className="text-xl font-semibold text-cyan-800">Logros de hidratación</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border border-cyan-200 flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium">Días consecutivos</p>
              <p className="text-2xl font-bold text-cyan-800">{hydrationData.stats?.current_streak || 0}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-cyan-200 flex items-center gap-3">
            <Clock className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium">Mejor racha</p>
              <p className="text-2xl font-bold text-cyan-800">{hydrationData.stats?.longest_streak || 0} días</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-8 text-center text-white">
        <h3 className="text-2xl font-bold mb-3">¡El agua es vida!</h3>
        <p className="text-lg mb-6">Mantente hidratado para mejorar tu energía y concentración.</p>
        <Button 
          className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg transform transition duration-300 hover:scale-105"
          onClick={addGlass}
        >
          <Zap className="h-5 w-5 mr-2" /> Registrar mi próximo vaso
        </Button>
      </div>
    </div>
  );
}