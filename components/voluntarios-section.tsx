"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { UserCheck, GraduationCap, HeartPulse, Heart, Clock, ShieldCheck } from "lucide-react"

export function VoluntariosSection() {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const REQUISITOS = [
    {
      title: "Ser mayor de edad",
      description: "Tener 18 años o más cumplidos al momento de presentar tu postulación.",
      icon: UserCheck,
    },
    {
      title: "Estudios concluidos",
      description: "Contar con certificado oficial de preparatoria, bachillerato o nivel equivalente.",
      icon: GraduationCap,
    },
    {
      title: "Certificación TUM",
      description: "Acreditar el curso Técnico en Urgencias Médicas (TUM) avalado por la Cruz Roja Mexicana.",
      icon: HeartPulse,
    },
    {
      title: "Ser altruista",
      description: "Tener convicción de ayuda desinteresada y una alta vocación de servicio comunitario.",
      icon: Heart,
    },
    {
      title: "Disposición de tiempo",
      description: "Disponibilidad para cubrir turnos, guardias operativas, capacitación continua y servicios especiales.",
      icon: Clock,
    },
    {
      title: "Reglamentos y estatutos",
      description: "Aceptar, respetar y conducirte bajo los reglamentos internos, estatutos y principios de la institución.",
      icon: ShieldCheck,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <section
      ref={containerRef}
      className="py-24 sm:py-32 px-6 relative overflow-hidden bg-white"
    >
      {/* Fondo con gradiente suave y luminoso de transición */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-50 to-white" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* Cabecera de la sección - Colores claros y limpios */}
        <div className="text-center mb-16 sm:mb-24">
          <motion.div variants={itemVariants} className="inline-block mb-6">
            <div className="bg-vital text-white px-6 py-2 rounded-full border-4 border-black shadow-brutal transform -rotate-1">
              <span className="font-inter text-xs sm:text-sm uppercase tracking-[0.15em] font-black">
                VOLUNTARIADO
              </span>
            </div>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="font-clash text-4xl sm:text-6xl md:text-8xl font-bold text-black mb-6 sm:mb-8 leading-[1.0] tracking-tight uppercase"
          >
            <span className="block">REQUISITOS</span>
            <span className="block text-vital">DE INGRESO</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="font-montserrat font-semibold text-lg sm:text-xl md:text-2xl text-black/90 uppercase tracking-wide max-w-3xl mx-auto"
          >
            Servicio Prehospitalario o Ambulancias
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="font-inter text-base sm:text-lg text-black/70 mt-6 max-w-2xl mx-auto leading-relaxed"
          >
            Para formar parte de nuestro equipo operativo y tripular ambulancias, es indispensable cumplir con los siguientes requisitos del perfil institucional:
          </motion.p>
        </div>

        {/* Requisitos Grid - Tarjetas claras, nítidas y confiables */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl mx-auto mb-16">
          {REQUISITOS.map((req, index) => {
            const Icon = req.icon
            return (
              <motion.div
                key={req.title}
                variants={itemVariants}
                className="bg-white rounded-[28px] p-8 border-4 border-black/10 shadow-brutal hover:shadow-brutal-heavy hover:border-vital/80 hover:-translate-x-1.5 hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-start group cursor-default"
              >
                {/* Contenedor del Icono con efecto hover amigable */}
                <div className="w-16 h-16 rounded-2xl bg-vital/5 border-2 border-vital/20 flex items-center justify-center mb-6 text-vital group-hover:scale-110 group-hover:bg-vital group-hover:text-white transition-all duration-300">
                  <Icon className="w-8 h-8" />
                </div>

                {/* Título del Requisito */}
                <h3 className="font-clash text-2xl font-bold text-black mb-3 tracking-tight group-hover:text-vital transition-colors">
                  {req.title}
                </h3>

                {/* Descripción */}
                <p className="font-inter text-base text-black/70 leading-relaxed">
                  {req.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Énfasis Inferior / CTA Interno - Diseño amigable en tonos rojos claros y bordes nítidos */}
        <motion.div
          variants={itemVariants}
          className="bg-rose-50 text-black rounded-[32px] p-8 sm:p-12 shadow-brutal border-4 border-vital/30 max-w-4xl mx-auto text-center"
        >
          <h4 className="font-clash text-2xl sm:text-4xl font-bold mb-4 uppercase leading-none text-black">
            ¿Cumples con el perfil?
          </h4>
          <p className="font-inter text-base sm:text-lg text-black/80 max-w-2xl mx-auto mb-6">
            El voluntariado en ambulancias requiere de gran disciplina y compromiso. Si cumples con los requisitos, te invitamos a postularte para iniciar tu proceso.
          </p>
          <a
            href="#actua"
            className="inline-flex items-center justify-center bg-vital text-white font-clash text-base sm:text-lg font-bold px-8 py-4 rounded-xl border-4 border-black shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-sm transition-all"
          >
            QUIERO INSCRIBIRME AHORA
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
