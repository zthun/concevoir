import {
  IZComponentFashion,
  ZBox,
  ZCaption,
  ZGrid,
  ZH4,
  ZStack,
  ZTextColor,
  createStyleHook,
} from "@zthun/fashion-boutique";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import { ZFashionBuilder } from "@zthun/fashion-theme";
import { ZOrientation, cssJoinDefined } from "@zthun/helpful-fn";
import React, { useMemo } from "react";

export interface IZFashionColors extends Required<IZComponentFashion> {}

const useFashionColorsStyles = createStyleHook(
  ({ tailor }, props: IZFashionColors) => {
    const { fashion } = props;

    const main = fashion.idle.main;
    const contrast = fashion.idle.contrast;

    return {
      block: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "5rem",
        borderStyle: "solid",
        borderWidth: tailor.thickness(),
      },

      main: {
        color: contrast,
        backgroundColor: main,
        borderColor: main,
      },
    };
  },
);

export function ZFashionColors(props: IZFashionColors) {
  const { fashion } = props;
  const { classes } = useFashionColorsStyles(props);
  const boxFashion = useMemo(
    () => new ZFashionBuilder().copy(fashion).build(),
    [fashion],
  );

  return (
    <ZBox
      className={cssJoinDefined("ZFashionColors-root")}
      fashion={boxFashion}
      border={{ width: ZSizeFixed.Small }}
      padding={ZSizeFixed.Small}
      data-name={fashion.name}
      data-fashion={fashion.name}
    >
      <ZStack orientation={ZOrientation.Vertical} gap={ZSizeFixed.Small}>
        <ZTextColor fashion={fashion}>
          <ZH4 compact>{fashion.name}</ZH4>
        </ZTextColor>
        <ZGrid columns="1fr 1fr 1fr">
          <div
            className={cssJoinDefined("ZFashionColors-block", classes.block)}
          >
            <ZCaption compact>{fashion.name}</ZCaption>
          </div>
        </ZGrid>
      </ZStack>
    </ZBox>
  );
}
