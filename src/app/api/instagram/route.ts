import { NextResponse } from 'next/server'

const IG_USER_ID = process.env.KA_IG_USER_ID || '17841480637745198'
const PAGE_TOKEN = process.env.KA_PAGE_TOKEN || ''

export async function GET() {
  if (!PAGE_TOKEN) {
    return NextResponse.json({ posts: [], error: 'No token configured' })
  }

  try {
    const url = `https://graph.facebook.com/v21.0/${IG_USER_ID}/media?fields=id,caption,media_type,media_url,thumbnail_url,timestamp,permalink,like_count,comments_count,children{media_url,media_type}&limit=50&access_token=${PAGE_TOKEN}`
    const res = await fetch(url, { next: { revalidate: 300 } }) // cache 5 min
    const data = await res.json()

    if (data.error) {
      console.error('IG API error:', data.error)
      return NextResponse.json({ posts: [], error: data.error.message })
    }

    const posts = (data.data || []).map((post: any, i: number) => {
      const caption = post.caption || ''
      const lines = caption.split('\n').filter((l: string) => l.trim())
      const hook = lines[0] || 'Sin título'
      const body = lines.slice(1, 4).join(' ') || caption.slice(0, 200)
      const hashtags = caption.match(/#\w+/g) || []
      const fecha = post.timestamp ? post.timestamp.split('T')[0] : ''

      // Detect format from media_type
      let formato: string = 'Post'
      if (post.media_type === 'CAROUSEL_ALBUM') formato = 'Carrusel'
      else if (post.media_type === 'VIDEO') formato = 'Reel'

      // Extract slides from carousel children
      const slides = post.children?.data?.map((child: any, j: number) => ({
        titulo: `Slide ${j + 1}`,
        texto: '',
        media_url: child.media_url,
        media_type: child.media_type,
      })) || []

      return {
        id: post.id,
        hook,
        body,
        pilar: 'Educativo' as const, // default, no way to know from IG
        formato,
        status: 'publicado' as const,
        fecha,
        industria: '',
        cta: '',
        hashtags,
        slides: slides.length > 0 ? slides : undefined,
        engagement: post.like_count != null ? Number(((post.like_count + (post.comments_count || 0)) / 100).toFixed(1)) : undefined,
        permalink: post.permalink,
        media_url: post.media_url || post.thumbnail_url,
        like_count: post.like_count || 0,
        comments_count: post.comments_count || 0,
      }
    })

    return NextResponse.json({ posts })
  } catch (err: any) {
    console.error('IG fetch error:', err)
    return NextResponse.json({ posts: [], error: err.message })
  }
}
