import { IZComponentFashion, ZBox, ZH4, ZStack } from "@zthun/fashion-boutique";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import { ZFashionBuilder } from "@zthun/fashion-theme";
import { ZOrientation, cssJoinDefined } from "@zthun/helpful-fn";
import { useMemo } from "react";

export interface IZFashionColors extends Required<IZComponentFashion> {}

export function ZFashionColors(props: IZFashionColors) {
  const { fashion } = props;
  const boxFashion = useMemo(
    () => new ZFashionBuilder().copy(fashion).build(),
    [fashion],
  );

  return (
    <ZBox
      className={cssJoinDefined("ZFashionColors-root")}
      cursor="pointer"
      fashion={boxFashion}
      border={{
        width: ZSizeFixed.ExtraLarge,
        style: "solid",
        radius: ZSizeFixed.Small,
      }}
      padding={ZSizeFixed.Large}
      interactive
      data-name={fashion.name}
      data-fashion={fashion.name}
    >
      <ZStack orientation={ZOrientation.Vertical} gap={ZSizeFixed.Small}>
        <ZH4 compact>{fashion.name}</ZH4>
      </ZStack>
    </ZBox>
  );
}
