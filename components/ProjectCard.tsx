"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { ArrowUpRight } from "lucide-react";

// Extract YouTube video ID from various URL formats
function getYouTubeId(url: string | null | undefined): string | null {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?\s]+)/);
    return match ? match[1] : null;
}

interface ProjectCardProps {
    project: {
        title: string;
        slug: { current: string };
        description: string;
        mainImage: any;
        techStack: string[];
        featured?: boolean;
        _type: string;
        gallery?: Array<{ asset: { url: string } }>;
        videos?: Array<{ title: string; url: string }>;
    };
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const href = project.featured ? "/fyp" : `/projects/${project.slug.current}`;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Build array of all images (main + gallery + video thumbnails)
    const allImages: string[] = [];

    // Add main image first
    if (project.mainImage) {
        allImages.push(urlFor(project.mainImage).url());
    }

    // Add gallery images
    if (project.gallery) {
        project.gallery.forEach((item) => {
            if (item.asset?.url) {
                allImages.push(item.asset.url);
            }
        });
    }

    // Add YouTube video thumbnails
    if (project.videos) {
        project.videos.forEach((video) => {
            const videoId = getYouTubeId(video.url);
            if (videoId) {
                allImages.push(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
            }
        });
    }

    // Slideshow effect on hover
    useEffect(() => {
        if (isHovering && allImages.length > 1) {
            intervalRef.current = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % allImages.length);
            }, 1200); // Change image every 1.2 seconds
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            setCurrentIndex(0); // Reset to main image when not hovering
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isHovering, allImages.length]);

    return (
        <Link href={href} className="group block h-full">
            <div
                className="relative h-full flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 group-hover:border-zinc-400 dark:group-hover:border-zinc-600 transition-colors duration-300 rounded-lg overflow-hidden"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >

                {/* Image - Technical aspect ratio with slideshow */}
                {allImages.length > 0 && (
                    <div className="relative aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-800">
                        {/* Tech overlay tint only on hover */}
                        <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/10 transition-colors duration-300 z-10" />

                        {/* Slideshow images */}
                        {allImages.map((src, index) => (
                            <Image
                                key={`${src}-${index}`}
                                src={src}
                                alt={`${project.title} - ${index + 1}`}
                                fill
                                className={`object-cover transition-all duration-500 ease-out ${index === currentIndex
                                    ? "opacity-100 scale-100"
                                    : "opacity-0 scale-105"
                                    } ${isHovering ? "" : "group-hover:scale-105"}`}
                            />
                        ))}

                        {/* Slideshow indicator dots */}
                        {isHovering && allImages.length > 1 && (
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex gap-1">
                                {allImages.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`w-1.5 h-1.5 rounded-full transition-all ${index === currentIndex
                                            ? "bg-white w-3"
                                            : "bg-white/50"
                                            }`}
                                    />
                                ))}
                            </div>
                        )}
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
