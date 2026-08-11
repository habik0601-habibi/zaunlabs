import React, { useState } from 'react';
import { motion } from 'framer-motion';

const shakeVariants = {
  hover: {
    rotate: [0, -12, 12, -10, 10, -6, 6, 0],
    transition: {
      duration: 0.55,
      ease: "easeInOut",
      repeat: Infinity,
    }
  },
  normal: { rotate: 0 }
};

const socialPlatforms = [
  {
    name: 'Instagram',
    href: 'https://instagram.com/zaunlabs', // TODO: replace with real URL
    // Instagram brand gradient — magenta/orange/purple
    bgActive: 'linear-gradient(135deg, #f9ce34, #ee2a7b, #6228d7)',
    shadowColor: 'rgba(238,42,123,0.55)',
    ringColor: '#ee2a7b',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    )
  },
  {
    name: 'Discord',
    href: 'https://discord.gg/zaunlabs', // TODO: replace with real URL
    bgActive: '#5865F2',
    shadowColor: 'rgba(88,101,242,0.6)',
    ringColor: '#5865F2',
    icon: (
      <svg viewBox="0 0 127.14 96.36" fill="currentColor" className="w-7 h-7">
        <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,52.8,6.83,77.19,77.19,0,0,0,49.5,0,105.15,105.15,0,0,0,19.06,8.07C-3.8,42.22-3,75.47,19.06,96.36a105.3,105.3,0,0,0,32.22,16.32,77.46,77.46,0,0,0,6.77-11A68.39,68.39,0,0,1,43.2,95.5c1.24-.92,2.45-1.9,3.61-2.91a72.58,72.58,0,0,0,73.1,0c1.16,1,2.37,2,3.61,2.91a68.39,68.39,0,0,1-14.85,6.18,77.46,77.46,0,0,0,6.77,11,105.3,105.3,0,0,0,32.22-16.32C130.66,75.47,131.46,42.22,107.7,8.07ZM42.45,76.56C36.15,76.56,31,70.78,31,63.7s5.15-12.86,11.45-12.86,11.45,5.78,11.45,12.86S48.75,76.56,42.45,76.56Zm42.24,0C78.39,76.56,73.24,70.78,73.24,63.7s5.15-12.86,11.45-12.86,11.45,5.78,11.45,12.86S91,76.56,84.69,76.56Z"/>
      </svg>
    )
  },
  {
    name: 'GitHub',
    href: 'https://github.com/zaunlabs', // TODO: replace with real URL
    bgActive: '#1B2430',
    shadowColor: 'rgba(13,40,81,0.55)',
    ringColor: '#1A4A8A',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>
    )
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/zaunlabs', // TODO: replace with real URL
    bgActive: '#0A66C2',
    shadowColor: 'rgba(10,102,194,0.6)',
    ringColor: '#0A66C2',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    )
  }
];

export const SocialConnect = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section
      id="social"
      className="relative py-20 md:py-28 overflow-hidden border-t border-blue-100"
      style={{ background: 'linear-gradient(180deg, #EAF4FF 0%, #F7FBFF 100%)' }}
    >
      {/* Subtle radial glow blob in background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 60%, rgba(74,144,217,0.13) 0%, transparent 70%)'
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5
          bg-blue-50 border border-blue-200 text-blue-600 text-xs font-mono tracking-wider uppercase">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
          </svg>
          Our Socials
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-950 tracking-tight mb-4">
          Connect{' '}
          <span className="gradient-text-blue">With Us</span>
        </h2>

        {/* Subtitle */}
        <p className="max-w-xl mx-auto text-blue-800/70 text-base sm:text-lg mb-12 leading-relaxed">
          Follow us for web drops, AI insights, and behind-the-scenes from the studio.
        </p>

        {/* Glass icon card */}
        <div
          className="glass-card rounded-3xl py-12 px-6 sm:px-16 
            flex flex-wrap items-center justify-center gap-10 sm:gap-16
            border border-blue-200/60"
          style={{
            background: 'rgba(255,255,255,0.52)',
            backdropFilter: 'blur(22px)',
            WebkitBackdropFilter: 'blur(22px)',
            boxShadow: '0 8px 48px -8px rgba(26,74,138,0.14), 0 0 0 1px rgba(74,144,217,0.12)',
          }}
        >
          {socialPlatforms.map((platform, idx) => {
            const isHovered = hoveredIndex === idx;

            return (
              <a
                key={platform.name}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="flex flex-col items-center focus:outline-none"
              >
                {/* Icon circle */}
                <motion.div
                  animate={isHovered ? { y: -10, scale: 1.12 } : { y: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  style={isHovered ? {
                    background: platform.bgActive,
                    boxShadow: `0 12px 40px -4px ${platform.shadowColor}, 0 0 0 3px ${platform.ringColor}33`,
                    border: 'none',
                    color: '#fff',
                  } : {
                    background: 'rgba(255,255,255,0.7)',
                    boxShadow: '0 4px 16px -2px rgba(26,74,138,0.10)',
                    border: '1.5px solid rgba(74,144,217,0.25)',
                    color: '#1A4A8A',
                  }}
                  className="w-20 h-20 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <motion.div
                    variants={shakeVariants}
                    animate={isHovered ? 'hover' : 'normal'}
                    className="flex items-center justify-center"
                  >
                    {platform.icon}
                  </motion.div>
                </motion.div>

                {/* Label */}
                <span
                  className="mt-4 text-sm font-bold tracking-wide transition-colors duration-300"
                  style={{ color: isHovered ? '#003366' : '#4A7BAA' }}
                >
                  {platform.name}
                </span>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
};
