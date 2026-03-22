import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const FAQAccordionBlock: Block = {
  slug: 'faqAccordionBlock',
  interfaceName: 'FAQAccordionBlock',
  labels: {
    singular: 'FAQ Accordéon',
    plural: 'FAQ Accordéons',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      admin: {
        description: 'Titre de la section FAQ (ex: Questions fréquentes)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Texte d\'introduction avant les questions',
      },
    },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'manual',
      options: [
        { label: 'Saisie manuelle', value: 'manual' },
        { label: 'Depuis la collection FAQ', value: 'collection' },
      ],
      admin: {
        description: 'Source des questions : saisie directe ou depuis la collection FAQ',
      },
    },
    {
      name: 'faqs',
      type: 'relationship',
      relationTo: 'faq',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData?.source === 'collection',
        description: 'Sélectionnez les FAQ à afficher',
      },
    },
    {
      name: 'items',
      type: 'array',
      labels: {
        singular: 'Question',
        plural: 'Questions',
      },
      admin: {
        condition: (_, siblingData) => siblingData?.source === 'manual',
        initCollapsed: true,
        description: 'Questions et réponses personnalisées',
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
      ],
    },
  ],
}
