import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Levitas Chiropractic',
    template: '%s | Levitas Chiropractic',
  },
  description:
    'Levitas Chiropractic – DNS & ART 전문 카이로프랙틱 클리닉. 블로그와 유튜브 콘텐츠로 건강 정보를 전달합니다.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col bg-white">
        {/* ── Navigation ── */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-sky-700">
                Levitas
              </span>
              <span className="text-sm text-gray-500 hidden sm:inline">
                Chiropractic
              </span>
            </Link>
            <nav className="flex items-center gap-6 text-sm font-medium">
              <Link
                href="/blog"
                className="text-gray-600 hover:text-sky-700 transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/youtube"
                className="text-gray-600 hover:text-sky-700 transition-colors"
              >
                YouTube
              </Link>
            </nav>
          </div>
        </header>

        {/* ── Page content ── */}
        <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-10">
          {children}
        </main>

        {/* ── Footer ── */}
        <footer className="bg-gray-50 border-t border-gray-200 mt-10">
          <div className="max-w-4xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Levitas Chiropractic. All rights
            reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
