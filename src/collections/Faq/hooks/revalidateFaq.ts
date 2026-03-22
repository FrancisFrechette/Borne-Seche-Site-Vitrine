import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateFaq: CollectionAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating FAQ page`)

    revalidatePath('/fr/faq')
    revalidatePath('/en/faq')
    revalidateTag('faq')
  }

  return doc
}

export const revalidateFaqDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidatePath('/fr/faq')
    revalidatePath('/en/faq')
    revalidateTag('faq')
  }

  return doc
}
