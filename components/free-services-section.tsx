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
    <section ref={sectionRef} className="py-32 px-6 bg-vital relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)] animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Shocking header */}
        <div className="text-center mb-20">
          <div
            className={`inline-block mb-6 transition-all duration-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
          >
            <div className="bg-surgical text-vital px-8 py-3 rounded-full border-4 border-surgical shadow-brutal transform -rotate-2">
              <span className="font-inter text-base uppercase tracking-[0.1em] font-bold">MITO DESTRUIDO</span>
            </div>
          </div>

          <h2
            className={`font-clash text-5xl md:text-8xl font-bold text-surgical mb-8 leading-[0.9] transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
          >
            <span className="block">NO TODO</span>
            <span className="block">SE COBRA</span>
          </h2>

          <p
            className={`font-inter text-xl md:text-2xl text-surgical max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            Estos servicios vitales son{" "}
            <span className="font-bold underline decoration-4 decoration-surgical">100% GRATUITOS</span> para quien los
            necesita. Sin excepciones.
          </p>
        </div>

        {/* Services grid with staggered animations */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {freeServices.map((service, index) => (
            <div
              key={service.title}
              className={`bg-surgical rounded-[24px] p-8 border-4 border-depth-2 shadow-brutal hover:shadow-brutal-lg hover:-translate-y-2 transition-all duration-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
              style={{
                transitionDelay: `${600 + index * 100}ms`,
              }}
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="font-clash text-2xl font-bold text-foreground mb-2">{service.title}</h3>
              <p className="font-inter text-base text-black mb-4 leading-relaxed tracking-normal">{service.description}</p>
              <div className="inline-block bg-vital text-surgical px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-[0.08em]">
                {service.detail}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom emphasis */}
        <div
          className={`mt-20 text-center transition-all duration-1000 delay-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div className="bg-surgical/10 backdrop-blur-sm border-4 border-surgical rounded-[32px] p-8 md:p-12 inline-block">
            <p className="font-inter text-lg md:text-xl text-surgical leading-relaxed max-w-2xl">
              <span className="font-bold">Operamos con donaciones</span> porque creemos que la vida no tiene precio.
              Nadie debe dudar en llamar por miedo al costo.
            </p>

            <p className="font-inter text-lg md:text-xl text-surgical leading-relaxed max-w-2xl">
              <span className="font-bold"> Teléfono: 962-606-4212 | 962-626-1949</span>
            </p>


          </div>
        </div>
      </div>
    </section>
  )
}
