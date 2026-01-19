// Google Analytics - Basic implementation
// Replace G-XXXXXXXXXX with your actual GA4 measurement ID

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

export const initGA = (measurementId: string) => {
  // Load Google Analytics script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)

  // Initialize gtag
  window.dataLayer = window.dataLayer || []
  window.gtag = function() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', measurementId, {
    page_title: document.title,
    page_location: window.location.href
  })
}

// Track page views
export const trackPageView = (pagePath: string) => {
  if (window.gtag) {
    window.gtag('config', 'G-XXXXXXXXXX', {
      page_path: pagePath
    })
  }
}

// Track events
export const trackEvent = (action: string, category: string, label?: string) => {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label
    })
  }
}