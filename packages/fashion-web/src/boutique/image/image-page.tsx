import {
  ZBox,
  ZCard,
  ZH3,
  ZIconFontAwesome,
  ZImageSource,
  ZParagraph,
  ZStack,
} from "@zthun/fashion-boutique";
import { ZSizeFixed, ZSizeVaried } from "@zthun/fashion-tailor";
import { ZUrlBuilder } from "@zthun/webigail-url";
import { useState } from "react";
import { ZFashionRouteImage } from "../../routes.mjs";
import { ZChoiceDropDownSize } from "../common/choice-drop-down-size";

const Png = new ZUrlBuilder().gravatar().build();

export function ZImagePage() {
  const [width, setWidth] = useState<ZSizeFixed | ZSizeVaried>();
  const [height, setHeight] = useState<ZSizeFixed | ZSizeVaried>();

  const sizes: (ZSizeFixed | ZSizeVaried)[] = (
    [] as (ZSizeFixed | ZSizeVaried)[]
  )
    .concat(Object.values(ZSizeFixed))
    .concat(Object.values(ZSizeVaried));

  return (
    <ZCard
      className="ZImagePage-root"
      TitleProps={{
        heading: ZFashionRouteImage.name,
        subHeading: ZFashionRouteImage.description,
        avatar: (
          <ZIconFontAwesome
            name={ZFashionRouteImage.avatar}
            width={ZSizeFixed.Medium}
          />
        ),
      }}
    >
      <ZBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZParagraph>
          Images are great and make your site visual appealing. Fashion images
          supports support raster and vector graphics. It also supports data
          urls that embed the graphics within the url. If an SVG is supplied in
          this way, then it is directly added to the browser.
        </ZParagraph>

        <ZImageSource src={Png} width={width} height={height} />
      </ZBox>

      <ZH3>Options</ZH3>

      <ZStack gap={ZSizeFixed.Small}>
        <ZChoiceDropDownSize
          sizes={sizes}
          value={width}
          onValueChange={setWidth}
          label="Width"
          name="width"
        />
        <ZChoiceDropDownSize
          sizes={sizes}
          value={height}
          onValueChange={setHeight}
          label="Height"
          name="height"
        />
      </ZStack>
    </ZCard>
  );
}
