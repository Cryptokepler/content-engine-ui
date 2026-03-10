'use client'

import { useState, useEffect, useCallback } from 'react'
import { Search, X, ChevronDown, Instagram, ExternalLink, Heart, MessageCircle, Loader2, CheckCircle, XCircle, Send, Calendar } from 'lucide-react'
import { fetchContent, updateContentStatus, publishContent, type ContentItem } from '@/lib/api'

const statusConfig: Record<string, { label: string; cls: string }> = {
  '💡 Ideas': { label: '💡 Idea', cls: 'bg-yellow-100 text-yellow-700' },
  '✍️ Copy': { label: '✍️ Copy', cls: 'bg-purple-100 text-purple-700' },
  '🎨 Diseño': { label: '🎨 Diseño', cls: 'bg-pink-100 text-pink-700' },
  '✅ Published': { label: '✅ Publicado', cls: 'bg-green-100 text-green-700' },
  '❌ Error': { label: '❌ Error', cls: 'bg-red-100 text-red-700' },
  '📝 Draft': { label: '📝 Borrador', cls: 'bg-gray-100 text-gray-600' },
}

const allStatuses = ['💡 Ideas', '✍️ Copy', '🎨 Diseño', '✅ Published', '❌ Error', '📝 Draft']

export default function ContentPage() {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [items, setItems] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<ContentItem | null>(null)
  const [actionLoading, setActionLoading] = useState('')
  const [igPosts, setIgPosts] = useState<any[]>([])
  const [source, setSource] = useState<'notion' | 'instagram'>('notion')

  const loadContent = useCallback(async () => {
    setLoading(true)
    try {
      const data = await fetchContent(filterStatus === 'all' ? undefined : filterStatus)
      setItems(data)
    } catch { setItems([]) }
    setLoading(false)
  }, [filterStatus])

  useEffect(() => { loadContent() }, [loadContent])

  useEffect(() => {
    fetch('/api/instagram')
      .then(r => r.json())
      .then(data => { if (data.posts?.length > 0) setIgPosts(data.posts) })
      .catch(() => {})
  }, [])

  const filtered = items.filter(p => {
    if (search && !p.idea.toLowerCase().includes(search.toLowerCase()) && !p.hook.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const handleUpdateStatus = async (id: string, status: string) => {
    setActionLoading(id + status)
    try {
      await updateContentStatus(id, status)
      await loadContent()
      setSelected(null)
    } catch (e) {
      alert('Error: ' + (e as Error).message)
    }
    setActionLoading('')
  }

  const handlePublish = async (id: string) => {
    if (!confirm('¿Publicar ahora en Instagram?')) return
    setActionLoading(id + 'publish')
    try {
      await publishContent(id)
      await loadContent()
      setSelected(null)
      alert('✅ Publicado en Instagram')
    } catch (e) {
      alert('Error publicando: ' + (e as Error).message)
    }
    setActionLoading('')
  }

  const getStatusInfo = (status: string) => statusConfig[status] || { label: status, cls: 'bg-gray-100 text-gray-600' }

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Contenido</h1>
          <p className="text-gray-500 mt-1">
            {source === 'notion' ? `Notion DB · ${items.length} items` : `Instagram · ${igPosts.length} posts`}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
          <button onClick={() => setSource('notion')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${source === 'notion' ? 'bg-white shadow text-indigo-600' : 'text-gray-500'}`}>
            📋 Notion
          </button>
          <button onClick={() => setSource('instagram')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${source === 'instagram' ? 'bg-white shadow text-indigo-600' : 'text-gray-500'}`}
            disabled={igPosts.length === 0}>
            <span className="flex items-center gap-1.5"><Instagram className="w-3.5 h-3.5" /> Instagram</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
        </div>
        {source === 'notion' && (
          <div className="relative">
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer">
              <option value="all">Todos los estados</option>
              {allStatuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 text-indigo-500 animate-spin" />
          <span className="ml-3 text-gray-500">Cargando contenido...</span>
        </div>
      ) : source === 'notion' ? (
        /* Notion content table */
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-gray-500">
                <th className="px-5 py-3 font-medium">Idea / Hook</th>
                <th className="px-5 py-3 font-medium">Pilar</th>
                <th className="px-5 py-3 font-medium">Formato</th>
                <th className="px-5 py-3 font-medium">Estado</th>
                <th className="px-5 py-3 font-medium">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => {
                const si = getStatusInfo(item.status)
                return (
                  <tr key={item.id} onClick={() => setSelected(item)}
                    className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition">
                    <td className="px-5 py-3 max-w-xs truncate font-medium">{item.hook || item.idea}</td>
                    <td className="px-5 py-3 text-gray-500">{item.pilar || '—'}</td>
                    <td className="px-5 py-3 text-gray-500">{item.formato || '—'}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${si.cls}`}>{si.label}</span>
                    </td>
                    <td className="px-5 py-3 text-gray-400">{item.fecha}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-16 text-center text-gray-400">No se encontraron resultados</div>
          )}
        </div>
      ) : (
        /* Instagram grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {igPosts.filter(p => !search || p.hook?.toLowerCase().includes(search.toLowerCase())).map((p: any) => (
            <div key={p.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md cursor-pointer transition group">
              {p.media_url && (
                <div className="aspect-square bg-gray-100 overflow-hidden">
                  <img src={p.media_url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                </div>
              )}
              <div className="p-4">
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
      )}

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusInfo(selected.status).cls}`}>
                  {getStatusInfo(selected.status).label}
                </span>
                <span className="ml-2 text-xs text-gray-400">{selected.pilar} · {selected.formato} · {selected.fecha}</span>
              </div>
              <button onClick={() => setSelected(null)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <h2 className="text-xl font-bold mb-3">{selected.idea}</h2>

            {selected.hook && selected.hook !== selected.idea && (
              <div className="bg-indigo-50 rounded-xl p-4 mb-4">
                <p className="text-xs font-medium text-indigo-500 mb-1">HOOK</p>
                <p className="font-semibold text-indigo-900">{selected.hook}</p>
              </div>
            )}

            {selected.copy && (
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <p className="text-xs font-medium text-gray-400 mb-1">COPY</p>
                <p className="text-sm text-gray-700 whitespace-pre-line">{selected.copy}</p>
              </div>
            )}

            {selected.cta && (
              <div className="bg-green-50 rounded-xl p-4 mb-4">
                <p className="text-xs font-medium text-green-600 mb-1">CTA</p>
                <p className="text-sm text-green-800">{selected.cta}</p>
              </div>
            )}

            {selected.assetLink && (
              <div className="rounded-xl overflow-hidden mb-4 bg-gray-100">
                <img src={selected.assetLink} alt="" className="w-full max-h-96 object-contain" />
              </div>
            )}

            {/* Action buttons based on status */}
            <div className="flex flex-wrap gap-3 mt-4">
              {/* Approve: for Ideas, Copy, Draft */}
              {['💡 Ideas', '✍️ Copy', '📝 Draft'].includes(selected.status) && (
                <button onClick={() => handleUpdateStatus(selected.id, '🎨 Diseño')}
                  disabled={!!actionLoading}
                  className="flex-1 min-w-[120px] bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl font-medium text-sm transition flex items-center justify-center gap-2 disabled:opacity-50">
                  {actionLoading === selected.id + '🎨 Diseño' ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                  Aprobar → Diseño
                </button>
              )}

              {/* Publish: for Diseño */}
              {selected.status === '🎨 Diseño' && (
                <button onClick={() => handlePublish(selected.id)}
                  disabled={!!actionLoading}
                  className="flex-1 min-w-[120px] bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-medium text-sm transition flex items-center justify-center gap-2 disabled:opacity-50">
                  {actionLoading === selected.id + 'publish' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  Publicar ahora
                </button>
              )}

              {/* Reject: for non-published */}
              {selected.status !== '✅ Published' && selected.status !== '❌ Error' && (
                <button onClick={() => handleUpdateStatus(selected.id, '❌ Error')}
                  disabled={!!actionLoading}
                  className="flex-1 min-w-[120px] bg-red-50 hover:bg-red-100 text-red-600 py-2.5 rounded-xl font-medium text-sm transition flex items-center justify-center gap-2 disabled:opacity-50">
                  <XCircle className="w-4 h-4" /> Rechazar
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}