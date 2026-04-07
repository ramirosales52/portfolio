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
        <TuiSection className="pt-[var(--navbar-height)]">
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

  const currentIndex = projects.findIndex(p => p.id === id)
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  const techItems = project.tech.split(" / ")

  return (
    <Layout>
      {/* Spacer for fixed navbar */}
      <div className="h-[var(--navbar-height)]" />

      {/* Back link */}
      <TuiSection>
        <Container>
          <div className="tui-cell">
            <Link to="/#proyectos" className="text-small text-muted-foreground link-hover">
              ← Volver a trabajos
            </Link>
          </div>
        </Container>
      </TuiSection>

      {/* Project header - full width title area */}
      <TuiSection>
        <Container>
          {/* Number + Title */}
          <div className="tui-cell">
            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-label tabular-nums">{project.number}</span>
            </div>
            <h1 className="text-display text-balance">{project.title}</h1>
          </div>

          {/* Meta row: tech + links */}
          <div className="tui-cell border-t border-border">
            <TuiGrid cols={2} className="grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
              <div>
                <span className="text-label block mb-3">stack</span>
                <div className="flex flex-wrap gap-2">
                  {techItems.map((tech, i) => (
                    <span
                      key={i}
                      className="text-small px-2 py-1 border border-border text-muted-foreground"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              </div>
              {project.links.length > 0 && (
                <div>
                  <span className="text-label block mb-3">links</span>
                  <div className="flex flex-wrap gap-3">
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
                </div>
              )}
            </TuiGrid>
          </div>
        </Container>
      </TuiSection>

      {/* Description */}
      <TuiSection>
        <Container>
          <TuiGrid cols={2} className="grid-cols-1 md:grid-cols-[auto_1fr]">
            <GridCell
              className="tui-cell"
              borders={["right"]}
            >
              <span className="text-label">sobre el proyecto</span>
            </GridCell>
            <GridCell className="tui-cell">
              <p className="text-body text-muted-foreground text-pretty max-w-2xl leading-relaxed">
                {project.longDescription}
              </p>
            </GridCell>
          </TuiGrid>
        </Container>
      </TuiSection>

      {/* Features */}
      <TuiSection>
        <Container>
          <div className="tui-cell border-b border-border">
            <span className="text-label">características</span>
          </div>
          <TuiGrid cols={2} className="grid-cols-1 md:grid-cols-2">
            {project.features.map((feature, i) => {
              const isLeft = i % 2 === 0
              const isLastRow = i >= project.features.length - 2
              return (
                <GridCell
                  key={i}
                  className="tui-cell"
                  borders={[
                    ...(isLeft ? ["right" as const] : []),
                    ...(!isLastRow ? ["bottom" as const] : []),
                  ]}
                  corners={
                    isLeft && !isLastRow
                      ? ["br"]
                      : !isLeft && !isLastRow
                        ? ["bl"]
                        : []
                  }
                >
                  <div className="flex items-start gap-3">
                    <span className="text-accent text-small tabular-nums shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-body text-muted-foreground text-pretty">{feature}</p>
                  </div>
                </GridCell>
              )
            })}
          </TuiGrid>
        </Container>
      </TuiSection>

      {/* Prev/Next navigation */}
      <TuiSection>
        <Container>
          <TuiGrid cols={2} className="grid-cols-2">
            <GridCell
              className="tui-cell"
              borders={["right"]}
              corners={["tr", "br"]}
            >
              {prevProject ? (
                <Link to={`/proyectos/${prevProject.id}`} className="block group">
                  <span className="text-label">← anterior</span>
                  <p className="text-heading text-balance mt-2 group-hover:text-accent transition-colors duration-150">
                    {prevProject.title}
                  </p>
                </Link>
              ) : (
                <div className="text-muted-foreground text-small">—</div>
              )}
            </GridCell>
            <GridCell className="tui-cell text-right">
              {nextProject ? (
                <Link to={`/proyectos/${nextProject.id}`} className="block group">
                  <span className="text-label">siguiente →</span>
                  <p className="text-heading text-balance mt-2 group-hover:text-accent transition-colors duration-150">
                    {nextProject.title}
                  </p>
                </Link>
              ) : (
                <div className="text-muted-foreground text-small">—</div>
              )}
            </GridCell>
          </TuiGrid>
        </Container>
      </TuiSection>
    </Layout>
  )
}
