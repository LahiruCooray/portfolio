'use client'

import { useState } from 'react'
import { urlFor } from "@/sanity/lib/image"
import ProjectContent from "@/components/ProjectContent"
import ImageLightbox from "@/components/ImageLightbox"
import Image from "next/image"
import { Calendar, FileText, ExternalLink, ChevronDown, ChevronUp } from "lucide-react"

interface UpdateCardProps {
    update: any
}

export default function UpdateCard({ update }: UpdateCardProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <div className="pl-8 relative">
            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-white dark:ring-zinc-950" />

            <article className="space-y-4">
                <div className="flex items-center text-sm text-zinc-500 mb-1">
                    <Calendar size={14} className="mr-2" />
                    {new Date(update.date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </div>

                <h2 className="text-2xl font-bold">{update.title}</h2>

                {update.coverImage && (
                    <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                        <Image
                            src={urlFor(update.coverImage).url()}
                            alt={update.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}

                {/* Collapsed/Expanded Content */}
                <div className={`bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-xl space-y-6 overflow-hidden transition-all duration-300 ${!isExpanded ? 'max-h-[400px] relative' : ''}`}>
                    {update.content && <ProjectContent content={update.content} />}

                    {!isExpanded && (
                        <div className="absolute z-10 inset-x-0 bottom-0 h-48 bg-gradient-to-t from-zinc-50 dark:from-zinc-900 via-zinc-50/50 dark:via-zinc-900/50 to-transparent pointer-events-none" />
                    )}

                    {isExpanded && (
                        <>
                            {update.gallery && update.gallery.length > 0 && (
                                <div className="not-prose">
                                    <h3 className="text-lg font-semibold mb-4">Gallery</h3>
                                    <ImageLightbox
                                        images={update.gallery.map((img: any) => urlFor(img).url())}
                                        alts={update.gallery.map((img: any, idx: number) => img.alt || `Update image ${idx + 1}`)}
                                        captions={update.gallery.map((img: any) => img.asset?.originalFilename || img.caption || '')}
                                    />
                                </div>
                            )}

                            {update.videoUrl && (
                                <div className="not-prose rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 aspect-video">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={update.videoUrl.replace("watch?v=", "embed/")}
                                        title="Update Video"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full"
                                    />
                                </div>
                            )}

                            {update.reports && update.reports.length > 0 && (
                                <div className="not-prose">
                                    <h3 className="text-lg font-semibold mb-3">Reports & Documents</h3>
                                    <div className="grid grid-cols-1 gap-2">
                                        {update.reports.map((report: any, idx: number) => (
                                            <a
                                                key={idx}
                                                href={report.file.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-between p-3 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors group"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <FileText size={18} className="text-red-600" />
                                                    <span className="text-sm font-medium">{report.title}</span>
                                                </div>
                                                <ExternalLink size={14} className="text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {update.teamProgress && (
                                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                                    <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-2">Overall Team Progress</h4>
                                    <p className="text-zinc-800 dark:text-zinc-200 italic">{update.teamProgress}</p>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Read More Button */}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                >
                    {isExpanded ? (
                        <>
                            Show Less <ChevronUp size={18} />
                        </>
                    ) : (
                        <>
                            Read More <ChevronDown size={18} />
                        </>
                    )}
                </button>
            </article>
        </div>
    )
}
