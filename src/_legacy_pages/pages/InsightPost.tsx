import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

import { ArrowLeft } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  author: string | null;
  published_at: string | null;
}

const navItems = [
  { label: "Home", href: "/" },
  { label: "Insights", href: "/insights" },
  { label: "Book a Call", href: "/book" },
];

const InsightPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .lte("published_at", new Date().toISOString())
        .maybeSingle();

      if (error || !data) {
        setNotFound(true);
      } else {
        setPost(data);
      }
      setLoading(false);
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <h1 className="font-display text-2xl font-bold text-foreground">Article Not Found</h1>
        <p className="mt-2 font-body text-muted-foreground">
          The article you're looking for doesn't exist or has been unpublished.
        </p>
        <Link
          to="/insights"
          className="mt-6 rounded-md bg-accent px-6 py-3 font-body font-semibold text-accent-foreground hover:bg-accent/90"
        >
          Back to Insights
        </Link>
      </div>
    );
  }

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

      {/* Back Link */}
      <div className="bg-background">
        <div className="container mx-auto px-8 pt-8 md:px-12 lg:px-16">
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Insights
          </Link>
        </div>
      </div>

      {/* Article */}
      <article className="bg-background py-12 md:py-16">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="mx-auto max-w-3xl">
            {/* Header */}
            <header className="mb-8">
              <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                {post.title}
              </h1>
              <div className="mt-4 flex items-center gap-3 font-body text-sm text-muted-foreground">
                {post.author && <span>{post.author}</span>}
                {post.author && post.published_at && <span>•</span>}
                {post.published_at && (
                  <span>{format(new Date(post.published_at), "MMMM d, yyyy")}</span>
                )}
              </div>
            </header>

            {/* Featured Image */}
            {post.featured_image && (
              <div className="mb-8 overflow-hidden rounded-lg">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div 
              className="prose prose-lg max-w-none font-body text-foreground prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-accent prose-strong:text-foreground prose-li:text-muted-foreground prose-img:rounded-lg"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="border-t border-border bg-muted py-12">
        <div className="container mx-auto px-8 text-center md:px-12 lg:px-16">
          <h2 className="font-display text-2xl font-semibold text-foreground">
            Technical Due Diligence for Buyers & Sellers
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-muted-foreground">
            We help buyers assess technology risks before acquisition and sellers maximize value through technical preparation.
          </p>
          <Link
            to="/#pricing"
            className="mt-6 inline-block rounded-md bg-accent px-6 py-3 font-body font-semibold text-accent-foreground hover:bg-accent/90"
          >
            View Our Services
          </Link>
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

export default InsightPost;
