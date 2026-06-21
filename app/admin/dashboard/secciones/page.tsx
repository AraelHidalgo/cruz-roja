import { getAllSections, saveSection } from '@/app/actions/sections'

const SECTIONS = [
  { id: 'hero', name: 'Inicio (Hero)' },
  { id: 'corazon', name: 'Nuestra Esencia (Corazón)' },
  { id: 'escudo', name: 'Nuestra Misión (Escudo)' },
  { id: 'servicios', name: 'Servicios Gratuitos' },
]

export default async function SeccionesPage() {
  const savedSections = await getAllSections()
  
  // Create a map for easy lookup
  const sectionData = savedSections.reduce((acc, sec) => {
    acc[sec.sectionId] = sec
    return acc
  }, {} as Record<string, any>)

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Textos e Imágenes de Inicio</h1>

      <div className="space-y-8">
        {SECTIONS.map((section) => {
          const data = sectionData[section.id] || {}

          return (
            <div key={section.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-red-600 mb-4">{section.name}</h2>
              
              <form action={saveSection} className="space-y-4">
                <input type="hidden" name="sectionId" value={section.id} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Título Principal</label>
                    <input 
                      type="text" 
                      name="title" 
                      defaultValue={data.title || ''} 
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white text-black" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Imagen de Fondo/Acompañamiento</label>
                    <input 
                      type="file" 
                      name="image" 
                      accept="image/*"
                      className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100" 
                    />
                    {data.imageUrl && (
                      <p className="mt-2 text-sm text-gray-500">
                        Imagen actual: <a href={data.imageUrl} target="_blank" className="text-blue-600 underline">Ver imagen</a>
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Texto / Descripción</label>
                    <textarea 
                      name="content" 
                      rows={4} 
                      defaultValue={data.content || ''} 
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white text-black"
                    ></textarea>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors">
                    Guardar Cambios
                  </button>
                </div>
              </form>
            </div>
          )
        })}
      </div>
    </div>
  )
}
