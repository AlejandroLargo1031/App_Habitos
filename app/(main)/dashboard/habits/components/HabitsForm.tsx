"use client";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Habit } from "@/app/types/habit";
import {
  GlassWater,
  Dumbbell,
  Book,
  Moon,
  Utensils,
  Music,
  HeartPulse,
  Laptop,
} from "lucide-react";

// Opciones de iconos disponibles
const ICON_OPTIONS = [
  {
    value: "exercise",
    label: "Ejercicio",
    icon: <Dumbbell className="h-5 w-5" />,
  },
  { value: "read", label: "Leer", icon: <Book className="h-5 w-5" /> },
  { value: "sleep", label: "Dormir", icon: <Moon className="h-5 w-5" /> },
  { value: "food", label: "Comida", icon: <Utensils className="h-5 w-5" /> },
  { value: "music", label: "Música", icon: <Music className="h-5 w-5" /> },
  { value: "health", label: "Salud", icon: <HeartPulse className="h-5 w-5" /> },
  { value: "work", label: "Trabajo", icon: <Laptop className="h-5 w-5" /> },
];

const CATEGORY_OPTIONS = [
  { value: "salud", label: "Salud" },
  { value: "productividad", label: "Productividad" },
];

const FREQUENCY_OPTIONS = [
  { value: "diario", label: "Diario" },
  { value: "semanal", label: "Semanal" },
];

type HabitFormProps = {
  onClose: () => void;
  onSuccess: (habit: Habit) => void;
};

export default function HabitForm({ onClose, onSuccess }: HabitFormProps) {
  const auth = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "",
    objetivo: 0,
    meta_unidad: "horas",
    frecuencia: "",
    icono: "exercise", // Valor por defecto
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (!formData.nombre || !formData.categoria || !formData.frecuencia) {
        throw new Error("Por favor complete todos los campos requeridos");
      }

      const token = await auth.getToken({ template: "django_backend" });
      if (!token) {
        throw new Error("No se pudo obtener el token de autenticación");
      }

      // Llamada REAL a la API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/habito/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: formData.nombre,
            categoria: formData.categoria,
            objetivo: formData.objetivo,
            meta_unidad: formData.meta_unidad,
            frecuencia: formData.frecuencia,
            icono: formData.icono,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear el hábito");
      }

      const newHabit: Habit = await response.json();
      onSuccess(newHabit);
    } catch (error) {
      console.error("Error:", error);
      setError(
        error instanceof Error ? error.message : "Ocurrió un error inesperado"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSelectedIcon = () => {
    const selected = ICON_OPTIONS.find((icon) => icon.value === formData.icono);
    return selected ? selected.icon : <GlassWater className="h-5 w-5" />;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 ">Crear nuevo hábito</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="nombre">Nombre del hábito*</Label>
          <Input
            id="nombre"
            value={formData.nombre}
            onChange={(e) =>
              setFormData({ ...formData, nombre: e.target.value })
            }
            required
          />
        </div>

        <div>
          <Label>Icono del hábito</Label>
          <Select
            value={formData.icono}
            onValueChange={(value) =>
              setFormData({ ...formData, icono: value })
            }
          >
            <SelectTrigger className="flex items-center gap-2">
              {getSelectedIcon()}
              <SelectValue placeholder="Selecciona un icono" />
            </SelectTrigger>

            <SelectContent>
              {ICON_OPTIONS.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="flex items-center gap-2"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="categoria">Categoría*</Label>
          <Select
            value={formData.categoria}
            onValueChange={(value) =>
              setFormData({ ...formData, categoria: value })
            }
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una categoría" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORY_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="objetivo">Meta diaria*</Label>
            <Input
              id="objetivo"
              type="number"
              min=""
              value={formData.objetivo}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  objetivo: parseInt(e.target.value) || 1,
                })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="meta_unidad">Unidad*</Label>
            <Select
              value={formData.meta_unidad}
              onValueChange={(value) =>
                setFormData({ ...formData, meta_unidad: value })
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona unidad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="minutos">minutos</SelectItem>
                <SelectItem value="horas">horas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="frecuencia">Frecuencia*</Label>
          <Select
            value={formData.frecuencia}
            onValueChange={(value) =>
              setFormData({ ...formData, frecuencia: value })
            }
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona frecuencia" />
            </SelectTrigger>
            <SelectContent>
              {FREQUENCY_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            className="bg-gradient-to-r from-blue-600 to-green-600 text-white transform transition duration-300 hover:scale-105"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creando..." : "Crear hábito"}
          </Button>
        </div>
      </form>
    </div>
  );
}
