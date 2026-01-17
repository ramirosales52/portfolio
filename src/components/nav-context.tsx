import { createContext, useContext, useState, type ReactNode } from "react"

interface NavContextType {
  showLogoInNav: boolean
  setShowLogoInNav: (show: boolean) => void
  activeSection: string
  setActiveSection: (section: string) => void
}

const NavContext = createContext<NavContextType | null>(null)

export function NavProvider({ children }: { children: ReactNode }) {
  const [showLogoInNav, setShowLogoInNav] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  return (
    <NavContext.Provider value={{ showLogoInNav, setShowLogoInNav, activeSection, setActiveSection }}>
      {children}
    </NavContext.Provider>
  )
}

export function useNav() {
  const context = useContext(NavContext)
  if (!context) {
    throw new Error("useNav must be used within NavProvider")
  }
  return context
}
