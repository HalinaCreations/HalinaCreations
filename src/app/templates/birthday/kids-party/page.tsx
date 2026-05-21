import React from 'react'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kids Party Birthday Template | Halina Creations',
  description: 'A fun and colorful kids birthday party invitation template.',
  openGraph: {
    title: 'Kids Party Birthday Template',
    description: 'A fun and colorful kids birthday party invitation template',
    images: ['/images/halina.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kids Party Birthday Template',
    description: 'A fun and colorful kids birthday party invitation template',
    images: ['/images/halina.png'],
  },
};

const KidsPartyPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-pink-100 via-yellow-100 to-blue-100 flex items-center justify-center p-6">
      <div className="max-w-2xl text-center">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-linear-to-br from-pink-400 to-yellow-400 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
            <span className="text-6xl">🎈</span>
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-pink-900 mb-4">
          Kids Party
        </h1>
        <p className="text-xl text-pink-700 mb-8 font-light">
          A fun and colorful kids birthday invitation
        </p>
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-pink-200">
          <p className="text-pink-800 italic">
            This template is currently under development. Check back soon for the full experience!
          </p>
        </div>
      </div>
    </div>
  )
}

export default KidsPartyPage