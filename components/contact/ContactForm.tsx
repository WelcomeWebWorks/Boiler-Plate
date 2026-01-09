'use client'

import { useActionState, startTransition, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { sendContactEmail } from '@/app/actions/contact'
import { Loader2, Send, Check, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
})

type ContactFormValues = z.infer<typeof contactFormSchema>



export function ContactForm() {
  const [state, formAction, isPending] = useActionState(sendContactEmail, {
    success: false,
    message: '',
  })
  const [submissionMethod, setSubmissionMethod] = useState<'email' | 'whatsapp'>('email')
  const [isWhatsAppSuccess, setIsWhatsAppSuccess] = useState(false)
  const [isRestricted, setIsRestricted] = useState(false)

  // Check for 24h restriction on mount
  useEffect(() => {
    const lastSubmission = localStorage.getItem('lastContactSubmission')
    if (lastSubmission) {
      const lastTime = new Date(lastSubmission).getTime()
      const now = new Date().getTime()
      const twentyFourHours = 24 * 60 * 60 * 1000

      if (now - lastTime < twentyFourHours) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsRestricted(true)
      }
    }
  }, [])

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  })

  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message)
        form.reset()
        // Save submission time
        localStorage.setItem('lastContactSubmission', new Date().toISOString())
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsRestricted(true)
      } else {
        toast.error(state.message)
      }
    }
  }, [state, form])

  // Combine server success, local WhatsApp success, or restriction
  const showThankYou = state.success || isWhatsAppSuccess || isRestricted

  if (showThankYou) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12 animate-in fade-in zoom-in duration-500">
        <div className="rounded-full bg-green-100 p-6 mb-6 dark:bg-green-900/30">
          <Check className="size-12 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="font-serif text-3xl font-bold mb-4">Thank You!</h3>
        <p className="text-muted-foreground max-w-md mb-8 text-lg">
          {isRestricted
            ? "Thank you for reaching out! We will reach you as soon as possible. You can submit another request after 24 hours."
            : "We have received your message and will reach you as soon as possible."
          }
        </p>
        {/* Hide 'Send Another' button if restricted */}
        {(!isRestricted && (state.success || isWhatsAppSuccess)) && (
          <Button onClick={() => setIsWhatsAppSuccess(false)} variant="outline" className="gap-2">
            <ArrowLeft className="size-4" />
            Send Another Message
          </Button>
        )}
      </div>
    )
  }

  return (
    <Form {...form}>
      <form
        ref={formRef}
        action={formAction}
        onSubmit={(evt) => {
          evt.preventDefault()
          form.handleSubmit((data) => {
            if (submissionMethod === 'whatsapp') {
              const text = `*New Contact Submission*\n\n*Name:* ${data.name}\n*Email:* ${data.email}\n*Subject:* ${data.subject}\n*Message:* ${data.message}`
              const url = `https://wa.me/919876543210?text=${encodeURIComponent(text)}`
              window.open(url, '_blank')
              setIsWhatsAppSuccess(true)
              // Also restrict for WhatsApp submission
              localStorage.setItem('lastContactSubmission', new Date().toISOString())
              setIsRestricted(true)
            } else {
              startTransition(() => {
                formAction(new FormData(formRef.current!))
              })
            }
          })(evt)
        }}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" autoComplete="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john@example.com" type="email" autoComplete="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="How can we help?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us more about your project..."
                  className="min-h-[150px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-3">
          <Label>Submission Method</Label>
          <RadioGroup
            defaultValue="email"
            onValueChange={(val) => setSubmissionMethod(val as 'email' | 'whatsapp')}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="email" id="email-option" />
              <label htmlFor="email-option" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Contact Us Form Submission (Email)
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="whatsapp" id="whatsapp-option" />
              <label htmlFor="whatsapp-option" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Submit to Client WhatsApp
              </label>
            </div>
          </RadioGroup>
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              {submissionMethod === 'whatsapp' ? 'Send via WhatsApp' : 'Send Message'}
              <Send className="ml-2 size-4" />
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}
