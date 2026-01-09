import { defineField, defineType } from 'sanity'
import { Scale } from 'lucide-react'

export const legalPage = defineType({
    name: 'legalPage',
    title: 'Legal Page',
    type: 'document',
    icon: Scale,
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
            name: 'lastUpdated',
            title: 'Last Updated',
            type: 'date',
            options: {
                dateFormat: 'YYYY-MM-DD',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
                {
                    type: 'block',
                    marks: {
                        decorators: [
                            { title: 'Strong', value: 'strong' },
                            { title: 'Emphasis', value: 'em' },
                        ],
                    },
                },
            ],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'seo',
            title: 'SEO Override',
            type: 'seo',
            options: { collapsible: true, collapsed: false },
        }),
    ],
    preview: {
        select: {
            title: 'title',
            date: 'lastUpdated',
        },
        prepare({ title, date }) {
            return {
                title,
                subtitle: date ? `Last updated: ${date}` : 'No date set',
            }
        },
    },
})
