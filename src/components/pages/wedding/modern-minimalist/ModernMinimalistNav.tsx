"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Menu, X } from 'lucide-react';

export default function ModernMinimalistNav() {
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
   * Background Scrolled: #FAF7F5 (Warm Linen)
   * Pastel Brown Accent: #8D6E63 (Icon & Hover)
   * Dark Mocha Text: #5D4037 (Primary Text)
   * Soft Almond Backdrop: #EFEBE9 (Menu Background)
   */

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-[#FAF7F5]/90 backdrop-blur-md py-4 shadow-[0_4px_20px_rgba(93,64,55,0.05)]' 
        : 'bg-transparent py-8'
    }`}>
      <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
        {/* Logo Section updated to Mocha and Pastel Brown */}
        <div className="flex items-center gap-2 text-[#5D4037] font-serif italic text-xl">
          <Heart size={18} className="text-[#8D6E63]" fill="#8D6E63" />
          <span className="text-xl pt-1">A & K</span>
        </div>

        {/* Desktop Links updated with Pastel Brown hover state */}
        <div className="hidden md:flex gap-10 items-center">
          {links.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#5D4037]/60 hover:text-[#8D6E63] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle updated to Mocha */}
        <button className="md:hidden text-[#5D4037]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            /* Mobile menu background updated to Soft Almond */
            className="overflow-hidden md:hidden bg-[#EFEBE9]/95 backdrop-blur-lg border-b border-[#8D6E63]/10" 
          >
            <div className="flex flex-col items-center py-10 gap-6">
              {links.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  /* Mobile links updated with Mocha/Pastel contrast */
                  className="text-xs uppercase font-bold tracking-widest text-[#5D4037] hover:text-[#8D6E63]"
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