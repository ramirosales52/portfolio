import { useEffect, useState } from "react"
import { Container } from "@/components/tui-grid"
import { site } from "@/data/site"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/components/lang-context"

const footerGifModules = import.meta.glob("../assets/footer-gifs/*.gif", {
  eager: false,
  import: "default",
}) as Record<string, () => Promise<string>>

const footerGifEntries = Object.entries(footerGifModules)
const footerGifStorageKey = "footer-gif-index"

interface ContactFooterProps {
  className?: string
}

export function ContactFooter({ className }: ContactFooterProps) {
  const [gifIndex, setGifIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [gifUrls, setGifUrls] = useState<string[]>([])
  const [loaded, setLoaded] = useState(false)
  const [copied, setCopied] = useState(false)
  const { language, t } = useLanguage()

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some(entry => entry.isIntersecting)) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: "300px" }
    )
    const el = document.getElementById("footer-gif-container")
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible || loaded || footerGifEntries.length === 0) return
    let cancelled = false
    Promise.all(footerGifEntries.slice(0, 4).map(([, loader]) => loader()))
      .then((urls) => {
        if (cancelled) return
        setGifUrls(urls)
        setLoaded(true)
        const lastIndex = Number(window.localStorage.getItem(footerGifStorageKey) ?? -1)
        const nextIndex = Number.isFinite(lastIndex) && lastIndex >= 0 && urls.length > 0
          ? (lastIndex + 1) % urls.length
          : 0
        if (urls.length > 0) {
          window.localStorage.setItem(footerGifStorageKey, String(nextIndex))
          setGifIndex(nextIndex)
        }
      })
      .catch(() => { })
    return () => {
      cancelled = true
    }
  }, [isVisible, loaded])

  return (
    <div className={cn("flex flex-col h-full w-full", className)}>
      <Container corners={["tl", "tr", "bl", "br"]} className="w-full flex-1">
        <div className="h-full flex flex-col">
          <div className="flex-[3] flex items-center justify-center text-center py-10">
            <div>
              <h2 className="text-display">{t("contact.title")}</h2>

              <div className="flex flex-col items-center gap-3 mt-8">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="tui-button !bg-foreground !text-background border-foreground hover:!bg-background hover:!text-foreground"
                >
                  <span>→</span>
                  {copied ? (language === "es" ? "COPIADO" : "COPIED") : "CORREO"}
                </button>
              </div>
            </div>
          </div>

          <div id="footer-gif-container" className="flex-[7] border-t border-border overflow-hidden">
            {gifUrls.length > 0 && (
              <img
                src={gifUrls[gifIndex]}
                alt="Contacto"
                className="h-full w-full object-cover object-bottom"
                loading="lazy"
                decoding="async"
                width="1200"
                height="600"
              />
            )}
          </div>
        </div>
      </Container>

      {/* Footer bar */}
      <div className="tui-cell flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-small text-muted-foreground border-t border-border">
        <span>&copy; 2026 {site.shortName}</span>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <a href="mailto:ramirosales52@gmail.com" className="link-hover">
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
            href={language === "en" && site.cvEn ? site.cvEn : site.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="link-hover"
          >
            {t("hero.cv")}
          </a>
        </div>
      </div>
    </div>
  )
}
