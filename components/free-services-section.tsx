"use client"

import { useEffect, useState, useRef } from "react"

export function FreeServicesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const freeServices = [
    {
      title: "Ambulancias",
      description: "Atención prehospitalaria",
      icon: "🚑",
      detail: "Sin costo, sin preguntas",
    },
    {
      title: "Rescates",
      description: "Búsqueda y rescate en desastres",
      icon: "⛑️",
      detail: "Siempre sin cargo",
    },
    {
      title: "Banco de sangre",
      description: "Recolección y suministro vital",
      icon: "🩸",
      detail: "Donación gratuita",
    },
    {
      title: "Apoyo en desastres",
      description: "Apoyo a albergues y suministros de emergencia",
      icon: "🏕️",
      detail: "Para quien lo necesita",
    },
  ]

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden">
      {/* Gradiente blanco → rosa → rojo */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-rose-100 via-90% to-red-300" />

      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.1),transparent_50%)] animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Shocking header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div
            className={`inline-block mb-4 sm:mb-6 transition-all duration-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
          >
            <div className="bg-white text-vital px-6 sm:px-8 py-2 sm:py-3 rounded-full border-4 border-white shadow-brutal transform -rotate-2">
              <span className="font-inter text-xs sm:text-base uppercase tracking-[0.1em] font-bold">MITO DESTRUIDO</span>
            </div>
          </div>

          <h2
            className={`font-clash text-4xl sm:text-5xl md:text-8xl font-bold text-black mb-6 sm:mb-8 leading-[0.9] transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            <span className="block">NO TODO</span>
            <span className="block">SE COBRA</span>
          </h2>

          <p
            className={`font-inter text-base sm:text-xl md:text-2xl text-black/80 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400 px-4 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            Estos servicios vitales son{" "}
            <span className="font-bold underline decoration-4 decoration-vital">100% GRATUITOS</span> para quien los
            necesita. Sin excepciones.
          </p>
        </div>

        {/* Services grid - 3 arriba, 1 centrado abajo - RESPONSIVE */}
        <div className="flex flex-col items-center gap-4 sm:gap-6">
          {/* Primera fila: 3 servicios (1 col mobile, 3 cols desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full">
            {freeServices.slice(0, 3).map((service, index) => (
              <div
                key={service.title}
                className={`bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-[24px] p-6 sm:p-8 border-4 border-red-300/50 shadow-brutal hover:shadow-brutal-lg hover:-translate-y-2 transition-all duration-300 cursor-pointer ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{
                  transitionDelay: `${600 + index * 100}ms`,
                }}
              >
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{service.icon}</div>
                <h3 className="font-clash text-xl sm:text-2xl font-bold text-black mb-2">{service.title}</h3>
                <p className="font-inter text-sm sm:text-base text-black/70 mb-3 sm:mb-4 leading-relaxed">{service.description}</p>
                <div className="inline-block bg-vital text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-[0.08em]">
                  {service.detail}
                </div>
              </div>
            ))}
          </div>

          {/* Segunda fila: 1 servicio centrado */}
          <div className="w-full sm:w-2/3 md:w-1/3">
            {freeServices.slice(3, 4).map((service) => (
              <div
                key={service.title}
                className={`bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-[24px] p-6 sm:p-8 border-4 border-red-300/50 shadow-brutal hover:shadow-brutal-lg hover:-translate-y-2 transition-all duration-300 cursor-pointer ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{
                  transitionDelay: `900ms`,
                }}
              >
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{service.icon}</div>
                <h3 className="font-clash text-xl sm:text-2xl font-bold text-black mb-2">{service.title}</h3>
                <p className="font-inter text-sm sm:text-base text-black/70 mb-3 sm:mb-4 leading-relaxed">{service.description}</p>
                <div className="inline-block bg-vital text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-[0.08em]">
                  {service.detail}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom emphasis */}
        <div
          className={`mt-12 sm:mt-16 md:mt-20 text-center transition-all duration-1000 delay-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="bg-white/70 backdrop-blur-sm border-4 border-red-300/50 rounded-2xl sm:rounded-[32px] p-6 sm:p-8 md:p-12 inline-block max-w-2xl">
            <p className="font-inter text-base sm:text-lg md:text-xl text-black/80 leading-relaxed mb-3 sm:mb-4">
              <span className="font-bold">Operamos con donaciones</span> porque creemos que la vida no tiene precio.
              Nadie debe dudar en llamar por miedo al costo.
            </p>

            <p className="font-inter text-base sm:text-lg md:text-xl text-black/80 leading-relaxed">
              <span className="font-bold">Teléfono: 962-606-4212 | 962-626-1949</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}