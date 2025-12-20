import { client } from "@/sanity/lib/client";
import { postBySlugQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import ProjectContent from "@/components/ProjectContent";
import { ArrowLeft, FileText, ExternalLink } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await client.fetch(postBySlugQuery, { slug });

    if (!post) {
        notFound();
    }

    return (
        <article className="max-w-7xl mx-auto px-6 py-12 pb-20">
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

            {post.body && <ProjectContent content={post.body} />}

            {post.reports && post.reports.length > 0 && (
                <section className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">Attachments</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {post.reports.map((report: any, idx: number) => (
                            <a
                                key={idx}
                                href={report.file.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <FileText size={20} className="text-blue-600" />
                                    <span className="font-medium">{report.title}</span>
                                </div>
                                <ExternalLink size={18} className="text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300" />
                            </a>
                        ))}
                    </div>
                </section>
            )}
        </article>
    );
}
