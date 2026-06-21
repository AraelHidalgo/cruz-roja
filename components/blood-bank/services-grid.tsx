"use client"

import { motion } from "framer-motion"

const components = [
    { title: "Paquete Globular", desc: "Glóbulos rojos concentrados. Vital para cirugías y anemia grave.", color: "bg-red-600" },
    { title: "Plasma Fresco", desc: "Congelado. Rico en factores de coagulación. Para quemaduras y traumas.", color: "bg-yellow-500" },
    { title: "Concentrado Plaquetario", desc: "Esencial para pacientes con cáncer y problemas de coagulación.", color: "bg-orange-500" },
]

export function ServicesGrid() {
    return (
        <section id="costos" className="py-24 px-6 relative overflow-hidden">
            {/* Gradiente blanco → rojo */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-rose-200 via-60% to-red-400" />
            
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    {/* Text Content */}
                    <div>
                        <h2 className="font-clash text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
                            La Sangre<br />
                            <span className="text-red-600">NO SE VENDE</span>
                        </h2>
                        <div className="space-y-6 text-black/70 font-inter text-lg">
                            <p>
                                Lo que pagas es una <span className="text-black font-bold">Cuota de Recuperación</span>.
                            </p>
                            <p>
                                Este monto cubre estrictamente los materiales de recolección, análisis de enfermedades (VIH, Hepatitis, etc.), fraccionamiento y almacenamiento seguro.
                            </p>
                            <p className="p-4 border-l-4 border-red-600 bg-red-100/60 text-black italic">
                                "La sangre es un tejido que se REGENERA pero no se FABRICA."
                            </p>
                        </div>
                    </div>

                    {/* Cards */}
                    <div className="space-y-4">
                        <h3 className="text-black font-bold tracking-widest uppercase text-sm mb-6 border-b border-black/20 pb-2">
                            Componentes Disponibles
                        </h3>
                        {components.map((item, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ x: 10 }}
                                className="flex items-center gap-6 p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-red-200/40 hover:border-red-400 hover:shadow-lg transition-all"
                            >
                                <div className={`w-4 h-16 rounded-full ${item.color}`} />
                                <div>
                                    <h4 className="text-black font-bold text-2xl mb-2">{item.title}</h4>
                                    <p className="text-lg text-black/70 leading-relaxed tracking-normal">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}