"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import invitationData from "./lib/data.json";
import Image from 'next/image';

interface MusicSectionProps {
  autoPlay?: boolean;
}

const MusicSection = ({ autoPlay }: MusicSectionProps) => {
  const musicData = invitationData.vintageRomance.music;

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rotation, setRotation] = useState(0); 
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // FIXED: Dependency array size is now constant
  useEffect(() => {
    if (autoPlay && audioRef.current && !isPlaying) {
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((e) => {
            console.error("Autoplay prevented or failed:", e);
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay]); // Removed isPlaying to prevent infinite loops but kept size constant

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(e => console.error("Playback failed:", e));
      }
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(audioRef.current.duration, audioRef.current.currentTime + 10);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime = Number(e.target.value);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <section className="relative h-screen -mt-60 md:mt-0 w-full overflow-hidden flex items-center justify-center font-serif z-0">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s]"
        style={{ backgroundImage: `url(${musicData.backgrounds.mobile})` }}
      >
        <div className="hidden md:block absolute inset-0 bg-cover bg-center bg-no-repeat" 
             style={{ backgroundImage: `url(${musicData.backgrounds.desktop})` }} 
        />
      </div>

      <audio 
        ref={audioRef}
        src={musicData.audioSource}
        loop 
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />

      <div className="relative mt-50 md:mt-0 z-10 flex flex-col md:flex-row items-center justify-center w-full max-w-7xl gap-12 md:gap-24 px-6 text-white">
        
        <motion.div 
          className="relative w-64 h-64 md:w-[25rem] md:h-[25rem]"
          animate={{ rotate: isPlaying ? rotation + 360 : rotation }}
          onUpdate={(latest) => setRotation(latest.rotate as number)}
          transition={{ 
            duration: 12, 
            repeat: isPlaying ? Infinity : 0, 
            ease: "linear" as const
          }}
        >
          <Image 
            fill
            src={musicData.discImage}
            alt="Music Disc" 
            className="object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.6)]"
          />
        </motion.div>

        <div className="flex flex-col items-center md:items-start w-full max-w-lg">
          <div className="text-center md:text-left mb-10">
            <h2 className="text-3xl md:text-5xl tracking-widest font-light mb-3">
              {musicData.trackTitle}
            </h2>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-white/50">
              {musicData.artistNames}
            </p>
          </div>

          <div className="w-full space-y-3 mb-10">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-[2px] bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
              style={{
                background: `linear-gradient(to right, white ${(currentTime / duration) * 100}%, rgba(255,255,255,0.2) ${(currentTime / duration) * 100}%)`
              }}
            />
            <div className="flex justify-between text-[10px] tracking-[0.2em] uppercase font-sans text-white/40">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <button onClick={skipBackward} className="text-white/60 hover:text-white transition-colors">
              <SkipBack size={28} fill="currentColor" />
            </button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlay}
              className="w-20 h-20 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center transition-all duration-500 hover:bg-white hover:text-emerald-950"
            >
              <AnimatePresence mode="wait">
                {isPlaying ? (
                  <motion.div key="pause" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Pause size={32} fill="currentColor" />
                  </motion.div>
                ) : (
                  <motion.div key="play" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="ml-1">
                    <Play size={32} fill="currentColor" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            <button onClick={skipForward} className="text-white/60 hover:text-white transition-colors">
              <SkipForward size={28} fill="currentColor" />
            </button>
          </div>
        </div>
      </div>

      <div className="absolute top-10 left-10 w-24 h-24 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-24 h-24 pointer-events-none" />
    </section>
  );
};

export default MusicSection;