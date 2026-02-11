import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  author: string | null;
  published_at: string | null;
}

const navItems = [
  { label: "Home", href: "/" },
  { label: "What You Get", href: "/#what-you-get" },
  { label: "Process", href: "/#process" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Book a Call", href: "/book" },
];

const Insights = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, featured_image, author, published_at")
        .eq("is_published", true)
        .lte("published_at", new Date().toISOString())
        .order("published_at", { ascending: false });

      if (!error && data) {
        setPosts(data);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-8 py-4 md:px-12 lg:px-16">
          <Link to="/" className="font-display text-xl font-bold text-foreground">
            Bogatell
          </Link>
          <div className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`font-body text-sm transition-colors ${
                  item.label === "Book a Call"
                    ? "rounded-md bg-accent px-4 py-2 font-semibold text-accent-foreground hover:bg-accent/90"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Link
to="/book"
            className="rounded-md bg-accent px-4 py-2 font-body text-sm font-semibold text-accent-foreground hover:bg-accent/90 md:hidden"
          >
            Book a Call
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-background py-16 md:py-20">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">
            Insights
          </h1>
          <p className="mt-4 max-w-2xl font-body text-lg text-muted-foreground">
            Expert perspectives on technical due diligence, M&A technology assessment, and software investment strategy.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          {loading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse rounded-lg bg-background p-6">
                  <div className="mb-4 h-48 rounded-md bg-border" />
                  <div className="mb-2 h-6 w-3/4 rounded bg-border" />
                  <div className="h-4 w-full rounded bg-border" />
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="rounded-lg bg-background p-12 text-center">
              <p className="font-body text-muted-foreground">
                No articles published yet. Check back soon for insights on technical due diligence.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/insights/${post.slug}`}
                  className="group overflow-hidden rounded-lg bg-background shadow-sm transition-shadow hover:shadow-md"
                >
                  {post.featured_image && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="font-display text-xl font-semibold text-foreground group-hover:text-accent">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="mt-2 font-body text-sm text-muted-foreground line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="mt-4 flex items-center gap-2 font-body text-xs text-muted-foreground">
                      {post.author && <span>{post.author}</span>}
                      {post.author && post.published_at && <span>•</span>}
                      {post.published_at && (
                        <span>{format(new Date(post.published_at), "MMM d, yyyy")}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background py-8">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="border-t border-border pt-8">
            <p className="font-body text-sm text-muted-foreground">
              Carrer de Ramon Turró, 109, Sant Martí, 08005 Barcelona, Spain
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Insights;
