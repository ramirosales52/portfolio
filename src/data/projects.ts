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
    id: "alpha",
    number: "01",
    title: "Proyecto Alpha",
    description: "Aplicación full-stack construida con React y Node.js",
    tech: "React / Node / PostgreSQL",
    longDescription: "Una aplicación full-stack completa con sincronización de datos en tiempo real, autenticación de usuarios y un dashboard responsive. Construida con tecnologías web modernas y buenas prácticas.",
    features: [
      "Actualización de datos en tiempo real con WebSocket",
      "Sistema de autenticación basado en JWT",
      "PostgreSQL con Prisma ORM",
      "Dashboard responsive con gráficos"
    ],
    links: [
      { label: "Ver Demo", href: "#" },
      { label: "Código Fuente", href: "#" }
    ]
  },
  {
    id: "beta",
    number: "02",
    title: "Proyecto Beta",
    description: "Herramienta de colaboración en tiempo real para equipos remotos",
    tech: "TypeScript / WebSocket / Redis",
    longDescription: "Una plataforma de colaboración que permite a equipos remotos trabajar juntos sin problemas. Incluye edición de documentos en tiempo real, integración con videoconferencias y gestión de tareas.",
    features: [
      "Edición colaborativa en tiempo real",
      "Indicadores de presencia y cursores",
      "Mensajería pub/sub con Redis",
      "Encriptación de extremo a extremo"
    ],
    links: [
      { label: "Ver Demo", href: "#" },
      { label: "Código Fuente", href: "#" }
    ]
  },
  {
    id: "gamma",
    number: "03",
    title: "Proyecto Gamma",
    description: "Herramienta CLI para productividad de desarrolladores",
    tech: "Rust / CLI / Open Source",
    longDescription: "Una herramienta de línea de comandos ultrarrápida diseñada para optimizar flujos de trabajo de desarrollo. Maneja scaffolding de proyectos, generación de código y testing automatizado con configuración mínima.",
    features: [
      "Tiempo de ejecución sub-milisegundo",
      "Sistema de plugins para extensibilidad",
      "Soporte multiplataforma",
      "Sintaxis de comandos intuitiva"
    ],
    links: [
      { label: "Código Fuente", href: "#" }
    ]
  }
]

export function getProject(id: string): Project | undefined {
  return projects.find(p => p.id === id)
}
