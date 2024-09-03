// cspell:disable
import {
  ZCaption,
  ZCard,
  ZGrid,
  ZH1,
  ZH2,
  ZH3,
  ZH4,
  ZH5,
  ZH6,
  ZIconFontAwesome,
  ZOverline,
  ZParagraph,
  ZSubtitle,
  ZTextColor,
} from "@zthun/fashion-boutique";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import React from "react";
import { ZFashionRouteTypography } from "../../routes.mjs";
import { ZChoiceDropDownFashion } from "../common/choice-drop-down-fashion";
import { useFashionState } from "../common/use-fashion-state.mjs";

/**
 * Represents a demo for typography.
 *
 * @returns The JSX to render the typography demo page.
 */
export function ZTypographyPage() {
  const [fashion, fashionName, setFashion] = useFashionState();

  return (
    <ZCard
      className="ZTypographyPage-root"
      heading={ZFashionRouteTypography.name}
      subHeading={ZFashionRouteTypography.description}
      avatar={
        <ZIconFontAwesome
          name={ZFashionRouteTypography.avatar}
          width={ZSizeFixed.Medium}
        />
      }
    >
      <ZH3>Description</ZH3>

      <ZParagraph>
        Typography is the concept of a document outline. HTML essentially has
        this built in with different tags, such as &lt;p&gt;. The main reason to
        use custom typography in your applications is for responsiveness. As you
        shrink and resize the window, or if users access your page on small
        devices, you want the page to respond to changes made.
      </ZParagraph>

      <ZTextColor fashion={fashion} name="color">
        <ZH1>Headline 1</ZH1>
        <ZH2>Headline 2</ZH2>
        <ZH3>Headline 3</ZH3>
        <ZH4>Headline 4</ZH4>
        <ZH5>Headline 5</ZH5>
        <ZH6>Headline 6</ZH6>

        <hr />
        <ZParagraph>
          Paragraph: Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec
          dui nunc mattis enim. Velit laoreet id donec ultrices tincidunt arcu.
          In mollis nunc sed id semper. Aliquet lectus proin nibh nisl
          condimentum id venenatis. Convallis aenean et tortor at risus.
          Fringilla phasellus faucibus scelerisque eleifend. Eu sem integer
          vitae justo eget magna fermentum iaculis eu. Enim sit amet venenatis
          urna cursus. Nisl suscipit adipiscing bibendum est ultricies integer.
          In hendrerit gravida rutrum quisque non tellus. Adipiscing tristique
          risus nec feugiat in fermentum posuere urna nec. Quam adipiscing vitae
          proin sagittis nisl rhoncus.
        </ZParagraph>

        <hr />
        <ZSubtitle>
          Subtitle: Pulvinar elementum integer enim neque volutpat ac.
          Ullamcorper a lacus vestibulum sed. Risus pretium quam vulputate
          dignissim suspendisse in est ante.
        </ZSubtitle>

        <hr />
        <ZCaption>
          Caption: Viverra maecenas accumsan lacus vel facilisis volutpat est.
        </ZCaption>

        <hr />
        <ZOverline>
          Overline: Pretium quam vulputate dignissim suspendisse.
        </ZOverline>
      </ZTextColor>

      <ZH3>Options</ZH3>
      <ZGrid gap={ZSizeFixed.Medium}>
        <ZChoiceDropDownFashion
          value={fashionName}
          onValueChange={setFashion}
          name="fashion"
        />
      </ZGrid>
    </ZCard>
  );
}
