"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type Step = {
  id: number
  type: "intro" | "choice" | "consequence" | "process" | "finale"
  title: string
  description?: string
  choices?: { text: string; withRedCross: boolean }[]
  withRedCross?: boolean
  processSteps?: string[]
}

interface EmergencySimulationProps {
  isOpen: boolean
  onClose: () => void
}

const simulationSteps: Step[] = [
  {
    id: 0,
    type: "intro",
    title: "Son las 2:47 AM",
    description:
      "Tu vecino de 65 años está en el suelo. Dolor en el pecho. Respiración irregular. Cada segundo cuenta.",
  },
  {
    id: 1,
    type: "choice",
    title: "¿Qué haces?",
    choices: [
      { text: "Llamar al 911 y esperar a la Cruz Roja", withRedCross: true },
      { text: "Imaginar que no existe la Cruz Roja...", withRedCross: false },
    ],
  },
]

export function EmergencySimulation({ isOpen, onClose }: EmergencySimulationProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedPath, setSelectedPath] = useState<boolean | null>(null)
  const [mounted, setMounted] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0)
      setSelectedPath(null)
      setTimeElapsed(0)
      setMounted(true)
      // Bloquear scroll del body
      document.body.style.overflow = 'hidden'
    } else {
      // Restaurar scroll del body
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    if (currentStep === 2 && selectedPath !== null) {
      const timer = setInterval(() => {
        setTimeElapsed((prev) => prev + 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [currentStep, selectedPath])

  const handleChoice = (withRedCross: boolean) => {
    setSelectedPath(withRedCross)
    setCurrentStep(2)
    setTimeElapsed(0)
  }

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1)
    if (currentStep === 2) {
      setTimeElapsed(0)
    }
  }

  const renderIntro = () => (
    <div
      className={`text-center space-y-8 transition-all duration-1000 ${
        mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
    >
      <div className="space-y-4">
        <div className="text-6xl mb-4 animate-pulse">🚨</div>
        <h2 className="font-clash text-5xl md:text-7xl font-bold text-vital drop-shadow-[0_0_30px_rgba(215,25,32,0.6)]">
          {simulationSteps[0].title}
        </h2>
        <p className="font-inter text-xl md:text-2xl text-black/80 max-w-2xl mx-auto leading-relaxed">
          {simulationSteps[0].description}
        </p>
      </div>
      <Button
        onClick={nextStep}
        size="lg"
        className="bg-vital hover:bg-vital/90 text-white font-bold text-lg px-8 py-6 rounded-xl shadow-[0_10px_40px_-10px_rgba(220,38,38,0.5)] hover:shadow-[0_20px_60px_-15px_rgba(220,38,38,0.6)] transition-all"
      >
        COMENZAR SIMULACIÓN
      </Button>
    </div>
  )

  const renderChoice = () => (
    <div
      className={`space-y-8 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <h2 className="font-clash text-4xl md:text-6xl font-bold text-center text-black mb-12">
        {simulationSteps[1].title}
      </h2>
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {simulationSteps[1].choices?.map((choice, index) => (
          <Card
            key={index}
            onClick={() => handleChoice(choice.withRedCross)}
            className={`p-8 cursor-pointer transition-all duration-300 hover:scale-105 rounded-2xl ${
              choice.withRedCross
                ? "bg-white/80 backdrop-blur-xl border-2 border-vital/30 hover:border-vital hover:shadow-[0_0_40px_rgba(215,25,32,0.3)]"
                : "bg-white/60 backdrop-blur-xl border-2 border-black/10 hover:border-black/30 hover:shadow-xl"
            }`}
          >
            <p className="font-inter text-lg md:text-xl font-medium text-center text-black">{choice.text}</p>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderWithRedCross = () => {
    const steps = [
      { time: "00:30", event: "Conexión con Centro de Despacho", icon: "📞" },
      { time: "00:45", event: "Paramédicos en ruta con equipo especializado", icon: "🚑" },
      { time: "03:20", event: "Llegada. Evaluación vital inmediata", icon: "⚕️" },
      { time: "04:15", event: "Estabilización con oxígeno y monitoreo cardíaco", icon: "💉" },
      { time: "06:00", event: "Traslado seguro al hospital", icon: "🏥" },
      { time: "08:30", event: "Paciente estable. Vida salvada.", icon: "✅" },
    ]

    const currentPhaseIndex = Math.floor(timeElapsed / 3)
    const currentPhase = steps[Math.min(currentPhaseIndex, steps.length - 1)]

    return (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 bg-vital/10 backdrop-blur-sm border-2 border-vital px-6 py-3 rounded-full">
            <div className="w-3 h-3 rounded-full bg-vital animate-pulse" />
            <span className="font-mono text-2xl font-bold text-vital">{currentPhase.time}</span>
          </div>
          <h2 className="font-clash text-3xl md:text-5xl font-bold text-black">{currentPhase.event}</h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 p-4 rounded-xl border-2 backdrop-blur-sm transition-all duration-500 ${
                index <= currentPhaseIndex
                  ? "bg-vital/5 border-vital/40 opacity-100 translate-x-0"
                  : "bg-white/30 border-black/10 opacity-40 translate-x-4"
              }`}
            >
              <div className="text-3xl">{step.icon}</div>
              <div className="flex-1">
                <div className="font-mono text-sm text-vital font-bold">{step.time}</div>
                <div className="font-inter text-base text-black">{step.event}</div>
              </div>
              {index <= currentPhaseIndex && (
                <div className="w-6 h-6 rounded-full bg-vital flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {currentPhaseIndex >= steps.length - 1 && (
          <div className="text-center pt-8">
            <Button
              onClick={nextStep}
              size="lg"
              className="bg-vital hover:bg-vital/90 text-white font-bold text-lg px-8 py-6 rounded-xl shadow-[0_10px_40px_-10px_rgba(220,38,38,0.5)]"
            >
              VER ALTERNATIVA SIN CRUZ ROJA
            </Button>
          </div>
        )}
      </div>
    )
  }

  const renderWithoutRedCross = () => {
    const scenarios = [
      { time: "00:30", event: "Llamas al 911... línea ocupada", icon: "📞" },
      { time: "02:00", event: "Intentas llevarlo en tu auto. ¿Sabes cómo moverlo?", icon: "🚗" },
      { time: "05:00", event: "¿Qué hospital está abierto? ¿Cómo lo estabilizas?", icon: "❓" },
      { time: "08:00", event: "Finalmente encuentras ayuda, pero es tarde...", icon: "⏰" },
      { time: "12:00", event: "Daño cerebral irreversible por falta de oxígeno", icon: "🧠" },
      { time: "15:00", event: "Una vida que se pudo salvar.", icon: "💔" },
    ]

    const currentIndex = Math.floor(timeElapsed / 2.5)
    const currentScenario = scenarios[Math.min(currentIndex, scenarios.length - 1)]

    return (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 bg-black/5 backdrop-blur-sm border-2 border-black/20 px-6 py-3 rounded-full">
            <div className="w-3 h-3 rounded-full bg-black/60 animate-pulse" />
            <span className="font-mono text-2xl font-bold text-black/80">{currentScenario.time}</span>
          </div>
          <h2 className="font-clash text-3xl md:text-5xl font-bold text-black/90">{currentScenario.event}</h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {scenarios.map((scenario, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 p-4 rounded-xl border-2 backdrop-blur-sm transition-all duration-500 ${
                index <= currentIndex
                  ? "bg-black/5 border-black/20 opacity-100 translate-x-0"
                  : "bg-white/20 border-black/5 opacity-30 translate-x-4"
              }`}
            >
              <div className="text-3xl grayscale">{scenario.icon}</div>
              <div className="flex-1">
                <div className="font-mono text-sm text-black/70 font-bold">{scenario.time}</div>
                <div className="font-inter text-base text-black/80">{scenario.event}</div>
              </div>
            </div>
          ))}
        </div>

        {currentIndex >= scenarios.length - 1 && (
          <div className="text-center pt-8 space-y-6 pb-8">
            <p className="font-inter text-xl text-black/80 max-w-2xl mx-auto leading-relaxed">
              Sin la Cruz Roja, no hay sistema de respuesta. No hay equipo. No hay entrenamiento. Solo caos.
            </p>
            <Button
              onClick={nextStep}
              size="lg"
              className="bg-vital hover:bg-vital/90 text-white font-bold text-lg px-8 py-6 rounded-xl shadow-[0_10px_40px_-10px_rgba(220,38,38,0.5)]"
            >
              ENTENDER POR QUÉ IMPORTA
            </Button>
          </div>
        )}
      </div>
    )
  }

  const renderFinale = () => (
    <div className="text-center space-y-8 max-w-3xl mx-auto pb-8">
      <h2 className="font-clash text-4xl md:text-6xl font-bold text-vital drop-shadow-[0_0_30px_rgba(215,25,32,0.5)]">
        La diferencia es vida o muerte
      </h2>
      <p className="font-inter text-xl text-black/80 leading-relaxed">
        La Cruz Roja Mexicana atiende más de <span className="text-vital font-bold">2.5 millones</span> de emergencias
        al año. Sin ella, el sistema colapsa. Ahora conoces por qué cada donación, cada voluntario, cada minuto cuenta.
      </p>
      <div className="pt-6 flex gap-4 justify-center flex-wrap">
        <Button
          onClick={() => {
            setCurrentStep(0)
            setSelectedPath(null)
            setTimeElapsed(0)
          }}
          variant="outline"
          className="border-2 border-vital text-vital hover:bg-vital hover:text-white font-bold rounded-xl"
        >
          REINICIAR SIMULACIÓN
        </Button>
        <Button 
          onClick={onClose} 
          className="bg-vital hover:bg-vital/90 text-white font-bold rounded-xl shadow-[0_10px_40px_-10px_rgba(220,38,38,0.5)]"
        >
          CONTINUAR EXPLORANDO
        </Button>
      </div>
    </div>
  )

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop con animación de sirenas */}
      <div 
        className="fixed inset-0 z-50 animate-siren-flash"
        onClick={onClose}
        style={{
          background: 'radial-gradient(circle at center, rgba(220, 38, 38, 0.03) 0%, rgba(255, 255, 255, 0.95) 100%)',
          backdropFilter: 'blur(8px)'
        }}
      />

      {/* Contenedor modal con scroll */}
      <div 
        className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 overflow-y-auto"
        onClick={onClose}
      >
        <div 
          ref={modalRef}
          className="relative w-full max-w-6xl my-8 bg-white/80 backdrop-blur-2xl border border-black/10 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.3)] rounded-3xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-black/5 hover:bg-black/10 backdrop-blur-sm rounded-full transition-all text-black/60 hover:text-black font-medium text-xl z-10"
            aria-label="Cerrar"
          >
            ✕
          </button>

          {/* Contenido con padding */}
          <div className="p-8 md:p-12">
            {currentStep === 0 && renderIntro()}
            {currentStep === 1 && renderChoice()}
            {currentStep === 2 && selectedPath === true && renderWithRedCross()}
            {currentStep === 2 && selectedPath === false && renderWithoutRedCross()}
            {currentStep >= 3 && renderFinale()}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes siren-flash {
          0%, 100% { 
            background: radial-gradient(circle at center, rgba(220, 38, 38, 0.03) 0%, rgba(255, 255, 255, 0.95) 100%);
          }
          50% { 
            background: radial-gradient(circle at center, rgba(220, 38, 38, 0.08) 0%, rgba(255, 255, 255, 0.95) 100%);
          }
        }
        .animate-siren-flash {
          animation: siren-flash 2s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}