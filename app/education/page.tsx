import { client } from "@/sanity/lib/client";
import { educationQuery } from "@/sanity/lib/queries";
import EducationCard from "@/components/EducationCard";

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function EducationPage() {
    const education = await client.fetch(educationQuery);

    return (
        <div className="max-w-4xl mx-auto px-6 py-12 space-y-12 pb-20">
            <div className="space-y-4">
                <h1 className="text-4xl font-bold">Education</h1>
                <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl">
                    My academic background and qualifications.
                </p>
            </div>

            <div className="space-y-0">
                {education.length > 0 ? (
                    education.map((edu: any) => (
                        <EducationCard key={edu._id} education={edu} />
                    ))
                ) : (
                    <p className="text-zinc-500 dark:text-zinc-400 text-center py-12">
                        No education entries yet.
                    </p>
                )}
            </div>
        </div>
    );
}
