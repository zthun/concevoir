import {
  ZBooleanSwitch,
  ZBox,
  ZButton,
  ZCard,
  ZGrid,
  ZH3,
  ZIconFontAwesome,
  ZParagraph,
  ZStack
} from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { ZOrientation } from '@zthun/helpful-fn';
import React, { useState } from 'react';
import { ZFashionRouteButton } from '../../routes';
import { ZChoiceDropDownFashion } from '../common/choice-drop-down-fashion';
import { useFashionState } from '../common/use-fashion-state';

/**
 * Represents a demo for buttons.
 *
 * @returns The JSX to render the alerts demo page.
 */
export function ZButtonPage() {
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [outline, setOutline] = useState(false);
  const [borderless, setBorderless] = useState(false);
  const [compact, setCompact] = useState(false);
  const [fashion, fashionName, setFashion] = useFashionState();
  const [count, setCount] = useState<number>(0);

  const handleClick = () => {
    setCount((c) => c + 1);
  };

  const avatar = <ZIconFontAwesome name='floppy-disk' width={ZSizeFixed.Small} />;

  return (
    <ZCard
      className='ZButtonPage-root'
      heading={ZFashionRouteButton.name}
      subHeading={ZFashionRouteButton.description}
      avatar={<ZIconFontAwesome name={ZFashionRouteButton.avatar} width={ZSizeFixed.Medium} />}
    >
      <ZBox padding={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZParagraph>
          Buttons are the staple of most application design and have been so for decades. It is a very clean concept to
          click a button that corresponds to an action and users are very used to clicking these.
        </ZParagraph>

        <ZParagraph>
          Buttons can have a label, but if you want to save real estate, you can always use a simple <i>iconography </i>
          button with a tooltip if you desire.
        </ZParagraph>

        <ZStack orientation={ZOrientation.Horizontal} gap={ZSizeFixed.ExtraSmall} alignItems='center'>
          <ZButton
            avatar={avatar}
            loading={loading}
            disabled={disabled}
            borderless={borderless}
            compact={compact}
            outline={outline}
            onClick={handleClick}
            label='Button'
            name='button'
            fashion={fashion}
          />

          <ZButton
            loading={loading}
            disabled={disabled}
            borderless={borderless}
            outline={outline}
            compact={compact}
            onClick={handleClick}
            fashion={fashion}
            label={avatar}
            name='icon-button'
            tooltip='Iconography Button'
          />
        </ZStack>

        <ZBox margin={{ top: ZSizeFixed.Small }}>
          <span>Click Count: </span>
          <span className='ZButtonPage-click-count'>{count}</span>
        </ZBox>
      </ZBox>

      <ZBox padding={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Options</ZH3>
        <ZGrid gap={ZSizeFixed.Medium}>
          <ZBooleanSwitch value={loading} onValueChange={setLoading} name='loading' label='Loading' />
          <ZBooleanSwitch value={disabled} onValueChange={setDisabled} name='disabled' label='Disabled' />
          <ZBooleanSwitch value={outline} onValueChange={setOutline} name='outline' label='Outline' />
          <ZBooleanSwitch value={borderless} onValueChange={setBorderless} name='borderless' label='Borderless' />
          <ZBooleanSwitch value={compact} onValueChange={setCompact} name='compact' label='Compact' />
          <ZChoiceDropDownFashion value={fashionName} onValueChange={setFashion} name='fashion' />
        </ZGrid>
      </ZBox>
    </ZCard>
  );
}
