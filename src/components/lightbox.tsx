import { useCallback, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"

export interface LightboxImage {
  src: string
  alt: string
}

interface LightboxLabels {
  image: string
  close: string
  previous: string
  next: string
}

interface LightboxProps {
  images: LightboxImage[]
  /** Index of the image to show, or null when closed */
  index: number | null
  onIndexChange: (index: number) => void
  onClose: () => void
  labels: LightboxLabels
}

const FOCUSABLE_SELECTOR = 'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'

/**
 * Full-screen image viewer with dimmed backdrop, arrow navigation,
 * keyboard support (← → Esc) and a thumbnail strip.
 */
export function Lightbox({ images, index, onIndexChange, onClose, labels }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const count = images.length
  const isOpen = index !== null && count > 0

  const goTo = useCallback(
    (nextIndex: number) => {
      if (count === 0) return
      onIndexChange((nextIndex + count) % count)
    },
    [count, onIndexChange]
  )

  // Lock page scroll while the lightbox is open
  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  // Keyboard navigation + focus trap
  useEffect(() => {
    if (!isOpen || index === null) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key === "ArrowRight") {
        event.preventDefault()
        goTo(index + 1)
        return
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        goTo(index - 1)
        return
      }
      if (event.key !== "Tab") return

      const nodes = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ?? []
      ).filter((node) => node.offsetParent !== null)
      if (nodes.length === 0) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, index, goTo, onClose])

  // Move focus into the dialog and restore it on close
  useEffect(() => {
    if (!isOpen) return
    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null
    closeButtonRef.current?.focus()
    return () => {
      previouslyFocused?.focus({ preventScroll: true })
    }
  }, [isOpen])

  if (!isOpen || index === null) return null
  const current = images[index]
  if (!current) return null

  const hasMultiple = count > 1

  const renderNavButton = (direction: "prev" | "next", variant: "side" | "inline") => {
    const isPrev = direction === "prev"
    return (
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          goTo(index + (isPrev ? -1 : 1))
        }}
        aria-label={isPrev ? labels.previous : labels.next}
        className={cn(
          "shrink-0 items-center justify-center border border-white/20 bg-black/40 text-white/70 transition-colors hover:border-white/60 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
          variant === "side"
            ? "absolute top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 sm:flex sm:h-12 sm:w-12"
            : "flex h-10 w-10 sm:hidden",
          variant === "side" && (isPrev ? "left-2 sm:left-6" : "right-2 sm:right-6")
        )}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d={isPrev ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
        </svg>
      </button>
    )
  }

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={current.alt}
      className="fixed inset-0 z-[100] flex flex-col bg-black/85 backdrop-blur-[6px] animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Top bar: counter + close */}
      <div
        className="flex items-start justify-between gap-4 p-4 sm:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="text-[11px] uppercase tracking-[0.1em] text-white/50">{labels.image}</span>
          <span className="text-small tabular-nums text-white/40">
            <span className="text-white">{String(index + 1).padStart(2, "0")}</span>
            {" / "}
            {String(count).padStart(2, "0")}
          </span>
        </div>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label={labels.close}
          className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/20 bg-black/40 text-white/70 transition-colors hover:border-white/60 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M3 3l8 8M11 3l-8 8" />
          </svg>
        </button>
      </div>

      {/* Image */}
      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-2 sm:px-20"
        onClick={onClose}
      >
        {hasMultiple && renderNavButton("prev", "side")}

        <img
          key={current.src}
          src={current.src}
          alt={current.alt}
          loading="eager"
          decoding="async"
          onClick={(event) => event.stopPropagation()}
          className="max-h-[calc(100dvh-10rem)] max-w-full border border-white/15 object-contain shadow-2xl animate-in fade-in zoom-in-95 duration-200 sm:max-h-[calc(100dvh-12rem)]"
        />

        {hasMultiple && renderNavButton("next", "side")}
      </div>

      {/* Thumbnail strip (arrows move inline on mobile) */}
      {hasMultiple && (
        <div
          className="flex items-center justify-center gap-2 px-4 pb-4 sm:gap-3 sm:pb-6"
          onClick={(event) => event.stopPropagation()}
        >
          {renderNavButton("prev", "inline")}

          <div className="flex items-center gap-2 overflow-x-auto">
            {images.map((image, i) => (
              <button
                key={image.src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`${labels.image} ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  "h-10 w-16 shrink-0 overflow-hidden border transition-opacity sm:h-12 sm:w-20",
                  i === index
                    ? "border-white/80 opacity-100"
                    : "border-white/15 opacity-50 hover:opacity-80"
                )}
              >
                <img
                  src={image.src}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </button>
            ))}
          </div>

          {renderNavButton("next", "inline")}
        </div>
      )}
    </div>,
    document.body
  )
}
