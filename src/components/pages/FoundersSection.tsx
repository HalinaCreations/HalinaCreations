"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { founders } from '@/lib/data';

const FoundersSection = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.65 }
  };

  return (
    <section id="founders" className="relative overflow-hidden py-24 px-6 bg-[#f7faf6]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(24,49,44,0.06),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.07),transparent_35%)]" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div {...fadeIn} className="max-w-2xl mb-14">
          <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] font-bold text-emerald-900/45 mb-4">
            <Sparkles size={12} /> Founders
          </span>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-emerald-950 leading-tight mb-4">
            The people behind Halina Creations.
          </h3>
          <p className="text-emerald-900/65 text-lg leading-relaxed max-w-xl font-light">
            Two developers, one shared vision: create elegant digital experiences that feel personal, polished, and memorable.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 items-stretch">
          {founders.map((founder, index) => (
            <motion.article
              key={founder.name}
              {...fadeIn}
              transition={{ duration: 0.7, delay: 0.1 + index * 0.08 }}
              whileHover={{ y: -4 }}
              className="overflow-hidden rounded-[2.2rem] border border-emerald-100 bg-white shadow-[0_18px_45px_rgba(16,42,34,0.07)] h-full"
            >
              <div className={`grid md:grid-cols-[0.92fr_1.08fr] ${index === 1 ? 'md:grid-cols-[1.08fr_0.92fr]' : ''}`}>
                <div className={`relative aspect-4/5 bg-[#edf4ee] ${index === 1 ? 'md:order-2' : ''}`}>
                  <Image
                    fill
                    src={founder.image}
                    alt={founder.name}
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-emerald-950/10 via-transparent to-transparent" />
                </div>

                <div className={`p-7 md:p-8 flex flex-col justify-between ${index === 1 ? 'md:order-1' : ''}`}>
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <p className="text-[9px] uppercase tracking-[0.32em] font-bold text-emerald-800/40">
                        {index === 0 ? 'Founder Voice' : 'Studio Voice'}
                      </p>
                      <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
                    </div>

                    <h4 className="text-2xl md:text-[1.7rem] font-serif font-bold text-emerald-950 leading-tight">
                      {founder.name}
                    </h4>
                    <blockquote className="mt-5 text-emerald-900/72 leading-relaxed font-light max-w-md border-l-2 border-emerald-200 pl-4 pr-4 italic">
                      {founder.quote}
                    </blockquote>
                  </div>

                  <Link
                    href={founder.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.3em] text-emerald-950 hover:text-emerald-700 transition-colors"
                  >
                    View Portfolio
                    <ArrowUpRight size={12} />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;