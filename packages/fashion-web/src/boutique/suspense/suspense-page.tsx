import {
  ZBooleanSwitch,
  ZBox,
  ZCard,
  ZChoiceDropDown,
  ZGrid,
  ZH3,
  ZIconFontAwesome,
  ZParagraph,
  ZSuspenseProgress,
  ZSuspenseRotate
} from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { setFirst } from '@zthun/helpful-fn';
import { identity, startCase, values } from 'lodash-es';
import React, { useState } from 'react';
import { ZFashionRouteSuspense } from '../../routes';
import { ZChoiceDropDownFashion } from '../common/choice-drop-down-fashion';
import { useFashionState } from '../common/use-fashion-state.mjs';

/**
 * Represents a demo for suspense indicators.
 *
 * @returns
 *        The JSX to render the suspense page.
 */
export function ZSuspensePage() {
  const [size, setSize] = useState(ZSizeFixed.ExtraSmall);
  const [fashion, fashionName, setFashion] = useFashionState();
  const [loading, setLoading] = useState<boolean>(true);
  const sizes = values(ZSizeFixed);
  const _setSize = setFirst.bind(null, setSize, ZSizeFixed.ExtraSmall);

  return (
    <ZCard
      className='ZSuspensePage-root'
      heading={ZFashionRouteSuspense.name}
      subHeading={ZFashionRouteSuspense.description}
      avatar={<ZIconFontAwesome name={ZFashionRouteSuspense.avatar} width={ZSizeFixed.Medium} />}
    >
      <ZBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZParagraph>
          If you load data from a server, or have to have the user wait for an operation to complete, then the
          appropriate display for that is some kind of animated, work, icon. These types of displays have very little
          configuration and are generally nothing more than to show users that things are still happening in the
          background. However, psychologically, they alleviate any user suspense when asynchronous operations are
          happening.
        </ZParagraph>

        <ZGrid gap={ZSizeFixed.Medium}>
          <ZSuspenseRotate loading={loading} width={size} fashion={fashion} name='rotate' />
          <ZSuspenseProgress loading={loading} height={size} fashion={fashion} name='progress' />
        </ZGrid>
      </ZBox>

      <ZBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Options</ZH3>

        <ZGrid gap={ZSizeFixed.Medium}>
          <ZBooleanSwitch value={loading} onValueChange={setLoading} label='Loading' name='loading' />
          <ZChoiceDropDownFashion value={fashionName} onValueChange={setFashion} name='fashion' />
          <ZChoiceDropDown
            name='size'
            value={[size]}
            onValueChange={_setSize}
            options={sizes}
            renderOption={startCase}
            identifier={identity}
            label='Size'
          />
        </ZGrid>
      </ZBox>
    </ZCard>
  );
}
