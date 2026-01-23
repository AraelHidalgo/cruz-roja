"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const sections = [
  { id: "inicio", label: "Inicio", href: "/" },
  { id: "banco-de-sangre", label: "Banco de Sangre", href: "/banco-de-sangre" },
  { id: "impacto", label: "Nuestro Impacto", href: "/#corazon" },
]

export function Navbar() {
  const [activeSection, setActiveSection] = useState("simulacion")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled past hero
      setIsScrolled(window.scrollY > 50)

      // Update active section based on scroll position
      const sectionElements = sections.map((section) => ({
        id: section.id,
        element: document.getElementById(section.id),
      }))

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i]
        if (section.element) {
          const rect = section.element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Call once on mount
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-black shadow-brutal transition-all duration-300"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button
              onClick={() => scrollToSection("simulacion")}
              className="flex items-center gap-3 group transition-transform hover:scale-105"
            >
              {/* Cruz Roja Logo SVG */}
              {/* Cruz Roja Logo Image */}
              <img
                src="/logoCruzRoja.png"
                alt="Cruz Roja Mexicana"
                width={128}
                height={128}
                className="transition-transform group-hover:scale-105"
              />
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {sections.map((section) => (
                <Link
                  key={section.id}
                  href={section.href}
                  className={`px-4 py-2 font-inter font-bold text-base transition-all relative group ${activeSection === section.id ? "text-red-600" : "text-black hover:text-red-600"
                    }`}
                >
                  {section.label}
                  {activeSection === section.id && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red" />}
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </Link>
              ))}
            </div>

            {/* CTA Button Desktop */}
            <a
              href="https://www.cruzrojamexicana.org.mx/donativos"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:block px-6 py-3 bg-red text-red font-clash font-bold text-sm border-4 border-black shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              DONAR AHORA
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-foreground hover:text-red transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute top-20 left-0 right-0 bg-white border-b-4 border-black shadow-brutal">
            <div className="flex flex-col p-4 gap-2">
              {sections.map((section) => (
                <Link
                  key={section.id}
                  href={section.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 font-inter font-medium text-left border-l-4 transition-all ${activeSection === section.id
                      ? "border-red-600 bg-red-50 text-red-600"
                      : "border-transparent hover:border-red-600 hover:bg-red-50 text-black"
                    }`}
                >
                  {section.label}
                </Link>
              ))}
              <a
                href="https://www.cruzrojamexicana.org.mx/donativos"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 px-6 py-3 bg-red text-white font-clash font-bold text-center border-4 border-black shadow-brutal active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
              >
                DONAR AHORA
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
