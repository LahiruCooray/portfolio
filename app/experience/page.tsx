import { client } from "@/sanity/lib/client";
import { experienceQuery } from "@/sanity/lib/queries";
import ExperienceCard from "@/components/ExperienceCard";

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function ExperiencePage() {
    const experiences = await client.fetch(experienceQuery);

    return (
        <div className="max-w-4xl mx-auto px-6 py-12 space-y-12 pb-20">
            <div className="space-y-4">
                <h1 className="text-4xl font-bold">Experience</h1>
                <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl">
                    My professional journey and work experience.
                </p>
            </div>

            <div className="space-y-0">
                {experiences.length > 0 ? (
                    experiences.map((experience: any) => (
                        <ExperienceCard key={experience._id} experience={experience} />
                    ))
                ) : (
                    <p className="text-zinc-500 dark:text-zinc-400 text-center py-12">
                        No experience entries yet.
                    </p>
                )}
            </div>
        </div>
    );
}
