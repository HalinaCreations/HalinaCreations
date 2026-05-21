"use client";

import React, { useRef } from "react";
import { 
  motion, 
  useScroll, 
  useSpring, 
  Transition 
} from "framer-motion";
import { Church, GlassWater, Music, Utensils, Disc, Clock } from "lucide-react";
import weddingData from "./lib/data.json";
import Image from "next/image";

/**
 * NEW COLOR PALETTE:
 * Royal Blue: #1E40AF (Vibrant accent)
 * Soft Blue: #DBEAFE (Backgrounds/Nodes)
 * Deep Navy: #1E293B (Primary text)
 */

const iconMap = {
  church: <Church size={20} strokeWidth={1.5} />,
  cocktail: <GlassWater size={20} strokeWidth={1.5} />,
  dance: <Music size={20} strokeWidth={1.5} />,
  dinner: <Utensils size={20} strokeWidth={1.5} />,
  party: <Disc size={20} strokeWidth={1.5} />,
  end: <Clock size={20} strokeWidth={1.5} />,
};

const EventProgram = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Smooth the blue line progress
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Type-safe transition for headers
  const smoothTransition: Transition = {
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1] 
  };

  return (
    <section id="details" className="py-20 bg-[#F8FAFC] relative overflow-hidden">
      {/* Mirrored Blue Tulips Background Image */}
      <div className="absolute bottom-40 right-0 w-[400px] md:w-[600px] opacity-20 pointer-events-none z-0 translate-x-1/4 translate-y-1/4">
        <Image 
          src="/shared-assets/asset-4.png"
          alt="Blue Tulips Background" 
          width={600}
          height={600}
          className="w-full h-auto scale-x-[-1]"
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl text-[#1E293B]"
            style={{ fontFamily: "'Arizonia', cursive" }}
          >
            Our Royal Journey
          </motion.h2>
          <div className="w-12 h-[1px] bg-[#1E40AF] mx-auto mt-4 opacity-40" />
        </div>

        <div ref={containerRef} className="relative">
          {/* --- THE LINE SYSTEM --- */}
          
          {/* Background Line (Soft Blue Track) */}
          <div className="absolute left-[23px] md:left-1/2 md:-translate-x-1/2 top-0 h-full w-[2px] bg-[#DBEAFE]" />

          {/* Foreground Line (Royal Blue Progress Line) */}
          <motion.div 
            style={{ scaleY, originY: 0 }} 
            className="absolute left-[23px] md:left-1/2 md:-translate-x-1/2 top-0 w-[2.5px] h-full bg-[#1E40AF] z-10 shadow-[0_0_15px_rgba(30,64,175,0.3)]" 
          />

          <div className="space-y-24">
            {weddingData.program.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={index} className="relative flex items-center w-full">
                  
                  {/* ICON NODES */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-20">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ ...smoothTransition, delay: 0.2 }}
                      className="w-12 h-12 rounded-full bg-white border border-[#DBEAFE] flex items-center justify-center text-[#1E40AF] shadow-md"
                    >
                      {iconMap[item.type as keyof typeof iconMap]}
                    </motion.div>
                  </div>

                  {/* STAGGERED CONTENT */}
                  <div className={`flex flex-col md:flex-row w-full items-start md:items-center ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}>
                    
                    <motion.div 
                      initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className={`w-full md:w-1/2 pl-16 md:pl-0 ${
                        isEven ? "md:pl-16 md:text-left" : "md:pr-16 md:text-right"
                      }`}
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-sans font-bold uppercase tracking-[0.4em] text-[#1E40AF]">
                          {item.time}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold text-[#1E293B] tracking-tight">
                          {item.title}
                        </h3>
                        <p className="text-[#64748B] text-[10px] md:text-xs uppercase tracking-[0.3em]">
                          {item.location}
                        </p>
                      </div>
                    </motion.div>

                    <div className="hidden md:block md:w-1/2" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventProgram;