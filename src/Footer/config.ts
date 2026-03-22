import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Navigation',
  },
  fields: [
    {
      name: 'companyDescription',
      type: 'textarea',
      localized: true,
      admin: {
        description: "Courte description de l'entreprise affichée dans le footer",
      },
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 8,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'contact',
      type: 'group',
      admin: {
        description: 'Coordonnées affichées dans le footer',
      },
      fields: [
        {
          name: 'phone',
          type: 'text',
          validate: (value: string | null | undefined) => {
            if (!value) return true
            const phoneRegex = /^\+?[\d\s\-().]{7,20}$/
            if (!phoneRegex.test(value)) {
              return 'Veuillez entrer un numéro de téléphone valide (ex: +1 819 555-0123)'
            }
            return true
          },
          admin: {
            description: 'Numéro de téléphone (ex: +1 819 555-0123)',
          },
        },
        {
          name: 'email',
          type: 'email',
        },
        {
          name: 'address',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'Adresse postale',
          },
        },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      localized: true,
      admin: {
        description: "Texte de copyright (ex: © 2026 Solutions d'eau Bourgelas)",
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
