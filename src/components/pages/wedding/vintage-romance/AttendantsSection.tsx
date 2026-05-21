"use client";

import React, { useRef } from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import invitationData from './lib/data.json';
import Image from 'next/image';

// --- STRICT TYPE-SAFE INTERFACES ---
interface AttendantMember {
  name: string;
  title: string;
}

interface AttendantGroup {
  role: string;
  members: AttendantMember[];
}

interface AttendantsData {
  title: string;
  subtitle: string;
  backgroundImage: string;
  groups: AttendantGroup[];
}

interface InvitationStructure {
  vintageRomance: {
    attendants: AttendantsData;
  };
}

// FIX: Explicitly typing as Variants resolves the incompatibility error
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

const AttendantsSection = () => {
  const data = invitationData as unknown as InvitationStructure;
  const { attendants } = data.vintageRomance;

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Maps scroll progress to vertical movement. 
  // Stops at -70% to prevent over-scrolling past the content.
  const listY = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-[#edede2]">
      <section className="sticky top-0 h-screen w-full overflow-hidden font-serif flex items-center justify-center">

        {/* CENTERED CONTENT CONTAINER */}
        <div className="relative mx-auto h-full w-full max-w-[1200px] flex flex-col md:grid md:grid-cols-[40%_60%]">

          {/* LEFT — PINNED HEADER */}
          <div className="relative z-30 flex items-start md:items-center bg-[#edede2]">
            <div className="w-full pt-24 pb-12 px-6 text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-5xl md:text-7xl xl:text-8xl text-emerald-950 font-light tracking-tighter leading-none mb-4">
                  {attendants.title}
                </h2>
                <p 
                  className="text-xl md:text-3xl text-emerald-900/50 italic leading-snug"
                  style={{ fontFamily: "'Beth Ellen', cursive" }}
                >
                  {attendants.subtitle}
                </p>
              </motion.div>
              <div className="w-16 h-[1px] bg-[#A3BCA7] mt-8 opacity-40" />
            </div>
          </div>

          {/* RIGHT — LIST + ASSET */}
          <div className="relative z-20 overflow-hidden">

            {/* BACKGROUND ASSET ON THE RIGHT */}
            <div className="absolute top-1/2 left-30 -translate-y-1/2 pointer-events-none z-0 w-full max-w-[650px]">
              <Image 
                src="/shared-assets/asset-2.png" 
                alt="Leaf Accent" 
                width={650}
                height={650}
                className="w-full h-auto object-cover opacity-[0.15] scale-x-[-1]" 
              />
            </div>

            {/* SCROLLING LIST — ALIGNMENT FIXED */}
            <div className="relative z-20 w-full px-6 lg:px-12">
              <motion.div 
                style={{ y: listY }}
                className="space-y-40 pt:20 -pb:20 md:pt-[10vh] -pb-[20vh]"
              >
                {attendants.groups.map((group, groupIdx) => (
                  <div key={groupIdx} className="relative">

                    {/* GROUP ROLE HEADER (Straight Aligned Above List) */}
                    <div className="mb-10 border-b border-emerald-950/10 pb-4">
                       <p className="text-[10px] uppercase tracking-[0.6em] text-emerald-900/40 font-bold">
                        {group.role}
                      </p>
                    </div>

                    {/* STRAIGHT GRID: No mt-16 offsets used here */}
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
                      {group.members.map((member, memberIdx) => (
                        <motion.li 
                          key={memberIdx}
                          initial="hidden"
                          whileInView="show"
                          viewport={{ once: true, margin: "-10%" }}
                          variants={itemVariants}
                          // Removed the conditional "md:mt-16" to make items align straightly
                          className="flex flex-col"
                        >
                          <div className="border-l border-emerald-950/10 pl-6 space-y-2">
                            <p className="text-3xl md:text-4xl text-emerald-950 font-light tracking-tight transition-colors duration-300 hover:text-[#A3BCA7]">
                              {member.name}
                            </p>
                            <div className="flex items-center gap-3">
                              <div className="h-[1px] w-4 bg-[#A3BCA7]" />
                              <p className="text-emerald-900/40 uppercase tracking-[0.3em] text-[10px] font-bold">
                                {member.title}
                              </p>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* WATERMARK */}
        <div className="absolute -bottom-10 right-10 select-none pointer-events-none opacity-[0.03]">
          <h1 className="text-[15rem] font-bold text-emerald-950 leading-none">
            Memories
          </h1>
        </div>
      </section>
    </div>
  );
};

export default AttendantsSection;