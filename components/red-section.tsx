"use client"

import { useState } from "react"
import { motion, Variants } from "framer-motion"
import { HeartPulse, Quote, MapPin, HeartHandshake, Sparkles } from "lucide-react"

const testimonials = [
  {
    quote: "Cuando mi mamá enfermó a mitad de la noche, los paramédicos llegaron rápido y con una calidez humana que nos devolvió la paz. No nos cobraron absolutamente nada.",
    author: "Patricia M.",
    role: "Hija de paciente",
    location: "Colonia San Caralampio, Tapachula",
    initials: "PM"
  },
  {
    quote: "Como caficultor, el trabajo es duro y a veces los recursos varían. Las consultas y medicamentos gratuitos en la delegación me permiten seguir de pie trabajando por mi familia.",
    author: "Don Mateo J.",
    role: "Caficultor local",
    location: "Zona Rural de Tapachula",
    initials: "MJ"
  },
  {
    quote: "Aquí no solo sanan cuerpos, también sanan corazones. El trato de los médicos y paramédicos es el reflejo de una comunidad chiapaneca que realmente se cuida a sí misma.",
    author: "Sofía L.",
    role: "Paciente y Colaboradora",
    location: "Centro de Tapachula",
    initials: "SL"
  },
]

export function RedSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <section className="min-h-screen py-28 px-6 relative overflow-hidden bg-gradient-to-b from-red-700 via-red-800 to-rose-950">
      
      {/* Dynamic Animated Blobs to bring life to the backdrop */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 -left-20 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-red-500/20 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, 40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-1/4 -right-20 w-[350px] h-[350px] md:w-[600px] md:h-[600px] bg-rose-500/15 rounded-full blur-[90px] md:blur-[140px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section header */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-20 text-center max-w-3xl mx-auto"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-xs font-semibold tracking-wider text-red-200 uppercase mb-5 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
            <span>Latidos de Solidaridad</span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="font-clash text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight"
          >
            NUESTRA RED DE BIENESTAR
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="font-inter text-lg md:text-xl text-red-100/90 leading-relaxed font-medium"
          >
            En la delegación Tapachula no solo atendemos pacientes, protegemos a nuestros vecinos. Cada consulta y traslado médico es un compromiso con la dignidad de nuestra comunidad.
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {/* Card 1: Atención Cercana */}
          <motion.div 
            variants={itemVariants}
            className="bg-white/95 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.45)] transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="font-inter text-xs uppercase tracking-[0.15em] text-zinc-500 font-bold">
                  Atención Cercana y Constante
                </span>
                <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-600">
                  <HeartPulse className="w-6 h-6 animate-pulse" />
                </div>
              </div>
              <div className="font-clash text-6xl md:text-7xl font-bold text-zinc-950 mb-4 tracking-tighter">
                15,000+
              </div>
              <p className="font-inter text-lg text-zinc-600 leading-relaxed font-medium">
                Consultas generales, curaciones y traslados prehospitalarios brindados al año en el Soconusco.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Solidaridad Real */}
          <motion.div 
            variants={itemVariants}
            className="bg-white/95 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.45)] transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="font-inter text-xs uppercase tracking-[0.15em] text-zinc-500 font-bold">
                  Compromiso Incondicional
                </span>
                <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-600">
                  <HeartHandshake className="w-6 h-6" />
                </div>
              </div>
              <div className="font-clash text-6xl md:text-7xl font-bold text-red-600 mb-4 tracking-tighter">
                $0
              </div>
              <p className="font-inter text-lg text-zinc-600 leading-relaxed font-medium">
                Costo para personas y familias en situación de vulnerabilidad extrema. Creemos en la salud como un derecho, no como un privilegio.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Testimonials */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.2)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)] border border-white/30 overflow-hidden transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
            >
              {/* Visual quote indicator in background */}
              <Quote className="absolute -right-4 -top-4 w-28 h-28 text-red-600/[0.04] transform rotate-12 transition-transform duration-700 group-hover:scale-110 pointer-events-none" />

              {/* Red glow highlight bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 to-rose-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />

              <div className="relative z-10 flex-grow">
                <p className="font-inter text-zinc-800 text-lg leading-relaxed mb-8 font-medium italic">
                  "{testimonial.quote}"
                </p>
              </div>

              <div className="relative z-10 flex items-center gap-4 mt-auto border-t border-zinc-100 pt-6">
                {/* Initials Avatar */}
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-white font-bold text-sm tracking-wider shadow-sm">
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="font-inter font-bold text-zinc-950 text-base leading-tight">
                    {testimonial.author}
                  </h4>
                  <p className="text-xs text-red-600 font-semibold mb-0.5">{testimonial.role}</p>
                  <p className="font-inter text-xs text-zinc-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}