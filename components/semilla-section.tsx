"use client"

export function SemillaSection() {
  return (
    <section className="min-h-screen py-24 px-6 relative overflow-hidden">
      {/* Gradiente claro (blanco → rosa → rojo) — invertido del rojo original */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-rose-100 via-90% to-red-300" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="mb-16">
          <h2 className="font-clash text-5xl md:text-7xl font-bold text-black mb-4 leading-tight">LA SEMILLA</h2>
          <p className="font-montserrat font-semibold text-xl md:text-2xl text-vital">Capacitación</p>
          <p className="font-montserrat font-medium text-lg text-black/70 mt-4 max-w-2xl leading-relaxed">
            Tú eres el primer respondiente
          </p>
        </div>

        {/* Main message */}
        <div className="bg-white/80 text-black rounded-[32px] p-8 md:p-16 mb-12 shadow-brutal border-4 border-red-200">
          <p className="font-montserrat text-3xl md:text-5xl font-bold leading-tight mb-6">
            ¿Sabrías qué hacer si tu ser querido deja de respirar?
          </p>
          <p className="font-inter text-lg md:text-xl leading-relaxed max-w-3xl text-black/70">
            Cada año, miles de vidas se pierden porque nadie sabía RCP. No esperes a necesitarlo. Aprende ahora.
          </p>
        </div>

        {/* Training programs - Technical layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-[32px] p-8 md:p-10 shadow-brutal border-4 border-red-200 hover:translate-x-1 hover:translate-y-1 transition-transform">
            <div className="flex items-start justify-between mb-6">
              <span className="font-montserrat text-bold uppercase tracking-wider text-black/60 bg-red-100 px-3 py-1 rounded-full">
                CURSO BÁSICO
              </span>
              <span className="font-montserrat text-bold text-black/60">4 horas</span>
            </div>
            <h3 className="font-montserrat text-2xl md:text-3xl font-bold mb-4 text-black">Primeros Auxilios</h3>
            <ul className="space-y-3 font-inter text-base text-black/70">
              <li className="flex items-start gap-3">
                <span className="text-vital font-bold">→</span>
                <span>RCP básico (Reanimación Cardiopulmonar)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-vital font-bold">→</span>
                <span>Maniobra de Heimlich (obstrucción de vías respiratorias)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-vital font-bold">→</span>
                <span>Control de hemorragias</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-vital font-bold">→</span>
                <span>Manejo de fracturas y traumatismos</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-[32px] p-8 md:p-10 shadow-brutal border-4 border-red-200 hover:translate-x-1 hover:translate-y-1 transition-transform">
            <div className="flex items-start justify-between mb-6">
              <span className="font-montserrat text-bold uppercase tracking-wider text-black/60 bg-red-100 px-3 py-1 rounded-full">
                CURSO AVANZADO
              </span>
              <span className="font-montserrat text-bold text-black/60">8 horas</span>
            </div>
            <h3 className="font-montserrat text-2xl md:text-3xl font-bold mb-4 text-black">Respuesta ante Emergencias</h3>
            <ul className="space-y-3 font-inter text-base text-black/70">
              <li className="flex items-start gap-3">
                <span className="text-vital font-bold">→</span>
                <span>Evaluación de escena y seguridad</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-vital font-bold">→</span>
                <span>Atención a pacientes con trauma severo</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-vital font-bold">→</span>
                <span>Uso de desfibrilador externo automático (DEA)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-vital font-bold">→</span>
                <span>Preparación para desastres naturales</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-vital text-white rounded-[24px] p-6 shadow-brutal border-4 border-red-700 text-center">
            <div className="font-clash text-4xl font-bold mb-1">300K+</div>
            <p className="font-inter text-bold uppercase tracking-[0.1em]">Capacitados</p>
          </div>
          <div className="bg-vital text-white rounded-[24px] p-6 shadow-brutal border-4 border-red-700 text-center">
            <div className="font-clash text-4xl font-bold mb-1">1,200</div>
            <p className="font-inter text-bold uppercase tracking-[0.1em]">Cursos/año</p>
          </div>
          <div className="bg-vital text-white rounded-[24px] p-6 shadow-brutal border-4 border-red-700 text-center">
            <div className="font-clash text-4xl font-bold mb-1">32</div>
            <p className="font-inter text-bold uppercase tracking-[0.1em]">Estados</p>
          </div>
          <div className="bg-vital text-white rounded-[24px] p-6 shadow-brutal border-4 border-red-700 text-center">
            <div className="font-clash text-4xl font-bold mb-1">85%</div>
            <p className="font-inter text-bold uppercase tracking-[0.1em]">Certificación</p>
          </div>
        </div>
      </div>
    </section>
  )
}