import React from 'react';
import { Sparkles, Zap, Crown } from 'lucide-react';

/**
 * --- CATEGORIES & FILTERS ---
 * Used in the Catalog page for filtering logic.
 */
export const categories = ["All", "Wedding", "Birthday", "Corporate", "Social"];

export const tiers = [
  { label: "All", price: "" },
  { label: "Essential", price: "₱1,999" },
  { label: "Premium", price: "₱3,299" },
  { label: "Heirloom", price: "Custom" }
];

/**
 * --- PRICING PACKAGES ---
 * Features have been simplified to show only the core service name.
 */
export const pricingPackages = [
  {
    tier: "Essential Package",
    price: "₱1,999",
    description: "The perfect digital foundation for your celebration.",
    icon: React.createElement(Sparkles, { size: 24 }),
    features: [
      "One-page Website",
      "Music Integration",
      "\"Our Story\" Timeline",
      "Digital Countdown",
      "Entourage List",
      "Dress Code/Mood Board",
      "Interactive Animations",
      "Mobile Optimized",
      "Standard RSVP Link"
    ],
    highlight: false
  },
  {
    tier: "Premium Package",
    price: "₱3,299",
    description: "Advanced features for a fully integrated experience.",
    icon: React.createElement(Zap, { size: 24 }),
    features: [
      "All Essential features",
      "Custom QR Code",
      "Digital Invitation Card",
      "Multi-tab Photo Gallery",
      "Google Maps Integration",
      "Guest List Export"
    ],
    highlight: true
  },
  {
    tier: "Heirloom Package",
    price: "Custom",
    description: "Fully bespoke digital artistry for a lasting legacy.",
    icon: React.createElement(Crown, { size: 24 }),
    features: [
      "All Premium features",
      "Fully Custom Template",
      "Multi-page Microsite",
      "Custom Domain Link"
    ],
    highlight: false
  }
];

export const founders = [
  {
    name: 'Alliah Mikaela Revedezo',
    quote: 'Your story deserves a digital space that feels as beautiful as the moment itself.',
    image: '/images/website/alliah.png',
    portfolio: 'https://alliah-mikaela-revedezo.vercel.app/'
  },
  {
    name: 'Franze Wiliam Calleja',
    quote: 'A well-built website turns first impressions into lasting trust.',
    image: '/images/website/franze.png',
    portfolio: 'https://franzecalleja.vercel.app'
  }
];

/**
 * --- CATALOG / ALL WORKS ---
 */
export const allWorks = [
  // Wedding Templates
  { 
    id: 1, 
    title: "Elegant Garden", 
    category: "Wedding", 
    tier: "Heirloom", 
    image: "/images/elegant-garden/template1-cover.png",
    route: "/templates/wedding/elegant-garden"
  },
  { 
    id: 2, 
    title: "Luxury Gold", 
    category: "Wedding", 
    tier: "Heirloom", 
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800",
    route: "/templates/wedding/luxury-gold"
  },
  { 
    id: 3, 
    title: "Modern Minimalist", 
    category: "Wedding", 
    tier: "Premium", 
    image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800",
    route: "/templates/wedding/modern-minimalist"
  },
  { 
    id: 4, 
    title: "Rustic Charm", 
    category: "Wedding", 
    tier: "Premium", 
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800",
    route: "/templates/wedding/rustic-charm"
  },
  { 
    id: 5, 
    title: "Vintage Romance", 
    category: "Wedding", 
    tier: "Essential", 
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800",
    route: "/templates/wedding/vintage-romance"
  },
  
  // Birthday Templates
  { 
    id: 6, 
    title: "Adult Celebration", 
    category: "Birthday", 
    tier: "Premium", 
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800",
    route: "/templates/birthday/adult-celebration"
  },
  { 
    id: 7, 
    title: "Kids Party", 
    category: "Birthday", 
    tier: "Essential", 
    image: "https://images.unsplash.com/photo-1530103043960-ef38714abb15?q=80&w=800",
    route: "/templates/birthday/kids-party"
  },
  { 
    id: 8, 
    title: "Milestone Party", 
    category: "Birthday", 
    tier: "Premium", 
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=800",
    route: "/templates/birthday/milestone-party"
  },
  { 
    id: 9, 
    title: "Teen Bash", 
    category: "Birthday", 
    tier: "Essential", 
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800",
    route: "/templates/birthday/teen-bash"
  },
  // Christening Templates
  { 
    id: 10, 
    title: "Baptism", 
    category: "Social", 
    tier: "Essential", 
    image: "https://images.unsplash.com/photo-1519307212971-dd9561667ffb?q=80&w=800",
    route: "/templates/christening/baptism"
  },
  { 
    id: 11, 
    title: "Modern Dedication", 
    category: "Social", 
    tier: "Premium", 
    image: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?q=80&w=800",
    route: "/templates/christening/modern-dedication"
  },
  
  // Party Templates
  { 
    id: 12, 
    title: "Christmas Party", 
    category: "Corporate", 
    tier: "Premium", 
    image: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?q=80&w=800",
    route: "/templates/party/christmas-party"
  },
  { 
    id: 13, 
    title: "Graduation", 
    category: "Social", 
    tier: "Essential", 
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800",
    route: "/templates/party/graduation"
  },
  { 
    id: 14, 
    title: "Year End Party", 
    category: "Corporate", 
    tier: "Heirloom", 
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800",
    route: "/templates/party/year-end-party"
  },
];

/**
 * --- FREQUENTLY ASKED QUESTIONS ---
 */
export const faqs = [
  { 
    q: "How do guests receive the invitation?",  
    a: "You'll receive a unique link or a custom QR code that you can send via Messenger, WhatsApp, Email, or print on physical cards." 
  },
  { 
    q: "Can I include music and maps?", 
    a: "Absolutely! We can integrate your favorite song and an interactive Google Maps pin so guests can navigate directly to your venue." 
  },
  { 
    q: "What is the process for sending my wedding details?", 
    a: "After booking, we will provide a Google Form for you to fill out with your event details. If you have additional requests or want to change specific info later, simply reach out to us via email or Messenger, and we’ll handle the rest." 
  },
  { 
    q: "Can I change details after it's sent?", 
    a: "One of the best perks! If times or venues change, we update the live link instantly—no re-sending or re-printing required." 
  },
  { 
    q: "Is it mobile-friendly?", 
    a: "Yes. Every invitation is built with a 'mobile-first' approach to ensure it looks stunning on every smartphone screen." 
  }
];