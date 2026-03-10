export type ContentStatus = 'borrador' | 'revision' | 'aprobado' | 'publicado' | 'error'
export type Pilar = 'Educativo' | 'Promocional' | 'Entretenimiento' | 'Autoridad'
export type Formato = 'Carrusel' | 'Reel' | 'Post' | 'Story'

export interface ContentPiece {
  id: string
  hook: string
  body: string
  pilar: Pilar
  formato: Formato
  status: ContentStatus
  fecha: string
  industria: string
  cta: string
  hashtags: string[]
  slides?: { titulo: string; texto: string }[]
  engagement?: number
}

export const contentPieces: ContentPiece[] = [
  {
    id: '1', hook: '5 errores que están matando las ventas de tu restaurante', body: 'La mayoría de restaurantes cometen estos errores sin darse cuenta. Desde no responder mensajes a tiempo hasta no tener un menú digital actualizado.',
    pilar: 'Educativo', formato: 'Carrusel', status: 'publicado', fecha: '2026-03-01', industria: 'Restaurantes',
    cta: '¿Quieres una auditoría gratuita? Escríbenos 📩', hashtags: ['#restaurantes', '#marketing', '#ventas'],
    slides: [
      { titulo: 'Error #1', texto: 'No responder mensajes en menos de 5 minutos' },
      { titulo: 'Error #2', texto: 'No tener fotos profesionales del menú' },
      { titulo: 'Error #3', texto: 'Ignorar las reseñas de Google' },
      { titulo: 'Error #4', texto: 'No publicar contenido en redes sociales' },
      { titulo: 'Error #5', texto: 'No tener un sistema de reservas online' },
    ],
    engagement: 8.4
  },
  {
    id: '2', hook: 'Tu sonrisa dice más que mil palabras 😁', body: 'Una sonrisa sana transmite confianza. En nuestra clínica, transformamos sonrisas todos los días.',
    pilar: 'Promocional', formato: 'Reel', status: 'publicado', fecha: '2026-03-02', industria: 'Clínicas dentales',
    cta: 'Agenda tu cita hoy con 20% de descuento', hashtags: ['#dentista', '#sonrisa', '#salud'],
    engagement: 12.1
  },
  {
    id: '3', hook: '3 razones por las que tu propiedad no se vende', body: 'El mercado inmobiliario es competitivo. Si tu propiedad lleva meses sin venderse, algo estás haciendo mal.',
    pilar: 'Educativo', formato: 'Carrusel', status: 'aprobado', fecha: '2026-03-12', industria: 'Inmobiliarias',
    cta: 'Consulta gratuita → Link en bio', hashtags: ['#inmobiliaria', '#bienes raíces', '#ventas'],
    slides: [
      { titulo: 'Razón #1', texto: 'Fotos de mala calidad' },
      { titulo: 'Razón #2', texto: 'Precio fuera de mercado' },
      { titulo: 'Razón #3', texto: 'Descripción genérica sin diferenciación' },
    ],
    engagement: 6.7
  },
  {
    id: '4', hook: 'Este ejercicio cambiará tu rutina para siempre 💪', body: 'El burpee con peso es uno de los ejercicios más completos. Quema calorías, fortalece y mejora tu cardio.',
    pilar: 'Entretenimiento', formato: 'Reel', status: 'publicado', fecha: '2026-03-03', industria: 'Gimnasios',
    cta: 'Prueba gratis por 7 días', hashtags: ['#fitness', '#gym', '#salud'],
    engagement: 15.3
  },
  {
    id: '5', hook: 'Tendencias de color 2026 que debes conocer', body: 'El cherry red y el mocha mousse dominan esta temporada. ¿Ya los probaste?',
    pilar: 'Educativo', formato: 'Carrusel', status: 'publicado', fecha: '2026-03-04', industria: 'Salones de belleza',
    cta: 'Reserva tu cita ahora', hashtags: ['#belleza', '#tendencias', '#cabello'],
    slides: [
      { titulo: 'Cherry Red', texto: 'El rojo cereza es el color estrella de esta temporada' },
      { titulo: 'Mocha Mousse', texto: 'Tonos cálidos y naturales para un look sofisticado' },
      { titulo: 'Butter Blonde', texto: 'El rubio mantequilla sigue reinando' },
    ],
    engagement: 9.2
  },
  {
    id: '6', hook: '¿Sabías que el 70% de las compras empiezan en redes?', body: 'Tu tienda online necesita una estrategia de contenido. No basta con subir productos.',
    pilar: 'Autoridad', formato: 'Post', status: 'revision', fecha: '2026-03-13', industria: 'E-commerce',
    cta: 'Descarga nuestra guía gratuita', hashtags: ['#ecommerce', '#marketing', '#ventas'],
    engagement: 5.8
  },
  {
    id: '7', hook: 'Cómo cobrar lo que realmente vales como consultor', body: 'Dejar de cobrar por hora y empezar a cobrar por valor es el cambio más importante que puedes hacer.',
    pilar: 'Autoridad', formato: 'Carrusel', status: 'publicado', fecha: '2026-03-05', industria: 'Consultoría',
    cta: 'Agenda una sesión estratégica', hashtags: ['#consultoría', '#negocios', '#pricing'],
    slides: [
      { titulo: 'El problema', texto: 'Cobrar por hora te limita y te agota' },
      { titulo: 'La solución', texto: 'Cobra por el resultado, no por tu tiempo' },
      { titulo: 'Cómo hacerlo', texto: 'Define paquetes con entregables claros y precio fijo' },
    ],
    engagement: 11.5
  },
  {
    id: '8', hook: 'El secreto del menú más vendido de Madrid', body: 'No es la receta, es cómo lo presentas. El food styling vende más que el sabor.',
    pilar: 'Entretenimiento', formato: 'Reel', status: 'publicado', fecha: '2026-03-06', industria: 'Restaurantes',
    cta: '¿Quieres fotos así para tu restaurante?', hashtags: ['#foodie', '#restaurante', '#madrid'],
    engagement: 18.2
  },
  {
    id: '9', hook: 'Antes y después: Blanqueamiento dental LED', body: 'En solo 45 minutos, tu sonrisa puede transformarse completamente.',
    pilar: 'Promocional', formato: 'Story', status: 'publicado', fecha: '2026-03-07', industria: 'Clínicas dentales',
    cta: 'Oferta especial esta semana', hashtags: ['#blanqueamiento', '#dentista', '#sonrisa'],
    engagement: 14.0
  },
  {
    id: '10', hook: 'Open house este sábado 🏠', body: 'Visita esta increíble propiedad en zona norte. 3 habitaciones, jardín privado, a 5 min del metro.',
    pilar: 'Promocional', formato: 'Story', status: 'borrador', fecha: '2026-03-15', industria: 'Inmobiliarias',
    cta: 'Reserva tu visita por DM', hashtags: ['#openhouse', '#inmobiliaria', '#casa'],
  },
  {
    id: '11', hook: 'Rutina de 15 minutos para abdomen de acero', body: 'No necesitas 2 horas en el gym. Con estos 5 ejercicios enfocados, verás resultados en 4 semanas.',
    pilar: 'Educativo', formato: 'Reel', status: 'revision', fecha: '2026-03-14', industria: 'Gimnasios',
    cta: 'Guarda este reel para tu próximo entreno', hashtags: ['#abs', '#fitness', '#rutina'],
  },
  {
    id: '12', hook: 'Tratamiento capilar que está rompiendo en 2026', body: 'La keratina brasileña sigue siendo la reina, pero con una nueva fórmula sin formol.',
    pilar: 'Educativo', formato: 'Post', status: 'aprobado', fecha: '2026-03-11', industria: 'Salones de belleza',
    cta: 'Pregunta por nuestro tratamiento premium', hashtags: ['#cabello', '#keratina', '#belleza'],
  },
  {
    id: '13', hook: '5 apps que todo emprendedor necesita en 2026', body: 'Notion, Canva, ChatGPT, Stripe y Cal.com. Las herramientas que cambiaron mi negocio.',
    pilar: 'Educativo', formato: 'Carrusel', status: 'publicado', fecha: '2026-03-08', industria: 'Consultoría',
    cta: 'Síguenos para más tips de productividad', hashtags: ['#emprendedor', '#apps', '#productividad'],
    slides: [
      { titulo: 'Notion', texto: 'Tu segundo cerebro para organizar todo' },
      { titulo: 'Canva', texto: 'Diseño profesional sin ser diseñador' },
      { titulo: 'ChatGPT', texto: 'Tu asistente de contenido 24/7' },
      { titulo: 'Stripe', texto: 'Cobra en todo el mundo sin complicaciones' },
      { titulo: 'Cal.com', texto: 'Agenda reuniones sin correos ida y vuelta' },
    ],
    engagement: 7.9
  },
  {
    id: '14', hook: '¿Hamburguesa o obra de arte? 🍔🎨', body: 'Nuestro chef transforma ingredientes simples en experiencias únicas.',
    pilar: 'Entretenimiento', formato: 'Reel', status: 'borrador', fecha: '2026-03-16', industria: 'Restaurantes',
    cta: 'Ven a probarla tú mismo', hashtags: ['#burger', '#foodporn', '#restaurante'],
  },
  {
    id: '15', hook: 'Lo que tu dentista no te dice sobre el hilo dental', body: 'El 80% de los problemas dentales se previenen con un correcto uso del hilo dental. Aquí te enseñamos cómo.',
    pilar: 'Educativo', formato: 'Carrusel', status: 'aprobado', fecha: '2026-03-13', industria: 'Clínicas dentales',
    cta: 'Comparte con alguien que necesita ver esto', hashtags: ['#salud', '#dental', '#tips'],
    slides: [
      { titulo: 'La verdad', texto: 'El cepillo solo limpia el 60% de tus dientes' },
      { titulo: 'Técnica correcta', texto: 'En forma de C, suavemente bajo la encía' },
      { titulo: 'Frecuencia', texto: 'Al menos una vez al día, preferiblemente de noche' },
    ],
  },
  {
    id: '16', hook: 'Esta casa se vendió en 48 horas ⚡', body: 'Con las fotos correctas, un precio justo y marketing digital, todo es posible.',
    pilar: 'Autoridad', formato: 'Post', status: 'publicado', fecha: '2026-03-09', industria: 'Inmobiliarias',
    cta: '¿Quieres vender rápido? Hablemos', hashtags: ['#inmobiliaria', '#vendido', '#éxito'],
    engagement: 10.1
  },
  {
    id: '17', hook: 'Error #1 en el gym: No calentar 🚫', body: 'Calentar 10 minutos puede prevenir lesiones que te sacarán del gym por meses.',
    pilar: 'Educativo', formato: 'Post', status: 'publicado', fecha: '2026-03-10', industria: 'Gimnasios',
    cta: 'Etiqueta a ese amigo que nunca calienta', hashtags: ['#gym', '#calentamiento', '#fitness'],
    engagement: 8.8
  },
  {
    id: '18', hook: 'Transformación de look: De oficina a fiesta en 20 min', body: 'Con estos 3 trucos de maquillaje y un cambio de peinado, pasarás del look de oficina al de noche.',
    pilar: 'Entretenimiento', formato: 'Reel', status: 'revision', fecha: '2026-03-14', industria: 'Salones de belleza',
    cta: 'Reserva tu sesión de styling', hashtags: ['#maquillaje', '#look', '#transformación'],
  },
  {
    id: '19', hook: 'Cómo automatizar tu e-commerce con IA', body: 'Chatbots, emails automáticos, y respuestas a FAQs. La IA puede manejar el 80% de tu atención al cliente.',
    pilar: 'Autoridad', formato: 'Carrusel', status: 'borrador', fecha: '2026-03-17', industria: 'E-commerce',
    cta: 'Agenda una demo gratuita', hashtags: ['#ecommerce', '#IA', '#automatización'],
    slides: [
      { titulo: 'Chatbots', texto: 'Responde al 80% de preguntas automáticamente' },
      { titulo: 'Email flows', texto: 'Carritos abandonados, bienvenida, post-compra' },
      { titulo: 'IA para recomendaciones', texto: 'Productos sugeridos basados en comportamiento' },
    ],
  },
  {
    id: '20', hook: 'Case study: +300% de engagement en 30 días', body: 'Así ayudamos a una clínica dental a triplicar su presencia en redes sociales.',
    pilar: 'Autoridad', formato: 'Carrusel', status: 'publicado', fecha: '2026-03-08', industria: 'Consultoría',
    cta: '¿Quieres resultados similares?', hashtags: ['#casestudy', '#marketing', '#resultados'],
    slides: [
      { titulo: 'El reto', texto: 'Solo 50 seguidores y 0 engagement' },
      { titulo: 'La estrategia', texto: 'Contenido educativo + reels + colaboraciones' },
      { titulo: 'El resultado', texto: '+300% engagement, +2000 seguidores en 30 días' },
    ],
    engagement: 13.4
  },
  {
    id: '21', hook: 'Promoción flash: 2x1 en postres 🍰', body: 'Solo este viernes. Trae a tu mejor amigo y disfruten juntos.',
    pilar: 'Promocional', formato: 'Story', status: 'aprobado', fecha: '2026-03-14', industria: 'Restaurantes',
    cta: 'Muestra esta story en caja', hashtags: ['#promo', '#postres', '#2x1'],
  },
  {
    id: '22', hook: 'Mito vs Realidad: Blanqueamiento daña el esmalte', body: 'FALSO. El blanqueamiento profesional es seguro y no daña el esmalte dental.',
    pilar: 'Educativo', formato: 'Post', status: 'borrador', fecha: '2026-03-18', industria: 'Clínicas dentales',
    cta: 'Pregúntale a tu dentista', hashtags: ['#mitos', '#dental', '#blanqueamiento'],
  },
  {
    id: '23', hook: 'Inversión inteligente: Departamentos en zona sur', body: 'La plusvalía en zona sur ha crecido 15% en el último año. Es momento de invertir.',
    pilar: 'Autoridad', formato: 'Post', status: 'error', fecha: '2026-03-10', industria: 'Inmobiliarias',
    cta: 'Solicita información sin compromiso', hashtags: ['#inversión', '#inmobiliaria', '#plusvalía'],
  },
  {
    id: '24', hook: 'Reto fitness: 30 días de sentadillas 🔥', body: 'Empieza con 20 y termina haciendo 100. ¿Te atreves?',
    pilar: 'Entretenimiento', formato: 'Reel', status: 'publicado', fecha: '2026-03-05', industria: 'Gimnasios',
    cta: 'Guarda y empieza hoy', hashtags: ['#reto', '#fitness', '#sentadillas'],
    engagement: 16.7
  },
  {
    id: '25', hook: 'Cómo elegir el tono de base perfecto', body: 'El truco está en probar en la línea de la mandíbula, no en la mano.',
    pilar: 'Educativo', formato: 'Reel', status: 'publicado', fecha: '2026-03-06', industria: 'Salones de belleza',
    cta: 'Ven a tu sesión de color matching', hashtags: ['#maquillaje', '#base', '#beauty'],
    engagement: 11.0
  },
]

