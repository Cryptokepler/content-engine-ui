import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { mockGeneratedCopy } from '@/lib/mock-data'

export async function POST(req: Request) {
  const { hook, industria, tono, formato } = await req.json()

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(mockGeneratedCopy)
  }

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Eres el copywriter de KeplerAgents, empresa que vende agentes de inteligencia artificial para automatizar atención al cliente por WhatsApp e Instagram.

REGLAS:
- El contenido es para el Instagram de @kepleragents
- Hablas AL dueño del negocio, no como si fueras el negocio
- Muestras el dolor (mensajes perdidos, clientes que se van, personal saturado) y la solución (agente IA de KeplerAgents)
- El CTA siempre lleva a contactar a KeplerAgents por WhatsApp o DM
- Nunca menciones precios — siempre redirige a WhatsApp para demo/cotización
- Tono profesional pero cercano, datos concretos cuando sea posible

Responde SOLO con JSON válido, sin markdown.`
        },
        {
          role: 'user',
          content: `Desarrolla el copy completo para este contenido de @kepleragents:
- Hook: "${hook}"
- Industria objetivo: ${industria} (el cliente al que le vendemos)
- Tono: ${tono}
- Formato: ${formato}

El contenido debe convencer al dueño de un negocio de ${industria} de que necesita un agente IA de KeplerAgents.

Genera un JSON con: hook (el hook mejorado, máximo 10 palabras), slides (array de 5 objetos con "titulo" y "texto" — cada slide construye el argumento de venta), cta (call to action que lleve a escribir por WhatsApp o DM), hashtags (array de 5-8 hashtags relevantes).

Formato: {"hook":"...","slides":[{"titulo":"...","texto":"..."}],"cta":"...","hashtags":["#...",...]}`
        }
      ],
      temperature: 0.8,
      max_tokens: 1200,
    })

    const content = completion.choices[0]?.message?.content || '{}'
    const cleaned = content.replace(/```json\n?|\n?```/g, '').trim()
    const copy = JSON.parse(cleaned)
    return NextResponse.json(copy)
  } catch {
    return NextResponse.json(mockGeneratedCopy)
  }
}
