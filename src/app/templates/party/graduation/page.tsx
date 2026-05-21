import React from 'react'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Graduation Party Template | Halina Creations',
  description: 'Celebrate academic achievements with this graduation party invitation template.',
  openGraph: {
    title: 'Graduation Party Template',
    description: 'Celebrate academic achievements with this graduation party invitation template',
    images: ['/images/halina.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Graduation Party Template',
    description: 'Celebrate academic achievements with this graduation party invitation template',
    images: ['/images/halina.png'],
  },
};

const GraduationPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-6">
      <div className="max-w-2xl text-center">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-linear-to-br from-blue-600 to-purple-700 rounded-full flex items-center justify-center shadow-2xl">
            <span className="text-6xl">🎓</span>
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-blue-900 mb-4">
          Graduation
        </h1>
        <p className="text-xl text-blue-700 mb-8 font-light">
          Celebrating academic achievement
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

export default GraduationPage