"use client";

import React from "react";
import { motion } from "framer-motion";

import weddingData from "./lib/data.json";
import Image from "next/image";

const DateSection = () => {
  return (
    <section className="py-8 md:py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 gap-6 md:gap-12 items-center">
          
          {/* Left Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative w-full aspect-[3/4] md:aspect-[4/5] rounded-r-3xl overflow-hidden shadow-2xl">
              <Image 
                fill
                src={weddingData.heroImage}
                alt="Save the Date" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#5D4037]/20 to-transparent" />
            </div>
          </motion.div>

          {/* Right Side - Date Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col justify-center pr-6 md:pr-0"
          >
            <div className="space-y-4 md:space-y-6">
              <h2 
                className="text-4xl md:text-5xl lg:text-7xl font-light text-[#5D4037] mb-4 md:mb-8" 
                style={{ fontFamily: `'${weddingData.theme.headingFont}', cursive` }}
              >
                Save the Date
              </h2>

              <div className="space-y-2 md:space-y-8">
                {/* Date Details */}
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="flex-1">
                    <p className="text-sm md:text-2xl lg:text-3xl font-light text-[#5D4037]">
                      {weddingData.month} {weddingData.day}, {weddingData.year}
                    </p>
                  </div>
                </div>

                {/* Time Details */}
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="flex-1">
                    <p className="text-sm md:text-2xl lg:text-3xl font-light text-[#5D4037]">
                      {weddingData.time}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 md:pt-6">
                <div className="w-12 md:w-20 h-px bg-[#8D6E63] opacity-30" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default DateSection;
