"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Transition } from "framer-motion";
import { Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import birthdayData from "./lib/data.json";
import Image from "next/image";

const StorySection = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const storyData = birthdayData.story;

  const scrollTransition: Transition = { duration: 0.8, ease: "easeOut" };

  const fadeInScroll = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: scrollTransition,
  };

  return (
    <section id="story" className="py-10 bg-[#FFF8FC] relative z-30">
      <div className="max-w-3xl mx-auto text-center px-6">
        <motion.div {...fadeInScroll}>
          <Sparkles className="text-[#C026D3] mx-auto mb-8 animate-pulse" size={32} />
        </motion.div>

        <motion.h2
          {...fadeInScroll}
          transition={{ ...scrollTransition, delay: 0.2 }}
          className="text-4xl md:text-5xl mb-6 font-bold text-[#4A1942]"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          {storyData.title}
        </motion.h2>

        <motion.p
          {...fadeInScroll}
          transition={{ ...scrollTransition, delay: 0.4 }}
          className="font-sans font-medium leading-relaxed text-xl text-[#4A1942] mb-12"
        >
          {storyData.preview}
        </motion.p>
      </div>

      {storyData.bottomImage && (
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="w-full mb-12"
        >
          <Image
            src={storyData.bottomImage}
            alt="Birthday Story"
            width={800}
            height={600}
            className="w-full h-auto md:h-150 object-cover block shadow-inner"
          />
        </motion.div>
      )}

      <div className="max-w-4xl mx-auto text-center px-6">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mb-6 flex items-center gap-2 mx-auto text-[#C026D3] font-sans font-bold uppercase tracking-widest text-sm transition-transform hover:scale-105"
        >
          {isExpanded ? (
            <>Hide Full Story <ChevronUp size={18} /></>
          ) : (
            <>Read Full Story <ChevronDown size={18} /></>
          )}
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="space-y-6 pt-4 flex flex-col items-center">
                {storyData.fullStory.map((p, i) => (
                  <p key={i} className="font-sans font-light leading-relaxed text-lg text-[#64748B]">
                    {p}
                  </p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default StorySection;
