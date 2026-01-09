'use server'

import { siteConfig } from '@/config/site'

import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

const newsletterSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address.' }),
})

import { writeClient } from '@/sanity/lib/write-client'

export type NewsletterFormState = {
    success: boolean
    message: string
}

export async function subscribeNewsletter(prevState: NewsletterFormState, formData: FormData): Promise<NewsletterFormState> {
    const validatedFields = newsletterSchema.safeParse({
        email: formData.get('email'),
    })

    if (!validatedFields.success) {
        return {
            success: false,
            message: 'Please enter a valid email address.',
        }
    }

    const { email } = validatedFields.data
    const userAgent = formData.get('userAgent') as string || 'Unknown'

    // Check if write token is configured
    if (!process.env.SANITY_API_WRITE_TOKEN) {
        console.error("❌ Missing SANITY_API_WRITE_TOKEN in environment variables. Cannot write to Sanity.")
        return {
            success: false,
            message: 'System configuration error. Please contact support.',
        }
    }

    // Parse location if provided
    let location = undefined
    const latStr = formData.get('latitude') as string
    const longStr = formData.get('longitude') as string

    if (latStr && longStr) {
        location = {
            latitude: parseFloat(latStr),
            longitude: parseFloat(longStr)
        }
    }

    try {
        // Save to Sanity
        await writeClient.create({
            _type: 'newsletter',
            email,
            status: 'subscribed',
            deviceDetails: JSON.stringify({ userAgent }),
            location,
            subscribedAt: new Date().toISOString()
        })

        // Send notification to the client/admin about new subscriber
        const data = await resend.emails.send({
            from: process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev',
            to: process.env.CONTACT_TO_EMAIL || 'your-email@gmail.com',
            subject: '🎉 New Newsletter Subscription!',
            text: `New subscriber: ${email}`,
            html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Newsletter Subscription</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td style="padding: 40px 0;">
                <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">
                                🎉 New Newsletter Subscriber!
                            </h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                Great news! Someone just subscribed to your newsletter.
                            </p>
                            
                            <!-- Subscriber Info Card -->
                            <table role="presentation" style="width: 100%; background-color: #f3f4f6; border-radius: 12px; margin: 24px 0;">
                                <tr>
                                    <td style="padding: 24px;">
                                        <p style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px 0;">
                                            Subscriber Email
                                        </p>
                                        <p style="color: #111827; font-size: 18px; font-weight: 600; margin: 0;">
                                            ${email}
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 24px 0 0 0;">
                                This subscriber is now waiting to receive your latest updates, news, and exclusive content. Make sure to keep them engaged with valuable newsletters!
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9fafb; padding: 24px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                                This notification was sent from your website's newsletter form.
                            </p>
                            <p style="color: #9ca3af; font-size: 12px; margin: 8px 0 0 0;">
                                © ${new Date().getFullYear()} ${siteConfig.name}. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
            `,
        })

        if (data.error) {
            console.error('Resend error:', data.error)
            // Even if email fails, we successfully saved to database, so return success but log error
        }

        // For now, we'll just simulate a delay
        // In production, you would add the email to your newsletter service (Resend, Mailchimp, etc.)
        console.log(`Subscribing ${email} to ${siteConfig.name} newsletter`)
        return {
            success: true,
            message: 'Successfully subscribed to newsletter!',
        }
    } catch (error) {
        console.error('Server error:', error)
        return {
            success: false,
            message: 'Something went wrong. Please try again later.',
        }
    }
}
