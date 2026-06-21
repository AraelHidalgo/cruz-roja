import { getGalleryPosts, createGalleryPost, deleteGalleryPost } from '@/app/actions/gallery'
import Image from 'next/image'

export default async function FotosPage() {
  const posts = await getGalleryPosts()

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Galería de Fotos (Publicaciones)</h1>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Nueva Publicación Estilo Facebook</h2>
        <form action={createGalleryPost} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Texto / Explicación</label>
            <textarea 
              name="text" 
              rows={4} 
              placeholder="¿Qué está pasando?"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white text-black"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Fotos (Puedes seleccionar varias)</label>
            <input 
              type="file" 
              name="images" 
              accept="image/*"
              multiple
              required
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100" 
            />
          </div>
          <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
            Publicar
          </button>
        </form>
      </div>

      <div className="space-y-8">
        <h2 className="text-xl font-bold text-gray-900">Publicaciones Anteriores</h2>
        {posts.length === 0 ? (
          <p className="text-gray-500">No hay publicaciones todavía.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => {
              const urls = JSON.parse(post.imageUrls) as string[]
              return (
                <div key={post.id} className="bg-white border rounded-xl overflow-hidden shadow-sm flex flex-col">
                  {/* Photo Preview (just showing the first photo for admin UI) */}
                  <div className="relative h-48 w-full bg-gray-100">
                    {urls.length > 0 && (
                      <Image src={urls[0]} alt="Preview" fill className="object-cover" />
                    )}
                    {urls.length > 1 && (
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        +{urls.length - 1} fotos
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <p className="text-gray-800 text-sm whitespace-pre-wrap mb-4 line-clamp-4">
                      {post.text || "Sin texto"}
                    </p>
                    
                    <div className="flex justify-between items-center border-t pt-3">
                      <span className="text-xs text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                      <form action={async () => { 'use server'; await deleteGalleryPost(post.id); }}>
                        <button type="submit" className="text-red-600 hover:text-red-800 text-sm font-medium">
                          Eliminar
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
