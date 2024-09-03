import {
  IZFashionDevice,
  IZFashionTailor,
  ZFashionDevice,
  ZFashionTailor,
} from "@zthun/fashion-tailor";
import {
  IZFashionTheme,
  ZFashionName,
  ZFashionThemeBuilder,
} from "@zthun/fashion-theme";
import { createContext, useContext } from "react";

export const ZFashionThemeContext = createContext(
  new ZFashionThemeBuilder().build(),
);

export function useFashionTheme<T extends object = {}>() {
  return useContext(ZFashionThemeContext) as IZFashionTheme<T>;
}

export function useFashion(name: ZFashionName | undefined) {
  const context = useFashionTheme();
  return name ? context[name] : undefined;
}

export const ZFashionTailorContext = createContext<IZFashionTailor>(
  new ZFashionTailor(),
);

export function useFashionTailor() {
  return useContext(ZFashionTailorContext);
}

export const ZFashionDeviceContext = createContext<IZFashionDevice>(
  new ZFashionDevice(),
);

export function useFashionDevice() {
  return useContext(ZFashionDeviceContext);
}
