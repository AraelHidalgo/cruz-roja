import { NextResponse } from "next/server"

import {
  EMERGENCY_BOT_MODEL,
  EMERGENCY_BOT_SYSTEM_PROMPT,
  getEmergencyFallbackResponse,
} from "@/lib/emergency-bot-brain"

type ChatRole = "user" | "model"

interface IncomingMessage {
  role?: string
  text?: string
}

interface GeminiPart {
  text?: string
}

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: GeminiPart[]
    }
  }>
  error?: {
    message?: string
  }
}

const GEMINI_API_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models"
const MAX_HISTORY_MESSAGES = 12
const MAX_MESSAGE_LENGTH = 2000

function sanitizeText(value: unknown) {
  if (typeof value !== "string") return ""
  return value.trim().slice(0, MAX_MESSAGE_LENGTH)
}

function sanitizeMessages(messages: IncomingMessage[]) {
  const sanitized = messages
    .map((message) => ({
      role: (message.role === "model" ? "model" : "user") as ChatRole,
      text: sanitizeText(message.text),
    }))
    .filter((message) => message.text.length > 0)
    .slice(-MAX_HISTORY_MESSAGES)

  while (sanitized[0]?.role === "model") {
    sanitized.shift()
  }

  return sanitized
}

function toGeminiContents(messages: Array<{ role: ChatRole; text: string }>) {
  return messages.map((message) => ({
    role: message.role,
    parts: [{ text: message.text }],
  }))
}

function extractGeminiText(data: GeminiResponse) {
  return (
    data.candidates
      ?.flatMap((candidate) => candidate.content?.parts?.map((part) => part.text).filter(Boolean) ?? [])
      .join("\n")
      .trim() ?? ""
  )
}

export async function POST(request: Request) {
  let latestUserMessage = ""

  try {
    const body = await request.json()
    const rawMessages = Array.isArray(body?.messages) ? body.messages : []
    const messages = sanitizeMessages(rawMessages)
    latestUserMessage = [...messages].reverse().find((message) => message.role === "user")?.text ?? ""

    if (!latestUserMessage) {
      return NextResponse.json({ error: "Escribe una pregunta para el asistente." }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY
    const model = process.env.GEMINI_MODEL ?? EMERGENCY_BOT_MODEL

    if (!apiKey) {
      return NextResponse.json({
        reply: getEmergencyFallbackResponse(latestUserMessage),
        source: "fallback",
      })
    }

    const response = await fetch(`${GEMINI_API_BASE_URL}/${model}:generateContent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: EMERGENCY_BOT_SYSTEM_PROMPT }],
        },
        contents: toGeminiContents(messages),
        generationConfig: {
          maxOutputTokens: 800,
          thinkingConfig: {
            thinkingLevel: "low",
          },
        },
      }),
    })

    const data = (await response.json()) as GeminiResponse

    if (!response.ok) {
      console.error("Gemini API error:", data.error?.message ?? response.statusText)
      return NextResponse.json({
        reply: getEmergencyFallbackResponse(latestUserMessage),
        source: "fallback",
      })
    }

    const reply = extractGeminiText(data)

    return NextResponse.json({
      reply: reply || getEmergencyFallbackResponse(latestUserMessage),
      source: reply ? "gemini" : "fallback",
      model,
    })
  } catch (error) {
    console.error("Emergency bot route error:", error)

    return NextResponse.json({
      reply: latestUserMessage
        ? getEmergencyFallbackResponse(latestUserMessage)
        : "No pude procesar tu mensaje. Si es una emergencia real, llama al 911 o a Cruz Roja Tapachula: 962-606-4212.",
      source: "fallback",
    })
  }
}
