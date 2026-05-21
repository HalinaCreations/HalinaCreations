import React from 'react'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Adult Celebration Birthday Template | Halina Creations',
  description: 'An elegant adult birthday celebration invitation template.',
  openGraph: {
    title: 'Adult Celebration Birthday Template',
    description: 'An elegant adult birthday celebration invitation template',
    images: ['/images/halina.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adult Celebration Birthday Template',
    description: 'An elegant adult birthday celebration invitation template',
    images: ['/images/halina.png'],
  },
};

const AdultCelebrationPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-indigo-50 to-blue-50 flex items-center justify-center p-6">
      <div className="max-w-2xl text-center">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-linear-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl">
            <span className="text-6xl">🎉</span>
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-purple-900 mb-4">
          Adult Celebration
        </h1>
        <p className="text-xl text-purple-700 mb-8 font-light">
          A sophisticated birthday invitation template
        </p>
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-200">
          <p className="text-purple-800 italic">
            This template is currently under development. Check back soon for the full experience!
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdultCelebrationPage