import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'

export const Faq: CollectionConfig = {
  slug: 'faq',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'order', 'updatedAt'],
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'answer',
      type: 'richText',
      required: true,
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Général', value: 'general' },
        { label: 'Normes NFPA', value: 'nfpa' },
        { label: 'Certifications RBQ', value: 'rbq' },
        { label: 'Maintenance Industrielle', value: 'maintenance' },
        { label: 'Bornes sèches', value: 'bornes-seches' },
        { label: 'Installation', value: 'installation' },
      ],
      defaultValue: 'general',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: "Ordre d'affichage (0 = premier)",
      },
    },
  ],
  timestamps: true,
}
