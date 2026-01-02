import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.required().max(300),
        }),
        defineField({
            name: 'duration',
            title: 'Duration',
            type: 'string',
            placeholder: 'e.g., "Jan 2024 - Mar 2024" or "3 months"',
        }),
        defineField({
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
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
            name: 'techStack',
            title: 'Tech Stack',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags',
            },
            validation: (Rule) => Rule.max(30),
        }),
        defineField({
            name: 'featured',
            title: 'Featured Project',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Lower numbers appear first. Projects with the same order number will be sorted by creation date.',
            initialValue: 0,
            validation: (Rule) => Rule.integer(),
        }),
        defineField({
            name: 'videos',
            title: 'Videos (YouTube)',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'title',
                            title: 'Video Title',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: 'url',
                            title: 'YouTube URL',
                            type: 'url',
                            validation: (Rule) =>
                                Rule.required()
                                    .uri({ scheme: ['http', 'https'] })
                                    .custom((url: string | undefined) => {
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
                                subtitle: selection.url,
                            }
                        },
                    },
                },
            ],
        }),
        defineField({
            name: 'documentation',
            title: 'Documentation Links & Files',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'title',
                            title: 'Title',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: 'url',
                            title: 'External URL (optional if uploading file)',
                            type: 'url',
                            validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
                        },
                        {
                            name: 'file',
                            title: 'Upload File (optional if providing URL)',
                            type: 'file',
                            description: 'Upload a PDF or document file',
                        },
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            url: 'url',
                            file: 'file',
                        },
                        prepare(selection: { title?: string; url?: string; file?: any }) {
                            return {
                                title: selection.title || 'Untitled',
                                subtitle: selection.url || selection.file?.asset?.originalFilename || 'No link/file',
                            }
                        },
                    },
                },
            ],
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
            name: 'liveUrl',
            title: 'Live Demo URL',
            type: 'url',
            validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
        }),
        defineField({
            name: 'repoUrl',
            title: 'Repository URL',
            type: 'url',
            validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
                { type: 'block' },
                { type: 'image', options: { hotspot: true } },
            ],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'mainImage',
            featured: 'featured',
        },
        prepare(selection) {
            const { title, media, featured } = selection
            return {
                title: title,
                subtitle: featured ? 'Featured Project' : undefined,
                media: media,
            }
        },
    },
})
