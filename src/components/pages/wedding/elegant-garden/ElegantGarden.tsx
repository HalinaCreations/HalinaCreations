"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { 
  motion, 
  AnimatePresence, 
  useTransform, 
  useMotionValue, 
  useScroll as useWindowScroll, 
  useMotionValueEvent 
} from "framer-motion";
import { ChevronDown, MailOpen } from "lucide-react";

// Components
import ElegantGardenFooter from "./ElegantGardenFooter";
import ElegantGardenNav from "./ElegantGardenNav";
import Countdown from "./Countdown";
import MusicSection from "./MusicSection";
import StorySection from "./StorySection";
import EventProgram from "./EventProgram";
import AutoGallerySection from "./AutoGallerySection";
import WeddingAttendants from "./WeddingAttendants";    
import RSVPSection from "./RSVPSection";
import LocationSection from "./LocationSection";  

// Data Import
import weddingData from "./lib/data.json";

const ElegantGarden = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  
  const [isOpened, setIsOpened] = useState(false);
  const [videoDone, setVideoDone] = useState(false);
  const [showNav, setShowNav] = useState(false); 
  const [isPlaying, setIsPlaying] = useState(false);
  
  const progress = useMotionValue(0);
  const { scrollY } = useWindowScroll();

  /**
   * 1. HANDLERS
   */
  const handleOpenInvitation = () => {
    setIsOpened(true);
    
    // Music starts immediately upon clicking the button
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Playback failed:", error);
        });
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

  const handleScroll = useCallback(() => {
    if (!videoRef.current || videoDone) return;
    const video = videoRef.current;
    
    if (video.currentTime >= video.duration - 0.5) {
      video.pause();
      video.currentTime = video.duration;
      setVideoDone(true);
      progress.set(1);
      return;
    }

    // Smoother video playback handling
    if (video.paused) {
      video.play().catch(() => {});
    }
    
    progress.set(video.currentTime / video.duration);
    
    // Increased timeout for smoother pause behavior
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => { 
      if (video) video.pause(); 
    }, 150); 
  }, [videoDone, progress]);

  /**
   * 2. HOOKS
   */
  useEffect(() => {
    if (!isOpened || !videoDone) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }
    
    // Reduced playback rate for smoother scrolling experience
    if (videoRef.current) {
      videoRef.current.playbackRate = 2.5;
    }

    return () => { document.body.style.overflow = "auto"; };
  }, [videoDone, isOpened]);

  useEffect(() => {
    // Use passive listeners for better scroll performance
    window.addEventListener("wheel", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [videoDone, isOpened, handleScroll]); 

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (videoDone && latest > 50) setShowNav(true);
    else setShowNav(false);
  });

  // Animation Transforms
  const instructionOpacity = useTransform(progress, [0, 0.20], [1, 0]);
  const topTextOpacity = useTransform(progress, [0.35, 0.55], [0, 1]);
  const topTextY = useTransform(progress, [0.35, 0.55], [-40, 0]);
  const midTextOpacity = useTransform(progress, [0.55, 0.75], [0, 1]);
  const midTextX = useTransform(progress, [0.55, 0.75], [-60, 0]);
  const bottomTextOpacity = useTransform(progress, [0.75, 0.90], [0, 1]);
  const bottomTextY = useTransform(progress, [0.75, 0.90], [40, 0]);
  const countdownOpacity = useTransform(progress, [0.90, 1], [0, 1]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-serif overflow-x-hidden">
      <audio ref={audioRef} loop src={weddingData.themeSong} />
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Arizonia&display=swap');`}</style>
      
      {/* --- ENTRY WELCOME SCREEN --- */}
      <AnimatePresence>
        {!isOpened && (
          <motion.section
            key="splash-screen"
            initial={{ opacity: 1 }}
            /* UPDATED: Changed from y: -1000 (slide) to just opacity: 0 (fade) */
            exit={{ opacity: 0 }} 
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-[#F8FAFC]"
          >
            {/* Soft Blue Decor Background */}
            <div className="absolute inset-0 bg-[#DBEAFE]/30" />
            
            <div className="relative z-10 flex flex-col items-center text-center px-6">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mb-12"
              >
                <span className="uppercase tracking-[0.5em] text-[12px] font-sans font-bold text-[#1E40AF] block mb-4">
                  The Wedding of
                </span>
                <h1 className="text-6xl md:text-8xl text-[#1E293B]" style={{ fontFamily: "'Arizonia', cursive" }}>
                  {weddingData.groom} & {weddingData.bride}
                </h1>
                <div className="w-24 h-px bg-[#1E40AF] mx-auto mt-6 opacity-30" />
              </motion.div>

              <motion.button
                onClick={handleOpenInvitation}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex flex-col items-center gap-4 focus:outline-none"
              >
                <div className="w-20 h-20 rounded-full bg-[#1E293B] flex items-center justify-center text-white shadow-2xl transition-all group-hover:bg-[#1E40AF]">
                  <MailOpen size={32} />
                </div>
                <span className="uppercase tracking-[0.4em] text-[10px] font-bold text-[#1E293B]">
                  Open Invitation
                </span>
              </motion.button>
            </div>

            {/* Bottom Corner Decorative Tulip */}
            <div className="absolute bottom-0 right-0 w-80 md:w-150 opacity-20 pointer-events-none">
              <Image src="/shared-assets/asset-4.png" alt="Floral" width={600} height={600} className="w-full h-auto scale-x-[-1]" />
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showNav && (
          <motion.div 
            initial={{ opacity: 0, y: -100 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -100 }} 
            transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.6 }}
            className="fixed top-0 left-0 w-full z-50"
          >
            <ElegantGardenNav />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center px-6 overflow-hidden bg-black">
        <video ref={videoRef} muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
          <source src={weddingData.videoHero} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#1E40AF]/35 z-10" />
        
        <div className="relative z-20 flex flex-col items-center gap-8">
          <div className="space-y-4">
            <motion.span style={{ opacity: topTextOpacity, y: topTextY }} className="uppercase tracking-[0.5em] text-[10px] font-sans font-bold text-white mb-4 block drop-shadow-md">
              The Wedding of
            </motion.span>
            
            <motion.h1 style={{ opacity: midTextOpacity, x: midTextX, fontFamily: "'Arizonia', cursive" }} className="text-7xl md:text-9xl text-white drop-shadow-2xl">
              {weddingData.groom} <span className="text-[#DBEAFE] font-sans">&</span> {weddingData.bride}
            </motion.h1>
            
            <motion.div style={{ opacity: bottomTextOpacity, y: bottomTextY }} className="flex flex-col items-center text-white drop-shadow-lg">
              <span className="uppercase tracking-[0.6em] text-[10px] md:text-xs mb-1 font-sans font-bold text-[#DBEAFE]">
                {weddingData.dateLabel}
              </span>
              <div className="flex items-center gap-4 md:gap-8">
                <div className="flex flex-col items-center">
                  <div className="w-16 md:w-24 h-px bg-[#FFFFFF]/80 mb-2" />
                  <span className="uppercase tracking-[0.2em] text-xs font-light">{weddingData.month}</span>
                  <div className="w-16 md:w-24 h-px bg-[#FFFFFF]/80 mt-2" />
                </div>
                <span className="text-5xl md:text-7xl font-bold leading-none">{weddingData.day}</span>
                <div className="flex flex-col items-center">
                  <div className="w-16 md:w-24 h-px bg-[#FFFFFF]/80 mb-2" />
                  <span className="uppercase tracking-[0.2em] text-xs font-light">{weddingData.time}</span>
                  <div className="w-16 md:w-24 h-px bg-[#FFFFFF]/80 mt-2" />
                </div>
              </div>
              <span className="tracking-[0.8em] text-lg mt-1 font-light font-sans">{weddingData.year}</span>
            </motion.div>
          </div>
          
          <motion.div style={{ opacity: countdownOpacity }}>
             <Countdown targetDate={weddingData.countdownTarget} />
          </motion.div>
        </div>
        
        {!videoDone && (
          <motion.div style={{ opacity: instructionOpacity }} className="absolute bottom-10 z-50 flex flex-col items-center gap-2">
            <span className="text-[#1E40AF] text-[10px] uppercase tracking-[0.4em] font-bold">Scroll to Unveil</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <ChevronDown className="text-[#1E40AF]" size={24} />
            </motion.div>
          </motion.div>
        )}
      </section>

      <MusicSection 
        isPlaying={isPlaying} 
        onTogglePlay={togglePlay} 
        audioRef={audioRef}
        songTitle={weddingData.music.title}
        artistName={weddingData.music.artist}
        slideshowImages={weddingData.music.slides}
      />

      <StorySection />
      <EventProgram />
      <AutoGallerySection />
      <WeddingAttendants />
      <LocationSection />
      <RSVPSection />
            <ElegantGardenFooter />


    </div>
  );
};

export default ElegantGarden;