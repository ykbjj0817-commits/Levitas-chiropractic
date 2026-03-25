import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getAllSlugs, formatDate } from '@/lib/markdown';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllSlugs('blog').map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug('blog', params.slug);
  if (!post) return { title: 'Not Found' };
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug('blog', params.slug);

  if (!post) notFound();

  return (
    <article>
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-sky-600 hover:underline mb-8"
      >
        ← 블로그 목록으로
      </Link>

      {/* Header */}
      <header className="mb-10 pb-8 border-b border-gray-200">
        <p className="text-sm text-gray-400 mb-3">
          {formatDate(post.frontmatter.date)}
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
          {post.frontmatter.title}
        </h1>
        {post.frontmatter.description && (
          <p className="mt-4 text-lg text-gray-500">
            {post.frontmatter.description}
          </p>
        )}
        {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-sky-50 text-sky-600 px-2.5 py-1 rounded-full border border-sky-200"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Markdown content */}
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      {/* Footer navigation */}
      <div className="mt-16 pt-8 border-t border-gray-200">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-sky-600 hover:underline"
        >
          ← 블로그 목록으로 돌아가기
        </Link>
      </div>
    </article>
  );
}
