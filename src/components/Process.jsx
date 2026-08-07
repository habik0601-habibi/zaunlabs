import React from 'react'
import { Search, PenTool, Rocket } from 'lucide-react'

export default function Process() {
  const steps = [
    {
      number: '01',
      title: 'Discover & Diagnose',
      subtitle: 'Understand first, automate second.',
      icon: Search,
      bullets: [
        "We learn how your business actually works: goals, constraints, handoffs, and what a 'win' looks like.",
        "We map your tech stack and where data lives: CRMs, inboxes, spreadsheets, internal tools.",
        "We audit processes to find real bottlenecks and decide what should and shouldn't be automated."
      ]
    },
    {
      number: '02',
      title: 'Design, Build & Validate',
      subtitle: 'Custom solutions, tested before launch.',
      icon: PenTool,
      bullets: [
        "We prioritize high-impact opportunities and decide where AI helps, and where it doesn't.",
        "We design and build custom workflows, test different approaches on real data, and explain our choices in plain language.",
        "We run evaluations in a real-world environment before full rollout."
      ]
    },
    {
      number: '03',
      title: 'Launch, Monitor & Optimize',
      subtitle: 'Continuous improvement, not a one-off project.',
      icon: Rocket,
      bullets: [
        "We launch into production with clear success metrics and safeguards.",
        "We monitor performance, collect feedback from your team and customers, and fix issues quickly.",
        "We continuously refine prompts, logic, and models so the system improves as your business evolves."
      ]
    }
  ]

  return (
    <section
      id="process"
      className="py-24 md:py-32 relative bg-[#f4f9ff]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h3 className="text-sm font-bold text-[#005498] tracking-[0.15em] uppercase mb-4">
            How We Work
          </h3>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#003366] tracking-tight mb-6">
            Our Process
          </h2>
          <p className="text-lg text-[#004070]/80 max-w-2xl mx-auto leading-relaxed">
            A methodical, low-risk approach that starts with understanding your business - 
            not jumping straight into tools.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div
                key={step.number}
                className="group relative bg-white border border-[#D6ECFF] rounded-2xl p-8 
                           shadow-[0_4px_20px_rgba(0,84,152,0.05)] 
                           hover:shadow-[0_20px_40px_rgba(0,84,152,0.15)] hover:border-[#005498]/30 
                           hover:-translate-y-2 transition-all duration-300 ease-out flex flex-col h-full overflow-hidden"
              >
                {/* Decorative background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#005498]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Top: Icon & Number */}
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-12 h-12 rounded-full border-2 border-[#005498]/30 flex items-center justify-center text-[#005498] 
                                    group-hover:bg-[#005498] group-hover:text-white group-hover:border-[#005498] 
                                    transition-all duration-300 group-hover:scale-110">
                      <Icon className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <div className="px-3 py-1 rounded-full border border-[#005498]/20 text-[#005498] text-xs font-bold
                                    group-hover:bg-[#005498] group-hover:text-white transition-all duration-300">
                      {step.number}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h4 className="text-xl font-bold text-[#003366] mb-2 tracking-tight group-hover:text-[#005498] transition-colors duration-300">
                    {step.title}
                  </h4>
                  <p className="text-[0.9rem] font-bold text-[#0077cc] mb-6">
                    {step.subtitle}
                  </p>

                  {/* Bullets */}
                  <ul className="space-y-4 mt-auto">
                    {step.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex gap-3 items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#005498]/40 mt-2 flex-shrink-0 group-hover:bg-[#005498] transition-colors duration-300" />
                        <p className="text-[0.92rem] text-[#004070]/80 leading-[1.6]">
                          {bullet}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
