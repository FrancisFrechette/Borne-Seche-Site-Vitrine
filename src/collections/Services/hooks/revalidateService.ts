import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateService: CollectionAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/services/${doc.slug}`

    payload.logger.info(`Revalidating service at path: ${path}`)

    revalidatePath(`/fr${path}`)
    revalidatePath(`/en${path}`)
    revalidateTag('services-sitemap')
  }

  return doc
}

export const revalidateServiceDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/services/${doc?.slug}`
    revalidatePath(`/fr${path}`)
    revalidatePath(`/en${path}`)
    revalidateTag('services-sitemap')
  }

  return doc
}
