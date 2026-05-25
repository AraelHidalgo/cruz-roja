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

interface BotApiResponse {
    reply?: string
    error?: string
}

const QUICK_REPLIES = [
    "¿Qué hago ante un infarto?",
    "Servicios",
    "Horarios",
    "Teléfonos",
]

async function requestBotResponse(messages: Message[]) {
    const response = await fetch("/api/emergency-bot", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            messages: messages.map((message) => ({
                role: message.isBot ? "model" : "user",
                text: message.text,
            })),
        }),
    })

    const data = (await response.json()) as BotApiResponse

    if (!response.ok) {
        throw new Error(data.error ?? "No se pudo contactar al asistente.")
    }

    return data.reply ?? "No pude generar una respuesta. Si es una emergencia real, llama al 911 o al 962-606-4212."
}

export function EmergencyBot() {
    const [isOpen, setIsOpen] = useState(false)
    const [showTooltip, setShowTooltip] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
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

    const sendMessage = async (text: string) => {
        if (!text.trim() || isLoading) return

        const userMessage: Message = {
            id: Date.now(),
            text: text.trim(),
            isBot: false,
            timestamp: new Date(),
        }

        const nextMessages = [...messages, userMessage]
        setMessages(nextMessages)
        setInput("")
        setIsLoading(true)

        try {
            const reply = await requestBotResponse(nextMessages)
            const botResponse: Message = {
                id: Date.now() + 1,
                text: reply,
                isBot: true,
                timestamp: new Date(),
            }
            setMessages((prev) => [...prev, botResponse])
        } catch (error) {
            console.error(error)
            const errorMessage: Message = {
                id: Date.now() + 1,
                text: "No pude conectar con el asistente en este momento. Si es una emergencia real, llama al 911 o a Cruz Roja Tapachula: 962-606-4212.",
                isBot: true,
                timestamp: new Date(),
            }
            setMessages((prev) => [...prev, errorMessage])
        } finally {
            setIsLoading(false)
        }
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
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="max-w-[85%] p-3 rounded-2xl text-sm bg-white border border-black/5 text-black">
                                        <div className="flex items-center gap-2 text-black/60">
                                            <span className="w-2 h-2 bg-vital rounded-full animate-pulse" />
                                            Pensando...
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick replies - scrollable horizontal */}
                        <div className="p-2 border-t border-black/5 flex gap-2 overflow-x-auto bg-white flex-shrink-0 scrollbar-hide">
                            {QUICK_REPLIES.map((reply) => (
                                <button
                                    key={reply}
                                    onClick={() => sendMessage(reply)}
                                    disabled={isLoading}
                                    className="flex-shrink-0 px-3 py-2 bg-rose-50 text-vital text-xs font-medium rounded-full hover:bg-rose-100 transition-colors cursor-pointer min-h-[36px] disabled:opacity-50 disabled:cursor-not-allowed"
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
                                disabled={isLoading}
                                className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm sm:text-base text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-vital/30 min-h-[44px]"
                            />
                            <Button
                                type="submit"
                                size="icon"
                                disabled={isLoading}
                                className="bg-vital hover:bg-vital/90 rounded-full w-11 h-11 sm:w-10 sm:h-10 cursor-pointer flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
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
