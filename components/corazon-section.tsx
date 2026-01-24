"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useSpring, useMotionValue } from "framer-motion"

// Number counter component
function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { damping: 50, stiffness: 300 })

  useEffect(() => {
    motionValue.set(value)
  }, [value, motionValue])

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toString().padStart(4, "0")
      }
    })
  }, [springValue])

  return <span ref={ref} />
}

export function CorazonSection() {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [servicesCount, setServicesCount] = useState(5420)

  useEffect(() => {
    // Subtle live update simulation
    const interval = setInterval(() => {
      setServicesCount((prev) => prev + Math.floor(Math.random() * 3))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  }

  return (
    <section ref={containerRef} className="py-32 px-6 relative bg-black/95 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* Section header */}
        <div className="mb-20 text-center md:text-left">
          <motion.div variants={itemVariants} className="inline-block">
            <h2 className="font-clash text-5xl md:text-8xl font-bold text-white mb-2 tracking-tighter">EL CORAZÓN</h2>
            <div className="h-2 w-full bg-vital rounded-full origin-left transform scale-x-50" />
          </motion.div>
          <motion.p variants={itemVariants} className="font-mono text-lg md:text-xl text-red-500 mt-6 tracking-[0.15em] uppercase">
            Atención Prehospitalaria
          </motion.p>
          <motion.p variants={itemVariants} className="font-inter text-lg md:text-xl text-gray-400 mt-4 max-w-xl leading-relaxed tracking-normal">
            Cuando cada segundo cuenta, somos la diferencia entre el caos y la esperanza.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Main counter - large cell */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 md:p-12 flex flex-col justify-between min-h-[450px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative z-10">
              <span className="flex items-center gap-3 font-mono text-sm text-red-400 uppercase tracking-widest">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                Servicios Hoy
              </span>
            </div>

            <div className="relative z-10 mt-auto">
              <div className="font-clash text-[6rem] md:text-[10rem] font-bold leading-none text-white tracking-tighter tabular-nums text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
                <Counter value={servicesCount} />
              </div>
              <div className="mt-4 font-inter text-gray-400 text-base md:text-lg border-t border-white/10 pt-4 flex justify-between items-center tracking-wide">
                <span>ACTUALIZACIÓN EN TIEMPO REAL</span>
                <span className="text-red-500 font-bold">LIVE</span>
              </div>
            </div>
          </motion.div>

          {/* 24/7 availability */}
          <motion.div
            variants={itemVariants}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 flex flex-col justify-between min-h-[200px]"
          >
            <div className="absolute inset-0 bg-red-600/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 origin-top-left" />
            <span className="font-mono text-sm text-gray-500 uppercase tracking-[0.15em]">Disponibilidad</span>
            <div>
              <div className="font-clash text-5xl font-bold text-white mb-2">24/7</div>
              <p className="font-inter text-base text-gray-400 tracking-normal">Siempre listos. Siempre ahí.</p>
            </div>
          </motion.div>

          {/* Response time */}
          <motion.div
            variants={itemVariants}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 flex flex-col justify-between min-h-[200px]"
          >
            <div className="absolute inset-0 bg-blue-600/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full blur-2xl translate-x-1/2 translate-y-1/2 origin-bottom-right" />
            <span className="font-mono text-sm text-gray-500 uppercase tracking-[0.15em]">Tiempo Promedio</span>
            <div>
              <div className="font-clash text-5xl font-bold text-white mb-2">5min</div>
              <p className="font-inter text-base text-gray-400 tracking-normal">Respuesta inmediata</p>
            </div>
          </motion.div>

          {/* Coverage */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-3 rounded-3xl border border-white/10 bg-neutral-900/50 backdrop-blur-sm p-10 relative overflow-hidden"
          >
            <div className="grid md:grid-cols-3 gap-12 relative z-10">
              <div>
                <div className="font-clash text-5xl font-bold text-white mb-2">500+</div>
                <p className="font-mono text-sm text-red-500 uppercase tracking-[0.1em]">Ambulancias</p>
              </div>
              <div>
                <div className="font-clash text-5xl font-bold text-white mb-2">32</div>
                <p className="font-mono text-sm text-red-500 uppercase tracking-[0.1em]">Estados</p>
              </div>
              <div>
                <div className="font-clash text-5xl font-bold text-white mb-2">100%</div>
                <p className="font-mono text-sm text-red-500 uppercase tracking-[0.1em]">Gratuito</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
