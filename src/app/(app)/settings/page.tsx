'use client'

import { useState } from 'react'
import { Check, MessageCircle } from 'lucide-react'

export default function SettingsPage() {
  const [demoMode, setDemoMode] = useState(true)

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Configuración</h1>
        <p className="text-gray-500 mt-1">Administra tu cuenta y preferencias</p>
      </div>

      {/* Profile */}
      <Section title="Perfil">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Nombre" defaultValue="Jhonatan K." />
          <Field label="Correo" defaultValue="jhonatan@kepleragents.com" />
          <Field label="Negocio" defaultValue="KeplerAgents" />
          <Field label="Sitio web" defaultValue="kepleragents.com" />
        </div>
      </Section>

      {/* Channels */}
      <Section title="Canales conectados">
        <div className="space-y-3">
          {[
            { name: 'Instagram', connected: true, handle: '@kepleragents' },
            { name: 'WhatsApp', connected: true, handle: '+34 612 345 678' },
            { name: 'Telegram', connected: true, handle: '@kepleragents_bot' },
          ].map(ch => (
            <div key={ch.name} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">{ch.name}</p>
                  <p className="text-xs text-gray-400">{ch.handle}</p>
                </div>
              </div>
              {ch.connected && (
                <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                  <Check className="w-3 h-3" /> Conectado
                </span>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* API Config */}
      <Section title="Configuración API">
        <Field label="OpenAI API Key" defaultValue="sk-proj-••••••••••••••••••••qPDu" type="password" />
        <p className="text-xs text-gray-400 mt-2">Se usa para generar contenido con IA. La clave está encriptada.</p>
      </Section>

      {/* Preferences */}
      <Section title="Preferencias">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm text-gray-500 mb-1">Industria por defecto</label>
            <select className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm outline-none">
              <option>Consultoría</option>
              <option>Restaurantes</option>
              <option>Clínicas dentales</option>
              <option>General</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Tono por defecto</label>
            <select className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm outline-none">
              <option>Profesional</option>
              <option>Casual</option>
              <option>Urgente</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Frecuencia publicación</label>
            <select className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm outline-none">
              <option>3 veces por semana</option>
              <option>Diario</option>
              <option>5 veces por semana</option>
            </select>
          </div>
        </div>

        {/* Demo Mode Toggle */}
        <div className="flex items-center justify-between py-3">
          <div>
            <p className="text-sm font-medium">Modo Demo</p>
            <p className="text-xs text-gray-400">Usa datos de ejemplo en lugar de datos reales</p>
          </div>
          <button
            onClick={() => setDemoMode(!demoMode)}
            className={`relative w-12 h-6 rounded-full transition-colors ${demoMode ? 'bg-indigo-600' : 'bg-gray-200'}`}
          >
            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${demoMode ? 'left-6.5 translate-x-0' : 'left-0.5'}`}
              style={{ left: demoMode ? '26px' : '2px' }} />
          </button>
        </div>
      </Section>

      <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl transition mt-4">
        Guardar cambios
      </button>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
      <h3 className="font-semibold mb-4">{title}</h3>
      {children}
    </div>
  )
}

function Field({ label, defaultValue, type = 'text' }: { label: string; defaultValue: string; type?: string }) {
  return (
    <div>
      <label className="block text-sm text-gray-500 mb-1">{label}</label>
      <input type={type} defaultValue={defaultValue}
        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
    </div>
  )
}
