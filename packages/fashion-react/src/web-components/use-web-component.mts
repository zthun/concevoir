import {
  IZComponentFashion,
  IZComponentHeight,
  IZComponentLoading,
  IZComponentName,
  IZComponentWidth
} from '@zthun/fashion-boutique';
import { ZDeviceValue } from '@zthun/fashion-tailor';
import { IZFashion } from '@zthun/fashion-theme';
import { MutableRefObject, useEffect } from 'react';

/*
  Everything here is helper hooks that implement workarounds until React 19.
  Once React 19 is released, there should be better support for web components
  attaching to properties.  See https://github.com/facebook/react/issues/11347.
*/

export function useFashionWebComponent<TComponent extends IZComponentFashion>(
  component: MutableRefObject<TComponent | null | undefined>,
  fashion?: IZFashion | string
) {
  useEffect(() => {
    component.current!.fashion = fashion;
  }, [component.current, fashion]);
}

export function useLoadingWebComponent<TComponent extends IZComponentLoading>(
  component: MutableRefObject<TComponent | null | undefined>,
  loading?: boolean
) {
  useEffect(() => {
    component.current!.loading = loading;
  }, [component.current, loading]);
}

export function useNameWebComponent<TComponent extends IZComponentName>(
  component: MutableRefObject<TComponent | null | undefined>,
  name?: string
) {
  useEffect(() => {
    component.current!.name = name;
  }, [component.current, name]);
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
