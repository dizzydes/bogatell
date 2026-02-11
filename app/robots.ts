import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/insights'],
    },
    sitemap: 'https://bogatell.com/sitemap.xml',
  };
}