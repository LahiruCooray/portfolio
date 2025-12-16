import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { ArrowUpRight, Calendar } from "lucide-react";

interface BlogCardProps {
    post: {
        title: string;
        slug: { current: string };
        publishedAt: string;
        mainImage?: any;
        categories?: string[];
    };
}

export default function BlogCard({ post }: BlogCardProps) {
    return (
        <Link href={`/blog/${post.slug.current}`} className="group block h-full">
            <article className="flex flex-col h-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-lg hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors duration-300">

                <div className="flex justify-between items-start mb-4">
                    {post.categories && post.categories.length > 0 && (
                        <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                            {post.categories[0]}
                        </span>
                    )}
                    <span className="text-xs text-zinc-400 font-mono">
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                        })}
                    </span>
                </div>

                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2 leading-snug">
                    {post.title}
                </h3>

                <div className="mt-auto pt-4 flex items-center text-sm font-medium text-blue-600 dark:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                    Read Article <ArrowUpRight size={16} className="ml-1" />
                </div>
            </article>
        </Link>
    );
}
