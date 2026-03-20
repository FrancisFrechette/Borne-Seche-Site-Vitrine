import type { Block } from 'payload'

export const StatsBlock: Block = {
  slug: 'statsBlock',
  interfaceName: 'StatsBlock',
  labels: {
    singular: 'Statistiques',
    plural: 'Statistiques',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      admin: {
        description: 'Titre optionnel de la section statistiques',
      },
    },
    {
      name: 'stats',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 6,
      admin: {
        initCollapsed: true,
        description: 'Chiffres clés à afficher (ex: 30+ ans d\'expérience)',
      },
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            description: 'Valeur numérique (ex: "30+", "300+", "100%")',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            description: 'Description du chiffre (ex: "Années d\'expérience")',
          },
        },
        {
          name: 'suffix',
          type: 'text',
          localized: true,
          admin: {
            description: 'Suffixe optionnel (ex: "projets", "clients")',
          },
        },
      ],
    },
  ],
}
