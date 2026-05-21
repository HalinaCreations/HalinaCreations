"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import invitationData from "./lib/data.json";
import Image from 'next/image';
import CalendarSection from './CalendarSection';
import AttendantsSection from './AttendantsSection';  
import DressCodeSection from './DressCodeSection';   
import LocationSection from './LocationSection';
import RSVPSection from './RSVPSection';
import FooterSection from './FooterSection';

const GallerySection = dynamic(() => import('./GallerySection'), { ssr: false });
const MusicSection = dynamic(() => import('./MusicSection'), { 
  ssr: false 
});
const StorySection = dynamic(() => import('./StorySection'), { ssr: false });

const VintageRomance = () => {
  const data = invitationData.vintageRomance; // Extracting project data
  const [isOpen, setIsOpen] = useState(false);
  const [shouldPlayMusic, setShouldPlayMusic] = useState(false);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    setShouldPlayMusic(true);
  };

  // Animation for text elements
  const softReveal = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { 
      duration: 3.0, 
      ease: "easeOut" as const // Fixed for TypeScript
    }
  };

  // Animation for the couple overlay
  const overlayReveal = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { 
      duration: 4.0, 
      delay: 0.8, 
      ease: "linear" as const // Fixed for TypeScript
    }
  };

  return (
    <>
      {/* --- EDITORIAL SPLASH SCREEN --- */}
{/* --- THE CINEMATIC VIGNETTE (EDITORIAL SPLASH) --- */}
{/* --- THE CINEMATIC VIGNETTE (SLEEK EDITORIAL) --- */}
<AnimatePresence>
  {!isOpen && (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        transition: { duration: 2, ease: [0.22, 1, 0.36, 1] } 
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#fcfcf8] font-serif overflow-hidden"
    >
      {/* --- ASSET-2 BACKGROUND LAYER --- */}
      {/* Large, low-opacity leaf texture for organic elegance */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 2.5 }}
        className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center"
      >
        <Image 
          src="/shared-assets/asset-2.png" 
          alt="Leaf Accent" 
          width={1200}
          height={800}
          className="w-[120%] h-auto max-w-none invert grayscale" 
        />
      </motion.div>

      <div className="max-w-6xl w-full mx-auto px-12 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* LEFT SIDE: VERTICAL ARCHITECTURAL DATE */}
        <div className="hidden md:flex md:col-span-2 flex-col items-start h-64 border-l border-emerald-950/10 pl-6">
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1.5 }}
            className="text-[10px] uppercase tracking-[1em] text-emerald-900/30 font-bold rotate-180 [writing-mode:vertical-lr] select-none"
          >
            ESTABLISHED MMXXVI
          </motion.span>
        </div>

        {/* CENTER-RIGHT: EDITORIAL NAMES */}
        <div className="md:col-span-10 flex flex-col items-start md:pl-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="space-y-6"
          >
            <span className="block uppercase tracking-[0.8em] text-[9px] text-emerald-900/40 font-bold">
              {data.branding.presents}
            </span>
            
            <h2 className="text-6xl md:text-8xl lg:text-9xl text-emerald-950 font-light tracking-tighter leading-[0.9] max-w-4xl">
              {data.couple.names}
            </h2>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 pt-16">
              {/* --- SLEEK & ELEGANT BUTTON --- */}
              {/* Enhanced visibility with larger text and stronger borders */}
              <button
                onClick={handleOpenInvitation}
                className="group relative flex items-center gap-4 cursor-pointer transition-all duration-500 hover:gap-6"
              >
                <span className="text-xs md:text-sm uppercase tracking-[0.5em] font-semibold text-emerald-900 group-hover:text-emerald-950 transition-colors duration-500 relative">
                  View Invitation
                  <span className="absolute bottom-0 left-0 w-full h-px bg-emerald-950/30 group-hover:bg-emerald-950 transition-colors duration-500" />
                </span>
                <div className="w-1 h-6 bg-emerald-950/20 relative overflow-hidden group-hover:bg-emerald-950/40 transition-colors duration-500 rounded-full">
                  <div className="absolute inset-0 bg-emerald-950 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.19, 1, 0.22, 1]" />
                </div>
              </button>

              <div className="hidden md:block w-32 h-[1px] bg-emerald-950/10" />
              
              <span className="text-[10px] uppercase tracking-[0.4em] text-emerald-900/30 italic">
                Laguna, Philippines
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ABSTRACT WATERMARK MONOGRAM */}
      <div className="absolute -top-20 -right-20 select-none pointer-events-none opacity-[0.02]">
        <h1 className="text-[35rem] font-bold text-emerald-950 leading-none">
          P & Z
        </h1>
      </div>
    </motion.div>
  )}
