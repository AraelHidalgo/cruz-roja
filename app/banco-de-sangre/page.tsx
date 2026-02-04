"use client"

import { Navbar } from "@/components/navbar"
import { SmoothScroll } from "@/components/smooth-scroll"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Droplet, Heart, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RequirementsViewer } from "@/components/blood-bank/requirements-viewer"
import { ServicesGrid } from "@/components/blood-bank/services-grid"
import { TransfusionServices } from "@/components/blood-bank/transfusion-services"

export default function BancoDeSangrePage() {
    const { scrollY } = useScroll()
    const opacity = useTransform(scrollY, [0, 300], [1, 0])
    const y = useTransform(scrollY, [0, 500], [0, 200])

    return (
        <SmoothScroll>
            <Navbar />
            <main className="min-h-screen overflow-x-hidden pt-20 relative">
                {/* Gradiente blanco → rosa → rojo */}
                <div className="fixed inset-0 bg-gradient-to-b from-white via-rose-200 via-60% to-red-400 -z-10" />

                {/* Liquid Hero Section */}
                <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                    <motion.div style={{ opacity, y }} className="absolute inset-0 z-0">
                        {/* Animated Cells/Particles */}
                        <div className="absolute inset-0 opacity-20">
                            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-400 rounded-full mix-blend-overlay filter blur-[100px] animate-pulse" />
                            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-red-500 rounded-full mix-blend-overlay filter blur-[120px]" />
                        </div>

                        {/* Noise Texture */}
                        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                        />
                    </motion.div>

                    <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-red-500/30 bg-white/60 backdrop-blur-md">
                                <Droplet className="w-4 h-4 text-red-600 fill-red-600" />
                                <span className="font-mono text-xs uppercase tracking-widest text-red-900">Banco de Sangre</span>
                            </div>

                            <h1 className="font-clash text-[clamp(3.5rem,9vw,10rem)] font-bold mb-8 leading-[0.9] tracking-tight">
                                <span className="block text-black">SANTUARIO</span>
                                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-red-600 to-red-900">VITAL</span>
                            </h1>

                            <p className="font-inter text-lg md:text-2xl text-black/80 max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
                                La sangre no se fabrica. Es un tejido vivo que solo puede ser compartido por un héroe anónimo. Ese héroe eres tú.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold text-xl px-12 py-8 rounded-full shadow-[0_0_50px_rgba(220,38,38,0.5)] transition-transform hover:scale-105">
                                    REQUISITOS DE DONACIÓN
                                </Button>
                                <Button size="lg" variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white text-xl px-12 py-8 rounded-full">
                                    COSTOS DE RECUPERACIÓN
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="min-h-screen relative z-10">
                    <RequirementsViewer />
                    <ServicesGrid />
                    <TransfusionServices />

                    {/* Final CTA */}
                    <div className="py-24 text-center bg-gradient-to-b from-red-600 from-85% via-red-400 via-150%">
                        <h2 className="font-clash text-6xl font-bold mb-6 text-white">¿Listo para donar?</h2>
                        <h3 className="font-clash text-2xl mb-6 text-white/80">Atención 24 horas - 365 días</h3>
                        <Button size="lg" className="bg-white hover:bg-red-700 text-red-600 font-bold px-10 py-6 rounded-full text-lg shadow-[0_10px_40px_-10px_rgba(220,38,38,0.5)]">
                            AGENDA TU CITA
                        </Button>
                    </div>
                </section>

            </main>
        </SmoothScroll>
    )
}