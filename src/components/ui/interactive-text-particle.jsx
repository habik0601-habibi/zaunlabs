import React, { useEffect, useRef } from 'react'

/* ParticleTextEffect — text rasterised into particles that scatter away from
   the pointer and spring back. Converted from TSX to JSX (this is a Vite + JSX
   project, not TypeScript). The particle physics are unchanged from the
   original; four things were adapted so it works inside a card rather than
   as a full-screen background:

   1. The canvas sizes itself from its own bounding box via ResizeObserver,
      not `window.innerWidth/innerHeight`.
   2. It renders at devicePixelRatio, so the dots stay crisp on retina.
   3. The font size is fitted to the box (height first, then shrunk to fit
      the width) instead of being derived from character count, which
      overflowed on short strings.
   4. The rAF loop stops once every particle has settled and the pointer has
      left, instead of running forever after the first pointer move. It also
      never starts under `prefers-reduced-motion`. */

const rand = (max = 1, min = 0) => min + Math.random() * (max - min)

function drawParticle(ctx, p) {
  ctx.fillStyle = `rgb(${p.rgb[0]},${p.rgb[1]},${p.rgb[2]})`
  ctx.beginPath()
  ctx.arc(p.cx, p.cy, p.r, 0, 2 * Math.PI)
  ctx.fill()
}

/** Push away from the pointer, then ease back toward the origin. */
function moveParticle(p, radius, hasPointer, pointer) {
  let moved = false

  if (hasPointer && pointer.x !== undefined && pointer.y !== undefined) {
    const dx = p.cx - pointer.x
    const dy = p.cy - pointer.y
    const dist = Math.hypot(dx, dy)
    if (dist < radius && dist > 0) {
      const force = Math.min(p.f, ((radius - dist) / dist) * 2)
      p.cx += (dx / dist) * force
      p.cy += (dy / dist) * force
      moved = true
    }
  }

  const odx = p.ox - p.cx
  const ody = p.oy - p.cy
  const od = Math.hypot(odx, ody)
  if (od > 1) {
    const restore = Math.min(od * 0.1, 3)
    p.cx += (odx / od) * restore
    p.cy += (ody / od) * restore
    moved = true
  }

  return moved
}

/**
 * @param {object} props
 * @param {string} [props.text]              The word to rasterise.
 * @param {string[]} [props.colors]          Gradient stops, hex with or without `#`.
 * @param {string} [props.className]
 * @param {number} [props.animationForce=80] Peak push strength per particle.
 * @param {number} [props.particleDensity=4] Sample every Nth pixel — higher is sparser.
 * @param {string} [props.fontFamily]
 * @param {number} [props.fontScale=0.62]    Cap height as a fraction of the box height.
 * @param {boolean} [props.hideCursor=false] Hide the cursor over the canvas.
 * @param {string} [props.imageSrc]          Optional mark drawn left of the text and rasterised with it.
 * @param {number} [props.imageScale=1.5]    Mark height as a multiple of the font size.
 * @param {number} [props.imageGap=0.35]     Space between mark and text, as a multiple of the font size.
 */
export function ParticleTextEffect({
  text = 'HOVER!',
  colors = ['ffad70', 'f7d297', 'edb9a1', 'e697ac', 'b38dca', '9c76db', '705cb5', '43428e', '2c2142'],
  className = '',
  animationForce = 80,
  particleDensity = 4,
  fontFamily = 'Plus Jakarta Sans, Verdana, sans-serif',
  fontScale = 0.62,
  hideCursor = false,
  imageSrc,
  imageScale = 1.5,
  imageGap = 0.35,
}) {
  const canvasRef = useRef(null)
  const ctxRef = useRef(null)
  const rafRef = useRef(null)
  const particlesRef = useRef([])
  const pointerRef = useRef({ x: undefined, y: undefined })
  const hasPointerRef = useRef(false)
  const radiusRef = useRef(100)
  const imgRef = useRef(null)

  // Read inside rAF without making the callbacks depend on every prop.
  const cfgRef = useRef(null)
  cfgRef.current = { text, colors, animationForce, particleDensity, fontFamily, fontScale, imageScale, imageGap }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctxRef.current = ctx

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const build = () => {
      const rect = canvas.getBoundingClientRect()
      if (!rect.width || !rect.height) return

      const cfg = cfgRef.current
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(rect.width * dpr)
      canvas.height = Math.round(rect.height * dpr)
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const img = imgRef.current
      const hasImg = !!img && img.naturalWidth > 0
      const aspect = hasImg ? img.naturalWidth / img.naturalHeight : 0
      const measureAt = (px) => {
        ctx.font = `900 ${px}px ${cfg.fontFamily}`
        return ctx.measureText(cfg.text).width
      }
      // Mark and gap both scale with the font size, so total width is linear
      // in it — one measure/scale pass is enough to fit the row.
      const extraAt = (px) => (hasImg ? px * (cfg.imageScale * aspect + cfg.imageGap) : 0)

      // Fit to the box: start from the height, shrink if the row overruns the width.
      let size = Math.max(8, Math.floor(canvas.height * cfg.fontScale))
      if (hasImg) size = Math.min(size, Math.floor((canvas.height * 0.84) / cfg.imageScale))

      let textW = measureAt(size)
      let total = textW + extraAt(size)
      const maxW = canvas.width * 0.88
      if (total > maxW) {
        size = Math.max(8, Math.floor((size * maxW) / total))
        textW = measureAt(size)
        total = textW + extraAt(size)
      }
      ctx.font = `900 ${size}px ${cfg.fontFamily}`
      ctx.textAlign = 'left'
      ctx.textBaseline = 'middle'

      const midY = canvas.height / 2
      const rowX = 0.5 * (canvas.width - total)
      const markH = hasImg ? size * cfg.imageScale : 0
      const markW = hasImg ? markH * aspect : 0
      const textX = rowX + markW + (hasImg ? size * cfg.imageGap : 0)

      radiusRef.current = Math.max(50 * dpr, size * 1.15)

      // The mark keeps its own pixels; only the text gets the gradient.
      if (hasImg) ctx.drawImage(img, rowX, midY - markH / 2, markW, markH)

      const grad = ctx.createLinearGradient(textX, midY - size * 0.6, textX + textW, midY + size * 0.6)
      const n = Math.max(1, cfg.colors.length - 1)
      cfg.colors.forEach((c, i) =>
        grad.addColorStop(i / n, c.startsWith('#') ? c : `#${c}`),
      )
      ctx.fillStyle = grad
      ctx.fillText(cfg.text, textX, midY)

      const contentH = Math.max(markH, size * 1.45)
      const boxX = Math.max(0, Math.floor(rowX - 4))
      const boxY = Math.max(0, Math.floor(midY - contentH / 2 - 4))
      const boxW = Math.min(canvas.width - boxX, Math.ceil(total + 8))
      const boxH = Math.min(canvas.height - boxY, Math.ceil(contentH + 8))

      // Rasterise the glyphs into particles, then repaint as dots.
      const step = Math.max(1, Math.round(cfg.particleDensity * dpr))
      let data
      try {
        data = ctx.getImageData(boxX, boxY, boxW, boxH).data
      } catch {
        return // canvas tainted by a cross-origin mark; leave the flat render up
      }
      const particles = []
      for (let py = 0; py < boxH; py += step) {
        for (let px = 0; px < boxW; px += step) {
          const i = (py * boxW + px) * 4
          if (data[i + 3] > 128) {
            particles.push({
              ox: boxX + px,
              oy: boxY + py,
              cx: boxX + px,
              cy: boxY + py,
              r: rand(step * 0.72, step * 0.34),
              f: rand(cfg.animationForce + 15, cfg.animationForce - 15),
              rgb: [data[i], data[i + 1], data[i + 2]],
            })
          }
        }
      }
      particlesRef.current = particles

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => drawParticle(ctx, p))
    }

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let moving = false
      for (const p of particlesRef.current) {
        if (moveParticle(p, radiusRef.current, hasPointerRef.current, pointerRef.current)) moving = true
        drawParticle(ctx, p)
      }
      // Park the loop once everything has settled and the pointer has left.
      if (moving || hasPointerRef.current) rafRef.current = requestAnimationFrame(tick)
      else rafRef.current = null
    }

    const start = () => {
      if (reduced) return
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(tick)
    }
    canvas.__startParticles = start

    if (imageSrc) {
      const img = new Image()
      img.decoding = 'async'
      img.onload = () => { imgRef.current = img; build() }
      img.onerror = () => { imgRef.current = null; build() }
      img.src = imageSrc
    } else {
      imgRef.current = null
    }

    build()

    const ro = new ResizeObserver(build)
    ro.observe(canvas)
    // Web fonts land after first paint and change the glyph raster.
    if (document.fonts?.ready) document.fonts.ready.then(build).catch(() => {})

    return () => {
      ro.disconnect()
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
      delete canvas.__startParticles
    }
  }, [text, colors, animationForce, particleDensity, fontFamily, fontScale, imageSrc, imageScale, imageGap])

  const onPointerMove = (e) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    pointerRef.current.x = (e.clientX - rect.left) * (canvas.width / rect.width)
    pointerRef.current.y = (e.clientY - rect.top) * (canvas.height / rect.height)
    hasPointerRef.current = true
    canvas.__startParticles?.()
  }

  const onPointerLeave = () => {
    hasPointerRef.current = false
    pointerRef.current.x = undefined
    pointerRef.current.y = undefined
    canvasRef.current?.__startParticles?.()
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`h-full w-full ${hideCursor ? 'cursor-none' : ''} ${className}`}
      onPointerMove={onPointerMove}
      onPointerEnter={() => { hasPointerRef.current = true }}
      onPointerLeave={onPointerLeave}
    />
  )
}

export default ParticleTextEffect
