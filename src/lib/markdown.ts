import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');

export interface PostFrontmatter {
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  youtube_link?: string;
  thumbnail?: string;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
}

export interface PostWithHtml extends Post {
  contentHtml: string;
}

/** Read all .md files from a given subfolder (e.g. 'blog' or 'youtube') */
export function getAllPosts(section: 'blog' | 'youtube'): Post[] {
  const dir = path.join(contentDirectory, section);

  if (!fs.existsSync(dir)) return [];

  const fileNames = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'));

  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const filePath = path.join(dir, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      frontmatter: data as PostFrontmatter,
      content,
    };
  });

  // Sort by date descending (newest first)
  return posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date).getTime();
    const dateB = new Date(b.frontmatter.date).getTime();
    return dateB - dateA;
  });
}

/** Read a single post by slug and section, returns HTML content */
export async function getPostBySlug(
  section: 'blog' | 'youtube',
  slug: string
): Promise<PostWithHtml | null> {
  const filePath = path.join(contentDirectory, section, `${slug}.md`);

  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    frontmatter: data as PostFrontmatter,
    content,
    contentHtml,
  };
}

/** Get all slugs for a section (used for generateStaticParams) */
export function getAllSlugs(section: 'blog' | 'youtube'): string[] {
  const dir = path.join(contentDirectory, section);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

/** Format a date string nicely */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
