/* eslint-disable @typescript-eslint/no-explicit-any */
type AnyRecord = Record<string, any>;

export type CMSPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  author: string | null;
  published_at: string | null;
  updated_at: string | null;
};

const BASE = process.env.CMS_BASE_URL || '';
const TOKEN = process.env.CMS_TOKEN || '';
const COLLECTION = process.env.CMS_COLLECTION || 'posts';

function qs(params: AnyRecord) {
  const u = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    u.append(k, String(v));
  });
  return u.toString();
}

async function fetchJSON<T>(path: string, params?: AnyRecord): Promise<T> {
  if (!BASE) throw new Error('CMS_BASE_URL is not set');
  const url = `${BASE.replace(/\/$/, '')}${path}${params ? `?${qs(params)}` : ''}`;
  const res = await fetch(url, {
    headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : undefined,
    // Ensure SSR fetch on server only
    cache: 'no-store',
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error(`CMS request failed: ${res.status}`);
  return res.json() as Promise<T>;
}

function mapPost(doc: AnyRecord): CMSPost {
  // Payload typical field names with fallbacks
  const featured = doc.featuredImage || doc.featured_image || null;
  const publishedAt = doc.publishedAt || doc.published_at || null;
  const updatedAt = doc.updatedAt || doc.updated_at || null;
  return {
    id: String(doc.id || doc._id || doc.uuid || ''),
    title: String(doc.title || ''),
    slug: String(doc.slug || ''),
    excerpt: (doc.excerpt ?? null) as string | null,
    content: String(doc.content || ''),
    featured_image: featured ? String(featured) : null,
    author: doc.author ? String(doc.author) : null,
    published_at: publishedAt ? String(publishedAt) : null,
    updated_at: updatedAt ? String(updatedAt) : null,
  };
}

// List published posts
export async function listPosts(): Promise<CMSPost[]> {
  // Payload REST: /api/{collection}
  const now = new Date().toISOString();
  const where: AnyRecord = {
    'where[slug][exists]': true,
    // Try status=published if present
    'where[status][equals]': 'published',
    // Fallback boolean
    'where[published][equals]': true,
    // Published at <= now (if field exists)
    'where[publishedAt][less_than_equal]': now,
  };
  // Remove constraints with undefined in backend; we send all and rely on CMS to ignore unknown where fields.
  const data = await fetchJSON<AnyRecord>(`/api/${COLLECTION}`, {
    ...where,
    depth: 0,
    sort: '-publishedAt',
    limit: 100,
  });
  const docs: AnyRecord[] = Array.isArray(data.docs) ? data.docs : (Array.isArray(data) ? data : []);
  return docs.map(mapPost);
}

export async function getPostBySlug(slug: string): Promise<CMSPost | null> {
  const data = await fetchJSON<AnyRecord>(`/api/${COLLECTION}`, {
    depth: 0,
    'where[slug][equals]': slug,
    limit: 1,
  });
  const doc = Array.isArray(data.docs) ? data.docs[0] : null;
  return doc ? mapPost(doc) : null;
}