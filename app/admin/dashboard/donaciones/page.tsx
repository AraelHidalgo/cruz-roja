'use client'

import React, { useState, useEffect, useTransition } from 'react'
import { getDonationGoal, saveDonationGoal } from '@/app/actions/admin'
import { Heart, RefreshCw, CheckCircle2, AlertTriangle, ArrowLeft, TrendingUp, DollarSign, Info } from 'lucide-react'
import Link from 'next/link'

export default function DonacionesAdminPage() {
  const [goal, setGoal] = useState<number>(50000)
  const [current, setCurrent] = useState<number>(24500)
  const [loading, setLoading] = useState(true)
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    async function loadGoals() {
      try {
        const data = await getDonationGoal()
        setGoal(data.goal)
        setCurrent(data.current)
      } catch (err) {
        setMessage({ type: 'error', text: 'Error al cargar las metas de donación.' })
      } finally {
        setLoading(false)
      }
    }
    loadGoals()
  }, [])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    if (goal <= 0) {
      setMessage({ type: 'error', text: 'La meta de donación debe ser mayor que cero.' })
      return
    }

    if (current < 0) {
      setMessage({ type: 'error', text: 'La cantidad recaudada no puede ser negativa.' })
      return
    }

    startTransition(async () => {
      try {
        const result = await saveDonationGoal(goal, current)
        if (result.success) {
          setMessage({ type: 'success', text: 'Metas de donación actualizadas con éxito.' })
          setTimeout(() => setMessage(null), 4000)
        } else {
          setMessage({ type: 'error', text: 'No se pudieron actualizar las metas.' })
        }
      } catch (err) {
        setMessage({ type: 'error', text: 'Error de servidor al guardar la meta.' })
      }
    })
  }

  const percentage = Math.min(Math.round((current / goal) * 100) || 0, 100)

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <RefreshCw className="w-10 h-10 animate-spin text-red-600 mb-4" />
        <p className="text-gray-500 font-medium">Cargando metas de donación...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link href="/admin/dashboard" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-600 transition-colors mb-2 font-medium">
          <ArrowLeft className="w-4 h-4" />
          Volver al Inicio
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 font-clash flex items-center gap-2">
          <Heart className="w-8 h-8 fill-red-500 text-red-600" />
          Metas de Donación
        </h1>
        <p className="text-gray-600 mt-1">
          Ajusta la meta de recaudación mensual y el monto recolectado.
        </p>
      </div>

      {/* Info Notice Box */}
      <div className="bg-amber-50 border-l-4 border-amber-600 p-4 rounded-r-xl flex gap-3 text-sm text-amber-800">
        <Info className="w-5 h-5 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold">Transparencia y Cuotas de Recuperación:</p>
          <p className="mt-1">
            Los servicios del banco de sangre conllevan una cuota de recuperación para el mantenimiento de reactivos, bolsas y conservación. Mostrar metas claras ayuda a la comunidad a comprender las necesidades financieras de la Cruz Roja Tapachula.
          </p>
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

      {/* Live Calculator & Form Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Editor Form */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm lg:col-span-2">
          <h2 className="text-xl font-bold text-gray-900 mb-6 font-clash">Configurar Avance Financiero</h2>
          
          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  Meta del Mes (MXN)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-gray-400 font-bold">$</span>
                  <input
                    type="number"
                    value={goal}
                    onChange={(e) => setGoal(Number(e.target.value))}
                    placeholder="50000"
                    min="1"
                    required
                    className="w-full pl-8 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl font-semibold text-gray-900 focus:bg-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">Monto total presupuestado como meta.</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-gray-400" />
                  Recaudado Actual (MXN)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-gray-400 font-bold">$</span>
                  <input
                    type="number"
                    value={current}
                    onChange={(e) => setCurrent(Number(e.target.value))}
                    placeholder="24500"
                    min="0"
                    required
                    className="w-full pl-8 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl font-semibold text-gray-900 focus:bg-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">Avance actual acumulado en el mes.</p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
              <Link
                href="/admin/dashboard"
                className="px-5 py-2.5 rounded-xl border border-gray-300 font-semibold text-gray-700 hover:bg-gray-50 text-sm transition-colors"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={isPending}
                className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow-md transition-all active:scale-[0.98]"
              >
                {isPending ? 'Guardando...' : 'Guardar Meta'}
              </button>
            </div>
          </form>
        </div>

        {/* Live Visualizer Widget */}
        <div className="bg-gradient-to-br from-red-50 to-white border border-red-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 font-clash">Vista Previa en Vivo</h3>
            
            <div className="bg-white rounded-xl p-4 border border-red-100 shadow-sm space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-md">
                    Campaña Mensual
                  </span>
                  <h4 className="font-bold text-gray-800 mt-1">Tapachula Late Contigo</h4>
                </div>
                <Heart className="w-5 h-5 fill-red-500 text-red-500" />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-sm font-semibold">
                  <span className="text-gray-500">Progreso</span>
                  <span className="text-red-600">{percentage}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div 
                    className="bg-red-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs font-medium text-gray-400 pt-1">
                  <span>${current.toLocaleString('es-MX')}</span>
                  <span>${goal.toLocaleString('es-MX')}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs text-gray-400 leading-relaxed mt-4">
            Este medidor visual se actualizará tanto en la consola principal del dashboard como en las llamadas a la acción en la web pública.
          </div>
        </div>

      </div>
    </div>
  )
}
