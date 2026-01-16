import { useState, useRef } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { Container, GridCell, TuiGrid, TuiSection } from "@/components/tui-grid"
import { Layout } from "@/components/layout"
import { projects } from "@/data/projects"

const INITIAL_PROJECTS = 3

export default function HomePage() {
  const [showAll, setShowAll] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  
  const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_PROJECTS)

  const handleToggle = () => {
    if (!showAll) {
      setShowAll(true)
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 50)
    } else {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth' })
      setShowAll(false)
    }
  }

  return (
    <Layout>
      {/* Hero */}
      <TuiSection>
        <Container>
          <TuiGrid cols={2} className="grid-cols-1 md:grid-cols-2">
            <GridCell 
              className="tui-cell" 
              borders={["right"]}
            >
              <p className="text-display text-balance">
                Desarrollador<span className="text-accent">.</span>
              </p>
              <p className="text-body text-muted-foreground text-pretty mt-4 max-w-md">
                Creando experiencias digitales con código limpio y diseño cuidado.
              </p>
            </GridCell>
            <GridCell className="tui-cell">
              <div className="text-small text-muted-foreground space-y-2">
                <p><span className="text-accent">$</span> whoami</p>
                <p className="text-foreground">Desarrollador full-stack</p>
                <p><span className="text-accent">$</span> ubicacion</p>
                <p className="text-foreground">Argentina</p>
                <p><span className="text-accent">$</span> estado</p>
                <p className="text-foreground">Disponible para trabajar<span className="cursor-blink"></span></p>
              </div>
            </GridCell>
          </TuiGrid>
        </Container>
      </TuiSection>

      {/* Divider */}
      <TuiSection>
        <Container corners={[]}>
          <div className="tui-divider" />
        </Container>
      </TuiSection>

      {/* Sobre mí */}
      <TuiSection id="sobre-mi">
        <Container>
          <TuiGrid cols={2} className="grid-cols-1 md:grid-cols-[1fr_2fr]">
            <GridCell 
              className="tui-cell" 
              borders={["right"]}
            >
              <span className="text-label">sobre mí</span>
            </GridCell>
            <GridCell className="tui-cell">
              <p className="text-body text-muted-foreground text-pretty max-w-2xl">
                Soy un desarrollador apasionado por crear soluciones elegantes a problemas complejos. 
                Con experiencia en desarrollo full-stack, me enfoco en construir aplicaciones 
                performantes, accesibles y fáciles de usar.
              </p>
              <div className="mt-6 flex gap-8 text-small">
                <div>
                  <span className="text-label block">experiencia</span>
                  <span className="text-foreground">+5 años</span>
                </div>
                <div>
                  <span className="text-label block">enfoque</span>
                  <span className="text-foreground">Web & Sistemas</span>
                </div>
              </div>
            </GridCell>
          </TuiGrid>
        </Container>
      </TuiSection>

      {/* Proyectos */}
      <TuiSection id="trabajo">
        <div ref={sectionRef}>
          <Container className="flex flex-col">
            {/* Header con título y botón cerrar cuando expandido */}
            <div className="tui-cell border-b border-border flex items-center justify-between shrink-0">
              <span className="text-label">
                {showAll ? "proyectos" : "trabajos destacados"}
              </span>
              
              <AnimatePresence>
                {showAll && (
                  <motion.button
                    initial={prefersReducedMotion ? false : { opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    onClick={handleToggle}
                    className="flex items-center gap-2 text-small text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span className="text-accent">-</span>
                    <span>Cerrar</span>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
            
            {/* Grid de proyectos */}
            <div>
              <TuiGrid cols={3} className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {visibleProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ 
                        duration: 0.15, 
                        delay: index >= INITIAL_PROJECTS && showAll ? (index - INITIAL_PROJECTS) * 0.03 : 0,
                        ease: "easeOut"
                      }}
                    >
                      <GridCell 
                        className="tui-cell project-card flex flex-col justify-between min-h-[200px] border-b" 
                        borders={(index + 1) % 3 !== 0 ? ["right"] : []}
                      >
                        <Link to={`/proyectos/${project.id}`} className="flex flex-col justify-between h-full">
                          <div>
                            <span className="text-label">{project.number}</span>
                            <h3 className="text-heading text-balance mt-2 project-title transition-colors">{project.title}</h3>
                            <p className="text-small text-muted-foreground text-pretty mt-2">
                              {project.description}
                            </p>
                          </div>
                          <div className="text-small text-accent mt-4">
                            {project.tech}
                          </div>
                        </Link>
                      </GridCell>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </TuiGrid>
            </div>

            {/* Ver todos / Ver menos button */}
            <div className="border-t border-border shrink-0">
              <button
                onClick={handleToggle}
                className="w-full tui-cell flex items-center justify-center gap-2 text-small text-muted-foreground hover:text-foreground transition-colors"
              >
                <motion.span
                  animate={{ rotate: showAll ? 45 : 0 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="text-accent inline-block"
                >
                  +
                </motion.span>
                <span>{showAll ? "Ver menos" : `Ver todos (${projects.length})`}</span>
              </button>
            </div>
          </Container>
        </div>
      </TuiSection>
    </Layout>
  )
}
