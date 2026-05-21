import React from 'react'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Baptism Christening Template | Halina Creations',
  description: 'A beautiful baptism and christening invitation template.',
  openGraph: {
    title: 'Baptism Christening Template',
    description: 'A beautiful baptism and christening invitation template',
    images: ['/images/halina.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Baptism Christening Template',
    description: 'A beautiful baptism and christening invitation template',
    images: ['/images/halina.png'],
  },
};

const BaptismPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 via-blue-50 to-indigo-50 flex items-center justify-center p-6">
      <div className="max-w-2xl text-center">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-linear-to-br from-sky-400 to-blue-500 rounded-full flex items-center justify-center shadow-2xl">
            <span className="text-6xl">🕊️</span>
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-blue-900 mb-4">
          Baptism
        </h1>
        <p className="text-xl text-blue-700 mb-8 font-light">
          A blessed christening invitation
        </p>
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-blue-200">
          <p className="text-blue-800 italic">
            This template is currently under development. Check back soon for the full experience!
          </p>
        </div>
      </div>
    </div>
  )
}

export default BaptismPage