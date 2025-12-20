import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'fypUpdate',
    title: 'FYP Monthly Update',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title (e.g., "September: Drone Assembly")',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'month',
            title: 'Month (e.g. "October")',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'date',
            title: 'Date',
            type: 'date',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'coverImage',
            title: 'Cover Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'videos',
            title: 'Videos',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'title',
                            title: 'Video Title',
                            type: 'string',
                        },
                        {
                            name: 'url',
                            title: 'YouTube URL',
                            type: 'url',
                            validation: (Rule) =>
                                Rule.uri({
                                    scheme: ['http', 'https'],
                                }).custom((url: string | undefined) => {
                                    if (!url) return true
                                    const pattern = /^https:\/\/(www\.)?(youtube\.com|youtu\.be)\/.+$/
                                    return pattern.test(url) ? true : 'Must be a valid YouTube URL'
                                }),
                        },
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            url: 'url',
                        },
                        prepare(selection: { title?: string; url?: string }) {
                            return {
                                title: selection.title || 'Untitled Video',
                                subtitle: selection.url || 'No URL',
                            }
                        },
                    },
                },
            ],
        }),
        defineField({
            name: 'gallery',
            title: 'Gallery',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
            options: {
                layout: 'grid',
            },
        }),
        defineField({
            name: 'reports',
            title: 'Reports & Documents (PDFs)',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'title',
                            title: 'Document Title',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: 'file',
                            title: 'PDF File',
                            type: 'file',
                            options: {
                                accept: '.pdf',
                            },
                            validation: (Rule) => Rule.required(),
                        },
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            file: 'file',
                        },
                        prepare(selection: { title?: string; file?: any }) {
                            return {
                                title: selection.title || 'Untitled Document',
                                subtitle: selection.file?.asset?.originalFilename || 'PDF',
                            }
                        },
                    },
                },
            ],
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
                { type: 'block' },
                { type: 'image', options: { hotspot: true } }, // For existing images
                { type: 'contentImage' }, // New images with size options
            ],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'teamProgress',
            title: 'Overall Team Progress Update',
            type: 'text',
            rows: 6,
            description: 'Summary of the entire team\'s progress for this month',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'month',
            media: 'coverImage',
        },
    },
})
