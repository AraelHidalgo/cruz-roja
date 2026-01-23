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
        <section className="py-24 px-6 bg-neutral-900 relative overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <div className="mb-16 text-center">
                    <h2 className="font-clash text-4xl md:text-6xl font-bold text-white mb-4">
                        ¿Puedes ser un Héroe?
                    </h2>
                    <p className="font-inter text-gray-400">
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
                            className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
                        >
                            <div className="absolute top-4 right-4 text-white/20 group-hover:text-white/40 transition-colors">
                                {req.type === 'req' && <Check className="w-6 h-6 text-green-500" />}
                                {req.type === 'warn' && <Info className="w-6 h-6 text-yellow-500" />}
                                {req.type === 'restr' && <X className="w-6 h-6 text-red-500" />}
                            </div>

                            <div className="text-4xl mb-6">{req.icon}</div>
                            <p className="font-inter text-gray-200 text-xl font-medium leading-relaxed">
                                {req.text}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 p-6 rounded-2xl bg-red-900/10 border border-red-500/20 max-w-3xl mx-auto text-center">
                    <h3 className="text-white font-bold mb-2">⚠ IMPORTANTE</h3>
                    <p className="text-sm text-red-200 text-opacity-80">
                        La evaluación final se realiza MEDIANTE ENTREVISTA MÉDICA PRIVADA.
                        Sé honesto; la seguridad de quien recibe la sangre depende de ti.
                    </p>
                </div>
            </div>
        </section>
    )
}
