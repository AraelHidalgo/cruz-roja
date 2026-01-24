"use client"

import { motion } from "framer-motion"

const components = [
    { title: "Paquete Globular", desc: "Glóbulos rojos concentrados. Vital para cirugías y anemia grave.", color: "bg-red-600" },
    { title: "Plasma Fresco", desc: "Congelado. Rico en factores de coagulación. Para quemaduras y traumas.", color: "bg-yellow-500" },
    { title: "Concentrado Plaquetario", desc: "Esencial para pacientes con cáncer y problemas de coagulación.", color: "bg-orange-500" },
]

export function ServicesGrid() {
    return (
        <section className="py-24 px-6 bg-black relative">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-16 items-center">

                    {/* Text Content */}
                    <div>
                        <h2 className="font-clash text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            La Sangre<br />
                            <span className="text-red-500">NO SE VENDE</span>
                        </h2>
                        <div className="space-y-6 text-gray-400 font-inter text-lg">
                            <p>
                                Lo que pagas es una <span className="text-white font-bold">Cuota de Recuperación</span>.
                            </p>
                            <p>
                                Este monto cubre estrictamente los materiales de recolección, análisis de enfermedades (VIH, Hepatitis, etc.), fraccionamiento y almacenamiento seguro.
                            </p>
                            <p className="p-4 border-l-4 border-red-500 bg-red-900/10 text-white italic">
                                "La sangre es un tejido que se REGENERA pero no se FABRICA."
                            </p>
                        </div>
                    </div>

                    {/* Cards */}
                    <div className="space-y-4">
                        <h3 className="text-white font-bold tracking-widest uppercase text-sm mb-6 border-b border-white/10 pb-2">
                            Componentes Disponibles
                        </h3>
                        {components.map((item, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ x: 10 }}
                                className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-red-500/30 transition-all"
                            >
                                <div className={`w-4 h-16 rounded-full ${item.color}`} />
                                <div>
                                    <h4 className="text-white font-bold text-2xl mb-2">{item.title}</h4>
                                    <p className="text-lg text-gray-300 leading-relaxed tracking-normal">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
