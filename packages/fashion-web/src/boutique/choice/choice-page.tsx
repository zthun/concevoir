import {
  ZBooleanSwitch,
  ZBox,
  ZCaption,
  ZCard,
  ZChoiceSelect,
  ZChoiceToggle,
  ZGrid,
  ZH3,
  ZIconFontAwesome,
  ZParagraph,
} from "@zthun/fashion-boutique";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import { IZBrand, ZBrands } from "@zthun/helpful-brands";
import { castArray } from "lodash-es";
import { useMemo, useState } from "react";
import { ZFashionRouteChoice } from "../../routes.mjs";

/**
 * Represents the tutorial for how to get started.
 *
 * @returns The JSX to render the alerts demo page.
 */
export function ZChoicePage() {
  const allBrands = useMemo(() => ZBrands.slice(), []);
  const someBrands = useMemo(() => ZBrands.slice(0, 4), []);
  const [values, setValues] = useState<string[] | string | null>([
    allBrands[2].id,
  ]);
  const [disabled, setDisabled] = useState(false);
  const [multiple, setMultiple] = useState(false);
  const [indelible, setIndelible] = useState(false);
  const [required, setRequired] = useState(false);

  function renderSelected() {
    const _values = values == null ? [] : castArray(values);
    return _values.map((s) => (
      <li key={s} className="ZChoicePage-value">
        {s}
      </li>
    ));
  }

  const renderBrandAvatar = (h: IZBrand) => (
    <ZIconFontAwesome
      family="brands"
      name={h.id}
      width={ZSizeFixed.ExtraSmall}
    />
  );
  const getBrandId = (h: IZBrand) => h.id;
  const renderBrandDisplay = (h: IZBrand) => h.name;

  const renderBrand = (h: IZBrand) => (
    <ZGrid
      className="ZChoicePage-hero"
      columns="auto 1fr"
      gap={ZSizeFixed.Small}
      align={{ items: "center" }}
    >
      {renderBrandAvatar(h)}
      {renderBrandDisplay(h)}
    </ZGrid>
  );

  return (
    <ZCard
      className="ZChoicePage-root"
      TitleProps={{
        heading: ZFashionRouteChoice.name,
        subHeading: ZFashionRouteChoice.description,
        avatar: (
          <ZIconFontAwesome
            name={ZFashionRouteChoice.avatar}
            width={ZSizeFixed.Medium}
          />
        ),
      }}
    >
      <ZBox padding={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZBox padding={{ bottom: ZSizeFixed.Large }}>
          <ZParagraph compact>
            Choices help the user with valid values. When the user has to pick
            between a list of multiple choice options, then a choice component
            is appropriate. There are multiple variations of making choices, but
            all of them have the same premise. Given a list of possible values
            to choose from, you can select one or more values.
          </ZParagraph>
        </ZBox>

        <ZGrid
          align={{ items: "center" }}
          columns={{ xl: "1fr 1fr 1fr", sm: "1fr" }}
          gap={ZSizeFixed.Large}
        >
          <ZChoiceSelect
            disabled={disabled}
            label="Select"
            indelible={indelible}
            multiple={multiple}
            required={required}
            value={values}
            identifier={getBrandId}
            display={renderBrandDisplay}
            onValueChange={setValues}
            options={allBrands}
            renderOption={renderBrand}
            name="select"
          />

          <ZChoiceToggle
            disabled={disabled}
            label="Toggle"
            indelible={indelible}
            multiple={multiple}
            required={required}
            value={values}
            identifier={getBrandId}
            display={renderBrandDisplay}
            onValueChange={setValues}
            options={someBrands}
            renderOption={renderBrandAvatar}
            name="toggle"
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
          <ZBooleanSwitch
            value={disabled}
            onValueChange={setDisabled}
            label="Disabled"
            name="disabled"
          />
          <ZBooleanSwitch
            value={multiple}
            onValueChange={setMultiple}
            label="Multiple"
            name="multiple"
          />
          <ZBooleanSwitch
            value={indelible}
            onValueChange={setIndelible}
            label="Indelible"
            name="indelible"
          />
          <ZBooleanSwitch
            value={required}
            onValueChange={setRequired}
            label="Required"
            name="required"
          />
        </ZGrid>
      </ZBox>
    </ZCard>
  );
}
