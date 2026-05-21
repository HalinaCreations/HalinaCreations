import React from 'react'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Christmas Party Template | Halina Creations',
  description: 'A festive Christmas party invitation template.',
  openGraph: {
    title: 'Christmas Party Template',
    description: 'A festive Christmas party invitation template',
    images: ['/images/halina.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Christmas Party Template',
    description: 'A festive Christmas party invitation template',
    images: ['/images/halina.png'],
  },
};

const ChristmasPartyPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 via-green-50 to-red-50 flex items-center justify-center p-6">
      <div className="max-w-2xl text-center">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-linear-to-br from-red-500 to-green-600 rounded-full flex items-center justify-center shadow-2xl">
            <span className="text-6xl">🎄</span>
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-red-900 mb-4">
          Christmas Party
        </h1>
        <p className="text-xl text-green-700 mb-8 font-light">
          A festive holiday celebration invitation
        </p>
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-red-200">
          <p className="text-red-800 italic">
            This template is currently under development. Check back soon for the full experience!
          </p>
        </div>
      </div>
    </div>
  )
}

export default ChristmasPartyPage