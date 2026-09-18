import React, { Suspense, lazy, useCallback, useEffect, useState } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

const SCENE_BG   = '#C8E5F8'
const OVERLAY_BG = '#CAE6F9'
const SCENE_URL  = 'https://prod.spline.design/hRW5fb7fi5dByJ9T/scene.splinecode'
const MOBILE_BREAKPOINT = 768 // matches Tailwind's `md`

export default function Hero() {
  // Cubes are a heavy WebGL scene that never worked well as a touch surface
  // (fighting page scroll, no real drag affordance) — skip loading it on
  // mobile entirely rather than fight those interactions.
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT
  )

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const handleLoad = useCallback((splineApp) => {
    if (!splineApp) return
    const canvas = splineApp.canvas
    if (!canvas) return

    // ─────────────────────────────────────────────────────────────────────
    // 1. SCROLL FIX (Skill: COMMON_PROBLEMS.md §1)
    //
    //    Using { capture: true } means our handler runs BEFORE Spline's own
    //    wheel handler. stopImmediatePropagation() then prevents Spline's
    //    handler from ever executing — no camera-zoom fighting our scroll.
    //    document.documentElement.scrollTop is the fastest, zero-jank path.
    // ─────────────────────────────────────────────────────────────────────
    const onWheel = (e) => {
      e.stopImmediatePropagation()
    }
    canvas.addEventListener('wheel', onWheel, { passive: true, capture: true })

    // `wheel` never fires on a phone. Spline's orbit controls consume the
    // touch stream instead, so a vertical drag rotated the camera rather than
    // scrolling the page — the hero became a scroll trap. Same trick as above:
    // capture first, stop Spline's handlers from ever seeing the event. These
    // are passive, so they cannot themselves block the browser's scroll.
    //
    // Only touch-originated pointer events are blocked here — pointerdown/
    // pointermove also fire for mouse input, and blocking those unconditionally
    // silently kills mouse-drag interaction with the scene (cubes stop being
    // draggable, though the idle spin animation keeps playing).
    const onTouch = (e) => {
      if (e.type === 'pointerdown' || e.type === 'pointermove') {
        if (e.pointerType !== 'touch') return
      }
      e.stopImmediatePropagation()
    }
    for (const type of ['touchstart', 'touchmove', 'pointerdown', 'pointermove']) {
      canvas.addEventListener(type, onTouch, { passive: true, capture: true })
    }

    // ─────────────────────────────────────────────────────────────────────
    // 2. RESOLUTION — go through Spline's Three.js renderer properly
    // ─────────────────────────────────────────────────────────────────────
    const pixelRatio = () =>
      window.innerWidth < 768
        ? Math.min(window.devicePixelRatio || 1, 1.5)
        : (window.devicePixelRatio || 1)

    const dpr = pixelRatio()
    if (typeof splineApp.setSize === 'function') {
      splineApp.setSize(window.innerWidth, window.innerHeight)
    }
    const gl = splineApp._renderer ?? splineApp.renderer ?? null
    if (gl) {
      gl.setPixelRatio?.(dpr)
      gl.setSize?.(window.innerWidth, window.innerHeight)
    }
    const onResize = () => {
      const w = window.innerWidth, h = window.innerHeight
      splineApp.setSize?.(w, h)
      gl?.setPixelRatio?.(pixelRatio())
      gl?.setSize?.(w, h)
    }
    window.addEventListener('resize', onResize)

    // ─────────────────────────────────────────────────────────────────────
    // 3. WATERMARK REMOVAL
    //
    //    NOTE: the "Built with Spline" badge is NOT a DOM element in runtime
    //    v1.x — it is a post-processing pass (`logoOverlayPass`) composited
    //    into the WebGL framebuffer by the EffectComposer, textured from the
    //    scene bundle's `shared.images.SplineWatermark`. CSS and
    //    MutationObservers therefore cannot touch it; only the render
    //    pipeline can. (The skill guide's `a[href*="spline.design"]` advice
    //    describes an older runtime and no longer applies.)
    //
    //    The runtime binds the texture via `pipeline.setWatermark(tex)` after
    //    awaiting the image load, which can resolve AFTER onLoad fires — so
    //    disabling the pass once is not enough. We also stub out the setter
    //    so a late call cannot switch it back on.
    //
    //    All private internals, hence fully optional-chained: a runtime
    //    upgrade that renames them should degrade to "badge visible", never
    //    to a crashed hero.
    // ─────────────────────────────────────────────────────────────────────
    const pipeline = gl?.pipeline
    if (pipeline) {
      pipeline.setWatermark?.(null)          // disables the pass if already bound
      pipeline.setWatermark = () => {}        // and blocks any later re-binding
      if (pipeline.logoOverlayPass) pipeline.logoOverlayPass.enabled = false
      pipeline.updateRenderToScreen?.()
      splineApp.requestRender?.()            // scene may render on-demand
    }

    return () => {
      canvas.removeEventListener('wheel', onWheel, { capture: true })
      for (const type of ['touchstart', 'touchmove', 'pointerdown', 'pointermove']) {
        canvas.removeEventListener(type, onTouch, { capture: true })
      }
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden"
      style={{ height: '100vh', background: SCENE_BG }}
    >

      {/* ── SPLINE SCENE (desktop/tablet only — see isMobile above) ── */}
      <div className="spline-layer absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        {isMobile ? (
          <div style={{
            width: '100%', height: '100%',
            background: `linear-gradient(180deg, #B8D8F8 0%, ${SCENE_BG} 50%, #fff 100%)`,
          }} />
        ) : (
          <Suspense
            fallback={
              <div style={{
                width: '100%', height: '100%',
                background: `linear-gradient(180deg, #B8D8F8 0%, ${SCENE_BG} 50%, #fff 100%)`,
              }} />
            }
          >
            <Spline
              scene={SCENE_URL}
              onLoad={handleLoad}
              style={{ width: '100%', height: '100%' }}
            />
          </Suspense>
        )}
      </div>

      {/*
        ── TOP OVERLAY ──
        The Spline scene has "About Us" / "Contact Us" links baked into the
        top of its canvas. This full-width solid bar covers them completely.
        Height matches the navbar (64px) + a bit of clearance.
      */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{ height: '90px', background: OVERLAY_BG, zIndex: 2 }}
        aria-hidden="true"
      />

      {/*
        ── LEFT PANEL OVERLAY ──
        Covers Spline's baked-in hero text & buttons (left side of canvas).
        Solid for first 75% of width, then fades to transparent so cube shows.
      */}
      <div
        className="absolute inset-y-0 left-0 pointer-events-none w-full md:w-[62%]"
        style={{
          zIndex: 1,
          background: `linear-gradient(to right,
            ${OVERLAY_BG} 0%,
            ${OVERLAY_BG} 75%,
            transparent 100%
          )`,
        }}
        aria-hidden="true"
      />

      {/* ── CRISP HTML TEXT ── */}
      <div
        className="absolute inset-0 flex items-center"
        style={{ zIndex: 3, pointerEvents: 'none' }}
      >
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-10 lg:px-16">
          <div className="max-w-[520px] pt-20 sm:pt-16">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-5 sm:mb-6 rounded-full
                            border border-blue-300/60 bg-white/55 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full animate-pulse flex-shrink-0"
                    style={{ background: '#005498' }} />
              <span className="text-[11px] font-mono font-bold tracking-widest uppercase"
                    style={{ color: '#005498' }}>
                Web Dev · AI Automation
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-extrabold leading-[1.07] tracking-tight mb-5"
              style={{
                fontFamily: "'Plus Jakarta Sans', Inter, sans-serif",
                fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
                color: '#003366',
              }}
            >
              Build smarter.<br />
              <span style={{
                background: 'linear-gradient(135deg, #005498 0%, #0077cc 55%, #00aaff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Ship faster.
              </span>
            </h1>

            {/* Sub-copy */}
            <p
              className="leading-relaxed max-w-md"
              style={{
                fontFamily: "'Plus Jakarta Sans', Inter, sans-serif",
                fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
                color: '#004070',
                opacity: 0.8,
              }}
            >
              Zaunlabs builds high-performance web apps and autonomous AI agents
              that capture more leads, cut manual work, and launch in days — not months.
            </p>

          </div>
        </div>
      </div>

      {/* Bottom section fade */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '120px',
          zIndex: 4,
          background: 'linear-gradient(to bottom, transparent 0%, #D6ECFF 100%)',
        }}
        aria-hidden="true"
      />

    </section>
  )
}
