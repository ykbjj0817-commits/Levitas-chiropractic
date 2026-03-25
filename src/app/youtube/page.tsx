import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts, formatDate } from '@/lib/markdown';

export const metadata: Metadata = {
  title: 'YouTube',
  description: 'Levitas Chiropractic YouTube – 카이로프랙틱 영상 콘텐츠 모음',
};

function getYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === 'youtu.be') return u.pathname.slice(1);
    return u.searchParams.get('v');
  } catch {
    return null;
  }
}

export default function YoutubePage() {
  const posts = getAllPosts('youtube');

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">YouTube</h1>
        <p className="text-gray-500">
          Levitas 카이로프랙틱 유튜브 채널의 영상 콘텐츠를 한눈에 확인하세요.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">아직 등록된 영상이 없습니다.</p>
          <p className="text-sm mt-2">
            <code className="bg-gray-100 px-2 py-1 rounded">
              content/youtube/
            </code>
            에 .md 파일을 추가하면 자동으로 표시됩니다.
          </p>
        </div>
      ) : (
        <ul className="space-y-6">
          {posts.map((post) => {
            const videoId = post.frontmatter.youtube_link
              ? getYouTubeId(post.frontmatter.youtube_link)
              : null;
            return (
              <li key={post.slug}>
                <Link
                  href={`/youtube/${post.slug}`}
                  className="flex gap-5 p-5 border border-gray-200 rounded-xl hover:shadow-md hover:border-red-300 transition-all group"
                >
                  {/* Thumbnail */}
                  {videoId ? (
                    <div className="flex-shrink-0 w-36 h-20 rounded-lg overflow-hidden bg-gray-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                        alt={post.frontmatter.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex-shrink-0 w-36 h-20 rounded-lg bg-red-50 flex items-center justify-center text-3xl">
                      🎬
                    </div>
                  )}

                  {/* Info */}
                  <div className="flex-1">
                    <p className="text-xs text-gray-400 mb-1">
                      {formatDate(post.frontmatter.date)}
                    </p>
                    <h2 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors leading-snug">
                      {post.frontmatter.title}
                    </h2>
                    {post.frontmatter.description && (
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                        {post.frontmatter.description}
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
