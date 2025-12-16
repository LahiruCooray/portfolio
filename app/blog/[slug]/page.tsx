import { client } from "@/sanity/lib/client";
import { postBySlugQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = await client.fetch(postBySlugQuery, { slug: params.slug });

    if (!post) {
        notFound();
    }

    return (
        <article className="max-w-3xl mx-auto px-6 py-12 pb-20">
            <Link href="/blog" className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 mb-8 transition-colors">
                <ArrowLeft size={16} className="mr-2" /> Back to writing
            </Link>

            <header className="space-y-6 mb-12">
                <div className="flex flex-wrap gap-2 text-sm text-blue-600 dark:text-blue-400 font-medium">
                    {post.categories?.map((cat: string) => (
                        <span key={cat}>#{cat}</span>
                    ))}
                </div>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight">{post.title}</h1>

                <div className="flex items-center gap-4 text-zinc-500 text-sm">
                    <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </time>
                    {/* Add active reading time calculation if desired, else basic metadata */}
                </div>

                {post.mainImage && (
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 mt-8">
                        <Image
                            src={urlFor(post.mainImage).url()}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}
            </header>

            <div className="prose prose-lg prose-zinc dark:prose-invert max-w-none">
                {post.body && <PortableText value={post.body} />}
            </div>
        </article>
    );
}
