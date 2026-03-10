'use client'

import { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface SlidePreviewProps {
  hook: string
  slides: { titulo: string; texto: string }[]
  cta: string
  hashtags: string[]
}

export default function SlidePreview({ hook, slides, cta, hashtags }: SlidePreviewProps) {
  const [current, setCurrent] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Build all visual slides: cover + content slides + closing
  const allSlides = [
    { type: 'cover' as const, hook },
    ...slides.map(s => ({ type: 'content' as const, titulo: s.titulo, texto: s.texto })),
    { type: 'closing' as const, cta },
  ]

  const scrollTo = (index: number) => {
    setCurrent(index)
    if (scrollRef.current) {
      const child = scrollRef.current.children[index] as HTMLElement
      child?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }

  const prev = () => scrollTo(Math.max(0, current - 1))
  const next = () => scrollTo(Math.min(allSlides.length - 1, current + 1))

  return (
    <div className="mt-6">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">📱 Preview del Carousel</h3>
      <div className="relative">
        {/* Arrows */}
        {current > 0 && (
          <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 shadow-lg rounded-full p-1.5 hover:bg-white transition -ml-3">
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
        )}
        {current < allSlides.length - 1 && (
          <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 shadow-lg rounded-full p-1.5 hover:bg-white transition -mr-3">
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        )}

        {/* Slides container */}
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2" style={{ scrollbarWidth: 'none' }}
          onScroll={(e) => {
            const el = e.currentTarget
            const idx = Math.round(el.scrollLeft / (el.firstElementChild as HTMLElement)?.offsetWidth || 1)
            setCurrent(Math.min(idx, allSlides.length - 1))
          }}>
          {allSlides.map((slide, i) => (
            <div key={i} className="snap-center shrink-0 w-[280px] sm:w-[320px]">
              <div className="aspect-square rounded-2xl overflow-hidden relative" style={{
                background: 'linear-gradient(145deg, #0f0f23 0%, #1e1b4b 50%, #0f172a 100%)',
              }}>
                {/* Decorative elements */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-500 rounded-full blur-3xl" />
                </div>
                {/* Subtle grid dots */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                  backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }} />

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full p-6">
                  {/* Header - logo */}
                  <div className="flex items-center gap-2 mb-auto">
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center">
                      <span className="text-white text-[10px] font-bold">K</span>
                    </div>
                    <span className="text-white/70 text-xs font-semibold tracking-wide">KeplerAgents</span>
                  </div>

                  {/* Slide content */}
                  <div className="flex-1 flex flex-col justify-center">
                    {slide.type === 'cover' && (
                      <p className="text-white text-xl sm:text-2xl font-bold leading-tight">{slide.hook}</p>
                    )}
                    {slide.type === 'content' && (
                      <>
                        <p className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 text-sm font-bold uppercase tracking-wide mb-3">
                          {slide.titulo}
                        </p>
                        <p className="text-white/90 text-sm leading-relaxed">{slide.texto}</p>
                      </>
                    )}
                    {slide.type === 'closing' && (
                      <div className="text-center">
                        <p className="text-white text-lg font-bold mb-4 leading-tight">{slide.cta}</p>
                        <div className="inline-block bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl px-5 py-2.5">
                          <p className="text-white text-sm font-semibold">Escríbenos por WhatsApp 📲</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="mt-auto pt-3 border-t border-white/10">
                    <p className="text-white/30 text-[10px] text-center">Agentes IA para tu negocio</p>
                  </div>
                </div>

                {/* Slide number indicator */}
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm rounded-full px-2 py-0.5">
                  <span className="text-white/60 text-[10px] font-medium">{i + 1}/{allSlides.length}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-1.5 mt-3">
          {allSlides.map((_, i) => (
            <button key={i} onClick={() => scrollTo(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-indigo-500 w-5' : 'bg-gray-300 hover:bg-gray-400'}`} />
          ))}
        </div>
      </div>
    </div>
  )
}
