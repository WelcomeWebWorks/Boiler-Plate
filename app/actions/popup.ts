'use server'

import { siteConfig } from '@/config/site'

import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

const popupFormSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    service: z.string().min(1, { message: 'Please select a service.' }),
    message: z.string().optional(),
})

export type PopupFormState = {
    success: boolean
    message: string
}

export async function submitPopupForm(prevState: PopupFormState, formData: FormData): Promise<PopupFormState> {
    const validatedFields = popupFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        service: formData.get('service'),
        message: formData.get('message'),
    })

    if (!validatedFields.success) {
        return {
            success: false,
            message: 'Please fill all required fields correctly.',
        }
    }

    const { name, email, service, message } = validatedFields.data

    try {
        const data = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: ['your-email@gmail.com'], // Replace with actual email
            replyTo: email,
            subject: `New Service Inquiry (${service}) - ${siteConfig.name}`,
            text: `Name: ${name}\nEmail: ${email}\nService: ${service}\nMessage: ${message || 'No message provided'}`,
            html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Lead from Website</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td style="padding: 40px 0;">
                <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">
                                🎯 New Lead Alert!
                            </h1>
                            <p style="color: #ffffff; opacity: 0.9; margin: 10px 0 0 0; font-size: 16px;">
                                Someone is interested in your services
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                                Great news! A potential customer has shown interest through your website popup form.
                            </p>
                            
                            <!-- Lead Info Card -->
                            <table role="presentation" style="width: 100%; background-color: #f3f4f6; border-radius: 12px; margin: 0 0 24px 0;">
                                <tr>
                                    <td style="padding: 24px;">
                                        <table role="presentation" style="width: 100%;">
                                            <tr>
                                                <td style="padding-bottom: 16px;">
                                                    <p style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 4px 0;">Name</p>
                                                    <p style="color: #111827; font-size: 16px; font-weight: 600; margin: 0;">${name}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding-bottom: 16px;">
                                                    <p style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 4px 0;">Email</p>
                                                    <p style="color: #111827; font-size: 16px; font-weight: 600; margin: 0;">
                                                        <a href="mailto:${email}" style="color: #f97316; text-decoration: none;">${email}</a>
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding-bottom: 16px;">
                                                    <p style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 4px 0;">Interested Service</p>
                                                    <p style="color: #111827; font-size: 16px; font-weight: 600; margin: 0;">${service}</p>
                                                </td>
                                            </tr>
                                            ${message ? `
                                            <tr>
                                                <td>
                                                    <p style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 4px 0;">Message</p>
                                                    <p style="color: #374151; font-size: 14px; margin: 0; line-height: 1.6;">${message}</p>
                                                </td>
                                            </tr>
                                            ` : ''}
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0;">
                                💡 <strong>Pro tip:</strong> Respond quickly to convert this lead! Studies show that responding within 5 minutes increases conversion rates by 900%.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9fafb; padding: 24px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                                This lead was captured from your website popup form.
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
            return {
                success: false,
                message: 'Failed to submit. Please try again.',
            }
        }

        return {
            success: true,
            message: 'Thank you! We will contact you soon.',
        }
    } catch (error) {
        console.error('Server error:', error)
        return {
            success: false,
            message: 'Something went wrong. Please try again.',
        }
    }
}
