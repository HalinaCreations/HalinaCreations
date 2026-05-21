"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, Pause, Heart,
  SkipBack, SkipForward, Shuffle, Repeat
} from "lucide-react";

import weddingData from "./lib/data.json";
import Image from "next/image";

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

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <section className="bg-[#F8FAFC] py-12 md:py-24 px-6 relative z-30 overflow-hidden">
      {/* 1. WRAPPER CONTAINER: 
          This container allows the vines to sit outside the card 
          without being clipped by 'overflow-hidden'.
      */}
      <div className="relative max-w-6xl mx-auto">
        
        {/* 2. VINE OVERLAY: 
            Placed OUTSIDE the white card so it doesn't get cut.
        */}
        <div className="absolute -top-5 -right-0 w-full md:w-[480px] pointer-events-none z-50">
          <Image 
            src="/shared-assets/asset-5.png" 
            alt="Greenery overlay" 
            width={600}
            height={600}
            className="w-full h-auto object-contain object-right-top opacity-95"
          />
        </div>

        {/* 3. WHITE MUSIC CARD: 
            Maintains 'overflow-hidden' for the slideshow internal rounded corners.
        */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-8 shadow-[0_20px_50px_rgba(30,64,175,0.08)] border border-[#DBEAFE] flex flex-col lg:flex-row items-center gap-8 lg:gap-12 overflow-hidden"
        >
          {/* Centered Slideshow Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative w-full lg:w-[350px] aspect-square rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-2xl bg-[#1E293B]"
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
                <h3 className="text-2xl md:text-3xl font-bold text-[#1E293B] tracking-tight leading-tight">
                  {songTitle}
                </h3>
                <Heart className="text-[#1E40AF] fill-[#1E40AF] cursor-pointer hover:scale-110 transition-transform" size={24} />
              </div>
              <p className="text-[#64748B] text-lg md:text-xl mt-1 font-sans font-medium">{artistName}</p>
            </div>

            <div className="relative w-full mb-3 flex items-center group">
              <input type="range" min="0" max={duration || 0} value={currentTime} step="0.1" onChange={handleSeek} className="absolute w-full h-1.5 opacity-0 z-30 cursor-pointer" />
              <div className="w-full h-1.5 bg-[#F1F5F9] rounded-full relative">
                <div style={{ width: `${progressPercent}%` }} className="h-full bg-[#1E40AF] rounded-full relative z-10" />
                <div style={{ left: `${progressPercent}%` }} className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#1E40AF] rounded-full shadow-lg border-2 border-white z-20" />
              </div>
            </div>

            <div className="flex justify-between text-[10px] md:text-xs font-sans font-bold text-[#64748B] mb-8 md:mb-10 uppercase tracking-widest">
              <span>{formatTime(currentTime)}</span>
              <span>-{formatTime(duration - currentTime)}</span>
            </div>

            <div className="flex items-center justify-between lg:justify-start lg:gap-8 text-[#94A3B8] px-2 md:px-0">
              <Shuffle size={18} className="hover:text-[#1E40AF] cursor-pointer transition-colors" />
              <SkipBack size={24} fill="currentColor" className="hover:text-[#1E293B] cursor-pointer transition-colors active:scale-90" onClick={handleSkipBack} />
              <button onClick={onTogglePlay} className="w-16 h-16 md:w-20 md:h-20 bg-[#1E293B] rounded-full flex items-center justify-center text-white shadow-xl hover:scale-105 transition-transform">
                {isPlaying ? <Pause size={28} fill="white" /> : <Play size={28} fill="white" className="ml-1" />}
              </button>
              <SkipForward size={24} fill="currentColor" className="hover:text-[#1E293B] cursor-pointer transition-colors active:scale-90" onClick={handleSkipForward} />
              <Repeat size={18} className="text-[#1E40AF] cursor-pointer" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MusicSection;