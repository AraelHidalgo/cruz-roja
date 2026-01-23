"use client"

import { useState } from "react"

export function CTASection() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)

  return (
    <section className="min-h-screen py-24 px-6 bg-vital text-surgical relative flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-surgical animate-pulse"
          style={{ animationDuration: "3s" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-surgical animate-pulse"
          style={{ animationDuration: "4s", animationDelay: "1s" }}
        />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <h2 className="font-clash text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
          Tú mantienes
          <br />
          este latido
        </h2>

        <p className="font-inter text-xl md:text-2xl mb-16 leading-relaxed max-w-3xl mx-auto opacity-95">
          La Cruz Roja Mexicana no recibe apoyo gubernamental. Somos sostenidos por personas como tú que creen en salvar
          vidas.
        </p>

        {/* CTA Buttons - Neo-brutalist style */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <button
            onMouseEnter={() => setHoveredButton("donar")}
            onMouseLeave={() => setHoveredButton(null)}
            className="group relative bg-surgical text-vital font-clash text-xl md:text-2xl font-bold px-10 py-6 rounded-[20px] shadow-brutal-heavy border-4 border-surgical transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none min-w-[240px]"
          >
            DONAR AHORA
            <span className="absolute -top-2 -right-2 bg-depth-1 text-surgical text-xs font-inter px-2 py-1 rounded-full border-2 border-surgical">
              Urgente
            </span>
          </button>

          <button
            onMouseEnter={() => setHoveredButton("aprender")}
            onMouseLeave={() => setHoveredButton(null)}
            className="group relative bg-depth-2 text-surgical font-clash text-xl md:text-2xl font-bold px-10 py-6 rounded-[20px] shadow-brutal-heavy border-4 border-surgical transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none min-w-[240px]"
          >
            APRENDER RCP
          </button>

          <button
            onMouseEnter={() => setHoveredButton("voluntario")}
            onMouseLeave={() => setHoveredButton(null)}
            className="group relative bg-depth-1 text-surgical font-clash text-xl md:text-2xl font-bold px-10 py-6 rounded-[20px] shadow-brutal-heavy border-4 border-surgical transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none min-w-[240px]"
          >
            SER VOLUNTARIO
          </button>
        </div>

        {/* Impact stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="font-clash text-4xl md:text-5xl font-bold mb-2">$100</div>
            <p className="font-inter text-sm opacity-90 leading-relaxed">Mantienen una ambulancia operando por 1 día</p>
          </div>
          <div className="text-center">
            <div className="font-clash text-4xl md:text-5xl font-bold mb-2">$500</div>
            <p className="font-inter text-sm opacity-90 leading-relaxed">
              Equipan a un paramédico con insumos esenciales
            </p>
          </div>
          <div className="text-center">
            <div className="font-clash text-4xl md:text-5xl font-bold mb-2">$1,000</div>
            <p className="font-inter text-sm opacity-90 leading-relaxed">
              Capacitan a 50 personas en primeros auxilios
            </p>
          </div>
        </div>

        {/* Footer message */}
        <div className="mt-20 pt-12 border-t-2 border-surgical/20">
          <p className="font-inter text-base opacity-75 leading-relaxed">
            Sin ti, México pierde un latido. Con tu ayuda, salvamos vidas cada día.
          </p>
        </div>
      </div>
    </section>
  )
}
