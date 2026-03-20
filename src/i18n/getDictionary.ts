import type { Locale } from './locales'

const dictionaries = {
  fr: () => import('./dictionaries/fr').then((m) => m.default),
  en: () => import('./dictionaries/en').then((m) => m.default),
}

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)['fr']>>

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]()
}
