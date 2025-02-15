import {
  useFashionTheme,
  useNavigate,
  ZBox,
  ZCaption,
  ZCard,
  ZGrid,
  ZH3,
  ZIconFontAwesome,
} from "@zthun/fashion-boutique";
import { ZSizeFixed, ZSizeVaried } from "@zthun/fashion-tailor";
import { cssJoinDefined } from "@zthun/helpful-fn";
import { IZRoute } from "../route/route.mjs";
import {
  ZFashionRouteAllComponents,
  ZFashionRouteBoutique,
} from "../routes.mjs";

/**
 * Represents the components page.
 *
 * @returns
 *        The JSX to render the page.
 */
export function ZBoutiquePage() {
  const { body } = useFashionTheme();
  const navigate = useNavigate();

  const renderComponent = (route: IZRoute) => (
    <ZBox
      className={cssJoinDefined("ZBoutiquePage-component")}
      border={{ width: ZSizeFixed.ExtraSmall, radius: ZSizeFixed.ExtraSmall }}
      cursor="pointer"
      fashion={body}
      interactive
      key={route.path}
      onClick={() => navigate(route.path)}
      padding={ZSizeFixed.Medium}
      width={ZSizeVaried.Full}
    >
      <ZGrid
        columns="auto 1fr"
        align={{ items: "center" }}
        gap={ZSizeFixed.Small}
      >
        <ZIconFontAwesome
          name={route.avatar}
          family={route.family}
          width={ZSizeFixed.Small}
        />
        <div>
          <ZH3 compact>{route.name}</ZH3>
          <ZCaption compact>{route.description}</ZCaption>
        </div>
      </ZGrid>
    </ZBox>
  );

  return (
    <ZCard
      className="ZBoutiquePage-root"
      TitleProps={{
        heading: ZFashionRouteBoutique.name,
        subHeading: ZFashionRouteBoutique.description,
        avatar: (
          <ZIconFontAwesome
            name={ZFashionRouteBoutique.avatar}
            width={ZSizeFixed.Medium}
          />
        ),
      }}
    >
      <ZGrid
        columns={{
          xl: "1fr 1fr 1fr 1fr",
          lg: "1fr 1fr 1fr",
          md: "1fr 1fr",
          sm: "1fr",
        }}
        gap={ZSizeFixed.Medium}
      >
        {ZFashionRouteAllComponents.map(renderComponent)}
      </ZGrid>
    </ZCard>
  );
}
