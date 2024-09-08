import {
  ZBox,
  ZCard,
  ZGrid,
  ZH3,
  ZIconFontAwesome,
  ZParagraph,
  useFashionTheme,
} from "@zthun/fashion-boutique";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import { ZFashionRouteTheme } from "../routes.mjs";
import { ZFashionColors } from "./color/fashion-colors";

/**
 * Represents the theme page.
 *
 * @returns The JSX to render the theme page.
 */
export function ZThemePage() {
  const {
    primary,
    secondary,
    success,
    warning,
    error,
    info,
    light,
    dark,
    body,
    surface,
  } = useFashionTheme();

  return (
    <ZCard
      className="ZThemePage-root"
      heading={ZFashionRouteTheme.name}
      subHeading={ZFashionRouteTheme.description}
      avatar={
        <ZIconFontAwesome
          name={ZFashionRouteTheme.avatar}
          width={ZSizeFixed.Medium}
        />
      }
    >
      <ZBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZParagraph>
          A fashion theme describes the different makeup of page colors that are
          used across common places in a website.
        </ZParagraph>

        <ZBox margin={{ bottom: ZSizeFixed.Medium }}>
          <ZGrid
            columns={{ xl: "1fr 1fr 1fr", lg: "1fr 1fr", md: "1fr" }}
            gap={ZSizeFixed.Medium}
          >
            <ZFashionColors fashion={primary} />
            <ZFashionColors fashion={secondary} />
            <ZFashionColors fashion={success} />
            <ZFashionColors fashion={warning} />
            <ZFashionColors fashion={error} />
            <ZFashionColors fashion={info} />
            <ZFashionColors fashion={light} />
            <ZFashionColors fashion={dark} />
            <ZFashionColors fashion={body} />
            <ZFashionColors fashion={surface} />
          </ZGrid>
        </ZBox>
      </ZBox>
    </ZCard>
  );
}
