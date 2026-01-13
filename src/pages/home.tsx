import { Link } from "react-router-dom"
import { Container, GridCell, TuiGrid, TuiSection } from "@/components/tui-grid"
import { Layout } from "@/components/layout"
import { projects } from "@/data/projects"

export default function HomePage() {
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
              <p className="text-display">
                Desarrollador<span className="text-accent">.</span>
              </p>
              <p className="text-body text-muted-foreground mt-4 max-w-md">
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
              <p className="text-body text-muted-foreground max-w-2xl">
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
        <Container>
          <div className="tui-cell border-b border-border">
            <span className="text-label">trabajos destacados</span>
          </div>
          
          <TuiGrid cols={3} className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <GridCell 
                key={project.id}
                className="tui-cell project-card flex flex-col justify-between min-h-[200px] border-b lg:last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:[&:nth-last-child(-n+3)]:border-b-0" 
                borders={index < projects.length - 1 ? ["right"] : []}
              >
                <Link to={`/proyectos/${project.id}`} className="flex flex-col justify-between h-full">
                  <div>
                    <span className="text-label">{project.number}</span>
                    <h3 className="text-heading mt-2 project-title transition-colors">{project.title}</h3>
                    <p className="text-small text-muted-foreground mt-2">
                      {project.description}
                    </p>
                  </div>
                  <div className="text-small text-accent mt-4">
                    {project.tech}
                  </div>
                </Link>
              </GridCell>
            ))}
          </TuiGrid>
        </Container>
      </TuiSection>
    </Layout>
  )
}
