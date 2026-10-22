import { useEffect, useRef, useCallback, Suspense, lazy, useMemo } from "react"
import { Link } from "react-router-dom"
import { Layout } from "@/components/layout"
import { ScrambleText } from "@/components/scramble-text"
import { useNav } from "@/components/nav-context"
import { useTheme } from "@/components/theme-context"
import { Container, GridCell, TuiGrid, TuiSection } from "@/components/tui-grid"
import { projects } from "@/data/projects"
import profileImage from "@/assets/profile.png"
import dockerLogo from "@/assets/logos/docker.svg"
import expoLogo from "@/assets/logos/expo.svg"
import gitLogo from "@/assets/logos/git.svg"
import mongoLogo from "@/assets/logos/mongodb.svg"
import mysqlLogo from "@/assets/logos/mysql.svg"
import nestLogo from "@/assets/logos/nestjs.svg"
import nodejsLogo from "@/assets/logos/nodejs.svg"
import postgresLogo from "@/assets/logos/postgresql.svg"
import postmanLogo from "@/assets/logos/postman.svg"
import pythonLogo from "@/assets/logos/python.svg"
import reactLogo from "@/assets/logos/react.svg"
import tailwindLogo from "@/assets/logos/tailwindcss.svg"
import typescriptLogo from "@/assets/logos/typescript.svg"
import viteLogo from "@/assets/logos/vite.svg"
import shadcnLogo from "@/assets/logos/shadcn-ui.svg"
import shadcnLogoDark from "@/assets/logos/shadcn-ui_dark.svg"
import opencodeLogo from "@/assets/logos/opencode.svg"
import opencodeLogoDark from "@/assets/logos/opencode-dark.svg"

// Lazy load heavy components
const Dither = lazy(() => import("@/components/dither").then(module => ({ default: module.Dither })))
const ContactFooter = lazy(() => import("@/components/contact-footer").then(module => ({ default: module.ContactFooter })))

interface StackItem {
  name: string
  src: string
  srcDark?: string
}

