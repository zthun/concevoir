import { ZSizeFixed } from "@zthun/fashion-tailor";
import { cssJoinDefined, ZOrientation } from "@zthun/helpful-fn";
import { ElementType, isValidElement, ReactNode, useMemo } from "react";
import { IZComponentAdornment } from "../component/component-adornment.mjs";
import { IZComponentAvatar } from "../component/component-avatar.mjs";
import { IZComponentHeading } from "../component/component-heading.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import { ZFlex } from "../stack/flex";
import { ZStack } from "../stack/stack";
import { ZH2, ZSubtitle } from "../typography/typography";

export interface IZContentTitle
  extends IZComponentHeading,
    IZComponentStyle,
    IZComponentAvatar,
    IZComponentAdornment {}

export function ZContentTitle(props: IZContentTitle) {
  const { avatar, className, heading, prefix, subHeading, suffix } = props;

  const _heading = useMemo(() => {
    if (heading == null || isValidElement(heading)) {
      return heading;
    }

    return <ZH2 compact>{heading}</ZH2>;
  }, [heading]);

  const _subHeading = useMemo(() => {
    if (subHeading == null || isValidElement(subHeading)) {
      return subHeading;
    }

    return <ZSubtitle compact>{subHeading}</ZSubtitle>;
  }, [subHeading]);

  const renderSection = (
    part: ReactNode,
    name: string,
    Element: ElementType = "div",
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
      {renderSection(avatar, "avatar")}
      <ZStack orientation={ZOrientation.Vertical} gap={ZSizeFixed.ExtraSmall}>
        {renderSection(_heading, "heading", "header")}
        {renderSection(_subHeading, "sub-heading", "sub")}
      </ZStack>
      <ZFlex grow={1}>{renderSection(prefix, "prefix")}</ZFlex>
      {renderSection(suffix, "suffix")}
    </ZStack>
  );
}
