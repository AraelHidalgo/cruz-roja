"use client"

import { useEffect, useRef, useState } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

export function EscudoSection() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

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
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section ref={sectionRef} className="min-h-screen py-24 px-6 bg-depth-1 text-surgical relative overflow-hidden">
      {/* Heavy grain texture */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='6' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)' /%3E%3C/svg%3E")`,
            backgroundSize: "200px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header with parallax */}
        <div
          className="mb-16"
          style={{
            transform: `translateY(${scrollProgress * -50}px)`,
            opacity: 1 - scrollProgress * 0.3,
          }}
        >
          <h2 className="font-clash text-5xl md:text-7xl font-bold mb-4 leading-tight">EL ESCUDO</h2>
          <p className="font-inter text-xl md:text-2xl text-vital font-semibold">Rescate y Desastres</p>
          <p className="font-inter text-lg opacity-90 mt-4 max-w-2xl leading-relaxed">
            Cuando la tierra tiembla, nosotros no retrocedemos
          </p>
        </div>

        {/* High contrast image placeholder with overlay text */}
        <div className="relative mb-12">
          <Carousel
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
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <CarouselItem key={num}>
                  <div className="relative rounded-[32px] overflow-hidden shadow-brutal border-4 border-surgical">
                    <div className="aspect-[16/9] bg-depth-2 relative">
                      <img
                        src={`/carousel/${num}.png`}
                        alt={`Cruz Roja en acción ${num}`}
                        className="w-full h-full object-cover"
                        style={{
                          filter: "contrast(1.2) grayscale(0.3)",
                        }}
                      />
                      {/* Overlay text */}
                      <div className="absolute inset-0 bg-gradient-to-t from-depth-1 via-depth-1/50 to-transparent flex items-end p-8 md:p-12">
                        <div>
                          <p className="font-inter text-base uppercase tracking-[0.1em] opacity-75 mb-2">
                            RESPUESTA ANTE EMERGENCIAS
                          </p>
                          <p className="font-clash text-3xl md:text-5xl font-bold leading-tight max-w-3xl">
                            Primeros en llegar, últimos en irse
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-4 md:static md:translate-x-0 md:mt-6 md:justify-end">
              <CarouselPrevious className="static translate-y-0 bg-surgical border-2 border-vital hover:bg-vital hover:text-surgical hover:border-surgical" />
              <CarouselNext className="static translate-y-0 bg-surgical border-2 border-vital hover:bg-vital hover:text-surgical hover:border-surgical" />
            </div>
          </Carousel>
        </div>

        {/* Impact stats - Parallax effect */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          style={{
            transform: `translateY(${scrollProgress * 30}px)`,
          }}
        >
          <div className="bg-vital text-surgical rounded-[32px] p-8 shadow-brutal border-4 border-surgical">
            <div className="font-clash text-5xl md:text-6xl font-bold mb-2">1985</div>
            <p className="font-inter text-base leading-relaxed tracking-normal">
              Desde el sismo de 1985, siempre presentes en cada desastre nacional
            </p>
          </div>

          <div className="bg-vital text-surgical rounded-[32px] p-8 shadow-brutal border-4 border-surgical">
            <div className="font-clash text-5xl md:text-6xl font-bold mb-2">72h</div>
            <p className="font-inter text-base leading-relaxed tracking-normal">Movilización completa en las primeras horas críticas</p>
          </div>

          <div className="bg-vital text-surgical rounded-[32px] p-8 shadow-brutal border-4 border-surgical">
            <div className="font-clash text-5xl md:text-6xl font-bold mb-2">100K+</div>
            <p className="font-inter text-base leading-relaxed tracking-normal">
              Personas rescatadas y atendidas en situaciones de emergencia
            </p>
          </div>
        </div>

        {/* Major disasters responded to */}
        <div className="mt-12 bg-surgical text-foreground rounded-[32px] p-8 md:p-12 shadow-brutal border-4 border-surgical">
          <h3 className="font-clash text-3xl md:text-4xl font-bold mb-8 text-black">Hemos estado ahí</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-vital pl-6">
              <p className="font-inter font-semibold text-lg mb-1">Sismos 1985 y 2017</p>
              <p className="font-inter text-base text-black leading-relaxed tracking-normal">
                Miles de vidas salvadas en las horas más oscuras de México
              </p>
            </div>
            <div className="border-l-4 border-vital pl-6">
              <p className="font-inter font-semibold text-lg mb-1">Huracanes Otis & Ingrid</p>
              <p className="font-inter text-base text-black leading-relaxed tracking-normal">
                Respuesta inmediata en zonas costeras devastadas
              </p>
            </div>
            <div className="border-l-4 border-vital pl-6">
              <p className="font-inter font-semibold text-lg mb-1">Explosión de Tlahuelilpan</p>
              <p className="font-inter text-base text-black leading-relaxed tracking-normal">
                Atención médica y apoyo psicológico a comunidades afectadas
              </p>
            </div>
            <div className="border-l-4 border-vital pl-6">
              <p className="font-inter font-semibold text-lg mb-1">COVID-19</p>
              <p className="font-inter text-base text-black leading-relaxed tracking-normal">
                Traslado de pacientes y distribución de oxígeno en todo el país
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
