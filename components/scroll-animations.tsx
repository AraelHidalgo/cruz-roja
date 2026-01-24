"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register plugin
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

type AnimationType = "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scale" | "stagger"

interface ScrollAnimatedSectionProps {
    children: ReactNode
    animation?: AnimationType
    className?: string
    delay?: number
    duration?: number
    staggerAmount?: number
    pin?: boolean
    pinDuration?: string
}

export function ScrollAnimatedSection({
    children,
    animation = "fadeUp",
    className = "",
    delay = 0,
    duration = 1,
    staggerAmount = 0.15,
    pin = false,
    pinDuration = "+=50%",
}: ScrollAnimatedSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!sectionRef.current) return

        const element = sectionRef.current
        const ctx = gsap.context(() => {
            // Animation configurations
            const animations: Record<AnimationType, { from: object; to: object }> = {
                fadeUp: {
                    from: { opacity: 0, y: 80 },
                    to: { opacity: 1, y: 0 },
                },
                fadeIn: {
                    from: { opacity: 0 },
                    to: { opacity: 1 },
                },
                slideLeft: {
                    from: { opacity: 0, x: -100 },
                    to: { opacity: 1, x: 0 },
                },
                slideRight: {
                    from: { opacity: 0, x: 100 },
                    to: { opacity: 1, x: 0 },
                },
                scale: {
                    from: { opacity: 0, scale: 0.8 },
                    to: { opacity: 1, scale: 1 },
                },
                stagger: {
                    from: { opacity: 0, y: 50 },
                    to: { opacity: 1, y: 0 },
                },
            }

            const config = animations[animation]

            if (animation === "stagger" && element.children.length > 0) {
                // Stagger animation for children
                gsap.fromTo(element.children, config.from, {
                    ...config.to,
                    duration,
                    delay,
                    stagger: staggerAmount,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 80%",
                        end: "top 20%",
                        toggleActions: "play none none reverse",
                    },
                })
            } else {
                // Single element animation
                gsap.fromTo(element, config.from, {
                    ...config.to,
                    duration,
                    delay,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%",
                        end: "top 20%",
                        toggleActions: "play none none reverse",
                    },
                })
            }

            // Pin animation if enabled
            if (pin) {
                ScrollTrigger.create({
                    trigger: element,
                    start: "top top",
                    end: pinDuration,
                    pin: true,
                    pinSpacing: true,
                })
            }
        }, element)

        return () => ctx.revert()
    }, [animation, delay, duration, staggerAmount, pin, pinDuration])

    return (
        <div ref={sectionRef} className={className}>
            {children}
        </div>
    )
}

/**
 * Wrapper for scroll-based text reveal animations
 */
export function ScrollRevealText({
    children,
    className = "",
    as: Component = "span"
}: {
    children: string
    className?: string
    as?: "span" | "p" | "h1" | "h2" | "h3"
}) {
    const textRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        if (!textRef.current) return

        const element = textRef.current
        // Split into words for animation
        const words = element.innerText.split(" ")
        element.innerHTML = words
            .map((word) => `<span class="inline-block overflow-hidden"><span class="inline-block">${word}</span></span>`)
            .join(" ")

        const wordSpans = element.querySelectorAll("span > span")

        gsap.fromTo(
            wordSpans,
            { y: "100%", opacity: 0 },
            {
                y: 0,
                opacity: 1,
                stagger: 0.05,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
            }
        )

        return () => {
            ScrollTrigger.getAll().forEach((t) => {
                if (t.trigger === element) t.kill()
            })
        }
    }, [children])

    return (
        <Component ref={textRef as any} className={className}>
            {children}
        </Component>
    )
}

/**
 * Number counter that animates on scroll
 */
export function ScrollCounter({
    target,
    suffix = "",
    prefix = "",
    className = "",
    duration = 2,
}: {
    target: number
    suffix?: string
    prefix?: string
    className?: string
    duration?: number
}) {
    const counterRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        if (!counterRef.current) return

        const element = counterRef.current
        const counter = { value: 0 }

        gsap.to(counter, {
            value: target,
            duration,
            ease: "power1.out",
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none none",
            },
            onUpdate: () => {
                element.textContent = `${prefix}${Math.floor(counter.value).toLocaleString()}${suffix}`
            },
        })

        return () => {
            ScrollTrigger.getAll().forEach((t) => {
                if (t.trigger === element) t.kill()
            })
        }
    }, [target, suffix, prefix, duration])

    return (
        <span ref={counterRef} className={className}>
            {prefix}0{suffix}
        </span>
    )
}
