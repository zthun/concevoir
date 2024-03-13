import { Typography } from '@mui/material';
import {
  IZComponentFashion,
  ZParagraphBodyElement,
  ZParagraphCaptionElement,
  ZParagraphOverlineElement,
  ZParagraphSubtitleElement
} from '@zthun/fashion-boutique';
import { includeCustomElement } from '@zthun/helpful-dom';
import React, { ElementType } from 'react';
import { IZComponentHierarchy } from '../component/component-hierarchy.mjs';
import { IZComponentStyle } from '../component/component-style.mjs';

export interface IZTypographyProps extends IZComponentHierarchy, IZComponentStyle, IZComponentFashion {
  compact?: boolean;
}

type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body1'
  | 'body2'
  | 'subtitle1'
  | 'subtitle2'
  | 'caption'
  | 'overline';

const render = (variant: Variant, component: ElementType, props: IZTypographyProps) => {
  const { className, children, compact } = props;
  return (
    <Typography className={className} component={component} variant={variant} gutterBottom={!compact}>
      {children}
    </Typography>
  );
};

const renderParagraph = (is: string, props: IZTypographyProps) => {
  const { fashion, children, compact } = props;
  return (
    <p is={is} data-fashion={fashion} data-compact={compact}>
      {children}
    </p>
  );
};

includeCustomElement(ZParagraphBodyElement);
includeCustomElement(ZParagraphCaptionElement);
includeCustomElement(ZParagraphSubtitleElement);
includeCustomElement(ZParagraphOverlineElement);

export const ZH1 = (props: IZTypographyProps) => render('h1', 'h1', props);
export const ZH2 = (props: IZTypographyProps) => render('h2', 'h2', props);
export const ZH3 = (props: IZTypographyProps) => render('h3', 'h3', props);
export const ZH4 = (props: IZTypographyProps) => render('h4', 'h4', props);
export const ZH5 = (props: IZTypographyProps) => render('h5', 'h5', props);
export const ZH6 = (props: IZTypographyProps) => render('h6', 'h6', props);

export const ZParagraph = (props: IZTypographyProps) => renderParagraph('z-paragraph-body', props);
export const ZSubtitle = (props: IZTypographyProps) => renderParagraph('z-paragraph-subtitle', props);
export const ZCaption = (props: IZTypographyProps) => renderParagraph('z-paragraph-caption', props);
export const ZOverline = (props: IZTypographyProps) => renderParagraph('z-paragraph-overline', props);
