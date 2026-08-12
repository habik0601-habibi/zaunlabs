import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import { SocialConnect } from './components/ui/connect-with-us'
import AboutServicesScrollSection from './components/ui/about-services-scroll-section'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen font-sans selection:bg-blue-400 selection:text-white" style={{ background: '#D6ECFF', color: '#0D2851' }}>
      {/* Sticky Header Navigation */}
      <Navbar />

      {/* Main Single Page Content */}
      <main>
        {/* 1. HOME (Hero) */}
        <Hero />

        {/* 2. HOW WE WORK / OUR PROCESS */}
        <Process />

        {/* 3. TESTIMONIALS / WHAT OUR CLIENTS SAY */}
        <Testimonials />

        {/* 3.5 SOCIAL CONNECT */}
        <SocialConnect />

        {/* 4. ABOUT + SERVICES — Three.js scroll narrative (replaces static About & Services) */}
        <AboutServicesScrollSection />

        {/* 5. CONTACT */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
