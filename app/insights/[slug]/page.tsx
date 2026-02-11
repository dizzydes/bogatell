import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { cachedGetPostBySlug as getPostBySlug, cachedListPosts as listPosts } from '../../../lib/cms/contentful';

export const revalidate = 300;

export async function generateStaticParams() {
  const posts = await listPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Not found' };
  const ogImage = post.featured_image || '/assets/hero-background.jpg';
  return {
    title: `${post.title} | Bogatell`,
    description: post.excerpt || undefined,
    alternates: { canonical: `https://bogatell.com/insights/${slug}` },
    openGraph: { images: [ogImage] },
  };
}

export default async function InsightPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <h1 className="font-display text-2xl font-bold text-foreground">Article Not Found</h1>
        <p className="mt-2 font-body text-muted-foreground">The article you're looking for doesn't exist or has been unpublished.</p>
        <Link href="/insights" className="mt-6 rounded-md bg-accent px-6 py-3 font-body font-semibold text-accent-foreground hover:bg-accent/90">Back to Insights</Link>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden">
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-8 py-4 md:px-12 lg:px-16">
          <Link href="/" className="font-display text-xl font-bold text-foreground">Bogatell</Link>
          <div className="hidden items-center gap-6 md:flex">
            <Link href="/insights" className="text-muted-foreground hover:text-foreground font-body text-sm">Insights</Link>
<Link href="/book" className="rounded-md bg-accent px-4 py-2 font-body text-sm font-semibold text-accent-foreground hover:bg-accent/90">Book a Call</Link>
          </div>
        </div>
      </nav>

      {/* Constrained hero: full width on mobile, centered and narrower on larger screens */}
      <div className="bg-background py-4">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="mx-auto w-full md:w-2/3 lg:w-1/2">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-muted">
              <Image
                src={post.featured_image || '/assets/hero-background.jpg'}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <article className="bg-background py-8 md:py-12">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="mx-auto max-w-3xl">
            <header className="mb-6">
              <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">{post.title}</h1>
              <Script id="ld-json" type="application/ld+json" strategy="afterInteractive">
                {JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'BlogPosting',
                  headline: post.title,
                  description: post.excerpt || undefined,
                  image: post.featured_image || undefined,
                  datePublished: post.published_at || undefined,
                  dateModified: post.updated_at || post.published_at || undefined,
                  author: post.author ? { '@type': 'Person', name: post.author } : undefined,
                  mainEntityOfPage: `https://bogatell.com/insights/${post.slug}`,
                })}
              </Script>
            </header>
            <div className="prose prose-lg max-w-none font-body text-foreground prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-accent prose-strong:text-foreground prose-li:text-muted-foreground prose-img:rounded-lg" dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </div>
      </article>

      <section className="border-t border-border bg-muted py-12">
        <div className="container mx-auto px-8 text-center md:px-12 lg:px-16">
          <h2 className="font-display text-2xl font-semibold text-foreground">Technical Due Diligence for Buyers & Sellers</h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-muted-foreground">We help buyers assess technology risks before acquisition and sellers maximize value through technical preparation.</p>
          <Link href="/#pricing" className="mt-6 inline-block rounded-md bg-accent px-6 py-3 font-body font-semibold text-accent-foreground hover:bg-accent/90">View Our Services</Link>
        </div>
      </section>

      <footer className="bg-background py-8">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="border-t border-border pt-8">
            <p className="font-body text-sm text-muted-foreground">Carrer de Ramon Turró, 109, Sant Martí, 08005 Barcelona, Spain</p>
          </div>
        </div>
      </footer>
    </div>
  );
}