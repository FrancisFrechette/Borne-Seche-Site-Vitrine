import type { Block } from 'payload'

import { link } from '@/fields/link'

export const HeroBlock: Block = {
  slug: 'heroBlock',
  interfaceName: 'HeroBlock',
  labels: {
    singular: 'Hero',
    plural: 'Heros',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Titre H1 principal affiché dans le hero',
      },
    },
    {
      name: 'subheading',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Sous-titre affiché sous le H1',
      },
    },
    link({
      appearances: ['default', 'outline'],
      overrides: {
        name: 'cta',
        label: "Bouton d'action (CTA)",
      },
    }),
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: "Image d'arrière-plan du hero (format paysage recommandé, min 1920px)",
      },
    },
  ],
}
