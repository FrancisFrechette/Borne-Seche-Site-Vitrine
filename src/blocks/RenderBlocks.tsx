import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FAQAccordionBlockComponent } from '@/blocks/FAQAccordionBlock/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { HeroBlockComponent } from '@/blocks/HeroBlock/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { MediaGridBlockComponent } from '@/blocks/MediaGridBlock/Component'
import { StatsBlockComponent } from '@/blocks/StatsBlock/Component'
import { VideoBlockComponent } from '@/blocks/VideoBlock/Component'

const blockComponents: Record<string, React.FC<any>> = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  faqAccordionBlock: FAQAccordionBlockComponent,
  formBlock: FormBlock,
  heroBlock: HeroBlockComponent,
  mediaBlock: MediaBlock,
  mediaGridBlock: MediaGridBlockComponent,
  statsBlock: StatsBlockComponent,
  videoBlock: VideoBlockComponent,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][] | any[]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div key={index}>
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
