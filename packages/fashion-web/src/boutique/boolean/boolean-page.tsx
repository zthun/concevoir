import {
  useFashionTheme,
  ZBooleanCheckbox,
  ZBooleanSwitch,
  ZBox,
  ZButton,
  ZCaption,
  ZCard,
  ZChoiceDropDown,
  ZGrid,
  ZH3,
  ZImageSource,
  ZParagraph
} from '@zthun/fashion-boutique';
import { ZSizeFixed, ZSizeVaried } from '@zthun/fashion-tailor';
import { IZFashion } from '@zthun/fashion-theme';
import { setFirst } from '@zthun/helpful-fn';
import { identity } from 'lodash';
import React, { useState } from 'react';
import { ZFashionRouteBoolean } from '../../routes';

/**
 * Represents a demo for booleans.
 *
 * @returns The JSX to render the alerts demo page.
 */
export function ZBooleanPage() {
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState<boolean | null>(false);
  const { primary, secondary, info, light, dark, success, warning, error } = useFashionTheme();
  const [fashion, setFashion] = useState<IZFashion>(primary);
  const _setFashion = setFirst.bind(null, setFashion, primary);
  const designs = [primary, secondary, success, warning, error, info, light, dark];

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
