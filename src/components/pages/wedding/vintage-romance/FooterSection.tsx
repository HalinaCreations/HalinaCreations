"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import invitationData from './lib/data.json';
import Image from 'next/image';

// --- STRICT TYPE-SAFE INTERFACES ---
interface FooterData {
  coupleInitials: string; 
  coupleNames: string;
  weddingDate: string;
  locationShort: string;
  hashtag: string;
  thankYouNote: string;
}

interface InvitationStructure {
  vintageRomance: {
    footer: FooterData;
  };
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } 
  }
};

const FooterSection = () => {
  // Strict casting to maintain project standards
  const data = invitationData as unknown as InvitationStructure;
  const { footer } = data.vintageRomance;

  return (
    <footer className="relative w-full bg-[#edede2] pt-32 pb-16 px-6 overflow-hidden font-serif border-t border-emerald-950/5">
      
      {/* --- LARGE WATERMARK --- */}
      {/* Large-scale year as a sophisticated background anchor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none z-0">
        <h1 className="text-[20rem] md:text-[30rem] font-bold text-emerald-950/[0.02] leading-none tracking-tighter">
          2026
        </h1>
      </div>

      <div className="max-w-4xl w-full mx-auto relative z-10 flex flex-col items-center text-center">
        
        {/* --- DECORATIVE ASSET IMAGE --- */}
        {/* The leaf asset acts as a central floral crest */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.3, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="w-32 md:w-48 mb-2 opacity-10 "
        >
          <Image 
            src="/shared-assets/asset-2.png" 
            alt="Wedding Asset" 
            width={192}
            height={192}
            className="w-full h-auto" 
          />
        </motion.div>

        {/* --- THE THANK YOU NOTE --- */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-2 md:mb-24"
        >
          <p className="text-xl md:text-2xl text-emerald-900/60 leading-relaxed italic font-light max-w-2xl">
            {footer.thankYouNote}
          </p>
          <div className="w-12 h-[1px] bg-emerald-950/20 mx-auto mt-8" />
        </motion.div>

        {/* --- SECONDARY DETAILS --- */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-8 md:gap-24 mb-32"
        >
          <div className="space-y-1">
            <span className="text-[9px] uppercase tracking-[0.4em] text-emerald-900/40 font-bold block">The Date</span>
            <p className="text-sm tracking-[0.2em] font-light uppercase text-emerald-950">{footer.weddingDate}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[9px] uppercase tracking-[0.4em] text-emerald-900/40 font-bold block">The Hashtag</span>
            <p className="text-sm tracking-[0.2em] font-light text-emerald-950">{footer.hashtag}</p>
          </div>
        </motion.div>

        {/* --- THE BOTTOM SIGNATURE --- */}
        {/* Couple names as the final focal point */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ delay: 0.4 }}
          className="w-full pt-12 border-t border-emerald-950/5 flex flex-col items-center"
        >
          
          <p className="text-[9px] uppercase tracking-[0.6em] text-emerald-900/30 font-bold mt-4">
            © 2026 Ponce & Zy Wedding
          </p>
        </motion.div>

      </div>
      
      {/* --- RETURN TO TOP INTERACTION --- */}
      <div className="absolute bottom-10 right-10">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group flex flex-col items-center gap-2"
        >
          <span className="text-[8px] uppercase tracking-[0.4em] text-emerald-900/20 group-hover:text-emerald-950 transition-colors">Top</span>
          <div className="w-[1px] h-8 bg-emerald-950/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-emerald-950 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </div>
        </button>
      </div>

    </footer>
  );
};

export default FooterSection;