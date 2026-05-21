"use client";

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Filter, Tag, ChevronUp } from 'lucide-react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';


// --- IMPORT DATA FROM LIB ---
import { categories, tiers, allWorks } from '@/lib/data';

function CatalogContent() {
  const searchParams = useSearchParams(); 
  const tierParam = searchParams.get('tier');
  
  const [filter, setFilter] = useState("All");
  const [tierFilter, setTierFilter] = useState(tierParam || "All");

  const { scrollY } = useScroll();
  const instructionOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  // Unified Animation Configuration
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const filteredWorks = allWorks.filter(work => 
    (filter === "All" || work.category === filter) && 
    (tierFilter === "All" || work.tier === tierFilter)
  );

  return (
    <div className="min-h-screen bg-[#f7fff9] text-emerald-950 selection:bg-emerald-100 relative pt-20">
      <Navbar />
      {/* --- HEADER (Updated to match Pricing Layout) --- */}
      <section className="pt-20 pb-30 bg-[#18312c] text-white px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeIn}>
            <span className="uppercase tracking-[0.4em] text-[10px] font-bold text-emerald-200/50 mb-4 block">
              Digital Artistry for All Occasions
            </span>
            <h2 className="text-4xl md:text-6xl font-serif mb-6 leading-tight text-white font-bold">
              Signature <br /> Sample Works
            </h2>
            <p className="text-emerald-100/60 font-light text-lg">
              Explore our collection of bespoke digital invitations tailored for weddings, birthdays, and life&apos;s most cherished events.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- FILTER SECTION --- */}
      <section className="relative z-20 -mt-18 px-6"> {/* Adjusted margin to sit higher on the new header */}
        <div className="max-w-7xl mx-auto bg-white rounded-3xl border border-emerald-50 p-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
            <div className="space-y-4 w-full">
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-800/40 flex items-center gap-2">
                <Filter size={12} /> Filter by Event
              </span>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button 
                    key={cat} 
                    onClick={() => setFilter(cat)} 
                    className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                      filter === cat ? 'bg-[#18312c] text-white shadow-md' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-4 w-full">
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-800/40 flex items-center gap-2">
                <Tag size={12} /> Filter by Package
              </span>
              <div className="flex flex-wrap gap-2">
                {tiers.map(t => (
                  <button 
                    key={t.label} 
                    onClick={() => setTierFilter(t.label)} 
                    className={`px-5 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-2 ${
                      tierFilter === t.label ? 'bg-[#18312c] text-white shadow-md' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                    }`}
                  >
                    <span>{t.label}</span>
                    {t.price && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                        tierFilter === t.label ? 'border-emerald-700 bg-emerald-800 text-emerald-100' : 'border-emerald-200 text-emerald-600'
                      }`}>
                        {t.price}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- RESULTS GRID --- */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence mode='popLayout'>
              {filteredWorks.map((work) => (
                <motion.div 
                  key={work.id} 
                  layout 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 0.9 }} 
                  whileHover={{ y: -10 }} 
                  className="group cursor-pointer"
                >
                  <Link href={work.route}>
                    <div className="aspect-3/4 bg-emerald-50 rounded-2xl mb-6 overflow-hidden shadow-lg border border-emerald-100/50 relative">
                      <Image 
                        fill
                        src={work.image} 
                        alt={work.title} 
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-in-out" 
                      />
                      <div className="absolute top-4 right-4 bg-[#18312c]/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-emerald-50 shadow-lg">
                        {work.tier}
                      </div>
                    </div>
                    <h4 className="text-xl font-serif text-emerald-950 tracking-tight font-bold">{work.title}</h4>
                    <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-[0.2em] mt-2">{work.category}</p>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {filteredWorks.length === 0 && (
             <div className="text-center py-20 text-emerald-800/40 italic font-serif text-xl">
               No templates found for this selection.
             </div>
          )}
        </div>
      </section>

      {/* --- SWIPE INSTRUCTION --- */}
      <motion.div 
        style={{ opacity: instructionOpacity }} 
        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-40 pointer-events-none hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-emerald-900/60 bg-emerald-50/60 backdrop-blur-md px-6 py-3 rounded-full border border-emerald-100/50 shadow-sm">
          swipe up to view works
        </span>
        <motion.div 
          animate={{ y: [0, -8, 0] }} 
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronUp size={16} className="text-emerald-500" />
        </motion.div>
      </motion.div>
      <Footer />
    </div>

  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f7fff9] flex items-center justify-center font-serif text-emerald-800 italic">
        Loading Halina Catalog...
      </div>
    }>
      <CatalogContent />
    </Suspense>
  );
}