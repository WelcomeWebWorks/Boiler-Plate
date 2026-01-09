import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Site Title',
            type: 'string',
            description: 'Internal title for this settings document',
            initialValue: 'Site Settings',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'seo',
            title: 'Default SEO',
            type: 'seo',
            description: 'Global SEO defaults',
            options: { collapsible: true, collapsed: false },
        }),
        defineField({
            name: 'logo',
            title: 'Site Logo',
            type: 'image',
            description: 'The main logo for the website. If not set, the company name "Company Name" will be displayed.',
            options: {
                hotspot: true,
            },
            fields: [
                defineField({
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                    initialValue: 'Company Logo',
                }),
            ],
        }),
        defineField({
            name: 'logoLight',
            title: 'Light Logo (for dark backgrounds)',
            type: 'image',
            description: 'Logo version for dark backgrounds like the footer. If not set, the main logo or company name will be used.',
            options: {
                hotspot: true,
            },
            fields: [
                defineField({
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                    initialValue: 'Company Logo',
                }),
            ],
        }),
        defineField({
            name: 'companyName',
            title: 'Company Name',
            type: 'string',
            description: 'The company name to display when logo is not available.',
            initialValue: 'Company Name',
        }),
        defineField({
            name: 'socialLinks',
            title: 'Social Media Links',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'platform',
                            title: 'Platform Name',
                            type: 'string',
                        }),
                        defineField({
                            name: 'url',
                            title: 'URL',
                            type: 'url',
                        }),
                        defineField({
                            name: 'icon',
                            title: 'Icon',
                            type: 'image',
                            options: { hotspot: true },
                        }),
                    ],
                },
            ],
        }),
        defineField({
            name: 'stats',
            title: 'Company Statistics',
            type: 'object',
            description: 'Statistics displayed on Service pages. Leave empty to hide.',
            fields: [
                defineField({
                    name: 'clientsCount',
                    title: 'Clients Count',
                    type: 'string',
                    description: 'e.g. "500+"',
                }),
                defineField({
                    name: 'clientsLabel',
                    title: 'Clients Label',
                    type: 'string',
                    initialValue: 'Happy Clients',
                }),
                defineField({
                    name: 'experienceCount',
                    title: 'Experience Count',
                    type: 'string',
                    description: 'e.g. "10+"',
                }),
                defineField({
                    name: 'experienceLabel',
                    title: 'Experience Label',
                    type: 'string',
                    initialValue: 'Years Experience',
                }),
                defineField({
                    name: 'supportCount',
                    title: 'Support Count',
                    type: 'string',
                    description: 'e.g. "24/7"',
                }),
                defineField({
                    name: 'supportLabel',
                    title: 'Support Label',
                    type: 'string',
                    initialValue: 'Support Available',
                }),
            ],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'logo',
        },
    },
})
