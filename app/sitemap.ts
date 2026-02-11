import type { MetadataRoute } from 'next';
import { listPosts } from '../lib/cms/contentful';

// Generate dynamically and allow frequent refreshes
export const dynamic = 'force-dynamic';
export const revalidate = 300; // cache for 5 minutes

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://bogatell.com';
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/insights`, changeFrequency: 'daily', priority: 0.8 },
  ];
  const postsData = await listPosts();
  const posts: MetadataRoute.Sitemap = postsData.map((p) => ({
    url: `${baseUrl}/insights/${p.slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
    lastModified: p.updated_at ? new Date(p.updated_at) : undefined,
  }));
  return [...staticPages, ...posts];
}
