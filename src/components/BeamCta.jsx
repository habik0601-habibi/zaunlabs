import React from 'react'
import { Sparkles, ArrowUpRight, Mail } from 'lucide-react'
import { BorderBeamPanel } from './ui/motiq-border-beam-panel'

/**
 * BeamCta — the bridge section between Contact and the Footer.
 *
 * The background gradient carries the page from the Contact section's
 * icy blue (#B8D8F8) into the Footer's navy (#0D2851), so the dark
 * beam panel sits on a surface the comets can actually read against.
 */
export default function BeamCta() {
  return (
    <section
      id="beam-cta"
      className="relative py-20 md:py-28"
      style={{ background: 'linear-gradient(180deg, #B8D8F8 0%, #1A4A8A 55%, #0D2851 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <BorderBeamPanel
            className="w-full max-w-3xl border-white/10 bg-[rgba(13,40,81,0.82)] p-0
                       backdrop-blur-xl shadow-[0_24px_80px_-24px_rgba(8,23,46,0.8)]"
            beams={2}
            colors={['#4A90D9', '#10B981']}
            thickness={2}
            radius={24}
            idleSpeed={42}
            hoverSpeed={240}
            glow
          >
            <div className="flex flex-col gap-5 p-8 md:p-12">
              <span
                className="w-fit rounded-full border border-white/15 px-2.5 py-0.5
                           text-[10px] font-mono font-medium uppercase tracking-[0.16em] text-blue-300"
              >
                Next Step
              </span>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                Your build starts with{' '}
                <span className="bg-gradient-to-r from-blue-300 to-emerald-300 bg-clip-text text-transparent">
                  one conversation
                </span>
                .
              </h3>

              <p className="text-sm sm:text-base text-blue-100/70 max-w-xl leading-relaxed">
                Tell us what you want to ship — a web app, an AI agent, or an automation
                that quietly removes hours of manual work. We scope it honestly, then
                build it like it's ours.
              </p>

              <div className="mt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl
                             bg-gradient-to-r from-blue-500 to-blue-400 px-6 py-3.5
                             text-sm font-extrabold text-white
                             shadow-[0_8px_30px_rgba(74,144,217,0.35)]
                             hover:shadow-[0_10px_40px_rgba(74,144,217,0.55)]
                             hover:scale-[1.02] active:scale-[0.98]
                             transition-all duration-300
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                >
                  <Sparkles className="w-4 h-4" />
                  Start Your Project
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href="mailto:hello@zaunlabs.dev"
                  className="inline-flex items-center justify-center gap-2 rounded-xl
                             border border-white/15 bg-white/5 px-6 py-3.5
                             text-sm font-bold text-blue-100
                             hover:border-blue-400 hover:bg-white/10 hover:text-white
                             transition-all duration-300
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                >
                  <Mail className="w-4 h-4" />
                  hello@zaunlabs.dev
                </a>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2 pt-5
                              border-t border-white/10 text-[11px] font-mono text-blue-300/60">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Replies within 24 hours
                </span>
                <span>No retainers to start</span>
                <span>Direct founder access</span>
              </div>
            </div>
          </BorderBeamPanel>
        </div>
      </div>
    </section>
  )
}
