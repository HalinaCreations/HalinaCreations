"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Mail, Phone, Send, CheckCircle2, 
  Plus, Facebook, MessageCircle, ArrowRight, Sparkles, MonitorSmartphone, Palette
} from 'lucide-react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import AboutSection from '@/components/pages/AboutSection';
import FoundersSection from '@/components/pages/FoundersSection';


// --- IMPORT EXTERNAL DATA ---
import { pricingPackages, allWorks, faqs } from '@/lib/data';

export default function HalinaCreations() {
  const [contactMethod, setContactMethod] = useState<'email' | 'messenger'>('email');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const sampleWorksPreview = allWorks.slice(0, 3);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.1 } },
    viewport: { once: true, amount: 0.1 }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7fff9] text-emerald-950 selection:bg-emerald-100">
      <Navbar />
      
      {/* --- HERO SECTION --- */}
      <section id="home" className="relative min-h-screen flex items-center bg-[#18312c] overflow-hidden px-6 lg:px-20">
        <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between relative z-10 pt-20">
          <motion.div {...fadeIn} className="text-left max-w-2xl lg:w-1/2">
            <span className="uppercase tracking-[0.4em] text-[10px] font-bold text-emerald-200/50 mb-6 block">Premium Digital Experiencess</span>
            <h2 className="text-5xl md:text-7xl font-serif mb-8 leading-[1.1] tracking-tight text-white">
              Where moments meet <span className="italic font-light text-emerald-300/80 text-4xl md:text-6xl text-opacity-90 ml-2">digital artistry.</span>
            </h2>
            <p className="max-w-lg text-emerald-100/70 mb-12 text-lg leading-relaxed font-light">
