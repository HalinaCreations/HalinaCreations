"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import birthdayData from "./lib/data.json";
import Image from "next/image";

const RSVPSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % birthdayData.music.slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const fadeInUp: Variants = {
    initial: { opacity: 0, y: 30 },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  const fadeInDecor20: Variants = {
    initial: { opacity: 0 },
    whileInView: {
      opacity: 0.2,
      transition: { duration: 1.5, ease: "linear" as const },
    },
  };

  const viewportConfig = { once: true, margin: "-50px" };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="rsvp" className="bg-[#FFF8FC] relative overflow-hidden z-30">
      {/* Decorative */}
      <motion.div
        variants={fadeInDecor20}
        initial="initial"
        whileInView="whileInView"
        viewport={viewportConfig}
        className="absolute bottom-0 right-0 w-100 md:w-150 pointer-events-none z-0 translate-x-1/4 translate-y-1/4"
      >
        <Image
          src="/shared-assets/asset-2.png"
          alt=""
          width={600}
          height={600}
          className="w-full h-auto"
          style={{ filter: "hue-rotate(280deg) saturate(1.2)" }}
        />
      </motion.div>

      <div className="w-full flex flex-col lg:flex-row lg:items-stretch">
        {/* Left: Slideshow */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
          className="relative w-full lg:w-1/2 h-87.5 lg:h-187.5 overflow-hidden"
        >
          <AnimatePresence initial={false}>
            <motion.img
              key={currentImageIndex}
              src={birthdayData.music.slides[currentImageIndex]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" as const }}
              className="absolute inset-0 w-full h-full object-cover"
              alt="Birthday Moment"
            />
          </AnimatePresence>
        </motion.div>

        {/* Right: Form */}
        <div className="w-full lg:w-1/2 lg:h-187.5 flex items-center justify-center p-6 md:p-12 lg:p-16 relative z-10">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={viewportConfig}
            className="w-full max-w-xl bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(192,38,211,0.08)] border border-[#FAE8FF]"
          >
            {!submitted ? (
              <>
                <div className="text-center mb-8">
                  <h2
                    className="text-5xl md:text-6xl text-[#4A1942] mb-3"
                    style={{ fontFamily: "'Dancing Script', cursive" }}
                  >
                    Will You Join Us?
                  </h2>
                  <p className="text-[#C026D3] font-sans font-bold uppercase tracking-[0.4em] text-[10px]">
                    RSVP by {birthdayData.month} 1st, {birthdayData.year}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-[#64748B] ml-1">
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Enter your name"
                      className="w-full bg-[#FFF8FC] border border-[#FAE8FF] rounded-2xl px-6 py-4 text-[#4A1942] focus:outline-none focus:ring-2 focus:ring-[#C026D3]/20 transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-[#64748B] ml-1">
                      Will you attend?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label className="relative flex items-center justify-center p-3 border border-[#FAE8FF] rounded-2xl cursor-pointer hover:bg-[#FFF8FC] transition-colors has-checked:bg-[#FAE8FF]/30 has-checked:border-[#C026D3]">
                        <input type="radio" name="attendance" value="yes" className="hidden" required />
                        <span className="text-[#4A1942] font-medium text-sm">Joyfully Accepts</span>
                      </label>
                      <label className="relative flex items-center justify-center p-3 border border-[#FAE8FF] rounded-2xl cursor-pointer hover:bg-[#FFF8FC] transition-colors has-checked:bg-[#FAE8FF]/30 has-checked:border-[#C026D3]">
                        <input type="radio" name="attendance" value="no" className="hidden" />
                        <span className="text-[#4A1942] font-medium text-sm">Regretfully Declines</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-[#64748B] ml-1">
                      Meal Preference
                    </label>
                    <select className="w-full bg-[#FFF8FC] border border-[#FAE8FF] rounded-2xl px-6 py-4 text-[#4A1942] focus:outline-none focus:ring-2 focus:ring-[#C026D3]/20 appearance-none transition-all">
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
                    className="w-full bg-[#4A1942] hover:bg-[#C026D3] text-white font-bold py-5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
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
                <CheckCircle2 size={64} className="text-[#C026D3] mx-auto mb-6" />
                <h3 className="text-3xl font-bold text-[#4A1942] mb-2">Thank You!</h3>
                <p className="text-[#64748B]">Your response has been sent. See you at the party!</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RSVPSection;
