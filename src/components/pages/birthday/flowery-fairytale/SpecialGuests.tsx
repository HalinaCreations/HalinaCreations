"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Sparkles } from "lucide-react";
import birthdayData from "./lib/data.json";
import Image from "next/image";

const SpecialGuests = () => {
  const entourage = birthdayData.entourage;

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

  const staggerContainer: Variants = {
    initial: { opacity: 0 },
    whileInView: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const staggerItem: Variants = {
    initial: { opacity: 0, y: 20 },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const viewportConfig = { once: true, margin: "-50px" };

  return (
    <section id="attendants" className="py-20 bg-[#FFF8FC] relative overflow-hidden z-30">

      {/* Decorative florals */}
      <motion.div
        variants={fadeInDecor20}
        initial="initial"
        whileInView="whileInView"
        viewport={viewportConfig}
        className="absolute top-0 left-0 w-100 md:w-150 pointer-events-none z-0 -translate-x-1/4 -translate-y-1/4"
      >
        <Image
          src="/shared-assets/asset-2.png"
          alt=""
          width={600}
          height={600}
          className="w-full h-auto scale-x-[-1] scale-y-[-1]"
          style={{ filter: "hue-rotate(280deg) saturate(1.2)" }}
        />
      </motion.div>

      <motion.div
        variants={fadeInDecor20}
        initial="initial"
        whileInView="whileInView"
        viewport={viewportConfig}
        className="absolute bottom-10 right-0 w-100 md:w-150 pointer-events-none z-0 translate-x-1/4 translate-y-1/4"
      >
        <Image
          src="/shared-assets/asset-2.png"
          alt=""
          width={600}
          height={600}
          className="w-full h-auto scale-x-[-1]"
          style={{ filter: "hue-rotate(280deg) saturate(1.2)" }}
        />
      </motion.div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={viewportConfig}
          >
            <h2
              className="text-5xl md:text-6xl text-[#4A1942] mb-4"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              The Fairytale Court
            </h2>
            <div className="w-16 h-px bg-[#C026D3] mx-auto opacity-30" />
          </motion.div>
        </div>

        <div className="space-y-16 text-center">

          {/* Godparents */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={viewportConfig}
            className="space-y-8"
          >
            <h3 className="text-[10px] uppercase font-bold tracking-[0.5em] text-[#C026D3]">
              Godparents
            </h3>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 max-w-2xl mx-auto"
            >
              {entourage.godparents.map((name, i) => (
                <motion.p key={i} variants={staggerItem} className="text-lg text-[#4A1942] font-serif italic">
                  {name}
                </motion.p>
              ))}
            </motion.div>
          </motion.div>

          {/* Parents */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl mx-auto">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={viewportConfig}
              className="space-y-4"
            >
              <h3 className="text-[10px] uppercase font-bold tracking-[0.5em] text-[#C026D3]">Father</h3>
              <p className="text-xl text-[#4A1942] font-serif italic">{entourage.parents.father}</p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={viewportConfig}
              className="space-y-4"
            >
              <h3 className="text-[10px] uppercase font-bold tracking-[0.5em] text-[#C026D3]">Mother</h3>
              <p className="text-xl text-[#4A1942] font-serif italic">{entourage.parents.mother}</p>
            </motion.div>
          </div>

          {/* Siblings & Best Friends */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={viewportConfig}
              className="space-y-6"
            >
              <h3 className="text-[10px] uppercase font-bold tracking-[0.5em] text-[#C026D3]">Siblings</h3>
              <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="space-y-2">
                {entourage.siblings.map((name, i) => (
                  <motion.p key={i} variants={staggerItem} className="text-[#4A1942] font-sans font-light tracking-wide">
                    {name}
                  </motion.p>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={viewportConfig}
              className="space-y-6"
            >
              <h3 className="text-[10px] uppercase font-bold tracking-[0.5em] text-[#C026D3]">Best Friends</h3>
              <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="space-y-2">
                {entourage.bestFriends.map((name, i) => (
                  <motion.p key={i} variants={staggerItem} className="text-[#4A1942] font-sans font-light tracking-wide">
                    {name}
                  </motion.p>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* 18 Roses */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={viewportConfig}
            className="space-y-8"
          >
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-px bg-[#C026D3] opacity-30" />
              <Sparkles size={16} className="text-[#C026D3]" />
              <h3 className="text-[10px] uppercase font-bold tracking-[0.5em] text-[#C026D3]">
                18 Roses
              </h3>
              <Sparkles size={16} className="text-[#C026D3]" />
              <div className="w-12 h-px bg-[#C026D3] opacity-30" />
            </div>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3 max-w-xl mx-auto"
            >
              {entourage.roses.map((name, i) => (
                <motion.div key={i} variants={staggerItem} className="flex items-center gap-2">
                  <span className="text-[#C026D3] text-xs font-bold">{(i + 1).toString().padStart(2, "0")}.</span>
                  <p className="text-[#4A1942] font-sans font-light text-sm tracking-wide">{name}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default SpecialGuests;
