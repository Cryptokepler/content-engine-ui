'use client'

import Link from 'next/link'
import { CalendarDays, FileCheck, Clock, TrendingUp, Lightbulb, Sparkles, PenLine, Calendar } from 'lucide-react'
import { contentPieces } from '@/lib/mock-data'

const kpis = [
  { label: 'Próximo post', value: '12 Mar', sub: '3 razones por las que tu propiedad...', icon: CalendarDays, color: 'bg-indigo-50 text-indigo-600' },
  { label: 'Publicados este mes', value: '14', sub: '+3 vs mes anterior', icon: FileCheck, color: 'bg-green-50 text-green-600' },
  { label: 'En aprobación', value: '3', sub: 'Requieren revisión', icon: Clock, color: 'bg-amber-50 text-amber-600', badge: true },
  { label: 'Engagement promedio', value: '11.2%', sub: '+2.1% vs mes anterior', icon: TrendingUp, color: 'bg-blue-50 text-blue-600' },
  { label: 'Ideas generadas', value: '47', sub: 'Este mes', icon: Lightbulb, color: 'bg-purple-50 text-purple-600' },
]

const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
const weekPosts = [
  { day: 'Lun', count: 1, title: '5 errores restaurante' },
  { day: 'Mar', count: 0, title: '' },
  { day: 'Mié', count: 2, title: 'Blanqueamiento + Propiedad' },
  { day: 'Jue', count: 1, title: 'Rutina abdomen' },
  { day: 'Vie', count: 1, title: 'Promo 2x1' },
  { day: 'Sáb', count: 0, title: '' },
  { day: 'Dom', count: 1, title: 'Look transformación' },
]

export default function DashboardPage() {
  const recentPosts = contentPieces.filter(p => p.status === 'publicado' || p.status === 'aprobado').slice(0, 5)

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500 mt-1">Bienvenido de vuelta, Jhonatan 👋</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${kpi.color}`}>
                <kpi.icon className="w-5 h-5" />
              </div>
              {kpi.badge && (
                <span className="px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 rounded-full">Pendiente</span>
              )}
            </div>
            <p className="text-2xl font-bold">{kpi.value}</p>
            <p className="text-xs text-gray-500 mt-1">{kpi.label}</p>
            <p className="text-xs text-gray-400 mt-0.5 truncate">{kpi.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Weekly Calendar */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-semibold mb-4">Esta semana</h3>
          <div className="grid grid-cols-7 gap-2">
            {weekPosts.map((d, i) => (
              <div key={i} className="text-center">
                <p className="text-xs text-gray-400 mb-2">{d.day}</p>
                <div className={`h-16 rounded-xl flex items-center justify-center text-sm font-medium ${
                  d.count > 0 ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'bg-gray-50 text-gray-300'
                }`}>
                  {d.count > 0 ? d.count : '—'}
                </div>
                {d.title && <p className="text-[10px] text-gray-400 mt-1 truncate">{d.title}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-semibold mb-4">Acciones rápidas</h3>
          <div className="space-y-3">
            <Link href="/generate" className="flex items-center gap-3 p-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 transition text-indigo-700 font-medium text-sm">
              <Sparkles className="w-5 h-5" /> Generar ideas con IA
            </Link>
            <Link href="/content" className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition text-gray-700 font-medium text-sm">
              <PenLine className="w-5 h-5" /> Crear nuevo post
            </Link>
            <Link href="/calendar" className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition text-gray-700 font-medium text-sm">
              <Calendar className="w-5 h-5" /> Ver calendario
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3 className="font-semibold mb-4">Actividad reciente</h3>
        <div className="space-y-3">
          {recentPosts.map((post) => (
            <div key={post.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-3 min-w-0">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  post.status === 'publicado' ? 'bg-blue-500' : 'bg-green-500'
                }`} />
                <p className="text-sm truncate">{post.hook}</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-xs text-gray-400">{post.formato}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  post.status === 'publicado' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
                }`}>{post.status === 'publicado' ? 'Publicado' : 'Aprobado'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
