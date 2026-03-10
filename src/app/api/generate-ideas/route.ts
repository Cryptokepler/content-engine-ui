import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { mockIdeas } from '@/lib/mock-data'

export async function POST(req: Request) {
  const { industria, tono, tema } = await req.json()

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ ideas: mockIdeas })
  }

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    const temaExtra = tema ? ` Enfócate en el tema: ${tema}.` : ''

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Eres el estratega de contenido de KeplerAgents, una empresa que vende agentes de inteligencia artificial para automatizar la atención al cliente vía WhatsApp e Instagram. 

KeplerAgents ofrece:
- Agentes IA que responden mensajes 24/7 por WhatsApp e Instagram DM
- Automatización de citas, reservas, presupuestos
- Integración con CRM
- Implementación en 72 horas
- Planes desde $399 USD

El contenido que generas es para el Instagram de @kepleragents. El objetivo es VENDER el servicio de agentes IA a negocios de la industria seleccionada. NO generes contenido como si fueras el negocio — genera contenido que le hable AL dueño del negocio mostrándole por qué necesita un agente IA.

Responde SOLO con un JSON array válido, sin markdown ni texto adicional.`
        },
        {
          role: 'user',
          content: `Genera 5 ideas de contenido para Instagram de @kepleragents dirigido a dueños de "${industria}" con tono "${tono}".${temaExtra}

El contenido debe mostrar cómo un agente IA de KeplerAgents resuelve problemas reales de "${industria}": mensajes sin responder, clientes perdidos, citas olvidadas, saturación del personal, etc.

Cada idea debe tener: hook (frase gancho que atrape al dueño del negocio), descripcion (breve explicación), pilar (uno de: Educativo, Promocional, Entretenimiento, Autoridad), formato (uno de: Carrusel, Reel, Post, Story).

Responde con un JSON array: [{"hook":"...","descripcion":"...","pilar":"...","formato":"..."}]`
        }
      ],
      temperature: 0.9,
      max_tokens: 1000,
    })

    const content = completion.choices[0]?.message?.content || '[]'
    const cleaned = content.replace(/```json\n?|\n?```/g, '').trim()
    const ideas = JSON.parse(cleaned)
    return NextResponse.json({ ideas })
  } catch {
    return NextResponse.json({ ideas: mockIdeas })
  }
}
