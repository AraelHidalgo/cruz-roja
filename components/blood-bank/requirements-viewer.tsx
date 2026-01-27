"use client"

import { motion } from "framer-motion"
import { Check, X, Info } from "lucide-react"

const requirements = [
    { id: 1, text: "Edad entre 18 y 65 años", icon: "🎂", type: "req" },
    { id: 2, text: "Peso mayor a 50 kg", icon: "⚖️", type: "req" },
    { id: 3, text: "Identificación oficial vigente", icon: "🆔", type: "req" },
    { id: 4, text: "Clínicamente Sano", icon: "💪", type: "req" },
    { id: 5, text: "Sin tatuajes/perforaciones en el último año", icon: "🎨", type: "warn" },
    { id: 6, text: "Ayuno: 4 hrs min - 12 hrs máx", icon: "🛑", type: "warn" },
    { id: 7, text: "No haber tenido cirugía en los últimos 6 meses", icon: "🏥", type: "warn" },
    { id: 8, text: "No estar embarazada ni lactando", icon: "🤰", type: "restr" },
    { id: 9, text: "No tener más de 1 pareja sexual en 6 meses", icon: "❤️", type: "restr" },
    { id: 10, text: "Disponibilidad de horario (3-4 horas)", icon: "⏳", type: "req" },
]

export function RequirementsViewer() {
    return (
        <section className="py-24 px-6 relative overflow-hidden">
            {/* Gradiente rojo → blanco */}
            <div className="absolute inset-0 bg-gradient-to-b from-red-600 from-85% via-red-400 via-95% to-rose-50" />
            
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="mb-16 text-center">
                    <h2 className="font-clash text-4xl md:text-6xl font-bold text-white mb-4">
                        ¿Puedes ser un Héroe?
                    </h2>
                    <p className="font-inter text-white/90">
                        Revisa los requisitos fundamentales para salvar una vida hoy.
                    </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {requirements.map((req, index) => (
                        <motion.div
                            key={req.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/25 transition-colors"
                        >
                            <div className="absolute top-4 right-4 opacity-70 group-hover:opacity-100 transition-opacity">
                                {req.type === 'req' && <Check className="w-6 h-6 text-green-400" />}
                                {req.type === 'warn' && <Info className="w-6 h-6 text-yellow-400" />}
                                {req.type === 'restr' && <X className="w-6 h-6 text-red-300" />}
                            </div>
                            <div className="text-4xl mb-6">{req.icon}</div>
                            <p className="font-inter text-white text-lg md:text-xl font-medium leading-relaxed tracking-normal">
                                {req.text}
                            </p>
                        </motion.div>
                    ))}
                </div>
                
                <div className="mt-12 p-6 rounded-2xl bg-white/15 backdrop-blur-sm border-2 border-white/30 max-w-3xl mx-auto text-center">
                    <h3 className="text-white font-bold mb-2">⚠ IMPORTANTE</h3>
                    <p className="text-base text-white/90 tracking-normal leading-relaxed">
                        La evaluación final se realiza MEDIANTE ENTREVISTA MÉDICA PRIVADA.
                        Sé honesto; la seguridad de quien recibe la sangre depende de ti.
                    </p>
                </div>
            </div>
        </section>
    )
}