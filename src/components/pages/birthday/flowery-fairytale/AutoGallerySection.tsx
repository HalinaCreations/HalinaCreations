"use client";

import React from "react";
import { motion } from "framer-motion";
import birthdayData from "./lib/data.json";
import Image from "next/image";

const AutoGallerySection = () => {
  const galleryItems = [...birthdayData.gallery, ...birthdayData.gallery];

  return (
    <section className="py-0 bg-[#FFF8FC] overflow-hidden relative z-30">
      <div className="w-full overflow-hidden">
        <motion.div
          className="flex w-max"
          initial={{ x: "0%" }}
          animate={{ x: "-50%" }}
          transition={{
            ease: "linear",
            duration: 50,
            repeat: Infinity,
          }}
        >
          {galleryItems.map((imageSrc, index) => (
            <div
              key={index}
              className="relative h-112.5 md:h-137.5 aspect-3/4 overflow-hidden shrink-0"
            >
              <Image
                fill
                src={imageSrc}
                alt={`Birthday gallery ${index}`}
                className="object-cover pointer-events-none"
              />
              <div className="absolute inset-0 bg-[#C026D3]/0 hover:bg-[#C026D3]/5 transition-colors duration-300" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AutoGallerySection;
