import type { GlobalConfig } from 'payload'

import { revalidateAbout } from './hooks/revalidateAbout'

export const About: GlobalConfig = {
  slug: 'about',
  label: 'À propos',
  admin: {
    group: 'Contenu',
  },
  fields: [
    {
      name: 'heroTitle',
      type: 'text',
      localized: true,
      admin: {
        description: 'Titre principal de la section héro',
      },
    },
    {
      name: 'heroSubtitle',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Sous-titre descriptif',
      },
    },
    {
      name: 'timeline',
      type: 'array',
      label: 'Ligne du temps',
      labels: {
        singular: 'Étape',
        plural: 'Étapes',
      },
      fields: [
        {
          name: 'year',
          type: 'text',
          required: true,
          admin: {
            description: 'Ex: 1994, 2008, 2024',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
      ],
    },
    {
      name: 'values',
      type: 'array',
      label: 'Valeurs & Équipe',
      labels: {
        singular: 'Valeur',
        plural: 'Valeurs',
      },
      fields: [
        {
          name: 'icon',
          type: 'text',
          admin: {
            description: 'Nom icône (ex: precision_manufacturing, water_drop)',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'isBlueprint',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Utiliser le style Blueprint Card au lieu du style standard',
          },
        },
      ],
    },
    {
      name: 'ctaTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'ctaDescription',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'ctaButton',
      type: 'text',
      localized: true,
    },
  ],
  hooks: {
    afterChange: [revalidateAbout],
  },
}
