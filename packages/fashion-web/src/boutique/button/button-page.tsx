import {
  useFashionTheme,
  ZBooleanSwitch,
  ZBox,
  ZButton,
  ZCard,
  ZChoiceDropDown,
  ZGrid,
  ZH3,
  ZImageSource,
  ZParagraph,
  ZStack
} from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { IZFashion } from '@zthun/fashion-theme';
import { setFirst } from '@zthun/helpful-fn';
import { identity } from 'lodash';
import React, { useState } from 'react';
import { ZFashionRouteButton } from '../../routes';

/**
 * Represents a demo for buttons.
 *
 * @returns The JSX to render the alerts demo page.
 */
export function ZButtonPage() {
  const { primary, secondary, success, warning, error, info, light, dark } = useFashionTheme();
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [outline, setOutline] = useState(false);
  const [borderless, setBorderless] = useState(false);
  const [fashion, setFashion] = useState<IZFashion>(primary);
  const [count, setCount] = useState<number>(0);
  const _setFashion = setFirst.bind(null, setFashion, primary);
  const designs = [primary, secondary, success, warning, error, info, light, dark];

  async function handleClick() {
    setCount((c) => c + 1);
  }

  return (
    <ZCard
      className='ZButtonPage-root'
      heading={ZFashionRouteButton.name}
      subHeading={ZFashionRouteButton.description}
      avatar={<ZImageSource src={ZFashionRouteButton.avatar} height={ZSizeFixed.Medium} />}
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

        <ZStack orientation='horizontal' gap={ZSizeFixed.ExtraSmall} alignItems='center'>
          <ZButton
            loading={loading}
            disabled={disabled}
            borderless={borderless}
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
            onClick={handleClick}
            fashion={fashion}
            name='icon-button'
            tooltip='Iconography Button'
          />

          <div>
            <span>Click Count: </span>
            <span className='ZButtonPage-click-count'>{count}</span>
          </div>
        </ZStack>
      </ZBox>

      <ZBox padding={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Options</ZH3>
        <ZGrid gap={ZSizeFixed.Medium}>
          <ZBooleanSwitch value={loading} onValueChange={setLoading} name='loading' label='Loading' />
          <ZBooleanSwitch value={disabled} onValueChange={setDisabled} name='disabled' label='Disabled' />
          <ZBooleanSwitch value={outline} onValueChange={setOutline} name='outline' label='Outline' />
          <ZBooleanSwitch value={borderless} onValueChange={setBorderless} name='borderless' label='Borderless' />
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
