import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'contentImage',
    title: 'Content Image',
    type: 'image',
    options: {
        hotspot: true,
    },
    fields: [
        defineField({
            name: 'alt',
            title: 'Alt Text',
            type: 'string',
            description: 'Alternative text for accessibility',
        }),
        defineField({
            name: 'caption',
            title: 'Caption',
            type: 'string',
            description: 'Optional caption below the image',
        }),
        defineField({
            name: 'size',
            title: 'Display Size',
            type: 'string',
            options: {
                list: [
                    { title: 'Small (25%)', value: 'small' },
                    { title: 'Medium (50%)', value: 'medium' },
                    { title: 'Large (75%)', value: 'large' },
                    { title: 'Full Width (100%)', value: 'full' },
                ],
                layout: 'radio',
            },
            initialValue: 'full',
        }),
    ],
    preview: {
        select: {
            media: 'asset',
            title: 'alt',
            subtitle: 'size',
        },
        prepare({ media, title, subtitle }) {
            return {
                title: title || 'Image',
                subtitle: subtitle ? `Size: ${subtitle}` : 'Full width',
                media,
            }
        },
    },
})
