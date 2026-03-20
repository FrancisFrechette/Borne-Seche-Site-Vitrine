import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'

export const Services: CollectionConfig = {
  slug: 'services',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'order', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      localized: true,
      admin: {
        description: 'Court résumé du service (utilisé dans les cartes et le SEO)',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Contenu',
          fields: [
            {
              name: 'content',
              type: 'richText',
              localized: true,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                  ]
                },
              }),
            },
          ],
        },
        {
          label: 'Spécifications',
          fields: [
            {
              name: 'specs',
              type: 'array',
              label: 'Spécifications Techniques',
              labels: {
                singular: 'Spécification',
                plural: 'Spécifications',
              },
              admin: {
                description: 'Données techniques affichées dans les Blueprint Cards',
              },
              fields: [
                {
                  name: 'category',
                  type: 'text',
                  localized: true,
                  admin: {
                    description: 'Ex: Performance, Résistance, Matériau, Certification',
                  },
                },
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  localized: true,
                  admin: {
                    description: 'Ex: DÉBIT NOMINAL, PRESSION DE SERVICE',
                  },
                },
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                  localized: true,
                  admin: {
                    description: 'Ex: 1500, 250, ACIER GALVANISÉ',
                  },
                },
                {
                  name: 'unit',
                  type: 'text',
                  localized: true,
                  admin: {
                    description: 'Ex: GPM, PSI',
                  },
                },
                {
                  name: 'note',
                  type: 'text',
                  localized: true,
                  admin: {
                    description: 'Ex: Testé @ 20 PSI, ASTM A-53 Grade B',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Médias',
          fields: [
            {
              name: 'icon',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Icône du service (SVG ou PNG recommandé)',
              },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Image principale du service',
              },
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
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
    slugField(),
  ],
  timestamps: true,
}
