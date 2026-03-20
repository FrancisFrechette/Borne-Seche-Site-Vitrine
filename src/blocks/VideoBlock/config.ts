import type { Block } from 'payload'

export const VideoBlock: Block = {
  slug: 'videoBlock',
  interfaceName: 'VideoBlock',
  labels: {
    singular: 'Vidéo',
    plural: 'Vidéos',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      admin: {
        description: 'Titre de la section vidéo',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Texte d\'introduction avant la vidéo',
      },
    },
    {
      name: 'youtubeUrl',
      type: 'text',
      required: true,
      admin: {
        description: 'URL complète de la vidéo YouTube (ex: https://www.youtube.com/watch?v=xxxxx)',
      },
      validate: (value: string | null | undefined) => {
        if (!value) return 'L\'URL YouTube est requise'
        if (
          !value.includes('youtube.com/watch') &&
          !value.includes('youtu.be/') &&
          !value.includes('youtube.com/embed/')
        ) {
          return 'Veuillez entrer une URL YouTube valide'
        }
        return true
      },
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Image de couverture personnalisée (optionnel, sinon la miniature YouTube sera utilisée)',
      },
    },
  ],
}
