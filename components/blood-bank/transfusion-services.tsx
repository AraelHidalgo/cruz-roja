"use client"

import { motion } from "framer-motion"
import {
    Heart,
    Activity,
    Pill,
    Stethoscope,
    Phone,
    MessageCircle,
    User,
    Syringe
} from "lucide-react"

const TRANSFUSION_SERVICES = [
    { title: "Anemias", icon: Activity },
    { title: "Plaquetas", icon: Syringe },
    { title: "Coagulación", icon: Heart },
    { title: "Insuficiencia Renal", icon: Stethoscope },
    { title: "Hemodiálisis", icon: Activity },
    { title: "Quimioterapia", icon: Pill },
    { title: "Radioterapia", icon: Activity },
    { title: "Oncología General", icon: Stethoscope },
    { title: "Sangrado Digestivo", icon: Heart },
    { title: "Otros", icon: User },
]

const PHONE_NUMBERS = [
    { number: "55 49 10 53 85" },
    { number: "961 179 89 26" },
    { number: "55 21 13 50 40" },
    { number: "962 311 01 78" },
]

export function TransfusionServices() {
    return (
        <section className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-red-50 to-white" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10 sm:mb-16"
                >
                    <div className="inline-flex items-center gap-2 mb-4 px-3 sm:px-4 py-2 rounded-full bg-vital/10 border border-vital/20">
                        <Heart className="w-4 h-4 text-vital fill-vital" />
                        <span className="text-xs sm:text-sm font-medium text-vital uppercase tracking-wider">Servicio Especializado</span>
                    </div>

                    <h2 className="font-clash text-3xl sm:text-4xl md:text-6xl font-bold text-black mb-3 sm:mb-4 leading-tight">
                        Servicio de Transfusión
                        <span className="block text-vital">Sanguínea</span>
                    </h2>

                    <p className="text-base sm:text-lg text-black/70 max-w-2xl mx-auto px-4">
                        Atención especializada para pacientes que requieren transfusiones de sangre
                    </p>
                </motion.div>

                {/* Atención a pacientes con */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-red-100 p-4 sm:p-8 md:p-12 mb-8 sm:mb-12"
                >
                    <h3 className="text-lg sm:text-2xl font-bold text-black mb-6 sm:mb-8 text-center">
                        <span className="bg-vital text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base">Atención a Paciente con</span>
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
                        {TRANSFUSION_SERVICES.map((service, index) => (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className="group bg-rose-50 hover:bg-vital hover:text-white rounded-xl p-3 sm:p-4 text-center transition-all duration-300 cursor-pointer border border-rose-100 hover:border-vital hover:shadow-lg min-h-[80px] sm:min-h-[100px] flex flex-col items-center justify-center"
                            >
                                <service.icon className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2 text-vital group-hover:text-white transition-colors" />
                                <span className="text-[10px] sm:text-sm font-medium text-black/80 group-hover:text-white transition-colors leading-tight">
                                    {service.title}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Información de contacto */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-gradient-to-br from-vital to-red-600 rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-8 md:p-12 text-white"
                >
                    <div className="text-center mb-6 sm:mb-8">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Información</h3>
                        <p className="text-white/80 text-semibold sm:text-base">Banco de Cruz Roja Mexicana - Área de Banco de Sangre</p>
                    </div>

                    {/* Doctores */}
                    <div className="flex flex-col items-center mb-6 sm:mb-8">
                        <div className="text-center">
                            <div className="inline-flex items-center gap-2 bg-white/20 px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-2">
                                <User className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span className="font-bold text-sm sm:text-lg">Dr. Valencia / Dra. Cordero</span>
                            </div>
                            <p className="text-white/80 text-lg sm:text-lg">Médico Especialista y Medicina Transfusional</p>
                        </div>
                    </div>

                    {/* Teléfonos - 2x2 en móvil, 4 en desktop */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-6 sm:mb-8">
                        {PHONE_NUMBERS.map((phone, index) => (
                            <a
                                key={index}
                                href={`tel:${phone.number.replace(/\s/g, "")}`}
                                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white hover:text-vital px-3 sm:px-4 py-3 rounded-xl transition-all hover:scale-105 cursor-pointer min-h-[48px]"
                            >
                                <Phone className="w-4 h-4 flex-shrink-0" />
                                <span className="font-mono font-bold text-lg sm:text-lg">{phone.number}</span>
                            </a>
                        ))}
                    </div>

                    {/* Social/Contact buttons */}
                    <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                        <a
                            href="https://wa.me/529611798926"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 px-6 py-3 rounded-full font-bold transition-all hover:scale-105 cursor-pointer min-h-[48px] text-sm sm:text-base"
                        >
                            <MessageCircle className="w-5 h-5" />
                            WhatsApp
                        </a>
                        <a
                            href="https://facebook.com/CruzRojaTapachula"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full font-bold transition-all hover:scale-105 cursor-pointer min-h-[48px] text-sm sm:text-base"
                        >
                            Facebook
                        </a>
                    </div>
                </motion.div>

                {/* Dirección */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-center mt-6 sm:mt-8 px-4"
                >
                    <p className="text-black/60 text-xs sm:text-sm leading-relaxed">
                        📍 9ª Avenida Norte y 1ª Calle Oriente C.P. 30700 Tapachula, Chiapas
                        <br className="sm:hidden" />
                        <span className="hidden sm:inline"> | </span>
                        Tel: (01 962) 6261949 y 6253506
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
