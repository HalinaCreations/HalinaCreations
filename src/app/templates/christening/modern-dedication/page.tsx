import React from 'react'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Modern Dedication Christening Template | Halina Creations',
  description: 'A modern child dedication ceremony invitation template.',
  openGraph: {
    title: 'Modern Dedication Christening Template',
    description: 'A modern child dedication ceremony invitation template',
    images: ['/images/halina.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modern Dedication Christening Template',
    description: 'A modern child dedication ceremony invitation template',
    images: ['/images/halina.png'],
  },
};

const ModernDedicationPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-teal-50 via-cyan-50 to-sky-50 flex items-center justify-center p-6">
      <div className="max-w-2xl text-center">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-linear-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl">
            <span className="text-6xl">✨</span>
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-teal-900 mb-4">
          Modern Dedication
        </h1>
        <p className="text-xl text-teal-700 mb-8 font-light">
          A contemporary dedication ceremony invitation
        </p>
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-teal-200">
          <p className="text-teal-800 italic">
            This template is currently under development. Check back soon for the full experience!
          </p>
        </div>
      </div>
    </div>
  )
}

export default ModernDedicationPage