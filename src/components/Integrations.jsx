import React, { forwardRef, useRef, useState, useEffect, useMemo } from 'react'
import {
  Figma, Github, ShoppingCart,
  Database, Braces, Webhook,
  Bot, Workflow, Send,
  Slack, CreditCard, ChartColumn,
  Sparkles,
} from 'lucide-react'
import { AnimatedBeam } from './ui/animated-beam'
import { cn } from '../lib/utils'

/* Integrations — a hub-and-spoke diagram with the Zaunlabs mark at the centre.
   Static by default; pulses only travel the spokes while the diagram is hovered. */

/** Tracks a media query so the outer tier can be *unmounted* on narrow screens.
    It cannot merely be `hidden`: a display:none node reports a zero rect and
    its beams would have nowhere sensible to attach. */
function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )
  useEffect(() => {
    const mq = window.matchMedia(query)
    setMatches(mq.matches)
    const onChange = (e) => setMatches(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return matches
}

const Node = forwardRef(({ icon: Icon, color, label, className }, ref) => (
  <div
    ref={ref}
    title={label}
    aria-label={label}
    className={cn(
      'z-10 flex size-12 sm:size-14 shrink-0 items-center justify-center rounded-full',
      'border border-blue-200/70 bg-white',
      'shadow-[0_3px_16px_-5px_rgba(13,40,81,0.4)]',
      'transition-transform duration-500 group-hover:scale-105',
      className,
    )}
  >
    <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.8} style={{ color }} />
  </div>
))
Node.displayName = 'Node'

/** Crosshair ticks at the hub's corners, echoing a design-tool selection box. */
const Tick = ({ className }) => (
  <span
    aria-hidden="true"
    className={cn('absolute h-2 w-2 text-blue-300/80', className)}
    style={{
      backgroundImage:
        'linear-gradient(currentColor,currentColor), linear-gradient(currentColor,currentColor)',
      backgroundSize: '100% 1px, 1px 100%',
      backgroundPosition: 'center, center',
      backgroundRepeat: 'no-repeat',
    }}
  />
)

const LEFT_OUTER = [
  { icon: Figma, color: '#F24E1E', label: 'Figma' },
  { icon: Github, color: '#181717', label: 'GitHub' },
  { icon: ShoppingCart, color: '#6FA824', label: 'Shopify' },
]
const LEFT_INNER = [
  { icon: Database, color: '#2BA97A', label: 'Supabase / Postgres' },
  { icon: Braces, color: '#4A90D9', label: 'REST & GraphQL APIs' },
  { icon: Webhook, color: '#7C3AED', label: 'Webhooks' },
]
const RIGHT_INNER = [
  { icon: Bot, color: '#10B981', label: 'AI agents & LLMs' },
  { icon: Workflow, color: '#EA580C', label: 'n8n / Make / Zapier' },
  { icon: Send, color: '#0EA5E9', label: 'Email & CRM' },
]
const RIGHT_OUTER = [
  { icon: Slack, color: '#4A154B', label: 'Slack' },
  { icon: CreditCard, color: '#635BFF', label: 'Stripe' },
  { icon: ChartColumn, color: '#D9930A', label: 'Analytics' },
]

export default function Integrations() {
  const [hovered, setHovered] = useState(false)
  const [inView, setInView] = useState(false)
  const isWide = useMediaQuery('(min-width: 768px)')
  const isTouch = useMediaQuery('(hover: none)')

  const containerRef = useRef(null)
  const hubRef = useRef(null)

  // On a pointer device the diagram stays a still picture until hovered; on a
  // touch device there is no hover, so it plays whenever it is on screen.
  const active = hovered || (isTouch && inView)
  const leftOuterRefs = [useRef(null), useRef(null), useRef(null)]
  const leftInnerRefs = [useRef(null), useRef(null), useRef(null)]
  const rightInnerRefs = [useRef(null), useRef(null), useRef(null)]
  const rightOuterRefs = [useRef(null), useRef(null), useRef(null)]

  /* Every spoke fires on its own clock. Each gets a random head start, a random
     travel time and a random rest gap between pulses, so the twelve periods are
     all mutually irrational — they drift apart immediately and never resync into
     a visible rhythm. Generated once, so a re-render does not reshuffle them. */
  const timings = useMemo(() => {
    const rand = (min, max) => min + Math.random() * (max - min)
    return Array.from({ length: 12 }, () => {
      const pulseLength = rand(0.05, 0.09)
      const gap = rand(0.3, 2.2)          // dead time, as a fraction of the path
      const cross = rand(0.42, 0.72)      // seconds to travel the spoke itself
      return {
        pulseLength,
        gap,
        delay: rand(0, 1.6),
        duration: cross * (1 + pulseLength + gap) / (1 + pulseLength),
      }
    })
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el || !isTouch || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [isTouch])

  // Order is fixed so a beam keeps its timing when the outer tier drops out.
  const beam = (from, to) => ({ from, to })
  const beams = [
    ...leftInnerRefs.map((r) => beam(r, hubRef)),
    ...rightInnerRefs.map((r) => beam(r, hubRef)),
    ...(isWide
      ? [
          ...leftOuterRefs.map((r, i) => beam(r, leftInnerRefs[i])),
          ...rightOuterRefs.map((r, i) => beam(r, rightInnerRefs[i])),
        ]
      : []),
  ]

  return (
    <section
      id="integrations"
      className="relative overflow-hidden py-14 sm:py-20 md:py-28 border-t border-blue-100"
      style={{
        background:
          'linear-gradient(180deg, #B8D8F8 0%, #F2F8FF 20%, #F2F8FF 76%, #D6ECFF 100%)',
      }}
    >
      {/* Dot grid, fading out toward the section edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(13,40,81,0.16) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          maskImage: 'radial-gradient(ellipse 75% 65% at 50% 50%, #000 30%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 50%, #000 30%, transparent 78%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mx-auto mb-2 sm:mb-4 max-w-3xl space-y-3 sm:space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50
                          px-3 py-1 text-[10px] font-mono font-medium uppercase tracking-[0.16em] text-blue-600">
            <Sparkles className="h-3.5 w-3.5" /> Integrations
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-blue-950 sm:text-4xl md:text-5xl">
            We Handle All Integrations
          </h2>
          <p className="mx-auto max-w-xl text-base text-blue-800/70 sm:text-lg">
            From intricate challenges to seamless execution — we wire your tools,
            data, and automations straight into your site.
          </p>
        </div>

        {/* Diagram */}
        <div
          ref={containerRef}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          tabIndex={0}
          role="img"
          aria-label="Zaunlabs at the centre of the tools it integrates with"
          className="group relative mx-auto flex h-[330px] w-full max-w-5xl items-center
                     justify-between px-1 outline-none sm:h-[500px] sm:px-8 md:h-[560px]"
        >
          {isWide && (
            <div className="flex h-[390px] flex-col justify-between">
              {LEFT_OUTER.map((n, i) => <Node key={n.label} ref={leftOuterRefs[i]} {...n} />)}
            </div>
          )}

          <div className="flex h-[230px] flex-col justify-between sm:h-[300px]">
            {LEFT_INNER.map((n, i) => <Node key={n.label} ref={leftInnerRefs[i]} {...n} />)}
          </div>

          {/* Hub — the Zaunlabs mark, in brand blue */}
          <div
            ref={hubRef}
            /* Footprint is fixed, so the mark is width-capped by the square.
               `logo_icon_blue.png` is the glyph alone — no wordmark — cropped
               from the 10k-wide logo.png and recoloured to the brand blue
               (#005498), since the shipped logo_blue.png is only 1024px and
               ~66% transparent padding. */
            className="relative z-10 flex size-[72px] shrink-0 items-center justify-center rounded-xl
                       border-4 border-blue-200/70 bg-white p-1.5
                       shadow-[0_8px_26px_-10px_rgba(13,40,81,0.45)] md:size-[88px]"
          >
            <img
              src="/logo_icon_blue.png"
              alt="Zaunlabs"
              className="h-full w-auto object-contain"
            />
            <Tick className="-left-[11px] -top-[11px]" />
            <Tick className="-right-[11px] -top-[11px]" />
            <Tick className="-bottom-[11px] -left-[11px]" />
            <Tick className="-bottom-[11px] -right-[11px]" />
          </div>

          <div className="flex h-[230px] flex-col justify-between sm:h-[300px]">
            {RIGHT_INNER.map((n, i) => <Node key={n.label} ref={rightInnerRefs[i]} {...n} />)}
          </div>

          {isWide && (
            <div className="flex h-[390px] flex-col justify-between">
              {RIGHT_OUTER.map((n, i) => <Node key={n.label} ref={rightOuterRefs[i]} {...n} />)}
            </div>
          )}

          {beams.map((b, i) => (
            <AnimatedBeam
              key={i}
              containerRef={containerRef}
              fromRef={b.from}
              toRef={b.to}
              active={active}
              delay={timings[i].delay}
              duration={timings[i].duration}
              gap={timings[i].gap}
              pulseLength={timings[i].pulseLength}
              curvature={0}
              pathColor="#7FA3CC"
              pathWidth={1.6}
              pathOpacity={0.4}
              gradientStartColor="#2E7DF6"
              gradientStopColor="#5CC8FF"
            />
          ))}
        </div>

        <p className="mt-2 text-center text-[11px] font-mono uppercase tracking-[0.16em] text-blue-400/80">
          Hover to trace the flow
        </p>

      </div>
    </section>
  )
}
