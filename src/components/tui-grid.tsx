import { cn } from "@/lib/utils"

/**
 * SVG cross icon for grid intersections
 * Symmetric + with equal length arms
 */
function Cross({ className }: { className?: string }) {
  return (
    <svg
      className={cn("tui-corner", className)}
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Vertical line */}
      <line x1="5.5" y1="0" x2="5.5" y2="11" stroke="currentColor" strokeWidth="1" />
      {/* Horizontal line */}
      <line x1="0" y1="5.5" x2="11" y2="5.5" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}

interface ContainerProps {
  children: React.ReactNode
  className?: string
  /** Which corner crosses to show */
  corners?: ("tl" | "tr" | "bl" | "br")[]
}

/**
 * Content container with left/right borders and corner crosses.
 * Corners get clipped by overflow:hidden creating an "L" shape effect.
 */
export function Container({ children, className, corners = ["tl", "tr", "bl", "br"] }: ContainerProps) {
  return (
    <div className={cn("container-content relative", className)}>
      {corners.includes("tl") && <Cross className="tui-corner-tl hidden sm:block" />}
      {corners.includes("tr") && <Cross className="tui-corner-tr hidden sm:block" />}
      {corners.includes("bl") && <Cross className="tui-corner-bl hidden sm:block" />}
      {corners.includes("br") && <Cross className="tui-corner-br hidden sm:block" />}
      {children}
    </div>
  )
}

interface GridCellProps {
  children: React.ReactNode
  className?: string
  /** Show corner crosses */
  corners?: ("tl" | "tr" | "bl" | "br")[]
  /** Border sides */
  borders?: ("top" | "bottom" | "left" | "right")[]
  /** Use dashed borders */
  dashed?: boolean
  /** Click handler */
  onClick?: () => void
}

/**
 * A grid cell with optional corner crosses and borders.
 * Designed for TUI/ASCII-style layouts where borders meet at intersections.
 */
export function GridCell({
  children,
  className,
  corners = [],
  borders = [],
  dashed = false,
  onClick,
}: GridCellProps) {
  const borderClasses = borders.map((b) => {
    const base = `border-${b === "top" ? "t" : b === "bottom" ? "b" : b === "left" ? "l" : "r"}`
    return dashed ? `${base} border-dashed` : base
  })

  return (
    <div className={cn("relative", ...borderClasses, className)} onClick={onClick}>
      {corners.includes("tl") && <Cross className="tui-corner-tl" />}
      {corners.includes("tr") && <Cross className="tui-corner-tr" />}
      {corners.includes("bl") && <Cross className="tui-corner-bl" />}
      {corners.includes("br") && <Cross className="tui-corner-br" />}
      {children}
    </div>
  )
}

interface TuiGridProps {
  children: React.ReactNode
  className?: string
  /** Number of columns (uses CSS grid) */
  cols?: number | string
}

/**
 * Grid container for TUI layout.
 * Children should be GridCell components.
 */
export function TuiGrid({ children, className, cols = 1 }: TuiGridProps) {
  const gridCols = typeof cols === "number" 
    ? `repeat(${cols}, minmax(0, 1fr))` 
    : cols

  return (
    <div 
      className={cn("tui-grid", className)}
      style={{ gridTemplateColumns: gridCols }}
    >
      {children}
    </div>
  )
}

interface TuiSectionProps {
  children: React.ReactNode
  className?: string
  /** Show crosses at outer corners */
  showCorners?: boolean
  /** Section ID for anchor links */
  id?: string
}

/**
 * Full-width section with top/bottom borders.
 * Corner crosses are disabled by default since sections span full viewport.
 */
export function TuiSection({ children, className, showCorners = false, id }: TuiSectionProps) {
  return (
    <section id={id} className={cn("tui-section relative", className)}>
      {showCorners && (
        <>
          <Cross className="tui-corner-tl" />
          <Cross className="tui-corner-tr" />
          <Cross className="tui-corner-bl" />
          <Cross className="tui-corner-br" />
        </>
      )}
      {children}
    </section>
  )
}

interface TuiRowProps {
  children: React.ReactNode
  className?: string
}

/**
 * A row in the TUI grid with border-bottom.
 * Adjacent rows share borders (no double lines).
 */
export function TuiRow({ children, className }: TuiRowProps) {
  return (
    <div className={cn("border-b border-border", className)}>
      {children}
    </div>
  )
}
