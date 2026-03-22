import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateSector: CollectionAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating sector: ${doc.slug}`)

    revalidatePath('/fr')
    revalidatePath('/en')
    revalidateTag('sectors')
  }

  return doc
}

export const revalidateSectorDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidatePath('/fr')
    revalidatePath('/en')
    revalidateTag('sectors')
  }

  return doc
}
