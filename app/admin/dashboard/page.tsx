import { getDashboardStats } from '@/app/actions/admin'

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats()

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Resumen</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Eventos Activos</h3>
          <p className="mt-2 text-4xl font-bold text-red-600">{stats.eventsCount}</p>
          <p className="mt-1 text-sm text-gray-500">Eventos programados en el calendario</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Textos Modificados</h3>
          <p className="mt-2 text-4xl font-bold text-red-600">{stats.sectionsCount}</p>
          <p className="mt-1 text-sm text-gray-500">Secciones con texto personalizado</p>
        </div>
      </div>

      <div className="mt-12 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Bienvenido al Panel de Control</h2>
        <p className="text-gray-600 mb-4">
          Desde aquí puedes administrar el contenido de tu página web de forma muy sencilla. Utiliza el menú lateral para navegar entre las diferentes opciones.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li><strong>Textos de Inicio:</strong> Cambia los títulos y descripciones de las secciones de tu página principal.</li>
          <li><strong>Eventos:</strong> Agrega nuevas fechas al calendario, modifica los existentes o elimínalos cuando pasen.</li>
          <li><strong>Galería de Fotos:</strong> Sube imágenes para mostrarlas en la sección principal.</li>
        </ul>
      </div>
    </div>
  )
}
