import Link from 'next/link'
import { LogoutButton } from './logout-button'
import { Home, FileText, Calendar, Image as ImageIcon, Droplet, Heart } from 'lucide-react'

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-sm border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-red-600 flex items-center gap-2">
            <Heart className="w-6 h-6 fill-red-600 animate-pulse text-red-600" />
            Panel Admin
          </h2>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1.5">
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all font-medium">
            <Home className="w-5 h-5" />
            Inicio
          </Link>
          <Link href="/admin/dashboard/secciones" className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all font-medium">
            <FileText className="w-5 h-5" />
            Textos de Inicio
          </Link>
          <Link href="/admin/dashboard/eventos" className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all font-medium">
            <Calendar className="w-5 h-5" />
            Eventos
          </Link>
          <Link href="/admin/dashboard/fotos" className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all font-medium">
            <ImageIcon className="w-5 h-5" />
            Galería de Fotos
          </Link>
          <Link href="/admin/dashboard/sangre" className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all font-medium">
            <Droplet className="w-5 h-5" />
            Inventario Sangre
          </Link>
          <Link href="/admin/dashboard/donaciones" className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all font-medium">
            <Heart className="w-5 h-5" />
            Metas de Donación
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-100">
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
