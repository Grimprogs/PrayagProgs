import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPropertyBySlug, getAllProperties } from '@/data/properties';
import PropertyDetailClient from './PropertyDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const properties = getAllProperties();
  return properties.map((prop) => ({
    slug: prop.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    return {
      title: 'Vastu-Verified Property | PragyaaProp.com',
      description: 'Discover certified Vastu-compliant luxury homes across India with 16-zone precision audits.',
    };
  }

  return {
    title: `${property.title} - ${property.bhk} in ${property.location} | PragyaaProp`,
    description: `${property.title}: 100% Vastu-Verified luxury ${property.bhk} in ${property.location}. Vastu score: ${property.vastuScore}/10 (${property.vastuStatus}). Verified RERA ID: ${property.reraId}.`,
    openGraph: {
      title: `${property.title} - ${property.bhk} | PragyaaProp Vastu Certified`,
      description: `Explore certified 16-zone spatial energy audit for ${property.title} in ${property.location}. Price: ${property.price}.`,
      images: [property.heroImage],
    },
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  // JSON-LD Structured Data for this specific property if present on server
  const propertyJsonLd = property
    ? {
        '@context': 'https://schema.org',
        '@type': 'SingleFamilyResidence',
        name: property.title,
        description: property.overview,
        image: property.heroImage,
        address: {
          '@type': 'PostalAddress',
          addressLocality: property.city,
          addressRegion: property.state,
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '19.1136',
          longitude: '72.8697',
        },
        numberOfRooms: property.bhkNum,
        floorSize: {
          '@type': 'QuantitativeValue',
          value: property.sqft,
        },
        offers: {
          '@type': 'Offer',
          price: property.priceNumeric,
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
        },
      }
    : null;

  return (
    <>
      {propertyJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(propertyJsonLd) }}
        />
      )}
      <PropertyDetailClient slug={slug} property={property} />
    </>
  );
}
