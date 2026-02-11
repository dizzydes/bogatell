/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from 'contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import type { Document } from '@contentful/rich-text-types';
import { unstable_cache } from 'next/cache';

export type CMSPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string; // HTML
  featured_image: string | null;
  author: string | null;
  published_at: string | null;
  updated_at: string | null;
};

const SPACE = process.env.CONTENTFUL_SPACE_ID as string;
const ENVIRONMENT = (process.env.CONTENTFUL_ENVIRONMENT as string) || 'master';
const TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN as string;
const CONTENT_TYPE = (process.env.CONTENTFUL_CONTENT_TYPE_ID as string) || 'blogPost';

function assertEnv(name: string, value?: string) {
  if (!value) throw new Error(`${name} is not set`);
}

assertEnv('CONTENTFUL_SPACE_ID', SPACE);
assertEnv('CONTENTFUL_ACCESS_TOKEN', TOKEN);

const client = createClient({
  space: SPACE,
  environment: ENVIRONMENT,
  accessToken: TOKEN,
});

function assetUrl(asset: any): string | null {
  try {
    const url = asset?.fields?.file?.url;
    if (!url) return null;
    return url.startsWith('http') ? url : `https:${url}`;
  } catch {
    return null;
  }
}

function toHtml(body: any): string {
  if (!body) return '';
  if (typeof body === 'string') return body;
  if ((body as Document).nodeType === 'document') {
    return documentToHtmlString(body as Document);
  }
  return '';
}

function mapPost(entry: any): CMSPost {
  const f = entry.fields || {};
  // Prefer 'image' from Contentful model, then fall back to common aliases
  const featured = f.image || f.featuredImage || f.featured_image || null;
  const publishedAt = f.publishedAt || f.published_at || null;
  const updatedAt = f.updatedAt || f.updated_at || null;
  const content = f.content ?? f.body ?? null;
  return {
    id: String(entry.sys?.id || ''),
    title: String(f.title || ''),
    slug: String(f.slug || entry.sys?.id || ''),
    excerpt: (f.excerpt ?? null) as string | null,
    content: toHtml(content),
    featured_image: featured ? assetUrl(featured) : null,
    author: f.author ? String(f.author) : null,
    published_at: publishedAt ? String(publishedAt) : null,
    updated_at: updatedAt ? String(updatedAt) : null,
  };
}

export async function listPosts(): Promise<CMSPost[]> {
  const res = await client.getEntries({
    content_type: CONTENT_TYPE,
    order: ['-fields.publishedAt', '-sys.createdAt'],
    limit: 100,
  });
  return res.items.map(mapPost);
}

export async function getPostBySlug(slug: string): Promise<CMSPost | null> {
  const res = await client.getEntries({
    content_type: CONTENT_TYPE,
    'fields.slug': slug,
    limit: 1,
  });
  if (res.items[0]) return mapPost(res.items[0]);
  // Fallback: if slug looks like an entry ID, try getEntry
  try {
    const byId = await client.getEntry(slug);
    if (byId) return mapPost(byId);
  } catch { void 0; }
  return null;
}

// Server-side cache (ISR-like) for faster loads
export const cachedListPosts = unstable_cache(
  async () => listPosts(),
  ['contentful:listPosts', CONTENT_TYPE],
  { revalidate: 300 }
);

export const cachedGetPostBySlug = unstable_cache(
  async (slug: string) => getPostBySlug(slug),
  ['contentful:getPostBySlug', CONTENT_TYPE],
  { revalidate: 300 }
);
