"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

const sections = [
  { id: "inicio", label: "Inicio", href: "/" },
  { id: "banco-de-sangre", label: "Banco de Sangre", href: "/banco-de-sangre" },
  { id: "impacto", label: "Nuestro Impacto", href: "/#corazon" },
]

export function Navbar() {
  const pathname = usePathname()
  const [activeSection, setActiveSection] = useState("inicio")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Actualizar sección activa basado en la ruta
  useEffect(() => {
    if (pathname === "/") {
      setActiveSection("inicio")
    } else if (pathname === "/banco-de-sangre") {
      setActiveSection("banco-de-sangre")
    }
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      
      // Check if scrolled past hero
      setIsScrolled(currentScrollY > 50)

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  // Exponer el estado del menú móvil globalmente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__mobileMenuOpen = isMobileMenuOpen
      window.dispatchEvent(new CustomEvent('mobileMenuToggle', { detail: isMobileMenuOpen }))
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-white via-white to-white/95 backdrop-blur-md border-b border-black/5 shadow-sm transition-all duration-300 ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group transition-transform hover:scale-105"
            >
              <img
                src="/logoCruzRoja.png"
                alt="Cruz Roja Mexicana"
                width={128}
                height={128}
                className="transition-transform group-hover:scale-105"
              />
              <div className="hidden md:flex flex-col">
                <span className="font-inter text-xl font-bold text-black leading-tight">
                  Delegación
                </span>
                <span className="font-inter text-xl font-bold text-vital leading-tight">
                  Tapachula
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {sections.map((section) => (
                <Link
                  key={section.id}
                  href={section.href}
                  className={`px-4 py-2 font-inter font-bold text-base transition-all relative group ${
                    activeSection === section.id ? "text-red-600" : "text-black hover:text-red-600"
                  }`}
                >
                  {section.label}
                  {activeSection === section.id && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />}
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </Link>
              ))}
            </div>

            {/* CTA Button Desktop */}
            <a
              href="https://www.cruzrojamexicana.org.mx/donativos"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:block px-6 py-3 bg-white text-red-600 font-clash font-bold text-sm rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              DONAR AHORA
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-red-600 hover:text-red-700 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={28} strokeWidth={2.5} /> : <Menu size={28} strokeWidth={2.5} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute top-20 left-0 right-0 bg-gradient-to-b from-white via-white/98 to-white/95 backdrop-blur-md border-b border-black/5 shadow-lg">
            <div className="flex flex-col p-4 gap-2">
              {sections.map((section) => (
                <Link
                  key={section.id}
                  href={section.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 font-inter font-medium text-left border-l-4 transition-all ${
                    activeSection === section.id
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
                className="mt-4 px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-clash font-bold text-center rounded-full shadow-lg active:scale-95 transition-all"
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
