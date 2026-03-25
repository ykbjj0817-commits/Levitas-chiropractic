import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts, formatDate } from '@/lib/markdown';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Levitas Chiropractic 블로그 – 카이로프랙틱, DNS, ART에 관한 건강 정보',
};

export default function BlogPage() {
  const posts = getAllPosts('blog');

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog</h1>
        <p className="text-gray-500">
          카이로프랙틱, 척추 건강, DNS & ART 치료에 관한 전문 정보를 전달합니다.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">아직 게시글이 없습니다.</p>
          <p className="text-sm mt-2">
            <code className="bg-gray-100 px-2 py-1 rounded">content/blog/</code>
            에 .md 파일을 추가하면 자동으로 표시됩니다.
          </p>
        </div>
      ) : (
        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="block p-6 border border-gray-200 rounded-xl hover:shadow-md hover:border-sky-300 transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-xs text-gray-400 mb-1">
                      {formatDate(post.frontmatter.date)}
                    </p>
                    <h2 className="text-xl font-semibold text-gray-900 group-hover:text-sky-700 transition-colors leading-snug">
                      {post.frontmatter.title}
                    </h2>
                    {post.frontmatter.description && (
                      <p className="mt-2 text-gray-500 line-clamp-2">
                        {post.frontmatter.description}
                      </p>
                    )}
                    {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {post.frontmatter.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-sky-50 text-sky-600 px-2 py-0.5 rounded-full border border-sky-200"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-sky-400 group-hover:text-sky-600 text-lg">
                    →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
