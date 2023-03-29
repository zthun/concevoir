import {
  useFashionTheme,
  ZBooleanCheckbox,
  ZBooleanSwitch,
  ZBox,
  ZButton,
  ZCaption,
  ZCard,
  ZGrid,
  ZH3,
  ZImageSource,
  ZParagraph
} from '@zthun/fashion-boutique';
import { ZSizeFixed, ZSizeVaried } from '@zthun/fashion-tailor';
import { IZFashion } from '@zthun/fashion-theme';
import React, { useState } from 'react';
import { ZFashionRouteBoolean } from '../../routes';
import { ZChoiceDropDownFashion } from '../common/choice-drop-down-fashion';

/**
 * Represents a demo for booleans.
 *
 * @returns The JSX to render the alerts demo page.
 */
export function ZBooleanPage() {
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState<boolean | null>(false);
  const { success, warning, error } = useFashionTheme();
  const [fashion, setFashion] = useState<IZFashion>();

  return (
    <ZCard
      className='ZBooleanPage-root'
      heading={ZFashionRouteBoolean.name}
      subHeading={ZFashionRouteBoolean.description}
      avatar={<ZImageSource src={ZFashionRouteBoolean.avatar} height={ZSizeFixed.Medium} />}
    >
      <ZBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZParagraph>
          It is almost inevitable that you will need some form of values that represent true and false. There are many
          ways to represent such a value in a web form.
        </ZParagraph>

        <ZBox margin={{ bottom: ZSizeFixed.Medium }}>
          <ZGrid alignItems='center' columns='auto auto 1fr' gap={ZSizeFixed.ExtraSmall}>
            <ZBooleanCheckbox
              disabled={disabled}
              fashion={fashion}
              value={value}
              onValueChange={setValue.bind(null)}
              label='Checkbox'
              name='checkbox'
            />
            <ZBooleanSwitch
              disabled={disabled}
              fashion={fashion}
              value={!!value}
              onValueChange={setValue.bind(null)}
              label='Switch'
              name='switch'
            />
          </ZGrid>
        </ZBox>

        <ZCaption compact>
          <span>Value:</span>
          <span className='ZBooleanPage-value'>{JSON.stringify(value)}</span>
        </ZCaption>
      </ZBox>

      <ZBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Options</ZH3>

        <ZGrid gap={ZSizeFixed.Medium}>
          <ZBooleanSwitch value={disabled} onValueChange={setDisabled} label='Disabled' name='disabled' />
          <ZChoiceDropDownFashion value={fashion} onValueChange={setFashion} name='fashion' />
        </ZGrid>
      </ZBox>

      <ZBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Operations</ZH3>

        <ZGrid columns='auto auto' gap={ZSizeFixed.Small}>
          <ZButton outline fashion={success} onClick={setValue.bind(null, true)} label='True' name='on' />
          <ZButton outline fashion={error} onClick={setValue.bind(null, false)} label='False' name='off' />
        </ZGrid>

        <ZBox margin={{ top: ZSizeFixed.Small }}>
          <ZButton
            outline
            fashion={warning}
            width={ZSizeVaried.Full}
            onClick={setValue.bind(null, null)}
            label='Indeterminate'
            name='indeterminate'
          />
        </ZBox>
      </ZBox>
    </ZCard>
  );
}
