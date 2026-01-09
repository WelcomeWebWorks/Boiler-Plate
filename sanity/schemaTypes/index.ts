import { type SchemaTypeDefinition } from 'sanity'
import { hero } from './hero'

import { about } from './about'
import { service } from './service'
import { testimonial } from './testimonial'
import { post } from './post'
import { contact } from './contact'
import { siteSettings } from './siteSettings'


import { legalPage } from './legalPage'
import { newsletter } from './newsletter'
import { seo } from './objects/seo'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [hero, about, service, testimonial, post, contact, siteSettings, legalPage, newsletter, seo],
}
