import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  access: {
    create: anyone,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'organization', 'email', 'sector', 'createdAt'],
    group: 'Contenu',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Nom complet du demandeur',
      },
    },
    {
      name: 'organization',
      type: 'text',
      admin: {
        description: 'Municipalité ou entreprise',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'sector',
      type: 'select',
      options: [
        { label: 'Municipal', value: 'municipal' },
        { label: 'Agricole', value: 'agricultural' },
        { label: 'Industriel', value: 'industrial' },
        { label: 'Autre', value: 'other' },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Détails techniques du projet',
      },
    },
    {
      name: 'locale',
      type: 'text',
      admin: {
        description: 'Langue utilisée lors de la soumission',
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'Nouveau', value: 'new' },
        { label: 'En cours', value: 'in_progress' },
        { label: 'Traité', value: 'completed' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
