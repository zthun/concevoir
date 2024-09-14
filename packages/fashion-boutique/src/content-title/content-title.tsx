import { ZSizeFixed } from "@zthun/fashion-tailor";
import { cssJoinDefined, ZOrientation } from "@zthun/helpful-fn";
import { ElementType, ReactNode } from "react";
import { IZComponentAdornment } from "../component/component-adornment.mjs";
import { IZComponentAvatar } from "../component/component-avatar.mjs";
import { IZComponentHeading } from "../component/component-heading.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import { ZFlex } from "../stack/flex";
import { ZStack } from "../stack/stack";

export interface IZContentTitle
  extends IZComponentHeading,
    IZComponentStyle,
    IZComponentAvatar,
    IZComponentAdornment {}

export function ZContentTitle(props: IZContentTitle) {
  const { avatar, className, heading, prefix, subHeading, suffix } = props;

  const renderSection = (
    part: ReactNode,
    name: string,
    Element: ElementType,
  ) => {
    if (part == null) {
      return null;
    }

    return <Element className={`ZContentTitle-${name}`}>{part}</Element>;
  };

  return (
    <ZStack
      className={cssJoinDefined("ZContentTitle-root", className)}
      orientation={ZOrientation.Horizontal}
      gap={ZSizeFixed.Small}
    >
      {renderSection(avatar, "avatar", "div")}
      <ZStack orientation={ZOrientation.Vertical} gap={ZSizeFixed.ExtraSmall}>
        {renderSection(heading, "heading", "header")}
        {renderSection(subHeading, "subHeading", "sub")}
      </ZStack>
      <ZFlex grow={1}>{renderSection(prefix, "prefix", "div")}</ZFlex>
      {renderSection(suffix, "suffix", "div")}
    </ZStack>
  );
}
