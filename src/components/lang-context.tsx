import { createContext, useContext, useState, useEffect, useCallback } from "react"

export type Language = "es" | "en"

interface LanguageContextValue {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  es: {
    // Nav
    "nav.about": "Sobre mí",
    "nav.experience": "Experiencia",
    "nav.projects": "Proyectos",
    "nav.contact": "Contacto",
    "nav.menu": "MENÚ",
    "nav.openMenu": "Abrir menú",
    "nav.closeMenu": "Cerrar menú",
    "nav.changeLight": "Cambiar a tema claro",
    "nav.changeDark": "Cambiar a tema oscuro",
    "nav.lightTheme": "Tema claro",
    "nav.darkTheme": "Tema oscuro",
    
    // Hero
    "hero.role": "Desarrollador Full-Stack",
    "hero.github": "Github",
    "hero.linkedin": "LinkedIn",
    "hero.cv": "Ver CV",
    "hero.cvAria": "Ver CV en PDF (abre en una pestaña nueva)",
    "hero.available": "Disponible para oportunidades",
    
    // About
    "about.title": "/// SOBRE MÍ",
    "about.p1": "Soy de Córdoba, Argentina. Estudiante de Ingeniería en Sistemas con experiencia en el desarrollo de aplicaciones web, móviles y de escritorio. Trabajo principalmente con React, React Native y NestJS, construyendo soluciones completas tanto en frontend como backend.",
    "about.p2": "Me enfoco en desarrollar aplicaciones funcionales, eficientes y adaptadas a las necesidades del usuario, abarcando desde la idea inicial hasta la implementación final. También cuento con una sólida base en soporte técnico, lo que me permite tener una visión integral de los sistemas y resolver problemas de manera práctica.",
    "about.p3": "Actualmente me encuentro en búsqueda de oportunidades para crecer profesionalmente en el área de desarrollo de software y el soporte IT, aportando valor en proyectos reales.",
    "about.techTitle": "Tecnologías principales",
    "about.location": "Ubicación:",
    "about.locationValue": "Córdoba, Argentina",
    "about.availability": "Disponibilidad:",
    "about.availabilityValue": "Abierto a oportunidades",
    
    // Experience
    "exp.title": "/// EXPERIENCIA",
    "exp.job1Title": "Desarrollador de páginas web autónomo",
    "exp.job1Period": "2021 – Actualidad",
    "exp.job1Location": "Córdoba, Argentina",
    "exp.job1Desc": "Desarrollo de aplicaciones web, móviles y de escritorio con React, React Native y NestJS. Experiencia en diseño e implementación de APIs, bases de datos y soluciones escalables. Trabajo en proyectos personalizados, desde la idea inicial y el relevamiento de necesidades hasta la implementación, el despliegue y el soporte posterior.",
    "exp.job1Item1": "• Desarrollo full-stack web, móvil y de escritorio (React, React Native, Electron y NestJS)",
    "exp.job1Item2": "• Diseño de APIs REST y modelado de bases de datos SQL y NoSQL",
    "exp.job1Item3": "• Integración con servicios externos: ARCA/AFIP, WhatsApp, Google Maps e IA",
    "exp.job1Item4": "• Automatización de procesos, reportes y paneles de control",
    "exp.job1Item5": "• Despliegue, mantenimiento y mejora continua de las aplicaciones",
    "exp.job2Title": "Técnico Informático Independiente",
    "exp.job2Period": "2018 – Actualidad",
    "exp.job2Location": "Córdoba, Argentina",
    "exp.job2Desc": "Servicio técnico para particulares, comercios y pequeñas empresas. Realizo diagnóstico y reparación de equipos, instalación y configuración de sistemas operativos, armado de PCs a medida y optimización de rendimiento, con atención personalizada y seguimiento de cada equipo.",
    "exp.job2Item1": "• Reparación y mantenimiento de PCs",
    "exp.job2Item2": "• Instalación y configuración de sistemas operativos",
    "exp.job2Item3": "• Armado de computadoras personalizadas",
    "exp.job2Item4": "• Limpieza y optimización de equipos",
    "exp.job2Item5": "• Instalación de software y drivers",
    "exp.job2Item6": "• Desbloqueo de notebooks (programa Conectar Igualdad)",
    
    // Stack
    "stack.title": "/// STACK",
    
    // Projects
    "projects.title": "/// PROYECTOS",
    "projects.viewProject": "Ver proyecto",
    "projects.openWeb": "Abrir en la web",
    "projects.viewProjectArrow": "Ver proyecto →",
    
    // Contact
    "contact.title": "trabajemos juntos :)",
    "contact.subtitle": "deja aca tu email",
    "contact.emailPlaceholder": "tu@email.com",
    "contact.send": "Enviar",
    "contact.invalidEmail": "Ingresá un email válido.",
    "contact.opening": "Abriendo tu cliente de correo. Si no pasa nada, escribime a",
    "contact.orWrite": "o escribime directo a",
    
    // Project page
    "project.back": "Volver a proyectos",
    "project.notFound": "Proyecto no encontrado",
    "project.backHome": "← Volver al inicio",
    "project.details": "/// DETALLES",
    "project.stack": "stack",
    "project.role": "rol",
    "project.year": "año",
    "project.status": "estado",
    "project.about": "/// ACERCA DEL PROYECTO",
    "project.features": "/// CARACTERÍSTICAS",
    "project.links": "/// LINKS",
    
