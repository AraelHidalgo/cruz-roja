"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Navigation, Clock, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useGeolocation } from "@/hooks/use-geolocation"

// Coordenadas de Cruz Roja Tapachula
const CRUZ_ROJA_COORDS = {
    lat: 14.9073,
    lng: -92.2586,
}

interface RouteSimulatorProps {
    isOpen: boolean
    onClose: () => void
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
}

function estimateTime(distanceKm: number): number {
    return Math.ceil((distanceKm / 40) * 60)
}

export function RouteSimulator({ isOpen, onClose }: RouteSimulatorProps) {
    const { latitude, longitude, loading, error, requestLocation, hasLocation } = useGeolocation()
    const [animationProgress, setAnimationProgress] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const animationRef = useRef<number | null>(null)

    const distance = hasLocation
        ? calculateDistance(CRUZ_ROJA_COORDS.lat, CRUZ_ROJA_COORDS.lng, latitude!, longitude!)
        : 0
    const estimatedMinutes = estimateTime(distance)

    useEffect(() => {
        if (isOpen && !hasLocation && !loading) {
            requestLocation()
        }
    }, [isOpen, hasLocation, loading, requestLocation])

    useEffect(() => {
        if (hasLocation && isOpen && !isAnimating) {
            startAnimation()
        }
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [hasLocation, isOpen])

    const startAnimation = () => {
        setIsAnimating(true)
        setAnimationProgress(0)
        const startTime = Date.now()
        const duration = 5000

        const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            setAnimationProgress(progress)

            if (progress < 1) {
                animationRef.current = requestAnimationFrame(animate)
            } else {
                setIsAnimating(false)
            }
        }

        animationRef.current = requestAnimationFrame(animate)
    }

    if (!isOpen) return null

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-vital to-red-500 p-4 sm:p-6 text-white relative">
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-colors cursor-pointer"
                            aria-label="Cerrar"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <Navigation className="w-8 h-8 sm:w-10 sm:h-10 mb-2 sm:mb-3" />
                        <h2 className="font-clash text-xl sm:text-2xl font-bold">Tiempo de Respuesta</h2>
                        <p className="text-white/90 text-xs sm:text-sm mt-1">Simulación de ruta de ambulancia</p>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-6">
                        {loading ? (
                            <div className="text-center py-6 sm:py-8">
                                <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-vital mx-auto animate-spin mb-4" />
                                <p className="text-black/70 text-sm sm:text-base">Obteniendo tu ubicación...</p>
                            </div>
                        ) : error ? (
                            <div className="text-center py-6 sm:py-8">
                                <MapPin className="w-10 h-10 sm:w-12 sm:h-12 text-vital/50 mx-auto mb-4" />
                                <p className="text-black/70 mb-4 text-sm sm:text-base px-2">{error}</p>
                                <Button
                                    onClick={requestLocation}
                                    className="bg-vital hover:bg-vital/90 text-white min-h-[44px] cursor-pointer"
                                >
                                    Reintentar
                                </Button>
                            </div>
                        ) : hasLocation ? (
                            <div className="space-y-4 sm:space-y-6">
                                {/* Visualización de ruta */}
                                <div className="relative h-24 sm:h-32 bg-gradient-to-r from-rose-50 to-red-50 rounded-xl sm:rounded-2xl overflow-hidden">
                                    {/* Línea de ruta */}
                                    <div className="absolute top-1/2 left-6 sm:left-8 right-6 sm:right-8 h-1 bg-red-200 rounded-full">
                                        <motion.div
                                            className="h-full bg-vital rounded-full"
                                            style={{ width: `${animationProgress * 100}%` }}
                                        />
                                    </div>

                                    {/* Punto de origen - Cruz Roja */}
                                    <div className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 flex flex-col items-center">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-vital rounded-full flex items-center justify-center shadow-lg">
                                            <span className="text-white text-base sm:text-lg">✚</span>
                                        </div>
                                        <span className="text-[8px] sm:text-[10px] mt-1 text-black/60 font-medium">Cruz Roja</span>
                                    </div>

                                    {/* Ambulancia animada */}
                                    <motion.div
                                        className="absolute top-1/2 -translate-y-1/2"
                                        style={{ left: `calc(2.5rem + ${animationProgress * (100 - 20)}% - 1rem)` }}
                                    >
                                        <div className="text-2xl sm:text-3xl animate-bounce">🚑</div>
                                    </motion.div>

                                    {/* Punto de destino - Usuario */}
                                    <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 flex flex-col items-center">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                                            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                        </div>
                                        <span className="text-[8px] sm:text-[10px] mt-1 text-black/60 font-medium">Tu ubicación</span>
                                    </div>
                                </div>

                                {/* Estadísticas */}
                                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                    <div className="bg-rose-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
                                        <Navigation className="w-5 h-5 sm:w-6 sm:h-6 text-vital mx-auto mb-1 sm:mb-2" />
                                        <div className="text-xl sm:text-2xl font-bold text-black">{distance.toFixed(1)} km</div>
                                        <div className="text-[10px] sm:text-xs text-black/60">Distancia</div>
                                    </div>
                                    <div className="bg-rose-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
                                        <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-vital mx-auto mb-1 sm:mb-2" />
                                        <div className="text-xl sm:text-2xl font-bold text-black">~{estimatedMinutes} min</div>
                                        <div className="text-[10px] sm:text-xs text-black/60">Tiempo estimado</div>
                                    </div>
                                </div>

                                {/* Mensaje */}
                                <div className="bg-green-50 border border-green-200 rounded-xl p-3 sm:p-4 text-center">
                                    <p className="text-green-800 text-xs sm:text-sm font-medium">
                                        ✅ La Cruz Roja Tapachula puede llegar en aproximadamente{" "}
                                        <strong>{estimatedMinutes} minutos</strong>
                                    </p>
                                </div>

                                {/* Botón de reiniciar */}
                                <Button
                                    onClick={startAnimation}
                                    disabled={isAnimating}
                                    className="w-full bg-vital hover:bg-vital/90 text-white font-bold py-3 min-h-[48px] cursor-pointer"
                                >
                                    {isAnimating ? "Simulando..." : "Reiniciar Simulación"}
                                </Button>
                            </div>
                        ) : null}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
