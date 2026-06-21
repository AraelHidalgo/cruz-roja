"use client"

export function SemillaSection() {
  return (
    <section className="min-h-screen py-24 px-6 relative overflow-hidden bg-red-600">
      {/* Vibrant Red Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-600 to-red-700" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="mb-16">
          <h2 className="font-clash text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">LA SEMILLA</h2>
          <p className="font-montserrat font-semibold text-xl md:text-2xl text-red-100">Capacitación</p>
          <p className="font-montserrat font-medium text-lg text-red-100/80 mt-4 max-w-2xl leading-relaxed">
            Tú eres el primer respondiente
          </p>
        </div>

        {/* Main message */}
        <div className="bg-white text-black rounded-[32px] p-8 md:p-16 mb-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black">
          <p className="font-montserrat text-3xl md:text-5xl font-bold leading-tight mb-6 text-zinc-950">
            ¿Sabrías qué hacer si tu ser querido deja de respirar?
          </p>
          <p className="font-inter text-lg md:text-xl leading-relaxed max-w-3xl text-zinc-700">
            Cada año, miles de vidas se pierden porque nadie sabía RCP. No esperes a necesitarlo. Aprende ahora.
          </p>
        </div>

        {/* Training programs - Technical layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-[32px] p-8 md:p-10 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-300">
            <div className="flex items-start justify-between mb-6">
              <span className="font-montserrat font-bold text-xs uppercase tracking-wider text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full">
                CURSO BÁSICO
              </span>
              <span className="font-montserrat text-bold text-zinc-500">4 horas</span>
            </div>
            <h3 className="font-montserrat text-2xl md:text-3xl font-bold mb-4 text-zinc-950">Primeros Auxilios</h3>
            <ul className="space-y-3 font-inter text-base text-zinc-700">
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">→</span>
                <span>RCP básico (Reanimación Cardiopulmonar)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">→</span>
                <span>Maniobra de Heimlich (obstrucción de vías respiratorias)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">→</span>
                <span>Control de hemorragias</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">→</span>
                <span>Manejo de fracturas y traumatismos</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-[32px] p-8 md:p-10 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-300">
            <div className="flex items-start justify-between mb-6">
              <span className="font-montserrat font-bold text-xs uppercase tracking-wider text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full">
                CURSO AVANZADO
              </span>
              <span className="font-montserrat text-bold text-zinc-500">8 horas</span>
            </div>
            <h3 className="font-montserrat text-2xl md:text-3xl font-bold mb-4 text-zinc-950">Respuesta ante Emergencias</h3>
            <ul className="space-y-3 font-inter text-base text-zinc-700">
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">→</span>
                <span>Evaluación de escena y seguridad</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">→</span>
                <span>Atención a pacientes con trauma severo</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">→</span>
                <span>Uso de desfibrilador externo automático (DEA)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">→</span>
                <span>Preparación para desastres naturales</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white text-zinc-950 rounded-[24px] p-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-300">
            <div className="font-clash text-4xl font-bold mb-1 text-red-600">300K+</div>
            <p className="font-inter text-bold uppercase tracking-[0.1em] text-zinc-700 text-xs sm:text-sm">Capacitados</p>
          </div>
          <div className="bg-white text-zinc-950 rounded-[24px] p-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-300">
            <div className="font-clash text-4xl font-bold mb-1 text-red-600">1,200</div>
            <p className="font-inter text-bold uppercase tracking-[0.1em] text-zinc-700 text-xs sm:text-sm">Cursos/año</p>
          </div>
          <div className="bg-white text-zinc-950 rounded-[24px] p-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-300">
            <div className="font-clash text-4xl font-bold mb-1 text-red-600">32</div>
            <p className="font-inter text-bold uppercase tracking-[0.1em] text-zinc-700 text-xs sm:text-sm">Estados</p>
          </div>
          <div className="bg-white text-zinc-950 rounded-[24px] p-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-300">
            <div className="font-clash text-4xl font-bold mb-1 text-red-600">85%</div>
            <p className="font-inter text-bold uppercase tracking-[0.1em] text-zinc-700 text-xs sm:text-sm">Certificación</p>
          </div>
        </div>
      </div>
    </section>
  )
}