    // Not found
    "notFound.title": "404",
    "notFound.message": "Página no encontrada",
    "notFound.back": "← Volver al inicio",
  },
  en: {
    // Nav
    "nav.about": "About me",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "nav.menu": "MENU",
    "nav.openMenu": "Open menu",
    "nav.closeMenu": "Close menu",
    "nav.changeLight": "Switch to light theme",
    "nav.changeDark": "Switch to dark theme",
    "nav.lightTheme": "Light theme",
    "nav.darkTheme": "Dark theme",
    
    // Hero
    "hero.role": "Full-Stack Developer",
    "hero.github": "Github",
    "hero.linkedin": "LinkedIn",
    "hero.cv": "View CV",
    "hero.cvAria": "View CV in PDF (opens in new tab)",
    "hero.available": "Available for opportunities",
    
    // About
    "about.title": "/// ABOUT ME",
    "about.p1": "I'm from Córdoba, Argentina. Systems Engineering student with experience in developing web, mobile and desktop applications. I mainly work with React, React Native and NestJS, building complete solutions for both frontend and backend.",
    "about.p2": "I focus on developing functional, efficient applications tailored to user needs, covering everything from initial idea to final implementation. I also have a solid background in technical support, which allows me to have a comprehensive view of systems and solve problems practically.",
    "about.p3": "I'm currently looking for opportunities to grow professionally in software development and IT support, adding value to real projects.",
    "about.techTitle": "Main technologies",
    "about.location": "Location:",
    "about.locationValue": "Córdoba, Argentina",
    "about.availability": "Availability:",
    "about.availabilityValue": "Open to opportunities",
    
    // Experience
    "exp.title": "/// EXPERIENCE",
    "exp.job1Title": "Freelance Web Developer",
    "exp.job1Period": "2021 – Present",
    "exp.job1Location": "Córdoba, Argentina",
    "exp.job1Desc": "Development of web, mobile and desktop applications with React, React Native and NestJS. Experience in designing and implementing APIs, databases and scalable solutions. I work on custom projects, from initial idea and requirements gathering to implementation, deployment and ongoing support.",
    "exp.job1Item1": "• Full-stack development for web, mobile and desktop (React, React Native, Electron and NestJS)",
    "exp.job1Item2": "• REST API design and SQL/NoSQL database modeling",
    "exp.job1Item3": "• Integration with external services: ARCA/AFIP, WhatsApp, Google Maps and AI",
    "exp.job1Item4": "• Process automation, reporting and control panels",
    "exp.job1Item5": "• Deployment, maintenance and continuous improvement of applications",
    "exp.job2Title": "Independent IT Technician",
    "exp.job2Period": "2018 – Present",
    "exp.job2Location": "Córdoba, Argentina",
    "exp.job2Desc": "Technical service for individuals, businesses and small companies. I perform diagnosis and repair of equipment, installation and configuration of operating systems, custom PC assembly and performance optimization, with personalized attention and follow-up for each equipment.",
    "exp.job2Item1": "• PC repair and maintenance",
    "exp.job2Item2": "• Operating system installation and configuration",
    "exp.job2Item3": "• Custom computer assembly",
    "exp.job2Item4": "• Equipment cleaning and optimization",
    "exp.job2Item5": "• Software and driver installation",
    "exp.job2Item6": "• Notebook unlocking (Conectar Igualdad program)",
    
    // Stack
    "stack.title": "/// STACK",
    
    // Projects
    "projects.title": "/// PROJECTS",
    "projects.viewProject": "View project",
    "projects.openWeb": "Open website",
    "projects.viewProjectArrow": "View project →",
    
    // Contact
    "contact.title": "let's work together :)",
    "contact.subtitle": "leave your email here",
    "contact.emailPlaceholder": "your@email.com",
    "contact.send": "Send",
    "contact.invalidEmail": "Enter a valid email.",
    "contact.opening": "Opening your mail client. If nothing happens, write me at",
    "contact.orWrite": "or write me directly at",
    
    // Project page
    "project.back": "Back to projects",
    "project.notFound": "Project not found",
    "project.backHome": "← Back to home",
    "project.details": "/// DETAILS",
    "project.stack": "stack",
    "project.role": "role",
    "project.year": "year",
    "project.status": "status",
    "project.about": "/// ABOUT THE PROJECT",
    "project.features": "/// FEATURES",
    "project.links": "/// LINKS",
    
    // Not found
    "notFound.title": "404",
    "notFound.message": "Page not found",
    "notFound.back": "← Back to home",
  }
} as const

const LanguageContext = createContext<LanguageContextValue | null>(null)

function getInitialLanguage(): Language {
  const saved = localStorage.getItem("language") as Language | null
  if (saved === "es" || saved === "en") {
    return saved
  }
  // Default to Spanish as requested
  return "es"
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage)

  useEffect(() => {
    localStorage.setItem("language", language)
    document.documentElement.lang = language
  }, [language])

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
  }, [])

  const t = useCallback((key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider")
  return ctx
}
