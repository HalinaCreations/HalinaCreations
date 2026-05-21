"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, Transition } from "framer-motion";
import {
  Flower2, GlassWater, Sparkles, Utensils, Music, Clock, Star,
} from "lucide-react";
import birthdayData from "./lib/data.json";
import Image from "next/image";

const iconMap = {
  arrival: <Flower2 size={20} strokeWidth={1.5} />,
  cocktail: <GlassWater size={20} strokeWidth={1.5} />,
  entrance: <Sparkles size={20} strokeWidth={1.5} />,
  dinner: <Utensils size={20} strokeWidth={1.5} />,
  roses: <Star size={20} strokeWidth={1.5} />,
  dance: <Music size={20} strokeWidth={1.5} />,
  end: <Clock size={20} strokeWidth={1.5} />,
};

const EventProgram = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const smoothTransition: Transition = {
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1],
  };

  return (
    <section id="details" className="py-20 bg-[#FFF8FC] relative overflow-hidden">
      {/* Decorative background floral */}
      <div className="absolute bottom-40 right-0 w-100 md:w-150 opacity-15 pointer-events-none z-0 translate-x-1/4 translate-y-1/4">
        <Image
          src="/shared-assets/asset-4.png"
          alt="Floral Background"
          width={600}
          height={600}
          className="w-full h-auto scale-x-[-1]"
          style={{ filter: "hue-rotate(280deg) saturate(1.2)" }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl text-[#4A1942]"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            The Enchanted Evening
          </motion.h2>
          <div className="w-12 h-px bg-[#C026D3] mx-auto mt-4 opacity-40" />
        </div>

        <div ref={containerRef} className="relative">
          {/* Track line */}
          <div className="absolute left-5.75 md:left-1/2 md:-translate-x-1/2 top-0 h-full w-0.5 bg-[#FAE8FF]" />

          {/* Progress line */}
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute left-5.75 md:left-1/2 md:-translate-x-1/2 top-0 w-[2.5px] h-full bg-[#C026D3] z-10 shadow-[0_0_15px_rgba(192,38,211,0.3)]"
          />

          <div className="space-y-24">
            {birthdayData.program.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className="relative flex items-center w-full">
                  {/* Icon node */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-20">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ ...smoothTransition, delay: 0.2 }}
                      className="w-12 h-12 rounded-full bg-white border border-[#FAE8FF] flex items-center justify-center text-[#C026D3] shadow-md"
                    >
                      {iconMap[item.type as keyof typeof iconMap]}
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div
                    className={`flex flex-col md:flex-row w-full items-start md:items-center ${
                      isEven ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
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
                        <span className="text-[10px] font-sans font-bold uppercase tracking-[0.4em] text-[#C026D3]">
                          {item.time}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold text-[#4A1942] tracking-tight">
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
