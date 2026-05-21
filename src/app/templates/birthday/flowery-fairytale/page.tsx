import { Metadata } from 'next';
import FloweryFairytale from '@/components/pages/birthday/flowery-fairytale/FloweryFairytale';

export const metadata: Metadata = {
  title: 'Flowery Fairytale Birthday Template | Halina Creations',
  description: 'A magical floral fairytale-themed birthday invitation with countdown, story, program, and RSVP.',
  openGraph: {
    title: 'Flowery Fairytale Birthday Template',
    description: 'A magical floral fairytale-themed birthday invitation.',
    images: ['/images/flowery-fairytale/image-2.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flowery Fairytale Birthday Template',
    description: 'A magical floral fairytale-themed birthday invitation.',
    images: ['/images/flowery-fairytale/image-2.jpg'],
  },
};

export default function FloweryFairytalePage() {
  return <FloweryFairytale />;
}