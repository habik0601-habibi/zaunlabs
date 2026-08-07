import React, { useState, useEffect } from 'react'
import { Send, Mail, CheckCircle, AlertCircle, PhoneCall, Clock, Globe } from 'lucide-react'
import { submitContactForm, isSupabaseConfigured } from '../lib/supabaseClient'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', service: 'Web Development', message: '',
  })
  const [status, setStatus] = useState({ submitting: false, submitted: false, isDemo: false, error: null })

  useEffect(() => {
    const handleLocation = () => {
      const hash = window.location.hash
      if (hash.includes('service=')) {
        const param = hash.split('service=')[1]
        if (param) setFormData((p) => ({ ...p, service: decodeURIComponent(param) }))
      }
    }
    handleLocation()
    window.addEventListener('hashchange', handleLocation)
    return () => window.removeEventListener('hashchange', handleLocation)
  }, [])

  const handleChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ submitting: false, submitted: false, isDemo: false, error: 'Please complete all required fields.' })
      return
    }
    setStatus({ submitting: true, submitted: false, isDemo: false, error: null })
    try {
      const result = await submitContactForm(formData)
      setStatus({ submitting: false, submitted: true, isDemo: Boolean(result.isDemo), error: null })
      setFormData({ name: '', email: '', company: '', service: 'Web Development', message: '' })
    } catch (err) {
      setStatus({ submitting: false, submitted: false, isDemo: false, error: err.message || 'Failed to submit.' })
    }
  }

  const inputClass = `w-full px-4 py-3 rounded-xl bg-white border border-blue-200
                      focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                      text-blue-950 text-sm placeholder-blue-300 outline-none transition-all`

  return (
    <section
      id="contact"
      className="py-20 md:py-28 relative border-t border-blue-100"
      style={{ background: 'linear-gradient(180deg, #D6ECFF 0%, #B8D8F8 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full
                          bg-white/70 border border-blue-200 text-blue-600 text-xs font-mono tracking-wider uppercase">
            <Mail className="w-3.5 h-3.5" /> START A PROJECT
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-950 tracking-tight">
            Let's build something{' '}
            <span className="gradient-text-blue">extraordinary</span>.
          </h2>
          <p className="text-blue-800/70 text-base sm:text-lg">
            Have a project in mind? Fill out the form or reach out directly.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">

          {/* Left: Contact info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card rounded-3xl p-8 border border-blue-200 space-y-6">

              {/* Logo header */}
              <div className="flex items-center gap-3 pb-4 border-b border-blue-100">
                <div className="bg-white px-2 py-1 rounded border border-blue-100 flex items-center">
                  <img src="/logo.png" alt="Zaunlabs" className="h-7 w-auto object-contain" />
                </div>
                <span className="text-xs font-mono text-blue-500">Direct Founder Access</span>
              </div>

              <h3 className="text-xl font-bold text-blue-950">Contact Alternatives</h3>
              <p className="text-sm text-blue-800/70">
                Prefer email or WhatsApp? Reach our founders directly.
              </p>

              <div className="space-y-3">
                <a href="mailto:hello@zaunlabs.dev"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-blue-100
                             hover:border-blue-400 hover:shadow-md transition-all group">
                  <div className="p-3 rounded-xl bg-blue-50 text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-blue-400 font-mono uppercase">Direct Email</div>
                    <div className="text-sm font-bold text-blue-900">hello@zaunlabs.dev</div>
                  </div>
                </a>

                <a href="https://wa.me/?text=Hi%20Zaunlabs,%20I'd%20like%20to%20discuss%20a%20project."
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-emerald-100
                             hover:border-emerald-400 hover:shadow-md transition-all group">
                  <div className="p-3 rounded-xl bg-emerald-50 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-blue-400 font-mono uppercase">WhatsApp / Call</div>
                    <div className="text-sm font-bold text-blue-900">Quick Founder Chat</div>
                  </div>
                </a>
              </div>

              <div className="pt-4 border-t border-blue-100 space-y-3">
                <div className="flex items-center gap-3 text-xs text-blue-700/80">
                  <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Response within 24 hours</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-blue-700/80">
                  <Globe className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Serving UTC-8 to UTC+5 time zones</span>
                </div>
              </div>
            </div>

            {/* Supabase status */}
            <div className="p-4 rounded-2xl glass-card border border-blue-100 flex items-center justify-between text-xs font-mono">
              <span className="text-blue-500">Database Engine:</span>
              {isSupabaseConfigured ? (
                <span className="text-emerald-600 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Supabase Connected
                </span>
              ) : (
                <span className="text-amber-600 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  Demo Mode
                </span>
              )}
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl p-8 md:p-10 border border-blue-200 shadow-xl">

              {status.submitted ? (
                <div className="py-12 text-center space-y-5">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200
                                  text-emerald-500 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-blue-950 mb-2">Message Received!</h3>
                    <p className="text-blue-700/70 text-sm max-w-md mx-auto">
                      {status.isDemo
                        ? 'Simulated submission completed. Set VITE_SUPABASE_URL to log directly to Supabase.'
                        : 'We\'ll get back to you within 24 hours.'}
                    </p>
                  </div>
                  <button
                    onClick={() => setStatus({ submitting: false, submitted: false, isDemo: false, error: null })}
                    className="px-6 py-2.5 rounded-xl bg-blue-50 border border-blue-200
                               hover:border-blue-400 text-blue-700 text-sm font-semibold transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {status.error && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{status.error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider">
                        Name <span className="text-blue-400">*</span>
                      </label>
                      <input type="text" name="name" required placeholder="Alex Morgan"
                        value={formData.name} onChange={handleChange} className={inputClass} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider">
                        Email <span className="text-blue-400">*</span>
                      </label>
                      <input type="email" name="email" required placeholder="alex@company.com"
                        value={formData.email} onChange={handleChange} className={inputClass} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider">
                        Company <span className="text-blue-300">(optional)</span>
                      </label>
                      <input type="text" name="company" placeholder="Acme Corp"
                        value={formData.company} onChange={handleChange} className={inputClass} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider">
                        Service Focus
                      </label>
                      <select name="service" value={formData.service} onChange={handleChange} className={inputClass}>
                        <option value="Web Development">Web Development & Apps</option>
                        <option value="AI Automation & Agents">AI Automation & Agents</option>
                        <option value="Full Scope (Web + AI)">Full Scope (Web + AI)</option>
                        <option value="General Inquiry">General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider">
                      Message <span className="text-blue-400">*</span>
                    </label>
                    <textarea name="message" rows={5} required
                      placeholder="Describe what you want to build or automate..."
                      value={formData.message} onChange={handleChange}
                      className={`${inputClass} resize-none`} />
                  </div>

                  <button
                    type="submit"
                    disabled={status.submitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500
                               text-white font-extrabold text-base
                               shadow-[0_8px_30px_rgba(26,74,138,0.35)]
                               hover:shadow-[0_10px_40px_rgba(26,74,138,0.5)]
                               hover:scale-[1.01] active:scale-[0.99] transition-all duration-200
                               flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {status.submitting ? (
                      <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span></>
                    ) : (
                      <><span>Submit Project Inquiry</span><Send className="w-4 h-4" /></>
                    )}
                  </button>

                  <p className="text-[11px] text-blue-400 text-center font-mono">
                    Submissions stored securely in Supabase.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
