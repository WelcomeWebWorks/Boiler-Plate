import { defineField, defineType } from 'sanity'

export const seo = defineType({
    name: 'seo',
    title: 'SEO & Social',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            title: 'Meta Title',
            type: 'string',
            description: 'Ideal length is between 30-60 characters',
            validation: (Rule) => Rule.max(70).warning('Longer titles may be truncated by search engines'),
        }),
        defineField({
            name: 'description',
            title: 'Meta Description',
            type: 'text',
            rows: 3,
            description: 'Ideal length is between 110-160 characters',
            validation: (Rule) => Rule.max(160).warning('Longer descriptions may be truncated by search engines'),
        }),
        defineField({
            name: 'canonicalUrl',
            title: 'Canonical URL',
            type: 'url',
            description: 'The preferred URL for this page (leave empty to use default)',
        }),
        defineField({
            name: 'noIndex',
            title: 'Discourage Search Engines (noindex)',
            type: 'boolean',
            description: 'Switch on to hide this page from search results',
            initialValue: false,
        }),
        defineField({
            name: 'ogImage',
            title: 'Social Share Image',
            type: 'image',
            description: 'Image displayed when sharing on social media (1200x630px)',
            options: {
                hotspot: true,
            },
        }),
    ],
})
