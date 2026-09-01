import React from 'react'
import { Code2, Bot, CheckCircle2, ArrowUpRight, Sparkles } from 'lucide-react'
import { BorderBeamPanel } from './ui/motiq-border-beam-panel'

export default function Services() {
  const services = [
    {
      id: 'web-dev',
      badge: 'Core Offering 01',
      title: 'Web Development & Apps',
      tagline: 'Modern, ultra-fast websites & web applications built to scale and convert.',
      icon: Code2,
      // Comet pair + accent tints, matched to the card's identity
      beamColors: ['#4A90D9', '#38BDF8'],
      iconChip: 'from-blue-500/25 to-blue-400/5 text-blue-200',
      tickColor: 'text-blue-300',
      deliverables: [
        'Custom Business Websites & Landing Pages (React / Next.js / Tailwind)',
        'Interactive Web Applications, Client Portals & Analytics Dashboards',
        'Headless CMS Integrations & Lightning-Fast Speed / SEO Optimization',
      ],
      targetService: 'Web Development',
    },
    {
      id: 'ai-automation',
      badge: 'Core Offering 02',
      title: 'AI Automation & Agents',
      tagline: 'Autonomous AI pipelines & assistants that handle complex business operations 24/7.',
      icon: Bot,
      beamColors: ['#10B981', '#4A90D9'],
      iconChip: 'from-emerald-500/25 to-emerald-400/5 text-emerald-200',
      tickColor: 'text-emerald-300',
      deliverables: [
        'Custom AI Agents (Lead qualification, customer service, automated research)',
        'Workflow Automation (n8n, Make, Zapier, Python scripts & API webhooks)',
        'LLM Chatbots & Document Processing Assistants tuned to your business data',
      ],
      targetService: 'AI Automation & Agents',
    },
  ]

  return (
    <section
      id="services"
      className="py-20 md:py-28 relative border-t border-blue-200/70"
      /* Deliberately a step LIGHTER than the #D6ECFF above it, so the top edge
         reads as a real boundary rather than a continuation. The bottom still
         fades back to #D6ECFF to meet Contact seamlessly. */
      style={{
        background:
          'linear-gradient(180deg, #F6FAFF 0%, #ECF4FE 55%, #E4EFFB 88%, #D6ECFF 100%)',
        boxShadow: 'inset 0 14px 28px -22px rgba(26, 74, 138, 0.45)',
      }}
    >
      {/* Lit hairline along the seam */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(74,144,217,0.55) 30%, rgba(16,185,129,0.45) 50%, rgba(74,144,217,0.55) 70%, transparent 100%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full
                          border border-blue-200 bg-blue-50 text-blue-600
                          text-[10px] font-mono font-medium tracking-[0.16em] uppercase">
            <Sparkles className="w-3.5 h-3.5" /> Specialized Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-950 tracking-tight">
            Two core engines for{' '}
            <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
              modern digital growth
            </span>
            .
          </h2>
          <p className="text-blue-800/70 text-base sm:text-lg">
            We specialize strictly in high-converting web engineering and autonomous AI automation.
          </p>
        </div>

        {/* Service Cards — twin beam panels, side by side */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <BorderBeamPanel
                key={service.id}
                className="h-full w-full border-white/10 bg-[rgba(13,40,81,0.82)] p-0
                           backdrop-blur-xl shadow-[0_24px_80px_-24px_rgba(8,23,46,0.8)]"
                beams={2}
                colors={service.beamColors}
                thickness={2}
                radius={24}
                idleSpeed={42}
                hoverSpeed={240}
                glow
              >
                <div className="group flex h-full flex-col justify-between p-8 md:p-10">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="rounded-full border border-white/15 px-2.5 py-0.5
                                       text-[10px] font-mono font-medium uppercase tracking-[0.16em] text-blue-300">
                        {service.badge}
                      </span>
                      <div className={`rounded-2xl border border-white/10 bg-gradient-to-br ${service.iconChip}
                                       p-3 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-7 h-7" />
                      </div>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-blue-100/70 mb-8 leading-relaxed">
                      {service.tagline}
                    </p>

                    <div className="space-y-3 mb-8">
                      <p className="text-[11px] uppercase font-mono font-medium tracking-[0.16em] text-blue-300/60">
                        What's Included:
                      </p>
                      {service.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className={`w-5 h-5 ${service.tickColor} shrink-0 mt-0.5`} />
                          <span className="text-sm text-blue-100/80 leading-normal">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4
                                  pt-5 border-t border-white/10">
                    <div className="w-full sm:w-auto">
                      <span className="block text-[11px] font-mono text-blue-300/60">Pricing Model</span>
                      <span className="text-sm font-bold text-white">Custom Scope • Get a Quote</span>
                    </div>
                    <a
                      href={`#contact?service=${encodeURIComponent(service.targetService)}`}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2
                                 rounded-xl bg-gradient-to-r from-blue-500 to-blue-400 px-6 py-3
                                 text-sm font-extrabold text-white
                                 shadow-[0_8px_30px_rgba(74,144,217,0.35)]
                                 hover:shadow-[0_10px_40px_rgba(74,144,217,0.55)]
                                 hover:scale-[1.02] active:scale-[0.98]
                                 transition-all duration-300
                                 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                    >
                      Request Quote <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </BorderBeamPanel>
            )
          })}
        </div>

        <div className="mt-12 max-w-3xl mx-auto rounded-2xl border border-blue-200 bg-blue-50/70
                        p-5 text-center backdrop-blur-xl">
          <p className="text-sm text-blue-800">
            Need both?{' '}
            <a href="#contact" className="font-bold text-blue-600 hover:text-blue-800 transition-colors">
              Tell us about your custom project →
            </a>
          </p>
        </div>

      </div>
    </section>
  )
}
