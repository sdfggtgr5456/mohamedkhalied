"use client"

import { useEffect, useRef, type ElementType, type ReactNode } from "react"

/**
 * Reveal — a reusable, performant scroll-reveal wrapper used site-wide.
 *
 * Why a wrapper instead of per-component observers:
 *  - One reliable implementation, identical timing everywhere.
 *  - Uses a negative-bottom `rootMargin` so it fires as soon as the block
 *    enters the lower part of the viewport. This is reliable on tall mobile
 *    layouts (where a high intersection threshold over a long section often
 *    never triggers) as well as on wide desktop screens.
 *  - Staggers every descendant carrying the `.reveal` class via CSS
 *    `transition-delay`, and animates with GPU-friendly transform/opacity/blur.
 *  - Honors `prefers-reduced-motion` by showing everything immediately.
 *
 * Usage: wrap a section's content in <Reveal> and add `reveal` (optionally
 * `reveal-left` / `reveal-right`) to the children you want to animate in.
 */
export function Reveal({
  children,
  className,
  stagger = 90,
  as: Tag = "div",
  once = true,
}: {
  children: ReactNode
  className?: string
  /** Delay between each `.reveal` child, in ms. */
  stagger?: number
  as?: ElementType
  /** Reveal only once (default) or re-trigger every time it enters view. */
  once?: boolean
}) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const items = Array.from(el.querySelectorAll<HTMLElement>(".reveal"))
    // If the wrapper itself should animate, include it as the first item.
    const targets = el.classList.contains("reveal") ? [el, ...items] : items
    targets.forEach((item, i) => {
      item.style.transitionDelay = `${i * stagger}ms`
    })

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      targets.forEach((item) => item.classList.add("is-visible"))
      return
    }

    const show = () => targets.forEach((item) => item.classList.add("is-visible"))
    const hide = () => targets.forEach((item) => item.classList.remove("is-visible"))

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show()
            if (once) {
              observer.disconnect()
              break
            }
          } else if (!once) {
            hide()
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px -12% 0px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [stagger, once])

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  )
}
