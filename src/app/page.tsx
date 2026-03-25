import Link from 'next/link';
import { getAllPosts, formatDate } from '@/lib/markdown';

export default function HomePage() {
  const recentBlog = getAllPosts('blog').slice(0, 3);
  const recentYoutube = getAllPosts('youtube').slice(0, 3);

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Levitas Chiropractic
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          DNS & ART 전문 카이로프랙틱 클리닉 — 당신의 건강한 삶을 함께 만들어
          갑니다.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link
            href="/blog"
            className="px-6 py-2.5 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors font-medium"
          >
            Blog 읽기
          </Link>
          <Link
            href="/youtube"
            className="px-6 py-2.5 border border-sky-600 text-sky-600 rounded-lg hover:bg-sky-50 transition-colors font-medium"
          >
            YouTube 보기
          </Link>
        </div>
      </section>

      {/* Recent Blog Posts */}
      {recentBlog.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">최신 블로그</h2>
            <Link href="/blog" className="text-sm text-sky-600 hover:underline">
              전체 보기 →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentBlog.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block p-5 border border-gray-200 rounded-xl hover:shadow-md hover:border-sky-300 transition-all"
              >
                <p className="text-xs text-gray-400 mb-2">
                  {formatDate(post.frontmatter.date)}
                </p>
                <h3 className="font-semibold text-gray-800 leading-snug">
                  {post.frontmatter.title}
                </h3>
                {post.frontmatter.description && (
                  <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                    {post.frontmatter.description}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Recent YouTube */}
      {recentYoutube.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              최신 YouTube
            </h2>
            <Link
              href="/youtube"
              className="text-sm text-sky-600 hover:underline"
            >
              전체 보기 →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentYoutube.map((post) => (
              <Link
                key={post.slug}
                href={`/youtube/${post.slug}`}
                className="block p-5 border border-gray-200 rounded-xl hover:shadow-md hover:border-red-300 transition-all"
              >
                <p className="text-xs text-gray-400 mb-2">
                  {formatDate(post.frontmatter.date)}
                </p>
                <h3 className="font-semibold text-gray-800 leading-snug">
                  🎬 {post.frontmatter.title}
                </h3>
                {post.frontmatter.description && (
                  <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                    {post.frontmatter.description}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {recentBlog.length === 0 && recentYoutube.length === 0 && (
        <p className="text-center text-gray-400">
          아직 게시된 콘텐츠가 없습니다. content/blog 또는 content/youtube에 .md
          파일을 추가하세요.
        </p>
      )}
    </div>
  );
}
