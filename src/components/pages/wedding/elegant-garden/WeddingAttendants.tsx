"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

import weddingData from "./lib/data.json";
import Image from "next/image";

const WeddingAttendants = () => {
  // Accessing the attendants data from your JSON
  const entourage = weddingData.attendants;

  /**
   * ANIMATION VARIANTS
   * To fix the "full opacity" issue, we set the target opacity directly 
   * in the variants. Framer Motion inline styles override Tailwind classes.
   */
  const fadeInUp: Variants = {
    initial: { opacity: 0, y: 30 },
    whileInView: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const } 
    }
  };

  // Variant for Asset-2 (30% Opacity)
  const fadeInDecor30: Variants = {
    initial: { opacity: 0 },
    whileInView: { 
      opacity: 0.3, 
      transition: { duration: 1.5, ease: "linear" as const } 
    }
  };

  // Variant for Asset-3 (50% Opacity)
  const fadeInDecor50: Variants = {
    initial: { opacity: 0 },
    whileInView: { 
      opacity: 0.5, 
      transition: { duration: 1.5, ease: "linear" as const } 
    }
  };

  const staggerContainer: Variants = {
    initial: { opacity: 0 },
    whileInView: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const staggerItem: Variants = {
    initial: { opacity: 0, y: 20 },
    whileInView: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 } 
    }
  };

  const viewportConfig = { once: true, margin: "-50px" };

  return (
    <section id="attendants" className="py-20 bg-[#F8FAFC] relative overflow-hidden z-30">
      
      {/* --- TOP DECORATIVE OVERLAYS --- */}
      {/* Asset-2 at 30% Opacity */}
      <motion.div 
        variants={fadeInDecor30}
        initial="initial"
        whileInView="whileInView"
        viewport={viewportConfig}
        className="absolute top-0 left-0 w-[400px] md:w-[600px] pointer-events-none z-0 -translate-x-1/4 -translate-y-1/4"
      >
        <Image 
          src="/shared-assets/asset-2.png" 
          alt="Decoration" 
          width={600}
          height={600}
          className="w-full h-auto scale-x-[-1] scale-y-[-1]" 
        />
      </motion.div>

      {/* Asset-3 at 50% Opacity */}
      <motion.div 
        variants={fadeInDecor50}
        initial="initial"
        whileInView="whileInView"
        viewport={viewportConfig}
        transition={{ delay: 0.2 }}
        className="absolute top-0 left-40 w-[200px] md:w-[400px] pointer-events-none z-0 -translate-x-1/4 -translate-y-1/4"
      >
        <Image 
          src="/shared-assets/asset-3.png" 
          alt="Decoration" 
          width={600}
          height={600}
          className="w-full h-auto scale-x-[-1] scale-y-[-1]" 
        />
      </motion.div>

      {/* --- BOTTOM DECORATIVE OVERLAYS --- */}
      {/* Asset-2 at 30% Opacity */}
      <motion.div 
        variants={fadeInDecor30}
        initial="initial"
        whileInView="whileInView"
        viewport={viewportConfig}
        className="absolute bottom-10 right-0 w-[400px] md:w-[600px] pointer-events-none z-0 translate-x-1/4 translate-y-1/4"
      >
        <Image 
          src="/shared-assets/asset-2.png" 
          alt="Decoration" 
          width={600}
          height={600}
          className="w-full h-auto scale-x-[-1]" 
        />
      </motion.div>

      {/* Asset-3 at 50% Opacity */}
      <motion.div 
        variants={fadeInDecor50}
        initial="initial"
        whileInView="whileInView"
        viewport={viewportConfig}
        transition={{ delay: 0.4 }}
        className="absolute bottom-5 right-0 w-[200px] md:w-[400px] pointer-events-none z-0 translate-x-1/4 translate-y-1/4"
      >
        <Image 
          src="/shared-assets/asset-3.png" 
          alt="Decoration" 
          width={600}
          height={600}
          className="w-full h-auto scale-x-[-1]" 
        />
      </motion.div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={viewportConfig}
          >
            <h2 
              className="text-5xl md:text-6xl text-[#1E293B] mb-4"
              style={{ fontFamily: "'Arizonia', cursive" }}
            >
              The Wedding Party
            </h2>
            <div className="w-16 h-[1px] bg-[#1E40AF] mx-auto opacity-30" />
          </motion.div>
        </div>

        {/* --- ATTENDANTS GRID --- */}
        <div className="space-y-16 text-center">
          
          {/* Principal Sponsors */}
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={viewportConfig}
            className="space-y-8"
          >
            <h3 className="text-[10px] uppercase font-bold tracking-[0.5em] text-[#1E40AF]">
              Principal Sponsors
            </h3>
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 max-w-2xl mx-auto"
            >
              {entourage.sponsors.map((name: string, i: number) => (
                <motion.p key={i} variants={staggerItem} className="text-lg text-[#1E293B] font-serif italic">{name}</motion.p>
              ))}
            </motion.div>
          </motion.div>

          {/* Lead Attendants */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl mx-auto">
            <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={viewportConfig} className="space-y-4">
              <h3 className="text-[10px] uppercase font-bold tracking-[0.5em] text-[#1E40AF]">Best Man</h3>
              <p className="text-xl text-[#1E293B] font-serif italic">{entourage.bestMan}</p>
            </motion.div>
            <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={viewportConfig} className="space-y-4">
              <h3 className="text-[10px] uppercase font-bold tracking-[0.5em] text-[#1E40AF]">Maid of Honor</h3>
              <p className="text-xl text-[#1E293B] font-serif italic">{entourage.maidOfHonor}</p>
            </motion.div>
          </div>

          {/* Groomsmen & Bridesmaids */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8">
            {/* Groomsmen */}
            <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={viewportConfig} className="space-y-6">
              <h3 className="text-[10px] uppercase font-bold tracking-[0.5em] text-[#1E40AF]">Groomsmen</h3>
              <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="space-y-2">
                {entourage.groomsmen.map((name: string, i: number) => (
                  <motion.p key={i} variants={staggerItem} className="text-[#1E293B] font-sans font-light tracking-wide">{name}</motion.p>
                ))}
              </motion.div>
            </motion.div>

            {/* Bridesmaids */}
            <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={viewportConfig} className="space-y-6">
              <h3 className="text-[10px] uppercase font-bold tracking-[0.5em] text-[#1E40AF]">Bridesmaids</h3>
              <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="space-y-2">
                {entourage.bridesmaids.map((name: string, i: number) => (
                  <motion.p key={i} variants={staggerItem} className="text-[#1E293B] font-sans font-light tracking-wide">{name}</motion.p>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeddingAttendants;