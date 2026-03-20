import type { GlobalConfig } from 'payload'

import { HeroBlock } from '../../blocks/HeroBlock/config'
import { StatsBlock } from '../../blocks/StatsBlock/config'
import { VideoBlock } from '../../blocks/VideoBlock/config'
import { revalidateHome } from './hooks/revalidateHome'

export const Home: GlobalConfig = {
  slug: 'home',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Contenu',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      admin: {
        description: 'Titre interne de la page d\'accueil (utilisé pour le SEO)',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Description META pour le SEO de la page d\'accueil',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [HeroBlock, StatsBlock, VideoBlock],
      required: true,
      admin: {
        description: 'Construisez la page d\'accueil en ajoutant des blocs modulaires',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHome],
  },
}
