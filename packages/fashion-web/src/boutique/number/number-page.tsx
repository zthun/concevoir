import { ZSizeFixed } from '@zthun/fashion-tailor';

import { ZBox, ZCaption, ZCard, ZGrid, ZH3, ZImageSource, ZNumberInput, ZParagraph } from '@zthun/fashion-boutique';
import React, { useState } from 'react';
import { ZFashionRouteNumber } from '../../routes';

/**
 * Represents a demo for number inputs.
 *
 * @returns
 *        The JSX to render the number page.
 */
export function ZNumberPage() {
  const [value, setValue] = useState<number | null>(1);

  return (
    <ZCard
      className='ZNumberPage-root'
      heading={ZFashionRouteNumber.name}
      subHeading={ZFashionRouteNumber.description}
      avatar={<ZImageSource src={ZFashionRouteNumber.avatar} height={ZSizeFixed.Medium} />}
    >
      <ZBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZParagraph>
          Often times, you will need to get a number from the user. Rather than trying to parse the number yourself,
          using a number component is much more efficient. Using number components will allow the user to enter what
          they want without needing to worry about numeric validations and you can let the JavaScript engine do the
          parsing for you.
        </ZParagraph>

        <ZBox margin={{ top: ZSizeFixed.ExtraLarge, bottom: ZSizeFixed.ExtraLarge }}>
          <ZGrid columns='1fr 3fr'>
            <ZNumberInput
              step={1}
              min={-Infinity}
              max={Infinity}
              label='Input'
              value={value}
              onValueChange={setValue}
              name='spinner'
            />
          </ZGrid>
        </ZBox>

        <ZCaption className='ZNumberPage-value'>Value: {value}</ZCaption>
      </ZBox>
    </ZCard>
  );
}
