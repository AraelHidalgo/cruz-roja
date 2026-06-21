"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { motion, Variants } from "framer-motion"
import { useScroll, useTransform } from "framer-motion"
import { Shield, Clock, Users, Sparkles, CalendarRange, HeartPulse } from "lucide-react"

const SLIDES = [
  {
    id: 1,
    image: "/carousel/1.jpeg",
    subtitle: "RESCATE URBANO Y ALTA MONTAÑA",
    title: "Primeros en llegar ante el peligro",
  },
  {
    id: 2,
    image: "/carousel/2.jpeg",
    subtitle: "APOYO EN INUNDACIONES",
    title: "Salvaguardando vidas en el Soconusco",
  },
  {
    id: 3,
    image: "/carousel/3.jpeg",
    subtitle: "SISMOS Y CONTINGENCIAS",
    title: "Tu tranquilidad en medio de la sacudida",
  },
  {
    id: 4,
    image: "/carousel/4.jpeg",
    subtitle: "PREVENCIÓN Y CAPACITACIÓN",
    title: "Preparando a Tapachula ante cualquier reto",
  },
  {
    id: 5,
    image: "/carousel/5.jpeg",
    subtitle: "LOGÍSTICA HUMANITARIA",
    title: "Puentes de auxilio donde más se necesita",
  },
  {
    id: 6,
    image: "/carousel/6.jpeg",
    subtitle: "FRONTERA HUMANITARIA",
    title: "Alivio y dignidad sin fronteras en la frontera sur",
  },
]

export function EscudoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -40])
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.85])

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

  const stats = [
    { 
      val: "Stan 2005", 
      txt: "Resiliencia histórica y respuesta ante el desastre que redefinió Tapachula.",
      icon: Shield
    },
    { 
      val: "72 Horas", 
      txt: "Despliegue crítico, instalación de albergues y centros de acopio en contingencias.",
      icon: Clock
    },
    { 
      val: "50,000+", 
      txt: "Familias chiapanecas auxiliadas con ayuda alimentaria y médica en la última década.",
      icon: Users
    }
  ]

  const historyItems = [
    {
      year: "2005",
      title: "Huracán Stan en Tapachula",
      desc: "Rescate de familias atrapadas y distribución masiva de víveres tras el desbordamiento del río Coatán."
    },
    {
      year: "2017",
      title: "Sismo de Chiapas (8.2 Mw)",
      desc: "Búsqueda y rescate en estructuras colapsadas, y distribución de ayuda en comunidades de la Sierra."
    },
    {
      year: "Lluvias",
      title: "Inundaciones en Puerto Madero",
      desc: "Evacuación de familias en zonas bajas de la costa y entrega de asistencia humanitaria inmediata."
    },
    {
      year: "Frontera",
      title: "Frontera Sur Humanitaria",
      desc: "Asistencia médica de primeros auxilios y apoyo vital a familias vulnerables y migrantes en tránsito."
    }
  ]

  return (
    <section ref={sectionRef} className="min-h-screen py-28 px-6 relative overflow-hidden bg-gradient-to-b from-white via-zinc-50 to-zinc-100">
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Cabecera con Parallax */}
        <motion.div
          className="mb-20 text-center md:text-left max-w-3xl"
          style={{
            y: parallaxY,
            opacity: parallaxOpacity,
          }}
        >
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-red-50 border border-red-200/50 rounded-full text-xs font-semibold tracking-wider text-red-700 uppercase mb-5">
            <Sparkles className="w-3.5 h-3.5 text-red-600 animate-pulse" />
            <span>Rescate y Socorro</span>
          </div>

          <h2 className="font-clash text-5xl md:text-8xl font-bold mb-6 leading-none text-zinc-950 uppercase tracking-tighter">
            EL ESCUDO DE CHIAPAS
          </h2>
          
          <p className="font-clash text-xl md:text-2xl text-red-600 font-bold mb-4">
            Resiliencia, Socorro y Prevención en el Soconusco
          </p>
          
          <p className="font-inter text-lg text-zinc-600 leading-relaxed font-medium">
            Cuando la naturaleza pone a prueba nuestra región, la Cruz Roja Tapachula responde con valor. Desde la costa hasta los caminos de la Sierra, somos el escudo que protege tu vida.
          </p>
        </motion.div>

        {/* Carrusel */}
        <div className="relative mb-20">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 5000,
              }) as any,
            ]}
            className="w-full"
          >
            <CarouselContent>
              {SLIDES.map((slide) => (
                <CarouselItem key={slide.id}>
                  <div className="relative rounded-3xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.18)] border border-zinc-200/50 group">
                    <div className="aspect-[16/9] bg-zinc-100 relative">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 80vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-103"
                        style={{
                          filter: "contrast(1.05) brightness(0.95)",
                        }}
                      />
                      {/* Overlay con mensajes dinámicos */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-8 md:p-14">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6 }}
                        >
                          <p className="font-inter text-xs md:text-sm uppercase tracking-[0.25em] text-red-400 font-extrabold mb-3">
                            {slide.subtitle}
                          </p>
                          <h3 className="font-clash text-2xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl text-white uppercase tracking-tight">
                            {slide.title}
                          </h3>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-4 md:static md:translate-x-0 md:mt-8 md:justify-end z-20">
              <CarouselPrevious className="static translate-y-0 bg-white border border-zinc-200 text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600 shadow-md transition-all duration-300" />
              <CarouselNext className="static translate-y-0 bg-white border border-zinc-200 text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600 shadow-md transition-all duration-300" />
            </div>
          </Carousel>
        </div>

        {/* Stats Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {stats.map((stat, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              className="bg-white rounded-3xl p-8 border border-zinc-100 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between min-h-[220px]"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="font-clash text-4xl md:text-5xl font-bold text-red-600 tracking-tight">
                  {stat.val}
                </div>
                <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center text-red-600">
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
              <p className="font-inter text-base text-zinc-600 leading-relaxed font-medium">
                {stat.txt}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline - Historial de Respuesta */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="bg-white rounded-3xl p-8 md:p-14 border border-zinc-100 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.06)]"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center text-red-600">
              <CalendarRange className="w-5 h-5" />
            </div>
            <h3 className="font-clash text-3xl md:text-4xl font-bold text-zinc-950 uppercase tracking-tight">
              HISTORIAL DE RESPUESTA LOCAL
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {historyItems.map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group flex gap-4 pl-4 relative border-l-2 border-zinc-200 hover:border-red-500 transition-colors duration-300 py-1"
              >
                {/* Bullets */}
                <div className="absolute -left-[7px] top-[14px] w-3 h-3 rounded-full bg-zinc-300 border-2 border-white group-hover:bg-red-600 group-hover:scale-125 transition-all duration-300" />
                <div>
                  <span className="inline-block text-[10px] font-extrabold text-red-600 bg-red-50 px-2 py-0.5 rounded-full mb-2.5 tracking-widest uppercase">
                    {item.year}
                  </span>
                  <h4 className="font-clash font-bold text-xl mb-2 text-zinc-950 uppercase tracking-tight group-hover:text-red-700 transition-colors duration-300">
                    {item.title}
                  </h4>
                  <p className="font-inter text-zinc-600 leading-relaxed font-medium text-base">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}