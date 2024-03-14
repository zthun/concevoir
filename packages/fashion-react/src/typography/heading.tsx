import {
  IZComponentCompact,
  IZComponentFashion,
  ZHeadingFiveElement,
  ZHeadingFourElement,
  ZHeadingOneElement,
  ZHeadingSixElement,
  ZHeadingThreeElement,
  ZHeadingTwoElement
} from '@zthun/fashion-boutique';
import { includeCustomElement } from '@zthun/helpful-dom';
import React, { useMemo } from 'react';
import { IZComponentHierarchy } from '../component/component-hierarchy.mjs';
import { IZComponentStyle } from '../component/component-style.mjs';

export interface IZHeadingProps
  extends IZComponentHierarchy,
    IZComponentStyle,
    IZComponentFashion,
    IZComponentCompact {}

export const ZH1 = (props: IZHeadingProps) => {
  useMemo(() => includeCustomElement(ZHeadingOneElement), []);

  return (
    // @ts-expect-error - Web Component in react 18 using is directly translates className to lower case classname instead of class.
    <h1 class={props.className} is='z-h1' data-fashion={props.fashion} data-compact={props.compact}>
      {props.children}
    </h1>
  );
};

export const ZH2 = (props: IZHeadingProps) => {
  useMemo(() => includeCustomElement(ZHeadingTwoElement), []);

  return (
    // @ts-expect-error - Web Component in react 18 using is directly translates className to lower case classname instead of class.
    <h2 class={props.className} is='z-h2' data-fashion={props.fashion} data-compact={props.compact}>
      {props.children}
    </h2>
  );
};

export const ZH3 = (props: IZHeadingProps) => {
  useMemo(() => includeCustomElement(ZHeadingThreeElement), []);

  return (
    // @ts-expect-error - Web Component in react 18 using is directly translates className to lower case classname instead of class.
    <h3 class={props.className} is='z-h3' data-fashion={props.fashion} data-compact={props.compact}>
      {props.children}
    </h3>
  );
};

export const ZH4 = (props: IZHeadingProps) => {
  useMemo(() => includeCustomElement(ZHeadingFourElement), []);

  return (
    // @ts-expect-error - Web Component in react 18 using is directly translates className to lower case classname instead of class.
    <h4 class={props.className} is='z-h4' data-fashion={props.fashion} data-compact={props.compact}>
      {props.children}
    </h4>
  );
};

export const ZH5 = (props: IZHeadingProps) => {
  useMemo(() => includeCustomElement(ZHeadingFiveElement), []);

  return (
    // @ts-expect-error - Web Component in react 18 using is directly translates className to lower case classname instead of class.
    <h5 class={props.className} is='z-h5' data-fashion={props.fashion} data-compact={props.compact}>
      {props.children}
    </h5>
  );
};

export const ZH6 = (props: IZHeadingProps) => {
  useMemo(() => includeCustomElement(ZHeadingSixElement), []);

  return (
    // @ts-expect-error - Web Component in react 18 using is directly translates className to lower case classname instead of class.
    <h6 class={props.className} is='z-h6' data-fashion={props.fashion} data-compact={props.compact}>
      {props.children}
    </h6>
  );
};
