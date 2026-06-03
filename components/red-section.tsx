"use client"

import { useState } from "react"

const testimonials = [
  {
    quote: "Mi hijo necesitaba atención urgente y no teníamos dinero. La Cruz Roja no dudó ni un segundo.",
    author: "María G.",
    location: "Oaxaca",
  },
  {
    quote: "Después del sismo, fueron los primeros en llegar. Nos dieron medicina, agua, esperanza.",
    author: "Carlos R.",
    location: "Ciudad de México",
  },
  {
    quote: "Atención médica de calidad sin importar si puedes pagar. Eso es justicia real.",
    author: "Ana L.",
    location: "Chiapas",
  },
]

export function RedSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="min-h-screen py-24 px-6 relative overflow-hidden">
      {/* Gradiente rojo → rosa → blanco visible (inverso del Hero) */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-600 from-85% via-red-400 via-95% to-rose-50" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="mb-16">
          <h2 className="font-clash text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
            LA RED DE SEGURIDAD
          </h2>
          <p className="font-clash text-xl md:text-2xl text-white font-semibold">Servicios Médicos</p>
          <p className="font-clash text-lg text-white/80 mt-4 max-w-2xl leading-relaxed">
            Salud para quien no tiene nada
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white/90 backdrop-blur-sm rounded-[32px] p-8 md:p-12 shadow-brutal border-4 border-white hover:translate-x-1 hover:translate-y-1 transition-transform">
            <span className="font-inter text-base uppercase tracking-[0.1em] text-black/60 font-semibold block mb-4">
              ACCESO A SALUD
            </span>
            <div className="font-clash text-6xl md:text-7xl font-bold text-vital mb-4">2M+</div>
            <p className="font-inter text-lg text-black/70 leading-relaxed tracking-normal">
              Consultas médicas anuales para personas en situación vulnerable
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-[32px] p-8 md:p-12 shadow-brutal border-4 border-white hover:translate-x-1 hover:translate-y-1 transition-transform">
            <span className="font-inter text-base uppercase tracking-[0.1em] text-black/60 font-semibold block mb-4">
              DIGNIDAD HUMANA
            </span>
            <div className="font-clash text-6xl md:text-7xl font-bold text-vital mb-4">$0</div>
            <p className="font-inter text-lg text-black/70 leading-relaxed tracking-normal">
              Costo para quienes no pueden pagar. La salud no es un privilegio.
            </p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative bg-white/85 backdrop-blur-xl rounded-[32px] p-8 shadow-brutal border-4 border-white overflow-hidden transition-all hover:scale-[1.02]"
              style={{
                backdropFilter: "blur(24px)",
              }}
            >
              {/* Glass refraction effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-br from-white/30 to-transparent transition-opacity duration-500 ${hoveredIndex === index ? "opacity-100" : "opacity-0"
                  }`}
              />

              <div className="relative z-10">
                <p
                  className={`font-inter text-lg leading-relaxed mb-6 text-black transition-all duration-500 ${hoveredIndex === index ? "opacity-100" : "opacity-80"
                    }`}
                >
                  "{testimonial.quote}"
                </p>
                <div
                  className={`transition-all duration-500 ${hoveredIndex === index ? "opacity-100" : "opacity-80"
                    }`}
                >
                  <p className="font-inter font-semibold text-black">{testimonial.author}</p>
                  <p className="font-inter text-base text-black/70 tracking-normal">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}