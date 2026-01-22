import { Container, TuiGrid, GridCell } from "@/components/tui-grid"
import { Suspense } from "react"
import LetterGlitch from '@/components/letter-glitch'
import { cn } from "@/lib/utils"

interface ContactFooterProps {
  className?: string
}

export function ContactFooter({ className }: ContactFooterProps) {
  return (
    <div className={cn("flex flex-col h-full w-full", className)}>
      {/* Contact section - 4 corners */}
      <Container corners={["tl", "tr", "bl", "br"]} className="flex-1">
        <div className="absolute inset-x-0 top-[20%] bottom-[15%] -z-10 border-t border-b border-border">
          <Suspense fallback={<div className="w-full h-full bg-muted/10" />}>
            <LetterGlitch
              glitchSpeed={50}
              centerVignette={true}
              outerVignette={false}
              smooth={true}
            />
          </Suspense>
        </div>

        <TuiGrid cols={2} className="grid-cols-1 md:grid-cols-2 h-full">
          <GridCell borders={["right"]} corners={[]} className="hidden md:block">
            <div className="tui-cell h-full flex flex-col justify-center">
              <h2 className="text-heading text-balance">
                Trabajemos juntos
              </h2>
              <p className="text-body text-muted-foreground text-pretty mt-4">
                Hablemos sobre tu próximo proyecto.
              </p>
            </div>
          </GridCell>

          <GridCell corners={[]}>
            <div className="tui-cell h-full flex flex-col justify-center">
              <h2 className="text-heading text-balance md:hidden mb-4">
                Trabajemos juntos
              </h2>
              <a
                href="mailto:hola@ramiro.dev"
                className="text-xl sm:text-2xl link-hover inline-block"
              >
                hola@ramiro.dev
              </a>

              <div className="mt-8 space-y-2 text-small">
                <a
                  href="https://github.com/ramiro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-muted-foreground link-hover"
                >
                  <span className="text-accent">-&gt;</span> github
                </a>
                <a
                  href="https://linkedin.com/in/ramiro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-muted-foreground link-hover"
                >
                  <span className="text-accent">-&gt;</span> linkedin
                </a>
              </div>
            </div>
          </GridCell>
        </TuiGrid>
      </Container>

      {/* Divider */}
      <div className="tui-divider" />

      {/* Copyright bar - 4 corners */}
      <Container corners={["tl", "tr", "bl", "br"]}>
        <div className="tui-cell flex items-center justify-between text-small text-muted-foreground">
          <span>(C) 2025 Ramiro</span>
          <div className="flex gap-6">
            <a
              href="https://github.com/ramiro"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              Github
            </a>
            <a
              href="https://linkedin.com/in/ramiro"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </Container>
    </div>
  )
}
  return (
    <div className={cn("flex flex-col h-full w-full", className)}>
      {/* Contact section - 4 corners */}
      <Container corners={["tl", "tr", "bl", "br"]} className="flex-1">
        <div className="absolute inset-x-0 top-[20%] bottom-[15%] -z-10 border-t border-b border-border">
          <Suspense fallback={<div className="w-full h-full bg-muted/10" />}>
            <LetterGlitch
              glitchSpeed={50}
              centerVignette={true}
              outerVignette={false}
              smooth={true}
            />
          </Suspense>
        </div>

        <TuiGrid cols={2} className="grid-cols-1 md:grid-cols-2 h-full">
          <GridCell borders={["right"]} corners={[]} className="hidden md:block">
            <div className="tui-cell h-full flex flex-col justify-center">
              <h2 className="text-heading text-balance">
                Trabajemos juntos
              </h2>
              <p className="text-body text-muted-foreground text-pretty mt-4">
                Hablemos sobre tu próximo proyecto.
              </p>
            </div>
          </GridCell>

          <GridCell corners={[]}>
            <div className="tui-cell h-full flex flex-col justify-center">
              <h2 className="text-heading text-balance md:hidden mb-4">
                Trabajemos juntos
              </h2>
              <a
                href="mailto:hola@ramiro.dev"
                className="text-xl sm:text-2xl link-hover inline-block"
              >
                hola@ramiro.dev
              </a>

              <div className="mt-8 space-y-2 text-small">
                <a
                  href="https://github.com/ramiro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-muted-foreground link-hover"
                >
                  <span className="text-accent">-&gt;</span> github
                </a>
                <a
                  href="https://linkedin.com/in/ramiro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-muted-foreground link-hover"
                >
                  <span className="text-accent">-&gt;</span> linkedin
                </a>
              </div>
            </div>
          </GridCell>
        </TuiGrid>
      </Container>

      {/* Divider */}
      <div className="tui-divider" />

      {/* Copyright bar - 4 corners */}
      <Container corners={["tl", "tr", "bl", "br"]}>
        <div className="tui-cell flex items-center justify-between text-small text-muted-foreground">
          <span>(C) 2025 Ramiro</span>
          <div className="flex gap-6">
            <a
              href="https://github.com/ramiro"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              Github
            </a>
            <a
              href="https://linkedin.com/in/ramiro"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </Container>
    </div>
  )
}
