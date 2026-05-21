"use client";

import React from "react";
import { motion } from "framer-motion";

import weddingData from "./lib/data.json";
import Image from "next/image";

const AutoGallerySection = () => {
  // Duplicate gallery array for a seamless infinite loop
  const galleryItems = [...weddingData.gallery, ...weddingData.gallery];

  return (
    <section className="py-0 bg-[#F8FAFC] overflow-hidden relative z-30">
      

      {/* --- SEAMLESS AUTOMATIC CAROUSEL --- */}
      <div className="w-full overflow-hidden">
        <motion.div
          /* Removed 'gap-6 md:gap-8' to eliminate space between images */
          className="flex w-max"
          initial={{ x: "0%" }}
          animate={{ x: "-50%" }}
          transition={{
            ease: "linear",
            duration: 50, // Slightly slower for a more cinematic feel
            repeat: Infinity,
          }}
        >
          {galleryItems.map((imageSrc, index) => (
            <div
              key={index}
              /* Removed border and shadow to make the images blend together.
                 Set rounded-none to ensure a perfect edge-to-edge connection.
              */
              className="relative h-112.5 md:h-137.5 aspect-3/4 overflow-hidden shrink-0"
            >
              <Image
                fill
                src={imageSrc}
                alt={`Gallery moment ${index}`}
                className="object-cover pointer-events-none"
              />
              {/* Overlay remains for subtle interaction */}
              <div className="absolute inset-0 bg-[#1E40AF]/0 hover:bg-[#1E40AF]/5 transition-colors duration-300" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AutoGallerySection;