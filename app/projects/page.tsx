import { client } from "@/sanity/lib/client";
import { projectsQuery } from "@/sanity/lib/queries";
import ProjectCard from "@/components/ProjectCard";

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function ProjectsPage() {
    const projects = await client.fetch(projectsQuery);

    return (
        <div className="max-w-4xl mx-auto px-6 py-12 space-y-12 pb-20">
            <div className="space-y-4">
                <h1 className="text-4xl font-bold">Projects</h1>
                <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl">
                    A collection of my work in robotics, embedded systems, simulation, and software engineering.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project: any) => (
                    <ProjectCard key={project._id} project={project} />
                ))}
            </div>
        </div>
    );
}
