import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
    project: {
        title: string;
        slug: { current: string };
        description: string;
        mainImage: any;
        techStack: string[];
        featured?: boolean;
        _type: string;
    };
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const href = project.featured ? "/fyp" : `/projects/${project.slug.current}`;

    return (
        <Link href={href} className="group block h-full">
            <div className="relative h-full flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 group-hover:border-zinc-400 dark:group-hover:border-zinc-600 transition-colors duration-300 rounded-lg overflow-hidden">

                {/* Image - Technical aspect ratio */}
                {project.mainImage && (
                    <div className="relative aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-800">
                        {/* Tech overlay tint only on hover */}
                        <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/10 transition-colors duration-300 z-10" />
                        <Image
                            src={urlFor(project.mainImage).url()}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                    </div>
                )}

                <div className="p-6 flex flex-col flex-grow">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {project.title}
                        </h3>
                        <ArrowUpRight
                            size={18}
                            className="text-zinc-400 group-hover:text-blue-500 transition-colors"
                        />
                    </div>

                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 line-clamp-3">
                        {project.description}
                    </p>

                    <div className="mt-auto">
                        <div className="flex flex-wrap gap-2">
                            {project.techStack && project.techStack.slice(0, 4).map((tech) => (
                                <span
                                    key={tech}
                                    className="px-2 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/50 rounded-md border border-transparent group-hover:border-zinc-200 dark:group-hover:border-zinc-700 transition-colors"
                                >
                                    {tech}
                                </span>
                            ))}
                            {project.techStack && project.techStack.length > 4 && (
                                <span className="px-2 py-1 text-xs font-medium text-zinc-500 bg-zinc-50 dark:bg-zinc-900 rounded-md">
                                    +{project.techStack.length - 4}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
