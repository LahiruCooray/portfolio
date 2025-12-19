'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageLightboxProps {
    images: string[]
    alts: string[]
}

export default function ImageLightbox({ images, alts }: ImageLightboxProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

    const openLightbox = (index: number) => {
        setSelectedIndex(index)
        document.body.style.overflow = 'hidden'
    }

    const closeLightbox = () => {
        setSelectedIndex(null)
        document.body.style.overflow = 'auto'
    }

    const goToPrevious = () => {
        if (selectedIndex === null) return
        setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1)
    }

    const goToNext = () => {
        if (selectedIndex === null) return
        setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1)
    }

    return (
        <>
            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {images.map((image, idx) => (
                    <div
                        key={idx}
                        className="relative aspect-video rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-900 cursor-pointer group"
                        onClick={() => openLightbox(idx)}
                    >
                        <Image
                            src={image}
                            alt={alts[idx]}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {selectedIndex !== null && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
                    onClick={closeLightbox}
                >
                    {/* Close Button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                        aria-label="Close"
                    >
                        <X size={24} />
                    </button>

                    {/* Navigation Buttons */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    goToPrevious()
                                }}
                                className="absolute left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                                aria-label="Previous"
                            >
                                <ChevronLeft size={32} />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    goToNext()
                                }}
                                className="absolute right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                                aria-label="Next"
                            >
                                <ChevronRight size={32} />
                            </button>
                        </>
                    )}

                    {/* Image Container */}
                    <div
                        className="relative w-full h-full max-w-7xl max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={images[selectedIndex]}
                            alt={alts[selectedIndex]}
                            fill
                            className="object-contain"
                            quality={100}
                            sizes="100vw"
                        />
                    </div>

                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-white/10 rounded-full text-white text-sm">
                        {selectedIndex + 1} / {images.length}
                    </div>
                </div>
            )}
        </>
    )
}
