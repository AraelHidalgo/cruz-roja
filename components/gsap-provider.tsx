"use client"

import { useEffect, useLayoutEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Use useLayoutEffect on client, useEffect on server
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect

export function GSAPProvider({ children }: { children: React.ReactNode }) {
    useIsomorphicLayoutEffect(() => {
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger)

        // Configure ScrollTrigger defaults
        ScrollTrigger.defaults({
            toggleActions: "play none none reverse",
            markers: false, // Set to true for debugging
        })

        // Refresh ScrollTrigger on resize
        const handleResize = () => {
            ScrollTrigger.refresh()
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
            // Kill all ScrollTriggers on unmount
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
        }
    }, [])

    return <>{children}</>
}
