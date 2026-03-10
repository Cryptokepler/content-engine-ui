'use client'

import { useState, useEffect } from 'react'
import { Search, X, ChevronDown, Instagram, ExternalLink, Heart, MessageCircle, Loader2 } from 'lucide-react'
import { contentPieces, type ContentPiece, type ContentStatus } from '@/lib/mock-data'

const statusConfig: Record<ContentStatus, { label: string; cls: string }> = {
  borrador: { label: 'Borrador', cls: 'bg-gray-100 text-gray-600' },
  revision: { label: 'En revisión', cls: 'bg-amber-100 text-amber-700' },
  aprobado: { label: 'Aprobado', cls: 'bg-green-100 text-green-700' },
  publicado: { label: 'Publicado', cls: 'bg-blue-100 text-blue-700' },
  error: { label: 'Error', cls: 'bg-red-100 text-red-700' },
}

type IGPost = ContentPiece & { permalink?: string; media_url?: string; like_count?: number; comments_count?: number }

export default function ContentPage() {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterPilar, setFilterPilar] = useState<string>('all')
  const [filterFormato, setFilterFormato] = useState<string>('all')
  const [selected, setSelected] = useState<IGPost | null>(null)
  const [source, setSource] = useState<'instagram' | 'mock'>('instagram')
  const [igPosts, setIgPosts] = useState<IGPost[]>([])
  const [loading, setLoading] = useState(true)
  const [igError, setIgError] = useState('')

  useEffect(() => {
    fetch('/api/instagram')
      .then(r => r.json())
      .then(data => {
        if (data.posts?.length > 0) {
          setIgPosts(data.posts)
          setIgError('')
        } else {
          setIgError(data.error || 'No posts found')
          setSource('mock')
        }
        setLoading(false)
      })
      .catch(() => {
        setSource('mock')
        setLoading(false)
      })
  }, [])

  const items: IGPost[] = source === 'instagram' ? igPosts : contentPieces

  const filtered = items.filter(p => {
    if (search && !p.hook.toLowerCase().includes(search.toLowerCase())) return false
    if (filterStatus !== 'all' && p.status !== filterStatus) return false
    if (filterPilar !== 'all' && p.pilar !== filterPilar) return false
    if (filterFormato !== 'all' && p.formato !== filterFormato) return false
    return true
  })

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Contenido</h1>
          <p className="text-gray-500 mt-1">
            {source === 'instagram' ? (
              <span className="flex items-center gap-1.5">
                <Instagram className="w-4 h-4 text-pink-500" />
                Conectado a @kepleragents · {igPosts.length} posts
              </span>
            ) : 'Datos de demostración'}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setSource('instagram')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${source === 'instagram' ? 'bg-white shadow text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
            disabled={igPosts.length === 0}
          >
            <span className="flex items-center gap-1.5"><Instagram className="w-3.5 h-3.5" /> Instagram</span>
          </button>
          <button
            onClick={() => setSource('mock')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${source === 'mock' ? 'bg-white shadow text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Demo
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por hook..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
        {source === 'mock' && (
          <>
            <Select value={filterStatus} onChange={setFilterStatus} options={[['all','Estado'],['borrador','Borrador'],['revision','En revisión'],['aprobado','Aprobado'],['publicado','Publicado'],['error','Error']]} />
            <Select value={filterPilar} onChange={setFilterPilar} options={[['all','Pilar'],['Educativo','Educativo'],['Promocional','Promocional'],['Entretenimiento','Entretenimiento'],['Autoridad','Autoridad']]} />
          </>
        )}
        <Select value={filterFormato} onChange={setFilterFormato} options={[['all','Formato'],['Carrusel','Carrusel'],['Reel','Reel'],['Post','Post'],['Story','Story']]} />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 text-indigo-500 animate-spin" />
          <span className="ml-3 text-gray-500">Cargando posts de Instagram...</span>
        </div>
      ) : (
        <>
          {/* Grid for Instagram, Table for mock */}
          {source === 'instagram' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(p => (
                <div key={p.id} onClick={() => setSelected(p)} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md cursor-pointer transition group">
                  {p.media_url && (
                    <div className="aspect-square bg-gray-100 overflow-hidden">
                      <img src={p.media_url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig[p.status].cls}`}>
                        {statusConfig[p.status].label}
                      </span>
                      <span className="text-xs text-gray-400">{p.formato}</span>
                    </div>
                    <p className="font-medium text-sm line-clamp-2">{p.hook}</p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" />{p.like_count || 0}</span>
                      <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" />{p.comments_count || 0}</span>
                      <span className="ml-auto">{p.fecha}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-left text-gray-500">
                    <th className="px-5 py-3 font-medium">Hook</th>
                    <th className="px-5 py-3 font-medium">Pilar</th>
                    <th className="px-5 py-3 font-medium">Formato</th>
                    <th className="px-5 py-3 font-medium">Estado</th>
                    <th className="px-5 py-3 font-medium">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(p => (
                    <tr key={p.id} onClick={() => setSelected(p)} className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition">
                      <td className="px-5 py-3 max-w-xs truncate font-medium">{p.hook}</td>
                      <td className="px-5 py-3 text-gray-500">{p.pilar}</td>
                      <td className="px-5 py-3 text-gray-500">{p.formato}</td>
                      <td className="px-5 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig[p.status].cls}`}>
                          {statusConfig[p.status].label}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-gray-400">{p.fecha}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div className="py-16 text-center text-gray-400">No se encontraron resultados</div>
              )}
            </div>
          )}
        </>
      )}

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig[selected.status].cls}`}>
                  {statusConfig[selected.status].label}
                </span>
                <span className="ml-2 text-xs text-gray-400">{selected.pilar} · {selected.formato} · {selected.fecha}</span>
              </div>
              <button onClick={() => setSelected(null)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Image preview for IG posts */}
            {selected.media_url && (
              <div className="rounded-xl overflow-hidden mb-4 bg-gray-100">
                <img src={selected.media_url} alt="" className="w-full max-h-96 object-contain" />
              </div>
            )}

            <h2 className="text-xl font-bold mb-3">{selected.hook}</h2>
            <p className="text-gray-600 mb-4 whitespace-pre-line">{selected.body}</p>

            {/* Carousel slides */}
            {selected.slides && selected.slides.length > 0 && (
              <div className="space-y-2 mb-4">
                <p className="text-sm font-medium text-gray-500">Slides ({selected.slides.length})</p>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {selected.slides.map((s: any, i: number) => (
                    <div key={i} className="flex-shrink-0 w-32">
                      {s.media_url ? (
                        <img src={s.media_url} alt={s.titulo} className="w-32 h-32 object-cover rounded-xl" />
                      ) : (
                        <div className="bg-gray-50 rounded-xl p-3 h-32 flex flex-col justify-center">
                          <p className="font-medium text-xs">{s.titulo}</p>
                          <p className="text-xs text-gray-600 mt-1">{s.texto}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Engagement for IG */}
            {(selected.like_count != null || selected.comments_count != null) && (
              <div className="flex gap-4 mb-4 text-sm">
                <span className="flex items-center gap-1.5 text-gray-600"><Heart className="w-4 h-4 text-red-400" />{selected.like_count} likes</span>
                <span className="flex items-center gap-1.5 text-gray-600"><MessageCircle className="w-4 h-4 text-blue-400" />{selected.comments_count} comentarios</span>
              </div>
            )}

            {selected.cta && (
              <div className="bg-indigo-50 rounded-xl p-4 mb-4">
                <p className="text-sm font-medium text-indigo-700">CTA</p>
                <p className="text-sm text-indigo-600 mt-1">{selected.cta}</p>
              </div>
            )}

            {selected.hashtags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selected.hashtags.map(h => (
                  <span key={h} className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">{h}</span>
                ))}
              </div>
            )}

            {selected.permalink && (
              <a href={selected.permalink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 mb-4">
                <ExternalLink className="w-4 h-4" /> Ver en Instagram
              </a>
            )}

            {(selected.status === 'revision' || selected.status === 'borrador') && (
              <div className="flex gap-3 mt-4">
                <button onClick={() => setSelected(null)} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl font-medium text-sm transition">
                  ✅ Aprobar
                </button>
                <button onClick={() => setSelected(null)} className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-2.5 rounded-xl font-medium text-sm transition">
                  ❌ Rechazar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[][] }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="appearance-none pl-3 pr-8 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
      >
        {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  )
}