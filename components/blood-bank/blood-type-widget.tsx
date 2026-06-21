"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Droplet, Heart, ShieldCheck } from "lucide-react"

type BloodInfo = {
  type: string
  canGiveTo: string[]
  canReceiveFrom: string[]
  message: string
}

const BLOOD_TYPES: BloodInfo[] = [
  {
    type: "O-",
    canGiveTo: ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
    canReceiveFrom: ["O-"],
    message: "¡Eres el Donante Universal! En emergencias graves, cuando no hay tiempo de verificar el tipo de sangre, la tuya es la única que puede salvar vidas instantáneamente de forma segura."
  },
  {
    type: "O+",
    canGiveTo: ["O+", "A+", "B+", "AB+"],
    canReceiveFrom: ["O-", "O+"],
    message: "¡El tipo de sangre más común en México! Alrededor del 60% de la población comparte tu tipo, lo que significa que tu donación siempre es la más demandada y necesaria para emergencias diarias."
  },
  {
    type: "A-",
    canGiveTo: ["A-", "A+", "AB-", "AB+"],
    canReceiveFrom: ["O-", "A-"],
    message: "Un tipo de sangre poco común y sumamente valioso. Tu donación es un salvavidas vital para cirugías programadas y tratamientos de alta complejidad."
  },
  {
    type: "A+",
    canGiveTo: ["A+", "AB+"],
    canReceiveFrom: ["O-", "O+", "A-", "A+"],
    message: "Uno de los tipos de sangre con mayor presencia. Ayudas enormemente a pacientes con tratamientos oncológicos y víctimas de traumas mecánicos."
  },
  {
    type: "B-",
    canGiveTo: ["B-", "B+", "AB-", "AB+"],
    canReceiveFrom: ["O-", "B-"],
    message: "Solo el 1% al 2% de la población tiene tu tipo de sangre. Encontrar donantes compatibles es todo un reto, ¡por eso tu decisión de donar es una bendición para el hospital!"
  },
  {
    type: "B+",
    canGiveTo: ["B+", "AB+"],
    canReceiveFrom: ["O-", "O+", "B-", "B+"],
    message: "Un tipo de sangre clave y muy versátil. Donar plaquetas es una de las formas más efectivas en que tu tipo de sangre puede ayudar a pacientes con leucemia."
  },
  {
    type: "AB-",
    canGiveTo: ["AB-", "AB+"],
    canReceiveFrom: ["O-", "A-", "B-", "AB-"],
    message: "El tipo de sangre más raro del planeta. Sin embargo, tu plasma es compatible con cualquier tipo. ¡Eres un donador de plasma universal!"
  },
  {
    type: "AB+",
    canGiveTo: ["AB+"],
    canReceiveFrom: ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
    message: "¡Eres el Receptor Universal! Puedes recibir sangre de cualquier tipo en una emergencia, lo que te da gran tranquilidad, y tu plasma es universal para donación."
  }
]

export function BloodTypeWidget() {
  const [selectedType, setSelectedType] = useState<BloodInfo>(BLOOD_TYPES[0])

  return (
    <div className="bg-white rounded-[32px] p-6 sm:p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] text-black w-full max-w-lg mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Droplet className="w-5 h-5 text-red-600 fill-red-600" />
        <span className="font-mono text-xs uppercase tracking-wider text-red-600 font-bold">
          COMPATIBILIDAD INTERACTIVA
        </span>
      </div>

      <h3 className="font-clash text-2xl font-bold mb-6 leading-tight">
        Selecciona tu tipo de sangre:
      </h3>

      {/* Grid de botones de tipo de sangre */}
      <div className="grid grid-cols-4 gap-3 mb-8">
        {BLOOD_TYPES.map((bt) => {
          const isSelected = selectedType.type === bt.type
          return (
            <button
              key={bt.type}
              onClick={() => setSelectedType(bt)}
              className={`h-14 sm:h-16 rounded-2xl font-clash text-lg sm:text-xl font-bold border-4 transition-all ${
                isSelected
                  ? "bg-red-600 border-black text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -translate-x-0.5 -translate-y-0.5"
                  : "bg-zinc-50 border-zinc-200 hover:border-black hover:bg-white text-zinc-800"
              }`}
            >
              {bt.type}
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedType.type}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          {/* Tarjeta de Mensaje Personalizado */}
          <div className="p-5 rounded-2xl bg-rose-50 border-2 border-red-200 relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 opacity-5">
              <Heart className="w-24 h-24 text-red-600 fill-red-600" />
            </div>
            <p className="font-inter text-sm sm:text-base text-zinc-800 leading-relaxed font-medium relative z-10">
              {selectedType.message}
            </p>
          </div>

          {/* Listado de compatibilidad visual */}
          <div className="space-y-4">
            <div>
              <span className="block text-xs font-bold font-mono tracking-widest text-zinc-500 uppercase mb-2">
                PUEDES SALVAR A (RECEPTORES):
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedType.canGiveTo.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 text-xs font-bold font-clash rounded-lg border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="block text-xs font-bold font-mono tracking-widest text-zinc-500 uppercase mb-2">
                PUEDES RECIBIR DE (DONANTES):
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedType.canReceiveFrom.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 text-xs font-bold font-clash rounded-lg border-2 border-black bg-red-50 text-red-600 shadow-[2px_2px_0px_0px_rgba(220,38,38,1)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
