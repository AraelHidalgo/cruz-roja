"use client"

import { useEffect, useRef, useState } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi, // Importamos el tipo para la API
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { motion, AnimatePresence } from "framer-motion"

// Definimos los mensajes por cada imagen
const SLIDES = [
  {
    id: 1,
    image: "/carousel/1.jpeg",
    subtitle: "RESCATE URBANO",
    title: "Primeros en llegar, últimos en irse",
  },
  {
    id: 2,
    image: "/carousel/2.jpeg",
    subtitle: "ATENCIÓN MÉDICA",
    title: "Cada segundo cuenta para salvar una vida",
  },
  {
    id: 3,
    image: "/carousel/3.jpeg",
    subtitle: "DESASTRES NATURALES",
    title: "Nuestra fuerza es tu esperanza en la tormenta",
  },
  {
    id: 4,
    image: "/carousel/4.jpeg",
    subtitle: "CAPACITACIÓN VITAL",
    title: "Formando héroes en el corazón de la comunidad",
  },
  {
    id: 5,
    image: "/carousel/5.jpeg",
    subtitle: "BANCO DE SANGRE",
    title: "Un regalo de vida para quien más lo necesita",
  },
  {
    id: 6,
    image: "/carousel/6.jpeg",
    subtitle: "APOYO HUMANITARIO",
    title: "Llevando alivio donde el dolor parece eterno",
  },
]

export function EscudoSection() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  // Estado para controlar la API del carrusel si quisieras animaciones extra
  const [api, setApi] = useState<CarouselApi>()

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const sectionHeight = rect.height
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + sectionHeight)))
        setScrollProgress(progress)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section ref={sectionRef} className="min-h-screen py-24 px-6 relative overflow-hidden">
      {/* Fondo */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-rose-100 via-90% to-red-300" />

      {/* Grano de textura */}
      <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='6' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)' /%3E%3C/svg%3E")`,
            backgroundSize: "200px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Cabecera con Parallax */}
        <div
          className="mb-16"
          style={{
            transform: `translateY(${scrollProgress * -50}px)`,
            opacity: 1 - scrollProgress * 0.3,
          }}
        >
          <h2 className="font-clash text-5xl md:text-7xl font-bold mb-4 leading-tight text-black uppercase tracking-tight">EL ESCUDO</h2>
          <p className="font-clash text-xl md:text-2xl text-vital font-semibold">Rescate y Desastres</p>
          <p className="font-clash text-lg text-black/80 mt-4 max-w-2xl leading-relaxed">
            Cuando los desastres llegan, nosotros no retrocedemos. Estamos listos para actuar.
          </p>
        </div>

        {/* Carrusel */}
        <div className="relative mb-12">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              {SLIDES.map((slide) => (
                <CarouselItem key={slide.id}>
                  <div className="relative rounded-[32px] overflow-hidden shadow-brutal border-4 border-red-300 group">
                    <div className="aspect-[16/9] bg-gray-100 relative">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        style={{
                          filter: "contrast(1.1) grayscale(0.2)",
                        }}
                      />
                      {/* Overlay con mensajes dinámicos */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end p-8 md:p-12">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <p className="font-montserrat text-sm md:text-base uppercase tracking-[0.2em] text-vital font-bold mb-2">
                            {slide.subtitle}
                          </p>
                          <h3 className="font-montserrat text-2xl md:text-6xl font-semibold leading-[0.9] max-w-2xl text-white uppercase italic">
                            {slide.title}
                          </h3>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-4 md:static md:translate-x-0 md:mt-6 md:justify-end">
              <CarouselPrevious className="static translate-y-0 bg-white border-2 border-vital text-vital hover:bg-vital hover:text-white" />
              <CarouselNext className="static translate-y-0 bg-white border-2 border-vital text-vital hover:bg-vital hover:text-white" />
            </div>
          </Carousel>
        </div>

        {/* Stats y Disaster Cards (Se mantienen igual) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { val: "1985", txt: "Desde el sismo de 1985, siempre presentes." },
            { val: "72h", txt: "Movilización crítica en las primeras horas." },
            { val: "100K+", txt: "Vidas impactadas en situaciones críticas." }
          ].map((stat, i) => (
            <div key={i} className="bg-vital text-white rounded-[32px] p-8 shadow-brutal border-4 border-red-700 hover:-translate-y-1 transition-transform">
              <div className="font-montserrat text-5xl md:text-6xl font-bold mb-2">{stat.val}</div>
              <p className="font-inter text-base opacity-90">{stat.txt}</p>
            </div>
          ))}
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-[32px] p-8 md:p-12 shadow-brutal border-4 border-red-300">
          <h3 className="font-montserrat text-3xl md:text-4xl font-bold mb-8 text-black uppercase">Historial de Respuesta</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { t: "Sismos 1985 y 2017", d: "Rescate masivo y reconstrucción emocional." },
              { t: "Huracanes Otis & Ingrid", d: "Puente de ayuda en zonas incomunicadas." },
              { t: "Explosión de Tlahuelilpan", d: "Triaje de emergencia y apoyo humanitario." },
              { t: "Pandemia COVID-19", d: "Células de atención y traslados de alto riesgo." }
            ].map((item, i) => (
              <div key={i} className="border-l-4 border-vital pl-6">
                <p className="font-montserrat font-bold text-xl mb-1 text-black uppercase italic">{item.t}</p>
                <p className="font-inter text-base text-black/60">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}