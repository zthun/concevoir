import { ZSizeFixed } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import React, { useState } from 'react';
import { ZButton } from '../button/button';
import { ZGrid } from '../grid/grid';
import { ZIconFontAwesome } from '../icon/icon-font-awesome';
import { useFashionTheme } from '../theme/fashion.mjs';
import { IZText } from './text';
import { ZTextInput, ZTextType } from './text-input';

/**
 * Represents a password based input text component that can reveal the password.
 *
 * @param props -
 *        The properties to the component.
 *
 * @returns
 *        The JSX to render the component.
 */
export function ZTextInputReveal(props: IZText) {
  const { className, suffix } = props;
  const [revealed, setRevealed] = useState(false);
  const type = revealed ? ZTextType.Text : ZTextType.Password;
  const visible = revealed ? (
    <ZIconFontAwesome name='eye' width={ZSizeFixed.ExtraSmall} />
  ) : (
    <ZIconFontAwesome name='eye-slash' width={ZSizeFixed.ExtraSmall} />
  );

  const { error, success } = useFashionTheme();
  const fashion = revealed ? error : success;

  const adornment = (
    <ZGrid columns='auto auto' alignItems='center' gap={ZSizeFixed.Small}>
      {suffix}
      <ZButton
        className='ZText-revealer'
        borderless
        label={visible}
        fashion={fashion}
        onClick={() => setRevealed((r) => !r)}
      />
    </ZGrid>
  );

  return (
    <ZTextInput {...props} className={cssJoinDefined('ZText-input-reveal', className)} type={type} suffix={adornment} />
  );
}
