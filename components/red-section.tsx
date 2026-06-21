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
    <section className="min-h-screen py-24 px-6 relative overflow-hidden bg-red-600">
      {/* Vibrant Red Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-600 to-red-700" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="mb-16">
          <h2 className="font-clash text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
            LA RED DE SEGURIDAD
          </h2>
          <p className="font-clash text-xl md:text-2xl text-red-100 font-semibold">Servicios Médicos</p>
          <p className="font-clash text-lg text-red-100/80 mt-4 max-w-2xl leading-relaxed">
            Salud para quien no tiene nada
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-[32px] p-8 md:p-12 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-300">
            <span className="font-inter text-base uppercase tracking-[0.1em] text-zinc-500 font-semibold block mb-4">
              ACCESO A SALUD
            </span>
            <div className="font-clash text-6xl md:text-7xl font-bold text-red-600 mb-4">2M+</div>
            <p className="font-inter text-lg text-zinc-800 leading-relaxed tracking-normal">
              Consultas médicas anuales para personas en situación vulnerable
            </p>
          </div>

          <div className="bg-white rounded-[32px] p-8 md:p-12 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-300">
            <span className="font-inter text-base uppercase tracking-[0.1em] text-zinc-500 font-semibold block mb-4">
              DIGNIDAD HUMANA
            </span>
            <div className="font-clash text-6xl md:text-7xl font-bold text-red-600 mb-4">$0</div>
            <p className="font-inter text-lg text-zinc-800 leading-relaxed tracking-normal">
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
              className="group relative bg-white rounded-[32px] p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] border-4 border-black overflow-hidden transition-all hover:scale-[1.02]"
            >
              {/* Subtle accent color top bar on hover */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />

              <div className="relative z-10">
                <p className="font-inter text-lg leading-relaxed mb-6 text-zinc-800">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-inter font-semibold text-zinc-950">{testimonial.author}</p>
                  <p className="font-inter text-base text-zinc-500 tracking-normal">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}