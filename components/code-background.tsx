"use client"

import { useEffect, useRef } from "react"

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  depth: number // 0 (far) -> 1 (near), drives size/opacity/parallax
  gold: boolean
}

type Orb = {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
}

const GOLD = "231, 197, 110"
const BLUE = "120, 160, 235"
const LINK_DISTANCE = 150
const MOUSE_DISTANCE = 210
const BASE = "#0b0e16"

export function CodeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let width = 0
    let height = 0
    let dpr = 1
    let particles: Particle[] = []
    let orbs: Orb[] = []
    let time = 0
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false }

    const paintBase = () => {
      // Vertical depth gradient instead of a flat fill for richness.
      const g = ctx.createLinearGradient(0, 0, 0, height)
      g.addColorStop(0, "#0d1019")
      g.addColorStop(0.55, BASE)
      g.addColorStop(1, "#090b12")
      ctx.fillStyle = g
      ctx.fillRect(0, 0, width, height)
    }

    const setup = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const parent = canvas.parentElement
      width = parent ? parent.clientWidth : window.innerWidth
      height = parent ? parent.clientHeight : window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(110, Math.floor((width * height) / 14000))
      particles = Array.from({ length: count }, () => {
        const depth = Math.random()
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (0.25 + depth * 0.55),
          vy: (Math.random() - 0.5) * (0.25 + depth * 0.55),
          radius: 0.6 + depth * 2.2,
          depth,
          gold: Math.random() < 0.7,
        }
      })

      // Slow drifting aurora orbs (gold + blue) for atmospheric depth.
      orbs = [
        { x: width * 0.78, y: height * 0.22, vx: 0.05, vy: 0.03, radius: Math.max(width, height) * 0.4, color: BLUE },
        { x: width * 0.2, y: height * 0.78, vx: -0.04, vy: -0.025, radius: Math.max(width, height) * 0.36, color: GOLD },
        { x: width * 0.5, y: height * 0.05, vx: 0.03, vy: 0.02, radius: Math.max(width, height) * 0.32, color: BLUE },
      ]
      paintBase()
    }

    setup()

    let frameId = 0
    let running = false
    let lastTime = 0

    const drawOrbs = () => {
      ctx.globalCompositeOperation = "lighter"
      for (const o of orbs) {
        o.x += o.vx
        o.y += o.vy
        if (o.x < -o.radius * 0.5 || o.x > width + o.radius * 0.5) o.vx *= -1
        if (o.y < -o.radius * 0.5 || o.y > height + o.radius * 0.5) o.vy *= -1
        const grad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.radius)
        grad.addColorStop(0, `rgba(${o.color}, 0.10)`)
        grad.addColorStop(1, `rgba(${o.color}, 0)`)
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(o.x, o.y, o.radius, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalCompositeOperation = "source-over"
    }

    const drawScene = (deltaScale: number) => {
      paintBase()
      drawOrbs()

      // Smooth the cursor toward its target for a fluid parallax feel.
      if (mouse.active) {
        mouse.x += (mouse.tx - mouse.x) * 0.08 * deltaScale
        mouse.y += (mouse.ty - mouse.y) * 0.08 * deltaScale
      }

      time += 0.01 * deltaScale

      for (const p of particles) {
        p.x += p.vx * deltaScale
        p.y += p.vy * deltaScale

        if (p.x < -10) p.x = width + 10
        else if (p.x > width + 10) p.x = -10
        if (p.y < -10) p.y = height + 10
        else if (p.y > height + 10) p.y = -10

        if (mouse.active) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const dist = Math.hypot(dx, dy)
          if (dist < MOUSE_DISTANCE && dist > 0.001) {
            // Near particles react more strongly -> depth parallax.
            const force = (1 - dist / MOUSE_DISTANCE) * (0.3 + p.depth * 0.7) * deltaScale
            p.x += (dx / dist) * force
            p.y += (dy / dist) * force
          }
        }
      }

      // Connecting lines — use a spatial hash grid so each particle only tests
      // neighbours in adjacent cells instead of the full O(n^2) set.
      const cellSize = LINK_DISTANCE
      const cols = Math.max(1, Math.ceil(width / cellSize))
      const rows = Math.max(1, Math.ceil(height / cellSize))
      const grid: number[][] = Array.from({ length: cols * rows }, () => [])
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const cx = Math.min(cols - 1, Math.max(0, Math.floor(p.x / cellSize)))
        const cy = Math.min(rows - 1, Math.max(0, Math.floor(p.y / cellSize)))
        grid[cy * cols + cx].push(i)
      }

      const linkSq = LINK_DISTANCE * LINK_DISTANCE
      for (let cy = 0; cy < rows; cy++) {
        for (let cx = 0; cx < cols; cx++) {
          const cell = grid[cy * cols + cx]
          if (cell.length === 0) continue
          // Compare against this cell + the 4 forward-adjacent cells to avoid
          // double-counting pairs while still covering every neighbour.
          for (let n = 0; n < 5; n++) {
            const nx = cx + (n === 1 ? 1 : n === 3 ? 1 : n === 4 ? -1 : 0)
            const ny = cy + (n === 2 ? 1 : n === 3 ? 1 : n === 4 ? 1 : 0)
            if (nx < 0 || nx >= cols || ny < 0 || ny >= rows) continue
            const other = grid[ny * cols + nx]
            if (other.length === 0) continue
            for (let ai = 0; ai < cell.length; ai++) {
              const a = particles[cell[ai]]
              for (let bi = n === 0 ? ai + 1 : 0; bi < other.length; bi++) {
                const b = particles[other[bi]]
                const dx = a.x - b.x
                const dy = a.y - b.y
                const distSq = dx * dx + dy * dy
                if (distSq < linkSq) {
                  const dist = Math.sqrt(distSq)
                  const depthAvg = (a.depth + b.depth) / 2
                  const opacity = (1 - dist / LINK_DISTANCE) * (0.12 + depthAvg * 0.22)
                  ctx.strokeStyle = `rgba(${GOLD}, ${opacity})`
                  ctx.lineWidth = 0.5 + depthAvg * 0.7
                  ctx.beginPath()
                  ctx.moveTo(a.x, a.y)
                  ctx.lineTo(b.x, b.y)
                  ctx.stroke()
                }
              }
            }
          }
        }
      }

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        if (mouse.active) {
          const dx = a.x - mouse.x
          const dy = a.y - mouse.y
          const dist = Math.hypot(dx, dy)
          if (dist < MOUSE_DISTANCE) {
            const opacity = (1 - dist / MOUSE_DISTANCE) * 0.5
            ctx.strokeStyle = `rgba(${GOLD}, ${opacity})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()
          }
        }
      }

      // Nodes with depth-based glow + gentle twinkle
      for (const p of particles) {
        const color = p.gold ? GOLD : BLUE
        const twinkle = 0.7 + Math.sin(time * 2 + p.x * 0.02) * 0.3
        ctx.shadowColor = `rgba(${color}, ${0.6 * p.depth})`
        ctx.shadowBlur = 4 + p.depth * 8
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color}, ${(0.35 + p.depth * 0.55) * twinkle})`
        ctx.fill()
      }
      ctx.shadowBlur = 0
    }

    const draw = (now: number) => {
      frameId = requestAnimationFrame(draw)
      if (!lastTime) lastTime = now
      const delta = now - lastTime
      lastTime = now
      const deltaScale = Math.min(delta / (1000 / 60), 2.5)
      drawScene(deltaScale)
    }

    const start = () => {
      if (running || prefersReduced) return
      running = true
      lastTime = 0
      frameId = requestAnimationFrame(draw)
    }

    const stop = () => {
      if (!running) return
      running = false
      cancelAnimationFrame(frameId)
    }

    if (prefersReduced) {
      drawScene(0)
    }

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.tx = e.clientX - rect.left
      mouse.ty = e.clientY - rect.top
      if (!mouse.active) {
        mouse.x = mouse.tx
        mouse.y = mouse.ty
      }
      mouse.active = true
    }
    const handlePointerLeave = () => {
      mouse.active = false
      mouse.x = -9999
      mouse.y = -9999
      mouse.tx = -9999
      mouse.ty = -9999
    }
    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerleave", handlePointerLeave)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !document.hidden) start()
        else stop()
      },
      { threshold: 0 },
    )
    observer.observe(canvas)

    const handleVisibility = () => {
      if (document.hidden) stop()
      else start()
    }
    document.addEventListener("visibilitychange", handleVisibility)

    let resizeTimer: ReturnType<typeof setTimeout>
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        const wasRunning = running
        stop()
        setup()
        if (prefersReduced) drawScene(0)
        else if (wasRunning) start()
      }, 150)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      stop()
      observer.disconnect()
      document.removeEventListener("visibilitychange", handleVisibility)
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerleave", handlePointerLeave)
      window.removeEventListener("resize", handleResize)
      clearTimeout(resizeTimer)
    }
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#0b0e16]" aria-hidden>
      <canvas ref={canvasRef} className="size-full" />
      {/* Perspective grid that fades toward the horizon */}
      <div
        className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgba(231,197,110,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(231,197,110,0.4)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent_75%)]"
      />
      {/* Vignette / fade so foreground content stays readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0e16]/20 via-[#0b0e16]/45 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0b0e16_95%)]" />
    </div>
  )
}
