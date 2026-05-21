"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeScrolled = !isHome || isScrolled;

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Sample Works', href: '/catalog' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      activeScrolled 
      ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-emerald-50" 
      : "bg-transparent"
    }`}>
      {/* --- TOP BAR CONTAINER --- */}
      {/* Moved py-6 padding here so it doesn't affect the drawer below it */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/">
          <h1 className={`text-2xl font-serif font-bold tracking-tight transition-colors duration-300 ${
            activeScrolled ? "text-emerald-950" : "text-emerald-50"
          }`}>
            HALINA <span className={`font-light italic transition-colors duration-300 ${
              activeScrolled ? "text-emerald-700" : "text-emerald-200/80"
            }`}>CREATIONS</span>
          </h1>
        </Link>
        
        <div className={`hidden md:flex gap-8 text-xs uppercase tracking-[0.2em] font-semibold transition-colors duration-300 ${
          activeScrolled ? "text-emerald-950" : "text-emerald-50/90"
        }`}>
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-emerald-400 transition-colors">
              {link.name}
            </Link>
          ))}
        </div>

        <button 
          className="md:hidden p-2 outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X size={28} className={activeScrolled ? "text-emerald-950" : "text-emerald-50"} />
          ) : (
            <Menu size={28} className={activeScrolled ? "text-emerald-950" : "text-emerald-50"} />
          )}
        </button>
      </div>

      {/* --- MOBILE DRAWER --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            /* Removed bg-white so it inherits the parent's blurred background for a seamless look */
            className="md:hidden bg-white overflow-hidden border-t border-emerald-50/50"
          >
            <div className="px-6 py-10 flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsOpen(false)} 
                  className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-950 hover:text-emerald-600 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}