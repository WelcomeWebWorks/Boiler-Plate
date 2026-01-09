import { defineField, defineType } from 'sanity'

export const newsletter = defineType({
    name: 'newsletter',
    title: 'Newsletter Subscribers',
    type: 'document',
    fields: [
        defineField({
            name: 'email',
            title: 'Email Address',
            type: 'string',
            validation: (Rule) => Rule.required().email(),
        }),
        defineField({
            name: 'status',
            title: 'Subscription Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Subscribed', value: 'subscribed' },
                    { title: 'Unsubscribed', value: 'unsubscribed' },
                    { title: 'Pending', value: 'pending' },
                ],
            },
            initialValue: 'subscribed',
        }),
        defineField({
            name: 'deviceDetails',
            title: 'Device Details',
            type: 'text',
            description: 'JSON string of user agent and other device info',
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'object',
            fields: [
                defineField({ name: 'latitude', type: 'number' }),
                defineField({ name: 'longitude', type: 'number' }),
            ],
        }),
        defineField({
            name: 'subscribedAt',
            title: 'Subscribed At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
    ],
    preview: {
        select: {
            title: 'email',
            subtitle: 'status',
        },
    },
})
