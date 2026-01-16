import { useState, useCallback, useRef, useEffect } from "react"

interface ScrambleTextProps {
  text: string
  className?: string
  as?: "span" | "a"
  href?: string
  onClick?: () => void
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*"

export function ScrambleText({ 
  text, 
  className, 
  as: Component = "span",
  href,
  onClick 
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text.toUpperCase())
  const [isAnimating, setIsAnimating] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const iterationRef = useRef(0)

  const scramble = useCallback(() => {
    if (isAnimating) return
    
    setIsAnimating(true)
    iterationRef.current = 0
    const finalText = text.toUpperCase()
    
    intervalRef.current = setInterval(() => {
      setDisplayText(
        finalText
          .split("")
          .map((char, index) => {
            // Keep spaces as spaces
            if (char === " ") return " "
            
            // Reveal characters progressively
            if (index < iterationRef.current) {
              return finalText[index]
            }
            
            // Random character for unrevealed positions
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join("")
      )
      
      iterationRef.current += 0.5
      
      // Stop when all characters are revealed
      if (iterationRef.current >= finalText.length) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setDisplayText(finalText)
        setIsAnimating(false)
      }
    }, 30)
  }, [text, isAnimating])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const props = {
    className,
    onMouseEnter: scramble,
    onClick,
    ...(Component === "a" ? { href } : {})
  }

  return <Component {...props}>{displayText}</Component>
}
