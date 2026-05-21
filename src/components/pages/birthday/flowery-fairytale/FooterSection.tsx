"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Sparkles } from "lucide-react";
import birthdayData from "./lib/data.json";

const FooterSection = () => {
  const fadeInUp: Variants = {
    initial: { opacity: 0, y: 20 },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const viewportConfig = { once: true, margin: "-20px" };

  return (
    <footer className="bg-[#FFF8FC] pt-24 pb-12 overflow-hidden text-[#4A1942]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 0.2 }}
          viewport={viewportConfig}
          transition={{ duration: 1.5 }}
          className="w-24 h-px bg-[#C026D3] mx-auto mb-16"
        />

        {/* Branding */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
          viewport={viewportConfig}
          className="space-y-6 mb-20"
        >
          <h2
            className="text-5xl md:text-6xl text-[#4A1942]"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            {birthdayData.celebrant}&apos;s {birthdayData.age}th Birthday
          </h2>

          <div className="flex flex-col items-center gap-3">
            <span className="uppercase tracking-[0.6em] text-[10px] font-bold text-[#C026D3]">
              {birthdayData.dateLabel}
            </span>
            <span className="text-xs tracking-[0.2em] font-light opacity-60">
              {birthdayData.month} • {birthdayData.day} • {birthdayData.year}
            </span>
          </div>

          <Sparkles className="mx-auto text-[#C026D3] opacity-20 mt-8" size={20} />
        </motion.div>

        {/* Credit */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
          viewport={viewportConfig}
          transition={{ delay: 0.3 }}
          className="pt-12 border-t border-[#FAE8FF] flex flex-col items-center gap-4"
        >
          <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-[#64748B]">
            See you at the celebration
          </p>

          <div className="text-[8px] uppercase tracking-[0.2em] text-[#94A3B8] flex items-center gap-2">
            <span>© {birthdayData.year}</span>
            <span className="w-1 h-1 rounded-full bg-[#FAE8FF]" />
            <span>
              Digital Invitation by{" "}
              <strong className="text-[#C026D3] font-bold uppercase tracking-[0.2em]">
                Halina Creations
              </strong>
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
