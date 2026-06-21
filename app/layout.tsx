import type React from "react"
import type { Metadata } from "next"
import { Inter_Tight, Montserrat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "El Latido de México | Cruz Roja Mexicana Delegación Tapachula",
  description:
    "La Cruz Roja Mexicana es el latido que mantiene vivo al país. Ambulancias 24/7, banco de sangre, capacitación y rescate en Tapachula, Chiapas.",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "El Latido de México | Cruz Roja Mexicana",
    description: "Ambulancias 24/7, banco de sangre, capacitación y rescate. La Cruz Roja Mexicana Delegación Tapachula responde cuando nadie más puede.",
    type: "website",
    locale: "es_MX",
    images: [
      {
        url: "/logoCruzRoja.png",
        width: 800,
        height: 800,
        alt: "Cruz Roja Mexicana Delegación Tapachula",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "El Latido de México | Cruz Roja Mexicana",
    description: "Ambulancias 24/7, banco de sangre, capacitación y rescate en Tapachula, Chiapas.",
    images: ["/logoCruzRoja.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@600,700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${interTight.variable} ${montserrat.variable} font-inter antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
