export type Metric = { label: string; value: string; trend?: "up" | "down" };

export type CaseStudy = {
  slug: string;
  num: string;
  category: string;
  year: string;
  client: string;
  title: string;
  subtitle: string;
  /** Tailwind gradient classes for the cover/hero visual */
  gradient: string;
  accent: string;
  duration: string;
  scope: string[];
  challenge: string;
  approach: string[];
  outcome: string;
  metrics: Metric[];
  /** Quote pulled from client (or stylized) */
  quote: { body: string; author: string; role: string };
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "lumen-athletica",
    num: "01",
    category: "Brand Identity · Motion",
    year: "2026",
    client: "Lumen Athletica",
    title: "De marca local a referente del wellness premium.",
    subtitle:
      "Rediseñamos el sistema visual completo de un estudio boutique y lanzamos una narrativa de marca que multiplicó su autoridad.",
    gradient: "from-[#2b0a1a] via-[#4a0f2a] to-[#ff2d8d]",
    accent: "#ff2d8d",
    duration: "10 semanas",
    scope: [
      "Brand strategy & messaging",
      "Sistema visual + tipografía",
      "Logo motion + bumpers",
      "Content system 90 días",
      "Lanzamiento orgánico",
    ],
    challenge:
      "Lumen tenía un producto excepcional pero un visual que la posicionaba como uno-más en un mercado saturado. Necesitaban autoridad para justificar pricing premium y atraer atletas profesionales.",
    approach: [
      "Inmersión etnográfica con clientes recurrentes y benchmark con 12 estudios globales tier-1.",
      "Definimos un territorio de marca centrado en 'rigor científico vestido de calma' — no más vibras de gimnasio motivacional.",
      "Diseñamos un sistema visual basado en luz, geometría editorial y una paleta restringida (negro absoluto + magenta acento + papel).",
      "Producimos 30 piezas de contenido modular + bumpers de logo motion + reel de manifiesto de marca.",
    ],
    outcome:
      "El relanzamiento generó +312% en menciones orgánicas en los primeros 60 días y desbloqueó conversaciones con dos cadenas hoteleras de lujo para licensing.",
    metrics: [
      { label: "Crecimiento orgánico", value: "+312%", trend: "up" },
      { label: "Membresías premium", value: "+47%", trend: "up" },
      { label: "Ticket promedio", value: "+28%", trend: "up" },
      { label: "Reach post-lanzamiento", value: "1.4M" },
    ],
    quote: {
      body: "Pasamos de competir por precio a competir por agenda. Momentum nos enseñó que la marca no se decora, se construye.",
      author: "Ana M. Reyes",
      role: "Founder, Lumen Athletica",
    },
  },
  {
    slug: "norte-capital",
    num: "02",
    category: "Digital Positioning · Content System",
    year: "2026",
    client: "Norte Capital",
    title: "Una fintech B2B que dejó de sonar como banco.",
    subtitle:
      "Reescribimos la voz, el posicionamiento y el ecosistema de contenido de Norte Capital para hablarle de tú a fundadores serie A.",
    gradient: "from-[#0d0d10] via-[#1f1027] to-[#7a1f5a]",
    accent: "#ff7ab8",
    duration: "14 semanas",
    scope: [
      "Messaging framework completo",
      "Voz y tono — guidelines de escritura",
      "Content pillars + 6-week launch calendar",
      "Founder-led content strategy",
      "LinkedIn & newsletter operating system",
    ],
    challenge:
      "Norte tenía producto sólido pero comunicación corporativa que se confundía con cualquier banco tradicional. Los founders objetivo (serie A) los descartaban en 5 segundos.",
    approach: [
      "Auditamos 240 piezas de contenido propio + 180 de competidores para mapear el océano de blandura que dominaba la categoría.",
      "Construimos una identidad verbal con 5 valores no negociables y un sistema de 12 'frames narrativos' para cualquier comunicación.",
      "Entrenamos al equipo de marketing en el sistema con 3 workshops + un playbook vivo.",
      "Lanzamos un founder-led content engine: 1 ensayo semanal del CEO + 3 micropiezas que lo amplifican.",
    ],
    outcome:
      "En el primer trimestre Norte se posicionó como 'la fintech que dice cosas que importan'. Conversaciones inbound de fondos de VC se duplicaron y el CEO se convirtió en voz consultada de medios.",
    metrics: [
      { label: "Inbound qualified leads", value: "+218%", trend: "up" },
      { label: "Newsletter open rate", value: "62%", trend: "up" },
      { label: "Audiencia LinkedIn CEO", value: "+18K", trend: "up" },
      { label: "Menciones en prensa tier-1", value: "9" },
    ],
    quote: {
      body: "Por primera vez sentimos que nuestra comunicación nos representa. Y los números acompañaron.",
      author: "Diego Saldívar",
      role: "CEO, Norte Capital",
    },
  },
  {
    slug: "sofia-collective",
    num: "03",
    category: "Brand Story · Social Ecosystem",
    year: "2025",
    client: "Sofía Collective",
    title: "El restaurante que se convirtió en comunidad.",
    subtitle:
      "Transformamos un concepto gastronómico boutique en una marca cultural con su propio ecosistema de contenido y comunidad digital activa.",
    gradient: "from-[#0f0a00] via-[#2a1500] to-[#c45000]",
    accent: "#ff7a20",
    duration: "12 semanas",
    scope: [
      "Narrative brand positioning",
      "Social media identity & guidelines",
      "Content ecosystem — 90 piezas",
      "Estrategia UGC + creator partnerships",
      "Community playbook para el equipo",
    ],
    challenge:
      "Sofía tenía sala llena los fines de semana pero era invisible digitalmente. Sin presencia social que justificara el ticket, perdían reservas frente a competidores con producto inferior pero mejor narrativa.",
    approach: [
      "Mapeamos la experiencia emocional del cliente: ¿qué siente, qué recuerda, qué comparte? Ahí encontramos el hilo narrativo.",
      "Diseñamos un sistema de contenido en 3 capas: Mundo Sofía (el concepto y los valores), Ritual (producto y proceso), Gente (equipo y comunidad).",
      "Produjimos un set semilla de 90 piezas para los primeros 3 meses + manual para que el equipo interno siguiera generando con coherencia.",
      "Activamos 4 micro-creators locales con brief editorial para amplificar sin perder voz.",
    ],
    outcome:
      "En 3 meses Sofía pasó de 2K a 31K seguidores orgánicos. Las reservas online crecieron un 78% y empezaron a tener lista de espera los martes y jueves — antes días muertos.",
    metrics: [
      { label: "Crecimiento de audiencia", value: "+1,450%", trend: "up" },
      { label: "Reservas online", value: "+78%", trend: "up" },
      { label: "UGC generado", value: "340 piezas" },
      { label: "Tasa de ocupación L-J", value: "+55%", trend: "up" },
    ],
    quote: {
      body: "Antes teníamos clientes. Ahora tenemos comunidad. Y la comunidad no necesita descuentos para volver.",
      author: "Sofía Amaya",
      role: "Founder & Chef, Sofía Collective",
    },
  },
  {
    slug: "vela-studios",
    num: "04",
    category: "Launch Campaign · Digital Presence",
    year: "2025",
    client: "Vela Studios",
    title: "Cero a referente en 60 días.",
    subtitle:
      "Lanzamos la identidad digital, la narrativa de lanzamiento y el sistema de adquisición de clientes de un estudio creativo desde cero.",
    gradient: "from-[#020510] via-[#0a0f2e] to-[#1a2aff]",
    accent: "#4d6aff",
    duration: "8 semanas",
    scope: [
      "Posicionamiento y messaging de lanzamiento",
      "Identidad verbal + copywriting web",
      "Campaña de lanzamiento — 3 fases",
      "Outreach system para primeros clientes",
      "Press kit + medios especializados",
    ],
    challenge:
      "Vela arrancaba sin portfolio, sin audiencia y en un mercado que premia el historial. Necesitaban una narrativa que convirtiera esa carencia en punto de vista diferencial.",
    approach: [
      "Reencuadramos el 'sin clientes todavía' en ventaja: 'sin vicios, sin inercias, con todo por demostrar'. El hambre como propuesta de valor.",
      "Diseñamos una campaña en 3 fases — Cuenta regresiva (misterio + anticipación), Día 0 (lanzamiento full), 30 días (prueba social acelerada).",
      "Construimos un outreach system para 80 prospectos cualificados con secuencia de 4 touchpoints personalizados.",
      "Aseguramos cobertura en 2 medios especializados de diseño antes del lanzamiento para crear efecto de credibilidad instantánea.",
    ],
    outcome:
      "El día de lanzamiento cerraron 3 proyectos en simultáneo. A los 60 días tenían lista de espera y habían rechazado 2 proyectos que no encajaban con su posicionamiento — algo impensable antes.",
    metrics: [
      { label: "Proyectos cerrados — semana 1", value: "3", trend: "up" },
      { label: "Inbound leads — 60 días", value: "47", trend: "up" },
      { label: "Cobertura en prensa especializada", value: "2 medios" },
      { label: "Tasa de cierre outreach", value: "34%", trend: "up" },
    ],
    quote: {
      body: "Momentum nos dio lo que nadie da a un estudio nuevo: credibilidad prestada el día uno. El resto fue nuestro.",
      author: "Carlos Vela",
      role: "Creative Director, Vela Studios",
    },
  },
];

export function getCase(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
