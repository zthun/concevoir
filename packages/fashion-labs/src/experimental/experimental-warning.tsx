import { ZAlert, ZBox, ZIconFontAwesome, useFashionTheme } from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import React from 'react';

const ExperimentalMessage = 'The feature you are seeing is experimental and may not make it into the fashion system.';

export function ZExperimentalWarning() {
  const { warning } = useFashionTheme();

  return (
    <ZBox margin={{ y: ZSizeFixed.Medium }}>
      <ZAlert
        message={ExperimentalMessage}
        avatar={<ZIconFontAwesome name='warning' width={ZSizeFixed.Small} />}
        heading='Experimental Feature'
        fashion={warning}
      />
    </ZBox>
  );
}
