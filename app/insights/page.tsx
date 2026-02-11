import Link from 'next/link';
import Image from 'next/image';
import { cachedListPosts as listPosts } from '../../lib/cms/contentful';

export const revalidate = 300; // cache page HTML for 5 minutes

export default async function InsightsPage() {
  const posts = await listPosts();

  return (
    <div className="relative w-full overflow-hidden">
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-8 py-4 md:px-12 lg:px-16">
          <Link href="/" className="font-display text-xl font-bold text-foreground">Bogatell</Link>
          <div className="hidden items-center gap-6 md:flex">
            <Link href="/" className="text-muted-foreground hover:text-foreground font-body text-sm">Home</Link>
<Link href="/book" className="rounded-md bg-accent px-4 py-2 font-body text-sm font-semibold text-accent-foreground hover:bg-accent/90">Book a Call</Link>
          </div>
        </div>
      </nav>

      <section className="bg-background py-16 md:py-20">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">Insights</h1>
          <p className="mt-4 max-w-2xl font-body text-lg text-muted-foreground">Expert perspectives on technical due diligence, M&A technology assessment, and software investment strategy.</p>
        </div>
      </section>

      <section className="bg-muted py-16">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          {posts.length === 0 ? (
            <div className="rounded-lg bg-background p-12 text-center">
              <p className="font-body text-muted-foreground">No articles published yet. Check back soon.</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link key={post.id} href={`/insights/${post.slug}`} className="group overflow-hidden rounded-lg bg-background shadow-sm transition-shadow hover:shadow-md">
<div className="relative aspect-video overflow-hidden">
                  <Image
                    src={post.featured_image || '/assets/hero-background.jpg'}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                    <h2 className="font-display text-xl font-semibold text-foreground group-hover:text-accent">{post.title}</h2>
                    {post.excerpt && <p className="mt-2 font-body text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>}
                  </div>
                </Link>
              ))}
            </div>
          )}
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