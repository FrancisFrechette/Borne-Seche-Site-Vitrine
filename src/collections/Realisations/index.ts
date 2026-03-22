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
import { revalidateRealisation, revalidateRealisationDelete } from './hooks/revalidateRealisation'

export const Realisations: CollectionConfig = {
  slug: 'realisations',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'client', 'location', 'updatedAt'],
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
        description: 'Court résumé de la réalisation',
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
          label: 'Données Techniques',
          fields: [
            {
              name: 'technicalStats',
              type: 'array',
              label: 'Statistiques Techniques',
              labels: {
                singular: 'Statistique',
                plural: 'Statistiques',
              },
              admin: {
                description:
                  'Données affichées dans les Blueprint Cards (ex: Débit, Population, Durée)',
              },
              fields: [
                {
                  name: 'icon',
                  type: 'text',
                  admin: {
                    description: "Nom de l'icône (ex: waves, groups, timer)",
                  },
                },
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  localized: true,
                  admin: {
                    description: 'Ex: Débit Maximal, Impact Citoyen',
                  },
                },
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                  localized: true,
                  admin: {
                    description: 'Ex: 5000, 50k, 6',
                  },
                },
                {
                  name: 'unit',
                  type: 'text',
                  localized: true,
                  admin: {
                    description: 'Ex: GPM, Résidents, Mois',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  localized: true,
                  admin: {
                    description: 'Courte description sous la statistique',
                  },
                },
              ],
            },
            {
              name: 'challenge',
              type: 'textarea',
              localized: true,
              admin: {
                description: 'Description du défi structural du projet',
              },
            },
            {
              name: 'solution',
              type: 'textarea',
              localized: true,
              admin: {
                description: 'La réponse Bourgelas au défi',
              },
            },
            {
              name: 'highlights',
              type: 'array',
              label: 'Points forts',
              labels: {
                singular: 'Point fort',
                plural: 'Points forts',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'description',
                  type: 'text',
                  localized: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Détails',
          fields: [
            {
              name: 'client',
              type: 'text',
              localized: true,
              admin: {
                description: 'Nom du client (municipalité, entreprise, etc.)',
              },
            },
            {
              name: 'location',
              type: 'text',
              localized: true,
              admin: {
                description: 'Lieu de la réalisation',
              },
            },
            {
              name: 'completionDate',
              type: 'date',
              admin: {
                date: {
                  pickerAppearance: 'dayOnly',
                },
                description: 'Date de réalisation du projet',
              },
            },
            {
              name: 'sectors',
              type: 'relationship',
              relationTo: 'sectors',
              hasMany: true,
              admin: {
                description: 'Secteurs liés à cette réalisation',
              },
            },
            {
              name: 'services',
              type: 'relationship',
              relationTo: 'services',
              hasMany: true,
              admin: {
                description: 'Services utilisés dans cette réalisation',
              },
            },
          ],
        },
        {
          label: 'Galerie',
          fields: [
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Image principale de la réalisation',
              },
            },
            {
              name: 'gallery',
              type: 'array',
              admin: {
                description: 'Galerie photos du projet',
                initCollapsed: true,
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
                },
              ],
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
    slugField(),
  ],
  hooks: {
    afterChange: [revalidateRealisation],
    afterDelete: [revalidateRealisationDelete],
  },
  timestamps: true,
}
