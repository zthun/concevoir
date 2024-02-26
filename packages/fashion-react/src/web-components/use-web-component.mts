import { IZComponentFashion, IZComponentHeight, IZComponentWidth } from '@zthun/fashion-boutique';
import { ZDeviceValue } from '@zthun/fashion-tailor';
import { MutableRefObject, useEffect } from 'react';

/*
  Everything here is helper hooks that implement workarounds until React 19.
  Once React 19 is released, there should be better support for web components
  attaching to properties.  See https://github.com/facebook/react/issues/11347.
*/

export function useFashionWebComponent<TComponent extends IZComponentFashion>(
  component: MutableRefObject<TComponent | null | undefined>,
  fashion?: string
) {
  useEffect(() => {
    component.current!.fashion = fashion;
  }, [component.current, fashion]);
}

export function useHeightWebComponent<THeight, TComponent extends IZComponentHeight<THeight>>(
  component: MutableRefObject<TComponent | null | undefined>,
  height?: ZDeviceValue<THeight>
) {
  useEffect(() => {
    component.current!.height = height;
  }, [component.current, height]);
}

export function useWidthWebComponent<TWidth, TComponent extends IZComponentWidth<TWidth>>(
  component: MutableRefObject<TComponent | null | undefined>,
  width?: ZDeviceValue<TWidth>
) {
  useEffect(() => {
    component.current!.width = width;
  }, [component.current, width]);
}