// Analytics mock data
export const analyticsData = {
  engagementOverTime: Array.from({ length: 30 }, (_, i) => ({
    dia: `Mar ${i + 1}`,
    engagement: Math.round((6 + Math.random() * 12) * 10) / 10,
  })),
  savesVsShares: [
    { semana: 'Sem 1', guardados: 342, compartidos: 189 },
    { semana: 'Sem 2', guardados: 456, compartidos: 234 },
    { semana: 'Sem 3', guardados: 521, compartidos: 312 },
    { semana: 'Sem 4', guardados: 398, compartidos: 267 },
  ],
  growthSemanal: [
    { semana: 'Sem 1', seguidores: 4520 },
    { semana: 'Sem 2', seguidores: 4680 },
    { semana: 'Sem 3', seguidores: 4890 },
    { semana: 'Sem 4', seguidores: 5120 },
  ],
  topPosts: [
    { hook: 'El secreto del menú más vendido', engagement: 18.2 },
    { hook: 'Reto fitness: 30 días de sentadillas', engagement: 16.7 },
    { hook: 'Este ejercicio cambiará tu rutina', engagement: 15.3 },
    { hook: 'Antes y después: Blanqueamiento', engagement: 14.0 },
    { hook: 'Case study: +300% engagement', engagement: 13.4 },
  ],
  postsByPilar: [
    { name: 'Educativo', value: 9, fill: '#4F46E5' },
    { name: 'Promocional', value: 5, fill: '#10B981' },
    { name: 'Entretenimiento', value: 6, fill: '#F59E0B' },
    { name: 'Autoridad', value: 5, fill: '#EF4444' },
  ],
  kpis: {
    totalPosts: 25,
    avgEngagement: 11.2,
    totalSaves: 1717,
    totalShares: 1002,
    followerGrowth: '+13.3%',
  },
}

