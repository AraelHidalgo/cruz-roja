"use client"

import { useState, useEffect, useCallback } from "react"

interface GeolocationState {
    latitude: number | null
    longitude: number | null
    accuracy: number | null
    error: string | null
    loading: boolean
}

interface UseGeolocationOptions {
    enableHighAccuracy?: boolean
    timeout?: number
    maximumAge?: number
}

export function useGeolocation(options: UseGeolocationOptions = {}) {
    const [state, setState] = useState<GeolocationState>({
        latitude: null,
        longitude: null,
        accuracy: null,
        error: null,
        loading: false,
    })

    const requestLocation = useCallback(() => {
        if (!navigator.geolocation) {
            setState((prev) => ({
                ...prev,
                error: "Geolocalización no soportada en este navegador",
                loading: false,
            }))
            return
        }

        setState((prev) => ({ ...prev, loading: true, error: null }))

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                    error: null,
                    loading: false,
                })
            },
            (error) => {
                let errorMessage = "Error al obtener ubicación"
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = "Permiso de ubicación denegado"
                        break
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = "Ubicación no disponible"
                        break
                    case error.TIMEOUT:
                        errorMessage = "Tiempo de espera agotado"
                        break
                }
                setState((prev) => ({
                    ...prev,
                    error: errorMessage,
                    loading: false,
                }))
            },
            {
                enableHighAccuracy: options.enableHighAccuracy ?? true,
                timeout: options.timeout ?? 10000,
                maximumAge: options.maximumAge ?? 0,
            }
        )
    }, [options.enableHighAccuracy, options.timeout, options.maximumAge])

    return {
        ...state,
        requestLocation,
        hasLocation: state.latitude !== null && state.longitude !== null,
    }
}
