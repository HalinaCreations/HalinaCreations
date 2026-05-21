"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { MapPin, ExternalLink, Flower2 } from "lucide-react";
import birthdayData from "./lib/data.json";
import Image from "next/image";

const LocationSection = () => {
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

  return (
    <section id="location" className="py-24 bg-[#FFF8FC] relative overflow-hidden z-30">
      {/* Decorative background */}
      <motion.div
        variants={fadeInDecor20}
        initial="initial"
        whileInView="whileInView"
        viewport={viewportConfig}
        className="absolute top-0 left-70 w-100 md:w-150 pointer-events-none z-0 -translate-x-1/4 -translate-y-1/4"
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

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={viewportConfig}
          >
            <h2
              className="text-5xl md:text-7xl text-[#4A1942] mb-4"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              The Venue
            </h2>
            <div className="w-12 h-px bg-[#C026D3] mx-auto opacity-30" />
          </motion.div>
        </div>

        {/* Single venue card */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
          viewport={viewportConfig}
          className="relative h-112.5 md:h-137.5 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group max-w-2xl mx-auto"
        >
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              fill
              src={birthdayData.venue.venueImg}
              alt="Venue"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-[#2D0A3A] via-[#4A1942]/60 to-[#4A1942]/10" />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-between p-10">
            <div className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white">
              <Flower2 size={24} />
            </div>

            <div className="text-center flex flex-col items-center">
              <h3 className="text-[10px] uppercase font-bold tracking-[0.5em] text-[#FAE8FF] mb-4">
                The Celebration Venue
              </h3>
              <p className="text-4xl text-white font-serif italic mb-4 drop-shadow-md">
                {birthdayData.venue.name}
              </p>
              <p className="text-[#94A3B8] text-xs leading-relaxed mb-8 max-w-xs uppercase tracking-[0.2em] font-bold">
                {birthdayData.venue.address}
              </p>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={birthdayData.venue.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-white border-b border-white/50 pb-1 transition-colors hover:text-[#FAE8FF] hover:border-[#FAE8FF]"
              >
                <MapPin size={12} />
                View on Maps
                <ExternalLink size={10} />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LocationSection;
