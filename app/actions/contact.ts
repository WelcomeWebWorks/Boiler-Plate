'use server'

import { Resend } from 'resend'
import { z } from 'zod'

import { siteConfig } from '@/config/site'

const resend = new Resend(process.env.RESEND_API_KEY)

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
})

export type ContactFormState = {
  success: boolean
  message: string
  errors?: {
    [K in keyof z.infer<typeof contactFormSchema>]?: string[]
  }
}

export async function sendContactEmail(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  const validatedFields = contactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  })

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Please check the form for errors.',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, email, subject, message } = validatedFields.data

  try {
    const data = await resend.emails.send({
      from: `${siteConfig.name} <onboarding@resend.dev>`,
      to: ['your-email@gmail.com'], // Replace with actual email
      replyTo: email,
      subject: `New Contact Form Submission - ${siteConfig.name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })

    if (data.error) {
      console.error('Resend error:', data.error)
      return {
        success: false,
        message: 'Failed to send email. Please try again later.',
      }
    }

    return {
      success: true,
      message: 'Message sent successfully! We will be replied you very shortly.',
    }
  } catch (error) {
    console.error('Server error:', error)
    return {
      success: false,
      message: 'Something went wrong. Please try again later.',
    }
  }
}
