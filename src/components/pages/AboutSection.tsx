"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const AboutSection = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6 }
  };

  return (
    // Reduced top padding on mobile (py-16) and kept original for desktop (md:py-32)
    <section id="about" className="py-10 md:py-32 bg-white px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 items-center">
          
          {/* Video Container: flex and justify-center ensure it stays centered on mobile */}
          <motion.div {...fadeIn} className="flex justify-center items-center">
            <video 
              className="w-full max-w-[320px] rounded-lg " 
              autoPlay 
              loop 
              muted 
              playsInline
            >
              <source src="/videos/landpagevid.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>

          {/* Text Content: Added responsive text centering for a better mobile look */}
          <motion.div {...fadeIn} className="text-center md:text-left">
            <h2 className="text-4xl font-serif mb-8 text-emerald-950 leading-tight font-bold">
              Crafting memories, <br /> not just mail.
            </h2>
            <div className="space-y-6 text-emerald-900/70 leading-relaxed text-lg font-light">
              <p>
                At Halina Creations, we believe an invitation is the heartbeat of your celebration. It&apos;s the first glimpse into the milestone you&apos;re honoring.
              </p>
              <p>
                Based in the Philippines, we design digital experiences that ensure every guest interaction is as seamless as it is stunning.
              </p>
              <p>
                We also bring this same digital artistry to the professional world. Beyond celebrations, we craft custom business websites designed to elevate your brand with the same precision, interactivity, and mobile-first approach we bring to life&apos;s greatest milestones.
              </p>
            </div>
            <div className="mt-12 flex gap-4 items-center justify-center md:justify-start text-emerald-950 font-semibold tracking-wide uppercase text-[10px]">
              <Heart className="text-emerald-500" size={16} fill="currentColor" />
              <span>Founded on a passion for detail.</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;