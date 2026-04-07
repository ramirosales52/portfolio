import { createContext, useContext, useState, useEffect, useCallback } from "react"

type Theme = "dark" | "light"

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function getInitialTheme(): Theme {
  // The inline script in index.html already applied the correct class,
  // so we just read what it decided.
  if (document.documentElement.classList.contains("light")) {
    return "light"
  }
  return "dark"
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    if (theme === "light") {
      root.classList.add("light")
    } else {
      root.classList.remove("light")
    }
    localStorage.setItem("theme", theme)

    // Sync theme-color meta tag
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) {
      meta.setAttribute("content", theme === "light" ? "#fafafa" : "#000000")
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    const root = document.documentElement
    // Enable transition class briefly for the fade effect
    root.classList.add("theme-transition")
    setTheme(prev => prev === "dark" ? "light" : "dark")
    // Remove after transition completes so it doesn't affect normal interactions
    window.setTimeout(() => {
      root.classList.remove("theme-transition")
    }, 350)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}
