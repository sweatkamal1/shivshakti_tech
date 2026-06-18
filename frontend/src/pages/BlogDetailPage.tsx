import { useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { publicApi, type BlogPost } from "../api/client";
import { DetailPageState } from "../components/DetailPageState";
import { FadeIn } from "../components/motion/FadeIn";
import { Seo } from "../components/Seo";
import { usePublicResource } from "../hooks/usePublicResource";

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
        description={post.metaDescription || post.excerpt}
        path={`/blog/${post.slug}`}
        type="article"
      />
      <FadeIn>
        <Link to="/blog" className="mb-6 inline-block text-sm font-medium text-brand hover:underline">
          ← Back to Blog
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-slate-900">{post.title}</h1>
        <p className="mb-8 text-sm text-slate-500">By {post.author}</p>
        <div className="prose prose-slate max-w-none whitespace-pre-wrap text-slate-700">
          {post.content}
        </div>
      </FadeIn>
    </article>
  );
}
