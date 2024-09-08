import {
  ZBox,
  ZBubble,
  ZCard,
  ZCarousel,
  ZChoiceDropDown,
  ZChoiceToggle,
  ZH3,
  ZIconFontAwesome,
  ZParagraph,
  ZStack,
} from "@zthun/fashion-boutique";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import { ZBrands } from "@zthun/helpful-brands";
import { ZOrientation } from "@zthun/helpful-fn";
import { useStateAsArray } from "@zthun/helpful-react";
import { identity, startCase } from "lodash-es";
import { ReactNode, useMemo, useState } from "react";
import { ZFashionRouteCarousel } from "../../routes.mjs";

/**
 * Represents a demo for carousels.
 *
 * @returns The JSX to render the alerts demo page.
 */
export function ZCarouselPage() {
  const [index, setIndex] = useState(0);
  const [orientation, setOrientation] = useStateAsArray(
    ZOrientation.Horizontal,
  );
  const [_orientation] = orientation;
  const orientations = useMemo(() => Object.values(ZOrientation), []);
  const [count, setCount] = useStateAsArray(ZBrands.length);
  const [_count] = count;
  const counts = [0, 1, ZBrands.length];
  const brands = useMemo(() => ZBrands.slice(0, _count), [_count]);

  const renderBubble = (children: ReactNode) => (
    <ZBubble width={ZSizeFixed.Large} padding={ZSizeFixed.Medium}>
      {children}
    </ZBubble>
  );

  const renderBrand = (index: number) =>
    renderBubble(
      <ZIconFontAwesome
        name={brands[index].id}
        family="brands"
        width={ZSizeFixed.Large}
      />,
    );
  const renderQuestion = () =>
    renderBubble(<ZIconFontAwesome name="question" width={ZSizeFixed.Large} />);

  const _setCount = (counts: number[]) => {
    setIndex(0);
    setCount(counts);
  };

  return (
    <ZCard
      className="ZCarouselPage-root"
      heading={ZFashionRouteCarousel.name}
      subHeading={ZFashionRouteCarousel.description}
      avatar={
        <ZIconFontAwesome
          name={ZFashionRouteCarousel.avatar}
          width={ZSizeFixed.Medium}
        />
      }
    >
      <ZBox padding={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZParagraph>
          A carousel component is great for compacting items in a rotating
          display of content.
        </ZParagraph>

        <ZCarousel
          count={brands.length}
          value={index}
          onValueChange={setIndex}
          renderAtIndex={renderBrand}
          renderEmpty={renderQuestion}
          orientation={_orientation}
        />

        <ZBox margin={{ top: ZSizeFixed.Small }}>
          <span>Current Index: </span>
          <span className="ZCarouselPage-index">{index}</span>
        </ZBox>
      </ZBox>

      <ZBox margin={{ top: ZSizeFixed.Medium }}>
        <ZH3>Options</ZH3>
        <ZStack gap={ZSizeFixed.Small}>
          <ZChoiceToggle
            options={counts}
            value={count}
            onValueChange={_setCount}
            indelible
            label="Count"
            renderOption={identity}
            identifier={identity}
            name="count"
          />
          <ZChoiceDropDown
            options={orientations}
            value={orientation}
            onValueChange={setOrientation}
            indelible
            label="Orientation"
            renderOption={startCase}
            identifier={identity}
            name="orientation"
          />
        </ZStack>
      </ZBox>
    </ZCard>
  );
}
