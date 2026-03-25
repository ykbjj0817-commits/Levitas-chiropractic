import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getAllSlugs, formatDate } from '@/lib/markdown';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllSlugs('youtube').map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug('youtube', params.slug);
  if (!post) return { title: 'Not Found' };
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
  };
}

function getYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === 'youtu.be') return u.pathname.slice(1);
    return u.searchParams.get('v');
  } catch {
    return null;
  }
}

export default async function YoutubePostPage({ params }: Props) {
  const post = await getPostBySlug('youtube', params.slug);

  if (!post) notFound();

  const videoId = post.frontmatter.youtube_link
    ? getYouTubeId(post.frontmatter.youtube_link)
    : null;

  return (
    <article>
      {/* Back link */}
      <Link
        href="/youtube"
        className="inline-flex items-center gap-1 text-sm text-red-500 hover:underline mb-8"
      >
        ← YouTube 목록으로
      </Link>

      {/* Header */}
      <header className="mb-8 pb-8 border-b border-gray-200">
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
      </header>

      {/* Embedded YouTube player */}
      {videoId && (
        <div className="mb-10 rounded-xl overflow-hidden shadow-md aspect-video">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={post.frontmatter.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {/* Markdown content (description / notes) */}
      {post.contentHtml && (
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      )}

      {/* Watch on YouTube button */}
      {post.frontmatter.youtube_link && (
        <div className="mt-10">
          <a
            href={post.frontmatter.youtube_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            YouTube에서 보기
          </a>
        </div>
      )}

      {/* Footer navigation */}
      <div className="mt-16 pt-8 border-t border-gray-200">
        <Link
          href="/youtube"
          className="inline-flex items-center gap-1 text-sm text-red-500 hover:underline"
        >
          ← YouTube 목록으로 돌아가기
        </Link>
      </div>
    </article>
  );
}
