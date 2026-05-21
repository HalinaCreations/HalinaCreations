"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import invitationData from './lib/data.json';

const StorySection = () => {
  // Accessing story data; note: if TypeScript errors persist, use (invitationData as any)
  const { story } = invitationData.vintageRomance;
  const sectionRef = useRef(null);
  
  // Slide Show State
  const [index, setIndex] = useState(0);
  const images = story.images || [story.backgroundImage];

  // Auto-play slideshow every 5 seconds
  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  // Parallax effect for the whole container
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const containerY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full flex flex-col items-center p-0 m-0 font-serif overflow-hidden bg-[#A3BCA7]"
    >
      <motion.div 
        style={{ y: containerY }}
        className="w-full flex flex-col"
      >
        
        {/* --- TOP: SAGE GREEN CONTENT --- */}
        {/* Background appears immediately; bottom 30% fades to transparent */}
        <div 
          className="relative w-full min-h-[55vh] p-8 md:p-24 text-center flex flex-col items-center justify-center z-20"
          style={{ 
            background: 'linear-gradient(180deg, rgba(163, 188, 167, 1) 0%, rgba(163, 188, 167, 1) 70%, rgba(163, 188, 167, 0) 100%)' 
          }}
        >
          <div className="relative z-30 text-white w-full max-w-3xl">
            {/* TEXT ANIMATION: ONLY THESE ELEMENTS HAVE ANIMATION/DELAY */}
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 1.2, ease: "easeOut" }}
              className="text-3xl md:text-xl font-light tracking-[0.25em] mb-10 pb-8 inline-block"
              style={{ fontFamily: "'Beth Ellen', cursive" }}
            >
              {story.title}
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 1.5 }}
              className="text-[16px] md:text-2xl leading-relaxed font-light tracking-wide"
            >
              {story.content}
            </motion.p>
          </div>
        </div>

        {/* --- BOTTOM: SLIDESHOW IMAGES --- */}
        {/* -mt pulls the images up under the transparent part of the green box */}
        <div className="relative w-full h-[60vh] md:h-[80vh] -mt-[25vh] z-10 p-0 m-0 overflow-hidden bg-[#A3BCA7]">
          {/* REMOVED mode="wait" to allow seamless cross-fading */}
          <AnimatePresence>
            <motion.img
              key={index}
              src={images[index]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              alt={`Story image ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover grayscale-[5%] contrast-[1.02]"
            />
          </AnimatePresence>
          
          {/* Static darkening overlay for better text legibility if images are too bright */}
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        </div>

      </motion.div>
    </section>
  );
};

export default StorySection;