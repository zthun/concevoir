import { ZSizeFixed } from "@zthun/fashion-tailor";
import { ZBanner } from "../banner/banner";
import { ZBox } from "../box/box";
import { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import { IZContentTitle, ZContentTitle } from "../content-title/content-title";
import { useFashionTheme } from "../theme/fashion.mjs";
import { ZStyled } from "../theme/styled";

export interface IZBannerMain extends IZComponentHierarchy {
  TitleProps?: IZContentTitle;
}

/**
 * Represents a layout that uses a banner with main content.
 */
export function ZBannerMain(props: IZBannerMain) {
  const { children, TitleProps } = props;
  const { primary } = useFashionTheme();

  return (
    <ZStyled className="ZBannerMain-root">
      <ZBanner className="ZBannerMain-header" fashion={primary}>
        <ZContentTitle {...TitleProps} />
      </ZBanner>
      <ZBox padding={ZSizeFixed.Large}>
        <main className="ZBannerMain-content">{children}</main>
      </ZBox>
    </ZStyled>
  );
}
