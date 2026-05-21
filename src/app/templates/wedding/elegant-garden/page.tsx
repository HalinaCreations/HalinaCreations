import { Metadata } from 'next';
import ElegantGarden from '@/components/pages/wedding/elegant-garden/ElegantGarden';

export const metadata: Metadata = {
  title: 'Elegant Garden Wedding Template | Halina Creations',
  description: 'A beautiful garden-themed wedding invitation template with countdown, RSVP, and interactive features.',
  openGraph: {
    title: 'Elegant Garden Wedding Template',
    description: 'A beautiful garden-themed wedding invitation template',
    images: ['/images/elegant-garden/image-2.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elegant Garden Wedding Template',
    description: 'A beautiful garden-themed wedding invitation template',
    images: ['/images/elegant-garden/image-2.jpg'],
  },
};

export default function ElegantGardenPage() {
  return (
    <main>
      <ElegantGarden />
    </main>
  );
}