"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import invitationData from './lib/data.json';

// --- STRICT TYPE-SAFE INTERFACES (NO 'ANY') ---
interface EventDetails {
  date: string;
  time: string;
  venue: string;
}

interface StoryData {
  title: string;
  content: string;
  backgroundImage: string;
  images?: string[];
}

interface InvitationStructure {
  vintageRomance: {
    story: StoryData;
    eventDetails: EventDetails;
  };
}

const WeddingDetailsPage = () => {
  // Safe data access using defined interfaces
  const data = invitationData as unknown as InvitationStructure;
  const { eventDetails } = data.vintageRomance;
  
  const weddingDate = useMemo(() => new Date(eventDetails.date), [eventDetails.date]);
  const monthName = weddingDate.toLocaleString('default', { month: 'long' });
  const year = weddingDate.getFullYear();
  const day = weddingDate.getDate();

  const daysInMonth = 31; 
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // --- LIVE COUNTDOWN LOGIC ---
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [weddingDate]);

  return (
    <div className="bg-[#edede2]">
      {/* --- SECTION 1: THE TYPOGRAPHIC CALENDAR --- */}
      <section className="relative w-full min-h-screen py-32 flex items-center justify-center px-8 overflow-hidden font-serif border-b border-emerald-950/5">
        <div className="absolute top-0 right-[15%] w-[1px] h-full bg-emerald-950/5 hidden lg:block" />

        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-0 items-stretch relative z-10">
          <div className="lg:col-span-5 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-emerald-950/10 pb-16 lg:pb-0 lg:pr-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="text-emerald-900/40 uppercase tracking-[0.6em] text-[12px] font-bold block">
                The Date to Remember
              </span>
              <div className="relative -mt-6">
                <h2 className="text-8xl md:text-9xl text-emerald-950 font-light leading-none tracking-tighter lowercase">
                  {monthName.substring(0, 3)}<span className="text-[#A3BCA7]">.</span>
                </h2>
                <p className="text-6xl md:text-6xl text-emerald-950/10 absolute -bottom-6 right-0 italic font-serif">
                  {day}
                </p>
              </div>
              <div className="pt-12">
                <h3 className="text-2xl md:text-3xl text-emerald-950 font-light tracking-widest uppercase">
                  {monthName} {day}, {year}
                </h3>
                <p className="text-emerald-900/40 uppercase tracking-[0.3em] text-xs mt-4 italic">
                  Save the Date
                </p>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center lg:pl-20">
            <div className="w-full">
              <div className="grid grid-cols-7 gap-y-10 text-center">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((label, i) => (
                  <span key={i} className="text-[10px] font-bold tracking-[0.2em] text-emerald-900/20 uppercase">{label}</span>
                ))}
                {calendarDays.map((d) => {
                  const isWeddingDay = d === day;
                  return (
                    <div key={d} className="relative flex items-center justify-center py-2">
                      {isWeddingDay && (
                        <motion.div 
                          layoutId="activeDay"
                          className="absolute w-10 h-10 bg-[#A3BCA7] rounded-full z-0 shadow-lg"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                        />
                      )}
                      <span className={`text-xl relative z-10 ${isWeddingDay ? 'text-white font-bold' : 'text-emerald-950/60 font-light'}`}>
                        {d}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -bottom-10 left-10 select-none pointer-events-none opacity-[0.02]">
          <h1 className="text-[20rem] font-bold text-emerald-950 leading-none">{year}</h1>
        </div>
      </section>

      {/* --- SECTION 2: THE TYPOGRAPHIC COUNTDOWN --- */}
      <section className="relative w-full py-20 flex flex-col items-center justify-center px-6 md:px-6 font-serif overflow-hidden">
        <div className="max-w-5xl w-full">
          {/* grid-cols-4 ensures single-line layout on mobile */}
          <div className="grid grid-cols-4 gap-3 md:gap-8">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Mins', value: timeLeft.minutes },
              { label: 'Secs', value: timeLeft.seconds },
            ].map((item, i) => (
              <div 
                key={i} 
                className="flex flex-col items-center justify-center bg-white/40 backdrop-blur-sm border border-emerald-950/5 rounded-2xl py-6 md:py-12 shadow-sm"
              >
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-3xl sm:text-4xl md:text-6xl font-light text-emerald-950 tabular-nums tracking-tighter"
                >
                  {String(item.value).padStart(2, '0')}
                </motion.span>
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  className="mt-2 md:mt-4 flex items-center gap-1 md:gap-3 px-2 text-center"
                >
                  <span className="text-[10px] sm:text-[9px] md:text-[11px] uppercase tracking-[0.15em] md:tracking-[0.4em] text-emerald-900/50 font-bold whitespace-nowrap">
                    {item.label}
                  </span>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center pb-14"
        >
          <div className="w-12 h-[1px] bg-emerald-950/20 mx-auto mb-8" />
          <p className="text-emerald-950 text-xl tracking-[0.2em] uppercase mb-4">{eventDetails.time}</p>
          <p className="text-emerald-900/50 italic text-lg leading-snug mb-10">{eventDetails.venue}</p>
          <p className="text-emerald-900/30 text-[10px] uppercase tracking-[0.5em] font-medium">Until we say I Do</p>
        </motion.div>
      </section>
    </div>
  );
};

export default WeddingDetailsPage;