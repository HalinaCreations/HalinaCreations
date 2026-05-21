"use client";

import React, { useEffect, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Link from 'next/link';
import { Mail, Phone, Facebook, MapPin } from 'lucide-react';

export default function Footer() {
  const controls = useAnimation();
  const marqueeText = "For moments that matter • For moments that matter • For moments that matter • For moments that matter • ";

  // Function to start the infinite loop
  const startMarquee = useCallback(() => {
    controls.start({
      x: [0, -1000], 
      transition: {
        duration: 50,
        repeat: Infinity,
        ease: "linear",
      },
    });
  }, [controls]);

  // Start animation on initial load
  useEffect(() => {
    startMarquee();
  }, [startMarquee]);

  return (
    <footer className="bg-[#f7fff9] border-t border-emerald-50 overflow-hidden pt-10 pb-16">
      
      {/* --- DRAGGABLE & AUTOMATIC MARQUEE --- */}
      <div 
        className="relative border-b border-emerald-50/50 mb-16 cursor-grab active:cursor-grabbing select-none"
      >
        <motion.div 
          className="py-6 whitespace-nowrap flex"
          animate={controls}
          drag="x"
          dragConstraints={{ left: -2000, right: 100 }}
          onDragEnd={() => startMarquee()}
          whileTap={{ cursor: "grabbing" }}
        >
          <span className="text-[20vw] md:text-[12vw] font-serif italic font-light text-emerald-900/5 uppercase tracking-tighter whitespace-pre">
            {marqueeText}
          </span>
          <span className="text-[20vw] md:text-[12vw] font-serif italic font-light text-emerald-900/5 uppercase tracking-tighter whitespace-pre">
            {marqueeText}
          </span>
        </motion.div>
      </div>

      {/* CHANGED: text-center md:text-left to text-left */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
        
        {/* Branding Column */}
        <div className="space-y-4">
          <h4 className="text-xl font-serif font-bold tracking-tight text-emerald-950">
            HALINA <span className="font-light italic text-emerald-700">CREATIONS</span>
          </h4>
          {/* CHANGED: mx-auto md:mx-0 to mx-0 */}
          <p className="text-sm text-emerald-800/60 font-light leading-relaxed max-w-xs mx-0">
            Elevating your most cherished milestones through bespoke digital artistry and seamless experiences.
          </p>
        </div>

        {/* Quick Links Column */}
        <div className="space-y-6">
          <h5 className="text-[10px] uppercase font-bold tracking-[0.2em] text-emerald-900/40">Quick Links</h5>
          <ul className="flex flex-col gap-3 text-xs font-semibold uppercase tracking-widest text-emerald-950">
            <li><Link href="/" className="hover:text-emerald-500 transition">Home</Link></li>
            <li><Link href="/#about" className="hover:text-emerald-500 transition">About</Link></li>
            <li><Link href="/catalog" className="hover:text-emerald-500 transition">Works</Link></li>
            <li><Link href="/pricing" className="hover:text-emerald-500 transition">Pricing</Link></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className="space-y-6">
          <h5 className="text-[10px] uppercase font-bold tracking-[0.2em] text-emerald-900/40">Connect With Us</h5>
          <ul className="space-y-4 text-sm text-emerald-950">
            {/* CHANGED: justify-center md:justify-start to justify-start for all rows */}
            <li className="flex items-center justify-start gap-3">
              <Mail size={16} className="text-emerald-600" />
              <span className="font-medium">hello.halinacreations@gmail.com</span>
            </li>
            <li className="flex items-center justify-start gap-3">
              <Phone size={16} className="text-emerald-600" />
              <span className="font-medium">+63 945 786 7636</span>
            </li>
            <li className="flex items-center justify-start gap-3">
              <Facebook size={16} className="text-emerald-600" />
              <a 
                href="https://www.facebook.com/profile.php?id=61586136991884" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-medium hover:text-emerald-700 transition"
              >
                Halina Creations
              </a>
            </li>
            <li className="flex items-center justify-start gap-3">
              <MapPin size={16} className="text-emerald-600" />
              <span className="font-medium">Philippines</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Footer */}
      <div className="max-w-7xl mx-auto px-6 pt-16 text-center">
        <p className="text-emerald-800/30 text-[10px] uppercase font-bold tracking-[0.3em] mb-2">
          Crafted with precision
        </p>
        <p className="text-emerald-800/50 text-xs font-light italic tracking-wider">
          © 2026 Halina Creations. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}