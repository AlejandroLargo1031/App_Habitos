import { Sidebar } from "./components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <main className="w-full md:ml-72 pt-16">
          {children}
        </main>
      </div>
    </div>
  );
}
