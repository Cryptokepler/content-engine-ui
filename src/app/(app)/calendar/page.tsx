'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
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
  return d === 0 ? 6 : d - 1 // Monday = 0
}

export default function CalendarPage() {
  const [year, setYear] = useState(2026)
  const [month, setMonth] = useState(2) // March = 2
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

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
    return contentPieces.filter(p => p.fecha === dateStr)
  }

  const selectedPosts = selectedDay ? getPostsForDay(selectedDay) : []

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Calendario</h1>
        <p className="text-gray-500 mt-1">Visualiza tu contenido programado</p>
      </div>

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
            const posts = getPostsForDay(day)
            const isToday = day === 10 && month === 2 && year === 2026
            return (
              <button
                key={day}
                onClick={() => posts.length > 0 && setSelectedDay(day)}
                className={`aspect-square rounded-xl p-1.5 text-sm transition relative ${
                  isToday ? 'ring-2 ring-indigo-500' : ''
                } ${posts.length > 0 ? 'hover:bg-gray-50 cursor-pointer' : 'cursor-default'}`}
              >
                <span className={`${isToday ? 'text-indigo-600 font-bold' : 'text-gray-700'}`}>{day}</span>
                {posts.length > 0 && (
                  <div className="flex gap-0.5 mt-1 justify-center flex-wrap">
                    {posts.slice(0, 3).map((p, j) => (
                      <div key={j} className={`w-1.5 h-1.5 rounded-full ${statusColors[p.status]}`} />
                    ))}
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-gray-100">
          {Object.entries(statusColors).map(([status, color]) => (
            <div key={status} className="flex items-center gap-1.5">
              <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
              <span className="text-xs text-gray-500 capitalize">{status === 'revision' ? 'En revisión' : status}</span>
            </div>
          ))}
        </div>
      </div>

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
              <p className="text-gray-400 text-sm py-4 text-center">No hay contenido programado</p>
            ) : (
              <div className="space-y-3">
                {selectedPosts.map(p => (
                  <div key={p.id} className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-2 h-2 rounded-full ${statusColors[p.status]}`} />
                      <span className="text-xs text-gray-400">{p.formato} · {p.pilar}</span>
                    </div>
                    <p className="text-sm font-medium">{p.hook}</p>
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
