import * as React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

const imagePositions = [
  { top: '5%', left: '15%', className: 'hidden lg:block w-24 h-24' },
  { top: '15%', left: '25%', className: 'hidden md:block w-20 h-20' }, // pushed left from 35%
  { top: '5%', left: '70%', className: 'hidden md:block w-16 h-16' }, // pushed right from 55%
  { top: '10%', right: '15%', className: 'hidden lg:block w-28 h-28' },
  { top: '25%', right: '5%', className: 'hidden md:block w-20 h-20' },
  { top: '45%', right: '10%', className: 'hidden lg:block w-24 h-24' },
  { top: '50%', left: '5%', className: 'hidden md:block w-28 h-28' },
  { bottom: '5%', left: '20%', className: 'hidden lg:block w-20 h-20' },
  { bottom: '15%', left: '30%', className: 'hidden md:block w-16 h-16' }, // pushed left from 45%
  { bottom: '10%', right: '20%', className: 'hidden md:block w-24 h-24' }, // pushed right from 30%
  { bottom: '2%', right: '15%', className: 'hidden lg:block w-20 h-20' },
  { top: '10%', left: '5%', className: 'block md:hidden w-16 h-16' },
  { top: '5%', right: '10%', className: 'block md:hidden w-20 h-20' },
  { bottom: '5%', left: '10%', className: 'block md:hidden w-20 h-20' },
  { bottom: '10%', right: '5%', className: 'block md:hidden w-16 h-16' },
];

const imageVariants = {
  initial: { opacity: 0, scale: 0.5 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
      delay: Math.random() * 0.5,
    },
  },
};

const floatingAnimation = () => ({
  y: [0, Math.random() * -15 - 5, 0],
  transition: {
    duration: Math.random() * 4 + 5,
    repeat: Infinity,
    repeatType: 'reverse',
    ease: 'easeInOut',
  },
});

export const AnimatedTestimonialGrid = ({
  testimonials,
  badgeText = 'Testimonials',
  title,
  description,
  ctaText,
  ctaHref,
  className,
}) => {
  return (
    <section
      className={cn(
        'relative w-full max-w-7xl mx-auto py-32 sm:py-40 px-4',
        className
      )}
    >
      {testimonials.slice(0, imagePositions.length).map((testimonial, index) => (
        <motion.div
          key={index}
          className={cn('absolute', imagePositions[index].className)}
          style={{
            top: imagePositions[index].top,
            left: imagePositions[index].left,
            right: imagePositions[index].right,
            bottom: imagePositions[index].bottom,
          }}
          variants={imageVariants}
          initial="initial"
          animate="animate"
          custom={index}
        >
          <motion.div
            className="w-full h-full rounded-2xl shadow-xl overflow-hidden border border-[#D6ECFF]/50"
            animate={floatingAnimation()}
            whileHover={{ scale: 1.1, zIndex: 20 }}
          >
            <img
              src={testimonial.imgSrc}
              alt={testimonial.alt}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>
      ))}

      <div className="relative z-10 flex flex-col items-center text-center">
        {badgeText && (
          <div className="mb-4 inline-block rounded-full bg-[#D6ECFF] px-4 py-1.5 text-sm font-bold text-[#005498] uppercase tracking-widest border border-[#BAE6FD]">
            {badgeText}
          </div>
        )}
        <h2 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-[#003366] mb-6 max-w-3xl leading-[1.1]">
          {title}
        </h2>
        <p className="max-w-2xl text-lg text-[#004070]/80 mb-10 leading-relaxed font-medium">
          {description}
        </p>
        
        <a
          href={ctaHref}
          className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#005498] to-[#0077cc] px-8 py-4 text-base font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {ctaText}
          <ArrowRight className="ml-2 h-5 w-5" />
        </a>
      </div>
    </section>
  );
};
