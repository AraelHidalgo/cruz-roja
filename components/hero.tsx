"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform } from "framer-motion"
import { Ambulance, Heart, GraduationCap, Stethoscope, MapPin, AlertTriangle } from "lucide-react"

const EmergencySimulation = dynamic(
  () => import("@/components/emergency-simulation").then(mod => ({ default: mod.EmergencySimulation })),
  { ssr: false }
)

const RouteSimulator = dynamic(
  () => import("@/components/route-simulator").then(mod => ({ default: mod.RouteSimulator })),
  { ssr: false }
)

const SERVICES = [
  { icon: Ambulance, label: "Ambulancias 24/7", color: "from-white/90 to-white/70" },
  { icon: Heart, label: "Banco de Sangre", color: "from-white/90 to-white/70" },
  { icon: GraduationCap, label: "Capacitación", color: "from-white/90 to-white/70" },
  { icon: Stethoscope, label: "Primeros Auxilios", color: "from-white/90 to-white/70" },
]

interface HeroProps {
  title?: string | null
  content?: string | null
  imageUrl?: string | null
}

export function Hero({ title, content, imageUrl }: HeroProps) {
  const [isSimulationOpen, setIsSimulationOpen] = useState(false)
  const [isRouteSimulatorOpen, setIsRouteSimulatorOpen] = useState(false)
  const counterRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 200])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const gradientOpacity = useTransform(scrollY, [0, 600], [0, 0.3])

  useEffect(() => {
    const targetCount = 2500000
    const duration = 3000
    const startTime = performance.now()
    let animFrame: number

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out curve
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(eased * targetCount)
      if (counterRef.current) {
        counterRef.current.textContent = current.toLocaleString()
      }
      if (progress < 1) {
        animFrame = requestAnimationFrame(tick)
      }
    }

    animFrame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animFrame)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden pt-28 sm:pt-20 md:pt-0 pb-12">
      <div className="absolute inset-0 bg-gradient-to-b from-red-700 via-red-600 via-90% to-red-500" />

      <motion.div style={{ opacity: gradientOpacity }} className="absolute inset-0 bg-gradient-to-b from-transparent via-red-700 via-90% to-red-800" />

      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-white/10 rounded-full blur-[40px] sm:blur-[60px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-white/10 rounded-full blur-[30px] sm:blur-[50px]" />
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <motion.div
          animate={{ scale: [1, 1.03, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[20rem] sm:w-[30rem] md:w-[40rem] h-[20rem] sm:h-[30rem] md:h-[40rem] rounded-full bg-white/10 blur-[40px] sm:blur-[60px]"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center w-full">

        {/* --- CONTENEDOR DE LA IMAGEN --- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-center relative z-10" // z-10 para que esté detrás del texto si se enciman
        >
          <div className="relative w-32 h-32 md:w-64 md:h-64 lg:w-80 lg:h-80 transition-all duration-300">
            <Image
              src={imageUrl || "/logoBlancoCruzRoja.png"}
              alt="Logo Cruz Roja Mexicana Delegación Tapachula"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </motion.div>

        {/* --- CONTENEDOR DEL CONTENIDO (BADGE + TITULO) --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          /* 
             CONTROL DE POSICIÓN:
             Usa mt-[-valor] para subir el elemento. 
             Ejemplos: 
             - mt-[-20px] (Sube un poco)
             - mt-[-80px] (Se encima bastante en PC)
             - mt-[-150px] (Se encima casi hasta la mitad de la imagen)
          */
          className="relative z-20 mt-[-30px] sm:mt-[-50px] md:mt-[-80px] lg:mt-[-100px]"
        >
          {/* Badge de ubicación */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-black/30 backdrop-blur-md rounded-full border border-white/30 mb-4 sm:mb-6 shadow-sm"
          >
            <MapPin className="w-6 h-6 text-white" />
            <span className="text-xs sm:text-sm font-bold text-white/90">Tapachula, Chiapas</span>
          </motion.div>
          <p className="font-inter text-lg sm:text-xl md:text-2xl text-white/90 font-medium mb-2 whitespace-pre-wrap">
            {title || "El Latido de tu Comunidad"}
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-inter text-sm sm:text-base md:text-lg text-white/80 max-w-xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4 whitespace-pre-wrap"
        >
          {content || "Cada 12 segundos, alguien necesita ayuda. Nosotros respondemos cuando nadie más puede."}
        </motion.p>

        {/* Servicios */}
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
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:bg-white/20 hover:border-white/40 hover:shadow-lg transition-all min-h-[90px] sm:min-h-[110px] flex flex-col items-center justify-center">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-1.5 sm:mb-2 rounded-lg sm:rounded-xl bg-gradient-to-br from-white/90 to-white/70 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-5 h-5 sm:w-6 sm:h-6 text-vital" />
                </div>
                <span className="text-[10px] sm:text-xs md:text-sm font-medium text-white/90 leading-tight text-center">{service.label}</span>
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
          <div className="relative bg-white text-red-600 border-4 border-white p-4 sm:p-6 md:p-8 rounded-[24px] sm:rounded-[32px] shadow-[0_15px_50px_-15px_rgba(0,0,0,0.3)] overflow-hidden transition-transform duration-500 hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-tr from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div ref={counterRef} className="text-3xl sm:text-4xl md:text-6xl font-bold text-red-600 font-mono tracking-tighter tabular-nums drop-shadow-sm">
                0
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.1em] sm:tracking-[0.15em] uppercase mt-1 sm:mt-2 text-zinc-700">
                Emergencias Atendidas
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4"
        >
          <Button
            onClick={() => setIsSimulationOpen(true)}
            size="lg"
            className="bg-white hover:bg-white/90 text-vital font-bold text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] transition-all hover:-translate-y-1"
          >
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-pulse" aria-hidden="true" />
            SIMULAR EMERGENCIA
          </Button>

          <Button
            onClick={() => setIsRouteSimulatorOpen(true)}
            size="lg"
            variant="outline"
            className="bg-white text-vital hover:bg-white/90 hover:text-vital font-bold text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 rounded-full transition-all hover:-translate-y-1"
          >
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            TIEMPO DE RESPUESTA
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 hidden sm:flex"
      >
        <div className="w-px h-8 sm:h-12 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>

      {/* Modals */}
      <EmergencySimulation isOpen={isSimulationOpen} onClose={() => setIsSimulationOpen(false)} />
      <RouteSimulator isOpen={isRouteSimulatorOpen} onClose={() => setIsRouteSimulatorOpen(false)} />
    </section>
  )
}