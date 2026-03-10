const VPS_API = 'http://187.77.193.15:3100';

export interface ContentItem {
  id: string
  idea: string
  hook: string
  copy: string
  pilar: string
  formato: string
  cta: string
  status: string
  assetLink: string | null
  fecha: string
  updatedAt: string
}

export async function fetchContent(status?: string, limit = 50): Promise<ContentItem[]> {
  const params = new URLSearchParams({ limit: String(limit) })
  if (status) params.set('status', status)
  const res = await fetch(`${VPS_API}/api/content?${params}`)
  const data = await res.json()
  return data.items || []
}

export async function saveContent(content: {
  idea: string; hook?: string; copy?: string; pilar?: string; formato?: string; cta?: string; status?: string
}): Promise<ContentItem> {
  const res = await fetch(`${VPS_API}/api/content`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(content),
  })
  if (!res.ok) throw new Error((await res.json()).error || 'Error guardando')
  return res.json()
}

export async function updateContentStatus(id: string, status: string): Promise<ContentItem> {
  const res = await fetch(`${VPS_API}/api/content/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  })
  if (!res.ok) throw new Error((await res.json()).error || 'Error actualizando')
  return res.json()
}

export async function publishContent(id: string): Promise<{ success: boolean; igMediaId: string }> {
  const res = await fetch(`${VPS_API}/api/content/${id}/publish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })
  if (!res.ok) throw new Error((await res.json()).error || 'Error publicando')
  return res.json()
}
