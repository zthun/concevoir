import {
  useFashionTheme,
  ZBox,
  ZCard,
  ZChoiceDropDown,
  ZGrid,
  ZH3,
  ZImageSource,
  ZParagraph
} from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { IZFashion } from '@zthun/fashion-theme';
import { setFirst } from '@zthun/helpful-fn';
import { identity } from 'lodash';
import React, { useState } from 'react';
import { ZFashionRouteCard } from '../../routes';

/**
 * Represents a demo for cards.
 *
 * @returns The JSX to render the alerts demo page.
 */
export function ZCardPage() {
  const { primary, secondary, success, warning, error, info, light, dark, surface } = useFashionTheme();
  const [fashion, setFashion] = useState<IZFashion>(surface);
  const _setFashion = setFirst.bind(null, setFashion, primary);
  const designs = [surface, primary, secondary, success, warning, error, info, light, dark];

  return (
    <ZCard
      className='ZCardPage-root'
      heading={ZFashionRouteCard.name}
      subHeading={ZFashionRouteCard.description}
      fashion={fashion}
      avatar={<ZImageSource src={ZFashionRouteCard.avatar} height={ZSizeFixed.Medium} />}
    >
      <ZBox padding={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZParagraph>
          Cards allow for sectioned content and are very responsive and mobile friendly. Favor putting things in cards
          to create desireable experiences for your users.
        </ZParagraph>
      </ZBox>

      <ZBox padding={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Options</ZH3>
        <ZGrid gap={ZSizeFixed.Medium}>
          <ZChoiceDropDown
            label='Fashion'
            indelible
            value={[fashion]}
            onValueChange={_setFashion}
            options={designs}
            renderOption={(f) => f.name}
            identifier={identity}
            name='fashion'
          />
        </ZGrid>
      </ZBox>
    </ZCard>
  );
}
