"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform } from "framer-motion"
import { Ambulance, Heart, GraduationCap, Stethoscope, MapPin, Phone } from "lucide-react"

const SERVICES = [
  { icon: Ambulance, label: "Ambulancias 24/7", color: "from-red-500 to-red-600" },
  { icon: Heart, label: "Banco de Sangre", color: "from-rose-500 to-rose-600" },
  { icon: GraduationCap, label: "Capacitación", color: "from-pink-500 to-pink-600" },
  { icon: Stethoscope, label: "Primeros Auxilios", color: "from-red-400 to-red-500" },
]

interface HeroProps {
  onOpenSimulation: () => void
  onOpenRouteSimulator?: () => void
}

export function Hero({ onOpenSimulation, onOpenRouteSimulator }: HeroProps) {
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
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden pt-28 sm:pt-20 md:pt-0 pb-12">
      {/* Gradiente visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-rose-100 via-90% to-red-300" />

      {/* Dynamic gradient overlay */}
      <motion.div
        style={{ opacity: gradientOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-200 via-90% to-red-400"
      />

      {/* Background w/ Parallax */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-red-300/30 rounded-full blur-[100px] sm:blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-red-400/30 rounded-full blur-[80px] sm:blur-[120px]" />
      </motion.div>

      {/* Heartbeat Center Visual */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <motion.div
          animate={{ scale: [1, 1.03, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[20rem] sm:w-[30rem] md:w-[40rem] h-[20rem] sm:h-[30rem] md:h-[40rem] rounded-full bg-red-400/25 blur-[80px] sm:blur-[120px]"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Badge de ubicación */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full border border-red-200 mb-4 sm:mb-6"
          >
            <MapPin className="w-4 h-4 text-vital" />
            <span className="text-xs sm:text-sm font-medium text-black/80">Tapachula, Chiapas</span>
          </motion.div>

          <h1 className="text-[clamp(2rem,8vw,5rem)] font-bold leading-[0.95] tracking-tight mb-3 sm:mb-4 font-clash">
            <span className="block text-vital drop-shadow-[0_0_40px_rgba(220,38,38,0.4)]">
              Cruz Roja
            </span>
            <span className="block text-black drop-shadow-sm">
              Tapachula
            </span>
          </h1>
          <p className="font-inter text-lg sm:text-xl md:text-2xl text-black/80 font-medium mb-2">
            El Latido de tu Comunidad
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-inter text-sm sm:text-base md:text-lg text-black/60 max-w-xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4"
        >
          Cada 12 segundos, alguien necesita ayuda. Nosotros respondemos cuando nadie más puede.
        </motion.p>

        {/* Servicios Inmediatos - 2x2 mobile, 4 cols desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 max-w-3xl mx-auto mb-8 sm:mb-10 px-2"
        >
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="bg-white/70 backdrop-blur-sm border border-red-200/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:bg-white/90 hover:border-red-300 hover:shadow-lg transition-all min-h-[90px] sm:min-h-[110px] flex flex-col items-center justify-center">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-1.5 sm:mb-2 rounded-lg sm:rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <span className="text-[10px] sm:text-xs md:text-sm font-medium text-black/80 leading-tight text-center">{service.label}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-8 sm:mb-10 inline-block group perspective-1000"
        >
          <div className="relative bg-white/60 backdrop-blur-xl border border-red-300/40 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden transition-transform duration-500 hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-tr from-vital/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="text-3xl sm:text-4xl md:text-6xl font-bold text-vital font-mono tracking-tighter tabular-nums drop-shadow-sm">
                {Math.floor(emergencyCount).toLocaleString()}
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.1em] sm:tracking-[0.15em] uppercase mt-1 sm:mt-2 text-black/70">
                Emergencias Atendidas
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTAs - stack on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4"
        >
          <Button
            onClick={onOpenSimulation}
            size="lg"
            className="bg-vital hover:bg-vital/90 text-white font-bold text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 rounded-full shadow-[0_10px_40px_-10px_rgba(220,38,38,0.5)] hover:shadow-[0_20px_60px_-15px_rgba(220,38,38,0.6)] transition-all hover:-translate-y-1 hover:scale-105 active:scale-95 cursor-pointer min-h-[52px]"
          >
            <span className="mr-2 animate-pulse text-base sm:text-lg">🚨</span>
            SIMULAR EMERGENCIA
          </Button>

          {onOpenRouteSimulator && (
            <Button
              onClick={onOpenRouteSimulator}
              size="lg"
              variant="outline"
              className="border-2 border-vital text-vital hover:bg-vital hover:text-white font-bold text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 rounded-full transition-all hover:-translate-y-1 hover:scale-105 active:scale-95 cursor-pointer min-h-[52px]"
            >
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              TIEMPO DE RESPUESTA
            </Button>
          )}
        </motion.div>

      </div>

      {/* Scroll Indicator - hidden on very small screens */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 hidden sm:flex"
      >

        <div className="w-px h-8 sm:h-12 bg-gradient-to-b from-vital/50 to-transparent" />
      </motion.div>

      {/* 24/7 Badge - hidden on mobile */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-8 hidden md:block"
      >
        <div className="flex items-center gap-3 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-red-300/40 hover:bg-vital/90 hover:border-vital hover:text-white transition-all duration-300 hover:scale-105 cursor-pointer group">
          <div className="w-2 h-2 rounded-full bg-vital animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.8)] group-hover:bg-white group-hover:shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
          <span className="font-inter text-xs font-medium text-black/70 tracking-wider group-hover:text-white transition-colors duration-300">ACTIVOS 24/7/365</span>
        </div>
      </motion.div>
    </section>
  )
}