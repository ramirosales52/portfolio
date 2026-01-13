import { useParams, Link } from "react-router-dom"
import { getProject, projects } from "@/data/projects"
import { Container, GridCell, TuiGrid, TuiSection } from "@/components/tui-grid"
import { Layout } from "@/components/layout"

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>()
  const project = id ? getProject(id) : undefined

  if (!project) {
    return (
      <Layout>
        <TuiSection>
          <Container className="tui-cell">
            <p className="text-muted-foreground">Proyecto no encontrado</p>
            <Link to="/" className="text-accent link-hover mt-4 inline-block">
              ← Volver al inicio
            </Link>
          </Container>
        </TuiSection>
      </Layout>
    )
  }

  // Encontrar proyectos anterior/siguiente
  const currentIndex = projects.findIndex(p => p.id === id)
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  return (
    <Layout>
      {/* Link para volver */}
      <TuiSection>
        <Container className="tui-cell">
          <Link to="/#trabajo" className="text-small text-muted-foreground link-hover">
            ← Volver a trabajos
          </Link>
        </Container>
      </TuiSection>

      {/* Header del proyecto */}
      <TuiSection>
        <Container>
          <TuiGrid cols={2} className="grid-cols-1 md:grid-cols-[1fr_2fr]">
            <GridCell 
              className="tui-cell" 
              borders={["right"]}
            >
              <span className="text-label">{project.number}</span>
              <h1 className="text-display mt-2">{project.title}</h1>
              <p className="text-small text-accent mt-4">{project.tech}</p>
            </GridCell>
            <GridCell className="tui-cell">
              <p className="text-body text-muted-foreground">
                {project.longDescription}
              </p>
              
              {/* Links */}
              {project.links.length > 0 && (
                <div className="flex gap-4 mt-6">
                  {project.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tui-button"
                    >
                      <span className="text-accent">→</span>
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </GridCell>
          </TuiGrid>
        </Container>
      </TuiSection>

      {/* Características */}
      <TuiSection>
        <Container>
          <div className="tui-cell border-b border-border">
            <span className="text-label">características</span>
          </div>
          <TuiGrid cols={2} className="grid-cols-1 md:grid-cols-2">
            {project.features.map((feature, i) => (
              <GridCell 
                key={i}
                className="tui-cell"
                borders={i % 2 === 0 ? ["right", "bottom"] : ["bottom"]}
              >
                <div className="flex items-start gap-3">
                  <span className="text-accent">+</span>
                  <p className="text-body text-muted-foreground">{feature}</p>
                </div>
              </GridCell>
            ))}
          </TuiGrid>
        </Container>
      </TuiSection>

      {/* Navegación anterior/siguiente */}
      <TuiSection>
        <Container>
          <TuiGrid cols={2} className="grid-cols-2">
            <GridCell 
              className="tui-cell"
              borders={["right"]}
            >
              {prevProject ? (
                <Link to={`/proyectos/${prevProject.id}`} className="block group">
                  <span className="text-label">anterior</span>
                  <p className="text-heading mt-1 group-hover:text-accent transition-colors">
                    {prevProject.title}
                  </p>
                </Link>
              ) : (
                <span className="text-muted-foreground text-small">—</span>
              )}
            </GridCell>
            <GridCell className="tui-cell text-right">
              {nextProject ? (
                <Link to={`/proyectos/${nextProject.id}`} className="block group">
                  <span className="text-label">siguiente</span>
                  <p className="text-heading mt-1 group-hover:text-accent transition-colors">
                    {nextProject.title}
                  </p>
                </Link>
              ) : (
                <span className="text-muted-foreground text-small">—</span>
              )}
            </GridCell>
          </TuiGrid>
        </Container>
      </TuiSection>
    </Layout>
  )
}
