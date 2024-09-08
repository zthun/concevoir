import {
  ZBox,
  ZCard,
  ZGrid,
  ZH3,
  ZIconFontAwesome,
  ZParagraph,
} from "@zthun/fashion-boutique";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import { ZFashionRouteChart } from "../../routes.mjs";
import { ZChartPageProgress } from "./chart-page-progress";

/**
 * Represents a demo for drawers.
 *
 * @returns The JSX to render the page.
 */
export function ZChartPage() {
  return (
    <ZCard
      className="ZChartPage-root"
      heading={ZFashionRouteChart.name}
      subHeading={ZFashionRouteChart.description}
      avatar={
        <ZIconFontAwesome
          name={ZFashionRouteChart.avatar}
          width={ZSizeFixed.Medium}
        />
      }
    >
      <ZBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZParagraph>
          Charts and graphs add nice visualizations and allow you to plot data
          points along a graphical element. These are highly useful for
          dashboard apps.
        </ZParagraph>

        <ZGrid columns="1fr" gap={ZSizeFixed.Medium}>
          <ZChartPageProgress />
        </ZGrid>
      </ZBox>
    </ZCard>
  );
}
