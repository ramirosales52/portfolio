import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { getProject } from "@/data/projects"
import { Layout } from "@/components/layout"
import { Lightbox } from "@/components/lightbox"
import { cn } from "@/lib/utils"
import { Container, TuiSection } from "@/components/tui-grid"
import { contactMailtoHref, site } from "@/data/site"
import { useLanguage } from "@/components/lang-context"

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>()
  const project = id ? getProject(id) : undefined
  const { t, language } = useLanguage()
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const projectDesc = project ? (language === "en" && project.descriptionEn ? project.descriptionEn : project.description) : ""
  const projectLongDesc = project ? (language === "en" && project.longDescriptionEn ? project.longDescriptionEn : project.longDescription) : ""
  const projectFeatures = project ? (language === "en" && project.featuresEn ? project.featuresEn : project.features) : []
  const projectRole = project ? (language === "en" && project.roleEn ? project.roleEn : project.role) : undefined
  const projectStatus = project ? (language === "en" && project.statusEn ? project.statusEn : project.status) : undefined

  useEffect(() => {
    if (!project) return
    const title = `${project.title} | Ramiro Rosales`
    document.title = title
    const desc = projectDesc
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
  }, [project, projectDesc])

  useEffect(() => {
    setLightboxIndex(null)
  }, [project?.id])

  if (!project) {
    return (
      <Layout>
        <div className="h-[var(--navbar-height)]" />
        <TuiSection className="border-t-0">
          <Container>
            <div className="tui-cell border-b border-border">
              <p className="text-muted-foreground">{t("project.notFound")}</p>
              <Link to="/" className="text-accent link-hover mt-4 inline-block">
                {t("project.backHome")}
              </Link>
            </div>
          </Container>
        </TuiSection>
      </Layout>
    )
  }

  const techItems = project.tech.split(" / ")

  const lightboxImages = [
    ...(project.preview ? [{ src: project.preview, alt: `Preview de ${project.title}` }] : []),
    ...(project.images ?? []).map((img, i) => ({
      src: img,
      alt: `${project.title} screenshot ${i + 1}`,
    })),
  ]
  const galleryOffset = project.preview ? 1 : 0

  return (
    <Layout>
      <div className="h-[var(--navbar-height)]" />

      {/* Back link */}
      <TuiSection className="border-t-0">
        <Container>
          <div className="tui-cell">
            <Link to="/#proyectos" className="text-small text-muted-foreground link-hover inline-flex items-center gap-1.5">
              <span className="text-accent">←</span>
              <span>{t("project.back")}</span>
            </Link>
          </div>
        </Container>
      </TuiSection>

      {/* Divider */}
      <div className="tui-divider" />

      {/* Hero */}
      <TuiSection>
        <Container>
          <div className="tui-cell">
            <div className="relative border border-border">
              <div className="absolute -top-px left-6 right-6 h-px bg-border" />
              <div className="absolute -bottom-px left-6 right-6 h-px bg-border" />
              <div className="absolute -left-px top-6 bottom-6 w-px bg-border" />
              <div className="absolute -right-px top-6 bottom-6 w-px bg-border" />
              <div className="px-6 sm:px-10 lg:px-14 py-10 sm:py-14 lg:py-18">
                <div className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-8 lg:gap-12 items-start">
                    <div className="flex flex-col gap-5">
                      <h1 className="text-display text-balance leading-[0.9]">{project.title}</h1>
                      {projectDesc && (
                        <p className="text-body text-muted-foreground max-w-2xl text-pretty leading-relaxed">
                          {projectDesc}
                        </p>
                      )}
                      {project.links.length > 0 && (
                        <div className="flex flex-wrap gap-2">
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
                    </div>
                    <div className="relative border border-border bg-muted/5 aspect-[16/10] w-full overflow-hidden">
                      {project.preview ? (
                        <button
                          type="button"
                          onClick={() => setLightboxIndex(0)}
                          aria-label={`${t("project.zoom")}: ${project.title}`}
                          className="group/preview relative block h-full w-full cursor-zoom-in overflow-hidden focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
                        >
                          <img
                            src={project.preview}
                            alt={`Preview de ${project.title}`}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover/preview:scale-[1.02]"
                            loading="eager"
                            decoding="async"
                          />
                          <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background/50 opacity-0 transition-opacity duration-150 group-hover/preview:opacity-100">
                            <span className="inline-flex items-center gap-1.5 border border-border bg-background px-2 py-1 text-[10px] uppercase tracking-wider text-foreground">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                                <circle cx="11" cy="11" r="7" />
                                <path d="M20 20l-3.5-3.5M11 8v6M8 11h6" />
                              </svg>
                              {t("project.zoom")}
                            </span>
                          </span>
                        </button>
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                          <div className="flex flex-col items-center gap-2">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                              <rect x="2" y="4" width="20" height="16" rx="2" />
                              <circle cx="9" cy="10" r="2" />
                              <path d="M22 14l-4-4-6 6-4-4-4 4" />
                            </svg>
                            <span className="text-small">preview</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </TuiSection>

      {/* Divider */}
      <div className="tui-divider" />

      {/* Content */}
      <TuiSection>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-0">
            {/* Sidebar */}
            <aside className="flex flex-col border-b border-border lg:border-b-0 h-fit">
              <div className="tui-cell border-b border-border">
                <span className="text-label block">{t("project.details")}</span>
              </div>
              <div className="divide-y divide-border">
                <div className="tui-cell flex flex-col gap-2">
                  <span className="text-label text-muted-foreground">{t("project.stack")}</span>
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
                {(projectRole || project.year || projectStatus) && (
                  <div className="tui-cell flex flex-col gap-2">
                    <span className="text-label text-muted-foreground">info</span>
                    <div className="flex flex-col gap-1.5 text-small text-muted-foreground">
                      {projectRole && <span>{t("project.role")}: {projectRole}</span>}
                      {project.year && <span>{t("project.year")}: {project.year}</span>}
                      {projectStatus && <span>{t("project.status")}: {projectStatus}</span>}
                    </div>
                  </div>
                )}
              </div>
            </aside>

            {/* Main */}
            <main className="flex flex-col lg:border-l border-border">
              {/* Gallery */}
              {project.images && project.images.length > 0 ? (
                <div className="tui-cell border-b border-border">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 text-label text-muted-foreground">
                      <span>{t("project.gallery")}</span>
                      <span className="h-px flex-1 bg-border/70" />
                      <span className="tabular-nums">{project.images.length.toString().padStart(2, "0")}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {project.images.map((img, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setLightboxIndex(galleryOffset + i)}
                          aria-label={`${t("project.zoom")}: ${project.title} screenshot ${i + 1}`}
                          className={cn(
                            "group/img relative block overflow-hidden border border-border bg-muted/5 cursor-zoom-in focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent",
                            project.images && project.images.length === 1 ? "sm:col-span-2" : ""
                          )}
                        >
                          <div className="aspect-[16/10] sm:aspect-[16/9]">
                            <img
                              src={img}
                              alt={`${project.title} screenshot ${i + 1}`}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-[1.02]"
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                          <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background/50 opacity-0 transition-opacity duration-150 group-hover/img:opacity-100">
                            <span className="inline-flex items-center gap-1.5 border border-border bg-background px-2 py-1 text-[10px] uppercase tracking-wider text-foreground">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                                <circle cx="11" cy="11" r="7" />
                                <path d="M20 20l-3.5-3.5M11 8v6M8 11h6" />
                              </svg>
                              {t("project.zoom")}
                            </span>
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="tui-cell border-b border-border">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 text-label text-muted-foreground">
                      <span>{t("project.gallery")}</span>
                      <span className="h-px flex-1 bg-border/70" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[1, 2].map((i) => (
                        <div key={i} className="relative aspect-[16/10] sm:aspect-[16/9] border border-border flex items-center justify-center text-muted-foreground bg-muted/5">
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
                  </div>
                </div>
              )}

              {/* About */}
              <div className="tui-cell border-b border-border">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-3 text-label text-muted-foreground">
                    <span>{t("project.about")}</span>
                    <span className="h-px flex-1 bg-border/70" />
                  </div>
                  <p className="text-body text-muted-foreground text-pretty leading-relaxed">
                    {projectLongDesc}
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="tui-cell">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 text-label text-muted-foreground flex-1">
                      <span>{t("project.features")}</span>
                      <span className="h-px flex-1 bg-border/70" />
                    </div>
                    <span className="text-small text-muted-foreground tabular-nums">{projectFeatures.length.toString().padStart(2, "0")}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {projectFeatures.map((feature, i) => (
                      <div key={i} className="group relative border border-border overflow-hidden">
                        <div className="absolute inset-y-0 left-0 w-px bg-border" />
                        <div className="flex items-start gap-4 px-5 sm:px-6 py-5 sm:py-6">
                          <span className="text-accent text-small tabular-nums shrink-0 mt-0.5">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <p className="text-body text-muted-foreground text-pretty leading-relaxed">{feature}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </Container>
      </TuiSection>

      {/* Divider */}
      <div className="tui-divider" />

      {/* Footer */}
      <footer>
        <div className="tui-cell flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-small text-muted-foreground border-t border-border">
          <span>&copy; 2026 {site.shortName}</span>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <a href={contactMailtoHref("Contacto desde el portfolio", "")} className="link-hover">
              {site.email}
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-hover"
            >
              GitHub
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="link-hover"
            >
              LinkedIn
            </a>
            <a
              href={site.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="link-hover"
            >
              CV
            </a>
          </div>
        </div>
      </footer>

      <Lightbox
        images={lightboxImages}
        index={lightboxIndex}
        onIndexChange={setLightboxIndex}
        onClose={() => setLightboxIndex(null)}
        labels={{
          image: t("project.image"),
          close: t("project.close"),
          previous: t("project.previous"),
          next: t("project.next"),
        }}
      />
    </Layout>
  )
}
