import { IZFashionDevice, IZFashionTailor, ZFashionDevice, ZFashionTailor } from '@zthun/fashion-tailor';
import { ZFashionThemeBuilder } from '@zthun/fashion-theme';
import { createContext, useContext } from 'react';

export const ZFashionThemeContext = createContext(new ZFashionThemeBuilder().build());

export function useFashionTheme() {
  return useContext(ZFashionThemeContext);
}

export const ZFashionTailorContext = createContext<IZFashionTailor>(new ZFashionTailor());

export function useFashionTailor() {
  return useContext(ZFashionTailorContext);
}

export const ZFashionDeviceContext = createContext<IZFashionDevice>(new ZFashionDevice());

export function useFashionDevice() {
  return useContext(ZFashionDeviceContext);
}
