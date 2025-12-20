import { client } from "@/sanity/lib/client";
import { projectBySlugQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import ProjectContent from "@/components/ProjectContent";
import ImageLightbox from "@/components/ImageLightbox";
import { ArrowLeft, Github, Globe, ExternalLink, FileText, Calendar } from "lucide-react";
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
        <article className="max-w-7xl mx-auto px-6 py-12 pb-20">
            <Link href="/projects" className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 mb-8 transition-colors">
                <ArrowLeft size={16} className="mr-2" /> Back to projects
            </Link>

            <header className="space-y-6 mb-12">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <h1 className="text-4xl md:text-5xl font-bold flex-1">{project.title}</h1>
                    {project.duration && (
                        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                            <Calendar size={16} />
                            <span>{project.duration}</span>
                        </div>
                    )}
                </div>

                {project.description && (
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {project.description}
                    </p>
                )}

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

                <div className="flex flex-wrap gap-4">
                    {project.repoUrl && (
                        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors font-medium">
                            <Github size={20} /> Repository
                        </a>
                    )}
                    {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors font-medium">
                            <Globe size={20} /> Live Demo
                        </a>
                    )}
                </div>
            </header>

            {/* Main Content */}
            {project.content && <ProjectContent content={project.content} />}

            {/* Gallery */}
            {project.gallery && project.gallery.length > 0 && (
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Gallery</h2>
                    <ImageLightbox
                        images={project.gallery.map((img: any) => urlFor(img).url())}
                        alts={project.gallery.map((img: any, idx: number) => img.alt || `Gallery image ${idx + 1}`)}
                        captions={project.gallery.map((img: any) => img.asset?.originalFilename || img.caption || '')}
                    />
                </section>
            )}

            {/* Videos */}
            {project.videos && project.videos.length > 0 && (
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Videos</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {project.videos.map((video: any, idx: number) => (
                            <div key={idx} className="rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
                                {video.title && (
                                    <h3 className="text-lg font-semibold px-4 pt-4 pb-2">{video.title}</h3>
                                )}
                                <div className="bg-black aspect-video">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={video.url.replace("watch?v=", "embed/").replace("youtu.be/", "youtube.com/embed/")}
                                        title={video.title || "Project Video"}
                                        className="w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Documentation Links & Files */}
            {project.documentation && project.documentation.length > 0 && (
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Documentation (links)</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {project.documentation.map((doc: any, idx: number) => (
                            <a
                                key={idx}
                                href={doc.url || doc.file?.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    {doc.file && <FileText size={20} className="text-blue-600" />}
                                    <span className="font-medium">{doc.title}</span>
                                </div>
                                <ExternalLink size={18} className="text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300" />
                            </a>
                        ))}
                    </div>
                </section>
            )}

            {/* Reports/PDFs */}
            {project.reports && project.reports.length > 0 && (
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Reports & Documents</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {project.reports.map((report: any, idx: number) => (
                            <a
                                key={idx}
                                href={report.file.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <FileText size={20} className="text-red-600" />
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
