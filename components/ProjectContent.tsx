'use client'

import { PortableText, PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

const components: PortableTextComponents = {
    block: {
        h1: ({ children }) => (
            <h1 className="text-4xl font-bold mt-12 mb-6 first:mt-0">{children}</h1>
        ),
        h2: ({ children }) => (
            <h2 className="text-3xl font-bold mt-10 mb-5 first:mt-0">{children}</h2>
        ),
        h3: ({ children }) => (
            <h3 className="text-2xl font-semibold mt-8 mb-4 first:mt-0">{children}</h3>
        ),
        h4: ({ children }) => (
            <h4 className="text-xl font-semibold mt-6 mb-3 first:mt-0">{children}</h4>
        ),
        normal: ({ children }) => (
            <p className="text-base leading-7 mb-6">{children}</p>
        ),
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 italic my-6 text-zinc-600 dark:text-zinc-400">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }) => (
            <ul className="list-disc list-outside ml-6 mb-6 space-y-2">{children}</ul>
        ),
        number: ({ children }) => (
            <ol className="list-decimal list-outside ml-6 mb-6 space-y-2">{children}</ol>
        ),
    },
    listItem: {
        bullet: ({ children }) => (
            <li className="leading-7">{children}</li>
        ),
        number: ({ children }) => (
            <li className="leading-7">{children}</li>
        ),
    },
    marks: {
        link: ({ children, value }) => {
            const isExternal = value?.href?.startsWith('http')
            return (
                <a
                    href={value?.href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                    {children}
                </a>
            )
        },
        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        code: ({ children }) => (
            <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono">
                {children}
            </code>
        ),
    },
    types: {
        image: ({ value }) => {
            if (!value?.asset) return null

            return (
                <div className="my-8 rounded-lg overflow-hidden">
                    <Image
                        src={urlFor(value).url()}
                        alt={value.alt || 'Content image'}
                        width={1200}
                        height={800}
                        className="w-full h-auto"
                    />
                    {value.caption && (
                        <p className="text-sm text-center text-zinc-500 dark:text-zinc-400 mt-2 italic">
                            {value.caption}
                        </p>
                    )}
                </div>
            )
        },
    },
}

interface ProjectContentProps {
    content: any
}

export default function ProjectContent({ content }: ProjectContentProps) {
    return (
        <div className="prose prose-zinc dark:prose-invert max-w-none">
            <PortableText value={content} components={components} />
        </div>
    )
}
