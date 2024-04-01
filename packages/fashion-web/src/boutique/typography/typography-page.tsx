// cspell:disable
import {
  ZBooleanSwitch,
  ZBox,
  ZCaption,
  ZCard,
  ZH1,
  ZH2,
  ZH3,
  ZH4,
  ZH5,
  ZH6,
  ZIconFontAwesome,
  ZOverline,
  ZParagraph,
  ZStack,
  ZSubtitle
} from '@zthun/fashion-react';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import React, { useState } from 'react';
import { ZFashionRouteTypography } from '../../routes.mjs';
import { ZChoiceDropDownFashion } from '../common/choice-drop-down-fashion';
import { useFashionState } from '../common/use-fashion-state.mjs';

/**
 * Represents a demo for typography.
 *
 * @returns The JSX to render the typography demo page.
 */
export function ZTypographyPage() {
  const [compact, setCompact] = useState(false);
  const [, fashion, setFashion] = useFashionState();

  return (
    <ZCard
      className='ZTypographyPage-root'
      heading={ZFashionRouteTypography.name}
      subHeading={ZFashionRouteTypography.description}
      avatar={<ZIconFontAwesome name={ZFashionRouteTypography.avatar} width={ZSizeFixed.Medium} />}
    >
      <ZH3>Description</ZH3>

      <ZParagraph>
        Typography is the concept of a document outline. HTML essentially has this built in with different tags, such as
        &lt;p&gt;. The main reason to use custom typography in your applications is for responsiveness. As you shrink
        and resize the window, or if users access your page on small devices, you want the page to respond to changes
        made.
      </ZParagraph>

      <ZH1 fashion={fashion} compact={compact} name='heading-1'>
        Heading 1
      </ZH1>
      <ZH2 fashion={fashion} compact={compact} name='heading-2'>
        Heading 2
      </ZH2>
      <ZH3 fashion={fashion} compact={compact} name='heading-3'>
        Heading 3
      </ZH3>
      <ZH4 fashion={fashion} compact={compact} name='heading-4'>
        Heading 4
      </ZH4>
      <ZH5 fashion={fashion} compact={compact} name='heading-5'>
        Heading 5
      </ZH5>
      <ZH6 fashion={fashion} compact={compact} name='heading-6'>
        Heading 6
      </ZH6>

      <hr />
      <ZParagraph fashion={fashion} compact={compact} name='body'>
        Paragraph: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Nec dui nunc mattis enim. Velit laoreet id donec ultrices tincidunt arcu. In mollis nunc
        sed id semper. Aliquet lectus proin nibh nisl condimentum id venenatis. Convallis aenean et tortor at risus.
        Fringilla phasellus faucibus scelerisque eleifend. Eu sem integer vitae justo eget magna fermentum iaculis eu.
        Enim sit amet venenatis urna cursus. Nisl suscipit adipiscing bibendum est ultricies integer. In hendrerit
        gravida rutrum quisque non tellus. Adipiscing tristique risus nec feugiat in fermentum posuere urna nec. Quam
        adipiscing vitae proin sagittis nisl rhoncus.
      </ZParagraph>

      <hr />
      <ZSubtitle fashion={fashion} compact={compact} name='subtitle'>
        Subtitle: Pulvinar elementum integer enim neque volutpat ac. Ullamcorper a lacus vestibulum sed. Risus pretium
        quam vulputate dignissim suspendisse in est ante.
      </ZSubtitle>

      <hr />
      <ZCaption fashion={fashion} compact={compact} name='caption'>
        Caption: Viverra maecenas accumsan lacus vel facilisis volutpat est.
      </ZCaption>

      <hr />
      <ZOverline fashion={fashion} compact={compact} name='overline'>
        Overline: Pretium quam vulputate dignissim suspendisse.
      </ZOverline>

      <ZBox margin={{ top: ZSizeFixed.Medium }}>
        <ZH3>Options</ZH3>
        <ZStack gap={ZSizeFixed.Small}>
          <ZBooleanSwitch value={compact} onValueChange={setCompact} name='compact' label='Compact' />
          <ZChoiceDropDownFashion value={fashion} onValueChange={setFashion} name='fashion' />
        </ZStack>
      </ZBox>
    </ZCard>
  );
}
