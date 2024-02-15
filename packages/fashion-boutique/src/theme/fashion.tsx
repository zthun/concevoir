import { IZFashionDevice, IZFashionTailor, ZFashionDevice, ZFashionTailor } from '@zthun/fashion-tailor';
import { IZFashionTheme, ZFashionName, ZFashionThemeBuilder } from '@zthun/fashion-theme';
import React, { createContext, useContext, useEffect, useRef } from 'react';
import { IZComponentHierarchy } from '../component/component-hierarchy.mjs';
import { ZFashionThemeElement } from './fashion-theme-element.mjs';

export const ZFashionThemeContext = createContext(new ZFashionThemeBuilder().build());

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ['z-fashion-theme']: ZFashionThemeElement & any;
    }
  }
}

export interface IZFashionThemeProvider extends IZComponentHierarchy {
  theme: IZFashionTheme;
}

export function ZFashionThemeProvider(props: IZFashionThemeProvider) {
  const { theme, children } = props;
  const root = useRef<ZFashionThemeElement | null>(null);

  useEffect(() => ZFashionThemeElement.register(), []);

  useEffect(() => {
    root.current?.applyTheme(theme);
  }, [theme, root.current]);

  return (
    <ZFashionThemeContext.Provider value={theme}>
      <z-fashion-theme ref={root}>{children}</z-fashion-theme>
    </ZFashionThemeContext.Provider>
  );
}

export function useFashionTheme<T extends object = {}>() {
  return useContext(ZFashionThemeContext) as IZFashionTheme<T>;
}

export function useFashion(name: ZFashionName | undefined) {
  const context = useFashionTheme();
  return name ? context[name] : undefined;
}

export const ZFashionTailorContext = createContext<IZFashionTailor>(new ZFashionTailor());

export function useFashionTailor() {
  return useContext(ZFashionTailorContext);
}

export const ZFashionDeviceContext = createContext<IZFashionDevice>(new ZFashionDevice());

export function useFashionDevice() {
  return useContext(ZFashionDeviceContext);
}
