import Link from 'next/link'
import { LogoutButton } from './logout-button'

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-red-600">Panel Admin</h2>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Link href="/admin/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md">
            Inicio
          </Link>
          <Link href="/admin/dashboard/secciones" className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md">
            Textos de Inicio
          </Link>
          <Link href="/admin/dashboard/eventos" className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md">
            Eventos
          </Link>
          <Link href="/admin/dashboard/fotos" className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md">
            Galería de Fotos
          </Link>
        </nav>
        <div className="p-4 border-t">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
