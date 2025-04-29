import { Button } from "../../../../Components/ui/button";
import Link from "next/link";
import { 
  Home, 
  Flame, 
  TrendingUp,
  Trophy, 
  Droplets,
  CalendarCheck,
} from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-72 h-screen fixed left-0 pt-20 bg-gradient-to-b from-blue-600 to-green-600 text-white p-6 shadow-xl border-r">
      {/* Encabezado con logo y título */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-white/10 rounded-lg">
          <Flame className="h-6 w-6 text-yellow-400" />
        </div>
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-100">
          AppHábitos 
        </h2>
      </div>

      {/* Menú principal */}
      <nav className="flex flex-col gap-2 mb-8">
        <Link href="/dashboard">
          <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-white/10 hover:text-white px-4 py-6 rounded-xl">
            <Home className="h-5 w-5 text-blue-300" />
            <span className="text-lg">Inicio</span>
          </Button>
        </Link>
        
        <Link href="/dashboard/habits">
          <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-white/10 hover:text-white px-4 py-6 rounded-xl">
            <CalendarCheck className="h-5 w-5 text-green-300" />
            <span className="text-lg">Mis Hábitos</span>
          </Button>
        </Link>
        
        <Link href="/dashboard/progress">
          <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-white/10 hover:text-white px-4 py-6 rounded-xl">
            <TrendingUp className="h-5 w-5 text-purple-300" />
            <span className="text-lg">Progreso</span>
            <span className="ml-auto bg-yellow-500 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
              Nuevo
            </span>
          </Button>
        </Link>
        
        <Link href="/dashboard/hydration">
          <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-white/10 hover:text-white px-4 py-6 rounded-xl">
            <Droplets className="h-5 w-5 text-blue-300" />
            <span className="text-lg">Hidratación</span>
          </Button>
        </Link>
        
        <Link href="/dashboard/achievements">
          <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-white/10 hover:text-white px-4 py-6 rounded-xl">
            <Trophy className="h-5 w-5 text-yellow-300" />
            <span className="text-lg">Logros</span>
          </Button>
        </Link>
      </nav>

      {/* Créditos del creador */}
      <div className="mt-12 pt-16 border-t border-blue-700 text-center">
        <div className="text-sm text-white-300 mb-1">Creado por</div>
        <div className="flex items-center justify-center gap-2">
          <Flame className="h-4 w-4 text-yellow-400" />
          <span className="text-white font-medium">Alejandro Largo</span>
        </div>
        <div className="text-xs text-white-400 mt-2">Versión 1.0.0</div>
      </div>
    </aside>
  ); 
}