</AnimatePresence>

      {/* --- MAIN HERO SECTION --- */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center font-serif">
        <style dangerouslySetInnerHTML={{ __html: `
          @import url('https://fonts.googleapis.com/css2?family=Beth+Ellen&display=swap');
        `}} />

        {/* --- BACKGROUND LAYER --- */}
        <div 
          className="absolute inset-0 bg-cover bg-no-repeat bg-[url('/images/vintage-romance/image-2.10.jpg')] bg-[30%_center] md:bg-[url('/images/vintage-romance/image-2.10-desktop.png')] md:bg-center"
        >
          <div className="absolute inset-0 bg-black/20 md:bg-black/10 backdrop-sepia-[0.2]" />
        </div>

        {/* TOP BRANDING */}
        <div className="absolute top-8 left-0 right-0 z-20 text-center pointer-events-none">
            <span className="uppercase tracking-[0.2em] text-[10px] md:text-xs font-medium text-white/80">
                {data.branding.main}
            </span>
        </div>

        {/* --- CENTRAL CONTENT --- */}
        <motion.div 
          className="relative z-10 text-center text-[#fcfcf8] px-4 flex flex-col items-center select-none -translate-y-12 md:-translate-y-16"
          initial="initial"
          animate={isOpen ? "animate" : "initial"}
          variants={softReveal}
          transition={{ ...softReveal.transition, delay: 1.2 }} // Delayed central text
        >
          <h2 className="text-2xl md:text-4xl mb-0 tracking-wider font-light">
            {data.couple.names}
          </h2>
          <h1
              className="text-[5rem] md:text-[11rem] leading-[1] text-white"
              style={{ 
                fontFamily: "'Beth Ellen', cursive", 
                transform: 'rotate(-3deg) translateY(10px)' 
              }} 
          >
              {data.hero.title}
          </h1>
        </motion.div>

        {/* --- OVERLAY LAYER --- */}
        <motion.div 
          className="absolute inset-0 bg-cover bg-no-repeat z-20 pointer-events-none bg-[url('/images/vintage-romance/overlay.png')] bg-[30%_center] md:z-30 md:bg-[url('/images/vintage-romance/overlay-desktop.png')] md:bg-center"
          initial="initial"
          animate={isOpen ? "animate" : "initial"}
          variants={overlayReveal}
        />

        {/* --- FOREGROUND DATE --- */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30 pt-[21rem] md:pt-[26rem]"
          initial="initial"
          animate={isOpen ? "animate" : "initial"}
          variants={softReveal}
          transition={{ ...softReveal.transition, duration: 2.5, delay: 2.2 }} // Delayed date
        >
          <h3 className="text-2xl md:text-4xl tracking-[0.1em] font-light text-white drop-shadow-lg">
              {data.couple.date}
          </h3>
        </motion.div>

        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </section>

      {/* --- MUSIC SECTION --- */}
      <MusicSection autoPlay={shouldPlayMusic} />

      {/* --- NEW GALLERY SECTION --- */}
      <GallerySection />

      <StorySection />

      <CalendarSection />
      <AttendantsSection />
      <DressCodeSection />
      <LocationSection />
      <RSVPSection />
      <FooterSection />
    </>
  );
};

export default VintageRomance;