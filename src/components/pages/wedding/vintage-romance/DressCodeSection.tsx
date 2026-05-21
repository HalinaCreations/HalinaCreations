"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import invitationData from './lib/data.json';
import Image from 'next/image';

// --- STRICT TYPE-SAFE INTERFACES ---
interface DressCodeData {
  title: string;
  subtitle: string;
  style: string;
  description: string;
  colors: string[];
  colorNote: string;
}

interface InvitationStructure {
  vintageRomance: {
    dressCode: DressCodeData;
  };
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const DressCodeSection = () => {
  const data = invitationData as unknown as InvitationStructure;
  const { dressCode } = data.vintageRomance;

  return (
    <section className="relative w-full py-40 bg-[#edede2] flex flex-col items-center px-6 overflow-hidden font-serif border-t border-emerald-950/5">
      
      {/* --- RIGHT-SIDE MIRRORED LEAF ASSET --- */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 pointer-events-none z-0 w-1/2 max-w-[600px]">
        <Image 
          src="/shared-assets/asset-2.png" 
          alt="Vintage Leaf Accent" 
          width={600}
          height={600}
          className="w-full h-auto object-cover opacity-[0.08] grayscale scale-x-[-1]" 
        />
      </div>

      <div className="max-w-6xl w-full relative z-10 flex flex-col gap-24 items-center">
        
        {/* TOP GRID: TEXT AND COLOR STORY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center w-full">
            {/* --- LEFT COLUMN: THE NARRATIVE --- */}
            <div className="lg:col-span-6 space-y-16">
            
            {/* BEAUTIFUL HEADER (Pinned style) */}
            <motion.div 
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUpVariants}
                className="text-left"
            >
                <h2 className="text-5xl md:text-8xl text-emerald-950 font-light tracking-tighter leading-none mb-6">
                {dressCode.title}
                </h2>
                <p 
                className="text-xl md:text-4xl text-emerald-900/50 italic leading-snug"
                style={{ fontFamily: "'Beth Ellen', cursive" }}
                >
                {dressCode.subtitle}
                </p>
                <div className="w-16 h-[1px] bg-[#A3BCA7] mt-10 opacity-40" />
            </motion.div>

            {/* ATTIRE DETAILS */}
            <motion.div 
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUpVariants}
                className="space-y-6"
            >
                <div className="inline-block border-l-2 border-[#A3BCA7]/30 pl-6">
                <span className="text-[10px] uppercase tracking-[0.5em] text-emerald-900/30 font-bold block mb-2">
                    The Aesthetic
                </span>
                <p className="text-4xl md:text-5xl text-emerald-950 font-light tracking-tight leading-tight">
                    {dressCode.style}
                </p>
                </div>
                <p className="text-emerald-900/60 leading-relaxed italic text-xl max-w-md">
                {dressCode.description}
                </p>
            </motion.div>
            </div>

            {/* --- RIGHT COLUMN: THE COLOR STORY --- */}
            <div className="lg:col-span-6 flex flex-col items-center lg:items-end justify-center">
            
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="relative flex flex-row lg:flex-col gap-4 lg:gap-0 h-40 lg:h-[500px] w-full lg:w-48 items-end"
            >
                <span className="hidden lg:block absolute -left-20 bottom-0 text-[10px] uppercase tracking-[0.8em] text-emerald-900/20 font-bold -rotate-90 origin-bottom-left whitespace-nowrap">
                The Wedding Color Story
                </span>

                {dressCode.colors.map((color, idx) => (
                <motion.div 
                    key={idx}
                    variants={fadeUpVariants}
                    whileHover={{ width: "100%", transition: { duration: 0.4 } }}
                    className="flex-1 lg:w-32 h-full lg:h-auto border border-white/20 shadow-sm transition-all duration-500 cursor-crosshair"
                    style={{ backgroundColor: color }}
                />
                ))}
            </motion.div>

            <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-8 text-emerald-900/40 text-xs italic tracking-widest text-center lg:text-right max-w-[200px]"
            >
                {dressCode.colorNote}
            </motion.p>
            </div>
        </div>

        {/* --- BOTTOM SECTION: CINEMATIC VIDEO --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-screen relative group -mx-6"
        >
          {/* Decorative Frame Border */}
          <div className="absolute -inset-4 border border-emerald-950/5 pointer-events-none group-hover:scale-[1.02] transition-transform duration-700" />
          
          <div className="relative overflow-hidden shadow-2xl rounded-sm h-[600px] bg-emerald-900/10">
            <video 
              className="w-full h-full object-cover"
              autoPlay 
              loop 
              muted 
              playsInline
            >
              <source src="/videos/video-2.2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Subtle Overlay to match the aesthetic */}
            <div className="absolute inset-0 bg-emerald-950/5 mix-blend-multiply pointer-events-none" />
          </div>

          
        </motion.div>

      </div>

      {/* Decorative Watermark */}
      <div className="absolute -bottom-10 left-10 select-none pointer-events-none opacity-[0.03]">
        <h1 className="text-[15rem] font-bold text-emerald-950 leading-none">
          Elegance
        </h1>
      </div>
    </section>
  );
};

export default DressCodeSection;