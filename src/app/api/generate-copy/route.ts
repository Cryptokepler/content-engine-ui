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
          content: `Eres un copywriter experto en redes sociales. Desarrolla contenido completo en español. Responde SOLO con JSON válido, sin markdown.`
        },
        {
          role: 'user',
          content: `Desarrolla el copy completo para este contenido:
- Hook: "${hook}"
- Industria: ${industria}
- Tono: ${tono}
- Formato: ${formato}

Genera un JSON con: hook (el hook mejorado), slides (array de 5 objetos con "titulo" y "texto"), cta (call to action potente), hashtags (array de 5-8 hashtags relevantes).

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
