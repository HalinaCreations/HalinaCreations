import React from 'react'
import { Metadata } from 'next';
import ModernMinimalist from '@/components/pages/wedding/modern-minimalist/ModernMinimalist';

export const metadata: Metadata = {
  title: 'Modern Minimalist Wedding Template | Halina Creations',
  description: 'A clean and modern minimalist wedding invitation template.',
  openGraph: {
    title: 'Modern Minimalist Wedding Template',
    description: 'A clean and modern minimalist wedding invitation template',
    images: ['/images/halina.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modern Minimalist Wedding Template',
    description: 'A clean and modern minimalist wedding invitation template',
    images: ['/images/halina.png'],
  },
};

const ModernMinimalistPage = () => {
  return (
    <>
    <ModernMinimalist/>
    </>
  )
}

export default ModernMinimalistPage