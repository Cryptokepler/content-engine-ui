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
    const temaExtra = tema ? ` El tema específico es: ${tema}.` : ''

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Eres un experto en marketing de contenidos para redes sociales. Genera ideas de contenido en español para la industria especificada. Responde SOLO con un JSON array válido, sin markdown ni texto adicional.`
        },
        {
          role: 'user',
          content: `Genera 5 ideas de contenido para la industria "${industria}" con tono "${tono}".${temaExtra}

Cada idea debe tener: hook (frase gancho atractiva), descripcion (breve explicación de la idea), pilar (uno de: Educativo, Promocional, Entretenimiento, Autoridad), formato (uno de: Carrusel, Reel, Post, Story).

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
