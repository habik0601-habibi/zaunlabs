import React from 'react'
import { Code2, Bot, CheckCircle2, ArrowUpRight, Sparkles } from 'lucide-react'
import { BorderBeamPanel } from './ui/border-beam-panel'

export default function Services() {
  const services = [
    {
      id: 'web-dev',
      badge: 'Core Offering 01',
      title: 'Web Development & Apps',
      tagline: 'Modern, ultra-fast websites & web applications built to scale and convert.',
      icon: Code2,
      iconBg: 'bg-gradient-to-br from-blue-600 to-blue-400',
      border: 'border-blue-200/50',
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
      iconBg: 'bg-gradient-to-br from-emerald-600 to-emerald-400',
      border: 'border-emerald-200/50',
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
      className="py-20 md:py-28 relative"
      style={{ background: 'linear-gradient(180deg, #F7FBFF 0%, #EAF4FF 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full
                          bg-blue-50 border border-blue-200 text-blue-600 text-xs font-mono tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" /> SPECIALIZED CAPABILITIES
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-950 tracking-tight">
            Two core engines for{' '}
            <span className="gradient-text-blue">modern digital growth</span>.
          </h2>
          <p className="text-blue-800/70 text-base sm:text-lg">
            We specialize strictly in high-converting web engineering and autonomous AI automation.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {services.map((service) => {
            const Icon = service.icon
            // Blue hues for Web Dev, teal/emerald hues for AI Automation
            const beamColors = service.id === 'web-dev' ? [215, 200] : [160, 180]
            return (
              <BorderBeamPanel
                key={service.id}
                colors={beamColors}
                thickness={0.2}
                radius={24}
                durationIdle={9.5}
                durationActive={3.2}
                className="shadow-xl"
              >
              <div
                className={`backdrop-blur-3xl rounded-[22.8px] p-8 md:p-10 border ${service.border}
                             bg-gradient-to-br from-[#C3E2FF]/55 to-[#99CFFF]/30 
                             hover:from-[#C3E2FF]/70 hover:to-[#99CFFF]/45
                             transition-all duration-300
                             flex flex-col justify-between group h-full`}
                style={{
                  boxShadow: '0 12px 40px -8px rgba(26, 74, 138, 0.12), inset 0 1.5px 2px rgba(255, 255, 255, 0.8)',
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100
                                     text-blue-600 text-xs font-mono font-semibold">
                      {service.badge}
                    </span>
                    <div className={`p-3 rounded-2xl ${service.iconBg} text-white shadow-lg
                                     group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7" />
                    </div>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-blue-950 mb-3
                                  group-hover:text-blue-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-blue-800/75 text-base mb-8 leading-relaxed">{service.tagline}</p>

                  <div className="space-y-3 mb-8">
                    <p className="text-xs uppercase font-mono font-bold tracking-widest text-blue-400">
                      What's Included:
                    </p>
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                        <span className="text-sm text-blue-800 font-medium leading-normal">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 border-t border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-blue-400 font-mono block">Pricing Model</span>
                    <span className="text-sm font-bold text-blue-900">Custom Scope • Get a Quote</span>
                  </div>
                  <a
                    href={`#contact?service=${encodeURIComponent(service.targetService)}`}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700
                               text-white font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    Request Quote <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
              </BorderBeamPanel>
            )
          })}
        </div>

        <div className="mt-12 p-5 rounded-2xl bg-blue-50 border border-blue-200 text-center max-w-3xl mx-auto">
          <p className="text-sm text-blue-800">
            Need both?{' '}
            <a href="#contact" className="text-blue-600 font-bold hover:underline">
              Tell us about your custom project →
            </a>
          </p>
        </div>

      </div>
    </section>
  )
}
