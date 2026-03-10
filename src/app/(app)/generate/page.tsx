'use client'

import { useState } from 'react'
import { Sparkles, ChevronDown, Loader2, ArrowRight, Copy, Check } from 'lucide-react'
import type { Pilar, Formato } from '@/lib/mock-data'

interface Idea {
  hook: string
  descripcion: string
  pilar: string
  formato: string
}

interface GeneratedCopy {
  hook: string
  slides: { titulo: string; texto: string }[]
  cta: string
  hashtags: string[]
}

const industries = ['Restaurantes', 'Clínicas dentales', 'Inmobiliarias', 'Gimnasios', 'Salones de belleza', 'E-commerce', 'Consultoría', 'General']
const tonos = ['Profesional', 'Casual', 'Urgente']

export default function GeneratePage() {
  const [industria, setIndustria] = useState('Restaurantes')
  const [tono, setTono] = useState('Profesional')
  const [tema, setTema] = useState('')
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [loadingIdeas, setLoadingIdeas] = useState(false)
  const [developingId, setDevelopingId] = useState<number | null>(null)
  const [generatedCopy, setGeneratedCopy] = useState<GeneratedCopy | null>(null)
  const [copied, setCopied] = useState(false)

  const generateIdeas = async () => {
    setLoadingIdeas(true)
    setIdeas([])
    setGeneratedCopy(null)
    try {
      const res = await fetch('/api/generate-ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ industria, tono, tema: tema || undefined }),
      })
      const data = await res.json()
      setIdeas(data.ideas || [])
    } catch {
      setIdeas([])
    }
    setLoadingIdeas(false)
  }

  const developIdea = async (idea: Idea, index: number) => {
    setDevelopingId(index)
    setGeneratedCopy(null)
    try {
      const res = await fetch('/api/generate-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hook: idea.hook, industria, tono, formato: idea.formato }),
      })
      const data = await res.json()
      setGeneratedCopy(data)
    } catch {
      setGeneratedCopy(null)
    }
    setDevelopingId(null)
  }

  const copyAll = () => {
    if (!generatedCopy) return
    const text = `${generatedCopy.hook}\n\n${generatedCopy.slides.map((s, i) => `${i + 1}. ${s.titulo}\n${s.texto}`).join('\n\n')}\n\n${generatedCopy.cta}\n\n${generatedCopy.hashtags.join(' ')}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Generador de Contenido</h1>
        <p className="text-gray-500 mt-1">Crea ideas y copy con inteligencia artificial</p>
      </div>

      {/* Input Form */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Industria</label>
            <div className="relative">
              <select value={industria} onChange={e => setIndustria(e.target.value)}
                className="w-full appearance-none pl-3 pr-8 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                {industries.map(i => <option key={i}>{i}</option>)}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Tono</label>
            <div className="relative">
              <select value={tono} onChange={e => setTono(e.target.value)}
                className="w-full appearance-none pl-3 pr-8 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                {tonos.map(t => <option key={t}>{t}</option>)}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Tema (opcional)</label>
            <input value={tema} onChange={e => setTema(e.target.value)} placeholder="Ej: promoción de verano"
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
        </div>
        <button onClick={generateIdeas} disabled={loadingIdeas}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-6 rounded-xl transition flex items-center gap-2 disabled:opacity-70">
          {loadingIdeas ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          {loadingIdeas ? 'Generando ideas...' : 'Generar 5 ideas'}
        </button>
      </div>

      {/* Loading State */}
      {loadingIdeas && (
        <div className="flex flex-col items-center py-16">
          <div className="w-12 h-12 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4" />
          <p className="text-gray-500 font-medium">La IA está pensando...</p>
          <p className="text-gray-400 text-sm mt-1">Generando ideas creativas para {industria.toLowerCase()}</p>
        </div>
      )}

      {/* Ideas Grid */}
      {ideas.length > 0 && (
        <div className="space-y-4 mb-8">
          <h2 className="font-semibold text-lg">Ideas generadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ideas.map((idea, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-medium">{idea.pilar}</span>
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{idea.formato}</span>
                </div>
                <h3 className="font-semibold mb-2">{idea.hook}</h3>
                <p className="text-sm text-gray-500 mb-4">{idea.descripcion}</p>
                <button onClick={() => developIdea(idea, i)} disabled={developingId === i}
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1 disabled:opacity-50">
                  {developingId === i ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Desarrollando...</> : <><ArrowRight className="w-3.5 h-3.5" /> Desarrollar copy completo</>}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Generated Copy */}
      {generatedCopy && (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">Copy generado</h2>
            <button onClick={copyAll} className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
              {copied ? <><Check className="w-4 h-4 text-green-500" /> Copiado</> : <><Copy className="w-4 h-4" /> Copiar todo</>}
            </button>
          </div>

          <div className="bg-indigo-50 rounded-xl p-4 mb-4">
            <p className="text-xs font-medium text-indigo-500 mb-1">HOOK</p>
            <p className="font-semibold text-indigo-900">{generatedCopy.hook}</p>
          </div>

          <div className="space-y-3 mb-4">
            {generatedCopy.slides.map((s, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs font-medium text-gray-400 mb-1">SLIDE {i + 1}</p>
                <p className="font-medium text-sm">{s.titulo}</p>
                <p className="text-sm text-gray-600 mt-1">{s.texto}</p>
              </div>
            ))}
          </div>

          <div className="bg-green-50 rounded-xl p-4 mb-4">
            <p className="text-xs font-medium text-green-600 mb-1">CALL TO ACTION</p>
            <p className="text-sm text-green-800">{generatedCopy.cta}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {generatedCopy.hashtags.map(h => (
              <span key={h} className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">{h}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
