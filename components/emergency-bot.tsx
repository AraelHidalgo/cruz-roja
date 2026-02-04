"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Phone, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Message {
    id: number
    text: string
    isBot: boolean
    timestamp: Date
}

// Base de conocimiento del bot
const KNOWLEDGE_BASE: Record<string, string> = {
    infarto: `🚨 **Ante un posible infarto:**
1. Llama inmediatamente al 962-606-4212
2. Sienta a la persona en posición cómoda
3. Afloja ropa ajustada
4. Si tiene aspirina y no es alérgico, que mastique una
5. No la dejes sola, mantén la calma
6. Prepárate para dar RCP si deja de respirar`,

    quemadura: `🔥 **Ante una quemadura:**
1. Enfría con agua fría por 10-20 minutos
2. NO uses hielo directamente
3. NO apliques pasta de dientes ni mantequilla
4. Cubre con gasa limpia y seca
5. Si es grave, llámanos: 962-606-4212`,

    hemorragia: `🩸 **Ante una hemorragia:**
1. Presiona firmemente con tela limpia
2. Eleva la extremidad si es posible
3. Mantén la presión sin soltar
4. Si empapa, pon otra tela encima
5. Llama al 962-606-4212 si no cede`,

    ahogamiento: `💨 **Si alguien se está ahogando:**
1. Pregunta "¿Puedes hablar?"
2. Si NO puede: Maniobra de Heimlich
3. Abraza por detrás, puño en abdomen
4. Comprime hacia arriba y adentro
5. Repite hasta que expulse el objeto`,

    fractura: `🦴 **Ante una posible fractura:**
1. NO muevas a la persona
2. Inmoviliza la zona afectada
3. Aplica hielo envuelto en tela
4. Llama al 962-606-4212
5. Mantén a la persona calmada`,

    convulsion: `⚡ **Ante una convulsión:**
1. Despeja el área de objetos
2. NO introduzcas nada en la boca
3. Coloca algo suave bajo la cabeza
4. Ponlo de lado cuando termine
5. Llama al 962-606-4212`,

    horario: `⏰ **Horario de Atención:**
Emergencias: 24/7, los 365 días del año
Oficinas: Lunes a Viernes 8:00 - 18:00
Banco de Sangre: Lunes a Sábado 7:00 - 15:00`,

    ubicacion: `📍 **Ubicación:**
Cruz Roja Tapachula
Chiapas, México`,

    servicios: `🏥 **Nuestros Servicios:**
• 🚑 Ambulancias 24/7
• 🩸 Banco de Sangre
• 📚 Capacitación en primeros auxilios
• 🏥 Atención prehospitalaria
• 🤝 Asistencia en desastres`,

    donar: `❤️ **¿Quieres donar?**
Puedes donar sangre, tiempo como voluntario, o hacer donaciones económicas.`,

    telefono: `📞 **Teléfonos de Emergencia:**
• Línea Principal: 962-606-4212
• Línea Alternativa: 962-626-1949
Disponibles 24/7`,
}

const QUICK_REPLIES = [
    "¿Qué hago ante un infarto?",
    "Servicios",
    "Horarios",
    "Teléfonos",
]

function findResponse(input: string): string {
    const normalizedInput = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

    const keywords: Record<string, string[]> = {
        infarto: ["infarto", "corazon", "pecho", "cardio", "ataque"],
        quemadura: ["quemadura", "quemado", "fuego", "caliente"],
        hemorragia: ["sangrado", "hemorragia", "sangre", "corte", "herida"],
        ahogamiento: ["ahoga", "atraganta", "trago", "comida atorada"],
        fractura: ["fractura", "hueso", "roto", "quebrado"],
        convulsion: ["convulsion", "epilepsia", "ataque", "temblor"],
        horario: ["horario", "hora", "cuando", "abierto"],
        ubicacion: ["donde", "ubicacion", "direccion", "llegar", "mapa"],
        servicios: ["servicio", "ofrece", "hacen", "ayuda"],
        donar: ["donar", "donacion", "ayudar", "voluntario"],
        telefono: ["telefono", "numero", "llamar", "contacto", "emergencia"],
    }

    for (const [key, words] of Object.entries(keywords)) {
        if (words.some((word) => normalizedInput.includes(word))) {
            return KNOWLEDGE_BASE[key]
        }
    }

    return `No tengo información específica sobre eso, pero puedo ayudarte con:
• Primeros auxilios
• Horarios y ubicación
• Servicios disponibles
• Números de emergencia

¿Sobre qué te gustaría saber más?`
}

