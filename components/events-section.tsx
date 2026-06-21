"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, MapPin, Clock, ArrowRight, ImageIcon, Droplet } from "lucide-react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface Event {
  id: string
  title: string
  date: Date
  description: string | null
  location: string | null
}

interface GalleryPost {
  id: string
  text: string | null
  imageUrls: string // JSON string
  createdAt: Date
}

interface UnifiedItem {
  id: string
  type: 'event' | 'post' | 'alert'
  date: Date
  title: string
  description: string | null
  location: string | null
  imageUrls: string[]
}

interface FeedSectionProps {
  events: Event[]
  posts: GalleryPost[]
  bloodStock?: Record<string, string>
}

const getBentoClasses = (index: number, total: number) => {
  if (total === 1) return "col-span-1 md:col-span-4 min-h-[400px]"
  if (total === 2) return "col-span-1 md:col-span-2 min-h-[350px]"
  if (total === 3) {
    if (index === 0) return "md:col-span-2 md:row-span-2 min-h-[400px]"
    return "md:col-span-2 md:row-span-1"
  }
  
  const i = index % 5
  if (i === 0) return "md:col-span-2 md:row-span-2"
  if (i === 1) return "md:col-span-1 md:row-span-1 lg:col-span-2 lg:row-span-1"
  if (i === 2) return "md:col-span-1 md:row-span-2 lg:col-span-1 lg:row-span-2"
  if (i === 3) return "md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1"
  if (i === 4) return "md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-1"
  return "col-span-1 row-span-1"
}

