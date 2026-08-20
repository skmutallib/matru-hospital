import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { POSTS, getPost } from "../data";
import ArticleContent from "./ArticleContent";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found · Mātru" };
  return {
    title: `${post.title} · Mātru Journal`,
    description: post.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: PageProps<"/journal/[slug]">) {
  const { slug } = await params;
  if (!getPost(slug)) notFound();

  return (
    <main className="flex-1">
      <ArticleContent slug={slug} />
    </main>
  );
}
