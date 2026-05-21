"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import weddingData from "./lib/data.json";
import Image from "next/image";

const RSVPSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Cycle images every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % weddingData.music.slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // AOS-style variants
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="rsvp" className="bg-[#F8FAFC] relative overflow-hidden z-30">
      
      {/* --- DECORATIVE BACKGROUND ELEMENTS --- */}
      <motion.div 
        variants={fadeInDecor30}
        initial="initial"
        whileInView="whileInView"
        viewport={viewportConfig}
        className="absolute bottom-0 right-0 w-[400px] md:w-[600px] pointer-events-none z-0 translate-x-1/4 translate-y-1/4"
      >
        <Image src="/shared-assets/asset-2.png" alt="" width={600} height={600} className="w-full h-auto" />
      </motion.div>

      <div className="w-full flex flex-col lg:flex-row lg:items-stretch">
        
        {/* --- LEFT SIDE: SLIDESHOW --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
          /* lg:h-[750px] matches the right side for equal sizing */
          className="relative w-full lg:w-1/2 h-[350px] lg:h-[750px] overflow-hidden"
        >
          <AnimatePresence initial={false}>
            <motion.img
              key={currentImageIndex}
              src={weddingData.music.slides[currentImageIndex]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" as const }}
              className="absolute inset-0 w-full h-full object-cover"
              alt="Wedding Moment"
            />
          </AnimatePresence>
          {/* Mobile-only gradient */}
        </motion.div>

        {/* --- RIGHT SIDE: FORM CONTAINER --- */}
        <div className="w-full lg:w-1/2 lg:h-[750px] flex items-center justify-center p-6 md:p-12 lg:p-16 relative z-10">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={viewportConfig}
            className="w-full max-w-xl bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(30,64,175,0.08)] border border-[#DBEAFE]"
          >
            {!submitted ? (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-5xl md:text-6xl text-[#1E293B] mb-3" style={{ fontFamily: "'Arizonia', cursive" }}>
                    Kindly Respond
                  </h2>
                  <p className="text-[#1E40AF] font-sans font-bold uppercase tracking-[0.4em] text-[10px]">
                    RSVP by {weddingData.month} 1st, {weddingData.year}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-[#64748B] ml-1">Full Name</label>
                    <input 
                      required
                      type="text"
                      placeholder="Enter your name"
                      className="w-full bg-[#F8FAFC] border border-[#DBEAFE] rounded-2xl px-6 py-4 text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20 transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-[#64748B] ml-1">Will you attend?</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label className="relative flex items-center justify-center p-3 border border-[#DBEAFE] rounded-2xl cursor-pointer hover:bg-[#F8FAFC] transition-colors has-[:checked]:bg-[#DBEAFE]/30 has-[:checked]:border-[#1E40AF]">
                        <input type="radio" name="attendance" value="yes" className="hidden" required />
                        <span className="text-[#1E293B] font-medium text-sm">Joyfully Accepts</span>
                      </label>
                      <label className="relative flex items-center justify-center p-3 border border-[#DBEAFE] rounded-2xl cursor-pointer hover:bg-[#F8FAFC] transition-colors has-[:checked]:bg-[#DBEAFE]/30 has-[:checked]:border-[#1E40AF]">
                        <input type="radio" name="attendance" value="no" className="hidden" />
                        <span className="text-[#1E293B] font-medium text-sm">Regretfully Declines</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-[#64748B] ml-1">Meal Preference</label>
                    <select className="w-full bg-[#F8FAFC] border border-[#DBEAFE] rounded-2xl px-6 py-4 text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20 appearance-none transition-all">
                      <option>Standard Menu</option>
                      <option>Vegetarian</option>
                      <option>Vegan</option>
                      <option>Gluten-Free</option>
                    </select>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-[#1E293B] hover:bg-[#1E40AF] text-white font-bold py-5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
                  >
                    <Send size={18} />
                    Send Response
                  </motion.button>
                </form>
              </>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <CheckCircle2 size={64} className="text-[#1E40AF] mx-auto mb-6" />
                <h3 className="text-3xl font-bold text-[#1E293B] mb-2">Thank You!</h3>
                <p className="text-[#64748B]">Your response has been successfully sent.</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RSVPSection;