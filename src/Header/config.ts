import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Navigation',
  },
  fields: [
    {
      name: 'logoAlt',
      type: 'text',
      localized: true,
      defaultValue: 'Solutions d\'eau Bourgelas',
      admin: {
        description: 'Texte alternatif du logo (accessibilité)',
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
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'ctaButton',
      type: 'group',
      admin: {
        description: 'Bouton d\'action principal dans le header (ex: Demander une soumission)',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
        },
        link({
          appearances: ['default', 'outline'],
          overrides: {
            admin: {
              condition: (_data, siblingData) => Boolean(siblingData?.enabled),
            },
          },
        }),
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
