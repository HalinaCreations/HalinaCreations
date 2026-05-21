"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Menu, X } from 'lucide-react';

export default function ElegantGardenNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Our Story', href: '#story' },
    { name: 'Details', href: '#details' },
    { name: 'RSVP', href: '#rsvp' },
  ];

  /**
   * THEME COLORS:
   * Background Scrolled: #F8FAFC (Slate White)
   * Royal Blue Accent: #1E40AF (Icon & Hover)
   * Deep Navy Text: #1E293B (Primary Text)
   * Soft Blue Backdrop: #DBEAFE (Menu Background)
   */

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-[#F8FAFC]/90 backdrop-blur-md py-4 shadow-[0_4px_20px_rgba(30,64,175,0.05)]' 
        : 'bg-transparent py-8'
    }`}>
      <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
        {/* Logo Section updated to Deep Navy and Royal Blue */}
        <div className="flex items-center gap-2 text-[#1E293B] font-serif italic text-xl">
          <Heart size={18} className="text-[#1E40AF]" fill="#1E40AF" />
          <span className="text-xl pt-1">J & S</span>
        </div>

        {/* Desktop Links updated with Royal Blue hover state */}
        <div className="hidden md:flex gap-10 items-center">
          {links.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#1E293B]/60 hover:text-[#1E40AF] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle updated to Deep Navy */}
        <button className="md:hidden text-[#1E293B]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            /* Mobile menu background updated to Soft Sky Blue */
            className="overflow-hidden md:hidden bg-[#DBEAFE]/95 backdrop-blur-lg border-b border-[#1E40AF]/10" 
          >
            <div className="flex flex-col items-center py-10 gap-6">
              {links.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  /* Mobile links updated with Navy/Royal contrast */
                  className="text-xs uppercase font-bold tracking-widest text-[#1E293B] hover:text-[#1E40AF]"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}