import { useParams, Link } from "react-router-dom"
import { lazy, Suspense, useEffect } from "react"
import { getProject } from "@/data/projects"
import { Container, GridCell, TuiGrid, TuiSection } from "@/components/tui-grid"
import { Layout } from "@/components/layout"
import { cn } from "@/lib/utils"

const ContactFooter = lazy(() => import("@/components/contact-footer").then(module => ({ default: module.ContactFooter })))

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>()
  const project = id ? getProject(id) : undefined

  useEffect(() => {
    if (!project) return
    const title = `${project.title} | Ramiro Rosales`
    document.title = title
    const desc = project.description
    let metaDesc = document.querySelector('meta[name="description"]')
    if (!metaDesc) {
      metaDesc = document.createElement("meta")
      metaDesc.setAttribute("name", "description")
      document.head.appendChild(metaDesc)
    }
    metaDesc.setAttribute("content", desc)
    const url = `https://ramiro-portfolio.vercel.app/proyectos/${project.id}`
    let ogTitle = document.querySelector('meta[property="og:title"]')
    if (!ogTitle) {
      ogTitle = document.createElement("meta")
      ogTitle.setAttribute("property", "og:title")
      document.head.appendChild(ogTitle)
    }
    ogTitle.setAttribute("content", title)
    let ogDesc = document.querySelector('meta[property="og:description"]')
    if (!ogDesc) {
      ogDesc = document.createElement("meta")
      ogDesc.setAttribute("property", "og:description")
      document.head.appendChild(ogDesc)
    }
    ogDesc.setAttribute("content", desc)
    let ogUrl = document.querySelector('meta[property="og:url"]')
    if (!ogUrl) {
      ogUrl = document.createElement("meta")
      ogUrl.setAttribute("property", "og:url")
      document.head.appendChild(ogUrl)
    }
    ogUrl.setAttribute("content", url)
    let twitterTitle = document.querySelector('meta[name="twitter:title"]')
    if (!twitterTitle) {
      twitterTitle = document.createElement("meta")
      twitterTitle.setAttribute("name", "twitter:title")
      document.head.appendChild(twitterTitle)
    }
    twitterTitle.setAttribute("content", title)
    let twitterDesc = document.querySelector('meta[name="twitter:description"]')
    if (!twitterDesc) {
      twitterDesc = document.createElement("meta")
      twitterDesc.setAttribute("name", "twitter:description")
      document.head.appendChild(twitterDesc)
    }
    twitterDesc.setAttribute("content", desc)
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement("link")
      canonical.setAttribute("rel", "canonical")
      document.head.appendChild(canonical)
    }
    canonical.setAttribute("href", url)
  }, [project])

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

  const techItems = project.tech.split(" / ")

  return (
    <Layout>
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

      {/* Header */}
      <TuiSection>
        <Container>
          <div className="tui-cell border-b border-border">
            <span className="text-label tabular-nums">{project.number}</span>
            <h1 className="text-display text-balance mt-3">{project.title}</h1>
          </div>

          {/* Meta */}
          <div className="tui-cell">
            <TuiGrid className={cn("grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4")}>
              <div>
                <span className="text-label block mb-3">stack</span>
                <div className="flex flex-wrap gap-1.5">
                  {techItems.map((tech, i) => (
                    <span
                      key={i}
                      className="text-small px-1.5 py-0.5 border border-border text-muted-foreground"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              </div>
              {(project.role || project.year || project.status) && (
                <div>
                  <span className="text-label block mb-3">info</span>
                  <div className="flex flex-col gap-1 text-small text-muted-foreground">
                    {project.role && <span>Rol: {project.role}</span>}
                    {project.year && <span>Año: {project.year}</span>}
                    {project.status && <span>Estado: {project.status}</span>}
                  </div>
                </div>
              )}
              {project.links.length > 0 && (
                <div className={cn((project.role || project.year || project.status) ? "lg:col-span-2" : "md:col-span-1")}>
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

      {/* Screenshots / Preview */}
      <TuiSection>
        <Container>
          <div className="tui-cell border-b border-border">
            <span className="text-label">preview</span>
          </div>
          {project.images && project.images.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
              {project.images.map((img, i) => (
                <div key={i} className="min-h-[220px] sm:min-h-[280px] flex items-center justify-center overflow-hidden">
                  <img
                    src={img}
                    alt={`${project.title} screenshot ${i + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="min-h-[180px] sm:min-h-[240px] flex items-center justify-center text-muted-foreground select-none"
                >
                  <div className="flex flex-col items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <circle cx="9" cy="10" r="2" />
                      <path d="M22 14l-4-4-6 6-4-4-4 4" />
                    </svg>
                    <span className="text-small">screenshot</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </TuiSection>

      {/* Description */}
      <TuiSection>
        <Container>
          <TuiGrid className="grid-cols-1 md:grid-cols-[auto_1fr]">
            <GridCell className="tui-cell" borders={["right"]}>
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
          <TuiGrid className="features-grid grid-cols-1 md:grid-cols-2">
            {project.features.map((feature, i) => {
              const isLeft = i % 2 === 0
              const isLastRow = i >= project.features.length - 2
              // Odd count: the lone cell in the last row should not keep a right border
              const isLoneLastCell = project.features.length % 2 === 1 && i === project.features.length - 1
              return (
                <GridCell
                  key={i}
                  className="tui-cell"
                  borders={[
                    ...(isLeft && !isLoneLastCell ? ["right" as const] : []),
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

      {/* Contacto */}
      <TuiSection id="contacto" className="h-[calc(100dvh-var(--navbar-height))]">
        <Suspense fallback={<div className="h-full w-full" />}>
          <ContactFooter />
        </Suspense>
      </TuiSection>
    </Layout>
  )
}