export function EventsSection({ events, posts, bloodStock }: FeedSectionProps) {
  const [selectedItem, setSelectedItem] = useState<UnifiedItem | null>(null)

  const criticalTypes = bloodStock
    ? Object.entries(bloodStock)
        .filter(([_, status]) => status === "Critico")
        .map(([type]) => type)
    : []

  const feedItems: UnifiedItem[] = [
    ...events.map(e => ({
      id: `evt-${e.id}`,
      type: 'event' as const,
      date: new Date(e.date),
      title: e.title,
      description: e.description,
      location: e.location,
      imageUrls: []
    })),
    ...posts.map(p => ({
      id: `post-${p.id}`,
      type: 'post' as const,
      date: new Date(p.createdAt),
      title: 'Actualización',
      description: p.text,
      location: null,
      imageUrls: JSON.parse(p.imageUrls) as string[]
    })),
    ...criticalTypes.map(type => ({
      id: `alert-blood-${type}`,
      type: 'alert' as const,
      date: new Date(),
      title: `🚨 Requerimiento Urgente: Sangre ${type}`,
      description: `La delegación de Tapachula se encuentra en desabasto crítico de sangre tipo ${type}. Si eres de este tipo o compatible, tu donación puede salvar vidas hoy mismo.`,
      location: 'Banco de Sangre, Tapachula',
      imageUrls: []
    }))
  ].sort((a, b) => b.date.getTime() - a.date.getTime())

  if (feedItems.length === 0) return null

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="eventos">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="block text-sm font-bold tracking-widest text-red-600 uppercase mb-3"
          >
            Últimas Novedades
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-clash text-3xl md:text-5xl font-bold text-black mb-6"
          >
            Nuevas Publicaciones y Eventos
          </motion.h2>
        </div>

        {/* Bento Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 ${feedItems.length >= 4 ? 'auto-rows-[220px]' : ''}`}>
          {feedItems.map((item, index) => {
            const isFeatured = index % 5 === 0 || feedItems.length < 4
            const isAlert = item.type === 'alert'
            const hasImage = item.imageUrls.length > 0 && !isAlert
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`group relative rounded-[24px] overflow-hidden border-4 transition-all cursor-pointer flex flex-col justify-between ${getBentoClasses(index, feedItems.length)} ${
                  isAlert 
                    ? 'border-red-600 bg-red-50 hover:bg-red-100/70 shadow-[6px_6px_0px_0px_rgba(220,38,38,1)] p-6' 
                    : hasImage 
                    ? 'border-red-100 hover:border-red-200 hover:shadow-lg bg-black' 
                    : 'border-red-100 hover:border-red-200 hover:shadow-lg bg-white p-6'
                }`}
                onClick={() => setSelectedItem(item)}
              >
                {/* Background Image para posts */}
                {hasImage && (
                  <>
                    <Image 
                      src={item.imageUrls[0]} 
                      alt={item.description || item.title} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  </>
                )}

                {/* Decoration gradient for featured event items */}
                {!hasImage && !isAlert && isFeatured && (
                  <div className="absolute -right-20 -top-20 w-64 h-64 bg-red-50 rounded-full blur-3xl group-hover:bg-red-100 transition-colors pointer-events-none" />
                )}

                <div className={`relative z-10 ${hasImage ? 'p-6 h-full flex flex-col justify-end' : ''}`}>
                  <div className={`flex items-center ${hasImage ? 'text-white/90' : isAlert ? 'text-red-600 font-bold' : isFeatured ? 'text-red-600' : 'text-gray-500'} mb-4`}>
                    {item.type === 'event' ? (
                      <Calendar className="w-5 h-5 mr-2" />
                    ) : item.type === 'alert' ? (
                      <div className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping inline-block mr-1.5" />
                        <Droplet className="w-5 h-5 mr-2 fill-red-600 text-red-600" />
                      </div>
                    ) : (
                      <Clock className="w-5 h-5 mr-2" />
                    )}
                    <span className="font-bold text-sm tracking-wide uppercase">
                      {item.type === 'alert' 
                        ? 'Alerta Crítica' 
                        : item.date.toLocaleDateString('es-MX', {
                            day: 'numeric',
                            month: 'short',
                            year: isFeatured ? 'numeric' : undefined
                          })}
                    </span>
                    {item.imageUrls.length > 1 && (
                      <span className="ml-auto flex items-center text-xs bg-black/50 backdrop-blur-md px-2 py-1 rounded-full text-white">
                        <ImageIcon className="w-3 h-3 mr-1" />
                        {item.imageUrls.length}
                      </span>
                    )}
                  </div>
                  
                  <h4 className={`font-bold mb-2 ${hasImage ? 'text-white' : 'text-gray-900'} ${isFeatured || hasImage || isAlert ? 'text-2xl md:text-3xl line-clamp-3' : 'text-lg line-clamp-2'}`}>
                    {item.title}
                  </h4>
                  
                  {item.description && (isFeatured || hasImage || isAlert) && (
                    <p className={`${hasImage ? 'text-white/80' : isAlert ? 'text-zinc-700 font-medium' : 'text-gray-600'} text-sm line-clamp-3 mb-4`}>
                      {item.description}
                    </p>
                  )}
                </div>

                {!hasImage && (
                  <div className={`relative z-10 flex items-center justify-between mt-auto pt-4 border-t ${isAlert ? 'border-red-200' : 'border-gray-50'}`}>
                    {item.location ? (
                      <div className={`flex items-center ${isAlert ? 'text-red-700 font-bold' : 'text-gray-500'} text-sm max-w-[70%]`}>
                        <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>
                    ) : (
                      <div></div>
                    )}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isAlert 
                        ? 'bg-red-600 text-white hover:bg-red-700' 
                        : 'bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white'
                    }`}>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Details Modal */}
      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="sm:max-w-2xl bg-white rounded-3xl p-0 overflow-hidden border-0">
          {selectedItem && (
            <div className="flex flex-col max-h-[90vh]">
              {/* Header */}
              <div className="bg-red-600 p-6 md:p-8 text-white relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2" />
                <DialogHeader>
                  <DialogTitle className="text-2xl md:text-3xl font-bold leading-tight">
                    {selectedItem.title}
                  </DialogTitle>
                </DialogHeader>
              </div>
              
              {/* Body */}
              <div className="p-0 overflow-y-auto">
                {/* Carrusel de Imágenes en Modal */}
                {selectedItem.imageUrls.length > 0 && (
                  <div className="relative bg-black w-full">
                    {selectedItem.imageUrls.length === 1 ? (
                      <div className="relative aspect-video w-full">
                        <Image src={selectedItem.imageUrls[0]} alt="Post image" fill className="object-contain" />
                      </div>
                    ) : (
                      <Carousel className="w-full">
                        <CarouselContent>
                          {selectedItem.imageUrls.map((url, i) => (
                            <CarouselItem key={i}>
                              <div className="relative aspect-video w-full bg-black">
                                <Image src={url} alt={`Post image ${i+1}`} fill className="object-contain" />
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <div className="absolute top-1/2 left-4 -translate-y-1/2">
                          <CarouselPrevious className="relative translate-y-0 left-0 hover:bg-white/90 bg-white/70 border-none h-8 w-8" />
                        </div>
                        <div className="absolute top-1/2 right-4 -translate-y-1/2">
                          <CarouselNext className="relative translate-y-0 right-0 hover:bg-white/90 bg-white/70 border-none h-8 w-8" />
                        </div>
                        <div className="absolute top-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm z-10">
                          {selectedItem.imageUrls.length} fotos
                        </div>
                      </Carousel>
                    )}
                  </div>
                )}

                <div className="p-6 md:p-8 space-y-6">
                  {/* Date & Time */}
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 mr-4 text-red-600">
                      {selectedItem.type === 'event' ? (
                        <Calendar className="w-5 h-5" />
                      ) : selectedItem.type === 'alert' ? (
                        <Droplet className="w-5 h-5 fill-red-600 text-red-600 animate-pulse" />
                      ) : (
                        <Clock className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        {selectedItem.type === 'event' 
                          ? 'Fecha del Evento' 
                          : selectedItem.type === 'alert' 
                          ? 'Gravedad de Alerta' 
                          : 'Publicado el'}
                      </p>
                      <p className="text-gray-900 font-bold">
                        {selectedItem.type === 'alert' ? (
                          'CRÍTICA (URGENTE)'
                        ) : (
                          selectedItem.date.toLocaleDateString('es-MX', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })
                        )}
                      </p>
                      {selectedItem.type === 'event' && (
                        <p className="text-gray-600">
                          {selectedItem.date.toLocaleTimeString('es-MX', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Location */}
                  {selectedItem.location && (
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 mr-4 text-red-600">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Ubicación</p>
                        <p className="text-gray-900 font-medium">{selectedItem.location}</p>
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  {selectedItem.description && (
                    <div className="pt-6 border-t border-gray-100">
                      <p className="text-sm text-gray-500 font-medium mb-2">
                        {selectedItem.type === 'event' 
                          ? 'Acerca de este evento' 
                          : selectedItem.type === 'alert' 
                          ? 'Detalles de la Emergencia' 
                          : 'Detalles'}
                      </p>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {selectedItem.description}
                      </p>
                    </div>
                  )}

                  {/* Action CTA for Alerts */}
                  {selectedItem.type === 'alert' && (
                    <div className="pt-6 border-t border-gray-100 flex justify-end">
                      <a 
                        href="/banco-de-sangre" 
                        onClick={() => setSelectedItem(null)}
                        className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-sm"
                      >
                        Ir a Donar Ahora
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
