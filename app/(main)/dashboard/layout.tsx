import { Sidebar } from "./components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6">
        <div className="flex min-h-screen">
          <main className="flex-1 ml-72 pt-16">{children}</main>
        </div>
      </div>
    </div>
  );
}
