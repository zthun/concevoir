import {
  IZComponentCompact,
  IZComponentFashion,
  IZComponentHierarchy,
  IZComponentName,
  ZHeadingFiveElement,
  ZHeadingFourElement,
  ZHeadingOneElement,
  ZHeadingSixElement,
  ZHeadingThreeElement,
  ZHeadingTwoElement,
} from "@zthun/fashion-boutique";
import React, { ReactNode } from "react";
import { IZComponentStyle } from "../component/component-style.mjs";
import { useWebComponent } from "../component/use-web-component.mjs";

export interface IZHeadingProps
  extends IZComponentHierarchy<ReactNode>,
    IZComponentStyle,
    IZComponentFashion,
    IZComponentCompact,
    IZComponentName {}

export const ZH1 = (props: IZHeadingProps) => {
  const { children, className, compact, fashion, name } = props;
  useWebComponent(ZHeadingOneElement);

  return (
    <h1
      // @ts-expect-error - Web Component in react 18 using is directly translates className to lower case classname instead of class.
      class={className}
      is="z-h1"
      data-fashion={fashion}
      data-compact={compact}
      data-name={name}
    >
      {children}
    </h1>
  );
};

export const ZH2 = (props: IZHeadingProps) => {
  const { children, className, compact, fashion, name } = props;
  useWebComponent(ZHeadingTwoElement);

  return (
    <h2
      // @ts-expect-error - Web Component in react 18 using is directly translates className to lower case classname instead of class.
      class={className}
      is="z-h2"
      data-fashion={fashion}
      data-compact={compact}
      data-name={name}
    >
      {children}
    </h2>
  );
};

export const ZH3 = (props: IZHeadingProps) => {
  const { children, className, compact, fashion, name } = props;
  useWebComponent(ZHeadingThreeElement);

  return (
    <h3
      // @ts-expect-error - Web Component in react 18 using is directly translates className to lower case classname instead of class.
      class={className}
      is="z-h3"
      data-fashion={fashion}
      data-compact={compact}
      data-name={name}
    >
      {children}
    </h3>
  );
};

export const ZH4 = (props: IZHeadingProps) => {
  const { children, className, compact, fashion, name } = props;
  useWebComponent(ZHeadingFourElement);

  return (
    <h4
      // @ts-expect-error - Web Component in react 18 using is directly translates className to lower case classname instead of class.
      class={className}
      is="z-h4"
      data-fashion={fashion}
      data-compact={compact}
      data-name={name}
    >
      {children}
    </h4>
  );
};

export const ZH5 = (props: IZHeadingProps) => {
  const { children, className, compact, fashion, name } = props;
  useWebComponent(ZHeadingFiveElement);

  return (
    <h5
      // @ts-expect-error - Web Component in react 18 using is directly translates className to lower case classname instead of class.
      class={className}
      is="z-h5"
      data-fashion={fashion}
      data-compact={compact}
      data-name={name}
    >
      {children}
    </h5>
  );
};

export const ZH6 = (props: IZHeadingProps) => {
  const { children, className, compact, fashion, name } = props;
  useWebComponent(ZHeadingSixElement);

  return (
    <h6
      // @ts-expect-error - Web Component in react 18 using is directly translates className to lower case classname instead of class.
      class={className}
      is="z-h6"
      data-fashion={fashion}
      data-compact={compact}
      data-name={name}
    >
      {children}
    </h6>
  );
};
