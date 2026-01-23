"use client"

import { Navbar } from "@/components/navbar"
import { SmoothScroll } from "@/components/smooth-scroll"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Droplet, Heart, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RequirementsViewer } from "@/components/blood-bank/requirements-viewer"
import { ServicesGrid } from "@/components/blood-bank/services-grid"

export default function BancoDeSangrePage() {
    const { scrollY } = useScroll()
    const opacity = useTransform(scrollY, [0, 300], [1, 0])
    const y = useTransform(scrollY, [0, 500], [0, 200])

    return (
        <SmoothScroll>
            <Navbar />
            <main className="min-h-screen bg-black text-white overflow-x-hidden pt-20">

                {/* Liquid Hero Section */}
                <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                    <motion.div style={{ opacity, y }} className="absolute inset-0 z-0">
                        {/* Deep Venous Background */}
                        <div className="absolute inset-0 bg-gradient-to-b from-[#4a0404] via-[#2a0202] to-black" />

                        {/* Animated Cells/Particles */}
                        <div className="absolute inset-0 opacity-30">
                            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-600 rounded-full mix-blend-overlay filter blur-[100px] animate-pulse" />
                            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-red-800 rounded-full mix-blend-overlay filter blur-[120px] opacity-70" />
                        </div>

                        {/* Noise Texture */}
                        <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                        />
                    </motion.div>

                    <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-red-500/30 bg-red-900/20 backdrop-blur-md">
                                <Droplet className="w-4 h-4 text-red-500 fill-red-500" />
                                <span className="font-mono text-xs uppercase tracking-widest text-red-200">Banco de Sangre</span>
                            </div>

                            <h1 className="font-clash text-7xl md:text-[10rem] font-bold mb-8 leading-[0.9] tracking-tight">
                                <span className="block text-white">SANTUARIO</span>
                                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-red-900">VITAL</span>
                            </h1>

                            <p className="font-inter text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
                                La sangre no se fabrica. Es un tejido vivo que solo puede ser compartido por un héroe anónimo. Ese héroe eres tú.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold text-xl px-12 py-8 rounded-full shadow-[0_0_50px_rgba(220,38,38,0.5)] transition-transform hover:scale-105">
                                    REQUISITOS DE DONACIÓN
                                </Button>
                                <Button size="lg" variant="outline" className="border-red-900/50 text-black hover:bg-red-900/20 text-xl px-12 py-8 rounded-full">
                                    COSTOS DE RECUPERACIÓN
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="min-h-screen relative z-10 bg-black">
                    <RequirementsViewer />
                    <ServicesGrid />

                    {/* Final CTA */}
                    <div className="py-24 text-center bg-gradient-to-t from-red-900/20 to-black">
                        <h2 className="font-clash text-4xl font-bold mb-6 text-white">¿Listo para donar?</h2>
                        <h3 className="font-clash text-2xl  mb-6 text-white">Atencion 24 horas - 365 días </h3>
                        <Button size="lg" className="bg-white text-red-900 hover:bg-gray-200 font-bold px-10 py-6 rounded-full text-lg">
                            AGENDA TU CITA
                        </Button>
                    </div>
                </section>

            </main>
        </SmoothScroll>
    )
}
