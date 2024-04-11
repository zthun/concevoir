import { ZBox, ZButton, ZCard, ZGrid, ZH3, ZIconFontAwesome, ZImageSource, ZParagraph } from '@zthun/fashion-react';
import { ZSizeFixed, ZSizeVaried } from '@zthun/fashion-tailor';
import { ZFashionArea, ZFashionSeverity } from '@zthun/fashion-theme';
import React from 'react';
import { ZFashionRouteCard } from '../../routes.mjs';
import { ZChoiceDropDownFashion } from '../common/choice-drop-down-fashion';
import { useFashionState } from '../common/use-fashion-state.mjs';

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
  const [, fashionName, setFashion] = useFashionState(ZFashionArea.Component);

  return (
    <ZCard
      className='ZCardPage-root'
      heading={ZFashionRouteCard.name}
      subHeading={ZFashionRouteCard.description}
      avatar={<ZIconFontAwesome name={ZFashionRouteCard.avatar} width={ZSizeFixed.Medium} />}
    >
      <ZBox padding={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZParagraph>
          Cards allow for sectioned content and are very responsive and mobile friendly. Favor putting things in cards
          to create desireable experiences for your users.
        </ZParagraph>

        <ZGrid columns={{ xl: '1fr 1fr 1fr', md: '1fr' }} gap={ZSizeFixed.Small}>
          <ZCard
            name='card'
            heading='Header'
            subHeading='Sub Header'
            fashion={fashionName}
            avatar={<ZIconFontAwesome name='mask' width={ZSizeFixed.Medium} />}
            footer={<ZButton label='Footer' width={ZSizeVaried.Full} fashion={ZFashionSeverity.Success} />}
          >
            <ZParagraph compact>{LOREM}</ZParagraph>
          </ZCard>

          <ZCard
            name='loading'
            heading='Loading'
            subHeading='Content not ready yet'
            fashion={fashionName}
            loading
            avatar={<ZIconFontAwesome name='house' width={ZSizeFixed.Medium} />}
            footer={<ZButton label='Footer' width={ZSizeVaried.Full} fashion={ZFashionSeverity.Success} disabled />}
          />

          <ZCard
            name='image'
            heading='Graphics'
            subHeading='Card with an image'
            fashion={fashionName}
            avatar={<ZIconFontAwesome name='house' width={ZSizeFixed.Medium} />}
          >
            <ZBox margin={{ bottom: ZSizeFixed.Small }}>
              <ZImageSource src='/images/svg/plant.svg' height={ZSizeFixed.ExtraLarge} width={ZSizeVaried.Full} />
            </ZBox>

            <ZParagraph>Image with descriptions can make for great links and launchers.</ZParagraph>
          </ZCard>
        </ZGrid>
      </ZBox>

      <ZH3>Options</ZH3>

      <ZGrid gap={ZSizeFixed.Medium}>
        <ZChoiceDropDownFashion value={fashionName} onValueChange={setFashion} name='fashion' />
      </ZGrid>
    </ZCard>
  );
}
