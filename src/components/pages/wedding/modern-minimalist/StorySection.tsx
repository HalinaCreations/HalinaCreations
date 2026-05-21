"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Heart } from "lucide-react";
import weddingData from "./lib/data.json";
import Image from "next/image";

const StorySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const storyData = weddingData.story;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Transform the text Y position based on scroll
  // As the user scrolls down the container, the text moves up
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  
  // Fade out elements as we scroll
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[250vh] ">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center px-6">
        
        {/* Header Elements - Static or Slight Parallax */}
        <motion.div style={{ opacity }} className="relative z-10 text-center mb-6 p-8 rounded-2xl max-w-2xl w-full">
           <Heart className="text-[#8D6E63] mx-auto mb-4" size={32} fill="#8D6E63" />
           <h2 
            className="text-5xl md:text-7xl mb-3 font-bold text-[#5D4037]" 
            style={{ fontFamily: `'${weddingData.theme.headingFont}', cursive` }}
          >
            {storyData.title}
          </h2>
          <p className="text-[#8D6E63] text-xl font-serif italic">
            {storyData.preview}
          </p>
        </motion.div>

        {/* Scrolling Text Container */}
        <div className="h-[40vh] overflow-hidden relative w-full max-w-2xl text-center mask-image-gradient">
            {/* Gradient masks for top and bottom fading */}
            <div className="absolute top-0 left-0 w-full h-12 to-transparent z-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-12 to-transparent z-20 pointer-events-none" />

            <motion.div style={{ y: textY }} className="pt-12 pb-20 space-y-8">{storyData.fullStory.map((paragraph, index) => (
                    <p key={index} className="text-[#5D4037] text-lg md:text-xl leading-relaxed font-light">
                        {paragraph}
                    </p>
                ))}
                {/* Extra padding to ensure last paragraph scrolls into view fully */}
                <div className="h-40" /> 
            </motion.div>
        </div>

        {/* Decorative Background Image (Optional - Fixed or Parallax) */}
        {storyData.bottomImage && (
             <div className="absolute inset-0 -z-10 opacity-10">
                 <Image fill src={storyData.bottomImage} className="w-full h-full object-cover grayscale" alt="Background" />
             </div>
        )}

      </div>
    </section>
  );
};

export default StorySection;