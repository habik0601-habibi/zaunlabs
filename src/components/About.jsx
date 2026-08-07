import React from 'react'
import { Users, Globe2, Terminal, Zap, Sparkles } from 'lucide-react'

export default function About() {
  const highlights = [
    {
      title: 'Founders Who Write Code',
      description: 'You speak directly with the engineers building your solution. No non-technical project managers acting as middlemen.',
      icon: Terminal,
      iconBg: 'bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
    },
    {
      title: 'Based in Pakistan, Global Reach',
      description: 'Operating from Pakistan\'s vibrant tech ecosystem, collaborating seamlessly with startups and SMEs across US, Europe, and Asia.',
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
      className="py-20 md:py-28 relative border-t border-blue-100"
      style={{ background: 'linear-gradient(180deg, #EAF4FF 0%, #D6ECFF 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">

          {/* Left: Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full
                            bg-blue-50 border border-blue-200 text-blue-600 text-xs font-mono tracking-wider uppercase">
              <Users className="w-3.5 h-3.5" /> BEHIND ZAUNLABS
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-950 tracking-tight leading-tight">
              Small team of hands-on builders.{' '}
              <span className="gradient-text-blue">Big technical impact.</span>
            </h2>

            <p className="text-blue-800/75 text-base sm:text-lg leading-relaxed">
              Zaunlabs was founded by a small team of developer-enthusiasts and computer science practitioners
              based in Pakistan. We got tired of watching businesses get oversold bloated software templates
              by agencies with massive overheads.
            </p>

            <p className="text-blue-700/70 text-base leading-relaxed">
              When you work with Zaunlabs, you get direct access to the developers crafting your React
              applications and training your AI agents. We keep our client count intentionally small so
              every project receives senior-level attention.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              {['📍 Based in Pakistan 🇵🇰', '🌍 Local & Remote Clients', '⚡ 100% Builder Direct'].map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1.5 rounded-xl bg-white/70 border border-blue-200
                             text-blue-800 text-xs font-medium font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Logo card + highlights */}
          <div className="lg:col-span-6 space-y-5">

            {/* Brand Showcase */}
            <div className="glass-card rounded-3xl p-6 border border-blue-200 text-center group">
              <div className="p-6 rounded-2xl bg-white border border-blue-50 flex flex-col items-center">
                <img
                  src="/logo.png"
                  alt="Zaunlabs Official Logo"
                  className="max-h-20 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="mt-3 flex items-center justify-center gap-2 text-xs text-blue-500 font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Zaunlabs — Precision Web & AI Engineering Studio</span>
              </div>
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
