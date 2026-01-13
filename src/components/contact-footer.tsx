import { useState } from "react"
import { Dither } from "@/components/dither"

interface ContactFooterProps {
  className?: string
}

export function ContactFooter({ className }: ContactFooterProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    
    // Simulate form submission - replace with actual endpoint
    await new Promise(resolve => setTimeout(resolve, 1000))
    setStatus("sent")
    setFormData({ name: "", email: "", message: "" })
    
    // Reset status after 3 seconds
    setTimeout(() => setStatus("idle"), 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <footer id="contacto" className={className}>
      {/* Dither section - respects container width (same as container-content: 64rem) */}
      <div className="container-content relative">
        {/* Dither Background - white color, no mouse interaction */}
        <Dither
          waveAmplitude={0}
          waveFrequency={0}
          waveSpeed={0.02}
          waveColor={[1, 1, 1]}
          colorNum={5}
          pixelSize={2}
          enableMouseInteraction={false}
          mouseRadius={0.2}
        />
        
        {/* Content overlay with semi-transparent background */}
        <div className="relative z-10 p-6 md:p-8">
          {/* Two column layout: header left, form right */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-8">
            {/* Left: Header */}
            <div className="flex flex-col justify-center">
              <span className="text-label">contacto</span>
              <h2 className="text-heading mt-2">Trabajemos juntos</h2>
              <p className="text-body text-muted-foreground mt-4">
                Hablemos sobre tu próximo proyecto.
              </p>
              
              {/* Alternative contact methods */}
              <div className="mt-6 space-y-2 text-small">
                <a 
                  href="mailto:hola@ejemplo.com" 
                  className="block text-muted-foreground link-hover"
                >
                  <span className="text-accent">-&gt;</span> hola@ejemplo.com
                </a>
                <a 
                  href="https://github.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-muted-foreground link-hover"
                >
                  <span className="text-accent">-&gt;</span> github
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-muted-foreground link-hover"
                >
                  <span className="text-accent">-&gt;</span> linkedin
                </a>
              </div>
            </div>

            {/* Right: Form with background */}
            <div className="bg-background/90 backdrop-blur-sm border border-border p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="text-label block mb-2">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-background border border-border px-3 py-2 text-small text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-label block mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-background border border-border px-3 py-2 text-small text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="text-label block mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full bg-background border border-border px-3 py-2 text-small text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors resize-none"
                    placeholder="Contame sobre tu proyecto..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full tui-button justify-center py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "idle" && (
                    <>
                      <span className="text-accent">$</span> enviar_mensaje
                    </>
                  )}
                  {status === "sending" && (
                    <>
                      <span className="text-accent">$</span> enviando<span className="cursor-blink"></span>
                    </>
                  )}
                  {status === "sent" && (
                    <>
                      <span className="text-accent">+</span> mensaje enviado!
                    </>
                  )}
                  {status === "error" && (
                    <>
                      <span className="text-red-500">!</span> error al enviar
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright - outside dither area */}
      <div className="container-content border-t border-border">
        <div className="px-6 py-4 flex items-center justify-between text-small text-muted-foreground">
          <span>(C) 2025 Ramiro</span>
          <span>Hecho con React + Vite</span>
        </div>
      </div>
    </footer>
  )
}
