import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { publicApi, type BlogPost } from "../api/client";
import { FadeIn, PageHero } from "../components/motion/FadeIn";
import { Seo } from "../components/Seo";

export function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    publicApi.blog()
      .then((r) => setPosts(r.data ?? []))
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load blog"));
  }, []);

  return (
    <>
      <Seo
        title="Blog & Insights"
        description="IT trends, web development tips & digital transformation guides from ShivShakti Technology, Bhagalpur."
        path="/blog"
      />
      <PageHero title="Insights & Blog" subtitle="Technology trends, tips, and company updates" />
      <div className="mx-auto max-w-7xl px-4 pb-20">
        {error && <p className="mb-4 text-center text-red-400">{error}</p>}
        {posts.length === 0 && !error ? (
          <p className="text-center text-slate-500">No articles yet. Check back soon!</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((p, i) => (
              <FadeIn key={p.id} delay={i}>
                <Link to={`/blog/${p.slug}`} className="card group block hover:border-[#0052cc]/40">
                  {p.coverImage && (
                    <img src={p.coverImage} alt={p.title} className="mb-4 h-48 w-full rounded-lg object-cover" />
                  )}
                  <h2 className="mb-2 text-xl font-semibold text-slate-900 group-hover:text-[#0052cc]">{p.title}</h2>
                  <p className="mb-3 text-sm text-slate-600">{p.excerpt}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Calendar size={12} />
                    {p.publishedAt ? new Date(p.publishedAt).toLocaleDateString() : "Recent"}
                    <span>· {p.author}</span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
