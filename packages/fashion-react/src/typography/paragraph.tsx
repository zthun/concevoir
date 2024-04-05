import {
  IZComponentCompact,
  IZComponentFashion,
  IZComponentName,
  ZParagraphBodyElement,
  ZParagraphCaptionElement,
  ZParagraphOverlineElement,
  ZParagraphSubtitleElement
} from '@zthun/fashion-boutique';
import React from 'react';
import { IZComponentHierarchy } from '../component/component-hierarchy.mjs';
import { IZComponentStyle } from '../component/component-style.mjs';

export interface IZParagraphProps
  extends IZComponentHierarchy,
    IZComponentStyle,
    IZComponentFashion,
    IZComponentCompact,
    IZComponentName {}

export const ZParagraph = (props: IZParagraphProps) => {
  const { children, className, compact, fashion, name } = props;
  ZParagraphBodyElement;

  return (
    // @ts-expect-error - Web Component in react 18 using is directly translates className to lower case classname instead of class.
    <p class={className} is={'z-paragraph-body'} data-fashion={fashion} data-compact={compact} data-name={name}>
      {children}
    </p>
  );
};

export const ZSubtitle = (props: IZParagraphProps) => {
  const { children, className, compact, fashion, name } = props;
  ZParagraphSubtitleElement;

  return (
    // @ts-expect-error - Web Component in react 18 using is directly translates className to lower case classname instead of class.
    <p class={className} is={'z-paragraph-subtitle'} data-fashion={fashion} data-compact={compact} data-name={name}>
      {children}
    </p>
  );
};

export const ZCaption = (props: IZParagraphProps) => {
  const { children, className, compact, fashion, name } = props;
  ZParagraphCaptionElement;

  return (
    // @ts-expect-error - Web Component in react 18 using is directly translates className to lower case classname instead of class.
    <p class={className} is={'z-paragraph-caption'} data-fashion={fashion} data-compact={compact} data-name={name}>
      {children}
    </p>
  );
};

export const ZOverline = (props: IZParagraphProps) => {
  const { children, className, compact, fashion, name } = props;
  ZParagraphOverlineElement;

  return (
    // @ts-expect-error - Web Component in react 18 using is directly translates className to lower case classname instead of class.
    <p class={className} is={'z-paragraph-overline'} data-fashion={fashion} data-compact={compact} data-name={name}>
      {children}
    </p>
  );
};
