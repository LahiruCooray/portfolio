import { client } from "@/sanity/lib/client";
import { projectBySlugQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { ArrowLeft, Github, Globe } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = await client.fetch(projectBySlugQuery, { slug });

    if (!project) {
        notFound();
    }

    return (
        <article className="max-w-3xl mx-auto px-6 py-12 pb-20">
            <Link href="/projects" className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 mb-8 transition-colors">
                <ArrowLeft size={16} className="mr-2" /> Back to projects
            </Link>

            <header className="space-y-6 mb-12">
                <h1 className="text-4xl md:text-5xl font-bold">{project.title}</h1>

                {project.mainImage && (
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                        <Image
                            src={urlFor(project.mainImage).url()}
                            alt={project.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                <div className="flex flex-wrap gap-4 items-center justify-between">
                    {project.techStack && (
                        <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech: string) => (
                                <span
                                    key={tech}
                                    className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-sm text-zinc-700 dark:text-zinc-300"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="flex gap-4">
                        {project.repoUrl && (
                            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium hover:text-blue-600 transition-colors">
                                <Github size={20} /> Repository
                            </a>
                        )}
                        {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium hover:text-blue-600 transition-colors">
                                <Globe size={20} /> Live Demo
                            </a>
                        )}
                    </div>
                </div>
            </header>

            {project.videoUrl && (
                <div className="mb-12 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-black">
                    {/* Simple iframe for YouTube - assuming usage of youtube-nocookie or similar handling in future if needed, 
                 for now direct embed or assuming user provides embeddable link or ID. 
                 Using a helper to extract ID would be robust, but for minimal start, just render generic video or iframe using url?
                 Actually, youtube embeds need the ID or 'embed/ID' URL. 
                 I'll assume the user might enter the full URL, so I'll create a helper or just try to simple iframe if it's an embed URL.
                 Better: Use 'react-player' or just a simple helper function. 
                 I'll define a simple helper function inline or assume valid embed URL for now, or just not render if complexity is high.
                 Schema said 'url'. I'll try to extract ID. */}
                    {/* I'll skip complex extraction for now and use a placeholder or assume the user enters the Embed URL in CMS for simplicity 
                     (or I can add instruction). 
                     Actually, I'll assume standard youtube.com/watch?v=ID and replace with embed. */}
                    <iframe
                        width="100%"
                        height="400"
                        src={project.videoUrl.replace("watch?v=", "embed/")}
                        title="Project Video"
                        className="w-full aspect-video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            )}

            <div className="prose prose-zinc dark:prose-invert max-w-none">
                {project.content && <PortableText value={project.content} />}
            </div>
        </article>
    );
}
