import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'post',
    title: 'Blog Post',
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
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.max(200),
        }),
        defineField({
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags',
            },
            validation: (Rule) => Rule.max(15),
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
        }),
        defineField({
            name: 'reports',
            title: 'Attachments (PDFs)',
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
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [
                { type: 'block' },
                { type: 'image', options: { hotspot: true } },
            ],
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'mainImage',
        },
        prepare(selection) {
            const { title, media } = selection
            return {
                title: title,
                media: media,
            }
        },
    },
})
