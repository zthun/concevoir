// cspell:disable
import {
  ZCard,
  ZH3,
  ZIconFontAwesome,
  ZNewspaper,
  ZParagraph,
  ZYouTubeVideo,
} from "@zthun/fashion-boutique";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import { ZFashionRouteYouTube } from "../../routes.mjs";

/**
 * Represents a demo for typography.
 *
 * @returns The JSX to render the typography demo page.
 */
export function ZYouTubePage() {
  return (
    <ZCard
      className="ZYouTubePage-root"
      heading={ZFashionRouteYouTube.name}
      subHeading={ZFashionRouteYouTube.description}
      avatar={
        <ZIconFontAwesome
          name={ZFashionRouteYouTube.avatar}
          family={ZFashionRouteYouTube.family}
          width={ZSizeFixed.Medium}
        />
      }
    >
      <ZH3>Description</ZH3>

      <ZParagraph>Embed YouTube videos into your site.</ZParagraph>

      <ZNewspaper
        range={{
          xl: [5, 8],
          lg: [4, 9],
          md: [3, 10],
          sm: [2, 11],
          xs: [1, 12],
        }}
      >
        <ZYouTubeVideo identity="ahCwqrYpIuM" />
      </ZNewspaper>
    </ZCard>
  );
}
