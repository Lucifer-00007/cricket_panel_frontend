import { Sidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sites = ['Crickbuzz', 'Espn', 'NW18', 'Sportskeeda']

  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-background">
      <Sidebar sites={sites} />
      <main className="flex-1 p-6 md:p-8 overflow-auto bg-background/50 dark:bg-background/95">
        {children}
      </main>
    </div>
  );
}
