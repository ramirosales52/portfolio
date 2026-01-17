import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { Layout } from "@/components/layout"
import { ScrambleText } from "@/components/scramble-text"
import { useNav } from "@/components/nav-context"
import { Container, TuiSection, TuiGrid, GridCell } from "@/components/tui-grid"
import { projects } from "@/data/projects"
import { ContactFooter } from "@/components/contact-footer"

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const proyectosRef = useRef<HTMLDivElement>(null)
  const contactoRef = useRef<HTMLDivElement>(null)
  const { setShowLogoInNav, setActiveSection } = useNav()

  // Observer para detectar sección activa y mostrar logo
  useEffect(() => {
    const sections = [
      { ref: heroRef, id: "hero" },
      { ref: proyectosRef, id: "proyectos" },
      { ref: contactoRef, id: "contacto" }
    ]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute("data-section")
            if (sectionId) {
              setActiveSection(sectionId)
              setShowLogoInNav(sectionId !== "hero")
            }
          }
        })
      },
      { 
        threshold: 0.5,
        rootMargin: "-80px 0px 0px 0px"
      }
    )

    sections.forEach(({ ref }) => {
      if (ref.current) observer.observe(ref.current)
    })

    return () => observer.disconnect()
  }, [setShowLogoInNav, setActiveSection])

  return (
    <Layout>
      {/* Hero Section */}
      <TuiSection ref={heroRef} data-section="hero" className="h-dvh border-t-0">
        <Container corners={["bl", "br"]} className="h-full">
          <div className="tui-cell h-full flex flex-col justify-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold">
              RAMIRO
            </h1>
            
            <div className="flex gap-6 mt-8 text-muted-foreground">
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
          <TuiGrid cols={3} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-h-dvh">
            {projects.map((project, index) => {
              const colCount = 3
              const isLastInRow = (index + 1) % colCount === 0
              const totalRows = Math.ceil(projects.length / colCount)
              const currentRow = Math.floor(index / colCount)
              const isLastRow = currentRow === totalRows - 1
              
              const borders: ("right" | "bottom")[] = []
              if (!isLastInRow) borders.push("right")
              if (!isLastRow) borders.push("bottom")
              
              return (
                <GridCell
                  key={project.id}
                  borders={borders}
                  corners={[]}
                  className="project-card-wrapper"
                >
                  <Link
                    to={`/proyectos/${project.id}`}
                    className="project-card tui-cell flex flex-col justify-between min-h-[250px] h-full"
                  >
                    <div>
                      <span className="text-label">{project.number}</span>
                      <h3 className="text-xl mt-2">{project.title}</h3>
                      <p className="text-sm text-muted-foreground mt-3">
                        {project.description}
                      </p>
                    </div>
                    <div className="text-sm text-accent mt-4">
                      {project.tech}
                    </div>
                  </Link>
                </GridCell>
              )
            })}
          </TuiGrid>
        </Container>
      </TuiSection>

      {/* Divider */}
      <div className="tui-divider" />

      {/* Contacto Section */}
      <TuiSection ref={contactoRef} data-section="contacto" id="contacto" className="min-h-dvh">
        <ContactFooter />
      </TuiSection>
    </Layout>
  )
}
