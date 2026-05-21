"use client";

import React from 'react';
import { motion } from 'framer-motion';
import invitationData from './lib/data.json';
import Image from 'next/image';

const GallerySection = () => {
  const { gallery } = invitationData.vintageRomance;
  // We duplicate the images to create a seamless infinite loop effect
  const duplicatedImages = [...gallery.images, ...gallery.images];

  return (
    <section className="relative py-4 bg-[#f6f6e5] overflow-hidden font-serif">
      {/* AUTOMATIC MOVING CAROUSEL */}
      <div className="relative w-full overflow-hidden">
        {/* Soft fade gradients */}
       
        <motion.div
          className="flex gap-4 md:gap-4 w-max px-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 50, // Slightly slower speed for larger images
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {duplicatedImages.map((src, index) => (
            <div 
              key={index} 
              /* INCREASED SIZE:
                 Mobile: h-[28rem] w-72 (from h-80 w-56)
                 Desktop: md:h-[40rem] md:w-[30rem] (from h-[30rem] w-80)
              */
              className="relative h-[30rem] w-75 md:h-[30rem] md:w-[20rem] flex-shrink-0 overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
            >
              <Image
                fill
                src={src}
                alt={`Gallery image ${index}`}
                sizes="(max-width: 768px) 72vw, 30vw"
                className="object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000 hover:scale-110"
              />
              {/* Subtle vintage tint overlay */}
              <div className="absolute inset-0 bg-emerald-950/5 pointer-events-none" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;