import { useEffect, useRef, useCallback, Suspense, lazy } from "react"
import { Link } from "react-router-dom"
import { Layout } from "@/components/layout"
import { ScrambleText } from "@/components/scramble-text"
import { useNav } from "@/components/nav-context"
import { Container, TuiSection } from "@/components/tui-grid"
import { projects } from "@/data/projects"

// Lazy load heavy components
const Dither = lazy(() => import("@/components/dither").then(module => ({ default: module.Dither })))
const ContactFooter = lazy(() => import("@/components/contact-footer").then(module => ({ default: module.ContactFooter })))

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const proyectosRef = useRef<HTMLDivElement>(null)
  const contactoRef = useRef<HTMLDivElement>(null)
  const { setShowLogoInNav, setActiveSection } = useNav()

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
            {/* Decorative vertical line */}
            <div className="absolute left-8 top-1/4 bottom-1/4 w-px bg-border/30 hidden lg:block"></div>

            <div className="absolute inset-x-0 top-[20%] bottom-[15%] -z-10 border-t border-b border-border">
              <Suspense fallback={<div className="w-full h-full bg-muted/10" />}>
                <Dither
                  waveColor={[0.8, 0.8, 0.8]}
                  waveSpeed={0.03}
                  gradientStrength={0.7}
                  enableMouseInteraction={false}
                  className="w-full h-full"
                />
              </Suspense>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold relative z-10">
              RAMIRO
            </h1>

            {/* Description */}
            <p className="text-muted-foreground text-sm sm:text-base max-w-md leading-relaxed mt-4 relative z-10">
              web/mobile developer.
            </p>

            {/* Separator */}
            <div className="text-lg tracking-wider relative z-10 mt-4">
              //////////////////
            </div>


            <div className="flex gap-6 mt-8 text-muted-foreground relative z-10">
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

      {/* Proyectos Section */}
      <TuiSection ref={proyectosRef} data-section="proyectos" id="proyectos" className="min-h-dvh">
        <Container>
          {/* Section header */}
          <div className="tui-cell border-b border-border pb-8 mb-12">
            <span className="text-label">TRABAJOS</span>
            <h2 className="text-2xl sm:text-3xl mt-2">Proyectos Destacados</h2>
            <p className="text-muted-foreground mt-3 max-w-lg">
              Una selección de proyectos que demuestran mis habilidades en desarrollo web moderno.
            </p>
          </div>

          <div>
            {projects.map((project, index) => {
              const isEven = index % 2 === 0
              const isFirst = index === 0
              return (
                <Link
                  key={project.id}
                  to={`/proyectos/${project.id}`}
                  className={`block pb-16 border border-transparent hover:border-accent transition-colors ${index < projects.length - 1 ? 'border-b-border' : ''}`}
                >
                  <div
                    className={`flex ${isEven ? 'flex-row' : 'flex-row-reverse'} items-center gap-8`}
                  >
                    {/* Content */}
                    <div className="flex-1 tui-cell">
                      <div className="project-card">
                        <div>
                          <span className="text-label">{project.number}</span>
                          <h3 className="text-2xl mt-2">{project.title}</h3>
                          <p className="text-muted-foreground mt-4 leading-relaxed">
                            {project.description}
                          </p>
                          <div className="text-accent mt-4">
                            {project.tech}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Visual placeholder - could be image/mockup in future */}
                    <div className={`flex-1 h-64 bg-muted/20 border border-border rounded flex items-center justify-center relative overflow-hidden ${isFirst ? '' : 'pt-0'}`}>
                      <span className="text-muted-foreground text-sm z-10 relative">Mockup</span>
                      {/* Decorative pattern */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="w-full h-full bg-gradient-to-br from-accent/20 via-transparent to-accent/10"></div>
                        <div className="absolute inset-2 border border-accent/20 rounded"></div>
                        <div className="absolute top-4 left-4 w-8 h-8 border border-accent/30 rounded-full"></div>
                        <div className="absolute bottom-4 right-4 w-6 h-6 border border-accent/20 rounded"></div>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </Container>
      </TuiSection>

      {/* Divider */}
      <div className="tui-divider" />

      {/* Contacto Section */}
      <TuiSection ref={contactoRef} data-section="contacto" id="contacto" className="h-dvh">
        <ContactFooter />
      </TuiSection>
    </Layout>
  )
}
