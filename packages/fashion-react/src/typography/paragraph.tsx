import {
  IZComponentCompact,
  IZComponentFashion,
  ZParagraphBodyElement,
  ZParagraphCaptionElement,
  ZParagraphOverlineElement,
  ZParagraphSubtitleElement
} from '@zthun/fashion-boutique';
import { includeCustomElement } from '@zthun/helpful-dom';
import React, { useMemo } from 'react';
import { IZComponentHierarchy } from '../component/component-hierarchy.mjs';
import { IZComponentStyle } from '../component/component-style.mjs';

export interface IZParagraphProps
  extends IZComponentHierarchy,
    IZComponentStyle,
    IZComponentFashion,
    IZComponentCompact {}

export const ZParagraph = (props: IZParagraphProps) => {
  useMemo(() => includeCustomElement(ZParagraphBodyElement), []);

  return (
    // @ts-expect-error - Web Component in react 18 using is directly translates className to lower case classname instead of class.
    <p class={props.className} is={'z-paragraph-body'} data-fashion={props.fashion} data-compact={props.compact}>
      {props.children}
    </p>
  );
};

export const ZSubtitle = (props: IZParagraphProps) => {
  useMemo(() => includeCustomElement(ZParagraphSubtitleElement), []);

  return (
    // @ts-expect-error - Web Component in react 18 using is directly translates className to lower case classname instead of class.
    <p class={props.className} is={'z-paragraph-subtitle'} data-fashion={props.fashion} data-compact={props.compact}>
      {props.children}
    </p>
  );
};

export const ZCaption = (props: IZParagraphProps) => {
  useMemo(() => includeCustomElement(ZParagraphCaptionElement), []);

  return (
    // @ts-expect-error - Web Component in react 18 using is directly translates className to lower case classname instead of class.
    <p class={props.className} is={'z-paragraph-caption'} data-fashion={props.fashion} data-compact={props.compact}>
      {props.children}
    </p>
  );
};

export const ZOverline = (props: IZParagraphProps) => {
  useMemo(() => includeCustomElement(ZParagraphOverlineElement), []);

  return (
    // @ts-expect-error - Web Component in react 18 using is directly translates className to lower case classname instead of class.
    <p class={props.className} is={'z-paragraph-overline'} data-fashion={props.fashion} data-compact={props.compact}>
      {props.children}
    </p>
  );
};
