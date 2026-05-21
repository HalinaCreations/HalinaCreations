"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { MapPin, ExternalLink, Church, GlassWater } from "lucide-react";
import weddingData from "./lib/data.json";
import Image from "next/image";

const LocationSection = () => {
  const fadeInUp: Variants = {
    initial: { opacity: 0, y: 30 },
    whileInView: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const } 
    }
  };

  const fadeInDecor30: Variants = {
    initial: { opacity: 0 },
    whileInView: { 
      opacity: 0.3, 
      transition: { duration: 1.5, ease: "linear" as const } 
    }
  };

  const viewportConfig = { once: true, margin: "-50px" };

  return (
    <section id="location" className="py-24 bg-[#F8FAFC] relative overflow-hidden z-30">
      
      {/* --- DECORATIVE BACKGROUND ELEMENTS --- */}
      <motion.div 
        variants={fadeInDecor30}
        initial="initial"
        whileInView="whileInView"
        viewport={viewportConfig}
        className="absolute top-0 left-70 w-100 md:w-150 pointer-events-none z-0 -translate-x-1/4 -translate-y-1/4"
      >
        <Image src="/shared-assets/asset-2.png" alt="" width={600} height={600} className="w-full h-auto scale-x-[-1] scale-y-[-1]" />
      </motion.div>

     

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-20">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={viewportConfig}
          >
            <h2 className="text-5xl md:text-7xl text-[#1E293B] mb-4" style={{ fontFamily: "'Arizonia', cursive" }}>
              The Venues
            </h2>
            <div className="w-12 h-px bg-[#1E40AF] mx-auto opacity-30" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
          
          {/* Ceremony Card (Full Background Image) */}
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={viewportConfig}
            // Added group class for hover effect, fixed height, and relative positioning
            className="relative h-112.5 md:h-137.5 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group"
          >
            {/* Background Image Layer with Zoom Effect */}
            <div className="absolute inset-0">
              <Image 
                fill
                src={weddingData.location.ceremonyImg} 
                alt="Ceremony Venue" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            
            {/* Gradient Overlay for Readability (Deep Navy/Royal Blue) */}
            <div className="absolute inset-0 bg-linear-to-t from-[#0F172A] via-[#1E293B]/60 to-[#1E293B]/10" />

            {/* Content Layer (Z-10 to sit on top) */}
            <div className="relative z-10 h-full flex flex-col items-center justify-between p-10">
              {/* Top Icon (Updated styling for dark bg) */}
              <div className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white">
                <Church size={24} />
              </div>

              {/* Bottom Text Content (Updated colors to white/light blue) */}
              <div className="text-center flex flex-col items-center">
                <h3 className="text-[10px] uppercase font-bold tracking-[0.5em] text-[#DBEAFE] mb-4">The Ceremony</h3>
                <p className="text-4xl text-white font-serif italic mb-4 drop-shadow-md">{weddingData.location.ceremony}</p>
                <p className="text-[#94A3B8] text-xs leading-relaxed mb-8 max-w-xs uppercase tracking-[0.2em] font-bold">
                  {weddingData.location.ceremonyAddress}
                </p>
                
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={weddingData.location.ceremonyMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-white border-b border-white/50 pb-1 transition-colors hover:text-[#DBEAFE] hover:border-[#DBEAFE]"
                >
                  <MapPin size={12} />
                  View on Maps
                  <ExternalLink size={10} />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Reception Card (Full Background Image) */}
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={viewportConfig}
            transition={{ delay: 0.2 }}
            // Added group class, fixed height
            className="relative h-112.5 md:h-137.5 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group"
          >
            {/* Background Image Layer with Zoom Effect */}
            <div className="absolute inset-0">
              <Image 
                fill
                src={weddingData.location.receptionImg} 
                alt="Reception Venue" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-[#0F172A] via-[#1E293B]/60 to-[#1E293B]/10" />

            {/* Content Layer */}
            <div className="relative z-10 h-full flex flex-col items-center justify-between p-10">
              {/* Top Icon */}
              <div className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white">
                <GlassWater size={24} />
              </div>

              {/* Bottom Text Content */}
              <div className="text-center flex flex-col items-center">
                <h3 className="text-[10px] uppercase font-bold tracking-[0.5em] text-[#DBEAFE] mb-4">The Reception</h3>
                <p className="text-4xl text-white font-serif italic mb-4 drop-shadow-md">{weddingData.location.reception}</p>
                <p className="text-[#94A3B8] text-xs leading-relaxed mb-8 max-w-xs uppercase tracking-[0.2em] font-bold">
                  {weddingData.location.receptionAddress}
                </p>
                
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={weddingData.location.receptionMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-white border-b border-white/50 pb-1 transition-colors hover:text-[#DBEAFE] hover:border-[#DBEAFE]"
                >
                  <MapPin size={12} />
                  View on Maps
                  <ExternalLink size={10} />
                </motion.a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default LocationSection;