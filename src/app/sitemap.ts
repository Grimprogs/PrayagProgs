import { MetadataRoute } from 'next';
import { getAllProperties } from '@/data/properties';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pragyaaprop.com';
  const properties = getAllProperties();

  const propertyUrls = properties.map((prop) => ({
    url: `${baseUrl}/properties/${prop.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/properties`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...propertyUrls,
  ];
}
