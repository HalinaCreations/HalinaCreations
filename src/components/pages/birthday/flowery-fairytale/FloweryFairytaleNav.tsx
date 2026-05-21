"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Menu, X } from 'lucide-react';

export default function FloweryFairytaleNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'My Story', href: '#story' },
    { name: 'Program', href: '#details' },
    { name: 'RSVP', href: '#rsvp' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled
        ? 'bg-[#FFF8FC]/90 backdrop-blur-md py-4 shadow-[0_4px_20px_rgba(192,38,211,0.08)]'
        : 'bg-transparent py-8'
    }`}>
      <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 text-[#4A1942] font-serif italic text-xl">
          <Sparkles size={18} className="text-[#C026D3]" fill="#C026D3" />
          <span className="text-xl pt-1" style={{ fontFamily: "'Dancing Script', cursive" }}>Isabella</span>
        </div>

        <div className="hidden md:flex gap-10 items-center">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#4A1942]/60 hover:text-[#C026D3] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        <button className="md:hidden text-[#4A1942]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden md:hidden bg-[#FAE8FF]/95 backdrop-blur-lg border-b border-[#C026D3]/10"
          >
            <div className="flex flex-col items-center py-10 gap-6">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-xs uppercase font-bold tracking-widest text-[#4A1942] hover:text-[#C026D3]"
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
