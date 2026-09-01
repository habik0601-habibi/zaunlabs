import React from 'react'
import { Users, Globe2, Terminal, Zap } from 'lucide-react'
import { ParticleTextEffect } from './ui/interactive-text-particle'

export default function About() {
  const highlights = [
    {
      title: 'Founders Who Write Code',
      description: 'You speak directly with the engineers building your solution. No non-technical project managers acting as middlemen.',
      icon: Terminal,
      iconBg: 'bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
    },
    {
      title: 'Remote-First, Global Reach',
      description: 'Operating remote-first across time zones, collaborating seamlessly with startups and SMEs across the US, Europe, and Asia.',
      icon: Globe2,
      iconBg: 'bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
    },
    {
      title: 'Agile & Outcome Driven',
      description: 'We prioritize working software, fast iterations, and measurable client results over lengthy corporate slide decks.',
      icon: Zap,
      iconBg: 'bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white',
    },
  ]

  return (
    <section
      id="about"
      className="pt-14 sm:pt-20 md:pt-28 pb-10 md:pb-14 relative border-t border-blue-100"
      style={{ background: 'linear-gradient(180deg, #EAF4FF 0%, #D6ECFF 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 items-center">

          {/* Left: Narrative */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full
                            bg-blue-50 border border-blue-200 text-blue-600 text-xs font-mono tracking-wider uppercase">
              <Users className="w-3.5 h-3.5" /> BEHIND ZAUNLABS
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-950 tracking-tight leading-tight">
              Small team of hands-on builders.{' '}
              <span className="gradient-text-blue">Big technical impact.</span>
            </h2>

            <p className="text-blue-800/75 text-base sm:text-lg leading-relaxed">
              Zaunlabs was founded by a small team of developer-enthusiasts and computer science
              practitioners. We got tired of watching businesses get oversold bloated software templates
              by agencies with massive overheads.
            </p>

            <p className="text-blue-700/70 text-base leading-relaxed">
              When you work with Zaunlabs, you get direct access to the developers crafting your React
              applications and training your AI agents. We keep our client count intentionally small so
              every project receives senior-level attention.
            </p>

            {/* Availability pill */}
            <div className="pt-2">
              {/* Same recipe as `.dark-glass` in index.css, dialled more
                  transparent so the section gradient reads through it. */}
              <div className="inline-flex flex-wrap items-center gap-x-4 gap-y-2 rounded-full py-2 pl-4 pr-5
                              border border-[rgba(74,144,217,0.35)]
                              bg-[rgba(13,40,81,0.6)] backdrop-blur-xl
                              shadow-[0_8px_28px_-12px_rgba(26,74,138,0.5)]">
                <span className="flex items-center gap-2.5 text-sm font-bold text-white">
                  {/* Pulsing status light: a static core under an expanding halo */}
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full
                                     bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  Available for work
                </span>

                <a
                  href="#contact"
                  className="rounded-full text-sm font-medium text-blue-100/80 transition-colors
                             hover:text-white focus:outline-none
                             focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  Get in touch now
                </a>
              </div>
            </div>
          </div>

          {/* Right: Logo card + highlights */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5">

            {/* Brand Showcase */}
            <div className="glass-card rounded-3xl p-4 sm:p-6 border border-blue-200 text-center">
              <div className="h-24 sm:h-32 md:h-36 rounded-2xl bg-white border border-blue-50 overflow-hidden">
                <ParticleTextEffect
                  text="ZAUNLABS"
                  colors={['005498', '1E6FBF', '4A90D9', '38BDF8', '10B981']}
                  imageSrc="/logo_icon_blue.png"
                  imageScale={1.45}
                  imageGap={0.3}
                  particleDensity={3}
                  animationForce={70}
                  fontScale={0.4}
                />
              </div>
              <span className="sr-only">Zaunlabs</span>
            </div>

            {/* Highlights */}
            {highlights.map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={idx}
                  className="glass-card glass-card-hover rounded-2xl p-5 border border-blue-100 flex items-start gap-4 group"
                >
                  <div className={`p-3 rounded-xl shrink-0 transition-colors ${item.iconBg}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-blue-950 mb-1 group-hover:text-blue-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-blue-700/70 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
