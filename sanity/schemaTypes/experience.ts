import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'experience',
    title: 'Experience',
    type: 'document',
    fields: [
        defineField({
            name: 'company',
            title: 'Company',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'position',
            title: 'Position',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'string',
            placeholder: 'e.g., "San Francisco, CA" or "Remote"',
        }),
        defineField({
            name: 'startDate',
            title: 'Start Date',
            type: 'date',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'endDate',
            title: 'End Date',
            type: 'date',
            description: 'Leave empty if currently working here',
        }),
        defineField({
            name: 'current',
            title: 'Currently Working Here',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'array',
            of: [{ type: 'block' }],
            description: 'Responsibilities and achievements',
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Lower numbers appear first. Entries with the same order number will be sorted by start date.',
            initialValue: 0,
            validation: (Rule) => Rule.integer(),
        }),
    ],
    preview: {
        select: {
            title: 'position',
            subtitle: 'company',
            current: 'current',
        },
        prepare(selection) {
            const { title, subtitle, current } = selection
            return {
                title: title,
                subtitle: current ? `${subtitle} (Current)` : subtitle,
            }
        },
    },
})
