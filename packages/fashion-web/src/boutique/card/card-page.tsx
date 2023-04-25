import { ZBooleanSwitch, ZBox, ZButton, ZCard, ZGrid, ZH3, ZImageSource, ZParagraph } from '@zthun/fashion-boutique';
import { ZSizeFixed, ZSizeVaried } from '@zthun/fashion-tailor';
import React, { useState } from 'react';
import { ZFashionRouteCard } from '../../routes';
import { ZChoiceDropDownFashion } from '../common/choice-drop-down-fashion';
import { useFashionState } from '../common/useFashionState';

// cspell: disable
const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
  'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ' +
  'aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit ' +
  'in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur ' +
  'sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt ' +
  'mollit anim id est laborum.';
// cspell: enable

/**
 * Represents a demo for cards.
 *
 * @returns The JSX to render the alerts demo page.
 */
export function ZCardPage() {
  const [fashion, fashionName, setFashion] = useFashionState();
  const [loading, setLoading] = useState(false);

  return (
    <ZCard
      className='ZCardPage-root'
      heading={ZFashionRouteCard.name}
      subHeading={ZFashionRouteCard.description}
      avatar={<ZImageSource src={ZFashionRouteCard.avatar} height={ZSizeFixed.Medium} />}
    >
      <ZBox padding={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZParagraph>
          Cards allow for sectioned content and are very responsive and mobile friendly. Favor putting things in cards
          to create desireable experiences for your users.
        </ZParagraph>

        <ZCard
          width={ZSizeFixed.Small}
          name='card'
          heading='Header'
          subHeading={'Sub Header'}
          fashion={fashion}
          loading={loading}
          avatar={<ZImageSource src='/images/svg/hero.svg' height={ZSizeFixed.Medium} />}
          footer={<ZButton label='Footer' width={ZSizeVaried.Full} />}
        >
          {LOREM}
        </ZCard>
      </ZBox>

      <ZBox padding={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Options</ZH3>

        <ZGrid gap={ZSizeFixed.Medium}>
          <ZBooleanSwitch label='Loading' name='loading' value={loading} onValueChange={setLoading} />
          <ZChoiceDropDownFashion value={fashionName} onValueChange={setFashion} name='fashion' />
        </ZGrid>
      </ZBox>
    </ZCard>
  );
}
