"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Send } from 'lucide-react';
import Link from 'next/link';
import { pricingPackages } from '@/lib/data'; 
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

export default function PricingPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-[#f7fff9] text-emerald-950 selection:bg-emerald-100 pt-20">
      <Navbar />
      
      {/* --- HEADER --- */}
      <section className="pt-20 pb-48 bg-[#18312c] text-white px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeIn}>
            <span className="uppercase tracking-[0.4em] text-[10px] font-bold text-emerald-200/50 mb-4 block">
              Invest in your moments
            </span>
            <h2 className="text-4xl md:text-6xl font-serif mb-6 leading-tight text-white font-bold">
              Elevated Artistry <br /> for Every Budget
            </h2>
            <p className="text-emerald-100/60 font-light text-lg">
              Transparent packages tailored for weddings, birthdays, and life&apos;s most cherished events.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- PRICING CARDS --- */}
      <section className="relative z-10 -mt-50 px-6 py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 md:grid-cols-1 gap-8">
          {pricingPackages.map((pkg, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className={`p-8 md:p-10 rounded-[2.5rem] flex flex-col border transition-all duration-500 bg-white shadow-xl ${
                pkg.highlight ? 'border-emerald-500 ring-2 ring-emerald-500/10' : 'border-emerald-50'
              }`}
            >
              <div className="flex justify-between items-center mb-8">
                <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-600">
                  {pkg.icon}
                </div>
                {pkg.highlight && (
                  <span className="bg-emerald-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md">
                    Most Popular
                  </span>
                )}
              </div>
              
              <h3 className="text-2xl font-serif mb-2 tracking-tight font-bold">{pkg.tier}</h3>
              <p className="text-sm mb-6 font-light text-emerald-800/60 italic leading-relaxed">
                {pkg.description}
              </p>
              
              <div className="text-5xl font-serif mb-10 tracking-tighter font-bold text-emerald-950">
                {pkg.price}
                {pkg.price !== "Custom" && <span className="text-sm font-sans font-normal ml-2 text-emerald-800/40">PHP</span>}
              </div>

              {/* FEATURES LIST */}
              <ul className="space-y-4 mb-12 grow">
                {pkg.features.map((feat, i) => (
                  <li key={i} className="flex gap-2 items-start text-sm font-light tracking-tight text-emerald-900">
                    <CheckCircle2 size={18} className="text-emerald-500 mt-0.5 shrink-0" />
                    <span className="leading-tight">{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-3 mt-auto">
                {/* UPDATED: Inquire Now Redirect */}
                <Link href="/#contact" className="block">
                  <button className="w-full py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg flex items-center justify-center gap-2 bg-emerald-950 text-white hover:bg-emerald-800 active:scale-95">
                    Inquire Now <Send size={16} />
                  </button>
                </Link>
                
                <Link href={`/catalog?tier=${pkg.tier.split(' ')[0]}`} className="block">
                  <button className="w-full py-4 rounded-2xl font-semibold text-[10px] uppercase tracking-[0.2em] transition-all duration-300 border border-emerald-100 text-emerald-800 hover:bg-emerald-50 flex items-center justify-center gap-2">
                    See {pkg.tier.split(' ')[0]} Templates
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}