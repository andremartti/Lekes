import { useEffect } from 'react'

/** Activa las apariciones suaves de los elementos con [data-reveal]. */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/** Devuelve el id de la sección visible para resaltar la navegación. */
export function observeActiveSection(ids: string[], onChange: (id: string) => void) {
  const sections = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null)
  const io = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((e) => e.isIntersecting)
      if (visible.length) onChange(visible[0].target.id)
    },
    { rootMargin: '-45% 0px -50% 0px' },
  )
  sections.forEach((s) => io.observe(s))
  return () => io.disconnect()
}
