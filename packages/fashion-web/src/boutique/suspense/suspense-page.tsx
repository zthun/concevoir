import {
  ZBooleanSwitch,
  ZBox,
  ZCard,
  ZGrid,
  ZH3,
  ZIconFontAwesome,
  ZParagraph,
  ZSuspenseProgress,
  ZSuspenseRotate,
} from "@zthun/fashion-boutique";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import { useState } from "react";
import { ZFashionRouteSuspense } from "../../routes.mjs";
import { ZChoiceDropDownFashion } from "../common/choice-drop-down-fashion";
import { useFashionState } from "../common/use-fashion-state.mjs";

/**
 * Represents a demo for suspense indicators.
 *
 * @returns
 *        The JSX to render the suspense page.
 */
export function ZSuspensePage() {
  const [fashion, fashionName, setFashion] = useFashionState();
  const [disabled, setDisabled] = useState<boolean>(false);

  return (
    <ZCard
      className="ZSuspensePage-root"
      TitleProps={{
        heading: ZFashionRouteSuspense.name,
        subHeading: ZFashionRouteSuspense.description,
        avatar: (
          <ZIconFontAwesome
            name={ZFashionRouteSuspense.avatar}
            width={ZSizeFixed.Medium}
          />
        ),
      }}
    >
      <ZBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZParagraph>
          If you load data from a server, or have to have the user wait for an
          operation to complete, then the appropriate display for that is some
          kind of animated, work, icon. These types of displays have very little
          configuration and are generally nothing more than to show users that
          things are still happening in the background. However,
          psychologically, they alleviate any user suspense when asynchronous
          operations are happening.
        </ZParagraph>

        <ZGrid gap={ZSizeFixed.Medium}>
          <ZSuspenseRotate
            disabled={disabled}
            fashion={fashion}
            width={{
              xl: ZSizeFixed.ExtraLarge,
              lg: ZSizeFixed.Large,
              md: ZSizeFixed.Medium,
              sm: ZSizeFixed.Small,
              xs: ZSizeFixed.ExtraSmall,
            }}
            name="rotate"
          />
          <ZSuspenseProgress
            disabled={disabled}
            fashion={fashion}
            height={{
              xl: ZSizeFixed.ExtraLarge,
              lg: ZSizeFixed.Large,
              md: ZSizeFixed.Medium,
              sm: ZSizeFixed.Small,
              xs: ZSizeFixed.ExtraSmall,
            }}
            name="progress"
          />
        </ZGrid>
      </ZBox>

      <ZBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Options</ZH3>

        <ZGrid gap={ZSizeFixed.Medium}>
          <ZBooleanSwitch
            value={disabled}
            onValueChange={setDisabled}
            label="Disabled"
            name="disabled"
          />
          <ZChoiceDropDownFashion
            value={fashionName}
            onValueChange={setFashion}
            name="fashion"
          />
        </ZGrid>
      </ZBox>
    </ZCard>
  );
}
