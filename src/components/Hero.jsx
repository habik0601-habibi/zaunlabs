import React, { Suspense, lazy, useCallback } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

const SCENE_BG   = '#C8E5F8'
const OVERLAY_BG = '#CAE6F9'

export default function Hero() {

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

    // ─────────────────────────────────────────────────────────────────────
    // 2. RESOLUTION — go through Spline's Three.js renderer properly
    // ─────────────────────────────────────────────────────────────────────
    const dpr = window.devicePixelRatio || 1
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
      gl?.setPixelRatio?.(window.devicePixelRatio || 1)
      gl?.setSize?.(w, h)
    }
    window.addEventListener('resize', onResize)

    // ─────────────────────────────────────────────────────────────────────
    // 3. BADGE REMOVAL — skill Fix 1: MutationObserver
    //    Completely destroys the element every time it appears.
    //    No cover div — the element is gone from the DOM entirely.
    // ─────────────────────────────────────────────────────────────────────
    const killBadge = () => {
      document.querySelectorAll('a[href*="spline.design"]').forEach(el => el.remove())
    }
    killBadge()
    // Observe the Spline canvas container specifically (faster than body)
    const mo = new MutationObserver(killBadge)
    mo.observe(canvas.parentElement ?? document.body, { childList: true, subtree: true })
    // Also run a short RAF loop right after load when badge is most likely injected
    let rafCount = 0
    const rafLoop = () => {
      killBadge()
      if (rafCount++ < 60) requestAnimationFrame(rafLoop) // ~1 second at 60fps
    }
    requestAnimationFrame(rafLoop)

    return () => {
      canvas.removeEventListener('wheel', onWheel, { capture: true })
      window.removeEventListener('resize', onResize)
      mo.disconnect()
    }
  }, [])

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden"
      style={{ height: '100vh', background: SCENE_BG }}
    >

      {/* ── SPLINE SCENE ── */}
      <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        <Suspense
          fallback={
            <div style={{
              width: '100%', height: '100%',
              background: `linear-gradient(180deg, #B8D8F8 0%, ${SCENE_BG} 50%, #fff 100%)`,
            }} />
          }
        >
          <Spline
            scene="https://prod.spline.design/pCom4TnmiY3FXRVH/scene.splinecode"
            onLoad={handleLoad}
            style={{ width: '100%', height: '100%' }}
          />
        </Suspense>
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
        className="absolute inset-y-0 left-0 pointer-events-none"
        style={{
          zIndex: 1,
          width: '62%',
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
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-[520px]" style={{ paddingTop: '64px' }}>

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 rounded-full
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
      
      {/* 
        ── SPLINE BADGE COVER ──
        Final fallback cover to absolutely hide the Spline watermark if it somehow 
        evades CSS and JS removal.
      */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '200px',
          height: '55px',
          background: '#D6ECFF',
          zIndex: 10,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

    </section>
  )
}
