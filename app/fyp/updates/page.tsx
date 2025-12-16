import { client } from "@/sanity/lib/client";
import { fypUpdatesQuery } from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function FYPUpdatesPage() {
    const updates = await client.fetch(fypUpdatesQuery);

    return (
        <div className="max-w-3xl mx-auto px-6 py-12 pb-20">
            <Link href="/fyp" className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 mb-8 transition-colors">
                <ArrowLeft size={16} className="mr-2" /> Back to Project
            </Link>

            <header className="mb-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Monthly Updates</h1>
                <p className="text-zinc-600 dark:text-zinc-400">
                    Tracking the progress, challenges, and milestones of my Final Year Project.
                </p>
            </header>

            <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-3 space-y-12">
                {updates.map((update: any) => (
                    <div key={update._id} className="pl-8 relative">
                        <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-white dark:ring-zinc-950" />

                        <article className="space-y-4">
                            <div className="flex items-center text-sm text-zinc-500 mb-1">
                                <Calendar size={14} className="mr-2" />
                                {new Date(update.date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                            </div>

                            <h2 className="text-2xl font-bold">{update.title}</h2>

                            <div className="prose prose-zinc dark:prose-invert max-w-none bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-xl">
                                {update.content && <PortableText value={update.content} />}

                                {update.videoUrl && (
                                    <div className="mt-6 not-prose rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 aspect-video">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={update.videoUrl.replace("watch?v=", "embed/")}
                                            title="Update Video"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="w-full h-full"
                                        />
                                    </div>
                                )}

                                {update.nextMonthPlan && (
                                    <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                                        <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-2">Plan for Next Month</h4>
                                        <p className="text-zinc-800 dark:text-zinc-200 italic">{update.nextMonthPlan}</p>
                                    </div>
                                )}
                            </div>
                        </article>
                    </div>
                ))}
            </div>
        </div>
    );
}
