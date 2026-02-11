import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { format } from "date-fns";
import { Plus, Pencil, Trash2, Eye, LogOut } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  author: string | null;
  published_at: string | null;
  is_published: boolean;
  created_at: string;
}

const AdminInsights = () => {
  const { user, loading, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [author, setAuthor] = useState("Ronan Gallagher");
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/login");
    }
  }, [user, loading, isAdmin, navigate]);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setPosts(data);
    }
    setLoadingPosts(false);
  };

  useEffect(() => {
    if (isAdmin) {
      fetchPosts();
    }
  }, [isAdmin]);

  const resetForm = () => {
    setTitle("");
    setSlug("");
    setExcerpt("");
    setContent("");
    setFeaturedImage("");
    setAuthor("Ronan Gallagher");
    setIsPublished(false);
    setEditingPost(null);
    setShowForm(false);
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!editingPost) {
      setSlug(generateSlug(value));
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setTitle(post.title);
    setSlug(post.slug);
    setExcerpt(post.excerpt || "");
    setContent(post.content);
    setFeaturedImage(post.featured_image || "");
    setAuthor(post.author || "Ronan Gallagher");
    setIsPublished(post.is_published);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!title.trim() || !slug.trim() || !content.trim()) {
      toast.error("Title, slug, and content are required");
      return;
    }

    setSaving(true);

    const postData = {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim() || null,
      content: content.trim(),
      featured_image: featuredImage.trim() || null,
      author: author.trim() || null,
      is_published: isPublished,
      published_at: isPublished ? new Date().toISOString() : null,
    };

    if (editingPost) {
      const { error } = await supabase
        .from("blog_posts")
        .update(postData)
        .eq("id", editingPost.id);

      if (error) {
        toast.error("Failed to update post: " + error.message);
      } else {
        toast.success("Post updated successfully");
        resetForm();
        fetchPosts();
      }
    } else {
      const { error } = await supabase
        .from("blog_posts")
        .insert(postData);

      if (error) {
        toast.error("Failed to create post: " + error.message);
      } else {
        toast.success("Post created successfully");
        resetForm();
        fetchPosts();
      }
    }

    setSaving(false);
  };

  const handleDelete = async (post: BlogPost) => {
    if (!confirm(`Are you sure you want to delete "${post.title}"?`)) return;

    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", post.id);

    if (error) {
      toast.error("Failed to delete post: " + error.message);
    } else {
      toast.success("Post deleted");
      fetchPosts();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="container mx-auto flex items-center justify-between px-8 py-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="font-display text-xl font-bold text-foreground">
              Bogatell
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="font-body text-sm text-muted-foreground">Blog Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/insights"
              className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground"
            >
              <Eye className="h-4 w-4" />
              View Blog
            </Link>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-8 py-8">
        {/* Actions */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold text-foreground">
            Blog Posts
          </h1>
          {!showForm && (
            <Button onClick={() => setShowForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Button>
          )}
        </div>

        {/* Form */}
        {showForm && (
          <div className="mb-8 rounded-lg bg-background p-6 shadow-sm">
            <h2 className="mb-6 font-display text-xl font-semibold text-foreground">
              {editingPost ? "Edit Post" : "New Post"}
            </h2>

            <div className="grid gap-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Post title"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="post-url-slug"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Author name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="featured_image">Featured Image URL</Label>
                  <Input
                    id="featured_image"
                    value={featuredImage}
                    onChange={(e) => setFeaturedImage(e.target.value)}
                    placeholder="https://..."
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief summary of the post..."
                  className="mt-1"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="content">Content * (HTML supported)</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="<p>Your post content here...</p>"
                  className="mt-1 font-mono text-sm"
                  rows={12}
                />
              </div>

              <div className="flex items-center gap-3">
                <Switch
                  id="published"
                  checked={isPublished}
                  onCheckedChange={setIsPublished}
                />
                <Label htmlFor="published">Publish immediately</Label>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : editingPost ? "Update Post" : "Create Post"}
                </Button>
                <Button variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Posts List */}
        {loadingPosts ? (
          <div className="rounded-lg bg-background p-8 text-center">
            <p className="text-muted-foreground">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="rounded-lg bg-background p-8 text-center">
            <p className="text-muted-foreground">No posts yet. Create your first post!</p>
          </div>
        ) : (
          <div className="rounded-lg bg-background shadow-sm">
            <div className="divide-y divide-border">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="truncate font-display font-semibold text-foreground">
                        {post.title}
                      </h3>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${
                          post.is_published
                            ? "bg-accent/20 text-accent"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {post.is_published ? "Published" : "Draft"}
                      </span>
                    </div>
                    <p className="mt-1 font-body text-sm text-muted-foreground">
                      /{post.slug} • Created{" "}
                      {format(new Date(post.created_at), "MMM d, yyyy")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {post.is_published && (
                      <Link
                        to={`/insights/${post.slug}`}
                        className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                    )}
                    <button
                      onClick={() => handleEdit(post)}
                      className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(post)}
                      className="rounded-md p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminInsights;
