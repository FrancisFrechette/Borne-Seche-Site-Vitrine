import type { Block } from 'payload'

export const MediaGridBlock: Block = {
  slug: 'mediaGridBlock',
  interfaceName: 'MediaGridBlock',
  labels: {
    singular: 'Grille Médias',
    plural: 'Grilles Médias',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      admin: {
        description: 'Titre optionnel de la galerie',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Texte d\'introduction au-dessus de la grille',
      },
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2 colonnes', value: '2' },
        { label: '3 colonnes', value: '3' },
        { label: '4 colonnes', value: '4' },
      ],
      admin: {
        description: 'Nombre de colonnes dans la grille',
      },
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 12,
      labels: {
        singular: 'Image',
        plural: 'Images',
      },
      admin: {
        initCollapsed: true,
        description: 'Images de la grille (max 12)',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          localized: true,
          admin: {
            description: 'Légende optionnelle sous l\'image',
          },
        },
      ],
    },
  ],
}
