'use client'

import { BarChart3, TrendingUp, Bookmark, Share2, Users } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { analyticsData } from '@/lib/mock-data'

const kpis = [
  { label: 'Total posts', value: '25', icon: BarChart3, color: 'bg-indigo-50 text-indigo-600' },
  { label: 'Engagement promedio', value: '11.2%', icon: TrendingUp, color: 'bg-green-50 text-green-600' },
  { label: 'Total guardados', value: '1,717', icon: Bookmark, color: 'bg-amber-50 text-amber-600' },
  { label: 'Total compartidos', value: '1,002', icon: Share2, color: 'bg-blue-50 text-blue-600' },
  { label: 'Crecimiento', value: '+13.3%', icon: Users, color: 'bg-purple-50 text-purple-600' },
]

export default function AnalyticsPage() {
  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Analíticas</h1>
        <p className="text-gray-500 mt-1">Rendimiento de tu contenido en los últimos 30 días</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
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

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
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
          <h3 className="font-semibold mb-4">Guardados vs Compartidos</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={analyticsData.savesVsShares}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="semana" tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="guardados" fill="#4F46E5" radius={[6, 6, 0, 0]} />
              <Bar dataKey="compartidos" fill="#93C5FD" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-semibold mb-4">Crecimiento semanal</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={analyticsData.growthSemanal}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="semana" tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <Tooltip />
              <Area type="monotone" dataKey="seguidores" stroke="#10B981" fill="#D1FAE5" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-semibold mb-4">Top posts</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={analyticsData.topPosts} layout="vertical">
              <XAxis type="number" tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <YAxis type="category" dataKey="hook" width={120} tick={{ fontSize: 10 }} stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="engagement" fill="#4F46E5" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-semibold mb-4">Posts por pilar</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={analyticsData.postsByPilar} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value">
                {analyticsData.postsByPilar.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-2 justify-center">
            {analyticsData.postsByPilar.map(p => (
              <div key={p.name} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.fill }} />
                <span className="text-xs text-gray-500">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
