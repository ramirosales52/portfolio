import { Container, TuiGrid, GridCell } from "@/components/tui-grid"

interface ContactFooterProps {
  className?: string
}

export function ContactFooter({ className }: ContactFooterProps) {
  return (
    <footer className={className}>
      {/* Contact section - 4 corners */}
      <Container corners={["tl", "tr", "bl", "br"]}>
        <TuiGrid cols={2} className="grid-cols-1 md:grid-cols-2 min-h-[calc(100dvh-3rem)]">
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
    </footer>
  )
}
