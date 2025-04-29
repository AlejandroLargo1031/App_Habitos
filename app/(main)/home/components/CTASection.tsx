
import { Flame } from "lucide-react";
import { Button } from "../../../../Components/ui/button";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-green-600 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">
          ¿Listo para transformar tus hábitos?
        </h2>
        <p className="text-xl mb-10 max-w-2xl mx-auto">
          Únete a miles de personas que ya están construyendo una vida más 
          saludable y productiva.
        </p>
        <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
          <Link href="/sign-up">
            Empieza ahora - Es gratis!
          </Link>
        </Button> 
      </div>  
      <div className="flex justify-center mt-8 pt-8 text-center">
          <Flame className="h-4 w-4 text-yellow-400" />
              <span className="pl-2" > Creado por </span>
              <span className="text-white font-medium px-1"> Alejandro Largo </span>
              <span> versión 1.0.0 </span>
          </div> 
    </section>
  );
}