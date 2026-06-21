"use client"

import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center">
          <svg
            className="w-10 h-10 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>
        <h1 className="font-clash text-2xl font-bold text-gray-900 mb-3">
          Algo salió mal
        </h1>
        <p className="font-inter text-base text-gray-600 mb-8 leading-relaxed">
          Ocurrió un error inesperado. Puedes intentar recargar la página o contactarnos si el problema persiste.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-red-600 text-white font-clash font-bold text-sm rounded-full hover:bg-red-700 transition-colors active:scale-[0.98]"
          >
            Intentar de nuevo
          </button>
          <a
            href="tel:9626064212"
            className="px-6 py-3 bg-gray-100 text-gray-900 font-clash font-bold text-sm rounded-full hover:bg-gray-200 transition-colors"
          >
            Llamar a emergencias
          </a>
        </div>
      </div>
    </div>
  )
}
