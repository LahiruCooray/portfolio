"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight, Play } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { useState, useEffect } from "react";

interface LatestUpdateBannerProps {
    update: {
        _id: string;
        title: string;
        date: string;
        excerpt?: string;
        gallery?: any[];
        videos?: { title: string; url: string }[];
    } | null;
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

function getYouTubeThumbnail(url: string): string {
    const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
    // Use hqdefault instead of maxresdefault - hqdefault is guaranteed to exist for all videos
    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '';
}

export default function LatestUpdateBanner({ update }: LatestUpdateBannerProps) {
    const [currentSlide, setCurrentSlide] = useState(0);

    if (!update) return null;

    // Combine gallery images and video thumbnails
    const mediaItems: { type: 'image' | 'video'; src: string; alt: string }[] = [];

    if (update.gallery && update.gallery.length > 0) {
        update.gallery.forEach((img, idx) => {
            mediaItems.push({
                type: 'image',
                src: urlFor(img).width(800).height(450).url(),
                alt: `Gallery image ${idx + 1}`
            });
        });
    }

    if (update.videos && update.videos.length > 0) {
        update.videos.forEach((video, idx) => {
            const thumbnail = getYouTubeThumbnail(video.url);
            if (thumbnail) {
                mediaItems.push({
                    type: 'video',
                    src: thumbnail,
                    alt: video.title || `Video ${idx + 1}`
                });
            }
        });
    }

    // Auto-rotate slideshow
    useEffect(() => {
        if (mediaItems.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % mediaItems.length);
        }, 4000); // Change slide every 4 seconds

        return () => clearInterval(interval);
    }, [mediaItems.length]);

    return (
        <Link
            href="/fyp/updates"
            className="group block relative overflow-hidden"
        >
            <div className="relative border border-blue-200 dark:border-blue-900/50 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-zinc-900/50 rounded-lg overflow-hidden hover:border-blue-300 dark:hover:border-blue-800 transition-all duration-300">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
                    {/* Media Slideshow - Left side on desktop */}
                    {mediaItems.length > 0 && (
                        <div className="md:col-span-2 relative aspect-video md:aspect-auto md:h-full min-h-[200px] bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
                            {mediaItems.map((media, idx) => (
                                <div
                                    key={idx}
                                    className={`absolute inset-0 transition-opacity duration-700 ${idx === currentSlide ? 'opacity-100' : 'opacity-0'
                                        }`}
                                >
                                    <Image
                                        src={media.src}
                                        alt={media.alt}
                                        fill
                                        className="object-cover"
                                    />
                                    {media.type === 'video' && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                                                <Play size={24} className="text-zinc-900 ml-1" fill="currentColor" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Slide indicators */}
                            {mediaItems.length > 1 && (
                                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                                    {mediaItems.map((_, idx) => (
                                        <div
                                            key={idx}
                                            className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentSlide
                                                ? 'w-8 bg-white'
                                                : 'w-1.5 bg-white/50'
                                                }`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Content - Right side on desktop */}
                    <div className={`${mediaItems.length > 0 ? 'md:col-span-3' : 'md:col-span-5'} p-6 relative`}>
                        {/* Decorative element */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl" />

                        <div className="relative flex items-start justify-between gap-4">
                            <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
                                        Latest Update
                                    </span>
                                    <span className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                                        <Calendar size={12} />
                                        {formatDate(update.date)}
                                    </span>
                                    {mediaItems.length > 0 && (
                                        <span className="text-xs text-zinc-400 dark:text-zinc-500">
                                            • {mediaItems.length} {mediaItems.length === 1 ? 'item' : 'items'}
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {update.title}
                                </h3>

                                {update.excerpt && (
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                                        {update.excerpt}
                                    </p>
                                )}
                            </div>

                            <div className="flex-shrink-0 mt-1">
                                <ArrowRight
                                    size={20}
                                    className="text-blue-500 dark:text-blue-400 group-hover:translate-x-1 transition-transform"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
