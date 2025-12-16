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
        }),
        defineField({
            name: 'date',
            title: 'Date',
            type: 'date',
        }),
        defineField({
            name: 'videoUrl',
            title: 'Video URL (YouTube)',
            type: 'url',
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
        defineField({
            name: 'nextMonthPlan',
            title: 'Plan for Next Month',
            type: 'text',
        }),
    ],
})
