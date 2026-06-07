import Link from "next/link";
import QueryProvider from "@/shared/QueryProvider";

export default function OrganizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
        {/* Sidebar Lateral */}
        <aside className="w-full md:w-64 bg-white border-r border-gray-200 flex-shrink-0">
          <div className="h-16 flex items-center px-6 border-b border-gray-200">
            <span className="text-xl font-bold text-blue-600">MeEvent Panel</span>
          </div>
          <nav className="p-4 space-y-1">
            <Link 
              href="/organizer/dashboard" 
              className="block px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 rounded-lg"
            >
              Mis Eventos
            </Link>
            <Link 
              href="/organizer/events/create" 
              className="block px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Crear Evento
            </Link>
          </nav>
        </aside>

        {/* Contenido Principal Dinámico */}
        <main className="flex-1 p-6 md:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </QueryProvider>
  );
}