import {
  ZBooleanSwitch,
  ZBox,
  ZBubble,
  ZCard,
  ZGrid,
  ZH3,
  ZIconFontAwesome,
  ZParagraph,
  ZStack,
  useFashionTheme
} from '@zthun/fashion-react';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { ZOrientation } from '@zthun/helpful-fn';
import React, { useState } from 'react';
import { ZFashionRouteButton } from '../../routes.mjs';
import { ZChoiceDropDownFashion } from '../common/choice-drop-down-fashion';
import { ZChoiceDropDownSize } from '../common/choice-drop-down-size';
import { useFashionState } from '../common/use-fashion-state.mjs';

export function ZBubblePage() {
  const [borderSize, setBorderSize] = useState<ZSizeFixed | undefined>(undefined);
  const [fashion, fashionName, setFashion] = useFashionState();
  const [count, setCount] = useState<number>(0);
  const [clickable, setClickable] = useState(true);
  const sizes = Object.values(ZSizeFixed);
  const { inherit } = useFashionTheme();

  const handleClick = () => {
    setCount((c) => c + 1);
  };

  return (
    <ZCard
      className='ZBubblePage-root'
      heading={ZFashionRouteButton.name}
      subHeading={ZFashionRouteButton.description}
      avatar={<ZIconFontAwesome name={ZFashionRouteButton.avatar} width={ZSizeFixed.Medium} />}
    >
      <ZBox padding={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZParagraph>
          Bubbles put things in circles. This is useful for things like avatars and icons. You can use bubbles similar
          to that of a button with click events if you choose to.
        </ZParagraph>

        <ZStack orientation={ZOrientation.Horizontal} gap={ZSizeFixed.ExtraSmall} alignItems='center'>
          <ZBubble
            border={borderSize}
            onClick={clickable ? handleClick : undefined}
            name='button'
            fashion={fashion}
            width={ZSizeFixed.Large}
            padding={ZSizeFixed.Medium}
          >
            <ZIconFontAwesome name='floppy-disk' width={ZSizeFixed.Large} fashion={inherit} />
          </ZBubble>
        </ZStack>

        <ZBox margin={{ top: ZSizeFixed.Small }}>
          <span>Click Count: </span>
          <span className='ZBubblePage-click-count'>{count}</span>
        </ZBox>
      </ZBox>

      <ZBox padding={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Options</ZH3>
        <ZGrid gap={ZSizeFixed.Medium}>
          <ZBooleanSwitch value={clickable} onValueChange={setClickable} label='Clickable' name='clickable' />
          <ZChoiceDropDownSize
            value={borderSize}
            onValueChange={setBorderSize}
            sizes={sizes}
            name='border-width'
            label='Border Width'
          />
          <ZChoiceDropDownFashion value={fashionName} onValueChange={setFashion} name='fashion' />
        </ZGrid>
      </ZBox>
    </ZCard>
  );
}
