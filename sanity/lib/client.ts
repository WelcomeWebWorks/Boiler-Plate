import { createClient, type QueryParams, type ResponseQueryOptions } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false to ensure fresh data for ISR and revalidation
})

// Wrapper to enforce default caching strategy
export const client = {
  ...sanityClient,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetch: async <R = any>(query: string, params: QueryParams = {}, options: ResponseQueryOptions = {}) => {
    return sanityClient.fetch<R>(query, params, {
      ...options,
      next: {
        revalidate: 60, // Default ISR revalidation time in seconds
        ...options.next,
      },
    })
  },
}
