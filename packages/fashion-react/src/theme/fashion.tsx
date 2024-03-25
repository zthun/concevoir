import { ZFashionTailorElement, ZFashionThemeElement } from '@zthun/fashion-boutique';
import { IZFashionDevice, IZFashionTailor, ZFashionDevice, ZFashionTailor } from '@zthun/fashion-tailor';
import { IZFashionTheme, ZFashionName, ZFashionThemeBuilder } from '@zthun/fashion-theme';
import { includeCustomElement } from '@zthun/helpful-dom';
import { firstDefined } from '@zthun/helpful-fn';
import React, { createContext, useContext, useEffect, useMemo, useRef } from 'react';
import { IZComponentHierarchy } from '../component/component-hierarchy.mjs';

const ZFashionThemeContext = createContext(new ZFashionThemeBuilder().build());
const ZFashionTailorContext = createContext<IZFashionTailor>(new ZFashionTailor());
const ZFashionDeviceContext = createContext<IZFashionDevice>(new ZFashionDevice());

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ['z-fashion-theme']: ZFashionThemeElement & any;
      ['z-fashion-tailor']: ZFashionTailorElement & any;
    }
  }
}

export interface IZFashionThemeProvider extends IZComponentHierarchy {
  theme?: IZFashionTheme;
  tailor?: IZFashionTailor;
  device?: IZFashionDevice;
}

export function ZFashionThemeProvider(props: IZFashionThemeProvider) {
  const { theme, tailor, device, children } = props;
  const _theme = useMemo(() => firstDefined(new ZFashionThemeBuilder().build(), theme), [theme]);
  const _tailor = useMemo(() => firstDefined(new ZFashionTailor(), tailor), [tailor]);
  const _device = useMemo(() => firstDefined(new ZFashionDevice(), device), [device]);

  const $theme = useRef<ZFashionThemeElement | null>(null);
  const $tailor = useRef<ZFashionTailorElement | null>(null);

  useMemo(() => includeCustomElement(ZFashionThemeElement), []);
  useEffect(() => ZFashionTailorElement.register(), []);

  useEffect(() => $theme.current?.applyTheme(_theme), [_theme, $theme.current]);
  useEffect(() => $tailor.current?.applyTailor(_tailor), [_tailor, $tailor.current]);

  return (
    <>
      <z-fashion-theme ref={$theme}></z-fashion-theme>
      <ZFashionThemeContext.Provider value={_theme}>
        <ZFashionTailorContext.Provider value={_tailor}>
          <z-fashion-tailor ref={$tailor}>
            <ZFashionDeviceContext.Provider value={_device}>{children}</ZFashionDeviceContext.Provider>
          </z-fashion-tailor>
        </ZFashionTailorContext.Provider>
      </ZFashionThemeContext.Provider>
    </>
  );
}

export function useFashionTheme<T extends object = {}>() {
  return useContext(ZFashionThemeContext) as IZFashionTheme<T>;
}

export function useFashion(name: ZFashionName | undefined) {
  const context = useFashionTheme();
  return name ? context[name] : undefined;
}

export function useFashionTailor() {
  return useContext(ZFashionTailorContext);
}

export function useFashionDevice() {
  return useContext(ZFashionDeviceContext);
}
