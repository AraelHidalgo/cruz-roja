import type React from "react"
import type { Metadata } from "next"
import { Inter_Tight } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "El Latido de México | Cruz Roja Mexicana",
  description:
    "La Cruz Roja Mexicana es el latido que mantiene vivo al país. Descubre por qué sin nosotros, el sistema de respuesta colapsa.",
  generator: "v0.app",
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&display=swap" rel="stylesheet" />
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @font-face {
            font-family: 'Clash Display';
            src: url('https://api.fontshare.com/v2/css?f[]=clash-display@600,700&display=swap');
            font-weight: 600 700;
            font-display: swap;
          }
        `,
          }}
        />
      </head>
      <body className={`${interTight.variable} font-inter antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
