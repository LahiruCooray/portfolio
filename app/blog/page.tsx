import { client } from "@/sanity/lib/client";
import { postsQuery } from "@/sanity/lib/queries";
import BlogCard from "@/components/BlogCard";

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function BlogPage() {
    const posts = await client.fetch(postsQuery);

    return (
        <div className="max-w-4xl mx-auto px-6 py-12 pb-20 space-y-12">
            <div className="space-y-4">
                <h1 className="text-4xl font-bold">Writing</h1>
                <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl">
                    Thoughts on engineering, simulation, reinforcement learning, and software development.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {posts.map((post: any) => (
                    <BlogCard key={post._id} post={post} />
                ))}
            </div>
        </div>
    );
}
