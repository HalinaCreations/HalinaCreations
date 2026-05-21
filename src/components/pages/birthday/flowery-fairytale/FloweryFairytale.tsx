"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Crown, Sparkles } from "lucide-react";

import FooterSection from "./FooterSection";
import FloweryFairytaleNav from "./FloweryFairytaleNav";
import Countdown from "./Countdown";
import MusicSection from "./MusicSection";
import StorySection from "./StorySection";
import EventProgram from "./EventProgram";
import AutoGallerySection from "./AutoGallerySection";
import SpecialGuests from "./SpecialGuests";
import RSVPSection from "./RSVPSection";
import LocationSection from "./LocationSection";
import birthdayData from "./lib/data.json";

const FloweryFairytale = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  const handleOpenInvitation = () => {
    setIsOpened(true);
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";

    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((error) => console.error("Playback failed:", error));
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top,#fff7fb_0%,#fffdf8_38%,#fce7f3_100%)] text-[#4A1942] font-serif">
      <audio ref={audioRef} loop src={birthdayData.themeSong} />
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap');`}</style>

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#FAE8FF]/70 blur-3xl" />
        <div className="absolute top-1/3 -right-20 h-80 w-80 rounded-full bg-[#FDE68A]/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-[#F9A8D4]/20 blur-3xl" />
      </div>

      <AnimatePresence>
        {!isOpened && (
          <motion.section
            key="splash-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-[linear-gradient(180deg,#fff7fb_0%,#fffdf8_55%,#fde7f3_100%)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ffffffcc_0%,#ffffff88_38%,#ffffff00_70%)]" />

            <div className="relative z-10 flex flex-col items-center text-center px-6">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mb-10 max-w-2xl"
              >
                <div className="mb-6 flex items-center justify-center gap-3 text-[#C026D3]">
                  <Sparkles size={16} />
                  <span className="uppercase tracking-[0.5em] text-[11px] font-sans font-bold">
                    Storybook Birthday
                  </span>
                  <Sparkles size={16} />
                </div>
                <h1 className="text-6xl md:text-8xl text-[#4A1942] leading-none" style={{ fontFamily: "'Dancing Script', cursive" }}>
                  {birthdayData.celebrant}&apos;s Fairytale
                </h1>
                <p className="mx-auto mt-5 max-w-xl text-sm md:text-base font-sans leading-relaxed text-[#6B2948]">
                  A whimsical celebration of blooming gardens, candlelit moments, and the beginning of a new chapter.
                </p>
              </motion.div>

              <motion.button
                onClick={handleOpenInvitation}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex flex-col items-center gap-4 focus:outline-none"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#4A1942] text-white shadow-2xl ring-8 ring-white/60 transition-all group-hover:bg-[#C026D3]">
                  <BookOpen size={32} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#4A1942]">
                  Open Storybook
                </span>
              </motion.button>
            </div>

            <div className="pointer-events-none absolute bottom-0 right-0 w-80 opacity-25 md:w-150">
              <Image
                src="/shared-assets/asset-4.png"
                alt="Floral"
                width={600}
                height={600}
                className="h-auto w-full scale-x-[-1]"
                style={{ filter: "hue-rotate(280deg) saturate(1.4)" }}
              />
            </div>

            <div className="pointer-events-none absolute left-0 top-0 w-64 opacity-15 md:w-120">
              <Image
                src="/shared-assets/asset-2.png"
                alt="Floral"
                width={600}
                height={600}
                className="h-auto w-full scale-y-[-1]"
                style={{ filter: "hue-rotate(280deg) saturate(1.4)" }}
              />
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {isOpened && (
        <div className="relative z-10 pt-6 md:pt-8">
          <FloweryFairytaleNav />

          <main className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
            <section className="grid min-h-[calc(100vh-5rem)] gap-8 lg:grid-cols-[1.15fr_0.85fr] items-stretch">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/70 p-6 shadow-[0_24px_70px_rgba(74,25,66,0.12)] backdrop-blur-xl md:p-10 lg:p-12"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,232,255,0.75),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(253,224,71,0.2),transparent_35%)]" />
                <div className="relative z-10 space-y-8">
                  <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.5em] text-[#C026D3]">
                    <Crown size={14} />
                    Storybook Invitation
                  </div>

                  <div className="max-w-2xl space-y-5">
                    <h2 className="text-5xl leading-[0.9] text-[#4A1942] md:text-7xl lg:text-8xl" style={{ fontFamily: "'Dancing Script', cursive" }}>
                      {birthdayData.celebrant}&apos;s {birthdayData.age}th Birthday
                    </h2>
                    <p className="max-w-xl text-base leading-relaxed font-sans text-[#6B2948] md:text-lg">
                      Step into a softer fairytale world built from petals, candlelight, and a little bit of magic.
                    </p>
                  </div>

                  <div className="grid max-w-2xl gap-4 sm:grid-cols-3">
                    <div className="rounded-3xl border border-[#FAE8FF] bg-[#FFF7FB] p-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#C026D3]">Date</p>
                      <p className="mt-2 text-xl font-serif text-[#4A1942]">{birthdayData.dateLabel}</p>
                      <p className="font-sans text-sm text-[#6B2948]">{birthdayData.month} {birthdayData.day}, {birthdayData.year}</p>
                    </div>
                    <div className="rounded-3xl border border-[#FAE8FF] bg-[#FFF7FB] p-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#C026D3]">Time</p>
                      <p className="mt-2 text-xl font-serif text-[#4A1942]">{birthdayData.time}</p>
                      <p className="font-sans text-sm text-[#6B2948]">Garden Welcome</p>
                    </div>
                    <div className="rounded-3xl border border-[#FAE8FF] bg-[#FFF7FB] p-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#C026D3]">Theme</p>
                      <p className="mt-2 text-xl font-serif text-[#4A1942]">Floral Fairytale</p>
                      <p className="font-sans text-sm text-[#6B2948]">A dreamy celebration</p>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 mt-8 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#4A1942] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.35em] text-white">
                    <Sparkles size={12} />
                    RSVP open
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#FAE8FF] bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.35em] text-[#4A1942]">
                    <BookOpen size={12} />
                    Scroll the story
                  </span>
                </div>
              </motion.div>

              <motion.aside
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="flex flex-col gap-6"
              >
                <div className="relative overflow-hidden rounded-[2.5rem] bg-[#4A1942] p-8 text-white shadow-[0_24px_70px_rgba(74,25,66,0.22)] md:p-10">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(192,38,211,0.35),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(250,232,255,0.2),transparent_35%)]" />
                  <div className="relative z-10">
                    <p className="text-[10px] font-bold uppercase tracking-[0.45em] text-[#F9A8D4]">Countdown</p>
                    <h3 className="mt-3 text-4xl md:text-5xl" style={{ fontFamily: "'Dancing Script', cursive" }}>
                      The moment is near
                    </h3>
                    <div className="mt-6 rounded-[1.75rem] bg-white/10 p-4 backdrop-blur-sm">
                      <Countdown targetDate={birthdayData.countdownTarget} />
                    </div>
                  </div>
                </div>

                <div className="rounded-[2.5rem] border border-white/70 bg-white/80 p-6 shadow-[0_24px_70px_rgba(74,25,66,0.10)] backdrop-blur-xl md:p-8">
                  <h3 className="mb-2 text-2xl text-[#4A1942] md:text-3xl" style={{ fontFamily: "'Dancing Script', cursive" }}>
                    Invitation Music
                  </h3>
                  <p className="mb-4 text-sm font-sans text-[#6B2948]">
                    Play the birthday soundtrack while you explore the fairytale.
                  </p>
                  <MusicSection
                    isPlaying={isPlaying}
                    onTogglePlay={togglePlay}
                    audioRef={audioRef}
                    songTitle={birthdayData.music.title}
                    artistName={birthdayData.music.artist}
                    slideshowImages={birthdayData.music.slides}
                  />
                </div>
              </motion.aside>
            </section>

            <section className="mt-10 rounded-[2.5rem] border border-white/70 bg-white/60 p-6 shadow-[0_24px_70px_rgba(74,25,66,0.08)] backdrop-blur-xl md:p-8 lg:p-10">
              <div className="mx-auto max-w-3xl space-y-4 text-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.45em] text-[#C026D3]">
                  Welcome to the celebration
                </p>
                <h3 className="text-4xl text-[#4A1942] md:text-5xl" style={{ fontFamily: "'Dancing Script', cursive" }}>
                  A fairytale told in chapters
                </h3>
                <p className="text-base leading-relaxed text-[#6B2948] font-sans md:text-lg">
                  This version replaces the scrolling video reveal with a layered editorial layout, a soft storybook cover, and a more atmospheric birthday flow.
                </p>
              </div>
            </section>

            <div className="mt-12 space-y-12">
              <StorySection />
              <EventProgram />
              <AutoGallerySection />
              <SpecialGuests />
              <LocationSection />
              <RSVPSection />
              <FooterSection />
            </div>
          </main>
        </div>
      )}
    </div>
  );
};

export default FloweryFairytale;
