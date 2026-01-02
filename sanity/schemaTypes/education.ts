import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'education',
    title: 'Education',
    type: 'document',
    fields: [
        defineField({
            name: 'institution',
            title: 'Institution',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'degree',
            title: 'Degree',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'fieldOfStudy',
            title: 'Field of Study',
            type: 'string',
            placeholder: 'e.g., "Computer Science", "Electronic & Telecommunication Engineering"',
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
            description: 'Leave empty if currently studying',
        }),
        defineField({
            name: 'current',
            title: 'Currently Studying',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'grade',
            title: 'Grade/GPA',
            type: 'string',
            placeholder: 'e.g., "3.8/4.0" or "First Class Honours"',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'array',
            of: [{ type: 'block' }],
            description: 'Coursework, achievements, and other details',
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
            title: 'degree',
            subtitle: 'institution',
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