Elevate your world with bespoke digital solutions. From interactive invitations for weddings and birthdays to professional websites for your business, we craft sustainable, tailored experiences for every major milestone.            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/catalog">
                <button className="bg-emerald-50 text-emerald-950 px-10 py-4 rounded-full hover:bg-white transition-all shadow-xl shadow-emerald-900/20 font-bold">
                  View Collections
                </button>
              </Link>
              <Link href="/pricing">
                <button className="border border-emerald-500/30 text-emerald-100 px-10 py-4 rounded-full hover:bg-emerald-900 transition-all font-medium backdrop-blur-sm">
                  View Pricing
                </button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:flex lg:w-1/2 justify-end select-none pointer-events-none"
          >
            <Image src="/hc-logo.png" alt="Halina Creations Logo" width={550} height={550} loading="eager" className="w-full max-w-137.5 h-auto object-contain opacity-40 brightness-110 drop-shadow-2xl" />
          </motion.div>
        </div>
      </section>

     {/* ---  ABOUT SECTION --- */}
      <AboutSection /> {/* */}
     
      {/* --- SAMPLE WORKS PREVIEW --- */}
      <section id="sample-works" className="py-32 px-6 bg-[#fcfdfc]">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-16">
            <h3 className="text-4xl font-serif mb-4 text-emerald-950 font-bold">Signature Creations</h3>
            <p className="text-emerald-800/60 font-light">A glimpse into our digital suites for life&apos;s greatest milestones.</p>
          </motion.div>

          <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="grid md:grid-cols-3 gap-10">
            {sampleWorksPreview.map((work) => (
              <motion.div key={work.id} variants={fadeIn} whileHover={{ y: -10 }} className="group cursor-pointer">
                <Link href={work.route}>
                  <div className="aspect-3/4 bg-emerald-50 rounded-2xl mb-6 overflow-hidden shadow-lg border border-emerald-100/50 transition-shadow hover:shadow-emerald-200">
                    <Image src={work.image} alt={work.title} width={300} height={400} className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-in-out" />
                  </div>
                  <h4 className="text-xl font-serif text-emerald-950 font-bold">{work.title}</h4>
                  <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-[0.2em] mt-2">{work.category}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...fadeIn} className="mt-16 text-center">
            <Link href="/catalog">
              <button className="group inline-flex items-center gap-3 px-10 py-4 rounded-full border border-emerald-200 text-emerald-900 font-bold tracking-widest text-[10px] uppercase hover:bg-emerald-950 hover:text-white transition-all duration-500">
                Explore More Works <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

       {/* --- WHAT WE OFFER SECTION --- */}
      <section className="py-24 bg-[#f0f9f4] px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-16">
            <span className="uppercase tracking-[0.3em] text-[10px] font-bold text-emerald-800/40 mb-3 block">Our Services</span>
            <h3 className="text-4xl font-serif mb-6 text-emerald-950 font-bold">What We Offer</h3>
            <p className="text-emerald-800/60 font-light max-w-2xl mx-auto">
              From personal milestones to professional digital presence, we provide tailored solutions designed to impress.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer} 
            initial="initial" 
            whileInView="whileInView" 
            viewport={{ once: true }} 
            className="grid md:grid-cols-3 gap-8"
          >
            {/* Service 1: Website Invitations */}
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-3xl shadow-sm border border-emerald-50 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 text-emerald-600">
                <Sparkles size={28} />
              </div>
              <h4 className="text-xl font-serif text-emerald-950 font-bold mb-3">Website Invitations</h4>
              <p className="text-emerald-800/60 leading-relaxed text-sm font-light mb-6">
                Interactive, elegant, and eco-friendly invitations for weddings, birthdays, and special milestones. Includes RSVP tracking, maps, and music.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-xs text-emerald-800/70 font-medium">
                  <CheckCircle2 size={14} className="text-emerald-500" /> Wedding Suites
                </li>
                <li className="flex items-center gap-2 text-xs text-emerald-800/70 font-medium">
                  <CheckCircle2 size={14} className="text-emerald-500" /> Birthday Bashes
                </li>
                <li className="flex items-center gap-2 text-xs text-emerald-800/70 font-medium">
                  <CheckCircle2 size={14} className="text-emerald-500" /> Christening & Other Events
                </li>
              </ul>
            </motion.div>

            {/* Service 2: Graphic Layout & Design */}
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-3xl shadow-sm border border-emerald-50 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 text-emerald-600">
                <Palette size={28} />
              </div>
              <h4 className="text-xl font-serif text-emerald-950 font-bold mb-3">Graphic Layout & Design</h4>
              <p className="text-emerald-800/60 leading-relaxed text-sm font-light mb-6">
                Stunning visuals for print and digital. We transform your ideas into polished designs that capture attention and communicate your message.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-xs text-emerald-800/70 font-medium">
                  <CheckCircle2 size={14} className="text-emerald-500" /> Event Signage & Tarpaulins
                </li>
                <li className="flex items-center gap-2 text-xs text-emerald-800/70 font-medium">
                  <CheckCircle2 size={14} className="text-emerald-500" /> Social Media Graphics
                </li>
                 <li className="flex items-center gap-2 text-xs text-emerald-800/70 font-medium">
                  <CheckCircle2 size={14} className="text-emerald-500" /> Brand Collaterals
                </li>
              </ul>
            </motion.div>

            {/* Service 3: Custom Business Websites */}
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-3xl shadow-sm border border-emerald-50 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 text-emerald-600">
                <MonitorSmartphone size={28} />
              </div>
              <h4 className="text-xl font-serif text-emerald-950 font-bold mb-3">Custom Business Websites</h4>
               <p className="text-emerald-800/60 leading-relaxed text-sm font-light mb-6">
                Custom-built, responsive websites that elevate your brand. From portfolios to landing pages, we bring your business to life online.
              </p>
              <ul className="space-y-2 mb-6">
                 <li className="flex items-center gap-2 text-xs text-emerald-800/70 font-medium">
                  <CheckCircle2 size={14} className="text-emerald-500" /> Portfolio Sites
                </li>
                <li className="flex items-center gap-2 text-xs text-emerald-800/70 font-medium">
                  <CheckCircle2 size={14} className="text-emerald-500" /> Landing Pages
                </li>
                <li className="flex items-center gap-2 text-xs text-emerald-800/70 font-medium">
                  <CheckCircle2 size={14} className="text-emerald-500" /> Service Showcases
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section id="pricing" className="py-32 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-20">
            <h3 className="text-4xl font-serif mb-4 text-emerald-950 tracking-tight font-bold">Pricing & Packages</h3>
            <p className="text-emerald-800/60 font-light">Simple, transparent pricing for any celebration.</p>
          </motion.div>
          <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="grid md:grid-cols-3 gap-8">
            {pricingPackages.map((pkg, idx) => (
              <motion.div key={idx} variants={fadeIn} whileHover={{ y: -10 }} className="p-10 rounded-[2.5rem] flex flex-col border border-emerald-50 bg-white text-emerald-950 shadow-sm transition-all duration-500">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="text-[10px] uppercase tracking-widest font-bold opacity-60">{pkg.tier}</h4>
                    {pkg.highlight && <span className="bg-emerald-500 text-white text-[8px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Most Popular</span>}
                </div>
                <div className="text-4xl font-serif mb-8 font-bold">{pkg.price}</div>
                <ul className="space-y-4 mb-10 text-sm opacity-80 grow font-light">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="flex gap-3 items-center">
                      <CheckCircle2 size={16} className="text-emerald-600" /> {f}
                    </li>
                  ))}
                </ul>
                <div className="space-y-3">
                  <Link href="#contact" className="block w-full">
                    <button className="w-full py-4 rounded-xl text-xs font-bold transition-all bg-emerald-950 text-white hover:bg-emerald-900 active:scale-95">
                      Reserve Package
                    </button>
                  </Link>
                  <Link href={`/catalog?tier=${pkg.tier}`} className="w-full">
                    <button className="w-full py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all border border-emerald-100 hover:bg-emerald-50 text-emerald-600">
                       See Sample Templates
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- FOUNDERS SECTION --- */}
      <FoundersSection />

      {/* --- FAQ SECTION --- */}
      <section className="py-32 bg-[#fcfdfc] px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h3 {...fadeIn} className="text-4xl font-serif mb-12 text-center text-emerald-950 font-bold">Frequently Asked Questions</motion.h3>
          <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.details key={idx} variants={fadeIn} className="group border border-emerald-100/50 rounded-2xl px-6 py-2 cursor-pointer transition-all hover:bg-white hover:border-emerald-200">
                <summary className="flex justify-between items-center font-medium py-4 list-none outline-none">
                  <span className="text-emerald-900 font-bold">{faq.q}</span>
                  <span className="text-emerald-400 transition-transform group-open:rotate-180"><Plus size={18} /></span>
                </summary>
                <p className="text-emerald-800/60 pb-6 leading-relaxed font-light text-sm italic">{faq.a}</p>
              </motion.details>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-32 bg-white px-6 border-t border-emerald-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20">
          <motion.div {...fadeIn}>
            <span className="uppercase tracking-[0.3em] text-[10px] font-bold text-emerald-800/40 mb-6 block">Ready to Begin?</span>
            <h3 className="text-5xl font-serif mb-8 text-emerald-950 leading-tight font-bold">Let&apos;s create <br /> something <span className="italic text-emerald-700/80 font-light">timeless.</span></h3>
            <div className="space-y-8 mt-12">
              <div className="flex gap-6 items-center">
                <div className="w-12 h-12 bg-[#f0fdf4] rounded-full flex items-center justify-center shadow-sm border border-emerald-100/50"><Mail size={20} className="text-emerald-900" /></div>
                <div><p className="text-[10px] uppercase font-bold text-emerald-800/40 tracking-widest">Email Us</p><span className="text-emerald-900 font-medium tracking-tight">hello.halinacreation@gmail.com</span></div>
              </div>
              <div className="flex gap-6 items-center">
                <div className="w-12 h-12 bg-[#f0fdf4] rounded-full flex items-center justify-center shadow-sm border border-emerald-100/50"><Facebook size={20} className="text-emerald-900" /></div>
                <div><p className="text-[10px] uppercase font-bold text-emerald-800/40 tracking-widest">Follow Us</p><a href="https://www.facebook.com/profile.php?id=61586136991884" target="_blank" rel="noopener noreferrer" className="text-emerald-900 font-medium hover:text-emerald-700 transition">Halina Creations</a></div>
              </div>
              <div className="flex gap-6 items-center">
                <div className="w-12 h-12 bg-[#f0fdf4] rounded-full flex items-center justify-center shadow-sm border border-emerald-100/50">
                  <Phone size={20} className="text-emerald-900" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-emerald-800/40 tracking-widest">Call Us</p>
                  <span className="text-emerald-900 font-medium tracking-tight">+63 945 786 7636</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div {...fadeIn} transition={{ delay: 0.3 }} className="bg-[#fcfdfc] p-10 rounded-[2.5rem] shadow-lg border border-emerald-50">
            <div className="flex bg-emerald-50 p-1 rounded-xl mb-8">
              <button onClick={() => setContactMethod('email')} className={`flex-1 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${contactMethod === 'email' ? 'bg-white text-emerald-900 shadow-sm' : 'text-emerald-800/40'}`}>Email Form</button>
              <button onClick={() => setContactMethod('messenger')} className={`flex-1 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${contactMethod === 'messenger' ? 'bg-white text-emerald-900 shadow-sm' : 'text-emerald-800/40'}`}>Messenger</button>
            </div>
            <AnimatePresence mode="wait">
              {contactMethod === 'email' ? (
                <motion.form key="email-form" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6" onSubmit={handleSubmit}>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white border border-emerald-50 rounded-xl p-4 text-sm focus:ring-1 focus:ring-emerald-200 outline-none" 
                    placeholder="Full Name" 
                    required
                  />
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white border border-emerald-50 rounded-xl p-4 text-sm focus:ring-1 focus:ring-emerald-200 outline-none" 
                    placeholder="Email Address" 
                    required
                  />
                  <textarea 
                    rows={4} 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-white border border-emerald-50 rounded-xl p-4 text-sm focus:ring-1 focus:ring-emerald-200 outline-none" 
                    placeholder="Tell us about your event vision..."
                    required
                  ></textarea>
                  
                  {formStatus === 'success' && (
                    <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl text-sm flex items-center gap-2">
                      <CheckCircle2 size={18} /> Message sent successfully! We will get back to you soon.
                    </div>
                  )}
                  
                  {formStatus === 'error' && (
                    <div className="bg-red-50 text-red-800 p-4 rounded-xl text-sm">
                      Failed to send message. Please try again or contact us directly.
                    </div>
                  )}
                  
                  <button 
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className="w-full bg-emerald-950 text-emerald-50 py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-emerald-900 font-bold shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formStatus === 'sending' ? 'Sending...' : 'Send Inquiry'} <Send size={18} />
                  </button>
                </motion.form>
              ) : (
                <motion.div key="messenger-link" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="text-center py-10 space-y-6">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"><MessageCircle size={40} /></div>
                  <h4 className="text-xl font-serif text-emerald-950 font-bold">Chat with us on Messenger</h4>
                  <p className="text-sm text-emerald-800/60 font-light mb-8">Get an instant response directly from the team.</p>
                  <a href="https://facebook.com/messages/t/61586136991884" target="_blank" rel="noopener noreferrer" className=" w-full bg-[#0084FF] text-white py-3 rounded-xl flex items-center justify-center gap-3 hover:opacity-90 font-bold shadow-lg transition-all active:scale-95">Open Messenger <MessageCircle size={18} /></a>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}