import elSupremoPreview from "@/assets/projects/el-supremo/preview.webp"
import elSupremo01 from "@/assets/projects/el-supremo/01.webp"
import elSupremo02 from "@/assets/projects/el-supremo/02.webp"
import facturadorPreview from "@/assets/projects/facturador/preview.webp"

export interface Project {
  id: string
  number: string
  title: string
  description: string
  descriptionEn?: string
  tech: string
  longDescription: string
  longDescriptionEn?: string
  features: string[]
  featuresEn?: string[]
  links: { label: string; href: string }[]
  images?: string[]
  /** Preview image shown at the top of the card (optional) */
  preview?: string
  role?: string
  roleEn?: string
  year?: string
  status?: string
  statusEn?: string
}

export const projects: Project[] = [
  {
    id: "facturador",
    number: "01",
    title: "Facturador",
    description: "App de escritorio para facturacion electronica integrada con ARCA (AFIP). Genera facturas A/B y tickets con PDF, busqueda de contribuyentes y gestion de comprobantes.",
    descriptionEn: "Desktop app for electronic invoicing integrated with ARCA (AFIP). Generates A/B invoices and tickets as PDF, taxpayer lookup and receipt management.",
    tech: "Electron / React / NestJS / SQLite",
    longDescription: "Aplicacion de escritorio para Windows que permite emitir facturas electronicas (A, B y tickets) integrada directamente con ARCA a traves de AfipSDK. Genera PDFs listos para imprimir en A4 o formato ticket 80mm, almacena todos los comprobantes emitidos localmente y permite consultar contribuyentes por CUIT o DNI en tiempo real.",
    longDescriptionEn: "Windows desktop application for issuing electronic invoices (A, B and tickets) directly integrated with ARCA via AfipSDK. Generates PDFs ready to print in A4 or 80mm ticket format, stores all issued receipts locally and allows querying taxpayers by CUIT or DNI in real time.",
    features: [
      "Emision de Facturas A/B y Tickets con autorizacion CAE de ARCA",
      "Generacion de PDF en formato A4 y ticket 80mm con codigo QR reglamentario",
      "Busqueda de contribuyentes por CUIT/DNI contra padrones de AFIP",
      "Historial de comprobantes emitidos con filtros por fecha, tipo y documento",
      "Calculo automatico de IVA con multiples alicuotas por item",
      "Gestion de certificados digitales para entorno de desarrollo y produccion"
    ],
    featuresEn: [
      "Issue A/B Invoices and Tickets with ARCA CAE authorization",
      "Generate PDF in A4 format and 80mm ticket format with regulatory QR code",
      "Search taxpayers by CUIT/DNI against AFIP databases",
      "History of issued receipts with filters by date, type and document",
      "Automatic VAT calculation with multiple tax rates per item",
      "Digital certificate management for development and production environments"
    ],
    links: [{ label: "Facturador", href: "https://facturacil.com.ar" }],
    preview: facturadorPreview,
    role: "Full Stack Developer",
    roleEn: "Full Stack Developer",
    year: "2025",
    status: "En producción",
    statusEn: "In production"
  },
  {
    id: "agenda",
    number: "02",
    title: "Agenda",
    description: "App de escritorio para gestion de turnos de salon de belleza. Agenda inteligente, gestion de clientes y tratamientos, con recordatorios automaticos por WhatsApp.",
    descriptionEn: "Desktop app for managing appointments in beauty salons. Smart agenda, client and treatment management, with automatic WhatsApp reminders.",
    tech: "Electron / React / NestJS / SQLite",
    longDescription: "Sistema de gestion integral para salones de belleza. Permite administrar turnos con recomendacion automatica de horarios segun disponibilidad y duracion de tratamientos, gestionar clientes con historial de pagos y deudas, y enviar recordatorios y confirmaciones de turnos automaticamente por WhatsApp.",
    longDescriptionEn: "Comprehensive management system for beauty salons. Allows managing appointments with automatic schedule recommendations based on availability and treatment duration, managing clients with payment history and debt tracking, and sending automatic appointment reminders and confirmations via WhatsApp.",
    features: [
      "Agenda de turnos con recomendacion automatica segun disponibilidad y duracion",
      "Gestion de clientes con historial de pagos y seguimiento de deudas",
      "Integracion con WhatsApp para recordatorios y confirmacion de turnos automatica",
      "Calendario visual con horarios configurables por temporada y dias especiales",
      "Catalogo de tratamientos con historial de precios",
      "Dashboard con estadisticas diarias de turnos, ingresos y confirmaciones pendientes"
    ],
    featuresEn: [
      "Appointment agenda with automatic recommendations based on availability and duration",
      "Client management with payment history and debt tracking",
      "WhatsApp integration for automatic appointment reminders and confirmations",
      "Visual calendar with configurable hours by season and special days",
      "Treatment catalog with price history",
      "Dashboard with daily stats for appointments, income and pending confirmations"
    ],
    links: [],
    role: "Full Stack Developer",
    roleEn: "Full Stack Developer",
    year: "2024",
    status: "En desarrollo",
    statusEn: "In development"
  },
  {
    id: "patitas",
    number: "03",
    title: "Patitas",
    description: "App movil para adopcion de mascotas y reporte de perdidos/encontrados. Con mapa interactivo, moderacion por IA y dinamica tipo red social.",
    descriptionEn: "Mobile app for pet adoption and lost/found reports. With interactive map, AI moderation and social media-like experience.",
    tech: "Expo / React Native / NestJS / Docker",
    longDescription: "Aplicacion movil tipo red social enfocada en adopcion de mascotas y reporte de animales perdidos o encontrados. Integra Google Maps para visualizar ubicaciones, utiliza inteligencia artificial para moderar publicaciones asegurando que solo se suban mascotas, y ofrece una experiencia similar a Instagram para interactuar con las publicaciones.",
    longDescriptionEn: "Social media-style mobile app focused on pet adoption and lost/found animal reports. Integrates Google Maps to visualize locations, uses AI to moderate posts ensuring only pet-related content is uploaded, and offers an Instagram-like experience for interacting with posts.",
    features: [
      "Feed tipo red social para publicaciones de adopcion y reportes",
      "Mapa interactivo con Google Maps para ubicar mascotas",
      "Moderacion automatica con IA para validar contenido de publicaciones",
      "Sistema de reportes de mascotas perdidas y encontradas",
      "Backend con NestJS containerizado con Docker",
      "Interfaz nativa con Expo y React Native"
    ],
    featuresEn: [
      "Social feed for adoption posts and reports",
      "Interactive map with Google Maps to locate pets",
      "Automatic AI moderation to validate post content",
      "Lost and found pet reporting system",
      "NestJS backend containerized with Docker",
      "Native interface with Expo and React Native"
    ],
    links: [],
    role: "Full Stack Developer",
    roleEn: "Full Stack Developer",
    year: "2024",
    status: "En desarrollo",
    statusEn: "In development"
  },
  {
    id: "gastos",
    number: "04",
    title: "Gastos",
    description: "Web app para gestion de gastos e ingresos con reportes mensuales y anuales. Integra WhatsApp e IA para anotar movimientos por mensaje de texto.",
    descriptionEn: "Web app for managing expenses and income with monthly and annual reports. Integrates WhatsApp and AI to record transactions via text messages.",
    tech: "Vite / React / Node.js / SQLite",
    longDescription: "Aplicacion web para el control de finanzas personales que permite registrar gastos e ingresos tanto desde la interfaz web como enviando mensajes por WhatsApp. Utiliza Google Gemini para interpretar lenguaje natural y extraer automaticamente monto, categoria y descripcion. Incluye dashboard con graficos y reportes detallados por mes y por anio.",
    longDescriptionEn: "Web app for personal finance control that allows recording expenses and income from the web interface or by sending messages via WhatsApp. Uses Google Gemini to interpret natural language and automatically extract amount, category and description. Includes dashboard with charts and detailed reports by month and year.",
    features: [
      "Registro de gastos e ingresos por WhatsApp con interpretacion por IA (Gemini)",
      "Dashboard con resumen financiero, graficos de tendencia y desglose por categoria",
      "Reportes mensuales y anuales con graficos interactivos",
      "Exportacion a CSV de gastos e ingresos",
      "Estado de conexion del bot en tiempo real via Server-Sent Events",
      "Soporte para multiples usuarios autorizados por numero de WhatsApp"
    ],
    featuresEn: [
      "Record expenses and income via WhatsApp with AI interpretation (Gemini)",
      "Dashboard with financial summary, trend charts and category breakdown",
      "Monthly and annual reports with interactive charts",
      "Export expenses and income to CSV",
      "Real-time bot connection status via Server-Sent Events",
      "Support for multiple authorized users by WhatsApp number"
    ],
    links: [],
    role: "Full Stack Developer",
    roleEn: "Full Stack Developer",
    year: "2024",
    status: "En desarrollo",
    statusEn: "In development"
  },
  {
    id: "el-supremo",
    number: "05",
    title: "El Supremo",
    description: "E-commerce para carniceria con catalogo por categoria, combos personalizables y checkout con turnos de entrega. Panel admin con gestion de productos, pedidos y precios en tiempo real.",
    descriptionEn: "E-commerce for a butcher shop with category catalog, customizable combos and checkout with delivery slots. Admin panel with product, order and price management in real time.",
    tech: "React / Vite / Tailwind / Supabase / NestJS",
    longDescription: "Tienda online para una carniceria con catalogo organizado por categorias (vacuno, cerdo, pollo, elaborados, chacinados y menudencias). Cada producto permite elegir corte, grosor y cantidad, y los combos se pueden personalizar componente por componente con imagen propia. El checkout maneja turnos de entrega con horario de corte, pago en efectivo o transferencia con descuento, y un panel de administracion protegido para gestionar productos, categorias, cortes, combos y pedidos con actualizacion en tiempo real.",
    longDescriptionEn: "Online store for a butcher shop with a catalog organized by categories (beef, pork, chicken, prepared meats, cold cuts and offal). Each product lets you choose cut, thickness and quantity, and combos can be customized component by component with a custom image. Checkout handles delivery slots with a daily cutoff time, cash or bank transfer payment with a discount, and a protected admin panel to manage products, categories, cuts, combos and orders with real-time updates.",
    features: [
      "Catalogo por categorias con buscador, productos destacados y seccion de ofertas",
      "Detalle de producto con seleccion de corte, grosor y cantidad",
      "Combos personalizables con editor visual y subida de imagenes",
      "Carrito persistente y checkout con turnos de entrega y cutoff horario",
      "Pago en efectivo o transferencia bancaria con 5% de descuento",
      "Panel admin con login, CRUD completo y gestion de pedidos en tiempo real"
    ],
    featuresEn: [
      "Category catalog with search, featured products and sale section",
      "Product detail with cut, thickness and quantity selection",
      "Customizable combos with visual editor and image upload",
      "Persistent cart and checkout with delivery slots and daily cutoff",
      "Cash or bank transfer payment with 5% discount",
      "Admin panel with login, full CRUD and real-time order management"
    ],
    links: [
      { label: "El Supremo", href: "https://el-supremo.vercel.app" },
      { label: "GitHub", href: "https://github.com/ramirosales52/el-supremo" }
    ],
    preview: elSupremoPreview,
    images: [elSupremo01, elSupremo02],
    role: "Full Stack Developer",
    roleEn: "Full Stack Developer",
    year: "2026",
    status: "En producción",
    statusEn: "In production"
  }
]

export function getProject(id: string): Project | undefined {
  return projects.find(p => p.id === id)
}
