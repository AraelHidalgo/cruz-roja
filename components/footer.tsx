"use client"

import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Clock, ExternalLink } from "lucide-react"

const FOOTER_LINKS = {
  servicios: [
    { label: "Ambulancias 24/7", href: "/#corazon" },
    { label: "Banco de Sangre", href: "/banco-de-sangre" },
    { label: "Capacitación", href: "/#semilla" },
    { label: "Rescate y Desastres", href: "/#escudo" },
  ],
  institucional: [
    { label: "Nuestro Impacto", href: "/#corazon" },
    { label: "Ser Voluntario", href: "/#requisitos-voluntarios" },
    { label: "Donar", href: "https://www.cruzrojamexicana.org.mx/donativos", external: true },
  ],
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-950 text-gray-400 relative z-20">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-4 group">
              <Image
                src="/logoBlancoCruzRoja.png"
                alt="Cruz Roja Mexicana"
                width={48}
                height={48}
                className="transition-transform group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="font-clash text-lg font-bold text-white leading-tight">
                  Cruz Roja
                </span>
                <span className="font-inter text-xs text-gray-500 leading-tight">
                  Delegación Tapachula
                </span>
              </div>
            </Link>
            <p className="font-inter text-sm text-gray-500 leading-relaxed max-w-xs">
              El latido que mantiene vivo al país. Respondemos cuando nadie más puede.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-clash text-sm font-bold text-white uppercase tracking-wider mb-4">
              Servicios
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.servicios.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-inter text-sm text-gray-500 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Institutional */}
          <div>
            <h3 className="font-clash text-sm font-bold text-white uppercase tracking-wider mb-4">
              Institucional
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.institucional.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-inter text-sm text-gray-500 hover:text-white transition-colors inline-flex items-center gap-1.5"
                    >
                      {link.label}
                      <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="font-inter text-sm text-gray-500 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-clash text-sm font-bold text-white uppercase tracking-wider mb-4">
              Contacto
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 mt-0.5 text-vital flex-shrink-0" aria-hidden="true" />
                <div className="font-inter text-sm">
                  <span className="block text-gray-500">Emergencias</span>
                  <a href="tel:9626064212" className="text-white font-medium hover:text-vital transition-colors">
                    962-606-4212
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 mt-0.5 text-vital flex-shrink-0" aria-hidden="true" />
                <div className="font-inter text-sm">
                  <span className="block text-gray-500">Oficina</span>
                  <a href="tel:9626261949" className="text-white font-medium hover:text-vital transition-colors">
                    962-626-1949
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 text-vital flex-shrink-0" aria-hidden="true" />
                <span className="font-inter text-sm text-gray-500">
                  Tapachula, Chiapas, México
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 mt-0.5 text-vital flex-shrink-0" aria-hidden="true" />
                <span className="font-inter text-sm text-gray-500">
                  Servicio 24/7
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="font-inter text-xs text-gray-600">
              &copy; {currentYear} Cruz Roja Mexicana Delegación Tapachula. Todos los derechos reservados.
            </p>
            <p className="font-inter text-xs text-gray-600 flex items-center gap-1.5 flex-wrap justify-center">
              <span>Diseño y Desarrollo por</span>
              <span className="text-gray-400 font-medium">Carlos Rafael Reyes Jiménez</span>
              <span className="text-gray-700">&amp;</span>
              <span className="text-gray-400 font-medium">Arael Hidalgo Juárez</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
