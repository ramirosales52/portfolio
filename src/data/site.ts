export const site = {
  name: "Ramiro Rosales",
  shortName: "Ramiro",
  role: "Desarrollador Full-Stack",
  email: "ramirosales52@gmail.com",
  github: "https://github.com/ramirosales52",
  linkedin: "https://www.linkedin.com/in/ramiro-rosales1/",
  cv: "/cv.pdf",
  cvEn: "/cv-en.pdf",
} as const

export const mailtoHref = `mailto:${site.email}`

export function contactMailtoHref(subject: string, body: string) {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
