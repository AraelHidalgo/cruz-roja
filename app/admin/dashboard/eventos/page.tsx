import { getEvents, createEvent, deleteEvent } from '@/app/actions/events'

export default async function EventosPage() {
  const events = await getEvents()

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Administrar Eventos</h1>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Agregar Nuevo Evento</h2>
        <form action={createEvent} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Título</label>
              <input type="text" name="title" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white text-black" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Fecha</label>
              <input type="datetime-local" name="date" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white text-black" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Lugar (Opcional)</label>
              <input type="text" name="location" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white text-black" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Descripción</label>
              <textarea name="description" rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white text-black"></textarea>
            </div>
          </div>
          <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
            Guardar Evento
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Eventos Actuales</h2>
        {events.length === 0 ? (
          <p className="text-gray-500">No hay eventos programados.</p>
        ) : (
          <ul className="space-y-4">
            {events.map(event => (
              <li key={event.id} className="flex justify-between items-center p-4 border rounded-md">
                <div>
                  <h3 className="font-bold text-lg">{event.title}</h3>
                  <p className="text-sm text-gray-500">{new Date(event.date).toLocaleString()} - {event.location}</p>
                  <p className="text-sm mt-1">{event.description}</p>
                </div>
                <form action={async () => { 'use server'; await deleteEvent(event.id); }}>
                  <button type="submit" className="text-red-600 hover:text-red-800 font-medium">
                    Eliminar
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
