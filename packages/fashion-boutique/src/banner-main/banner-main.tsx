import { ZSizeFixed } from "@zthun/fashion-tailor";
import { ZBanner } from "../banner/banner";
import { ZBox } from "../box/box";
import { IZComponentAdornment } from "../component/component-adornment.mjs";
import { IZComponentAvatar } from "../component/component-avatar.mjs";
import { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import { ZGrid } from "../grid/grid";
import { useFashionTheme } from "../theme/fashion.mjs";
import { ZStyled } from "../theme/styled";

export interface IZBannerMain
  extends IZComponentHierarchy,
    IZComponentAvatar,
    IZComponentAdornment {}

/**
 * Represents a layout that uses a banner with main content.
 */
export function ZBannerMain(props: IZBannerMain) {
  const { children, avatar, prefix = <span />, suffix = <span /> } = props;
  const { primary } = useFashionTheme();

  return (
    <ZStyled className="ZBannerMain-root">
      <ZBanner className="ZBannerMain-header" fashion={primary}>
        <ZBox padding={{ x: ZSizeFixed.Medium, y: ZSizeFixed.ExtraSmall }}>
          <ZGrid
            columns="auto auto 1fr auto"
            align={{ items: "center" }}
            gap={ZSizeFixed.Small}
          >
            <div className="ZBannerMain-avatar">{avatar}</div>
            <div className="ZBannerMain-prefix">{prefix}</div>
            <span />
            <div className="ZBannerMain-suffix">{suffix}</div>
          </ZGrid>
        </ZBox>
      </ZBanner>
      <ZBox padding={ZSizeFixed.Large}>
        <main className="ZBannerMain-content">{children}</main>
      </ZBox>
    </ZStyled>
  );
}
