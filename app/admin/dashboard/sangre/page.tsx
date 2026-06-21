'use client'

import React, { useState, useEffect, useTransition } from 'react'
import { getBloodStock, saveBloodStock } from '@/app/actions/admin'
import { Droplet, AlertTriangle, CheckCircle2, RefreshCw, Info, ArrowLeft, ShieldAlert } from 'lucide-react'
import Link from 'next/link'

const BLOOD_TYPES = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+']

type StockStatus = 'Critico' | 'Bajo' | 'Estable'

export default function SangreAdminPage() {
  const [stock, setStock] = useState<Record<string, StockStatus>>({})
  const [loading, setLoading] = useState(true)
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    async function loadStock() {
      try {
        const data = await getBloodStock()
        setStock(data as Record<string, StockStatus>)
      } catch (err) {
        setMessage({ type: 'error', text: 'Error al cargar el inventario.' })
      } finally {
        setLoading(false)
      }
    }
    loadStock()
  }, [])

  const handleStatusChange = (type: string, status: StockStatus) => {
    setStock((prev) => ({
      ...prev,
      [type]: status,
    }))
  }

  const handleSave = () => {
    setMessage(null)
    startTransition(async () => {
      try {
        const result = await saveBloodStock(stock)
        if (result.success) {
          setMessage({ type: 'success', text: 'Inventario guardado con éxito. Las alertas públicas se han actualizado.' })
          // Auto clear message after 4s
          setTimeout(() => setMessage(null), 4000)
        } else {
          setMessage({ type: 'error', text: 'No se pudo guardar el inventario.' })
        }
      } catch (err) {
        setMessage({ type: 'error', text: 'Error al intentar guardar en la base de datos.' })
      }
    })
  }

  // Analytics helper counts
  const criticalCount = Object.values(stock).filter((status) => status === 'Critico').length
  const bajoCount = Object.values(stock).filter((status) => status === 'Bajo').length
  const estableCount = Object.values(stock).filter((status) => status === 'Estable').length

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <RefreshCw className="w-10 h-10 animate-spin text-red-600 mb-4" />
        <p className="text-gray-500 font-medium">Cargando inventario de sangre...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Link href="/admin/dashboard" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-600 transition-colors mb-2 font-medium">
            <ArrowLeft className="w-4 h-4" />
            Volver al Inicio
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 font-clash flex items-center gap-2">
            <Droplet className="w-8 h-8 fill-red-500 text-red-600" />
            Inventario de Sangre
          </h1>
          <p className="text-gray-600 mt-1">
            Controla la disponibilidad en tiempo real para activar alertas de donantes en Tapachula.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isPending}
          className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all active:scale-[0.98]"
        >
          {isPending ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              Guardando...
            </>
          ) : (
            'Guardar Inventario'
          )}
        </button>
      </div>

      {/* Info Notice Box */}
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-xl flex gap-3 text-sm text-blue-800">
        <Info className="w-5 h-5 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold">Información del Sistema de Telemetría:</p>
          <p className="mt-1">
            Cualquier tipo de sangre marcado como <span className="font-bold text-red-700">Crítico</span> activará inmediatamente una alerta de emergencia llamativa en la parte superior de la página pública del Banco de Sangre, invitando a la población a acudir a la Cruz Roja Tapachula.
          </p>
        </div>
      </div>

      {/* Status Indicators summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-center">
          <div className="text-2xl font-extrabold text-red-600 font-clash">{criticalCount}</div>
          <div className="text-xs text-red-800 font-semibold uppercase tracking-wider mt-1">Crítico (🔴)</div>
        </div>
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-center">
          <div className="text-2xl font-extrabold text-amber-600 font-clash">{bajoCount}</div>
          <div className="text-xs text-amber-800 font-semibold uppercase tracking-wider mt-1">Bajo (🟡)</div>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center">
          <div className="text-2xl font-extrabold text-emerald-600 font-clash">{estableCount}</div>
          <div className="text-xs text-emerald-800 font-semibold uppercase tracking-wider mt-1">Estable (🟢)</div>
        </div>
      </div>

      {/* Messages */}
      {message && (
        <div className={`p-4 rounded-xl flex items-start gap-3 ${
          message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
          ) : (
            <AlertTriangle className="w-5 h-5 shrink-0 text-red-600" />
          )}
          <p className="font-medium text-sm">{message.text}</p>
        </div>
      )}

      {/* Inventory Editor Grid */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6 font-clash">Niveles por Tipo de Sangre</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BLOOD_TYPES.map((type) => {
            const currentStatus = stock[type] || 'Estable'

            return (
              <div 
                key={type} 
                className={`p-5 rounded-xl border transition-all flex items-center justify-between gap-4 ${
                  currentStatus === 'Critico' 
                    ? 'border-red-200 bg-red-50/30' 
                    : currentStatus === 'Bajo' 
                    ? 'border-amber-200 bg-amber-50/20' 
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl shadow-sm ${
                    currentStatus === 'Critico'
                      ? 'bg-red-600 text-white'
                      : currentStatus === 'Bajo'
                      ? 'bg-amber-500 text-white'
                      : 'bg-emerald-600 text-white'
                  }`}>
                    {type}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Tipo {type}</h3>
                    <p className="text-xs text-gray-500 font-medium">
                      Estado: {currentStatus === 'Critico' ? 'Crítico 🚨' : currentStatus === 'Bajo' ? 'Bajo ⚠️' : 'Estable ✅'}
                    </p>
                  </div>
                </div>

                {/* Control Selector Buttons */}
                <div className="flex gap-1.5 p-1 bg-gray-100 rounded-lg shrink-0">
                  <button
                    type="button"
                    onClick={() => handleStatusChange(type, 'Critico')}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                      currentStatus === 'Critico'
                        ? 'bg-red-600 text-white shadow-sm'
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Crítico
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusChange(type, 'Bajo')}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                      currentStatus === 'Bajo'
                        ? 'bg-amber-500 text-white shadow-sm'
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Bajo
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusChange(type, 'Estable')}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                      currentStatus === 'Estable'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Estable
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer save */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end gap-3">
          <Link
            href="/admin/dashboard"
            className="px-5 py-2.5 rounded-xl border border-gray-300 font-semibold text-gray-700 hover:bg-gray-50 text-sm transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="button"
            onClick={handleSave}
            disabled={isPending}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm shadow-md transition-all disabled:opacity-50"
          >
            {isPending ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </div>
    </div>
  )
}
