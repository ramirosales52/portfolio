import { useEffect, useRef, useCallback, Suspense, lazy, useMemo } from "react"
import { Link } from "react-router-dom"
import { Layout } from "@/components/layout"
import { ScrambleText } from "@/components/scramble-text"
import { useNav } from "@/components/nav-context"
import { useTheme } from "@/components/theme-context"
import { useLanguage } from "@/components/lang-context"
import { Container, GridCell, TuiGrid, TuiSection } from "@/components/tui-grid"
import { projects } from "@/data/projects"
import { site } from "@/data/site"
import profileImage from "@/assets/profile.webp"
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

const mainTechnologies = [
  "React",
  "React Native",
  "NestJS",
  "Node.js",
  "JavaScript",
  "TypeScript",
  "SQL / NoSQL",
]

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const experienciaRef = useRef<HTMLDivElement>(null)
  const stackRef = useRef<HTMLDivElement>(null)
  const proyectosRef = useRef<HTMLDivElement>(null)
  const contactoRef = useRef<HTMLDivElement>(null)
  const { setShowLogoInNav, setActiveSection } = useNav()
  const { theme } = useTheme()
  const { language, t } = useLanguage()

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
      { ref: aboutRef, id: "sobre-mi" },
      { ref: experienciaRef, id: "experiencia" },
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
        <Container corners={["bl", "br"]} className="h-full relative">
          <div className="tui-cell h-full flex flex-col justify-center relative">

            <div className="absolute inset-x-0 top-[20%] bottom-[15%] -z-10 border-t border-b border-border">
              <Suspense fallback={<div className="w-full h-full bg-muted/10" />}>
                <Dither
                  waveColor={ditherColors.waveColor}
                  baseColor={ditherColors.baseColor}
                  gradientColor={ditherColors.gradientColor}
                  waveSpeed={0.03}
                  gradientStrength={0.7}
                  enableMouseInteraction={typeof window !== "undefined" && window.innerWidth >= 1024}
                  className="w-full h-full"
                />
              </Suspense>
            </div>
            <img
              src={profileImage}
              alt="Ramiro Rosales"
              width="144"
              height="144"
              className="w-28 h-28 sm:w-36 sm:h-36 object-cover rounded-none border border-border relative z-10"
            />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.02em] mt-8 relative z-10">
              RAMIRO ROSALES
            </h1>

            {/* Description */}
            <p className="text-foreground text-base sm:text-lg max-w-xl leading-relaxed mt-4 relative z-10 text-pretty">
              {t("hero.role")}
            </p>

            {/* Separator */}
            <div className="text-lg tracking-wider relative z-10 mt-5">
              //////////////////
            </div>


            <div className="flex flex-wrap gap-6 sm:gap-8 mt-8 text-foreground relative z-10">
              <ScrambleText
                as="a"
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                ariaLabel={language === "es" ? "GitHub de Ramiro (abre en una pestaña nueva)" : "Ramiro's GitHub (opens in new tab)"}
                text={t("hero.github")}
                className="link-hover text-sm"
              />
              <ScrambleText
                as="a"
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                ariaLabel={language === "es" ? "LinkedIn de Ramiro (abre en una pestaña nueva)" : "Ramiro's LinkedIn (opens in new tab)"}
                text={t("hero.linkedin")}
                className="link-hover text-sm"
              />
              <ScrambleText
                as="a"
                href={language === "en" && site.cvEn ? site.cvEn : site.cv}
                target="_blank"
                rel="noopener noreferrer"
                ariaLabel={t("hero.cvAria")}
                text={t("hero.cv")}
                className="link-hover text-sm"
                loop={false}
              />
            </div>

            {/* Availability status */}
            <div className="relative z-10 mt-5 inline-flex w-fit self-start items-center gap-2 border border-border px-3 py-1.5 text-small text-muted-foreground">
              <span className="status-dot h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" aria-hidden="true" />
              <span>{t("hero.available")}</span>
            </div>
          </div>
        </Container>
      </TuiSection>

      {/* Divider */}
      <div className="tui-divider" />

      {/* Sobre mí Section */}
      <TuiSection ref={aboutRef} data-section="sobre-mi" id="sobre-mi">
        <Container>
          <div className="tui-cell border-b border-border">
            <span className="text-label">{t("about.title")}</span>
          </div>
          <div className="tui-cell">
            <div className="flex flex-col gap-4">
              <p className="text-body text-muted-foreground text-pretty leading-relaxed">
                {language === "es" ? (
                  <>Soy de <strong className="font-semibold text-foreground">Córdoba, Argentina</strong>. Estudiante de <strong className="font-semibold text-foreground">Ingeniería en Sistemas</strong> con experiencia en el desarrollo de <strong className="font-semibold text-foreground">aplicaciones web, móviles y de escritorio</strong>. Trabajo principalmente con <strong className="font-semibold text-foreground">React, React Native y NestJS</strong>, construyendo soluciones completas tanto en frontend como backend.</>
                ) : (
                  <>I'm from <strong className="font-semibold text-foreground">Córdoba, Argentina</strong>. Systems Engineering student with experience in developing <strong className="font-semibold text-foreground">web, mobile and desktop applications</strong>. I mainly work with <strong className="font-semibold text-foreground">React, React Native and NestJS</strong>, building complete solutions for both frontend and backend.</>
                )}
              </p>
              <p className="text-body text-muted-foreground text-pretty leading-relaxed">
                {language === "es" ? (
                  <>Me enfoco en desarrollar aplicaciones funcionales, eficientes y adaptadas a las necesidades del usuario, abarcando desde la idea inicial hasta la implementación final. También cuento con una sólida base en <strong className="font-semibold text-foreground">soporte técnico</strong>, lo que me permite tener una visión integral de los sistemas y resolver problemas de manera práctica.</>
                ) : (
                  <>I focus on developing functional, efficient applications tailored to user needs, covering everything from initial idea to final implementation. I also have a solid background in <strong className="font-semibold text-foreground">technical support</strong>, which allows me to have a comprehensive view of systems and solve problems practically.</>
                )}
              </p>
              <p className="text-body text-muted-foreground text-pretty leading-relaxed">
                {language === "es" ? (
                  <>Actualmente me encuentro en <strong className="font-semibold text-foreground">búsqueda de oportunidades</strong> para crecer profesionalmente en el área de desarrollo de software y el soporte IT, aportando valor en proyectos reales.</>
                ) : (
                  <>I'm currently looking for <strong className="font-semibold text-foreground">opportunities</strong> to grow professionally in software development and IT support, adding value to real projects.</>
                )}
              </p>
              <div>
                <span className="text-label block mb-2 font-semibold">{t("about.techTitle")}</span>
                <div className="flex flex-wrap gap-1.5">
                  {mainTechnologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-small px-1.5 py-0.5 border border-border font-semibold text-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-small text-muted-foreground">
                <span>
                  {t("about.location")} <strong className="font-semibold text-foreground">{t("about.locationValue")}</strong>
                </span>
                <span>
                  {t("about.availability")} <strong className="font-semibold text-foreground">{t("about.availabilityValue")}</strong>
                </span>
              </div>
            </div>
          </div>
        </Container>
      </TuiSection>

      {/* Divider */}
      <div className="tui-divider" />

      {/* Experiencia Section */}
      <TuiSection ref={experienciaRef} data-section="experiencia" id="experiencia">
        <Container>
          <div className="tui-cell border-b border-border">
            <span className="text-label">{t("exp.title")}</span>
          </div>
          <div className="divide-y divide-border">
            <div className="tui-cell">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-heading">{t("exp.job1Title")}</h3>
                </div>
                <div className="text-small text-foreground/80 text-right">
                  <p>{t("exp.job1Period")}</p>
                  <p>{t("exp.job1Location")}</p>
                </div>
              </div>
              <p className="text-body text-muted-foreground text-pretty max-w-2xl leading-relaxed">
                {t("exp.job1Desc")}
              </p>
              <ul className="mt-4 space-y-1.5 text-small text-muted-foreground leading-relaxed max-w-2xl">
                <li>{t("exp.job1Item1")}</li>
                <li>{t("exp.job1Item2")}</li>
                <li>{t("exp.job1Item3")}</li>
                <li>{t("exp.job1Item4")}</li>
                <li>{t("exp.job1Item5")}</li>
              </ul>
            </div>
            <div className="tui-cell">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-heading">{t("exp.job2Title")}</h3>
                </div>
                <div className="text-small text-foreground/80 text-right">
                  <p>{t("exp.job2Period")}</p>
                  <p>{t("exp.job2Location")}</p>
                </div>
              </div>
              <p className="text-body text-muted-foreground text-pretty max-w-2xl leading-relaxed">
                {t("exp.job2Desc")}
              </p>
              <ul className="mt-4 space-y-1.5 text-small text-muted-foreground leading-relaxed max-w-2xl">
                <li>{t("exp.job2Item1")}</li>
                <li>{t("exp.job2Item2")}</li>
                <li>{t("exp.job2Item3")}</li>
                <li>{t("exp.job2Item4")}</li>
                <li>{t("exp.job2Item5")}</li>
                <li>{t("exp.job2Item6")}</li>
              </ul>
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
            <span className="text-label">{t("stack.title")}</span>
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
                    className="h-9 w-9 sm:h-11 sm:w-11 object-contain"
                    loading="lazy"
                    decoding="async"
                    width="44"
                    height="44"
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
            <span className="text-label">{t("projects.title")}</span>
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
                        <span className="inline-flex items-center gap-2 border border-border bg-background px-3 py-1.5 text-small text-foreground">
                          {t("projects.viewProject")}
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
                      <h3 className="text-heading text-balance group-hover/card:underline group-hover/card:underline-offset-4 group-hover/card:decoration-[var(--accent)]">
                        {project.title}
                      </h3>
                      <p className="text-body text-muted-foreground text-pretty mt-2 line-clamp-3 leading-relaxed">
                        {(language === "en" && project.descriptionEn) ? project.descriptionEn : project.description}
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
                      className="text-small text-foreground group-hover/card:translate-x-1 transition-transform duration-150"
                    >
                      {t("projects.viewProjectArrow")}
                    </Link>
                    {project.links.length > 0 && (
                      <a
                        href={project.links[0].href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-small text-muted-foreground link-hover"
                      >
                        {t("projects.openWeb")} ↗
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
