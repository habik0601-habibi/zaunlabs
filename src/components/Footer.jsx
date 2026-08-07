import React from 'react'
import { Github, Linkedin, Twitter, ArrowUpRight, Sparkles, Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    services: [
      { label: 'Custom Web Apps', href: '#services' },
      { label: 'AI Automation & Agents', href: '#services' },
      { label: 'LLM Chatbots', href: '#services' },
      { label: 'Workflow Automation', href: '#services' },
    ],
    company: [
      { label: 'About Us', href: '#about' },
      { label: 'Our Process', href: '#process' },
      { label: 'Testimonials', href: '#testimonials' },
      { label: 'Contact', href: '#contact' },
    ],
    social: [
      { label: 'GitHub', href: 'https://github.com/', icon: Github },
      { label: 'LinkedIn', href: 'https://linkedin.com/', icon: Linkedin },
      { label: 'Twitter / X', href: 'https://twitter.com/', icon: Twitter },
    ],
  }

  return (
    <footer
      className="relative border-t border-blue-100"
      style={{ background: 'linear-gradient(180deg, #0D2851 0%, #08172E 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top CTA Bar */}
        <div className="py-10 border-b border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl md:text-2xl font-extrabold text-white mb-1">
              Ready to launch with Zaunlabs?
            </h3>
            <p className="text-blue-200/70 text-sm">
              Partner with developers who treat your project as their own.
            </p>
          </div>
          <a
            href="#contact"
            className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-blue-400
                       text-white font-extrabold text-sm whitespace-nowrap
                       shadow-[0_8px_30px_rgba(74,144,217,0.3)]
                       hover:shadow-[0_10px_40px_rgba(74,144,217,0.5)]
                       hover:scale-[1.02] active:scale-[0.98] transition-all duration-300
                       flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Start Your Project <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Footer Links */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-1.5 rounded-xl flex items-center justify-center">
                <img src="/logo.png" alt="Zaunlabs" className="h-8 w-auto object-contain" />
              </div>
              <div>
                <div className="text-base font-extrabold text-white">
                  Zaun<span className="text-blue-400">labs</span>
                </div>
                <div className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">Web & AI Studio</div>
              </div>
            </div>
            <p className="text-xs text-blue-200/60 leading-relaxed max-w-[200px]">
              Pakistan's boutique agency for high-performance web apps and AI automation systems.
            </p>
            <a
              href="mailto:hello@zaunlabs.dev"
              className="flex items-center gap-2 text-xs text-blue-300 hover:text-white transition-colors font-mono"
            >
              <Mail className="w-3.5 h-3.5" /> hello@zaunlabs.dev
            </a>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">Services</h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a href={link.href}
                    className="text-sm text-blue-200/70 hover:text-white transition-colors hover:pl-1 block duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href}
                    className="text-sm text-blue-200/70 hover:text-white transition-colors hover:pl-1 block duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">Connect</h4>
            <div className="flex flex-col gap-2.5">
              {footerLinks.social.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-3 rounded-xl border border-white/10
                             hover:border-blue-400 hover:bg-white/5 text-blue-200/70 hover:text-white
                             transition-all duration-200 group text-sm"
                >
                  <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  {label}
                  <ArrowUpRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-blue-300/50 font-mono">
          <p>© {currentYear} Zaunlabs. All rights reserved.</p>
          <p>Crafted with precision in 🇵🇰 Pakistan</p>
        </div>

      </div>
    </footer>
  )
}
