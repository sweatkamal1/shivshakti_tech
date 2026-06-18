import { useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { publicApi, type BlogPost } from "../api/client";
import { DetailPageState } from "../components/DetailPageState";
import { FadeIn } from "../components/motion/FadeIn";
import { Seo } from "../components/Seo";
import { usePublicResource } from "../hooks/usePublicResource";
import { blogPostingSchema } from "../lib/structured-data";
import { DEFAULT_OG_IMAGE } from "../lib/seo-config";

const relatedLinks = [
  { label: "Web Development Services", href: "/services/web-development" },
  { label: "Mobile App Development", href: "/services/mobile-app-development" },
  { label: "CRM Development", href: "/services/crm-development" },
  { label: "All Services", href: "/services" },
  { label: "Contact Us", href: "/contact" },
];

export function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const load = useCallback((s: string) => publicApi.blogPost(s), []);
  const { data: post, loading, notFound } = usePublicResource<BlogPost>(slug, load);

  if (loading) {
    return <DetailPageState loading notFound={false} backTo="/blog" backLabel="Back to Blog" />;
  }
  if (notFound || !post) {
    return <DetailPageState loading={false} notFound backTo="/blog" backLabel="Back to Blog" />;
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <Seo
        title={post.metaTitle || post.title}
        description={(post.metaDescription || post.excerpt).slice(0, 160)}
        path={`/blog/${post.slug}`}
        type="article"
        image={post.coverImage || DEFAULT_OG_IMAGE}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
        jsonLd={blogPostingSchema(post)}
      />
      <FadeIn>
        <Link to="/blog" className="mb-6 inline-block text-sm font-medium text-brand hover:underline">
          ← Back to Blog
        </Link>
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            loading="lazy"
            decoding="async"
            className="mb-8 h-64 w-full rounded-xl object-cover"
          />
        )}
        <h1 className="mb-4 text-4xl font-bold text-slate-900">{post.title}</h1>
        <p className="mb-8 text-sm text-slate-500">
          By {post.author}
          {post.publishedAt && ` · ${new Date(post.publishedAt).toLocaleDateString()}`}
        </p>
        <div className="prose prose-slate max-w-none whitespace-pre-wrap text-slate-700">
          {post.content}
        </div>
        <aside className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="mb-4 text-lg font-bold text-slate-900">Related Services</h2>
          <ul className="flex flex-wrap gap-3">
            {relatedLinks.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className="text-sm font-medium text-brand hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </FadeIn>
    </article>
  );
}
