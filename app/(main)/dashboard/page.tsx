import { auth } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardContent from "./components/DashboardContent";

export default async function DashboardPage() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId) {
    redirect("/sign-in");
  }

  if (!user) return <div>Not signed in</div>;

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          ¡Bienvenido de vuelta, {user?.firstName}!
        </h1>
        <p className="text-lg text-gray-600">
          Hoy es un gran día para mejorar tus hábitos
        </p>
      </div>
      <DashboardContent />
    </>
  );
}
