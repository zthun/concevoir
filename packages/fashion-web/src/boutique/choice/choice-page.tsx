import {
  ZBooleanSwitch,
  ZBox,
  ZCaption,
  ZCard,
  ZChoiceAutocomplete,
  ZChoiceDropDown,
  ZChoiceToggle,
  ZGrid,
  ZH3,
  ZIconFontAwesome,
  ZLineItem,
  ZParagraph
} from '@zthun/fashion-react';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { IZBrand, ZBrands } from '@zthun/helpful-brands';
import React, { useMemo, useState } from 'react';
import { ZFashionRouteChoice } from '../../routes.mjs';

/**
 * Represents the tutorial for how to get started.
 *
 * @returns The JSX to render the alerts demo page.
 */
export function ZChoicePage() {
  const allBrands = useMemo(() => ZBrands.slice(), []);
  const someBrands = useMemo(() => ZBrands.slice(0, 4), []);
  const [values, setValues] = useState([allBrands[2].id]);
  const [disabled, setDisabled] = useState(false);
  const [multiple, setMultiple] = useState(false);
  const [indelible, setIndelible] = useState(false);
  const [required, setRequired] = useState(false);

  function renderSelected() {
    return values.map((s) => (
      <li key={s} className='ZChoicePage-value'>
        {s}
      </li>
    ));
  }

  const renderBrandAvatar = (h: IZBrand) => <ZIconFontAwesome family='brands' name={h.id} width={ZSizeFixed.Small} />;
  const getBrandId = (h: IZBrand) => h.id;
  const renderBrandDisplay = (h: IZBrand) => h.name;

  const renderBrand = (h: IZBrand) => (
    <ZLineItem className='ZChoicePage-hero' prefix={renderBrandAvatar(h)} body={renderBrandDisplay(h)} />
  );

  return (
    <ZCard
      className='ZChoicePage-root'
      heading={ZFashionRouteChoice.name}
      subHeading={ZFashionRouteChoice.description}
      avatar={<ZIconFontAwesome name={ZFashionRouteChoice.avatar} width={ZSizeFixed.Medium} />}
    >
      <ZBox padding={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZBox padding={{ bottom: ZSizeFixed.Large }}>
          <ZParagraph compact>
            Choices help the user with valid values. When the user has to pick between a list of multiple choice
            options, then a choice component is appropriate. There are multiple variations of making choices, but all of
            them have the same premise. Given a list of possible values to choose from, you can select one or more
            values.
          </ZParagraph>
        </ZBox>

        <ZGrid alignItems='center' columns='1fr 1fr' columnsSm='1fr' gap={ZSizeFixed.Large}>
          <ZChoiceDropDown
            disabled={disabled}
            label='Drop Down'
            indelible={indelible}
            multiple={multiple}
            required={required}
            value={values}
            identifier={getBrandId}
            display={renderBrandDisplay}
            onValueChange={setValues}
            options={allBrands}
            renderOption={renderBrand}
            name='dropdown'
          />

          <ZChoiceAutocomplete
            disabled={disabled}
            label='Autocomplete'
            indelible={indelible}
            multiple={multiple}
            required={required}
            value={values}
            identifier={getBrandId}
            display={renderBrandDisplay}
            onValueChange={setValues}
            options={allBrands}
            renderOption={renderBrand}
            name='autocomplete'
          />

          <ZChoiceToggle
            disabled={disabled}
            label='Toggle'
            indelible={indelible}
            multiple={multiple}
            required={required}
            value={values}
            identifier={getBrandId}
            display={renderBrandDisplay}
            onValueChange={setValues}
            options={someBrands}
            renderOption={renderBrandAvatar}
            name='toggle'
          />
        </ZGrid>

        <ZBox padding={{ top: ZSizeFixed.Medium }}>
          <ZCaption compact>Selected</ZCaption>
          <ul>{renderSelected()}</ul>
        </ZBox>
      </ZBox>

      <ZBox padding={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Options</ZH3>

        <ZGrid gap={ZSizeFixed.Small}>
          <ZBooleanSwitch value={disabled} onValueChange={setDisabled} label='Disabled' name='disabled' />
          <ZBooleanSwitch value={multiple} onValueChange={setMultiple} label='Multiple' name='multiple' />
          <ZBooleanSwitch value={indelible} onValueChange={setIndelible} label='Indelible' name='indelible' />
          <ZBooleanSwitch value={required} onValueChange={setRequired} label='Required' name='required' />
        </ZGrid>
      </ZBox>
    </ZCard>
  );
}