export const mockIdeas = [
  { hook: '¿Sabías que el 90% de tus clientes te buscan en Google antes de visitarte?', descripcion: 'Contenido educativo sobre la importancia del SEO local para negocios físicos.', pilar: 'Educativo' as Pilar, formato: 'Carrusel' as Formato },
  { hook: 'Así lucía nuestro local hace 1 año vs hoy 🔥', descripcion: 'Mostrar la transformación del negocio para generar conexión y autoridad.', pilar: 'Autoridad' as Pilar, formato: 'Reel' as Formato },
  { hook: '3 cosas que hicimos para duplicar nuestras reservas', descripcion: 'Tips prácticos y accionables para otros negocios del mismo sector.', pilar: 'Educativo' as Pilar, formato: 'Carrusel' as Formato },
  { hook: 'POV: Cuando el cliente dice "solo vengo a ver" 😂', descripcion: 'Humor relatable para generar engagement y compartidos.', pilar: 'Entretenimiento' as Pilar, formato: 'Reel' as Formato },
  { hook: 'Oferta exclusiva: Solo para los primeros 20 que comenten 🎯', descripcion: 'Promoción con urgencia y escasez para impulsar engagement.', pilar: 'Promocional' as Pilar, formato: 'Post' as Formato },
]

export const mockGeneratedCopy = {
  hook: '¿Sabías que el 90% de tus clientes te buscan en Google antes de visitarte?',
  slides: [
    { titulo: 'La realidad digital', texto: 'El 90% de los consumidores buscan en Google antes de visitar un negocio local. Si no apareces, no existes.' },
    { titulo: '¿Qué buscan?', texto: 'Horarios, ubicación, fotos, reseñas y precios. ¿Tu perfil de Google tiene todo esto actualizado?' },
    { titulo: 'El poder de las reseñas', texto: 'Un negocio con +50 reseñas positivas recibe 3x más visitas que uno sin reseñas.' },
    { titulo: 'Tips rápidos', texto: '1. Completa tu perfil de Google Business\n2. Pide reseñas a clientes satisfechos\n3. Responde TODAS las reseñas\n4. Sube fotos nuevas cada semana' },
    { titulo: 'Tu turno', texto: 'Empieza hoy mismo. 15 minutos dedicados a tu presencia digital pueden cambiar tu negocio.' },
  ],
  cta: '¿Necesitas ayuda con tu presencia digital? Escríbenos y te hacemos una auditoría gratuita 🚀',
  hashtags: ['#marketingdigital', '#negociolocal', '#google', '#seo', '#emprendedor'],
}