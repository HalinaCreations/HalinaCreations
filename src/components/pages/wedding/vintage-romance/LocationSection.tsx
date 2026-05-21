"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import invitationData from './lib/data.json';
import Image from 'next/image';

// --- STRICT TYPE-SAFE INTERFACES ---
interface LocationData {
  title: string;
  venueName: string;
  venueAddress: string;
  description: string;
  mapLink: string;
  venueImage: string;
}

interface InvitationStructure {
  vintageRomance: {
    location: LocationData;
  };
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  }
};

const LocationSection = () => {
  const data = invitationData as unknown as InvitationStructure;
  const { location } = data.vintageRomance;

  return (
    <section className="relative w-full py-40 bg-[#edede2] px-6 lg:px-12 overflow-hidden font-serif border-t border-emerald-950/5">
      
      {/* --- BACKGROUND ACCENT --- */}
      <div className="absolute top-0 left-0 pointer-events-none z-0 w-full max-w-[500px] opacity-[0.04] grayscale">
        <Image src="/shared-assets/asset-2.png" alt="Leaf Accent" width={500} height={500} className="w-full h-auto" />
      </div>

      <div className="max-w-7xl w-full mx-auto relative z-10">
        
        {/* TOP HEADER: Editorial Alignment */}
        

        {/* MAIN GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* --- LEFT: THE NARRATIVE --- */}
          <div className="lg:col-span-5 space-y-12">
            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="space-y-4"
            >
              <span className="text-[10px] uppercase tracking-[0.6em] text-emerald-900/30 font-bold block">
                The Venue
              </span>
              <h3 className="text-4xl md:text-6xl text-emerald-950 font-light tracking-tight leading-tight">
                {location.venueName}
              </h3>
            </motion.div>

            <motion.p 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: 0.2 }}
              className="text-emerald-900/60 leading-relaxed italic text-xl max-w-md border-l-2 border-[#A3BCA7]/20 pl-8"
            >
              {location.description}
            </motion.p>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: 0.3 }}
            >
              <a 
                href={location.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-6 text-[10px] uppercase tracking-[0.4em] font-bold text-emerald-950"
              >
                <span className="relative">
                  Get Directions
                  <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-emerald-950 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </span>
                <div className="w-10 h-10 rounded-full border border-emerald-950/20 flex items-center justify-center group-hover:bg-emerald-950 group-hover:text-[#edede2] transition-all duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </a>
            </motion.div>
          </div>

          {/* --- RIGHT: THE VISUAL (ASSET & OVERLAP) --- */}
          <div className="lg:col-span-7 relative">
            
            {/* Floating Back-Frame Decoration */}
            <div className="absolute -top-10 -right-10 w-full h-full border border-emerald-950/5 z-0 hidden lg:block" />

            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="relative z-10 aspect-[16/10] overflow-hidden group shadow-2xl"
            >
              <Image 
                fill
                src={location.venueImage} 
                alt="Venue Background" 
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full h-full object-cover grayscale-[20%] group-hover:scale-110 transition-transform duration-[2s] ease-out"
              />
              <div className="absolute inset-0 bg-emerald-950/10 mix-blend-multiply" />
              
              {/* Address Overlay Card: Stylish & Modern */}
              <div className="absolute bottom-0 left-0 bg-[#edede2] p-8 md:p-12 max-w-xs md:max-w-md translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
                <span className="text-[9px] uppercase tracking-[0.4em] text-emerald-900/40 font-bold block mb-3">
                  Location Detail
                </span>
                <p className="text-xl md:text-2xl text-emerald-950 font-light tracking-tight">
                  {location.venueAddress}
                </p>
              </div>
            </motion.div>

            {/* Cinematic Vertical Label */}
            <div className="absolute -right-8 top-1/2 -translate-y-1/2 hidden xl:block">
              <p className="text-[10px] uppercase tracking-[1em] text-emerald-900/10 font-bold rotate-90 origin-center whitespace-nowrap">
                {location.venueName}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Decorative Bottom Watermark */}
      <div className="absolute -bottom-10 right-10 select-none pointer-events-none opacity-[0.03]">
        <h1 className="text-[15rem] font-bold text-emerald-950 leading-none">
          Setting
        </h1>
      </div>
    </section>
  );
};

export default LocationSection;