import React, { useState, useEffect } from 'react'
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home',         href: '#home' },
    { name: 'Process',      href: '#process' },
    { name: 'Services',     href: '#services' },
    { name: 'About',        href: '#about' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact',      href: '#contact' },
  ]

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 md:px-8 pointer-events-none">
      <header
        className={`relative w-full max-w-5xl transition-all duration-500 rounded-[2rem] border pointer-events-auto ${
          isScrolled
            ? 'bg-white/60 backdrop-blur-2xl border-white/60 shadow-[0_8px_32px_rgba(0,40,100,0.12)]'
            : 'bg-white/40 backdrop-blur-lg border-white/40 shadow-[0_4px_20px_rgba(0,40,100,0.06)]'
        }`}
        style={{
          // Optional: Add a subtle SVG noise overlay for the "grainy" premium texture
          backgroundImage: isScrolled 
            ? `url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" opacity="0.04" filter="url(%23noiseFilter)"/></svg>')`
            : 'none'
        }}
      >
        <div className="flex items-center justify-between px-5 py-3">
          
          {/* ── LOGO ── */}
          <a href="#home" className="flex items-center justify-center group flex-shrink-0 w-32 sm:w-40 h-10 sm:h-12 overflow-hidden">
            <img
              src="/logo_blue.png"
              alt="Zaunlabs Logo"
              className="w-full h-full object-contain scale-[3] sm:scale-[3.5] transition-transform duration-300 group-hover:scale-[3.2] sm:group-hover:scale-[3.7]"
            />
          </a>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200
                           hover:bg-white/60 hover:shadow-sm"
                style={{ color: '#003366' }}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* ── CTA ── */}
          <div className="hidden md:flex items-center">
            <a
              href="#contact"
              className="flex items-center space-x-1.5 px-6 py-2.5 rounded-full font-bold text-sm text-white
                         shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, #005498, #0077cc)' }}
            >
              <Sparkles className="w-4 h-4" />
              <span>Get Started</span>
            </a>
          </div>

          {/* ── Mobile Toggle ── */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-white/50 border border-white/50 hover:bg-white/80 transition-colors"
            style={{ color: '#003366' }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* ── Mobile Menu Dropdown ── */}
        {mobileMenuOpen && (
          <div className="absolute top-[calc(100%+0.5rem)] left-0 right-0 bg-white/85 backdrop-blur-3xl border border-white/60 shadow-2xl rounded-3xl p-4 flex flex-col space-y-1 pointer-events-auto">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-base font-semibold rounded-xl transition-colors hover:bg-white/60"
                style={{ color: '#003366' }}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 pb-1">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl
                           text-white font-bold text-sm shadow-md"
                style={{ background: 'linear-gradient(135deg, #005498, #0077cc)' }}
              >
                <span>Start Your Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </header>
    </div>
  )
}
