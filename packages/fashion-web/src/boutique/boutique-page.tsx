import {
  useNavigate,
  ZBox,
  ZCaption,
  ZCard,
  ZGrid,
  ZH3,
  ZIconFontAwesome,
  ZLineItem,
} from "@zthun/fashion-react";
import { ZSizeFixed, ZSizeVaried } from "@zthun/fashion-tailor";
import { ZFashionArea } from "@zthun/fashion-theme";
import { cssJoinDefined, ZQuadrilateralBuilder } from "@zthun/helpful-fn";
import React from "react";
import { IZRoute } from "../route/route.mjs";
import {
  ZFashionRouteAllComponents,
  ZFashionRouteBoutique,
} from "../routes.mjs";

export function ZBoutiquePage() {
  const navigate = useNavigate();

  const renderComponent = (route: IZRoute) => (
    <ZBox
      className={cssJoinDefined("ZBoutiquePage-component")}
      key={route.path}
      padding={new ZQuadrilateralBuilder(ZSizeFixed.Medium).build()}
      fashion={ZFashionArea.Body}
      edge={new ZQuadrilateralBuilder(ZSizeFixed.ExtraSmall).build()}
      trim={new ZQuadrilateralBuilder("solid").build()}
      width={ZSizeVaried.Full}
      onClick={() => navigate(route.path)}
    >
      <ZLineItem
        prefix={
          <ZIconFontAwesome
            name={route.avatar}
            family={route.family}
            width={ZSizeFixed.Small}
          />
        }
        body={
          <>
            <ZH3 compact>{route.name}</ZH3>
            <ZCaption compact>{route.description}</ZCaption>
          </>
        }
      />
    </ZBox>
  );

  return (
    <ZCard
      className="ZBoutiquePage-root"
      heading={ZFashionRouteBoutique.name}
      subHeading={ZFashionRouteBoutique.description}
      avatar={
        <ZIconFontAwesome
          name={ZFashionRouteBoutique.avatar}
          width={ZSizeFixed.Medium}
        />
      }
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
