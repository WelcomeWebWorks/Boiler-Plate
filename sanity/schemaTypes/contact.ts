import { defineField, defineType } from 'sanity'

export const contact = defineType({
  name: 'contact',
  title: 'Contact Information',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Internal title (e.g., "Main Contact Info")',
      initialValue: 'Contact Information',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phoneNumbers',
      title: 'Phone Numbers',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Add one or more phone numbers',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'locationLink',
      title: 'Google Maps Location Link',
      type: 'url',
      description: 'URL to the location on Google Maps',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'email',
    },
  },
})
