'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, X, Instagram, Loader2 } from 'lucide-react'
import { contentPieces, type ContentStatus } from '@/lib/mock-data'

const statusColors: Record<ContentStatus, string> = {
  borrador: 'bg-gray-200',
  revision: 'bg-amber-300',
  aprobado: 'bg-green-300',
  publicado: 'bg-blue-300',
  error: 'bg-red-300',
}

const dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  const d = new Date(year, month, 1).getDay()
  return d === 0 ? 6 : d - 1
}

type Post = { id: string; hook: string; pilar: string; formato: string; status: ContentStatus; fecha: string; media_url?: string; permalink?: string }

export default function CalendarPage() {
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth())
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [igPosts, setIgPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [source, setSource] = useState<'instagram' | 'mock'>('instagram')

  useEffect(() => {
    fetch('/api/instagram')
      .then(r => r.json())
      .then(data => {
        if (data.posts?.length > 0) {
          setIgPosts(data.posts)
        } else {
          setSource('mock')
        }
        setLoading(false)
      })
      .catch(() => { setSource('mock'); setLoading(false) })
  }, [])

  const posts: Post[] = source === 'instagram' ? igPosts : contentPieces

  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)
  const monthName = new Date(year, month).toLocaleString('es', { month: 'long' })

  const prev = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1) }
    else setMonth(m => m - 1)
  }
  const next = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1) }
    else setMonth(m => m + 1)
  }

  const getPostsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return posts.filter(p => p.fecha === dateStr)
  }

  const selectedPosts = selectedDay ? getPostsForDay(selectedDay) : []

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Calendario</h1>
          <p className="text-gray-500 mt-1">
            {source === 'instagram' ? (
              <span className="flex items-center gap-1.5">
                <Instagram className="w-4 h-4 text-pink-500" />
                Posts reales de @kepleragents
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
            <span className="flex items-center gap-1.5"><Instagram className="w-3.5 h-3.5" /> IG</span>
          </button>
          <button
            onClick={() => setSource('mock')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${source === 'mock' ? 'bg-white shadow text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Demo
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 text-indigo-500 animate-spin" />
          <span className="ml-3 text-gray-500">Cargando posts...</span>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button onClick={prev} className="p-2 hover:bg-gray-100 rounded-xl transition">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold capitalize">{monthName} {year}</h2>
            <button onClick={next} className="p-2 hover:bg-gray-100 rounded-xl transition">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Day Names */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map(d => (
              <div key={d} className="text-center text-xs font-medium text-gray-400 py-2">{d}</div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
              const dayPosts = getPostsForDay(day)
              const today = new Date()
              const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear()
              return (
                <button
                  key={day}
                  onClick={() => dayPosts.length > 0 && setSelectedDay(day)}
                  className={`aspect-square rounded-xl p-1.5 text-sm transition relative ${
                    isToday ? 'ring-2 ring-indigo-500' : ''
                  } ${dayPosts.length > 0 ? 'hover:bg-gray-50 cursor-pointer' : 'cursor-default'}`}
                >
                  <span className={`${isToday ? 'text-indigo-600 font-bold' : 'text-gray-700'}`}>{day}</span>
                  {dayPosts.length > 0 && (
                    <div className="flex gap-0.5 mt-1 justify-center flex-wrap">
                      {dayPosts.slice(0, 3).map((p, j) => (
                        <div key={j} className={`w-1.5 h-1.5 rounded-full ${statusColors[p.status] || 'bg-blue-300'}`} />
                      ))}
                      {dayPosts.length > 3 && (
                        <span className="text-[10px] text-gray-400">+{dayPosts.length - 3}</span>
                      )}
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-gray-100">
            {source === 'instagram' ? (
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-300" />
                <span className="text-xs text-gray-500">Publicado</span>
              </div>
            ) : (
              Object.entries(statusColors).map(([status, color]) => (
                <div key={status} className="flex items-center gap-1.5">
                  <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
                  <span className="text-xs text-gray-500 capitalize">{status === 'revision' ? 'En revisión' : status}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Selected Day Modal */}
      {selectedDay && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedDay(null)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">{selectedDay} de {monthName} {year}</h3>
              <button onClick={() => setSelectedDay(null)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            {selectedPosts.length === 0 ? (
              <p className="text-gray-400 text-sm py-4 text-center">No hay contenido este día</p>
            ) : (
              <div className="space-y-3">
                {selectedPosts.map(p => (
                  <div key={p.id} className="bg-gray-50 rounded-xl p-4">
                    {(p as any).media_url && (
                      <img src={(p as any).media_url} alt="" className="w-full h-32 object-cover rounded-lg mb-3" />
                    )}
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-2 h-2 rounded-full ${statusColors[p.status] || 'bg-blue-300'}`} />
                      <span className="text-xs text-gray-400">{p.formato}</span>
                    </div>
                    <p className="text-sm font-medium">{p.hook}</p>
                    {(p as any).permalink && (
                      <a href={(p as any).permalink} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-500 hover:underline mt-2 inline-block">
                        Ver en Instagram →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
