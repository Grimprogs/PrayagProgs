import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '@/context/ToastContext';
import { CreditsProvider } from '@/context/CreditsContext';
import { PropertiesProvider } from '@/context/PropertiesContext';

export const metadata: Metadata = {
  metadataBase: new URL('https://pragyaaprop.com'),
  title: {
    default: 'PragyaaProp.com® - Vastu-Verified Luxury Real Estate',
    template: '%s | PragyaaProp.com®'
  },
  description: 'Discover 100% Vastu-certified luxury homes across India, assessed with precision 16-zone spatial energy audits and verified RERA compliance.',
  keywords: [
    'Vastu verified real estate',
    'Vedic architecture homes',
    '16-Zone Vastu audit',
    'Vastu luxury apartments Mumbai',
    'RERA approved vastu properties',
    'PragyaaProp',
    'Vastu Purusha Mandala',
    'North entrance homes'
  ],
  authors: [{ name: 'PragyaaProp Council' }],
  creator: 'PragyaaProp.com',
  publisher: 'PragyaaProp.com',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'PragyaaProp.com® - Vastu-Verified Luxury Real Estate',
    description: 'Find a Home that Feels Auspiciously Right. 100% Vastu-certified luxury homes across India with 16-zone precision audits.',
    url: 'https://pragyaaprop.com',
    siteName: 'PragyaaProp.com',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PragyaaProp.com® - Vastu-Verified Luxury Real Estate',
    description: 'Find a Home that Feels Auspiciously Right. 100% Vastu-certified luxury homes with 16-zone energy audits.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'PragyaaProp.com',
    image: 'https://pragyaaprop.com/logo.png',
    description: 'India\'s premier 16-zone Vastu-verified and RERA compliant luxury real estate portal.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mumbai',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '19.1136',
      longitude: '72.8697',
    },
    url: 'https://pragyaaprop.com',
    telephone: '+919820016800',
    priceRange: '₹₹₹₹',
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,800;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#fbf9f5] text-[#1b1c1a] antialiased font-sans min-h-screen flex flex-col selection:bg-[#ffdea7] selection:text-[#5d2809]">
        <ToastProvider>
          <CreditsProvider>
            <PropertiesProvider>{children}</PropertiesProvider>
          </CreditsProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
