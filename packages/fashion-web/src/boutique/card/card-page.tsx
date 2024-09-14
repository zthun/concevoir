import {
  ZBox,
  ZButton,
  ZCard,
  ZH3,
  ZIconFontAwesome,
  ZParagraph,
  ZStack,
  useFashionTheme,
} from "@zthun/fashion-boutique";
import { ZSizeFixed, ZSizeVaried } from "@zthun/fashion-tailor";
import { ZFashionArea } from "@zthun/fashion-theme";
import { ZFashionRouteCard } from "../../routes.mjs";
import { ZChoiceDropDownFashion } from "../common/choice-drop-down-fashion";
import { useFashionState } from "../common/use-fashion-state.mjs";

// cspell: disable
const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
  "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut " +
  "aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit " +
  "in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur " +
  "sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt " +
  "mollit anim id est laborum.";
// cspell: enable

/**
 * Represents a demo for cards.
 *
 * @returns The JSX to render the alerts demo page.
 */
export function ZCardPage() {
  const { success, opposite } = useFashionTheme();
  const [fashion, fashionName, setFashion] = useFashionState(
    ZFashionArea.Component,
  );

  return (
    <ZCard
      className="ZCardPage-root"
      heading={ZFashionRouteCard.name}
      subHeading={ZFashionRouteCard.description}
      avatar={
        <ZIconFontAwesome
          name={ZFashionRouteCard.avatar}
          width={ZSizeFixed.Medium}
        />
      }
    >
      <ZBox padding={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZParagraph>
          Cards allow for sectioned content and are very responsive and mobile
          friendly. Favor putting things in cards to create desirable
          experiences for your users.
        </ZParagraph>

        <ZBox
          padding={ZSizeFixed.ExtraSmall}
          fashion={opposite}
          width={ZSizeVaried.Fit}
        >
          <ZCard
            name="card"
            heading="Header"
            subHeading="Sub Header"
            fashion={fashion}
            avatar={<ZIconFontAwesome name="mask" width={ZSizeFixed.Medium} />}
            footer={
              <ZButton
                label="Footer"
                width={ZSizeVaried.Full}
                fashion={success}
              />
            }
            width={{
              xl: ZSizeFixed.ExtraLarge,
              lg: ZSizeFixed.Large,
              md: ZSizeFixed.Medium,
              sm: ZSizeFixed.Small,
              xs: ZSizeFixed.ExtraSmall,
            }}
            height={{
              xl: ZSizeFixed.ExtraLarge,
              lg: ZSizeFixed.Large,
              md: ZSizeFixed.Medium,
              sm: ZSizeFixed.Small,
              xs: ZSizeFixed.ExtraSmall,
            }}
          >
            <ZParagraph compact>{LOREM}</ZParagraph>
          </ZCard>
        </ZBox>
      </ZBox>

      <ZStack gap={ZSizeFixed.Large}>
        <ZH3 compact>Options</ZH3>

        <ZChoiceDropDownFashion
          value={fashionName}
          onValueChange={setFashion}
          name="fashion"
        />
      </ZStack>
    </ZCard>
  );
}
