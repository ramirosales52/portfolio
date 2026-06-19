import { useEffect, useState } from "react"
import { Container } from "@/components/tui-grid"
import { cn } from "@/lib/utils"

const footerGifs = [
  "../assets/footer-gifs/1.gif",
  "../assets/footer-gifs/2.gif",
  "../assets/footer-gifs/3.gif",
  "../assets/footer-gifs/5.gif",
  "../assets/footer-gifs/7.gif",
  "../assets/footer-gifs/8.gif",
  "../assets/footer-gifs/9.gif",
  "../assets/footer-gifs/10.gif",
  "../assets/footer-gifs/13.gif",
  "../assets/footer-gifs/15.gif",
  "../assets/footer-gifs/16.gif",
] as const

const footerGifModules = import.meta.glob("../assets/footer-gifs/*.gif", {
  eager: true,
  import: "default",
}) as Record<string, string>

const footerGifUrls = footerGifs.map(path => footerGifModules[path])
const footerGifStorageKey = "footer-gif-index"

interface ContactFooterProps {
  className?: string
}

export function ContactFooter({ className }: ContactFooterProps) {
  const [emailInput, setEmailInput] = useState("")
  const [gifIndex, setGifIndex] = useState(0)

  useEffect(() => {
    const lastIndex = Number(window.localStorage.getItem(footerGifStorageKey) ?? -1)
    const nextIndex = Number.isFinite(lastIndex) && lastIndex >= 0
      ? (lastIndex + 1) % footerGifUrls.length
      : 0

    window.localStorage.setItem(footerGifStorageKey, String(nextIndex))
    setGifIndex(nextIndex)
  }, [])

  return (
    <div className={cn("flex flex-col h-full w-full", className)}>
      <Container corners={["tl", "tr", "bl", "br"]} className="w-full flex-1">
        <div className="h-full flex flex-col">
          <div className="flex-[3] flex items-center justify-center text-center py-10">
            <div>
              <h2 className="text-display">trabajemos juntos :)</h2>
              <p className="text-body text-muted-foreground mt-3 mb-8">
                deja aca tu email
              </p>

              <div className="flex gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  value={emailInput}
                  onChange={e => setEmailInput(e.target.value)}
                  placeholder="tu@email.com"
                  className="flex-1 bg-transparent border border-border px-3 py-2 text-sm text-foreground outline-none focus:border-accent transition-colors duration-150"
                />
                <button
                  type="button"
                  className="tui-button shrink-0"
                >
                  <span>→</span>
                  Enviar
                </button>
              </div>
            </div>
          </div>

          <div className="flex-[7] border-t border-border overflow-hidden">
            <img
              src={footerGifUrls[gifIndex]}
              alt="Contacto"
              className="h-full w-full object-cover object-bottom"
            />
          </div>
        </div>
      </Container>

      {/* Footer bar */}
      <div className="tui-cell flex items-center justify-between text-small text-muted-foreground border-t border-border">
        <span>&copy; 2025 Ramiro</span>
      </div>
    </div>
  )
}
