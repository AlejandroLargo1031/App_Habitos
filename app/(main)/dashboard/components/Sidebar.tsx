"use client";
import { Button } from "../../../../Components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Flame, 
  TrendingUp,
  Trophy, 
  Droplets,
  CalendarCheck,
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 h-screen fixed left-0 pt-20 text-white p-6 shadow-xl border-r bg-white">
      <nav className="flex flex-col gap-2 mb-8">
        <Link href="/dashboard">
          <Button
            variant="ghost"
            className={`w-full justify-start gap-3 px-4 py-6 rounded-xl ${
              pathname === "/dashboard" ? "bg-gray-200" : ""
            }`}
          >
            <Home className="h-5 w-5 text-blue-300" />
            <span className="text-lg text-black">Inicio</span>
          </Button>
        </Link>

        <Link href="/dashboard/habits">
          <Button
            variant="ghost"
            className={`w-full justify-start gap-3 px-4 py-6 rounded-xl ${
              pathname === "/dashboard/habits" ? "bg-gray-200" : ""
            }`}
          >
            <CalendarCheck className="h-5 w-5 text-green-300" />
            <span className="text-lg text-black">Mis Hábitos</span>
          </Button>
        </Link>

        <Link href="/dashboard/progress">
          <Button
            variant="ghost"
            className={`w-full justify-start gap-3 px-4 py-6 rounded-xl ${
              pathname === "/dashboard/progress" ? "bg-gray-200" : ""
            }`}
          >
            <TrendingUp className="h-5 w-5 text-purple-300" />
            <span className="text-lg text-black">Progreso</span>
          </Button>
        </Link>

        <Link href="/dashboard/hydration">
          <Button
            variant="ghost"
            className={`w-full justify-start gap-3 px-4 py-6 rounded-xl ${
              pathname === "/dashboard/hydration" ? "bg-gray-200" : ""
            }`}
          >
            <Droplets className="h-5 w-5 text-blue-300" />
            <span className="text-lg text-black">Hidratación</span>
          </Button>
        </Link>

        <Link href="/dashboard/achievements">
          <Button
            variant="ghost"
            className={`w-full justify-start gap-3 px-4 py-6 rounded-xl ${
              pathname === "/dashboard/achievements" ? "bg-gray-200" : ""
            }`}
          >
            <Trophy className="h-5 w-5 text-yellow-400" />
            <span className="text-lg text-black">Logros</span>
          </Button>
        </Link>
      </nav>

      <div className="mt-12 pt-16 border-t border-black text-center">
        <div className="text-sm text-black mb-1">Creado por</div>
        <div className="flex items-center justify-center gap-2">
          <Flame className="h-4 w-4 text-yellow-400" />
          <span className="text-black font-medium">Alejandro Largo</span>
        </div>
        <div className="text-xs text-black mt-2">Versión 1.0.0</div>
      </div>
    </aside>
  );
}