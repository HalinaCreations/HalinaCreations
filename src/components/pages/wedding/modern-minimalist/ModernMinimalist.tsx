"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MailOpen } from 'lucide-react';

// Components
import ModernMinimalistNav from './ModernMinimalistNav';
import MusicSection from './MusicSection';
import StorySection from './StorySection';
import DateSection from './DateSection';

// Data
import weddingData from './lib/data.json'; 
import Image from 'next/image';

const ModernMinimalist = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isOpened, setIsOpened] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    // Lock Scroll on Entry
    useEffect(() => {
        if (!isOpened) {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
            document.documentElement.style.overflow = "auto";
        }
        return () => { document.body.style.overflow = "auto"; };
    }, [isOpened]);

    const handleOpenInvitation = () => {
        setIsOpened(true);
        if (audioRef.current) {
            audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.log(e));
        }
    };

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#FAF7F5] text-[#5D4037] font-serif overflow-x-hidden">
             <audio ref={audioRef} loop src={weddingData.themeSong} />
             <style>{`@import url('${weddingData.theme.headingFontUrl}');`}</style>
             
            {/* --- SPLASH SCREEN (Copied from ElegantGarden) --- */}
            <AnimatePresence>
                {!isOpened && (
                 <motion.section
                    key="splash-screen"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-[#FAF7F5]"
                  >
                    {/* Background */}
                    <div className="absolute inset-0 bg-[#EFEBE9]/30" />

                    <div className="relative z-10 flex flex-col items-center text-center px-6">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="mb-12"
                        >
                            <span className="uppercase tracking-[0.5em] text-[12px] font-sans font-bold text-[#8D6E63] block mb-4">
                                The Wedding of
                            </span>
                             <h1 className="text-6xl md:text-8xl text-[#5D4037]" style={{ fontFamily: `'${weddingData.theme.headingFont}', cursive` }}>
                                {weddingData.groom} & {weddingData.bride}
                            </h1>
                            <div className="w-24 h-px bg-[#8D6E63] mx-auto mt-6 opacity-30" />
                        </motion.div>

                        <motion.button
                            onClick={handleOpenInvitation}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group flex flex-col items-center gap-4 focus:outline-none"
                        >
                             <div className="w-20 h-20 rounded-full bg-[#5D4037] flex items-center justify-center text-white shadow-2xl transition-all group-hover:bg-[#8D6E63]">
                                <MailOpen size={32} />
                            </div>
                            <span className="uppercase tracking-[0.4em] text-[10px] font-bold text-[#5D4037]">
                                Open Invitation
                            </span>
                        </motion.button>
                    </div>
                  </motion.section>
                )}
            </AnimatePresence>

            {/* --- NAV BAR --- */}
            <AnimatePresence>
                {isOpened && (
                     <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="fixed top-0 left-0 w-full z-40"
                     >
                        <ModernMinimalistNav />
                     </motion.div>
                )}
            </AnimatePresence>

            {/* --- HERO SECTION --- */}
            <section className="relative h-screen w-full overflow-hidden">
                 {/* Full Background Image */}
                 <div className="absolute inset-0">
                    <Image 
                        fill
                        src={weddingData.heroImage} 
                        alt="Hero" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                 </div>
                 
                 {/* Bottom Text Content */}
                 <div className="absolute bottom-40 left-0 w-full z-10 text-center text-white pb-12">
                     <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="flex flex-col items-center gap-4"
                     >
                         <h1 className="text-6xl md:text-8xl font-light text-white drop-shadow-lg" style={{ fontFamily: `'${weddingData.theme.headingFont}', cursive` }}>
                            {weddingData.groom} & {weddingData.bride}
                         </h1>
                         
                         <div className="flex flex-col items-center gap-2 mt-4">
                             <span className="uppercase tracking-[0.5em] text-xs md:text-sm font-bold text-white/90">
                                WEDDING DAY
                             </span>
                             <div className="w-12 h-[1px] bg-white/50" />
                             <span className="uppercase tracking-[0.2em] text-sm md:text-base font-light">
                                {weddingData.month} {weddingData.day}, {weddingData.year}
                             </span>
                         </div>
                     </motion.div>
                 </div>
            </section>

             {/* --- MUSIC SECTION --- */}
            <MusicSection
                isPlaying={isPlaying}
                onTogglePlay={togglePlay}
                audioRef={audioRef}
            />
            {/* --- DATE SECTION --- */}
            <DateSection />

            {/* --- 
            {/* --- STORY SECTION --- */}
            <StorySection />
        </div>
    );
};

export default ModernMinimalist;