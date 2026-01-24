"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

/**
 * Hook for scroll-triggered fade-in animations
 */
export function useScrollFadeIn(options?: {
    start?: string
    end?: string
    scrub?: boolean | number
}) {
    const ref = useRef<HTMLElement>(null)

    useEffect(() => {
        if (!ref.current) return

        const element = ref.current

        gsap.fromTo(
            element,
            {
                opacity: 0,
                y: 60,
            },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: element,
                    start: options?.start || "top 85%",
                    end: options?.end || "top 20%",
                    scrub: options?.scrub ?? false,
                    toggleActions: "play none none reverse",
                },
            }
        )

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.trigger === element) trigger.kill()
            })
        }
    }, [options?.start, options?.end, options?.scrub])

    return ref
}

/**
 * Hook for staggered children animations
 */
export function useScrollStagger(options?: {
    stagger?: number
    start?: string
}) {
    const ref = useRef<HTMLElement>(null)

    useEffect(() => {
        if (!ref.current) return

        const element = ref.current
        const children = element.children

        gsap.fromTo(
            children,
            {
                opacity: 0,
                y: 40,
                scale: 0.95,
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                stagger: options?.stagger || 0.15,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: element,
                    start: options?.start || "top 80%",
                    toggleActions: "play none none reverse",
                },
            }
        )

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.trigger === element) trigger.kill()
            })
        }
    }, [options?.stagger, options?.start])

    return ref
}

/**
 * Hook for parallax scrolling effect
 */
export function useParallax(speed: number = 0.5) {
    const ref = useRef<HTMLElement>(null)

    useEffect(() => {
        if (!ref.current) return

        const element = ref.current

        gsap.to(element, {
            y: () => (ScrollTrigger.maxScroll(window) * speed * -0.5),
            ease: "none",
            scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
            },
        })

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.trigger === element) trigger.kill()
            })
        }
    }, [speed])

    return ref
}

/**
 * Hook for pinned sections with storytelling
 */
export function usePinned(options?: {
    pinSpacing?: boolean
    endTrigger?: string
}) {
    const ref = useRef<HTMLElement>(null)

    useEffect(() => {
        if (!ref.current) return

        const element = ref.current

        ScrollTrigger.create({
            trigger: element,
            start: "top top",
            end: options?.endTrigger || "+=100%",
            pin: true,
            pinSpacing: options?.pinSpacing ?? true,
        })

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.trigger === element) trigger.kill()
            })
        }
    }, [options?.pinSpacing, options?.endTrigger])

    return ref
}

/**
 * Hook for horizontal scroll reveal
 */
export function useHorizontalReveal(direction: "left" | "right" = "left") {
    const ref = useRef<HTMLElement>(null)

    useEffect(() => {
        if (!ref.current) return

        const element = ref.current
        const xOffset = direction === "left" ? -100 : 100

        gsap.fromTo(
            element,
            {
                opacity: 0,
                x: xOffset,
            },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            }
        )

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.trigger === element) trigger.kill()
            })
        }
    }, [direction])

    return ref
}

/**
 * Hook for text reveal animation (character by character)
 */
export function useTextReveal() {
    const ref = useRef<HTMLElement>(null)

    useEffect(() => {
        if (!ref.current) return

        const element = ref.current
        const text = element.innerText
        element.innerHTML = ""

        // Create spans for each character
        text.split("").forEach((char) => {
            const span = document.createElement("span")
            span.textContent = char === " " ? "\u00A0" : char
            span.style.display = "inline-block"
            span.style.opacity = "0"
            span.style.transform = "translateY(20px)"
            element.appendChild(span)
        })

        const chars = element.querySelectorAll("span")

        gsap.to(chars, {
            opacity: 1,
            y: 0,
            stagger: 0.02,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none reverse",
            },
        })

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.trigger === element) trigger.kill()
            })
        }
    }, [])

    return ref
}

/**
 * Hook for counter animation on scroll
 */
export function useScrollCounter(targetNumber: number) {
    const ref = useRef<HTMLElement>(null)

    useEffect(() => {
        if (!ref.current) return

        const element = ref.current
        const counter = { value: 0 }

        gsap.to(counter, {
            value: targetNumber,
            duration: 2,
            ease: "power1.out",
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
            onUpdate: () => {
                element.textContent = Math.floor(counter.value).toLocaleString()
            },
        })

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.trigger === element) trigger.kill()
            })
        }
    }, [targetNumber])

    return ref
}
