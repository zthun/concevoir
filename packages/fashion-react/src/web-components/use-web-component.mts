import {
  IZComponentHeight,
  IZComponentWidth,
  IZWithFashion,
  IZWithMargin,
  IZWithPadding
} from '@zthun/fashion-boutique';
import { IZWithBorder } from '@zthun/fashion-boutique/src/element/with-border.mjs';
import { ZDeviceValue, ZGapSize, ZSizeVaried, ZThicknessSize } from '@zthun/fashion-tailor';
import { IZFashion } from '@zthun/fashion-theme';
import { IZQuadrilateral } from '@zthun/helpful-fn';
import { Property } from 'csstype';
import { MutableRefObject, useEffect } from 'react';

/*
  Everything here is helper hooks that implement workarounds until React 19.
  Once React 19 is released, there should be better support for web components
  attaching to properties.  See https://github.com/facebook/react/issues/11347.
*/

export function useFashionWebComponent<TComponent extends IZWithFashion>(
  component: MutableRefObject<TComponent | null | undefined>,
  fashion?: IZFashion
) {
  useEffect(() => {
    component.current!.fashion = fashion;
  }, [component.current, fashion]);
}

export function useBorderWebComponent<TComponent extends IZWithBorder>(
  component: MutableRefObject<TComponent | null | undefined>,
  border: Partial<IZQuadrilateral<ZThicknessSize>> | undefined,
  trim: Partial<IZQuadrilateral<Property.BorderStyle>> | undefined
) {
  useEffect(() => {
    component.current!.border = border;
    component.current!.trim = trim;
  }, [component.current, border, trim]);
}

export function useHeightWebComponent<THeight, TComponent extends IZComponentHeight<THeight>>(
  component: MutableRefObject<TComponent | null | undefined>,
  height?: ZDeviceValue<THeight>
) {
  useEffect(() => {
    component.current!.height = height;
  }, [component.current, height]);
}

export function useMarginWebComponent<TComponent extends IZWithMargin>(
  component: MutableRefObject<TComponent | null | undefined>,
  margin?: Partial<IZQuadrilateral<ZGapSize | ZSizeVaried.Fit>>
) {
  useEffect(() => {
    component.current!.margin = margin;
  }, [component.current, margin]);
}

export function usePaddingWebComponent<TComponent extends IZWithPadding>(
  component: MutableRefObject<TComponent | null | undefined>,
  padding?: Partial<IZQuadrilateral<ZGapSize>>
) {
  useEffect(() => {
    component.current!.padding = padding;
  }, [component.current, padding]);
}

export function useWidthWebComponent<TWidth, TComponent extends IZComponentWidth<TWidth>>(
  component: MutableRefObject<TComponent | null | undefined>,
  width?: ZDeviceValue<TWidth>
) {
  useEffect(() => {
    component.current!.width = width;
  }, [component.current, width]);
}
