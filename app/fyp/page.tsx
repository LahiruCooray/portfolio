import { client } from "@/sanity/lib/client";
import { featuredProjectQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { ArrowRight, Github, Globe } from "lucide-react";

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function FYPPage() {
    const project = await client.fetch(featuredProjectQuery);

    if (!project) {
        return (
            <div className="max-w-3xl mx-auto px-6 py-20 text-center">
                <h1 className="text-2xl font-bold">Featured Project Not Found</h1>
                <p className="text-zinc-500 mt-2">Please mark a project as "featured" in the CMS.</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-12 pb-20">
            <header className="mb-16 text-center space-y-6">
                <div className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
                    Final Year Project
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">{project.title}</h1>
                <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                    {project.description}
                </p>

                <div className="flex justify-center gap-4 pt-4">
                    <Link
                        href="/fyp/updates"
                        className="inline-flex items-center px-6 py-3 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                    >
                        View Monthly Updates <ArrowRight size={18} className="ml-2" />
                    </Link>
                </div>
            </header>

            {project.mainImage && (
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl mb-16">
                    <Image
                        src={urlFor(project.mainImage).url()}
                        alt={project.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                <div className="md:col-span-2 prose prose-lg prose-zinc dark:prose-invert max-w-none">
                    <h2 className="text-2xl font-bold mb-4">Overview</h2>
                    {project.content && <PortableText value={project.content} />}
                </div>
                <div className="space-y-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Tech Stack</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.techStack?.map((tech: string) => (
                                <span key={tech} className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-md text-sm">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold mb-3">Links</h3>
                        {project.repoUrl && (
                            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                <Github size={20} /> Repository
                            </a>
                        )}
                        {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                <Globe size={20} /> Live Demo
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {project.videoUrl && (
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold">Project Demo</h2>
                    <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-black aspect-video">
                        <iframe
                            width="100%"
                            height="100%"
                            src={project.videoUrl.replace("watch?v=", "embed/")}
                            title="Project Demo"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                        />
                    </div>
                </section>
            )}
        </div>
    );
}
