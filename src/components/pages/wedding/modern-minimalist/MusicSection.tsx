"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, Pause, Heart,
  SkipBack, SkipForward, Shuffle, Repeat
} from "lucide-react";

import weddingData from "./lib/data.json";

interface MusicSectionProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  songTitle?: string;
  artistName?: string;
  slideshowImages?: string[];
}

const MusicSection = ({ 
  isPlaying, 
  onTogglePlay, 
  audioRef,
  songTitle = weddingData.music.title,
  artistName = weddingData.music.artist,
  slideshowImages = weddingData.music.slides
}: MusicSectionProps) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Generate deterministic heights for bars based on index
  const barHeights = useMemo(() => 
    Array.from({ length: 100 }, (_, i) => {
      // Use sine wave pattern for natural-looking variation
      const baseHeight = 30;
      const variation = Math.sin(i * 0.5) * 15 + Math.cos(i * 0.3) * 10;
      return baseHeight + variation;
    }),
  []);

  const images = useMemo(() => 
    slideshowImages.length > 0 ? slideshowImages : weddingData.music.slides, 
  [slideshowImages]);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    if (audio.duration) setDuration(audio.duration);
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [audioRef]);

  const handleSkipForward = () => {
    if (audioRef.current) audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, duration);
  };

  const handleSkipBack = () => {
    if (audioRef.current) audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <section className="bg-[#FAF7F5] py-12 md:py-24 px-6 relative z-30 overflow-hidden">
      {/* 1. WRAPPER CONTAINER */}
      <div className="relative max-w-6xl mx-auto">
        
        {/* 2. VINE OVERLAY - hidden for minimalist theme to keep it clean, or could use a different asset if desired */}
        {/* <div className="absolute -top-5 -right-0 w-full md:w-[480px] pointer-events-none z-50">
           <img src="..." />
        </div> */}

        {/* 3. WHITE MUSIC CARD */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-8 shadow-[0_20px_50px_rgba(93,64,55,0.08)] border border-[#EFEBE9] flex flex-col lg:flex-row items-center gap-8 lg:gap-12 overflow-hidden"
        >
          {/* Centered Slideshow Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative w-full lg:w-[350px] aspect-square rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-2xl bg-[#5D4037]"
          >
            <AnimatePresence mode="popLayout">
              <motion.img
                key={currentImageIndex}
                src={images[currentImageIndex]}
                alt={`Wedding moment ${currentImageIndex + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            </AnimatePresence>
          </motion.div>

          {/* Centered Text and Controls */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="w-full lg:flex-1 flex flex-col justify-center relative z-10"
          >
            <div className="mb-6 md:mb-8">
              <div className="flex items-center gap-3">
                <h3 className="text-4xl md:text-5xl font-bold text-[#5D4037] tracking-wide leading-tight" style={{ fontFamily: `'${weddingData.theme.headingFont}', cursive` }}>
                  {songTitle}
                </h3>
                <Heart className="text-[#8D6E63] fill-[#8D6E63] cursor-pointer hover:scale-110 transition-transform" size={28} />
              </div>
              <p className="text-[#8D6E63] text-lg md:text-xl mt-1 font-sans font-medium">{artistName}</p>
            </div>

            {/* Animated Sound Wave */}
            <div className="relative w-full mb-3 h-16 flex items-center justify-center gap-1">
              {[...Array(80)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1 bg-[#8D6E63] rounded-full transition-all duration-150 ${
                    i < (progressPercent / 100) * 80 ? 'opacity-100' : 'opacity-30'
                  } ${i >= 40 ? 'hidden md:block' : ''}`}
                  style={{
                    height: `${barHeights[i]}%`,
                    animationName: isPlaying ? 'wave' : 'none',
                    animationDuration: `0.${3 + (i % 5)}s`,
                    animationTimingFunction: 'ease-in-out',
                    animationIterationCount: 'infinite',
                    animationDirection: 'alternate',
                    animationDelay: `${i * 0.05}s`
                  }}
                />
              ))}
              <style jsx>{`
                @keyframes wave {
                  0% { transform: scaleY(0.5); }
                  100% { transform: scaleY(1.2); }
                }
              `}</style>
            </div>

            <div className="flex justify-between text-[10px] md:text-xs font-sans font-bold text-[#8D6E63] mb-8 md:mb-10 uppercase tracking-widest">
              <span>{formatTime(currentTime)}</span>
              <span>-{formatTime(duration - currentTime)}</span>
            </div>

            <div className="flex items-center justify-between lg:justify-start lg:gap-8 text-[#A1887F] px-2 md:px-0">
              <Shuffle size={18} className="hover:text-[#5D4037] cursor-pointer transition-colors" />
              <SkipBack size={24} fill="currentColor" className="hover:text-[#5D4037] cursor-pointer transition-colors active:scale-90" onClick={handleSkipBack} />
              <button onClick={onTogglePlay} className="w-16 h-16 md:w-20 md:h-20 bg-[#5D4037] rounded-full flex items-center justify-center text-white shadow-xl hover:scale-105 transition-transform">
                {isPlaying ? <Pause size={28} fill="white" /> : <Play size={28} fill="white" className="ml-1" />}
              </button>
              <SkipForward size={24} fill="currentColor" className="hover:text-[#5D4037] cursor-pointer transition-colors active:scale-90" onClick={handleSkipForward} />
              <Repeat size={18} className="text-[#8D6E63] cursor-pointer" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MusicSection;