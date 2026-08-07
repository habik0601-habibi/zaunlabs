import React from 'react'
import { AnimatedTestimonialGrid } from './ui/testimonial-2'

/**
 * TESTIMONIALS SECTION
 * NOTE: The AnimatedTestimonialGrid takes an array of testimonials with imgSrc.
 */
export default function Testimonials() {
  // PLACEHOLDER — replace with real client photos and quotes when available.
  // The AnimatedTestimonialGrid uses these images for the floating animation.
  const placeholders = [
    { imgSrc: 'https://randomuser.me/api/portraits/men/32.jpg', alt: 'Corporate Client' },
    { imgSrc: 'https://randomuser.me/api/portraits/women/44.jpg', alt: 'Designer Client' },
    { imgSrc: 'https://randomuser.me/api/portraits/men/46.jpg', alt: 'Entrepreneur Client' },
    { imgSrc: 'https://randomuser.me/api/portraits/women/68.jpg', alt: 'Corporate Client' },
    { imgSrc: 'https://randomuser.me/api/portraits/men/97.jpg', alt: 'Designer Client' },
    { imgSrc: 'https://randomuser.me/api/portraits/women/90.jpg', alt: 'Entrepreneur Client' },
    { imgSrc: 'https://randomuser.me/api/portraits/men/75.jpg', alt: 'Corporate Client' },
    { imgSrc: 'https://randomuser.me/api/portraits/women/65.jpg', alt: 'Designer Client' },
    { imgSrc: 'https://randomuser.me/api/portraits/men/54.jpg', alt: 'Entrepreneur Client' },
    { imgSrc: 'https://randomuser.me/api/portraits/women/24.jpg', alt: 'Corporate Client' },
    { imgSrc: 'https://randomuser.me/api/portraits/men/22.jpg', alt: 'Designer Client' },
    { imgSrc: 'https://randomuser.me/api/portraits/women/12.jpg', alt: 'Entrepreneur Client' },
    { imgSrc: 'https://randomuser.me/api/portraits/men/11.jpg', alt: 'Corporate Client' },
    { imgSrc: 'https://randomuser.me/api/portraits/women/8.jpg', alt: 'Designer Client' },
    { imgSrc: 'https://randomuser.me/api/portraits/men/5.jpg', alt: 'Entrepreneur Client' },
  ]

  return (
    <div id="testimonials" className="bg-[#f4f9ff] border-t border-[#D6ECFF]">
      <AnimatedTestimonialGrid
        testimonials={placeholders}
        badgeText="Client Proof & Feedback"
        title="Trusted by the businesses we've built for"
        description="We ship high-performance web applications and autonomous AI workflows that capture leads and cut manual work. See what our partners have to say."
        ctaText="See Our Work"
        ctaHref="#contact"
        className="text-[#003366]"
      />
    </div>
  )
}
