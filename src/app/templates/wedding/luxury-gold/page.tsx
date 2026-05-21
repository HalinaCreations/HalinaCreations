import React from 'react'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Luxury Gold Wedding Template | Halina Creations',
  description: 'An elegant gold-themed wedding invitation template.',
  openGraph: {
    title: 'Luxury Gold Wedding Template',
    description: 'An elegant gold-themed wedding invitation template',
    images: ['/images/halina.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxury Gold Wedding Template',
    description: 'An elegant gold-themed wedding invitation template',
    images: ['/images/halina.png'],
  },
};

const LuxuryGoldPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-yellow-50 to-amber-100 flex items-center justify-center p-6">
      <div className="max-w-2xl text-center">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-linear-to-br from-yellow-400 to-amber-600 rounded-full flex items-center justify-center shadow-2xl">
            <span className="text-6xl">💛</span>
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-amber-900 mb-4">
          Luxury Gold
        </h1>
        <p className="text-xl text-amber-700 mb-8 font-light">
          An elegant wedding invitation template
        </p>
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-amber-200">
          <p className="text-amber-800 italic">
            This template is currently under development. Check back soon for the full experience!
          </p>
        </div>
      </div>
    </div>
  )
}

export default LuxuryGoldPage