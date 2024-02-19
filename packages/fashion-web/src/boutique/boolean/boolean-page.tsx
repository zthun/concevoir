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
  ZIconFontAwesome,
  ZParagraph
} from '@zthun/fashion-react';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import React, { useState } from 'react';
import { ZFashionRouteBoolean } from '../../routes.mjs';
import { ZChoiceDropDownFashion } from '../common/choice-drop-down-fashion';
import { useFashionState } from '../common/use-fashion-state.mjs';

/**
 * Represents a demo for booleans.
 *
 * @returns The JSX to render the alerts demo page.
 */
export function ZBooleanPage() {
  const [disabled, setDisabled] = useState(false);
  const [required, setRequired] = useState(false);
  const [value, setValue] = useState<boolean | null>(false);
  const { success, warning, error } = useFashionTheme();
  const [fashion, fashionName, setFashion] = useFashionState();

  return (
    <ZCard
      className='ZBooleanPage-root'
      heading={ZFashionRouteBoolean.name}
      subHeading={ZFashionRouteBoolean.description}
      avatar={<ZIconFontAwesome name={ZFashionRouteBoolean.avatar} width={ZSizeFixed.Medium} />}
    >
      <ZBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZParagraph>
          It is almost inevitable that you will need some form of values that represent true and false. There are many
          ways to represent such a value in a web form.
        </ZParagraph>

        <ZBox margin={{ bottom: ZSizeFixed.Medium }}>
          <ZGrid align={{ items: 'center' }} columns='auto auto 1fr' gap={ZSizeFixed.ExtraSmall}>
            <ZBooleanCheckbox
              disabled={disabled}
              required={required}
              fashion={fashion}
              value={value}
              onValueChange={setValue.bind(null)}
              label='Checkbox'
              name='checkbox'
            />
            <ZBooleanSwitch
              disabled={disabled}
              required={required}
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

      <ZBox margin={{ bottom: ZSizeFixed.Medium }}>
        <ZH3>Options</ZH3>

        <ZGrid>
          <ZBooleanSwitch value={disabled} onValueChange={setDisabled} label='Disabled' name='disabled' />
          <ZBooleanSwitch value={required} onValueChange={setRequired} label='Required' name='required' />
        </ZGrid>
      </ZBox>

      <ZBox margin={{ bottom: ZSizeFixed.Medium }}>
        <ZChoiceDropDownFashion value={fashionName} onValueChange={setFashion} name='fashion' />
      </ZBox>

      <ZBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Operations</ZH3>

        <ZGrid columns={{ xl: 'auto auto auto', xs: 'auto' }} gap={ZSizeFixed.Small}>
          <ZButton fashion={success} onClick={setValue.bind(null, true)} label='True' name='on' />
          <ZButton fashion={error} onClick={setValue.bind(null, false)} label='False' name='off' />
          <ZButton fashion={warning} onClick={setValue.bind(null, null)} label='Indeterminate' name='indeterminate' />
        </ZGrid>

        <ZBox margin={{ top: ZSizeFixed.Small }}></ZBox>
      </ZBox>
    </ZCard>
  );
}
