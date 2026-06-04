"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll } from "framer-motion"
import { Phone, X, AlertTriangle, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"

const EMERGENCY_PHONES = [
    { number: "962-606-4212", label: "Línea Principal" },
    { number: "962-626-1949", label: "Línea Alternativa" },
]

export function PanicButton() {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [showTooltip, setShowTooltip] = useState(false)
    const { scrollY } = useScroll()

    useEffect(() => {
        return scrollY.on("change", (latest) => {
            const scrolled = latest > 100
            setIsScrolled(scrolled)

            // Mostrar tooltip cuando se contrae por primera vez
            if (scrolled && !showTooltip) {
                setShowTooltip(true)
                // Ocultarlo después de 5 segundos
                setTimeout(() => setShowTooltip(false), 5000)
            }
        })
    }, [scrollY, showTooltip])

    // Escuchar cambios del menú móvil
    useEffect(() => {
        const handleMenuToggle = (e: CustomEvent) => {
            setIsMobileMenuOpen(e.detail)
        }
        window.addEventListener('mobileMenuToggle' as any, handleMenuToggle)
        return () => window.removeEventListener('mobileMenuToggle' as any, handleMenuToggle)
    }, [])

    const handleCall = (phone: string) => {
        window.location.href = `tel:${phone.replace(/-/g, "")}`
    }

    return (
        <>
            {/* Barra de emergencia fija - SE OCULTA INSTANTÁNEAMENTE cuando menu móvil está abierto */}
            {!isMobileMenuOpen && (
                <motion.div
                    initial={{ y: -120 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
                    className={`fixed z-40 transition-all duration-700 ease-in-out ${isScrolled
                        ? "top-24 sm:top-24 left-2 sm:left-4"
                        : "top-24 sm:top-24 left-0 right-0 sm:left-4 sm:right-auto px-2 sm:px-0"
                        }`}
                >
                    <div className={`transition-all duration-700 ease-in-out ${isScrolled ? "relative" : "max-w-4xl sm:max-w-sm mx-auto sm:mx-0"
                        }`}>
                        {/* Tooltip cuando está contraído */}
                        <AnimatePresence>
                            {isScrolled && showTooltip && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10, scale: 0.9 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: -10, scale: 0.9 }}
                                    className="absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap hidden sm:block pointer-events-none"
                                >
                                    <div className="bg-white rounded-2xl shadow-xl p-3 pr-4">
                                        <div className="flex items-center gap-2">
                                            <Phone className="w-4 h-4 text-vital" />
                                            <span className="text-sm font-medium text-black">¡Emergencias!</span>
                                        </div>
                                        <p className="text-xs text-black/60 mt-1">Click para llamar</p>
                                    </div>
                                    {/* Flecha del tooltip */}
                                    <div className="absolute top-1/2 -translate-y-1/2 -left-2 w-4 h-4 bg-white border-l border-b border-red-100 rotate-45" />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            onClick={() => setIsOpen(true)}
                            onMouseEnter={() => isScrolled && setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                            className={`bg-gradient-to-r from-vital via-red-600 to-vital text-white shadow-[0_4px_20px_rgba(220,38,38,0.4)] hover:shadow-[0_8px_30px_rgba(220,38,38,0.6)] transition-all duration-700 ease-in-out flex items-center justify-center gap-2 sm:gap-3 group cursor-pointer ${isScrolled
                                ? "w-14 h-14 rounded-full p-0"
                                : "w-full sm:w-auto py-3 sm:py-4 px-3 sm:px-6 rounded-xl sm:rounded-2xl min-h-[56px]"
                                }`}
                            aria-label="Abrir panel de emergencia"
                        >
                            {/* Icono del teléfono - siempre visible */}
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className={`bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 ${isScrolled ? "w-8 h-8" : "w-10 h-10 sm:w-8 sm:h-8"
                                    }`}
                            >
                                <Phone className="w-5 h-5" />
                            </motion.div>

                            {/* Texto - se oculta al hacer scroll */}
                            {!isScrolled && (
                                <motion.div
                                    initial={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-left flex-1 min-w-0"
                                >
                                    <div className="font-bold text-sm sm:text-base md:text-lg leading-tight truncate">
                                        ¿EMERGENCIA? LLÁMANOS
                                    </div>
                                    <div className="text-xs sm:text-sm text-white/90 font-montserrat font-bold truncate">
                                        962-606-4212 | 962-626-1949
                                    </div>
                                </motion.div>
                            )}

                            {/* Flecha - se oculta al hacer scroll */}
                            {!isScrolled && (
                                <motion.span
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                    className="text-xl sm:text-2xl flex-shrink-0 hidden sm:block"
                                >
                                    →
                                </motion.span>
                            )}
                        </button>
                    </div>
                </motion.div>
            )}

            {/* Modal de emergencia */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="fixed inset-x-2 sm:inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-md mx-auto"
                        >
                            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
                                {/* Header rojo de emergencia */}
                                <div className="bg-vital p-4 sm:p-6 text-white text-center relative">
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-colors cursor-pointer"
                                        aria-label="Cerrar"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                    <AlertTriangle className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 animate-pulse" />
                                    <h2 className="font-clash text-xl sm:text-2xl font-bold">EMERGENCIA</h2>
                                    <p className="text-white/90 text-xs sm:text-sm mt-1">
                                        Cruz Roja Tapachula
                                    </p>
                                </div>

                                {/* Botones de llamada */}
                                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                                    <p className="text-center text-black/70 text-sm mb-3 sm:mb-4">
                                        Presiona para llamar directamente
                                    </p>

                                    {EMERGENCY_PHONES.map((phone) => (
                                        <Button
                                            key={phone.number}
                                            onClick={() => handleCall(phone.number)}
                                            className="w-full min-h-[56px] h-14 sm:h-16 bg-vital hover:bg-vital/90 text-white font-bold text-base sm:text-lg rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 cursor-pointer"
                                        >
                                            <Phone className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                                            <div className="text-left">
                                                <div className="text-lg sm:text-xl font-mono">{phone.number}</div>
                                                <div className="text-xs text-white/80">{phone.label}</div>
                                            </div>
                                        </Button>
                                    ))}
                                </div>

                                {/* ADVERTENCIA SOBRE LLAMADAS FALSAS */}
                                <div className="bg-black border-t-2 border-amber-300 p-3 sm:p-4">
                                    <div className="flex items-start gap-2 sm:gap-3">
                                        <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                                            <ShieldAlert className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="font-bold text-white text-s sm:text-sm mb-1">
                                                ⚠️ SOLO EMERGENCIAS REALES
                                            </h3>
                                            <p className="text-s text-red-500 leading-relaxed">
                                                Las <strong>llamadas falsas son un delito</strong> y pueden retrasar la atención a personas que realmente la necesitan.
                                            </p>
                                            <p className="text-s text-amber-300 font-semibold mt-1 sm:mt-2">
                                                📋 Llamadas falsas son monitorizadas y reportadas.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-2 sm:p-3 bg-gray-50 text-center">
                                    <p className="text-black/50 text-xs">
                                        Disponible 24/7 los 365 días del año
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}