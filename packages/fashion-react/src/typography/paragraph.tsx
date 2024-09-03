import {
  IZComponentCompact,
  IZComponentFashion,
  IZComponentHierarchy,
  IZComponentName,
  ZParagraphBodyElement,
  ZParagraphCaptionElement,
  ZParagraphOverlineElement,
  ZParagraphSubtitleElement,
} from "@zthun/fashion-boutique";
import React, { ReactNode } from "react";
import { IZComponentStyle } from "../component/component-style.mjs";
import { useWebComponent } from "../component/use-web-component.mjs";

export interface IZParagraphProps
  extends IZComponentHierarchy<ReactNode>,
    IZComponentStyle,
    IZComponentFashion,
    IZComponentCompact,
    IZComponentName {}

export const ZParagraph = (props: IZParagraphProps) => {
  const { children, className, compact, fashion, name } = props;
  useWebComponent(ZParagraphBodyElement);

  return (
    // @ts-expect-error - Web Component in react 18 using is directly translates className to lower case classname instead of class.
    <p
      class={className}
      is={"z-paragraph-body"}
      data-fashion={fashion}
      data-compact={compact}
      data-name={name}
    >
      {children}
    </p>
  );
};

export const ZSubtitle = (props: IZParagraphProps) => {
  const { children, className, compact, fashion, name } = props;
  useWebComponent(ZParagraphSubtitleElement);

  return (
    // @ts-expect-error - Web Component in react 18 using is directly translates className to lower case classname instead of class.
    <p
      class={className}
      is={"z-paragraph-subtitle"}
      data-fashion={fashion}
      data-compact={compact}
      data-name={name}
    >
      {children}
    </p>
  );
};

export const ZCaption = (props: IZParagraphProps) => {
  const { children, className, compact, fashion, name } = props;
  useWebComponent(ZParagraphCaptionElement);

  return (
    // @ts-expect-error - Web Component in react 18 using is directly translates className to lower case classname instead of class.
    <p
      class={className}
      is={"z-paragraph-caption"}
      data-fashion={fashion}
      data-compact={compact}
      data-name={name}
    >
      {children}
    </p>
  );
};

export const ZOverline = (props: IZParagraphProps) => {
  const { children, className, compact, fashion, name } = props;
  useWebComponent(ZParagraphOverlineElement);

  return (
    // @ts-expect-error - Web Component in react 18 using is directly translates className to lower case classname instead of class.
    <p
      class={className}
      is={"z-paragraph-overline"}
      data-fashion={fashion}
      data-compact={compact}
      data-name={name}
    >
      {children}
    </p>
  );
};
