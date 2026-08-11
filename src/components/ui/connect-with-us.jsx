import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Shake keyframe animation for the hover state
const shakeVariants = {
  hover: {
    rotate: [0, -10, 10, -10, 10, -5, 5, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      repeat: Infinity
    }
  }
};

const socialPlatforms = [
  {
    name: 'Instagram',
    // TODO: Replace with real Instagram URL
    href: 'https://instagram.com/zaunlabs',
    bgHover: 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]',
    shadowGlow: 'hover:shadow-[0_0_30px_rgba(238,42,123,0.8)] border-pink-500/30',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    )
  },
  {
    name: 'Discord',
    // TODO: Replace with real Discord URL
    href: 'https://discord.gg/zaunlabs',
    bgHover: 'bg-[#5865F2]',
    shadowGlow: 'hover:shadow-[0_0_30px_rgba(88,101,242,0.8)] border-[#5865F2]/30',
    icon: (
      <svg viewBox="0 0 127.14 96.36" fill="currentColor" className="w-7 h-7">
        <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,52.8,6.83,77.19,77.19,0,0,0,49.5,0,105.15,105.15,0,0,0,19.06,8.07C-3.8,42.22-3,75.47,19.06,96.36a105.3,105.3,0,0,0,32.22,16.32,77.46,77.46,0,0,0,6.77-11A68.39,68.39,0,0,1,43.2,95.5c1.24-.92,2.45-1.9,3.61-2.91a72.58,72.58,0,0,0,73.1,0c1.16,1,2.37,2,3.61,2.91a68.39,68.39,0,0,1-14.85,6.18,77.46,77.46,0,0,0,6.77,11,105.3,105.3,0,0,0,32.22-16.32C130.66,75.47,131.46,42.22,107.7,8.07ZM42.45,76.56C36.15,76.56,31,70.78,31,63.7s5.15-12.86,11.45-12.86,11.45,5.78,11.45,12.86S48.75,76.56,42.45,76.56Zm42.24,0C78.39,76.56,73.24,70.78,73.24,63.7s5.15-12.86,11.45-12.86,11.45,5.78,11.45,12.86S91,76.56,84.69,76.56Z"/>
      </svg>
    )
  },
  {
    name: 'GitHub',
    // TODO: Replace with real GitHub URL
    href: 'https://github.com/zaunlabs',
    bgHover: 'bg-[#24292F]',
    shadowGlow: 'hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] border-white/20',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
      </svg>
    )
  },
  {
    name: 'LinkedIn',
    // TODO: Replace with real LinkedIn URL
    href: 'https://linkedin.com/company/zaunlabs',
    bgHover: 'bg-[#0A66C2]',
    shadowGlow: 'hover:shadow-[0_0_30px_rgba(10,102,194,0.8)] border-[#0A66C2]/30',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    )
  }
];

export const SocialConnect = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="py-20 md:py-28 relative flex flex-col items-center justify-center overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">
            Connect
          </span>{' '}
          With Us
        </h2>
        
        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base md:text-lg text-slate-300 mb-12 font-medium leading-relaxed">
          Join our community and stay updated with the latest news, releases, and exclusive content.
        </p>

        {/* Outer Card Grid Container */}
        <div className="relative p-[1px] rounded-[2.5rem] bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 shadow-[0_0_50px_-12px_rgba(168,85,247,0.3)]">
          <div className="bg-[#0B0F19] rounded-[2.5rem] py-12 px-8 sm:px-16 flex flex-wrap items-center justify-center gap-10 sm:gap-14">
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
                  className="flex flex-col items-center group focus:outline-none"
                >
                  {/* Outer circle wrapper with float, glow effects */}
                  <motion.div
                    animate={
                      isHovered
                        ? { y: -10, scale: 1.1 }
                        : { y: 0, scale: 1 }
                    }
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    className={`w-20 h-20 rounded-full border border-slate-700/60 bg-slate-800/40 flex items-center justify-center transition-all duration-300 relative ${
                      isHovered ? `${platform.bgHover} text-white ${platform.shadowGlow} border-transparent` : 'text-slate-400'
                    }`}
                  >
                    {/* SVG Icon with shake keyframes */}
                    <motion.div
                      variants={shakeVariants}
                      animate={isHovered ? "hover" : "normal"}
                      className="flex items-center justify-center"
                    >
                      {platform.icon}
                    </motion.div>
                  </motion.div>

                  {/* Text Label */}
                  <span
                    className={`mt-4 text-sm font-semibold tracking-wide transition-colors duration-300 ${
                      isHovered ? 'text-white' : 'text-slate-400'
                    }`}
                  >
                    {platform.name}
                  </span>
                </a>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
