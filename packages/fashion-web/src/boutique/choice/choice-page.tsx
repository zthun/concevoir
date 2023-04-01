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
  ZImageSource,
  ZLineItem,
  ZParagraph
} from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import React, { useState } from 'react';
import { ZFashionRouteChoice } from '../../routes';

interface Superhero {
  id: string;
  alias: string;
  name: string;
}

const Superheroes: Superhero[] = [
  { id: 'batman', alias: 'Batman', name: 'Bruce Wayne' },
  { id: 'superman', alias: 'Superman', name: 'Clark Kent' },
  { id: 'wonder-woman', alias: 'Wonder Woman', name: 'Diana Prince' },
  { id: 'green-lantern', alias: 'Green Lantern', name: 'Hal Jordan' }
];

/**
 * Represents the tutorial for how to get started.
 *
 * @returns The JSX to render the alerts demo page.
 */
export function ZChoicePage() {
  const [values, setValues] = useState([Superheroes[2].id]);
  const [disabled, setDisabled] = useState(false);
  const [multiple, setMultiple] = useState(false);
  const [indelible, setIndelible] = useState(false);

  function renderSelected() {
    return values.map((s) => (
      <li key={s} className='ZChoicePage-value'>
        {s}
      </li>
    ));
  }

  function renderSuperhero(h: Superhero) {
    return <ZLineItem className='ZChoicePage-hero' prefix={getHeroAvatar(h)} body={getHeroDisplay(h)} />;
  }

  function getHeroAvatar(h: Superhero) {
    return <ZImageSource src={`images/png/${h.id}.png`} height={ZSizeFixed.Small} width={ZSizeFixed.Small} />;
  }

  function getHeroIdentity(h: Superhero) {
    return h.id;
  }

  function getHeroDisplay(h: Superhero) {
    return `${h.alias} (${h.name})`;
  }

  return (
    <ZCard
      className='ZChoicePage-root'
      heading={ZFashionRouteChoice.name}
      subHeading={ZFashionRouteChoice.description}
      avatar={<ZImageSource src={ZFashionRouteChoice.avatar} height={ZSizeFixed.Medium} />}
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
            value={values}
            identifier={getHeroIdentity}
            display={getHeroDisplay}
            onValueChange={setValues}
            options={Superheroes}
            renderOption={renderSuperhero}
            name='dropdown'
          />

          <ZChoiceAutocomplete
            disabled={disabled}
            label='Autocomplete'
            indelible={indelible}
            multiple={multiple}
            value={values}
            identifier={getHeroIdentity}
            display={getHeroDisplay}
            onValueChange={setValues}
            options={Superheroes}
            renderOption={renderSuperhero}
            name='autocomplete'
          />

          <ZChoiceToggle
            disabled={disabled}
            label='Toggle'
            indelible={indelible}
            multiple={multiple}
            value={values}
            identifier={getHeroIdentity}
            display={getHeroDisplay}
            onValueChange={setValues}
            options={Superheroes}
            renderOption={getHeroAvatar}
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
        </ZGrid>
      </ZBox>
    </ZCard>
  );
}
