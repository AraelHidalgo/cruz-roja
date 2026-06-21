"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { SmoothScroll } from "@/components/smooth-scroll"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Droplet, Heart, ShieldCheck, AlertTriangle } from "lucide-react"
import { RequirementsViewer } from "@/components/blood-bank/requirements-viewer"
import { ServicesGrid } from "@/components/blood-bank/services-grid"
import { TransfusionServices } from "@/components/blood-bank/transfusion-services"
import { BloodTypeWidget } from "@/components/blood-bank/blood-type-widget"
import { Button } from "@/components/ui/button"
import { getBloodStock } from "@/app/actions/admin"

export default function BancoDeSangrePage() {
    const { scrollY } = useScroll()
    const opacity = useTransform(scrollY, [0, 300], [1, 0])
    const y = useTransform(scrollY, [0, 500], [0, 200])

    const [stock, setStock] = useState<Record<string, string>>({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchStock() {
            try {
                const data = await getBloodStock()
                setStock(data)
            } catch (err) {
                console.error("Error fetching blood stock:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchStock()
    }, [])

    const criticalTypes = Object.entries(stock)
        .filter(([_, status]) => status === "Critico")
        .map(([type]) => type)

    return (
        <SmoothScroll>
            <Navbar />
            <main className="min-h-screen overflow-x-hidden pt-20 relative">
                {/* Gradiente blanco → rosa → rojo */}
                <div className="fixed inset-0 bg-gradient-to-b from-white via-rose-100 via-60% to-red-300 -z-10" />

                {/* Emergency Flashing Alert Banner */}
                {criticalTypes.length > 0 && (
                    <div className="bg-red-600 text-white py-3.5 px-4 text-center font-bold tracking-wide border-b-4 border-black relative z-40 flex items-center justify-center flex-wrap gap-2.5 shadow-md">
                        <span className="inline-flex items-center justify-center bg-white text-red-600 rounded-full w-6 h-6 text-sm font-black animate-bounce shadow-sm">!</span>
                        <span className="font-clash tracking-wide uppercase text-sm sm:text-base">
                            ATENCIÓN URGENTE: Se requieren donantes de tipo {criticalTypes.join(', ')} en Tapachula.
                        </span>
                        <a href="#requisitos" className="underline bg-black text-white hover:bg-zinc-800 transition-colors ml-3 px-3 py-1 rounded-md text-xs font-mono border border-white">
                            ¿CÓMO DONAR?
                        </a>
                    </div>
                )}

                {/* Liquid Hero Section - Split Layout */}
                <section className="relative py-20 lg:py-32 px-4 sm:px-6 overflow-hidden flex items-center min-h-[90vh]">
                    <motion.div style={{ opacity, y }} className="absolute inset-0 z-0 pointer-events-none">
                        {/* Animated Cells/Particles */}
                        <div className="absolute inset-0 opacity-20">
                            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-400 rounded-full mix-blend-overlay filter blur-[100px] animate-pulse" />
                            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-red-500 rounded-full mix-blend-overlay filter blur-[120px]" />
                        </div>
                    </motion.div>

                    <div className="relative z-10 max-w-7xl mx-auto w-full">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                            {/* Left side: Copy & Title */}
                            <div className="lg:col-span-7 text-left space-y-8">
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                >
                                    <Heart className="w-5 h-5 text-red-600 fill-red-600 animate-pulse" />
                                    <span className="font-mono text-xs uppercase tracking-widest text-zinc-800 font-black">
                                        EL LATIDO QUE COMPARTES
                                    </span>
                                </motion.div>

                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.1 }}
                                    className="font-clash text-5xl sm:text-7xl xl:text-8xl font-bold leading-[0.9] tracking-tight uppercase"
                                >
                                    <span className="block text-zinc-950">COMPARTIR</span>
                                    <span className="block text-red-600">VIDA.</span>
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="font-inter text-lg sm:text-xl md:text-2xl text-zinc-700 leading-relaxed font-medium max-w-2xl"
                                >
                                    La sangre no se vende ni se fabrica. Las donaciones son 100% altruistas, y los componentes sanguíneos se entregan bajo cuotas de recuperación destinadas a cubrir los análisis de seguridad (VIH, Hepatitis, etc.) y almacenamiento.
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                    className="flex flex-col sm:flex-row gap-4 pt-4"
                                >
                                    <a
                                        href="#requisitos"
                                        className="bg-red-600 text-white font-clash text-lg sm:text-xl font-bold px-8 py-5 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-4 border-black transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] text-center"
                                    >
                                        REQUISITOS DE DONACIÓN
                                    </a>
                                    <a
                                        href="#costos"
                                        className="bg-white text-black font-clash text-lg sm:text-xl font-bold px-8 py-5 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-4 border-black transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] text-center"
                                    >
                                        CUOTAS DE RECUPERACIÓN
                                    </a>
                                </motion.div>
                            </div>

                            {/* Right side: Interactive Widget & Live Stock */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="lg:col-span-5 w-full space-y-6"
                            >
                                <BloodTypeWidget />

                                {/* Live Inventory Stock Panel */}
                                <div className="bg-white rounded-[32px] p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-black">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Droplet className="w-5 h-5 text-red-600 fill-red-600" />
                                        <span className="font-mono text-xs uppercase tracking-wider text-zinc-600 font-bold">
                                            ESTADO DEL INVENTARIO (TAPACHULA)
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-4 gap-2">
                                        {['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'].map((type) => {
                                            const status = stock[type] || 'Estable'
                                            return (
                                                <div 
                                                    key={type} 
                                                    className={`flex flex-col items-center p-2 rounded-xl border-2 transition-colors ${
                                                        status === 'Critico' 
                                                            ? 'border-red-600 bg-red-50' 
                                                            : status === 'Bajo' 
                                                            ? 'border-amber-400 bg-amber-50' 
                                                            : 'border-zinc-200 bg-zinc-50'
                                                    }`}
                                                >
                                                    <span className="font-clash font-extrabold text-sm">{type}</span>
                                                    <span className={`w-3 h-3 rounded-full mt-2 border border-black/10 relative ${
                                                        status === 'Critico' 
                                                            ? 'bg-red-600' 
                                                            : status === 'Bajo' 
                                                            ? 'bg-amber-500' 
                                                            : 'bg-emerald-500'
                                                    }`}>
                                                        {status === 'Critico' && (
                                                            <span className="absolute inset-0 rounded-full bg-red-600 animate-ping opacity-75" />
                                                        )}
                                                    </span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="flex justify-between text-[10px] font-bold font-mono text-zinc-500 pt-4 border-t border-zinc-100 mt-4 flex-wrap gap-2">
                                        <span className="flex items-center gap-1">
                                            <span className="w-2 h-2 rounded-full bg-red-600 inline-block" /> CRÍTICO
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" /> BAJO
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> ESTABLE
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
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