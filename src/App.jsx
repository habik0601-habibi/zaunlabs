import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import About from './components/About'
import Services from './components/Services'
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

        {/* 4. ABOUT */}
        <About />

        {/* 5. SERVICES */}
        <Services />

        {/* 6. CONTACT */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
