"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform } from "framer-motion"

export function Hero({ onOpenSimulation }: { onOpenSimulation: () => void }) {
  const [emergencyCount, setEmergencyCount] = useState(0)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 200])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  
  const gradientOpacity = useTransform(scrollY, [0, 600], [0, 0.3])

  useEffect(() => {
    const targetCount = 2500000
    const duration = 3000
    const increment = targetCount / (duration / 50)
    const counterInterval = setInterval(() => {
      setEmergencyCount((prev) => {
        const next = prev + increment
        return next >= targetCount ? targetCount : next
      })
    }, 50)

    return () => {
      clearInterval(counterInterval)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Gradiente visible como en CorazonSection pero invertido: blanco → rosa → rojo */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-rose-100 via-90% to-red-300" />
      
      {/* Dynamic gradient overlay con scroll */}
      <motion.div 
        style={{ opacity: gradientOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-200 via-90% to-red-400"
      />
      
      {/* Background w/ Parallax */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-300/30 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-400/30 rounded-full blur-[120px]" />
      </motion.div>

      {/* Heartbeat Center Visual */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <motion.div
          animate={{ scale: [1, 1.03, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[30rem] h-[30rem] md:w-[40rem] md:h-[40rem] rounded-full bg-red-400/25 blur-[120px]"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-[clamp(3.5rem,9vw,7rem)] font-bold leading-[0.9] tracking-tight mb-8 font-clash">
            <span className="block text-black drop-shadow-sm">Somos</span>
            <span className="block text-vital drop-shadow-[0_0_40px_rgba(220,38,38,0.4)]">
              El Latido de México
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-inter text-lg md:text-2xl text-black/70 max-w-2xl mx-auto leading-relaxed mb-12"
        >
          Cada 12 segundos, alguien necesita ayuda. Nosotros respondemos cuando nadie más puede.
        </motion.p>

        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-14 inline-block group perspective-1000"
        >
          <div className="relative bg-white/60 backdrop-blur-xl border border-red-300/40 p-8 md:p-10 rounded-2xl shadow-2xl overflow-hidden transition-transform duration-500 hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-tr from-vital/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="text-5xl md:text-7xl font-bold text-vital font-mono tracking-tighter tabular-nums drop-shadow-sm">
                {Math.floor(emergencyCount).toLocaleString()}
              </div>
              <div className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase mt-3 text-black/70">
                Emergencias Atendidas
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            onClick={onOpenSimulation}
            size="lg"
            className="bg-vital hover:bg-vital/90 text-white font-bold text-lg px-10 py-7 rounded-full shadow-[0_10px_40px_-10px_rgba(220,38,38,0.5)] hover:shadow-[0_20px_60px_-15px_rgba(220,38,38,0.6)] transition-all hover:-translate-y-1 hover:scale-105 active:scale-95"
          >
            <span className="mr-3 animate-pulse text-xl">🚨</span> SIMULAR EMERGENCIA
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest text-black">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-vital/50 to-transparent" />
      </motion.div>

      {/* 24/7 Badge */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-8 md:block hidden"
      >
        <div className="flex items-center gap-3 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-red-300/40 hover:bg-vital/90 hover:border-vital hover:text-white transition-all duration-300 hover:scale-105 cursor-pointer group">
          <div className="w-2 h-2 rounded-full bg-vital animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.8)] group-hover:bg-white group-hover:shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
          <span className="font-inter text-xs font-medium text-black/70 tracking-wider group-hover:text-white transition-colors duration-300">ACTIVOS 24/7/365</span>
        </div>
      </motion.div>
    </section>
  )
}