const stackItems: StackItem[] = [
  { name: "React", src: reactLogo },
  { name: "TypeScript", src: typescriptLogo },
  { name: "Vite", src: viteLogo },
  { name: "Tailwind CSS", src: tailwindLogo },
  { name: "Node.js", src: nodejsLogo },
  { name: "NestJS", src: nestLogo },
  { name: "PostgreSQL", src: postgresLogo },
  { name: "MongoDB", src: mongoLogo },
  { name: "MySQL", src: mysqlLogo },
  { name: "Docker", src: dockerLogo },
  { name: "Git", src: gitLogo },
  { name: "Expo", src: expoLogo },
  { name: "Postman", src: postmanLogo },
  { name: "Python", src: pythonLogo },
  { name: "shadcn/ui", src: shadcnLogo, srcDark: shadcnLogoDark },
  { name: "OpenCode", src: opencodeLogo, srcDark: opencodeLogoDark },
]

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const stackRef = useRef<HTMLDivElement>(null)
  const proyectosRef = useRef<HTMLDivElement>(null)
  const contactoRef = useRef<HTMLDivElement>(null)
  const { setShowLogoInNav, setActiveSection } = useNav()
  const { theme } = useTheme()

  // Theme-aware dither colors
  const ditherColors = useMemo(() => {
    if (theme === "light") {
      return {
        waveColor: [0.2, 0.2, 0.2] as [number, number, number],
        baseColor: [1, 1, 1] as [number, number, number],
        gradientColor: [1, 1, 1] as [number, number, number],
      }
    }
    return {
      waveColor: [0.8, 0.8, 0.8] as [number, number, number],
      baseColor: [0, 0, 0] as [number, number, number],
      gradientColor: [0, 0, 0] as [number, number, number],
    }
  }, [theme])

  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.getAttribute("data-section")
        if (sectionId) {
          setActiveSection(sectionId)
          setShowLogoInNav(sectionId !== "hero")
        }
      }
    })
  }, [setActiveSection, setShowLogoInNav])

  // Observer para detectar sección activa y mostrar logo
  useEffect(() => {
    const sections = [
      { ref: heroRef, id: "hero" },
      { ref: stackRef, id: "stack" },
      { ref: proyectosRef, id: "proyectos" },
      { ref: contactoRef, id: "contacto" }
    ]

    const observer = new IntersectionObserver(
      observerCallback,
      {
        threshold: 0.5,
        rootMargin: "-80px 0px 0px 0px"
      }
    )

    sections.forEach(({ ref }) => {
      if (ref.current) observer.observe(ref.current)
    })

    return () => observer.disconnect()
  }, [observerCallback])

  return (
    <Layout>
      {/* Hero Section */}
      <TuiSection ref={heroRef} data-section="hero" className="h-dvh border-t-0 relative">
        <Container corners={["bl", "br"]} className="h-full relative pt-[var(--navbar-height)]">
          <div className="tui-cell h-full flex flex-col justify-center relative">

            <div className="absolute inset-x-0 top-[20%] bottom-[15%] -z-10 border-t border-b border-border">
              <Suspense fallback={<div className="w-full h-full bg-muted/10" />}>
                <Dither
                  waveColor={ditherColors.waveColor}
                  baseColor={ditherColors.baseColor}
                  gradientColor={ditherColors.gradientColor}
                  waveSpeed={0.03}
                  gradientStrength={0.7}
                  enableMouseInteraction={true}
                  className="w-full h-full"
                />
              </Suspense>
            </div>
            <img
              src={profileImage}
              alt="Ramiro"
              className="w-28 h-28 sm:w-36 sm:h-36 object-cover rounded-none border border-border -translate-y-22 relative z-10"
            />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold -translate-y-14 relative z-10">
              RAMIRO
            </h1>

            {/* Description */}
            <p className="text-muted-foreground text-sm sm:text-base max-w-md leading-relaxed -translate-y-14 relative z-10">
              web/mobile developer.
            </p>

            {/* Separator */}
            <div className="text-lg tracking-wider relative z-10 -translate-y-10">
              //////////////////
            </div>


            <div className="flex gap-6 mt-5 text-muted-foreground relative z-10 -translate-y-10">
              <ScrambleText
                as="a"
                href="https://github.com/ramiro"
                text="Github"
                className="nav-link text-sm"
              />
              <ScrambleText
                as="a"
                href="https://linkedin.com/in/ramiro"
                text="LinkedIn"
                className="nav-link text-sm"
              />
              <ScrambleText
                as="a"
                href="#"
                text="Ver CV"
                className="nav-link text-sm"
              />
            </div>
          </div>
        </Container>
      </TuiSection>

      {/* Divider */}
      <div className="tui-divider" />

      {/* Stack Section */}
      <TuiSection ref={stackRef} data-section="stack" id="stack">
        <Container>
          <div className="tui-cell border-b border-border">
            <span className="text-label">STACK</span>
          </div>

          <TuiGrid cols={4}>
            {stackItems.map((item, index) => {
              const colIndex = index % 4
              const isTopRow = index < 4
              const hasRightBorder = colIndex !== 3
              const logoSrc = theme === "dark" && item.srcDark ? item.srcDark : item.src

              return (
                <GridCell
                  key={item.name}
                  borders={[
                    ...(hasRightBorder ? ["right" as const] : []),
                    ...(!isTopRow ? ["top" as const] : []),
                  ]}
                  className="flex flex-col items-center justify-center gap-2 min-h-24 sm:min-h-28 px-2"
                >
                  <img
                    src={logoSrc}
                    alt={item.name}
                    className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
                    loading="lazy"
                  />
                  <span className="text-small text-muted-foreground text-center leading-tight">
                    {item.name}
                  </span>
                </GridCell>
              )
            })}
          </TuiGrid>
        </Container>
      </TuiSection>

      {/* Divider */}
      <div className="tui-divider" />

      {/* Proyectos Section */}
      <TuiSection ref={proyectosRef} data-section="proyectos" id="proyectos">
        <Container>
          {/* Section header */}
          <div className="tui-cell border-b border-border">
            <span className="text-label">TRABAJOS</span>
          </div>

          {/* Project cards - 2 column grid */}
          <TuiGrid className="grid-cols-1 md:grid-cols-2">
            {projects.map((project) => {
              return (
                <GridCell
                  key={project.id}
                  className="group/card flex flex-col border transition-colors duration-150 hover:[border-color:var(--foreground)]"
                >
                  <Link
                    to={`/proyectos/${project.id}`}
                    className="block"
                  >
                    {/* Preview image */}
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-muted/20">
                      {project.preview ? (
                        <img
                          src={project.preview}
                          alt={`Preview de ${project.title}`}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-300 group-hover/card:scale-[1.03]"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center gap-2 text-muted-foreground select-none">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                            <rect x="2" y="4" width="20" height="16" rx="2" />
                            <circle cx="9" cy="10" r="2" />
                            <path d="M22 14l-4-4-6 6-4-4-4 4" />
                          </svg>
                          <span className="text-small">preview</span>
                        </div>
                      )}

                      {/* Hover overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 transition-opacity duration-150 group-hover/card:opacity-100">
                        <span className="inline-flex items-center gap-2 border border-border bg-background px-3 py-1.5 text-small text-accent">
                          Ver proyecto
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M7 17L17 7" />
                            <path d="M7 7h10v10" />
                          </svg>
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="tui-cell">
                      <div className="flex items-baseline justify-between gap-4 mb-3">
                        <span className="text-label tabular-nums">
                          {project.number}
                        </span>
                        <span className="text-label truncate hidden sm:block">
                          {project.tech}
                        </span>
                      </div>
                      <h3 className="text-heading text-balance group-hover/card:text-accent transition-colors duration-150">
                        {project.title}
                      </h3>
                      <p className="text-small text-muted-foreground text-pretty mt-2 line-clamp-3">
                        {project.description}
                      </p>
                    </div>
                  </Link>

                  {/* Actions */}
                  <div
                    className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2"
                    style={{ padding: `0 var(--cell-padding) var(--cell-padding)` }}
                  >
                    <Link
                      to={`/proyectos/${project.id}`}
                      aria-hidden="true"
                      tabIndex={-1}
                      className="text-small text-accent group-hover/card:translate-x-1 transition-transform duration-150"
                    >
                      Ver proyecto →
                    </Link>
                    {project.links.length > 0 && (
                      <a
                        href={project.links[0].href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-small text-muted-foreground link-hover"
                      >
                        Abrir en la web ↗
                      </a>
                    )}
                  </div>
                </GridCell>
              )
            })}
          </TuiGrid>
        </Container>
      </TuiSection>

      {/* Divider */}
      <div className="tui-divider" />

      {/* Contacto Section */}
      <TuiSection ref={contactoRef} data-section="contacto" id="contacto" className="h-[calc(100dvh-var(--navbar-height))]">
        <ContactFooter />
      </TuiSection>
    </Layout>
  )
}
