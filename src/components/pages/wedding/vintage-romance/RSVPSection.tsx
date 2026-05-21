"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import invitationData from './lib/data.json';
import Image from 'next/image';

// --- STRICT TYPE-SAFE INTERFACES ---
interface RSVPData {
  title: string;
  subtitle: string;
  deadline: string;
  confirmationText: string;
}

interface InvitationStructure {
  vintageRomance: {
    rsvp: RSVPData;
  };
}

const fadeUp: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  }
};

const RSVPSection = () => {
  // Strict casting ensures no 'any' keywords are used
  const data = invitationData as unknown as InvitationStructure;
  const { rsvp } = data.vintageRomance;

  // Interactive State
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [guestCount, setGuestCount] = useState("0");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isFormValid = name.trim().length > 0 && attending !== null;

  return (
    <section className="relative w-full py-32 md:py-48 bg-[#edede2] px-6 md:px-12 lg:px-24 overflow-hidden font-serif border-t border-emerald-950/5">
      
      {/* --- BACKGROUND ACCENT --- */}
      <div className="absolute top-0 right-0 pointer-events-none z-0 w-full max-w-[500px] opacity-[0.04] grayscale">
        <Image src="/shared-assets/asset-2.png" alt="Leaf Accent" width={500} height={500} className="w-full h-auto" />
      </div>

      {/* MAIN GRID: 12-column layout for desktop editorial feel */}
      <div className="max-w-7xl w-full mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0">
        
        {/* --- LEFT COLUMN: HEADER --- */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="lg:col-span-4 text-left flex flex-col justify-start lg:pr-12"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl text-emerald-950 font-light tracking-tighter leading-none mb-6">
            {rsvp.title}
          </h2>
          <p 
            className="text-xl md:text-2xl text-emerald-900/40 italic"
            style={{ fontFamily: "'Beth Ellen', cursive" }}
          >
            {rsvp.subtitle}
          </p>
          <div className="w-16 h-[1px] bg-[#A3BCA7] mt-10 opacity-40" />
          <p className="mt-6 text-[10px] uppercase tracking-[0.6em] text-emerald-900/30 font-bold">
            {rsvp.deadline}
          </p>
        </motion.div>

        {/* --- CENTER: VERTICAL SEPARATOR (Desktop Only) --- */}
        <div className="hidden lg:flex lg:col-span-1 justify-center">
          <div className="w-[1px] h-full bg-emerald-950/10" />
        </div>

        {/* --- RIGHT COLUMN: NARRATIVE PROSE --- */}
        <div className="lg:col-span-7 flex flex-col justify-center lg:pl-16">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div 
                key="rsvp-form"
                initial="hidden"
                whileInView="show"
                exit={{ opacity: 0, x: 20 }}
                variants={fadeUp}
                className="space-y-12 lg:space-y-16"
              >
                {/* PROSE: Elegant lg:text-4xl scale */}
                <div className="text-3xl md:text-4xl lg:text-4xl text-emerald-950 font-light leading-[1.6] tracking-tight text-left">
                  <span className="inline-block mr-4">Dearest Couple, I,</span>
                  <input 
                    type="text" 
                    placeholder="[ full name ]"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-transparent border-b border-emerald-950/20 px-2 focus:outline-none focus:border-emerald-950 transition-colors placeholder:text-emerald-950/10 text-[#A3BCA7] italic w-full md:w-auto mb-4 md:mb-0"
                   
                  />
                  <span className="mx-4">would</span>
                  
                  <span className="inline-flex gap-4 md:gap-8 mt-4 md:mt-0">
                    <button 
                      onClick={() => setAttending(true)}
                      className={`transition-all duration-500 pb-1 border-b-2 ${attending === true ? 'border-[#A3BCA7] text-emerald-950' : 'border-transparent text-emerald-950/20 hover:text-emerald-950'}`}
                    >
                      love to
                    </button>
                    <span className="text-emerald-950/10">/</span>
                    <button 
                      onClick={() => setAttending(false)}
                      className={`transition-all duration-500 pb-1 border-b-2 ${attending === false ? 'border-red-200 text-emerald-950' : 'border-transparent text-emerald-950/20 hover:text-emerald-950'}`}
                    >
                      sadly miss
                    </button>
                  </span>

                  <span className="block mt-6 lg:mt-10">
                    the celebration. I will be joining with
                    <select 
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="mx-4 md:mx-6 bg-transparent border-b border-emerald-950/20 focus:outline-none focus:border-emerald-950 cursor-pointer text-[#A3BCA7] py-1"
                    >
                      {['0', '1', '2', '3'].map(num => <option key={num} value={num} className="bg-[#edede2] text-emerald-950">{num}</option>)}
                    </select>
                    guests.
                  </span>
                </div>

                {/* --- RESPONSIVE ENGAGING BUTTON --- */}
                {/* Mobile: justify-center | Desktop: justify-end */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isFormValid ? 1 : 0.2 }}
                  className="pt-6 flex justify-center lg:justify-end"
                >
                  <button 
                    disabled={!isFormValid}
                    onClick={() => setIsSubmitted(true)}
                    className="group relative h-16 w-full max-w-[320px] flex items-center justify-center overflow-hidden border border-emerald-950/30 rounded-full transition-all duration-700 ease-in-out hover:border-emerald-950"
                  >
                    <div className="absolute inset-0 z-0 bg-emerald-950 scale-x-0 transition-transform duration-700 ease-[0.22, 1, 0.36, 1] origin-center group-hover:scale-x-100" />
                    <span className="relative z-10 w-full text-center text-[9px] uppercase tracking-[0.8em] font-bold text-emerald-950 transition-all duration-700 group-hover:text-[#edede2] group-hover:tracking-[1em] pl-[0.8em]">
                      Confirm Reply
                    </span>
                    <div className="absolute left-6 w-1 h-1 rounded-full bg-[#A3BCA7] scale-0 group-hover:scale-100 transition-transform duration-500 delay-100" />
                  </button>
                </motion.div>
              </motion.div>
            ) : (
              /* --- CONFIRMATION STATE --- */
              <motion.div 
                key="confirmation"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:pl-8 flex flex-col items-start lg:items-end space-y-10"
              >
                <div className="w-12 h-12 rounded-full border border-[#A3BCA7] flex items-center justify-center text-[#A3BCA7]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div className="space-y-4 text-left lg:text-right">
                  <h3 className="text-5xl md:text-7xl text-emerald-950 font-light tracking-tighter">
                    {attending ? "Awaiting your arrival." : "You'll be missed."}
                  </h3>
                  <p className="text-emerald-900/50 italic text-xl md:text-2xl lg:text-3xl">
                    {rsvp.confirmationText}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* --- ASYMMETRIC WATERMARK --- */}
      <div className="absolute -bottom-10 left-10 select-none pointer-events-none opacity-[0.02]">
        <h1 className="text-[15rem] lg:text-[20rem] font-bold text-emerald-950 leading-none">
          R
        </h1>
      </div>
    </section>
  );
};

export default RSVPSection;