export function EmergencyBot() {
    const [isOpen, setIsOpen] = useState(false)
    const [showTooltip, setShowTooltip] = useState(true)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "¡Hola! 👋 Soy el asistente de Cruz Roja Tapachula. ¿En qué puedo ayudarte?",
            isBot: true,
            timestamp: new Date(),
        },
    ])
    const [input, setInput] = useState("")
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus()
            setShowTooltip(false)
        }
    }, [isOpen])

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowTooltip(false)
        }, 10000)
        return () => clearTimeout(timer)
    }, [])

    const sendMessage = (text: string) => {
        if (!text.trim()) return

        const userMessage: Message = {
            id: Date.now(),
            text: text.trim(),
            isBot: false,
            timestamp: new Date(),
        }

        setMessages((prev) => [...prev, userMessage])
        setInput("")

        setTimeout(() => {
            const botResponse: Message = {
                id: Date.now() + 1,
                text: findResponse(text),
                isBot: true,
                timestamp: new Date(),
            }
            setMessages((prev) => [...prev, botResponse])
        }, 500)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        sendMessage(input)
    }

    return (
        <>
            {/* Botón flotante del chat - RESPONSIVE */}
            <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40">
                {/* Tooltip "¡Pregúntame algo!" */}
                <AnimatePresence>
                    {showTooltip && !isOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: 10, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 10, scale: 0.9 }}
                            className="absolute bottom-full right-0 mb-3 whitespace-nowrap hidden sm:block"
                        >
                            <div className="bg-white rounded-2xl shadow-xl border border-red-100 p-3 pr-4">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-vital" />
                                    <span className="text-sm font-medium text-black">¡Pregúntame algo!</span>
                                </div>
                                <p className="text-xs text-black/60 mt-1">Primeros auxilios, servicios...</p>
                            </div>
                            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b border-red-100 rotate-45" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Botón principal - min 44x44 touch target */}
                <motion.button
                    onClick={() => setIsOpen(true)}
                    className="relative w-14 h-14 sm:w-16 sm:h-16 bg-white border-2 border-vital rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-transform group cursor-pointer"
                    whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                    transition={{ duration: 0.4 }}
                    aria-label="Abrir chat de ayuda"
                >
                    <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-vital group-hover:scale-110 transition-transform" />

                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-vital rounded-full flex items-center justify-center"
                    >
                        <span className="text-white text-xs font-bold">?</span>
                    </motion.div>
                </motion.button>
            </div>

            {/* Panel del chat - RESPONSIVE MOBILE-FIRST */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed inset-x-2 bottom-2 sm:inset-auto sm:bottom-24 sm:right-6 z-50 sm:w-80 md:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden border border-black/10 max-h-[85vh] sm:max-h-[500px] flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-vital to-red-500 p-3 sm:p-4 text-white flex items-center justify-between flex-shrink-0">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
                                    <span className="text-lg sm:text-xl">✚</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm sm:text-base">Cruz Roja Tapachula</h3>
                                    <p className="text-xs text-white/80">Asistente de información</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-10 h-10 flex items-center justify-center hover:bg-white/20 rounded-full transition-colors cursor-pointer"
                                aria-label="Cerrar chat"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 bg-gray-50 min-h-0">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-3 rounded-2xl text-sm ${message.isBot
                                                ? "bg-white border border-black/5 text-black"
                                                : "bg-vital text-white"
                                            }`}
                                    >
                                        <div className="whitespace-pre-wrap break-words">{message.text}</div>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick replies - scrollable horizontal */}
                        <div className="p-2 border-t border-black/5 flex gap-2 overflow-x-auto bg-white flex-shrink-0 scrollbar-hide">
                            {QUICK_REPLIES.map((reply) => (
                                <button
                                    key={reply}
                                    onClick={() => sendMessage(reply)}
                                    className="flex-shrink-0 px-3 py-2 bg-rose-50 text-vital text-xs font-medium rounded-full hover:bg-rose-100 transition-colors cursor-pointer min-h-[36px]"
                                >
                                    {reply}
                                </button>
                            ))}
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSubmit} className="p-2 sm:p-3 border-t border-black/5 flex gap-2 bg-white flex-shrink-0">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Escribe tu pregunta..."
                                className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm sm:text-base text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-vital/30 min-h-[44px]"
                            />
                            <Button
                                type="submit"
                                size="icon"
                                className="bg-vital hover:bg-vital/90 rounded-full w-11 h-11 sm:w-10 sm:h-10 cursor-pointer flex-shrink-0"
                            >
                                <Send className="w-4 h-4 text-white" />
                            </Button>
                        </form>

                        {/* Llamar a operador */}
                        <div className="p-2 sm:p-3 bg-rose-50 border-t border-rose-100 flex-shrink-0">
                            <a
                                href="tel:9626064212"
                                className="flex items-center justify-center gap-2 text-vital text-sm font-medium hover:underline min-h-[44px]"
                            >
                                <Phone className="w-4 h-4" />
                                ¿Emergencia? Llama al 962-606-4212
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
