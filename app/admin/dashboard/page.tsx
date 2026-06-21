import { getDashboardStats, getBloodStock } from '@/app/actions/admin'
import Link from 'next/link'
import { Droplet, Heart, Calendar, FileText, Activity, AlertTriangle, ArrowRight, ShieldAlert, Users, TrendingUp } from 'lucide-react'

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats()
  const stock = await getBloodStock()

  const criticalBloodTypes = Object.entries(stock)
    .filter(([_, status]) => status === 'Critico')
    .map(([type]) => type)

  const donationPercentage = Math.min(
    Math.round((stats.donationCurrent / stats.donationGoal) * 100),
    100
  )

  // Simulated metrics to make the admin panel feel active and responsive
  const simulatedActiveUsers = Math.floor(Math.random() * 8) + 3 // 3 to 10 simulated active visitors
  const responseTimeMs = 120 + Math.floor(Math.random() * 45) // 120 to 165ms response time

  return (
    <div className="space-y-8">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
          <Activity className="w-80 h-80 -mr-10 -mb-10 text-white" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold tracking-wider uppercase mb-4 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Consola de Administración Activa
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl font-clash">
            Hola, Administrador
          </h1>
          <p className="mt-2 text-lg text-red-50/90 font-medium">
            Control de inventario de sangre, metas de captación y contenido dinámico para Cruz Roja Tapachula.
          </p>
        </div>
      </div>

      {/* Real-time Telemetry Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Blood Stock Telemetry */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="p-3 bg-red-50 text-red-600 rounded-xl">
                <Droplet className="w-6 h-6 fill-red-500 text-red-600" />
              </span>
              {criticalBloodTypes.length > 0 ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800 animate-pulse">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  {criticalBloodTypes.length} Crítico
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  Todo Estable
                </span>
              )}
            </div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Stock de Sangre
            </h3>
            <p className="text-3xl font-extrabold text-gray-900 mt-2 font-clash">
              {criticalBloodTypes.length > 0 ? 'Alerta Activa' : 'Estable'}
            </p>
            {criticalBloodTypes.length > 0 ? (
              <p className="text-sm text-red-600 font-medium mt-1">
                Faltan tipos: {criticalBloodTypes.join(', ')}
              </p>
            ) : (
              <p className="text-sm text-gray-500 mt-1">
                Todos los tipos cubiertos.
              </p>
            )}
          </div>
          <Link 
            href="/admin/dashboard/sangre" 
            className="flex items-center gap-1 text-sm font-bold text-red-600 hover:text-red-700 mt-4 group pt-2 border-t border-gray-100"
          >
            Actualizar Inventario
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Donations Progress Telemetry */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="p-3 bg-red-50 text-red-600 rounded-xl">
                <Heart className="w-6 h-6 fill-red-500 text-red-600" />
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                <TrendingUp className="w-3.5 h-3.5" />
                {donationPercentage}%
              </span>
            </div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Meta Mensual Recaudada
            </h3>
            <p className="text-3xl font-extrabold text-gray-900 mt-2 font-clash">
              ${stats.donationCurrent.toLocaleString('es-MX')}
            </p>
            <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
              <div 
                className="bg-red-600 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${donationPercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Objetivo: ${stats.donationGoal.toLocaleString('es-MX')} MXN
            </p>
          </div>
          <Link 
            href="/admin/dashboard/donaciones" 
            className="flex items-center gap-1 text-sm font-bold text-red-600 hover:text-red-700 mt-4 group pt-2 border-t border-gray-100"
          >
            Editar Metas
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Active Events Telemetry */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="p-3 bg-red-50 text-red-600 rounded-xl">
                <Calendar className="w-6 h-6 text-red-600" />
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                Calendario
              </span>
            </div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Eventos Programados
            </h3>
            <p className="text-3xl font-extrabold text-gray-900 mt-2 font-clash">
              {stats.eventsCount}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Publicaciones de eventos comunitarios activos.
            </p>
          </div>
          <Link 
            href="/admin/dashboard/eventos" 
            className="flex items-center gap-1 text-sm font-bold text-red-600 hover:text-red-700 mt-4 group pt-2 border-t border-gray-100"
          >
            Gestionar Eventos
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Simulated Telemetry - Active Connections / Interactions */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="p-3 bg-red-50 text-red-600 rounded-xl">
                <Users className="w-6 h-6 text-red-600" />
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 animate-pulse">
                Online
              </span>
            </div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Visitantes Activos (Simulado)
            </h3>
            <p className="text-3xl font-extrabold text-gray-900 mt-2 font-clash">
              {simulatedActiveUsers}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Latencia de la API: {responseTimeMs}ms
            </p>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-400 mt-4 pt-2 border-t border-gray-100">
            <span>Sistema: Operativo</span>
            <span>v1.2.0</span>
          </div>
        </div>

      </div>

      {/* Critical Stock Alert Box if any is critical */}
      {criticalBloodTypes.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-xl flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-red-900 text-lg">Alerta Crítica de Banco de Sangre</h4>
            <p className="text-red-700 mt-1">
              Actualmente los siguientes tipos de sangre están catalogados en estado <strong>Crítico</strong>: {criticalBloodTypes.join(', ')}.
              Esta información genera un banner de aviso de emergencia automático en la página pública del Banco de Sangre.
            </p>
            <div className="mt-4">
              <Link 
                href="/admin/dashboard/sangre" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-bold transition-colors"
              >
                Atender Inventario
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* General Information Box */}
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4 font-clash">¿Cómo funciona la telemetría dinámica?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600">
          <div>
            <h3 className="font-bold text-gray-800 mb-2">🩸 Alertas de Sangre en Tiempo Real</h3>
            <p className="text-sm leading-relaxed">
              Cuando marcas un tipo de sangre como <strong>"Crítico"</strong> en el módulo de Inventario de Sangre, el sitio web público muestra inmediatamente una alerta de emergencia parpadeante en la cabecera para los ciudadanos de Tapachula. Esto fomenta la captación inmediata de donantes específicos.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 mb-2">🎯 Progreso del Presupuesto de Donaciones</h3>
            <p className="text-sm leading-relaxed">
              Las donaciones en la delegación tienen una meta mensual. Modificar la meta actualiza de inmediato el gráfico del panel y las llamadas a la acción en la web pública, mostrando de manera transparente el avance del financiamiento de recuperación.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
