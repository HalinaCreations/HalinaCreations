"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Heart, SkipBack, SkipForward, Shuffle, Repeat } from "lucide-react";
import birthdayData from "./lib/data.json";
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
  songTitle = birthdayData.music.title,
  artistName = birthdayData.music.artist,
  slideshowImages = birthdayData.music.slides,
}: MusicSectionProps) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = useMemo(
    () => (slideshowImages.length > 0 ? slideshowImages : birthdayData.music.slides),
    [slideshowImages]
  );

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
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <section className="bg-[#FFF8FC] py-12 md:py-24 px-6 relative z-30 overflow-hidden">
      <div className="relative max-w-6xl mx-auto">
        {/* Decorative floral overlay */}
        <div className="absolute -top-5 right-0 w-full md:w-120 pointer-events-none z-50">
          <Image
            src="/shared-assets/asset-5.png"
            alt="Floral overlay"
            width={600}
            height={600}
            className="w-full h-auto object-contain object-top-right opacity-80"
            style={{ filter: "hue-rotate(280deg) saturate(1.4)" }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative bg-white rounded-4xl md:rounded-[3rem] p-6 md:p-8 shadow-[0_20px_50px_rgba(192,38,211,0.08)] border border-[#FAE8FF] flex flex-col lg:flex-row items-center gap-8 lg:gap-12 overflow-hidden"
        >
          {/* Slideshow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative w-full lg:w-87.5 aspect-square rounded-3xl md:rounded-4xl overflow-hidden shadow-2xl bg-[#4A1942]"
          >
            <AnimatePresence mode="popLayout">
              <motion.img
                key={currentImageIndex}
                src={images[currentImageIndex]}
                alt={`Birthday moment ${currentImageIndex + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            </AnimatePresence>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="w-full lg:flex-1 flex flex-col justify-center relative z-10"
          >
            <div className="mb-6 md:mb-8">
              <div className="flex items-center gap-3">
                <h3 className="text-2xl md:text-3xl font-bold text-[#4A1942] tracking-tight leading-tight">
                  {songTitle}
                </h3>
                <Heart className="text-[#C026D3] fill-[#C026D3] cursor-pointer hover:scale-110 transition-transform" size={24} />
              </div>
              <p className="text-[#64748B] text-lg md:text-xl mt-1 font-sans font-medium">{artistName}</p>
            </div>

            {/* Seek bar */}
            <div className="relative w-full mb-3 flex items-center group">
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 appearance-none rounded-full cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #C026D3 ${progressPercent}%, #FAE8FF ${progressPercent}%)`,
                }}
              />
            </div>

            <div className="flex justify-between text-[10px] font-mono text-[#64748B] mb-8">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            {/* Player Controls */}
            <div className="flex items-center justify-center gap-6 md:gap-8">
              <button className="text-[#4A1942]/30 hover:text-[#C026D3] transition-colors">
                <Shuffle size={18} />
              </button>
              <button onClick={handleSkipBack} className="text-[#4A1942]/60 hover:text-[#C026D3] transition-colors">
                <SkipBack size={20} />
              </button>
              <button
                onClick={onTogglePlay}
                className="w-14 h-14 rounded-full bg-[#4A1942] hover:bg-[#C026D3] flex items-center justify-center text-white shadow-xl transition-all"
              >
                {isPlaying ? <Pause size={22} /> : <Play size={22} className="ml-1" />}
              </button>
              <button onClick={handleSkipForward} className="text-[#4A1942]/60 hover:text-[#C026D3] transition-colors">
                <SkipForward size={20} />
              </button>
              <button className="text-[#4A1942]/30 hover:text-[#C026D3] transition-colors">
                <Repeat size={18} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MusicSection;
