import { IZWithFashion, IZWithHeight, IZWithWidth } from '@zthun/fashion-boutique';
import { IZDeviceValueMap } from '@zthun/fashion-tailor';
import { IZFashion } from '@zthun/fashion-theme';
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

export function useHeightWebComponent<THeight, TComponent extends IZWithHeight<THeight>>(
  component: MutableRefObject<TComponent | null | undefined>,
  height?: THeight | IZDeviceValueMap<THeight>
) {
  useEffect(() => {
    component.current!.componentHeight = height;
  }, [component.current, height]);
}

export function useWidthWebComponent<TWidth, TComponent extends IZWithWidth<TWidth>>(
  component: MutableRefObject<TComponent | null | undefined>,
  width?: TWidth | IZDeviceValueMap<TWidth>
) {
  useEffect(() => {
    component.current!.componentWidth = width;
  }, [component.current, width]);
}
