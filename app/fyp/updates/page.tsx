import { client } from "@/sanity/lib/client";
import { fypUpdatesQuery } from "@/sanity/lib/queries";
import UpdateCard from "@/components/UpdateCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function FYPUpdatesPage() {
    const updates = await client.fetch(fypUpdatesQuery);

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 pb-20">
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
                    <UpdateCard key={update._id} update={update} />
                ))}
            </div>
        </div>
    );
}
