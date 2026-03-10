'use client'

import { useState, useEffect, useMemo } from 'react'
import { BarChart3, TrendingUp, Heart, MessageCircle, Instagram, Loader2, Image as ImageIcon } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { analyticsData } from '@/lib/mock-data'

type IGPost = {
  id: string; hook: string; fecha: string; formato: string;
  like_count: number; comments_count: number; media_url?: string; permalink?: string
}

export default function AnalyticsPage() {
  const [posts, setPosts] = useState<IGPost[]>([])
  const [loading, setLoading] = useState(true)
  const [source, setSource] = useState<'instagram' | 'mock'>('instagram')

  useEffect(() => {
    fetch('/api/instagram')
      .then(r => r.json())
      .then(data => {
        if (data.posts?.length > 0) setPosts(data.posts)
        else setSource('mock')
        setLoading(false)
      })
      .catch(() => { setSource('mock'); setLoading(false) })
  }, [])

  const stats = useMemo(() => {
    if (source !== 'instagram' || posts.length === 0) return null
    const totalLikes = posts.reduce((s, p) => s + (p.like_count || 0), 0)
    const totalComments = posts.reduce((s, p) => s + (p.comments_count || 0), 0)
    const avgEng = posts.length > 0 ? ((totalLikes + totalComments) / posts.length).toFixed(1) : '0'
    const formatos: Record<string, number> = {}
    posts.forEach(p => { formatos[p.formato] = (formatos[p.formato] || 0) + 1 })
    
    // Engagement over time (by post date)
    const byDate = posts
      .filter(p => p.fecha)
      .sort((a, b) => a.fecha.localeCompare(b.fecha))
      .map(p => ({
        dia: p.fecha.slice(5), // MM-DD
        likes: p.like_count || 0,
        comentarios: p.comments_count || 0,
      }))

    // Top posts by engagement
    const topPosts = [...posts]
      .sort((a, b) => (b.like_count + b.comments_count) - (a.like_count + a.comments_count))
      .slice(0, 5)
      .map(p => ({
        hook: p.hook.length > 30 ? p.hook.slice(0, 30) + '...' : p.hook,
        engagement: p.like_count + p.comments_count,
      }))

    // Posts by format
    const pilarColors = ['#4F46E5', '#06B6D4', '#10B981', '#F59E0B', '#EF4444']
    const byFormat = Object.entries(formatos).map(([name, value], i) => ({
      name, value, fill: pilarColors[i % pilarColors.length]
    }))

    return { totalLikes, totalComments, avgEng, totalPosts: posts.length, byDate, topPosts, byFormat }
  }, [posts, source])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-indigo-500 animate-spin" />
        <span className="ml-3 text-gray-500">Cargando analíticas...</span>
      </div>
    )
  }

  if (source === 'mock' || !stats) {
    return <MockAnalytics />
  }

  const kpis = [
    { label: 'Total posts', value: String(stats.totalPosts), icon: ImageIcon, color: 'bg-indigo-50 text-indigo-600' },
    { label: 'Total likes', value: stats.totalLikes.toLocaleString(), icon: Heart, color: 'bg-red-50 text-red-500' },
    { label: 'Total comentarios', value: stats.totalComments.toLocaleString(), icon: MessageCircle, color: 'bg-blue-50 text-blue-600' },
    { label: 'Engagement promedio', value: stats.avgEng, icon: TrendingUp, color: 'bg-green-50 text-green-600' },
  ]

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analíticas</h1>
          <p className="text-gray-500 mt-1 flex items-center gap-1.5">
            <Instagram className="w-4 h-4 text-pink-500" /> Datos reales de @kepleragents
          </p>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
          <button onClick={() => setSource('instagram')} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${source === 'instagram' ? 'bg-white shadow text-indigo-600' : 'text-gray-500'}`}>
            <span className="flex items-center gap-1.5"><Instagram className="w-3.5 h-3.5" /> IG</span>
          </button>
          <button onClick={() => setSource('mock')} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${source === 'mock' ? 'bg-white shadow text-indigo-600' : 'text-gray-500'}`}>
            Demo
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {kpis.map(k => (
          <div key={k.label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${k.color} mb-3`}>
              <k.icon className="w-4 h-4" />
            </div>
            <p className="text-xl font-bold">{k.value}</p>
            <p className="text-xs text-gray-500">{k.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-semibold mb-4">Likes por publicación</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={stats.byDate}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="dia" tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="likes" fill="#EF4444" radius={[6, 6, 0, 0]} />
              <Bar dataKey="comentarios" fill="#3B82F6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-semibold mb-4">Top 5 posts</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={stats.topPosts} layout="vertical">
              <XAxis type="number" tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <YAxis type="category" dataKey="hook" width={140} tick={{ fontSize: 10 }} stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="engagement" fill="#4F46E5" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-semibold mb-4">Posts por formato</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={stats.byFormat} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value">
                {stats.byFormat.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-2 justify-center">
            {stats.byFormat.map(p => (
              <div key={p.name} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.fill }} />
                <span className="text-xs text-gray-500">{p.name} ({p.value})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Best performing post */}
        {posts.length > 0 && (() => {
          const best = [...posts].sort((a, b) => (b.like_count + b.comments_count) - (a.like_count + a.comments_count))[0]
          return (
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-semibold mb-4">🏆 Mejor post</h3>
              <div className="flex gap-4">
                {best.media_url && (
                  <img src={best.media_url} alt="" className="w-24 h-24 rounded-xl object-cover flex-shrink-0" />
                )}
                <div>
                  <p className="font-medium text-sm line-clamp-2 mb-2">{best.hook}</p>
                  <div className="flex gap-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-red-400" />{best.like_count}</span>
                    <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5 text-blue-400" />{best.comments_count}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">{best.fecha}</p>
                  {best.permalink && (
                    <a href={best.permalink} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-500 hover:underline mt-1 inline-block">Ver en Instagram →</a>
                  )}
                </div>
              </div>
            </div>
          )
        })()}
      </div>
    </div>
  )
}

// Fallback mock analytics (original)
function MockAnalytics() {
  const kpis = [
    { label: 'Total posts', value: '25', icon: BarChart3, color: 'bg-indigo-50 text-indigo-600' },
    { label: 'Engagement promedio', value: '11.2%', icon: TrendingUp, color: 'bg-green-50 text-green-600' },
    { label: 'Total likes', value: '1,717', icon: Heart, color: 'bg-red-50 text-red-500' },
    { label: 'Total comentarios', value: '1,002', icon: MessageCircle, color: 'bg-blue-50 text-blue-600' },
  ]
  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Analíticas</h1>
        <p className="text-gray-500 mt-1">Datos de demostración</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {kpis.map(k => (
          <div key={k.label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${k.color} mb-3`}>
              <k.icon className="w-4 h-4" />
            </div>
            <p className="text-xl font-bold">{k.value}</p>
            <p className="text-xs text-gray-500">{k.label}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-semibold mb-4">Engagement en el tiempo</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={analyticsData.engagementOverTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="dia" tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <Tooltip />
              <Line type="monotone" dataKey="engagement" stroke="#4F46E5" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-semibold mb-4">Top posts</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={analyticsData.topPosts} layout="vertical">
              <XAxis type="number" tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <YAxis type="category" dataKey="hook" width={120} tick={{ fontSize: 10 }} stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="engagement" fill="#4F46E5" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
