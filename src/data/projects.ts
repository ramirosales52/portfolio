export interface Project {
  id: string
  number: string
  title: string
  description: string
  tech: string
  longDescription: string
  features: string[]
  links: { label: string; href: string }[]
}

export const projects: Project[] = [
  {
    id: "facturacil",
    number: "01",
    title: "Facturacil",
    description: "App de escritorio para facturacion electronica integrada con ARCA (AFIP). Genera facturas A/B y tickets con PDF, busqueda de contribuyentes y gestion de comprobantes.",
    tech: "Electron / React / NestJS / SQLite",
    longDescription: "Aplicacion de escritorio para Windows que permite emitir facturas electronicas (A, B y tickets) integrada directamente con ARCA a traves de AfipSDK. Genera PDFs listos para imprimir en A4 o formato ticket 80mm, almacena todos los comprobantes emitidos localmente y permite consultar contribuyentes por CUIT o DNI en tiempo real.",
    features: [
      "Emision de Facturas A/B y Tickets con autorizacion CAE de ARCA",
      "Generacion de PDF en formato A4 y ticket 80mm con codigo QR reglamentario",
      "Busqueda de contribuyentes por CUIT/DNI contra padrones de AFIP",
      "Historial de comprobantes emitidos con filtros por fecha, tipo y documento",
      "Calculo automatico de IVA con multiples alicuotas por item",
      "Gestion de certificados digitales para entorno de desarrollo y produccion"
    ],
    links: [{ label: "Facturacil", href: "https://facturacil.com.ar" }]
  },
  {
    id: "salonix",
    number: "02",
    title: "Salonix",
    description: "App de escritorio para gestion de turnos de salon de belleza. Agenda inteligente, gestion de clientes y tratamientos, con recordatorios automaticos por WhatsApp.",
    tech: "Electron / React / NestJS / SQLite",
    longDescription: "Sistema de gestion integral para salones de belleza. Permite administrar turnos con recomendacion automatica de horarios segun disponibilidad y duracion de tratamientos, gestionar clientes con historial de pagos y deudas, y enviar recordatorios y confirmaciones de turnos automaticamente por WhatsApp.",
    features: [
      "Agenda de turnos con recomendacion automatica segun disponibilidad y duracion",
      "Gestion de clientes con historial de pagos y seguimiento de deudas",
      "Integracion con WhatsApp para recordatorios y confirmacion de turnos automatica",
      "Calendario visual con horarios configurables por temporada y dias especiales",
      "Catalogo de tratamientos con historial de precios",
      "Dashboard con estadisticas diarias de turnos, ingresos y confirmaciones pendientes"
    ],
    links: []
  },
  {
    id: "patitas",
    number: "03",
    title: "Patitas",
    description: "App movil para adopcion de mascotas y reporte de perdidos/encontrados. Con mapa interactivo, moderacion por IA y dinamica tipo red social.",
    tech: "Expo / React Native / NestJS / Docker",
    longDescription: "Aplicacion movil tipo red social enfocada en adopcion de mascotas y reporte de animales perdidos o encontrados. Integra Google Maps para visualizar ubicaciones, utiliza inteligencia artificial para moderar publicaciones asegurando que solo se suban mascotas, y ofrece una experiencia similar a Instagram para interactuar con las publicaciones.",
    features: [
      "Feed tipo red social para publicaciones de adopcion y reportes",
      "Mapa interactivo con Google Maps para ubicar mascotas",
      "Moderacion automatica con IA para validar contenido de publicaciones",
      "Sistema de reportes de mascotas perdidas y encontradas",
      "Backend con NestJS containerizado con Docker",
      "Interfaz nativa con Expo y React Native"
    ],
    links: []
  },
  {
    id: "gastos",
    number: "04",
    title: "Gastos",
    description: "Web app para gestion de gastos e ingresos con reportes mensuales y anuales. Integra WhatsApp e IA para anotar movimientos por mensaje de texto.",
    tech: "Vite / React / Node.js / SQLite",
    longDescription: "Aplicacion web para el control de finanzas personales que permite registrar gastos e ingresos tanto desde la interfaz web como enviando mensajes por WhatsApp. Utiliza Google Gemini para interpretar lenguaje natural y extraer automaticamente monto, categoria y descripcion. Incluye dashboard con graficos y reportes detallados por mes y por anio.",
    features: [
      "Registro de gastos e ingresos por WhatsApp con interpretacion por IA (Gemini)",
      "Dashboard con resumen financiero, graficos de tendencia y desglose por categoria",
      "Reportes mensuales y anuales con graficos interactivos",
      "Exportacion a CSV de gastos e ingresos",
      "Estado de conexion del bot en tiempo real via Server-Sent Events",
      "Soporte para multiples usuarios autorizados por numero de WhatsApp"
    ],
    links: []
  }
]

export function getProject(id: string): Project | undefined {
  return projects.find(p => p.id === id)
}
