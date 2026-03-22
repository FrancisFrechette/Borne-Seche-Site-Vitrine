import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const payload = await getPayload({ config: configPromise })

    // First, upload a placeholder image for the hero background
    let heroImageId: string | undefined

    const existingMedia = await payload.find({
      collection: 'media',
      where: { filename: { contains: 'hero-placeholder' } },
      limit: 1,
    })

    if (existingMedia.docs.length > 0) {
      heroImageId = existingMedia.docs[0].id
    }

    // Seed Home Global - French
    await payload.updateGlobal({
      slug: 'home',
      locale: 'fr',
      data: {
        title: "Accueil — Solutions d'eau Bourgelas",
        metaDescription:
          'Experts en bornes sèches, réservoirs incendie et infrastructures hydrauliques pour municipalités et agriculteurs.',
        layout: [
          {
            blockType: 'heroBlock',
            heading: 'Votre partenaire en protection incendie rurale',
            subheading:
              "Depuis plus de 30 ans, nous concevons, installons et entretenons des systèmes d'alimentation en eau pour la protection contre les incendies.",
            cta: {
              type: 'custom',
              url: '/fr/contact',
              label: 'Demander une soumission',
              appearance: 'default',
            },
            ...(heroImageId ? { backgroundImage: heroImageId } : {}),
          },
          {
            blockType: 'statsBlock',
            heading: 'Pourquoi nous faire confiance',
            stats: [
              { value: '30+', label: "Années d'expérience" },
              { value: '300+', label: 'Installations complétées' },
              { value: '100%', label: 'Conformité réglementaire' },
              { value: '24/7', label: "Service d'urgence" },
            ],
          },
          {
            blockType: 'videoBlock',
            heading: "L'expertise Bourgelas en action",
            description:
              "Découvrez comment nous concevons et installons des systèmes d'alimentation en eau durables et conformes.",
            youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          },
          {
            blockType: 'faqAccordionBlock',
            heading: 'Questions fréquentes',
            description:
              'Retrouvez les réponses aux questions les plus courantes sur nos services et nos installations.',
            source: 'manual',
            items: [
              {
                question: "Qu'est-ce qu'une borne sèche ?",
                answer: {
                  root: {
                    type: 'root',
                    children: [
                      {
                        type: 'paragraph',
                        children: [
                          {
                            type: 'text',
                            text: "Une borne sèche est un dispositif de raccordement permettant aux pompiers d'accéder rapidement à une source d'eau. Elle est raccordée à un réseau d'alimentation souterrain.",
                          },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    version: 1,
                  },
                },
              },
              {
                question: 'Quelles municipalités desservez-vous ?',
                answer: {
                  root: {
                    type: 'root',
                    children: [
                      {
                        type: 'paragraph',
                        children: [
                          {
                            type: 'text',
                            text: "Nous desservons l'ensemble du Québec, avec une expertise particulière dans les régions rurales et semi-urbaines.",
                          },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    version: 1,
                  },
                },
              },
              {
                question: "Offrez-vous des services d'entretien ?",
                answer: {
                  root: {
                    type: 'root',
                    children: [
                      {
                        type: 'paragraph',
                        children: [
                          {
                            type: 'text',
                            text: "Oui, nous proposons des contrats d'entretien préventif et des inspections régulières pour garantir le bon fonctionnement de vos installations.",
                          },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    version: 1,
                  },
                },
              },
            ],
          },
          {
            blockType: 'cta',
            richText: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'heading',
                    tag: 'h2',
                    children: [
                      {
                        type: 'text',
                        text: 'Prêt à sécuriser votre territoire ?',
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    version: 1,
                  },
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        text: "Contactez nos experts dès aujourd'hui pour une évaluation gratuite de vos besoins.",
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
              },
            },
            links: [
              {
                link: {
                  type: 'custom',
                  url: '/fr/contact',
                  label: 'Demander une soumission',
                  appearance: 'default',
                },
              },
            ],
          },
        ],
      },
    })

    // Seed Home Global - English
    await payload.updateGlobal({
      slug: 'home',
      locale: 'en',
      data: {
        title: 'Home — Bourgelas Water Solutions',
        metaDescription:
          'Experts in dry hydrants, fire reservoirs and hydraulic infrastructure for municipalities and farmers.',
        layout: [
          {
            blockType: 'heroBlock',
            heading: 'Your partner in rural fire protection',
            subheading:
              'For over 30 years, we have been designing, installing and maintaining water supply systems for fire protection.',
            cta: {
              type: 'custom',
              url: '/en/contact',
              label: 'Request a quote',
              appearance: 'default',
            },
            ...(heroImageId ? { backgroundImage: heroImageId } : {}),
          },
          {
            blockType: 'statsBlock',
            heading: 'Why trust us',
            stats: [
              { value: '30+', label: 'Years of experience' },
              { value: '300+', label: 'Completed installations' },
              { value: '100%', label: 'Regulatory compliance' },
              { value: '24/7', label: 'Emergency service' },
            ],
          },
          {
            blockType: 'videoBlock',
            heading: 'Bourgelas expertise in action',
            description:
              'Discover how we design and install durable, compliant water supply systems.',
            youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          },
          {
            blockType: 'faqAccordionBlock',
            heading: 'Frequently asked questions',
            description:
              'Find answers to the most common questions about our services and installations.',
            source: 'manual',
            items: [
              {
                question: 'What is a dry hydrant?',
                answer: {
                  root: {
                    type: 'root',
                    children: [
                      {
                        type: 'paragraph',
                        children: [
                          {
                            type: 'text',
                            text: 'A dry hydrant is a connection device that allows firefighters to quickly access a water source. It is connected to an underground supply network.',
                          },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    version: 1,
                  },
                },
              },
              {
                question: 'Which municipalities do you serve?',
                answer: {
                  root: {
                    type: 'root',
                    children: [
                      {
                        type: 'paragraph',
                        children: [
                          {
                            type: 'text',
                            text: 'We serve all of Quebec, with particular expertise in rural and semi-urban areas.',
                          },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    version: 1,
                  },
                },
              },
              {
                question: 'Do you offer maintenance services?',
                answer: {
                  root: {
                    type: 'root',
                    children: [
                      {
                        type: 'paragraph',
                        children: [
                          {
                            type: 'text',
                            text: 'Yes, we offer preventive maintenance contracts and regular inspections to ensure the proper functioning of your installations.',
                          },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    version: 1,
                  },
                },
              },
            ],
          },
          {
            blockType: 'cta',
            richText: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'heading',
                    tag: 'h2',
                    children: [
                      {
                        type: 'text',
                        text: 'Ready to secure your territory?',
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    version: 1,
                  },
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        text: 'Contact our experts today for a free assessment of your needs.',
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
              },
            },
            links: [
              {
                link: {
                  type: 'custom',
                  url: '/en/contact',
                  label: 'Request a quote',
                  appearance: 'default',
                },
              },
            ],
          },
        ],
      },
    })

    // Seed Header Global
    await payload.updateGlobal({
      slug: 'header',
      locale: 'fr',
      data: {
        logoAlt: "Solutions d'eau Bourgelas",
        navItems: [
          { link: { type: 'custom', url: '/fr/services', label: 'Services' } },
          { link: { type: 'custom', url: '/fr/realisations', label: 'Réalisations' } },
          { link: { type: 'custom', url: '/fr/about', label: 'À propos' } },
          { link: { type: 'custom', url: '/fr/faq', label: 'FAQ' } },
          { link: { type: 'custom', url: '/fr/contact', label: 'Contact' } },
        ],
        ctaButton: {
          enabled: true,
          link: {
            type: 'custom',
            url: '/fr/contact',
            label: 'Demander une soumission',
            appearance: 'default',
          },
        },
      },
    })

    await payload.updateGlobal({
      slug: 'header',
      locale: 'en',
      data: {
        logoAlt: 'Bourgelas Water Solutions',
        navItems: [
          { link: { type: 'custom', url: '/en/services', label: 'Services' } },
          { link: { type: 'custom', url: '/en/realisations', label: 'Projects' } },
          { link: { type: 'custom', url: '/en/about', label: 'About' } },
          { link: { type: 'custom', url: '/en/faq', label: 'FAQ' } },
          { link: { type: 'custom', url: '/en/contact', label: 'Contact' } },
        ],
        ctaButton: {
          enabled: true,
          link: {
            type: 'custom',
            url: '/en/contact',
            label: 'Request a quote',
            appearance: 'default',
          },
        },
      },
    })

    // Seed Footer Global
    await payload.updateGlobal({
      slug: 'footer',
      locale: 'fr',
      data: {
        companyDescription:
          "Experts en solutions d'eau pour la protection incendie depuis plus de 30 ans.",
        navItems: [
          { link: { type: 'custom', url: '/fr/services', label: 'Services' } },
          { link: { type: 'custom', url: '/fr/realisations', label: 'Réalisations' } },
          { link: { type: 'custom', url: '/fr/about', label: 'À propos' } },
          { link: { type: 'custom', url: '/fr/faq', label: 'FAQ' } },
          { link: { type: 'custom', url: '/fr/contact', label: 'Contact' } },
        ],
        contact: {
          email: 'contact@bourgelas.ca',
          phone: '+1 450 555-0123',
          address: 'Québec, Canada',
        },
        copyright: "© 2026 Solutions d'eau Bourgelas. Tous droits réservés.",
      },
    })

    await payload.updateGlobal({
      slug: 'footer',
      locale: 'en',
      data: {
        companyDescription: 'Experts in water solutions for fire protection for over 30 years.',
        navItems: [
          { link: { type: 'custom', url: '/en/services', label: 'Services' } },
          { link: { type: 'custom', url: '/en/realisations', label: 'Projects' } },
          { link: { type: 'custom', url: '/en/about', label: 'About' } },
          { link: { type: 'custom', url: '/en/faq', label: 'FAQ' } },
          { link: { type: 'custom', url: '/en/contact', label: 'Contact' } },
        ],
        contact: {
          email: 'contact@bourgelas.ca',
          phone: '+1 450 555-0123',
          address: 'Quebec, Canada',
        },
        copyright: '© 2026 Bourgelas Water Solutions. All rights reserved.',
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Home, Header, and Footer seeded for FR and EN',
    })
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
