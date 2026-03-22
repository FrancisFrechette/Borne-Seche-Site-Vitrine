import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateRealisation: CollectionAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/realisations/${doc.slug}`

    payload.logger.info(`Revalidating realisation at path: ${path}`)

    revalidatePath(`/fr${path}`)
    revalidatePath(`/en${path}`)
    revalidateTag('realisations-sitemap')
  }

  return doc
}

export const revalidateRealisationDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/realisations/${doc?.slug}`
    revalidatePath(`/fr${path}`)
    revalidatePath(`/en${path}`)
    revalidateTag('realisations-sitemap')
  }

  return doc
}
